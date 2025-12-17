import { Bot, Send, Sparkles, Calculator, Lightbulb, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/ChatContext";

const features = [
  {
    icon: MessageSquare,
    title: "Задава уточняващи въпроси",
    description: "Разбира вашите нужди чрез интелигентен диалог",
  },
  {
    icon: Calculator,
    title: "Ориентировъчни количествени сметки",
    description: "Изчислява приблизителни разходи на база вашите данни",
  },
  {
    icon: Lightbulb,
    title: "Предлага сценарии и бюджети",
    description: "Различни варианти според вашите възможности",
  },
  {
    icon: Sparkles,
    title: "Съвети за материали и технологии",
    description: "Препоръки за най-подходящите решения",
  },
];

const mockConversation = [
  {
    role: "user",
    content: "Здравейте, искам да ремонтирам банята си. Около 6 кв.м. е.",
  },
  {
    role: "assistant",
    content: "Здравейте! Ще ви помогна да планирате ремонта. Какъв тип плочки предпочитате - стандартни или едроформатни? И имате ли предпочитания за санитария - бюджетна или премиум класа?",
  },
  {
    role: "user",
    content: "Едроформатни плочки и средна класа санитария.",
  },
  {
    role: "assistant",
    content: "Разбрах. За 6 кв.м. баня с едроформатни плочки и средна класа санитария, ориентировъчният бюджет е между 8,500 - 12,000 лв. Това включва: къртене, хидроизолация, ВиК, плочки с монтаж, санитария и довършителни работи. Искате ли детайлна разбивка?",
  },
];

const AIConsultant = () => {
  const { openChat } = useChat();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-primary text-sm font-medium">Първи в България</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Renovivo AI Консултант за ремонт
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Получете персонализирана консултация и ориентировъчна оферта за минути, не за дни.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Features */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
              Как работи AI Консултантът?
            </h3>
            
            <div className="space-y-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                onClick={openChat}
              >
                <Bot className="h-5 w-5 mr-2" />
                Започнете консултация
              </Button>
            </div>
          </div>

          {/* Right Column - Chat Mockup */}
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-3xl blur-xl" />
            
            {/* Chat Card */}
            <div className="relative bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
              {/* Chat Header */}
              <div className="bg-foreground px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-background font-medium text-sm">
                    Renovivo AI Консултант
                  </h4>
                  <span className="text-background/60 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Онлайн
                  </span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto bg-muted/20">
              {mockConversation.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                    style={{ animationDelay: `${index * 0.4}s`, animationFillMode: 'backwards' }}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-card border border-border text-foreground rounded-bl-md"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm text-muted-foreground">
                    Напишете съобщение...
                  </div>
                  <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <Send className="h-4 w-4 text-primary-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConsultant;
