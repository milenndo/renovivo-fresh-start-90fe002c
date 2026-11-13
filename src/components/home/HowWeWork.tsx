import { Link } from "react-router-dom";
import { Search, FileText, Hammer, CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import budgetImage from "@/assets/images/blog/planning-renovation-2026.jpg";

const HowWeWork = () => {
  const { language } = useLanguage();
  const en = language === "en";
  const steps = [
    {Icon:Search,bg:"Оглед и консултация",en:"Visit & consultation",n:"01"},
    {Icon:FileText,bg:"Оферта и договор",en:"Quote & agreement",n:"02"},
    {Icon:Hammer,bg:"Изпълнение и контрол",en:"Execution & quality",n:"03"},
    {Icon:CheckCircle2,bg:"Предаване и гаранция",en:"Handover & warranty",n:"04"},
  ];

  return (
    <section id="process" className="bg-[#FAF9F6] py-16 md:py-24">
      <div className="container-custom grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#475448]">{en?"OUR PROCESS":"НАШИЯТ ПРОЦЕС"}</p>
          <h2 className="renovivo-editorial max-w-[560px] text-[clamp(2rem,3.3vw,3.6rem)] leading-[1.13] text-[#212823]">
            {en?<>A clear path <span className="italic text-[#586854]">to your finished home.</span></>:<>Ясен път <span className="italic text-[#586854]">към готовия дом.</span></>}
          </h2>
          <p className="mt-5 max-w-[450px] text-sm leading-[1.7] text-[#5B615B]">
            {en?"A structured process that starts long before the first day on site.":"Работим по ясен процес, който започва преди първия ден на обекта."}
          </p>
          <div className="relative mt-11 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-4 sm:gap-x-1">
            <span aria-hidden="true" className="absolute left-[11%] right-[11%] top-3 hidden h-px bg-[#D8D7CE] sm:block"/>
            {steps.map(({Icon,bg, en:english,n})=>(
              <div key={n} className="relative text-center">
                <div className="relative z-10 mx-auto mb-4 grid h-8 w-8 place-items-center rounded-full bg-[#E3E0D7] text-xs font-semibold text-[#424D41]">{n}</div>
                <Icon className="mx-auto mb-4 h-7 w-7 text-[#374438]" strokeWidth={1.4} aria-hidden="true"/>
                <h3 className="mx-auto max-w-[140px] text-[12px] font-semibold leading-[1.45] text-[#303D33]">{en?english:bg}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[340px] overflow-hidden rounded-[9px] bg-[#E5E5DD]">
          <img src={budgetImage} width={880} height={640} loading="lazy" decoding="async" alt="" className="absolute inset-0 h-full w-full object-cover object-center"/>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,249,246,0.98)_0%,rgba(250,249,246,0.94)_48%,rgba(250,249,246,0.25)_100%)]" aria-hidden="true"/>
          <div className="relative z-10 flex h-full max-w-[440px] flex-col items-start justify-center p-8 md:p-10">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#475448]">{en?"PLAN YOUR BUDGET":"ПЛАНИРАНЕ НА БЮДЖЕТА"}</p>
            <h3 className="renovivo-editorial text-[clamp(1.75rem,2.6vw,2.65rem)] leading-[1.2] text-[#242A26]">
              {en?<>Start with an estimate. <span className="italic text-[#586854]">Continue with a detailed quote.</span></>:<>Започнете с ориентир. <span className="italic text-[#586854]">Продължете с точна оферта.</span></>}
            </h3>
            <p className="mt-4 max-w-[310px] text-[13px] leading-[1.7] text-[#515950]">{en?"Choose your project type, area and finish level for an indicative price.":"Посочете типа проект, площта и нивото на завършване за ориентировъчна цена."}</p>
            <a href="#estimator" className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-md bg-[#52614F] px-5 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-[#303D33]">
              {en?"Calculate an estimate":"Изчисли ориентировъчна цена"} <ArrowRight className="h-4 w-4" aria-hidden="true"/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HowWeWork;
