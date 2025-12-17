import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import { useChat } from "@/contexts/ChatContext";

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at?: string;
};

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Здравейте! Аз съм виртуалният асистент на Renovivo. Разкажете ми накратко за вашия ремонт – стая, баня, квадратура – и ще ви помогна с идеи, срокове и ориентировъчен бюджет.",
};

const RenovivoChat = () => {
  const { isOpen, toggleChat } = useChat();
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { openModal } = useInspectionRequest();
  const bottomRef = useRef<HTMLDivElement | null>(null);

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

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const { data, error } = await supabase.functions.invoke("renovivo-chat", {
        body: { messages: [...messages, userMessage] },
      });

      if (error) {
        console.error("Chat function error:", error);
        setMessages(prev => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              "Възникна проблем с връзката към сървъра. Моля, опитайте отново след малко или заявете безплатен оглед от бутона по-долу.",
          },
        ]);
        return;
      }

      if (data?.reply) {
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply as string,
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Възникна неочаквана грешка. Моля, опитайте отново или заявете оглед.",
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
      {/* Chat toggle button */}
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          size="lg"
          className="rounded-full shadow-lg px-4 py-2 flex items-center gap-2"
          onClick={handleToggle}
        >
          {isOpen ? (
            <>
              <X className="h-5 w-5" />
              Затвори чат
            </>
          ) : (
            <>
              <MessageCircle className="h-5 w-5" />
              Чат с Renovivo
            </>
          )}
        </Button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-full max-w-md bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden z-40">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-primary text-primary-foreground">
            <div>
              <p className="font-semibold">Renovivo Асистент</p>
              <p className="text-xs text-primary-foreground/80">
                Отговори за секунди, идеи за вашия ремонт
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
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-3 py-2 text-sm max-w-[80%] whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-3 py-2 text-sm max-w-[80%] bg-muted text-foreground rounded-bl-sm flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Пишем отговор...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* CTA за оглед */}
          <div className="px-4 pb-2">
            <Button
              type="button"
              variant="outline"
              className="w-full mb-2 flex items-center justify-center gap-2 text-sm"
              onClick={handleOpenInspection}
            >
              <Calendar className="h-4 w-4" />
              Заявете безплатен оглед
            </Button>
          </div>

          <div className="border-t px-3 py-2 bg-muted/50">
            <div className="flex items-end gap-2">
              <Textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Опишете накратко банята/помещението, квадратура и какво искате да постигнете..."
                className="min-h-[48px] max-h-24 text-sm resize-none"
              />
              <Button
                size="icon"
                className="mb-1"
                onClick={handleSend}
                disabled={isSending || !input.trim()}
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RenovivoChat;
