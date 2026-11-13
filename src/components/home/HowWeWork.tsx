import { useLanguage } from "@/contexts/LanguageContext";

const HowWeWork = () => {
  const { language } = useLanguage();
  const en = language === "en";
  const steps = en
    ? [
        ["01", "Site visit", "We review the property, your priorities and its technical constraints."],
        ["02", "Quote & agreement", "We clarify quantities, materials, scope, cost and deadlines."],
        ["03", "Execution", "We coordinate the work and keep you informed about progress."],
        ["04", "Handover", "We review the finished result and hand over the project."],
      ]
    : [
        ["01", "Оглед", "Запознаваме се с обекта, вашите идеи и техническите ограничения."],
        ["02", "Оферта и договор", "Уточняваме обхват, количества, материали, цена и срокове."],
        ["03", "Изпълнение", "Координираме работите и ви информираме за напредъка."],
        ["04", "Предаване", "Преглеждаме резултата и предаваме завършения обект."],
      ];

  return (
    <section id="process" className="border-b border-border bg-background py-20 md:py-28">
      <div className="container-custom">
        <div className="mb-12 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow mb-5">{en ? "Process / Clear from day one" : "Процес / Яснота от първия ден"}</p>
            <h2 className="max-w-3xl text-[clamp(2.25rem,4.2vw,4.4rem)] font-semibold leading-[1.13] tracking-[-0.05em]">
              {en ? "Good renovations begin before work starts." : "Добрият ремонт започва преди първия работен ден."}
            </h2>
          </div>
          <p className="self-end text-base leading-[1.7] text-muted-foreground md:col-span-4">
            {en ? "Four practical steps and one clear line of responsibility." : "Четири ясни стъпки и една последователна линия на отговорност."}
          </p>
        </div>
        <div className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([n,title,description],i) => (
            <div key={n} className={`border-b border-border px-0 py-9 sm:px-5 lg:min-h-[260px] lg:border-b-0 lg:px-7 ${i>0?"lg:border-l lg:border-border":""}`}>
              <div className="mb-12 flex items-center justify-between">
                <span className="text-xs font-medium tracking-[0.2em] text-[#6A746B]">{n}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#6A746B]" aria-hidden="true" />
              </div>
              <h3 className="mb-3 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="max-w-[290px] text-sm leading-[1.7] text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowWeWork;
