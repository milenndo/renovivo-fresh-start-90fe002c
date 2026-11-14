import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { renovationProject01 as project, localText as tr } from "@/data/portfolioProject01";

export default function PortfolioPage() {
  const { language } = useLanguage();
  const en = language === "en";
  return (
    <>
      <Helmet>
        <title>{en ? "Complete apartment renovations | RENOVIVO" : "Цялостни ремонти на апартаменти | RENOVIVO"}</title>
        <meta name="description" content={en
          ? "Explore a complete apartment renovation story — from preparation to the finished interior, room by room."
          : "Портфолио на RENOVIVO — цялостни ремонти на апартаменти, процеси, довършителни дейности и помещения."} />
        <link rel="canonical" href="https://www.renovivo.bg/portfolio"/>
      </Helmet>
      <Layout>
        <main className="bg-[#FAF9F6] text-[#273229]">
          <section className="border-b border-[#E7E6DE] py-12 md:py-20">
            <div className="container-custom">
              <Link to="/" className="mb-9 inline-flex items-center gap-2 text-xs font-medium text-[#566951] hover:underline"><Home size={15}/>{en ? "Home" : "Начало"} <span className="opacity-50">/</span> {en ? "Portfolio" : "Портфолио"}</Link>
              <div className="max-w-[790px]">
                <p className="rv-kicker mb-4">{en ? "COMPLETE APARTMENT RENOVATIONS" : "ЦЯЛОСТНИ РЕМОНТИ НА АПАРТАМЕНТИ"}</p>
                <h1 className="rv-heading-serif text-[clamp(2.35rem,5vw,4.9rem)] leading-[1.1]">{en?<>Our <em>portfolio.</em></>:<>Нашето <em>портфолио.</em></>}</h1>
                <p className="mt-5 max-w-[640px] text-[14px] leading-[1.85] text-[#586459] md:text-[15px]">{en
                  ? "Each apartment has its own story. We present the renovation as a whole: preparation, construction stages, finishing work and the rooms in their natural order."
                  : "Всеки апартамент има собствена история. Представяме целия ремонт — от подготовката и строителните етапи до довършителните работи и всяко отделно помещение."}</p>
              </div>
            </div>
          </section>

          <section className="py-10 md:py-16">
            <div className="container-custom">
              <Link to={"/portfolio/"+project.id} className="group grid overflow-hidden rounded-[8px] border border-[#DEDFD7] bg-[#F2F1EB] md:grid-cols-[1.25fr_1fr]">
                <div className="aspect-[4/3] overflow-hidden bg-[#DCDCD5] md:aspect-auto md:min-h-[390px]">
                  <img src={project.rooms[0].image} alt={tr(project.rooms[0].alt,language)}
                    width={1200} height={800} decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"/>
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
                  <p className="rv-kicker mb-4">{en ? "APARTMENT RENOVATION" : "ЦЯЛОСТЕН РЕМОНТ НА АПАРТАМЕНТ"}</p>
                  <h2 className="rv-heading-serif text-[clamp(1.9rem,3.2vw,3.25rem)] leading-[1.13]">{tr(project.shortTitle,language)}</h2>
                  <p className="mt-5 text-[13px] leading-[1.8] text-[#5D685D]">{tr(project.intro,language)}</p>
                  <p className="mt-5 text-[11px] leading-[1.7] text-[#7B857A]">{en
                    ? "Illustrative apartment concept, not a documented completed client project."
                    : "Илюстративна концепция за апартамент, не документално представяне на завършен клиентски обект."}</p>
                  <span className="mt-8 inline-flex items-center gap-3 self-start border-b border-[#5B6C58] pb-2 text-[13px] font-semibold text-[#415342]">{en ? "View the full story" : "Разгледай целия проект"} <ArrowRight size={17}/></span>
                </div>
              </Link>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
