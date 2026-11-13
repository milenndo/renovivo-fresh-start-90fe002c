import { useLanguage } from "@/contexts/LanguageContext";

const PeaceOfMind = () => {
  const { language } = useLanguage();
  const en = language === "en";
  const points = en
    ? [
        ["01", "One project lead", "A clear point of responsibility throughout the renovation."],
        ["02", "Detailed estimate", "A written offer with quantities and agreed scope."],
        ["03", "Contracted terms", "Agreed deadlines and conditions before execution."],
        ["04", "Project updates", "Consistent communication as work progresses."],
        ["05", "Warranty", "Warranty terms outlined in the agreement."],
      ]
    : [
        ["01", "Един отговорен ръководител", "Един контакт и ясна отговорност през целия ремонт."],
        ["02", "Подробна оферта", "Писмена оферта с количества и договорен обхват."],
        ["03", "Договорени условия", "Предварително уточнени срокове и ангажименти."],
        ["04", "Информация за напредъка", "Последователна комуникация по време на работата."],
        ["05", "Гаранционни условия", "Условия за гаранцията, посочени в договора."],
      ];

  return (
    <section aria-label={en ? "Our process commitments" : "Нашите ангажименти"} className="border-y border-border bg-[#F0EEE9]">
      <div className="container-custom grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {points.map(([number, title, description], index) => (
          <div key={number} className={`py-8 pr-6 md:py-11 ${index > 0 ? "lg:border-l lg:border-border lg:pl-6" : ""} ${index > 0 ? "border-t border-border sm:border-t-0" : ""}`}>
            <p className="mb-5 text-[11px] font-medium tracking-[0.12em] text-[#6A746B]">{number} / 05</p>
            <h2 className="mb-3 text-base font-semibold leading-snug tracking-tight text-foreground">{title}</h2>
            <p className="text-[13px] leading-relaxed text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PeaceOfMind;
