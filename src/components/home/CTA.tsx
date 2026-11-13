import { ArrowUpRight, Phone } from "lucide-react";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import { useLanguage } from "@/contexts/LanguageContext";

const CTA = () => {
  const { openModal } = useInspectionRequest();
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <section className="relative overflow-hidden bg-[#282D2B] py-20 text-[#FAF9F6] md:py-28">
      <div className="container-custom">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.19em] text-[#C5CCC5]">
              {en ? "Your next project" : "Вашият следващ проект"}
            </p>
            <h2 className="max-w-3xl text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[1.08] tracking-[-0.055em]">
              {en ? "Let's begin with a clear plan." : "Нека започнем с ясен план."}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-[1.75] text-[#D6DBD6] md:text-lg">
              {en
                ? "Tell us about your property and plans. We'll discuss the options, arrange a site visit and prepare a detailed quote."
                : "Разкажете ни за имота и идеята си. Ще обсъдим възможностите, ще организираме оглед и ще подготвим конкретна оферта."}
            </p>
          </div>
          <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-start lg:pb-2">
            <button type="button" onClick={openModal} className="inline-flex min-h-[52px] items-center gap-5 bg-[#FAF9F6] px-7 py-4 text-sm font-semibold text-[#282D2B] transition-colors hover:bg-[#E5E7DF]">
              {en ? "Request a free site visit" : "Заяви безплатен оглед"}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a href="tel:+359893712919" className="inline-flex items-center gap-3 border-b border-[#ADB7AF] pb-2 text-sm font-medium text-[#FAF9F6]">
              <Phone className="h-4 w-4" aria-hidden="true" />
              +359 89 371 29 19
            </a>
          </div>
        </div>
        <div className="mt-16 h-px bg-[#6A746B]/55" />
        <div className="mt-5 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.18em] text-[#ADB7AF]">
          <span>RENOVIVO</span>
          <span>{en ? "Renovations in Sofia" : "Цялостни ремонти в София"}</span>
        </div>
      </div>
    </section>
  );
};

export default CTA;
