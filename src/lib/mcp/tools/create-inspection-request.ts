declare const process: { env: Record<string, string | undefined> };
import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "create_inspection_request",
  title: "Request a site inspection",
  description:
    "Submit a Renovivo site-inspection / quote request. Renovivo will contact the client to arrange a visit.",
  inputSchema: {
    client_name: z.string().trim().min(2).max(200).describe("Full name of the client."),
    client_phone: z.string().trim().min(5).max(50).describe("Contact phone number."),
    client_email: z.string().email().optional().describe("Optional contact email."),
    address: z.string().trim().min(3).max(500).describe("Address of the property to inspect."),
    preferred_datetime: z
      .string()
      .optional()
      .describe("Preferred date/time for the visit, e.g. '2026-08-01 10:00'."),
    notes: z.string().max(2000).optional().describe("Notes about scope / rooms / condition."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("inspection_requests")
      .insert({
        client_name: input.client_name,
        client_phone: input.client_phone,
        client_email: input.client_email ?? ctx.getUserEmail() ?? null,
        address: input.address,
        preferred_datetime: input.preferred_datetime ?? null,
        notes: input.notes ?? null,
      })
      .select("id, created_at, status")
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [
        {
          type: "text",
          text: `Inspection request submitted. Reference: ${data.id} (status: ${data.status}).`,
        },
      ],
      structuredContent: { request: data },
    };
  },
});
