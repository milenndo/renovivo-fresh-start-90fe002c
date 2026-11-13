import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import qualityWorkImage from "@/assets/images/quality-work.webp";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { language } = useLanguage();
  const en = language === "en";
  const details = en
    ? ["Accurate foundations and planes", "Attention to transitions and materials", "Communication at every stage", "Written scope and handover"]
    : ["Точни основи, равнини и линии", "Прецизни преходи и материали", "Комуникация на всеки етап", "Писмен обхват и приемане"];

  return (
    <section id="approach" className="bg-[#F0EEE9] py-20 md:py-28">
      <div className="container-custom grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="aspect-[5/4] overflow-hidden bg-[#D8D2C7]">
            <img src={qualityWorkImage} alt={en ? "Close-up of construction finishing details" : "Детайл от строително-довършителна работа"} width={900} height={720} decoding="async" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            <span>RENOVIVO</span>
            <span>{en ? "Craft / Precision" : "Изпълнение / Прецизност"}</span>
          </div>
        </div>
        <div className="lg:col-span-6 lg:pl-4">
          <p className="eyebrow mb-6">{en ? "The detail matters" : "Детайлът има значение"}</p>
          <h2 className="max-w-2xl text-[clamp(2.25rem,4vw,4.2rem)] font-semibold leading-[1.14] tracking-[-0.05em]">
            {en ? "Beautiful interiors begin with work you cannot see." : "Красивият интериор започва с работа, която не се вижда."}
          </h2>
          <p className="mt-7 max-w-lg text-base leading-[1.8] text-muted-foreground">
            {en
              ? "Preparing the substrate, accurate lines, smooth transitions and careful material choices shape the long-term quality of every renovation."
              : "Подготовката на основата, точните равнини, правилните преходи и вниманието към материалите определят качеството дълго след финалната снимка."}
          </p>
          <p className="mt-4 max-w-lg text-base leading-[1.8] text-muted-foreground">
            {en
              ? "We see renovation as a connected process of decisions, not a collection of isolated tasks."
              : "Затова гледаме на ремонта като на последователна система от решения, а не като на отделни задачи."}
          </p>
          <ul className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {details.map((detail) => (
              <li key={detail} className="flex items-start gap-3 border-t border-border pt-4 text-sm font-medium leading-relaxed text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#6A746B]" aria-hidden="true" />
                {detail}
              </li>
            ))}
          </ul>
          <Link to="/about" className="mt-10 inline-flex items-center gap-3 border-b border-foreground pb-2 text-sm font-semibold text-foreground transition-colors hover:text-[#6A746B]">
            {en ? "Learn about our approach" : "Научи повече за подхода ни"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
