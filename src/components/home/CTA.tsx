import { ArrowUpRight, Phone } from "lucide-react";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import { useLanguage } from "@/contexts/LanguageContext";
import background from "@/assets/images/projects/living-room-after.jpg";

const CTA = () => {
  const { openModal }=useInspectionRequest();
  const { language }=useLanguage();
  const en=language==="en";
  return (
    <section className="relative isolate overflow-hidden bg-[#52614F] py-16 text-white md:py-24">
      <div className="absolute inset-0 -z-10">
        <img src={background} alt="" width={1920} height={1080} loading="lazy" decoding="async" className="h-full w-full object-cover object-right opacity-[0.17]"/>
        <div className="absolute inset-0 bg-gradient-to-r from-[#52614F]/95 via-[#52614F]/85 to-[#52614F]/60"/>
      </div>
      <div className="container-custom grid gap-9 md:grid-cols-[1.5fr_0.75fr] md:items-end">
        <div>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#DAE1D8]">{en?"YOUR NEXT PROJECT":"ВАШИЯТ СЛЕДВАЩ ПРОЕКТ"}</p>
          <h2 className="renovivo-editorial max-w-[790px] text-[clamp(2.1rem,4.5vw,4.7rem)] leading-[1.13] text-white">
            {en?"Let's discuss your idea.":"Нека обсъдим идеята ви."}
          </h2>
          <p className="mt-5 max-w-[580px] text-sm leading-[1.75] text-[#E4EAE2] md:text-base">
            {en?"We will review your property, organize a site visit and prepare a clear quote.":"Организираме оглед, обсъждаме възможностите и подготвяме конкретна оферта."}
          </p>
        </div>
        <div className="flex flex-col items-start gap-5 md:pb-1">
          <button type="button" onClick={openModal} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-[#FAF9F6] px-6 py-3 text-sm font-semibold text-[#303D33] transition-colors hover:bg-white">
            {en?"Book a free site visit":"Заяви безплатен оглед"} <ArrowUpRight className="h-4 w-4" aria-hidden="true"/>
          </button>
          <a href="tel:+359893712919" className="inline-flex items-center gap-3 border-b border-white/60 pb-2 text-sm font-medium text-white hover:border-white"><Phone className="h-4 w-4" aria-hidden="true"/> +359 89 371 29 19</a>
        </div>
      </div>
    </section>
  );
};
export default CTA;
