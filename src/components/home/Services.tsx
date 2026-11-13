import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import apartmentImage from "@/assets/images/services/apartment-renovation.jpg";
import finishingImage from "@/assets/images/services/painting.jpg";
import houseImage from "@/assets/images/services/full-renovation.jpg";
import bathroomImage from "@/assets/images/services/bathroom.jpg";

const Services = () => {
  const { language } = useLanguage();
  const en = language === "en";

  const services = [
    {
      href: "/services/apartment-renovation",
      image: apartmentImage,
      title: en ? "Apartment renovations" : "Цялостен ремонт на апартамент",
      description: en ? "Coordinated building, installation and finishing works." : "Обновяване на жилища с координирани строителни, инсталационни и довършителни дейности.",
    },
    {
      href: "/services/finishing-works",
      image: finishingImage,
      title: en ? "Finishing works" : "Довършителни работи",
      description: en ? "From unfinished new-build spaces to a home ready to move into." : "Превръщаме жилище по БДС в готово пространство, съобразено с начина ви на живот.",
    },
    {
      href: "/services/house-renovation",
      image: houseImage,
      title: en ? "House renovations" : "Ремонт на къща",
      description: en ? "Carefully planned renovation work tailored to the property." : "Планиране и изпълнение на комплексни ремонтни работи според особеностите на имота.",
    },
    {
      href: "/services/bathroom",
      image: bathroomImage,
      title: en ? "Bathrooms & specialist finishes" : "Бани и специализирани решения",
      description: en ? "Durable details, suitable materials and reliable execution." : "Прецизни детайли, подходящи материали и устойчиво изпълнение в помещения с високи изисквания.",
    },
  ];

  return (
    <section id="services" className="bg-[#F0EEE9] py-20 md:py-28">
      <div className="container-custom">
        <div className="mb-12 grid grid-cols-1 gap-8 lg:mb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">{en ? "Services / What we do" : "Услуги / Какво изпълняваме"}</p>
            <h2 className="text-[clamp(2.25rem,4.2vw,4.3rem)] font-semibold leading-[1.15] tracking-[-0.05em] text-foreground">
              {en ? "One partner for the whole renovation." : "Един партньор за целия ремонт."}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-base leading-[1.75] text-muted-foreground">
              {en
                ? "We organize and carry out the renovation as one coordinated process, with clear responsibility and attention to the end result."
                : "Организираме и изпълняваме ремонтните дейности като последователен процес — с ясна отговорност, координация и внимание към крайния резултат."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <Link key={service.href} to={service.href} className="group flex flex-col overflow-hidden border border-border bg-background transition-colors duration-300 hover:border-[#6A746B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A746B]">
              <div className="relative aspect-[5/4] overflow-hidden bg-secondary">
                <img src={service.image} alt="" loading="lazy" decoding="async" width={600} height={480} className="h-full w-full object-cover transition-transform duration-700 motion-reduce:transform-none group-hover:scale-[1.035]" />
              </div>
              <div className="flex min-h-[225px] flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[11px] font-medium tracking-[0.15em] text-[#6A746B]">{String(index + 1).padStart(2, "0")}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-foreground">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-right">
          <Link to="/services" className="inline-flex items-center gap-3 border-b border-foreground pb-2 text-sm font-semibold text-foreground hover:text-[#6A746B]">
            {en ? "Explore all services" : "Виж всички услуги"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
