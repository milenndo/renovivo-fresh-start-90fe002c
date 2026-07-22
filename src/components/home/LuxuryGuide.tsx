import { Download, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LuxuryGuide = () => {
  const { language } = useLanguage();

  const copy = language === "en"
    ? {
        eyebrow: "Official document",
        title: "Client Handbook",
        lead: "Renovivo's standards for execution and project management. The official protocol for communication, financial transparency and expectations during the delivery of interior projects.",
        bullets: [
          "Construction stages and technological pauses",
          "Bill of quantities (BoQ) and financial regulation",
          "Change orders, payment schedule and handover",
        ],
        cta: "Download the handbook (PDF)",
        note: "PDF · No email required",
      }
    : {
        eyebrow: "Официален документ",
        title: "Ръководство за възложителя",
        lead: "Стандартите на Renovivo за изпълнение и управление на строителни процеси. Официален протокол за комуникация, финансова прозрачност и очаквания при реализацията на интериорни проекти.",
        bullets: [
          "Технологични етапи и строителна реалност",
          "Количествено-стойностна сметка и финансов регламент",
          "Промени, плащания и приемане на обекта",
        ],
        cta: "Изтеглете ръководството (PDF)",
        note: "PDF · Без имейл",
      };

  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left — dossier mock */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 bg-primary/10 rounded-sm rotate-[-2deg]" />
              <div className="relative bg-foreground text-background p-10 aspect-[3/4] flex flex-col justify-between shadow-2xl border border-primary/30">
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-primary font-semibold uppercase mb-8">
                    Renovivo
                  </p>
                  <BookOpen className="h-8 w-8 text-primary mb-6" strokeWidth={1} />
                  <h3 className="font-heading text-3xl leading-tight">
                    {language === "en" ? "The Renovation\nGuide" : "Ръководство\nза ремонт"}
                  </h3>
                </div>
                <div>
                  <div className="h-px bg-primary/40 mb-4" />
                  <p className="text-[10px] tracking-[0.25em] text-background/60 uppercase">
                    {language === "en" ? "Edition 01" : "Издание 01"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-6">
              {copy.eyebrow}
            </p>
            <h2 className="font-heading text-4xl md:text-5xl leading-[1.05] mb-6">
              {copy.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              {copy.lead}
            </p>

            <ul className="space-y-3 mb-10 max-w-lg">
              {copy.bullets.map((b) => (
                <li key={b} className="flex items-start gap-4 border-t border-border/60 pt-3">
                  <span className="text-primary font-heading text-sm mt-1">—</span>
                  <span className="text-foreground/90">{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href="/guides/renovivo-luxury-renovation-guide.pdf"
                download
              >
                <Button
                  size="lg"
                  className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-none px-8 py-6 tracking-wider uppercase text-xs"
                >
                  <Download className="h-4 w-4 mr-3 group-hover:translate-y-0.5 transition-transform" />
                  {copy.cta}
                </Button>
              </a>
              <span className="text-xs text-muted-foreground tracking-wider uppercase">
                {copy.note}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryGuide;
