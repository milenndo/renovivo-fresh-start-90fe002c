import { ArrowDownRight, ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/images/projects/living-room-detail.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";

/**
 * Light Architecture hero — editorial layout instead of a dark brand poster.
 * Photo is used as an atmospheric illustration, not as a verified completed case study.
 */
const Hero = () => {
  const { language } = useLanguage();
  const { openModal } = useInspectionRequest();
  const isEn = language === "en";

  return (
    <section aria-labelledby="home-hero-title" className="relative overflow-hidden bg-background text-foreground">
      <div className="container-custom grid min-h-[660px] grid-cols-1 items-stretch gap-10 pb-14 pt-14 lg:min-h-[740px] lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-20">
        <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-5">
          <div className="mb-9 flex items-center gap-4">
            <span className="h-px w-9 bg-[#6A746B]" aria-hidden="true" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-muted-foreground md:text-xs">
              {isEn ? "Renovations & finishing works · Sofia" : "Цялостни ремонти и довършителни работи · София"}
            </p>
          </div>

          <h1 id="home-hero-title" className="max-w-[760px] text-[clamp(2.45rem,5vw,5.2rem)] font-semibold leading-[1.07] tracking-[-0.055em] text-foreground">
            {isEn ? (
              <>Spaces finished with <span className="font-normal italic text-[#6A746B]" style={{ fontFamily: "'Literata', Georgia, serif" }}>attention to every detail.</span></>
            ) : (
              <>Пространства, завършени <span className="font-normal italic text-[#6A746B]" style={{ fontFamily: "'Literata', Georgia, serif" }}>с внимание към всеки детайл.</span></>
            )}
          </h1>

          <p className="mt-7 max-w-[520px] text-base leading-[1.75] text-muted-foreground md:mt-9 md:text-lg">
            {isEn
              ? "Complete apartment and house renovations in Sofia — from your first site visit and detailed quote to careful execution and handover."
              : "Цялостни ремонти на апартаменти и къщи — от първия оглед и подробната оферта до прецизното изпълнение и предаването на обекта."}
          </p>

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center md:mt-11">
            <button
              type="button"
              onClick={openModal}
              className="group inline-flex min-h-[52px] items-center justify-center gap-5 bg-foreground px-7 py-4 text-sm font-semibold text-background transition-colors duration-300 hover:bg-[#444D47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A746B]"
            >
              {isEn ? "Book a free site visit" : "Заяви безплатен оглед"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
            <Link to="/portfolio" className="group inline-flex min-h-12 items-center gap-3 border-b border-foreground py-3 text-sm font-semibold text-foreground transition-colors hover:text-[#6A746B]">
              {isEn ? "Explore projects" : "Разгледай проектите"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-7 text-[12px] leading-relaxed text-muted-foreground sm:grid-cols-3 lg:mt-16">
            <div>{isEn ? "One responsible project lead" : "Един отговорен ръководител"}</div>
            <div>{isEn ? "Detailed written estimate" : "Подробна писмена оферта"}</div>
            <div>{isEn ? "Contracted scope & schedule" : "Договорен обхват и срокове"}</div>
          </div>
        </div>

        <div className="relative flex min-h-[440px] flex-col lg:col-span-6 xl:col-span-7 lg:min-h-[640px]">
          <div className="relative h-full min-h-[440px] overflow-hidden bg-[#E3DFD6]">
            <img
              src={heroBackground}
              alt={isEn ? "Contemporary interior with architectural finishing details" : "Съвременен интериор с прецизни довършителни детайли"}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={1600}
              height={1200}
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 border-r border-t border-border bg-background/95 p-5 backdrop-blur-sm sm:p-7">
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {isEn ? "Renovivo / Design approach" : "Renovivo / Подход към детайла"}
              </p>
              <span className="text-sm font-medium tracking-tight text-foreground">
                {isEn ? "Function, material, precision." : "Функция. Материал. Прецизност."}
              </span>
            </div>
            <div className="absolute right-0 top-0 flex h-14 w-14 items-center justify-center bg-background/95 text-[#6A746B]" aria-hidden="true">
              <ArrowDownRight className="h-6 w-6" />
            </div>
          </div>
          <p className="pt-3 text-right text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {isEn ? "Architecture-inspired renovation" : "Ремонт с архитектурно мислене"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
