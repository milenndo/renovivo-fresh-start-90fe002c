import { User, Calculator, FileText, Sparkles, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: User,
title: "Личен Управител на Проект",    description: "Един човек отговаря за целия обект и комуникацията. Край на разваления телефон.",
  },
  {
    icon: Calculator,
    title: "Фиксиран Бюджет",
    description: "Цената по оферта е крайна. Без скрити такси и изненадващи разходи.",
  },
  {
    icon: FileText,
    title: "Договор и Срокове",
    description: "Работим с ясни неустойки при забавяне. Времето ви е ценно.",
  },
  {
    icon: Sparkles,
    title: "Чистота До Ключ",
    description: "Професионално почистване и извозване на отпадъци след края.",
  },
  {
    icon: Shield,
    title: "Писмена Гаранция",
description: "Пълна гаранция за вся извършена работа и материали.",  },
];

const PeaceOfMind = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            5 причини да спите спокойно, докато ние работим
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <reason.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeaceOfMind;
