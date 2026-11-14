import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { portfolioProjects, localText as tr } from "@/data/portfolioProjects";

export default function PortfolioPage() {
  const { language } = useLanguage();
  const en = language === "en";
  const title = en ? "Apartment projects & interior design | RENOVIVO" : "Апартаментни проекти и интериорни решения | RENOVIVO";
  const description = en
    ? "Explore complete apartment interiors, room by room — thoughtful layouts, practical kitchens and carefully coordinated materials."
    : "Апартаментни интериори, разгледани по помещения — удобно разпределение, практични кухни и внимателно съчетани материали.";
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://www.renovivo.bg/portfolio" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`https://www.renovivo.bg${portfolioProjects[0].rooms[0].image}`} />
      </Helmet>
      <Layout>
        <div className="bg-[#FAF9F6] text-[#273229]">
          <section className="border-b border-[#E7E6DE] py-10 md:py-16">
            <div className="container-custom">
              <Link to="/" className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-[#566951] hover:underline"><Home size={15} />{en ? "Home" : "Начало"} <span className="opacity-50">/</span> {en ? "Portfolio" : "Портфолио"}</Link>
              <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
                <div>
                  <p className="rv-kicker mb-4">{en ? "APARTMENTS / INTERIOR DESIGN" : "АПАРТАМЕНТИ / ИНТЕРИОРНИ РЕШЕНИЯ"}</p>
                  <h1 className="rv-heading-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.08]">{en ? <>Homes with<br /><em>their own character.</em></> : <>Домове със<br /><em>свой характер.</em></>}</h1>
                </div>
                <div className="max-w-[550px]">
                  <p className="text-sm leading-[1.85] text-[#526054] md:text-base">{en
                    ? "A complete apartment is more than a beautiful living room. Discover how kitchen, bedroom, bathroom and entrance become one coherent home — with a thoughtful approach to every space."
                    : "Цялостният апартамент е повече от красива дневна. Виж как кухнята, спалнята, банята и антрето се свързват в един дом — с внимание към всяко пространство."}</p>

                </div>
              </div>
            </div>
          </section>
          <section className="py-8 md:py-12" aria-label={en ? "Apartment projects" : "Апартаментни проекти"}>
            <div className="container-custom grid gap-x-7 gap-y-10 md:grid-cols-2 md:gap-y-14">
              {portfolioProjects.map((project, index) => (
                <article key={project.id} className={index === 0 ? "md:col-span-2" : ""}>
                  <Link to={`/portfolio/${project.id}`} className="group block rounded-[7px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#50614E]">
                    <div className={`relative overflow-hidden rounded-[7px] bg-[#DCDCD5] ${index === 0 ? "aspect-[4/3] md:aspect-[2/1]" : "aspect-[3/2]"}`}>
                      <img src={project.rooms[0].image} alt={tr(project.rooms[0].alt, language)} width={1000} height={666}
                        loading={index === 0 ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none" />
                      <span className="absolute left-4 top-4 rounded-[4px] bg-[#FAF9F6]/95 px-3 py-2 text-[10px] font-semibold tracking-[.15em] text-[#344636]">{project.number} / {en ? "APARTMENT" : "АПАРТАМЕНТ"}</span>
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="mb-2 text-xs text-[#667163]">{tr(project.typology, language)}</p>
                        <h2 className="rv-heading-serif text-[clamp(1.65rem,2.7vw,2.6rem)] leading-[1.15]">{tr(project.shortTitle, language)}</h2>
                      </div>
                      <ArrowRight className="mt-6 h-5 w-5 shrink-0 text-[#50614E] transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="mt-3 max-w-[780px] text-sm leading-[1.8] text-[#586459]">{tr(project.intro, language)}</p>
                    <span className="mt-4 inline-flex border-b border-[#71806A] pb-1 text-xs font-semibold text-[#415342]">{en ? "Explore the whole apartment" : "Разгледай целия апартамент"}</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
