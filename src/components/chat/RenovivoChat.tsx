import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2, Calendar, Paperclip, Image as ImageIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import { useChat } from "@/contexts/ChatContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  imageUrl?: string;
  created_at?: string;
};

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "🧠 Здравейте! Аз съм **Renovivo AI** - вашият интелигентен калкулатор за ремонти!\n\n📊 Мога да ви направя **ориентировъчна оферта** за:\n• 🏠 Цялостен ремонт на апартамент\n• 🚿 Ремонт на баня или кухня\n• 🎨 Боядисване, настилки, ВиК\n• ✨ Микроцимент, тераццо, флейк подове\n\n📦 Предлагаме 3 пакета: **START**, **COMFORT** и **PREMIUM**\n\n📷 Можете да качите **план или снимка** за по-точна оценка!\n\n**Какъв тип ремонт планирате?** 🏗️",
};

// Parse message content and render links as buttons
const renderMessageContent = (content: string, onNavigate: (path: string) => void) => {
  // Match markdown links: [text](url) or plain URLs with /services/ or /pricing paths
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)|(?:https?:\/\/[^\s]+)?(\/(?:services|pricing|contact|about|portfolio|blog)[^\s]*)/g;
  
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;
  let keyIndex = 0;

  while ((match = linkRegex.exec(content)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }

    const linkText = match[1] || match[3] || "Виж повече";
    let linkPath = match[2] || match[3];
    
    // Extract just the path if it's a full URL
    if (linkPath?.includes("renovivo.bg")) {
      const urlMatch = linkPath.match(/renovivo\.bg(\/[^\s)]*)/);
      if (urlMatch) linkPath = urlMatch[1];
    }
    
    // Clean up the path
    if (linkPath) {
      linkPath = linkPath.replace(/[)\s]+$/, ""); // Remove trailing ) or spaces
      
      parts.push(
        <Button
          key={`link-${keyIndex++}`}
          variant="secondary"
          size="sm"
          className="mx-1 my-1 inline-flex items-center gap-1 text-xs h-7 px-2"
          onClick={() => onNavigate(linkPath)}
        >
          {linkText.replace(/^\[|\]$/g, "")}
          <ExternalLink className="h-3 w-3" />
        </Button>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return parts.length > 0 ? parts : content;
};

