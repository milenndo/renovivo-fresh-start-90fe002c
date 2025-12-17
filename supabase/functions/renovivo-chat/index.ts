import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// BNB fixed rate: 1 EUR = 1.95583 BGN
const BGN_TO_EUR = 1.95583;

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15; // 15 requests per minute
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Message validation constants
const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES_COUNT = 20;
const VALID_ROLES = ["user", "assistant", "system"];

// Clean up old rate limit entries periodically
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Get client IP for rate limiting
function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  return "unknown";
}

// Check rate limit
function checkRateLimit(clientIP: string): { allowed: boolean; retryAfter?: number } {
  cleanupRateLimitStore();
  const now = Date.now();
  const record = rateLimitStore.get(clientIP);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

// Validate message structure
interface ChatMessage {
  role: string;
  content: string;
}

function validateMessages(messages: unknown): { valid: boolean; error?: string; messages?: ChatMessage[] } {
  if (!Array.isArray(messages)) {
    return { valid: false, error: "Messages must be an array" };
  }

  if (messages.length === 0) {
    return { valid: false, error: "Messages array cannot be empty" };
  }

  if (messages.length > MAX_MESSAGES_COUNT) {
    return { valid: false, error: `Too many messages. Maximum allowed: ${MAX_MESSAGES_COUNT}` };
  }

  const validatedMessages: ChatMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    if (typeof msg !== "object" || msg === null) {
      return { valid: false, error: `Message at index ${i} must be an object` };
    }

    const { role, content } = msg as Record<string, unknown>;

    if (typeof role !== "string" || !VALID_ROLES.includes(role)) {
      return { valid: false, error: `Invalid role at index ${i}. Must be one of: ${VALID_ROLES.join(", ")}` };
    }

    if (typeof content !== "string") {
      return { valid: false, error: `Content at index ${i} must be a string` };
    }

    if (content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message at index ${i} exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters` };
    }

    // Sanitize content - trim whitespace
    validatedMessages.push({
      role,
      content: content.trim()
    });
  }

  return { valid: true, messages: validatedMessages };
}

// Tool definition for saving inspection requests
const inspectionBookingTool = {
  type: "function",
  function: {
    name: "save_inspection_request",
    description: "Запази заявка за безплатен оглед когато клиентът предостави своите данни за контакт (име, телефон, адрес). Извикай тази функция САМО когато клиентът изрично потвърди, че иска да запише час за оглед И е предоставил поне име и телефон.",
    parameters: {
      type: "object",
      properties: {
        client_name: {
          type: "string",
          description: "Името на клиента"
        },
        client_phone: {
          type: "string",
          description: "Телефонен номер на клиента"
        },
        client_email: {
          type: "string",
          description: "Имейл адрес на клиента (ако е предоставен)"
        },
        address: {
          type: "string",
          description: "Адрес на обекта за оглед"
        },
        preferred_datetime: {
          type: "string",
          description: "Предпочитано време за оглед (ако е споменато)"
        },
        notes: {
          type: "string",
          description: "Допълнителни бележки от разговора - какъв вид ремонт иска клиентът"
        }
      },
      required: ["client_name", "client_phone", "address"]
    }
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Твърде много заявки. Моля, опитайте отново след малко." }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": String(rateLimitResult.retryAfter || 60),
          },
        }
      );
    }

    const body = await req.json();
    
    // Validate messages
    const validation = validateMessages(body.messages);
    if (!validation.valid) {
      console.log(`Validation error: ${validation.error}`);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const messages = validation.messages!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch prices from database
    const { data: prices, error: pricesError } = await supabase
      .from("service_prices")
      .select("*, service_categories(name, slug)")
      .order("service_name");

    if (pricesError) {
      console.error("Error fetching prices:", pricesError);
    }

    // Format prices for the AI context
    const pricesContext = prices?.map((p) => {
      const priceMin = p.price_min ? (p.price_min / BGN_TO_EUR).toFixed(2) : null;
      const priceMax = p.price_max ? (p.price_max / BGN_TO_EUR).toFixed(2) : null;
      const priceStr = priceMin && priceMax 
        ? priceMin === priceMax 
          ? `€${priceMin}` 
          : `€${priceMin} - €${priceMax}`
        : p.price_text || "По запитване";
      
      return `- ${p.service_name} (${p.service_categories?.name}): ${priceStr} за ${p.unit}${p.includes_materials ? " (с материали)" : " (без материали)"}${p.notes ? ` - ${p.notes}` : ""}`;
    }).join("\n") || "Няма налични цени.";

    const systemPrompt = `Ти си ВИРТУАЛЕН АСИСТЕНТ и ЕКСПЕРТ-КОНСУЛТАНТ на строителна фирма "Renovivo".

ТВОЯТА ЦЕЛ: Да помагаш на клиенти с въпроси, да даваш професионални съвети за хода на ремонта и да ги убеждаваш да запишат час за оглед.

═══════════════════════════════════════════════════════════════
ПРАВИЛА НА ПОВЕДЕНИЕ:
═══════════════════════════════════════════════════════════════

1. ЕКСПЕРТИЗА (ТИ СИ СТРОИТЕЛЕН ИНЖЕНЕР):
   • Имаш дългогодишен опит в строителството
   • Знаеш най-добрите практики: Кнауф системи, правилно съхнене, хидроизолация
   • Ако клиент попита "Каква е последователността при ремонт на баня?" или "Защо се слага грунд?", използвай своите ОБЩИ ПРОФЕСИОНАЛНИ ЗНАНИЯ
   • Обяснявай процесите подробно, образователно и убедително
   • НЕ е нужно да търсиш в интернет - ти ЗНАЕШ най-добрите практики

2. ЦЕНИ И ОФЕРТИ (СТРИКТНО!):
   • Използвай ЕДИНСТВЕНО списъка с услуги на Renovivo по-долу
   • НИКОГА не си измисляй цени и НЕ търси цени в интернет
   • ВИНАГИ уточнявай, че цените са БЕЗ ДДС
   • Ако услугата е "Проект и Дизайн" или "Кухня" - обясни, че цената е ИНДИВИДУАЛНА и зависи от проекта

3. ТЪРГОВСКИ ПОДХОД (МНОГО ВАЖНО!):
   • След ВСЕКИ отговор (дори технически) завършвай с призив за действие
   • Пример: "Можем да огледаме Вашия обект, за да дадем точно решение. Желаете ли да запишем час за безплатен оглед?"
   • Ако клиент иска оглед, събери: име, телефон, адрес, удобно време

4. ЗАПИСВАНЕ НА ОГЛЕД (КРИТИЧНО ВАЖНО!):
   • Когато клиент ИЗРИЧНО каже че иска оглед, събери данните му: име, телефон и адрес
   • След като получиш поне име, телефон и адрес - ЗАДЪЛЖИТЕЛНО извикай функцията save_inspection_request
   • Потвърди на клиента, че заявката е записана и че ще се свържем с него скоро
   • Попитай дали има предпочитано време за оглед

5. ОГРАНИЧЕНИЯ:
   • НЕ препоръчвай други фирми
   • НЕ давай срокове за изпълнение без оглед (кажи "зависи от спецификата на обекта")

ФОРМАТ НА ОТГОВОРИТЕ:
• Използвай кратки абзаци
• Bullet points за списъци
• Професионален, но достъпен език
• Максимум 150 думи на отговор

НАЛИЧНИ УСЛУГИ И ЦЕНИ (EUR, без ДДС):
${pricesContext}

КОНТАКТИ НА ФИРМАТА:
📞 0893 71 29 19 | ✉️ renovivo.bg@gmail.com | 🕐 Пон-Пет 08:00-18:00`;

    console.log("Sending request to Lovable AI Gateway...");

    // First call - check if AI wants to use a tool
    const initialResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        tools: [inspectionBookingTool],
        tool_choice: "auto",
        stream: false,
      }),
    });

    if (!initialResponse.ok) {
      if (initialResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Твърде много заявки. Моля, опитайте отново след малко." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (initialResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Услугата временно не е достъпна." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await initialResponse.text();
      console.error("AI gateway error:", initialResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Грешка при обработка на заявката." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const initialData = await initialResponse.json();
    const choice = initialData.choices?.[0];
    
    // Check if AI wants to call a tool
    if (choice?.message?.tool_calls?.length > 0) {
      const toolCall = choice.message.tool_calls[0];
      
      if (toolCall.function?.name === "save_inspection_request") {
        console.log("AI requested to save inspection booking");
        
        try {
          const args = JSON.parse(toolCall.function.arguments);
          console.log("Inspection request data:", args);
          
          // Save to database
          const { data: insertedRequest, error: insertError } = await supabase
            .from("inspection_requests")
            .insert({
              client_name: args.client_name,
              client_phone: args.client_phone,
              client_email: args.client_email || null,
              address: args.address,
              preferred_datetime: args.preferred_datetime || null,
              notes: args.notes || null,
              status: "pending"
            })
            .select()
            .single();

          if (insertError) {
            console.error("Error saving inspection request:", insertError);
          } else {
            console.log("Inspection request saved successfully:", insertedRequest?.id);
          }

          // Make follow-up call with tool result to get final response
          const toolResultMessages = [
            ...messages,
            choice.message,
            {
              role: "tool",
              tool_call_id: toolCall.id,
              content: insertError 
                ? "Грешка при записване на заявката. Моля, помолете клиента да се обади директно."
                : "Заявката за оглед е успешно записана в системата. Потвърдете на клиента."
            }
          ];

          const followUpResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash",
              messages: [
                { role: "system", content: systemPrompt },
                ...toolResultMessages,
              ],
              stream: true,
            }),
          });

          if (!followUpResponse.ok) {
            const errorText = await followUpResponse.text();
            console.error("Follow-up AI error:", followUpResponse.status, errorText);
            // Return a fallback success message
            const fallbackMessage = insertError
              ? "Възникна проблем при записването. Моля, обадете се на 0893 71 29 19 за да запишете час за оглед."
              : `Благодаря! Вашата заявка за оглед е записана успешно. Ще се свържем с Вас скоро на телефон ${args.client_phone}. Имате ли допълнителни въпроси?`;
            
            return new Response(
              JSON.stringify({ content: fallbackMessage }),
              { headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }

          return new Response(followUpResponse.body, {
            headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
          });

        } catch (parseError) {
          console.error("Error parsing tool arguments:", parseError);
        }
      }
    }

    // No tool call - return regular streaming response
    // Need to make another call with streaming enabled
    const streamResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!streamResponse.ok) {
      const errorText = await streamResponse.text();
      console.error("Stream AI error:", streamResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Грешка при обработка на заявката." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(streamResponse.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Неизвестна грешка" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
