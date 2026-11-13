import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Home, Layers3, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { renovationProject01 as project, localText as l } from "@/data/portfolioProject01";

/** Deliberately ONE concept: more projects appear only after separate review and sign-off. */
export default function PortfolioPage() {
  const { language } = useLanguage();
  const en = language === "en";
  return (
    <>
      <Helmet>
        <title>{en ? "Complete apartment renovation concepts | RENOVIVO" : "Цялостни ремонти на апартаменти · Проект 01 | RENOVIVO"}</title>
        <meta name="description" content={en
          ? "Explore a complete apartment renovation concept room by room: living room, kitchen, bedroom, bathroom and hallway. Illustrative visualizations."
          : "Разгледайте концепция за цялостен ремонт на апартамент — дневна, кухня, спалня, баня и антре. Илюстративни визуализации, без измислени изпълнени обекти."} />
        <link rel="canonical" href="https://renovivo.bg/portfolio" />
      </Helmet>
      <Layout>
        <div className="bg-[#FAF9F6] text-[#273229]">
          <section className="border-b border-[#E7E6DE] py-12 md:py-20">
            <div className="container-custom">
              <Link to="/" className="mb-9 inline-flex items-center gap-2 text-xs font-medium text-[#52614F] hover:underline"><Home className="h-4 w-4" /> {en ? "Home" : "Начало"} <span className="opacity-50">/</span> {en ? "Projects" : "Проекти"}</Link>
              <div className="max-w-[800px]">
                <p className="rv-kicker mb-4">{en ? "THE RENOVIVO PORTFOLIO" : "ПОРТФОЛИО / ЦЯЛОСТНИ РЕМОНТИ"}</p>
                <h1 className="rv-heading-serif text-[clamp(2.25rem,5vw,4.8rem)] leading-[1.1]">{en ? <>One apartment. <em>The complete story.</em></> : <>Един апартамент. <em>Цялата история.</em></>}</h1>
                <p className="mt-5 max-w-[640px] text-sm leading-[1.85] text-[#576159] md:text-base">{en
                  ? "We show a whole home, not isolated rooms marketed as separate projects. Our first concept brings all spaces together in one functional renovation story."
                  : "Тук няма да представяме отделна кухня или дневна като самостоятелен „цялостен ремонт“. Започваме с един апартамент и проследяваме всяко помещение като част от един общ замисъл."}</p>
              </div>
            </div>
          </section>
          <section className="py-9 md:py-14">
            <div className="container-custom">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.14em] text-[#657460]"><Layers3 className="h-4 w-4" /> {en ? "Concept 01" : "ПРОЕКТ 01"}</span>
                <span className="text-[11px] text-[#647366]">{en ? "New concepts are added only after review" : "Следващите проекти ще добавяме последователно"}</span>
              </div>
              <Link to={"/portfolio/"+project.id} className="group relative block overflow-hidden rounded-[9px] bg-[#E1E0D9]">
                <div className="relative min-h-[350px] md:min-h-[500px]">
                  <img src={project.rooms[0].image} alt={l(project.rooms[0].alt,language)} width="1500" height="980" className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A241D]/85 via-[#1A241D]/28 to-transparent" />
                  <div className="relative z-10 flex min-h-[350px] max-w-[670px] flex-col justify-end p-6 text-white md:min-h-[500px] md:p-12">
                    <span className="mb-3 self-start rounded-full border border-white/50 bg-black/15 px-3 py-1 text-[10px] font-medium tracking-[.08em] backdrop-blur-sm">{l(project.status,language)}</span>
                    <h2 className="rv-heading-serif text-[clamp(2rem,4vw,3.9rem)] leading-[1.09]">{l(project.shortTitle,language)}</h2>
                    <p className="mt-4 text-xs text-white/85 md:text-sm">{l(project.typology,language)} <span className="mx-2 text-white/50">·</span> {l(project.area,language)}</p>
                    <span className="mt-8 inline-flex items-center gap-3 self-start border-b border-white pb-2 text-sm font-semibold">{en ? "Explore every room" : "Разгледай всички помещения"} <ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                </div>
              </Link>
              <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-5 md:gap-3">
                {project.rooms.slice(1).map((room)=>(
                  <Link key={room.id} to={"/portfolio/"+project.id+"#"+room.id} className="group relative aspect-[4/3] overflow-hidden rounded-[5px] bg-[#E5E2D9]">
                    <img src={room.image} alt={l(room.alt,language)} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-[10px] font-semibold text-white md:text-xs">{l(room.label,language)}</span>
                  </Link>
                ))}
              </div>
              <p className="mt-5 flex items-start gap-2 text-xs leading-[1.7] text-[#6E756C]"><Sparkles className="mt-0.5 h-4 w-4 shrink-0" /> {en
                ? "The images depict an illustrative design concept. They are not documentary photographs of a Renovivo-completed property."
                : "Изображенията са концептуални визуализации. Не са документални снимки на изпълнен от RENOVIVO обект."}</p>
            </div>
          </section>
          <section className="border-t border-[#E4E2DA] py-10 md:py-14">
            <div className="container-custom flex flex-wrap items-center justify-between gap-5">
              <p className="rv-heading-serif max-w-[700px] text-[clamp(1.4rem,2.6vw,2.7rem)] leading-[1.2]">{en ? "Real renovation experience begins with a clear plan." : "Истинският ремонт започва с ясен план, не с красива снимка."}</p>
              <Link className="inline-flex items-center gap-2 border-b border-[#586854] pb-2 text-sm font-semibold" to="/services/apartment-renovation">{en?"Learn about our complete renovations":"Как изпълняваме цялостните ремонти"} <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