const RenovivoChat = () => {
  const navigate = useNavigate();
  const { isOpen, toggleChat } = useChat();
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [pendingImage, setPendingImage] = useState<{ url: string; file: File } | null>(null);
  const { openModal } = useInspectionRequest();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleNavigate = (path: string) => {
    navigate(path);
    toggleChat(); // Close chat after navigation
  };

  useEffect(() => {
    if (!isOpen) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages.length]);

  const handleToggle = () => {
    toggleChat();
  };

  const handleOpenInspection = () => {
    openModal();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Моля, качете изображение (JPG, PNG, WebP или GIF)");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Файлът е твърде голям. Максимум 10MB.");
      return;
    }

    setIsUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      const { data, error } = await supabase.storage
        .from("chat-uploads")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        toast.error("Грешка при качване на файла");
        return;
      }

      const { data: urlData } = supabase.storage
        .from("chat-uploads")
        .getPublicUrl(data.path);

      setPendingImage({ url: urlData.publicUrl, file });
      toast.success("Изображението е готово за изпращане!");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Грешка при качване");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemovePendingImage = () => {
    setPendingImage(null);
  };

  const handleSend = async () => {
    if ((!input.trim() && !pendingImage) || isSending) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim() || (pendingImage ? "Анализирай това изображение" : ""),
      imageUrl: pendingImage?.url,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    const imageToSend = pendingImage;
    setPendingImage(null);
    setIsSending(true);

    try {
      // Build messages array for the API
      const messagesForAPI = messages.map((m) => ({
        role: m.role,
        content: m.content,
        imageUrl: m.imageUrl,
      }));
      messagesForAPI.push({
        role: "user",
        content: userMessage.content,
        imageUrl: imageToSend?.url,
      });

      console.log("Sending messages to AI:", messagesForAPI);

      const { data, error } = await supabase.functions.invoke("renovivo-chat", {
        body: { messages: messagesForAPI },
      });

      if (error) {
        console.error("Chat function error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              "😅 Възникна проблем с връзката към сървъра. Моля, опитайте отново след малко или заявете безплатен оглед от бутона по-долу. Телефон: 0893 71 29 19",
          },
        ]);
        return;
      }

      console.log("Received data:", data);

      // Handle both regular response and streaming response
      let responseText = "";

      if (data?.content) {
        responseText = data.content;
      } else if (data?.reply) {
        responseText = data.reply;
      } else if (typeof data === "string") {
        responseText = data;
      } else if (data && typeof data === "object") {
        responseText = data.text || data.message || JSON.stringify(data);
      }

      if (responseText && responseText.trim()) {
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: responseText,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        console.warn("No valid response content received");
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              "Опитайте пак със свързан въпрос за ремонт. 🔧",
          },
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Възникна неочаквана грешка. Моля, обадете се на 0893 71 29 19 или опитайте отново.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
      />

      {/* Chat toggle button */}
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          size="lg"
          className="rounded-full shadow-lg px-4 py-2 flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90"
          onClick={handleToggle}
          aria-label={isOpen ? "Затвори AI чата" : "Отвори Renovivo AI чата"}
        >
          {isOpen ? (
            <>
              <X className="h-5 w-5" aria-hidden="true" />
              <span>Затвори чат</span>
            </>
          ) : (
            <>
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              <span>🧠 Renovivo AI</span>
            </>
          )}
        </Button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed inset-x-2 bottom-20 sm:inset-x-auto sm:right-4 sm:left-auto sm:w-full sm:max-w-md bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden z-40">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <div>
              <p className="font-bold text-lg">🧠 Renovivo AI</p>
              <p className="text-xs text-primary-foreground/90">
                Супер интелигентен асистент • Цени • Анализ на планове
              </p>
            </div>
            <button
              onClick={handleToggle}
              className="rounded-full p-1 hover:bg-primary-foreground/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto max-h-96">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 text-sm max-w-[85%] whitespace-pre-wrap leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none font-medium"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  {msg.imageUrl && (
                    <div className="mb-2">
                      <img
                        src={msg.imageUrl}
                        alt="Качено изображение"
                        className="max-w-full max-h-40 rounded-lg object-cover"
                      />
                    </div>
                  )}
                  {msg.role === "assistant" 
                    ? renderMessageContent(msg.content, handleNavigate)
                    : msg.content}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-2 text-sm max-w-[85%] bg-muted text-foreground rounded-bl-none flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Анализирам...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Pending image preview */}
          {pendingImage && (
            <div className="px-4 py-2 bg-muted/50 border-t flex items-center gap-2">
              <img
                src={pendingImage.url}
                alt="Preview"
                className="h-12 w-12 rounded object-cover"
              />
              <span className="text-xs text-muted-foreground flex-1 truncate">
                {pendingImage.file.name}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleRemovePendingImage}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* CTA за оглед */}
          <div className="px-4 pb-2 bg-muted/50">
            <Button
              type="button"
              variant="outline"
              className="w-full mb-2 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={handleOpenInspection}
            >
              <Calendar className="h-4 w-4" />
              ✨ Заявете безплатен оглед
            </Button>
          </div>

          {/* Input area */}
          <div className="border-t px-3 py-2 bg-background">
            <div className="flex items-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="mb-1 flex-shrink-0"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSending || isUploading}
                title="Качи снимка или план"
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ImageIcon className="h-4 w-4" />
                )}
              </Button>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Попитайте за ремонт или качете план..."
                className="min-h-[44px] max-h-24 text-sm resize-none"
                disabled={isSending}
              />
              <Button
                size="icon"
                className="mb-1 flex-shrink-0"
                onClick={handleSend}
                disabled={isSending || (!input.trim() && !pendingImage)}
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              📷 Качете план за анализ • Shift + Enter за нов ред
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RenovivoChat;
