import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects as allProjects } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";

const prioritized = [
  ...allProjects.filter((p)=>["full","living","kitchen","bathroom"].includes(p.categoryId)),
  ...allProjects.filter((p)=>!["full","living","kitchen","bathroom"].includes(p.categoryId)),
].slice(0,7);

const Projects = () => {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { language } = useLanguage();
  const en = language === "en";

  const goTo = (index:number) => {
    const next=Math.max(0,Math.min(prioritized.length-1,index));
    const el=rail.current;
    const item=el?.children[next] as HTMLElement|undefined;
    if(el&&item) {
      const left=item.getBoundingClientRect().left-el.getBoundingClientRect().left+el.scrollLeft;
      el.scrollTo({left,behavior:"smooth"});
    }
    setActive(next);
  };
  const onScroll = () => {
    const el=rail.current; if(!el) return;
    const first=el.children[0] as HTMLElement|undefined;
    if(!first) return;
    const step=first.offsetWidth+16;
    setActive(Math.max(0,Math.min(prioritized.length-1,Math.round(el.scrollLeft/step))));
  };

  return (
    <section id="projects" className="overflow-hidden border-y border-[#E8E7E1] bg-[#F0EEE9] py-16 md:py-24">
      <div className="container-custom">
        <div className="mb-9 flex flex-col justify-between gap-6 md:mb-12 lg:flex-row lg:items-end">
          <div className="max-w-[700px]">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#475448]">{en?"PROJECTS / INTERIORS":"ПРОЕКТИ / ИНТЕРИОРИ"}</p>
            <h2 className="renovivo-editorial text-[clamp(2rem,3.8vw,3.8rem)] leading-[1.15] text-[#212823]">
              {en?<>Quality is in <span className="italic text-[#586854]">the execution.</span></>:<>Качеството се вижда <span className="italic text-[#586854]">в изпълнението.</span></>}
            </h2>
            <p className="mt-4 max-w-[520px] text-[14px] leading-[1.7] text-[#5B615B]">
              {en?"Discover interiors, material details and construction solutions in our project collection.":"Разгледайте пространства, материали и решения в нашата колекция от проекти."}
            </p>
          </div>
          <div className="flex items-center justify-between gap-5">
            <Link to="/portfolio" className="inline-flex items-center gap-2 whitespace-nowrap border-b border-[#52614F] pb-2 text-sm font-semibold text-[#303D33] hover:text-[#74866E]">
              {en?"All projects":"Всички проекти"} <ArrowRight className="h-4 w-4" aria-hidden="true"/>
            </Link>
            <div className="flex items-center gap-2">
              <button type="button" onClick={()=>goTo(active-1)} aria-label={en?"Previous project":"Предишен проект"} className="grid h-10 w-10 place-items-center rounded-full border border-[#D9D9D1] bg-[#FAF9F6] text-[#425342] hover:bg-white"><ChevronLeft className="h-5 w-5"/></button>
              <button type="button" onClick={()=>goTo(active+1)} aria-label={en?"Next project":"Следващ проект"} className="grid h-10 w-10 place-items-center rounded-full border border-[#D9D9D1] bg-[#FAF9F6] text-[#425342] hover:bg-white"><ChevronRight className="h-5 w-5"/></button>
            </div>
          </div>
        </div>

        <div
          ref={rail}
          role="region"
          tabIndex={0}
          aria-label={en?"Project carousel":"Галерия с проекти, плъзнете настрани"}
          onScroll={onScroll}
          className="renovivo-rail -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-3 scroll-smooth sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        >
          {prioritized.map((project,index)=>(
            <Link key={project.id} to={"/portfolio/"+project.id} className="group relative block h-[270px] w-[84%] shrink-0 snap-start overflow-hidden rounded-[9px] bg-[#BCBDB4] sm:h-[310px] sm:w-[49%] lg:h-[365px] lg:w-[35%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52614F]">
              <img src={project.mainImage} alt={project.title} width={950} height={650} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 motion-reduce:transform-none group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#101910]/80 via-transparent to-transparent" aria-hidden="true"/>
              <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/70 bg-[#F8F8F4]/90 text-[#303D33] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight className="h-5 w-5" aria-hidden="true"/></span>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-white/80">{String(index+1).padStart(2,"0")+" / "+project.category}</p>
                <h3 className="text-[18px] font-semibold leading-snug">{project.title}</h3>
                <p className="mt-1 text-xs text-white/80">{project.location}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-center gap-2" role="group" aria-label={en?"Select project":"Избор на проект"}>
          {prioritized.map((project,index)=>(
            <button key={project.id} type="button" onClick={()=>goTo(index)} aria-label={en?"Project "+(index+1):"Проект "+(index+1)} aria-pressed={index===active} className={"h-2 rounded-full transition-all "+(index===active?"w-5 bg-[#586854]":"w-2 bg-[#C5C6BC] hover:bg-[#8F9A89]")}/>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Projects;
