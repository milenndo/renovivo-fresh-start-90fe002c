import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import apartmentImg from "@/assets/images/services/full-renovation.jpg";
import finishingImg from "@/assets/images/services/microcement-modern.jpg";
import houseImg from "@/assets/images/projects/living-room.jpg";
import bathroomImg from "@/assets/images/services/bathroom.jpg";

const Services = () => {
  const { language } = useLanguage();
  const en = language === "en";
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const services = [
    { href:"/services/apartment-renovation", img:apartmentImg, bg:"Цялостен ремонт на апартамент", en:"Complete apartment renovation", key:"01" },
    { href:"/services/finishing-works", img:finishingImg, bg:"Довършителни работи", en:"Interior finishing works", key:"02" },
    { href:"/services/house-renovation", img:houseImg, bg:"Ремонт на къща", en:"House renovation", key:"03" },
    { href:"/services/bathroom", img:bathroomImg, bg:"Бани и специализирани решения", en:"Bathrooms and specialist finishes", key:"04" },
  ];
  const move = (direction:number) => {
    const el=rail.current;
    if(!el) return;
    const next=Math.max(0,Math.min(services.length-1,active+direction));
    const item=el.children[next] as HTMLElement|undefined;
    if(!item) return;
    // Direct offset scrolling is more reliable than relative scrollBy in nested carousels.
    const left=item.getBoundingClientRect().left-el.getBoundingClientRect().left+el.scrollLeft;
    el.scrollTo({left,behavior:"smooth"});
    setActive(next);
  };
  const track = () => {
    const el=rail.current;
    const first=el?.children[0] as HTMLElement|undefined;
    if(!el||!first) return;
    const step=first.offsetWidth+12;
    setActive(Math.max(0,Math.min(services.length-1,Math.round(el.scrollLeft/step))));
  };

  return (
    <section id="services" className="overflow-hidden bg-[#FAF9F6] py-16 md:py-24">
      <div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-[minmax(245px,0.83fr)_minmax(0,2.17fr)] lg:gap-10">
          <div className="flex flex-col justify-between">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#475448]">{en?"WHAT WE DO":"КАКВО ИЗПЪЛНЯВАМЕ"}</p>
              <h2 className="renovivo-editorial max-w-lg text-[clamp(2rem,3.3vw,3.35rem)] leading-[1.16] text-[#212823]">
                {en?<>One partner <span className="italic text-[#586854]">for the whole renovation.</span></>:<>Един партньор <span className="italic text-[#586854]">за целия ремонт.</span></>}
              </h2>
              <p className="mt-6 max-w-[370px] text-[14px] leading-[1.75] text-[#5B615B]">
                {en?"We organize and deliver renovation works as one coordinated process, with a clear point of responsibility and attention to the final result.":"Организираме и изпълняваме ремонтните дейности като един последователен процес — с ясна отговорност и внимание към крайния резултат."}
              </p>
              <Link to="/services" className="mt-6 inline-flex items-center gap-3 border-b border-[#52614F] pb-2 text-sm font-semibold text-[#303D33] transition-colors hover:text-[#74866E]">
                {en?"Explore all services":"Виж всички услуги"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-7 hidden items-center gap-2 lg:flex">
              <button type="button" onClick={()=>move(-1)} aria-label={en?"Previous services":"Предишни услуги"} className="grid h-10 w-10 place-items-center rounded-full border border-[#D8DAD1] bg-white text-[#425342] hover:bg-[#E7EBE3]"><ChevronLeft className="h-5 w-5"/></button>
              <button type="button" onClick={()=>move(1)} aria-label={en?"Next services":"Следващи услуги"} className="grid h-10 w-10 place-items-center rounded-full border border-[#D8DAD1] bg-white text-[#425342] hover:bg-[#E7EBE3]"><ChevronRight className="h-5 w-5"/></button>
            </div>
          </div>
          <div className="min-w-0">
            <div
              ref={rail}
              role="region"
              aria-label={en?"Swipeable service gallery":"Галерия с услуги, плъзнете настрани"}
              onScroll={track}
              tabIndex={0}
              className="renovivo-rail -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 scroll-smooth sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
            >
              {services.map((service)=>(
                <Link
                  key={service.href}
                  to={service.href}
                  className="group relative min-h-[345px] w-[73vw] max-w-[360px] shrink-0 snap-start overflow-hidden rounded-[8px] bg-[#B7B9AD] sm:w-[42%] lg:w-[32%] lg:max-w-none lg:min-h-[420px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52614F]"
                >
                  <img src={service.img} width={600} height={800} loading="lazy" decoding="async" alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 motion-reduce:transform-none group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171B18]/85 via-[#171B18]/5 to-transparent" aria-hidden="true"/>
                  <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-white/15 text-white opacity-95 backdrop-blur-sm transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight className="h-4 w-4" aria-hidden="true"/></span>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <span className="mb-3 block text-[10px] tracking-[0.17em] text-white/75">{service.key} / RENOVIVO</span>
                    <h3 className="max-w-[250px] text-[17px] font-medium leading-[1.35]">{en?service.en:service.bg}</h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between lg:hidden">
              <span className="text-[11px] tracking-[0.07em] text-[#6B7468]">{en?"Swipe to explore":"Плъзни за още услуги"} · {String(active+1).padStart(2,"0")} / 04</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={()=>move(-1)} aria-label={en?"Previous":"Назад"} className="grid h-10 w-10 place-items-center rounded-full border border-[#D8DAD1] bg-white text-[#425342]"><ChevronLeft className="h-5 w-5"/></button>
                <button type="button" onClick={()=>move(1)} aria-label={en?"Next":"Напред"} className="grid h-10 w-10 place-items-center rounded-full border border-[#D8DAD1] bg-white text-[#425342]"><ChevronRight className="h-5 w-5"/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Services;
