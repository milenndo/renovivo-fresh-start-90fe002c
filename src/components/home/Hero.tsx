import { useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroLiving from "@/assets/images/projects/living-room-after.jpg";
import heroDetail from "@/assets/images/projects/living-room-detail.jpg";
import heroKitchen from "@/assets/images/hero-kitchen.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";

const heroImages = [
  { src: heroLiving, bgAlt: "Светъл интериор с дневна, кухня и трапезария" },
  { src: heroDetail, bgAlt: "Дневна с дървени облицовки и интериорни детайли" },
  { src: heroKitchen, bgAlt: "Детайл от съвременна кухня с естествени материали" },
];

/** Mobile-first immersive hero modeled on the two approved Renovivo mockups. */
const Hero = () => {
  const [activeImage, setActiveImage] = useState(0);
  const { language } = useLanguage();
  const { openModal } = useInspectionRequest();
  const en = language === "en";

  return (
    <section aria-labelledby="home-hero-title" className="relative isolate overflow-hidden bg-[#EDEAE5]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          key={activeImage}
          src={heroImages[activeImage].src}
          alt={heroImages[activeImage].bgAlt}
          width={1920}
          height={1080}
          fetchPriority={activeImage === 0 ? "high" : "auto"}
          loading={activeImage === 0 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full animate-fade-in object-cover object-[62%_center] sm:object-[56%_center] lg:object-[center_48%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,249,246,0.97)_0%,rgba(250,249,246,0.94)_21%,rgba(250,249,246,0.72)_48%,rgba(250,249,246,0.12)_100%)] lg:bg-[linear-gradient(90deg,rgba(250,249,246,0.98)_0%,rgba(250,249,246,0.92)_28%,rgba(250,249,246,0.48)_52%,rgba(250,249,246,0.03)_83%)]" />
      </div>

      <div className="container-custom relative z-10 flex min-h-[675px] flex-col justify-start pb-28 pt-9 sm:min-h-[730px] sm:pt-14 lg:min-h-[660px] lg:justify-center lg:pb-24 lg:pt-16">
        <div className="max-w-[590px]">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3F493E] sm:text-xs">
            {en ? "RENOVATIONS & FINISHING WORKS · SOFIA" : "РЕМОНТИ И ДОВЪРШИТЕЛНИ РАБОТИ · СОФИЯ"}
          </p>
          <h1 id="home-hero-title" className="max-w-[660px] font-[Literata] text-[clamp(2.02rem,7.7vw,3.9rem)] font-normal leading-[1.12] tracking-[-0.045em] text-[#242A26] lg:text-[clamp(3.65rem,4.4vw,5.3rem)]">
            {en ? (
              <>Spaces finished with attention <span className="italic text-[#586854]">to every detail.</span></>
            ) : (
              <>Пространства, завършени с внимание <span className="italic text-[#586854]">към всеки детайл.</span></>
            )}
          </h1>
          <p className="mt-6 max-w-[440px] text-[14px] leading-[1.65] text-[#333C34] sm:mt-8 sm:text-base">
            {en
              ? "Complete renovations for apartments and houses — a clear process, attentive execution and one responsible team."
              : "Цялостни ремонти на апартаменти и къщи — с ясен процес, контрол и прецизно изпълнение."}
          </p>

          <div className="mt-7 flex w-full max-w-[455px] flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <button type="button" onClick={openModal} className="group inline-flex min-h-[49px] items-center justify-center gap-3 rounded-md bg-[#303D33] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_7px_22px_rgba(27,45,31,0.12)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#425344] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#303D33]">
              {en ? "Book a free site visit" : "Заяви безплатен оглед"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <Link to="/portfolio" className="inline-flex min-h-[49px] items-center justify-center rounded-md border border-[#445044] bg-[#FAF9F6]/75 px-6 py-3 text-[13px] font-semibold text-[#303D33] backdrop-blur-sm transition-colors hover:bg-[#FAF9F6]">
              {en ? "Explore projects" : "Разгледай проектите"}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-7 left-4 right-4 flex items-center justify-between sm:left-6 sm:right-6 lg:left-8 lg:right-8">
          <div className="flex items-center gap-2.5 rounded-full bg-[#FAF9F6]/90 px-3.5 py-2.5 shadow-sm backdrop-blur-sm" role="group" aria-label={en ? "Hero image selection" : "Избор на основна снимка"}>
            {heroImages.map((photo, index) => (
              <button
                type="button"
                key={photo.src}
                onClick={() => setActiveImage(index)}
                aria-label={en ? "Image " + (index + 1) : "Снимка " + (index + 1)}
                aria-pressed={activeImage === index}
                className={"h-2 rounded-full transition-all duration-300 " + (activeImage === index ? "w-5 bg-[#586854]" : "w-2 bg-[#C6C8BD] hover:bg-[#7C887B]")}
              />
            ))}
          </div>
          <a href="#services" className="grid h-10 w-10 place-items-center rounded-full border border-[#D6D7CD] bg-[#FAF9F6]/95 text-[#303D33] shadow-sm transition-transform hover:translate-y-1" aria-label={en ? "Explore services" : "Към услугите"}>
            <ArrowDown className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
