import { Users, Focus, MessageSquare, Calculator, MapPin } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Специализирани експерти",
    description: "Тясно специализирани професионалисти във всяко звено на ремонтните дейности.",
  },
  {
    icon: Focus,
    title: "Фокус върху детайла",
    description: "Координация на целия процес с внимание към всеки детайл от началото до края.",
  },
  {
    icon: MessageSquare,
    title: "Ясна комуникация",
    description: "Един контакт за клиента. Без излишни посредници, директна и прозрачна връзка.",
  },
  {
    icon: Calculator,
    title: "Предвидим бюджет",
    description: "Ясно ценообразуване и спазване на договорените срокове без неприятни изненади.",
  },
];

const WhyUs = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Защо Renovivo</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Какво ни отличава
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Избирайки Renovivo, вие избирате партньор, който се грижи за вашия проект 
            като за свой собствен. Работим основно в София и района.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                <reason.icon className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sofia badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full">
            <MapPin className="h-5 w-5" />
            <span className="font-medium">Работим в София и района</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;