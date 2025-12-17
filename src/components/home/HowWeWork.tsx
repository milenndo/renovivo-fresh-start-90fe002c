import { Eye, FileText, Hammer, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Eye,
    number: "01",
    title: "Оглед и разговор",
    description: "Посещаваме обекта, изслушваме вашите желания и оценяваме обема на работа."
  },
  {
    icon: FileText,
    number: "02",
    title: "Предложение и бюджет",
    description: "Изготвяме детайлна оферта с ясни срокове и прозрачно ценообразуване."
  },
  {
    icon: Hammer,
    number: "03",
    title: "Изпълнение по график",
    description: "Работим по съгласуван план с редовна комуникация за напредъка."
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Финален преглед и гаранция",
    description: "Приемане на обекта с детайлна проверка и гаранция за извършената работа."
  }
];

const HowWeWork = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Как работим
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Прозрачен и организиран процес от първия контакт до завършването на проекта
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:border-primary/50 transition-colors relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
