import { MapPin } from "lucide-react";

// Sofia districts we actively serve — used for local SEO signal and internal linking.
export const sofiaDistricts = [
  "Център",
  "Лозенец",
  "Изток",
  "Изгрев",
  "Витоша",
  "Драгалевци",
  "Симеоново",
  "Бояна",
  "Младост",
  "Студентски град",
  "Дружба",
  "Люлин",
  "Овча купел",
  "Красно село",
  "Красна поляна",
  "Слатина",
  "Подуяне",
  "Сердика",
  "Триадица",
  "Оборище",
  "Банкя",
];

// Cities in the wider София-област we cover.
export const sofiaRegionCities = [
  "Банкя",
  "Божурище",
  "Костинброд",
  "Своге",
  "Самоков",
  "Ихтиман",
  "Елин Пелин",
  "Ботевград",
];

interface SofiaAreasSectionProps {
  title?: string;
  intro?: string;
  variant?: "light" | "muted";
}

const SofiaAreasSection = ({
  title = "Работим в цяла София и София-област",
  intro = "Renovivo извършва ремонтни услуги във всички райони на София, както и в градовете от София-област. Един координиран екип от А до Я, безплатен оглед и писмена оферта.",
  variant = "muted",
}: SofiaAreasSectionProps) => {
  return (
    <section className={variant === "muted" ? "section-padding bg-secondary/40" : "section-padding"}>
      <div className="container-custom">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-wider mb-3">
            <MapPin className="h-4 w-4" />
            <span>Локално покритие</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground leading-relaxed">{intro}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-lg">Райони на София</h3>
            <ul className="flex flex-wrap gap-2">
              {sofiaDistricts.map((d) => (
                <li
                  key={d}
                  className="px-3 py-1.5 rounded-full bg-background border border-border text-sm"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-lg">София-област</h3>
            <ul className="flex flex-wrap gap-2">
              {sofiaRegionCities.map((c) => (
                <li
                  key={c}
                  className="px-3 py-1.5 rounded-full bg-background border border-border text-sm"
                >
                  {c}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-6">
              Не виждате вашия район? Свържете се с нас – в повечето случаи организираме оглед в рамките на 48 часа.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SofiaAreasSection;
