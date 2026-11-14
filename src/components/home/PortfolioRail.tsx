import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { portfolioProjects, localText as tr } from "@/data/portfolioProjects";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PortfolioRail() {
  const { language } = useLanguage();
  const en = language === "en";
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const moveTo = (index: number) => {
    const track = rail.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement;
    const card = track.children[index] as HTMLElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: reducedMotion ? "instant" : "smooth" });
  };

  const updateActive = () => {
    const track = rail.current;
    if (!track) return;
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 3) {
      setActive(portfolioProjects.length - 1);
      return;
    }
    const first = track.children[0] as HTMLElement;
    let nearest = 0;
    let distance = Infinity;
    Array.from(track.children).forEach((child, index) => {
      const delta = Math.abs((child as HTMLElement).offsetLeft - first.offsetLeft - track.scrollLeft);
      if (delta < distance) { distance = delta; nearest = index; }
    });
    setActive(nearest);
  };

  return (
    <section id="projects" className="overflow-hidden border-y border-[#E7E4DC] bg-[#F6F4F0] py-10 md:py-14">
      <div className="container-custom grid gap-7 lg:grid-cols-[minmax(240px,0.83fr)_minmax(0,2.2fr)] lg:items-center lg:gap-10">
        <div>
          <p className="rv-kicker mb-3">{en ? "APARTMENT PROJECTS" : "АПАРТАМЕНТНИ ПРОЕКТИ"}</p>
          <h2 className="rv-heading-serif text-[clamp(1.75rem,3.3vw,3.2rem)] leading-[1.12] text-[#232A24]">
            {en ? <>Thoughtful spaces.<br /><em>A home of your own.</em></> : <>Обмислени пространства.<br /><em>Дом със свой характер.</em></>}
          </h2>
          <p className="mt-4 max-w-[340px] text-[13px] leading-[1.75] text-[#4A5149] md:text-sm">
            {en ? "From the living room to the smallest detail. Explore apartment interiors that bring together everyday comfort, considered materials and practical layouts."
              : "От дневната до най-малкия детайл. Апартаментни интериори, които съчетават удобство, внимателно подбрани материали и практично разпределение."}
          </p>
          <Link to="/portfolio" className="rv-text-link mt-5">{en ? "View the projects" : "Разгледай проектите"} <ArrowRight className="h-4 w-4" /></Link>

        </div>
        <div className="min-w-0">
          <div ref={rail} id="home-project-gallery" onScroll={updateActive} tabIndex={0}
            aria-label={en ? "Apartment projects — swipe or use the controls" : "Апартаментни проекти — плъзни или използвай стрелките"}
            className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain rounded-[7px] pb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#50614E] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {portfolioProjects.map(project => (
              <Link to={`/portfolio/${project.id}`} key={project.id}
                className="group relative isolate block aspect-[4/3] w-[86%] shrink-0 snap-start overflow-hidden rounded-[7px] bg-[#D5D6CB] sm:w-[70%]">
                <img src={project.rooms[0].image} alt={tr(project.rooms[0].alt, language)} width={900} height={600} loading="lazy" decoding="async"
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transition-none" />
                <span className="absolute inset-0 -z-10 bg-gradient-to-t from-[#17241B]/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white md:p-6">
                  <div>
                    <p className="mb-2 text-[10px] font-semibold tracking-[.16em] text-white/85">{project.number} / {en ? "APARTMENT" : "АПАРТАМЕНТ"}</p>
                    <h3 className="rv-heading-serif text-[clamp(1.35rem,2.3vw,2.1rem)] leading-[1.15]">{tr(project.shortTitle, language)}</h3>
                    <p className="mt-2 text-xs text-white/85">{tr(project.typology, language)}</p>
                  </div>
                  <ArrowUpRight className="h-6 w-6 shrink-0" />
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex gap-1" aria-label={en ? "Choose a project" : "Избери проект"}>
              {portfolioProjects.map((project, index) => (
                <button key={project.id} type="button" onClick={() => moveTo(index)} aria-current={active === index ? "true" : undefined}
                  aria-label={`${en ? "Show" : "Покажи"} ${tr(project.shortTitle, language)}`} className="grid h-9 w-9 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#50614E]">
                  <span className={`h-2 w-2 rounded-full transition-colors ${active === index ? "bg-[#50614E]" : "bg-[#D1D0C6]"}`} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" aria-controls="home-project-gallery" onClick={() => moveTo(active - 1)} disabled={active === 0} aria-label={en ? "Previous project" : "Предишен проект"} className="rv-round-button disabled:cursor-default disabled:opacity-35"><ChevronLeft className="h-4 w-4" /></button>
              <button type="button" aria-controls="home-project-gallery" onClick={() => moveTo(active + 1)} disabled={active === portfolioProjects.length - 1} aria-label={en ? "Next project" : "Следващ проект"} className="rv-round-button disabled:cursor-default disabled:opacity-35"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
