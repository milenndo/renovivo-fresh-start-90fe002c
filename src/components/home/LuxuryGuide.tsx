import { useState } from "react";
import { Download, ArrowUpRight, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import GuideDownloadDialog from "@/components/GuideDownloadDialog";
import planningImage from "@/assets/images/blog/planning-renovation-2026.jpg";

/** Existing lead magnet, restyled for the approved Renovivo editorial direction. */
const LuxuryGuide = () => {
  const { language } = useLanguage();
  const [open,setOpen] = useState(false);
  const en = language === "en";
  return (
    <section className="bg-[#F0EEE9] py-16 md:py-20">
      <div className="container-custom grid overflow-hidden rounded-[9px] bg-[#FAF9F6] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="relative min-h-[225px] bg-[#DDD9CF] md:min-h-[360px]">
          <img src={planningImage} alt={en?"Materials and architectural planning illustration":"Материали и скица за планиране на ремонта"} width={760} height={560} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#253328]/60 to-transparent" aria-hidden="true"/>
          <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
            <BookOpen className="h-7 w-7" strokeWidth={1.5} aria-hidden="true"/>
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">RENOVIVO / GUIDE</span>
          </div>
        </div>
        <div className="flex flex-col justify-center p-7 md:p-12">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#64715F]">{en?"PLAN YOUR PROJECT":"ПЛАНИРАЙТЕ СВОЯ ПРОЕКТ"}</p>
          <h2 className="renovivo-editorial max-w-[540px] text-[clamp(2rem,3vw,3.25rem)] leading-[1.16] text-[#242A26]">
            {en?<>A clear renovation <span className="italic text-[#586854]">starts with knowledge.</span></>:<>Добрият ремонт започва <span className="italic text-[#586854]">с ясна информация.</span></>}
          </h2>
          <p className="mt-5 max-w-[540px] text-sm leading-[1.75] text-[#5B615B]">
            {en?"Download our client handbook covering renovation stages, schedules, costs and the handover process.":"Изтеглете ръководството за възложителя — етапи, срокове, КСС, плащания и приемане на обекта."}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <button type="button" onClick={()=>setOpen(true)} className="inline-flex min-h-11 items-center gap-3 rounded-md bg-[#52614F] px-5 py-3 text-[13px] font-semibold text-white hover:bg-[#303D33]">
              <Download className="h-4 w-4" aria-hidden="true"/>
              {en?"Download the PDF handbook":"Изтегли ръководството (PDF)"}
            </button>
            <span className="inline-flex items-center gap-2 text-xs text-[#6A746B]">{en?"Email required":"Изисква имейл"} <ArrowUpRight className="h-3 w-3"/></span>
          </div>
        </div>
      </div>
      <GuideDownloadDialog open={open} onOpenChange={setOpen}/>
    </section>
  );
};
export default LuxuryGuide;
