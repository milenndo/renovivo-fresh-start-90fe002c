import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Home } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import { renovationProject01 as project, localText as tr } from "@/data/portfolioProject01";
import demolitionPhoto from "@/assets/images/services/kartene.jpg";
import plumbingPhoto from "@/assets/images/services/plumbing.jpg";
import drywallPhoto from "@/assets/images/services/drywall.jpg";
import paintingPhoto from "@/assets/images/services/painting.jpg";

const stages = [
  {
    no: "01",
    image: demolitionPhoto,
    title: { bg:"Демонтаж и подготовка", en:"Strip-out & preparation" },
    body: {
      bg:"Преди новите покрития се проверява състоянието на основите, отстраняват се компрометираните слоеве и се планира редът на строително-монтажните работи.",
      en:"Before new finishes, existing substrates are checked, unstable layers are removed and the sequence of site works is established."
    }
  },
  {
    no: "02",
    image: plumbingPhoto,
    title: { bg:"Инсталации и мокри зони", en:"Services & wet areas" },
    body: {
      bg:"Разположението на кухнята и банята определя ВиК, електро и необходимите сервизни отвори. Скритите инсталации се проверяват преди затваряне.",
      en:"Kitchen and bathroom layouts determine plumbing, electrical points and access panels. Concealed services are inspected before closing."
    }
  },
  {
    no: "03",
    image: drywallPhoto,
    title: { bg:"Основи, равнини и конструкции", en:"Substrates, leveling & drywall" },
    body: {
      bg:"Подготовката на стени и тавани, коригирането на равнините и детайлите около отвори са основата на добрия краен резултат.",
      en:"Preparing walls and ceilings, correcting planes and resolving details at openings is the foundation for a durable result."
    }
  },
  {
    no: "04",
    image: paintingPhoto,
    title: { bg:"Финишни работи и монтаж", en:"Finishes & installation" },
    body: {
      bg:"Последователно се изпълняват настилки, облицовки, шпакловки, боя, врати, осветление и санитария. Накрая се проверяват фуги, преходи и функционалност.",
      en:"Flooring, tiling, plasterwork, painting, doors, lighting and fittings follow a controlled sequence, with final checks of joints, transitions and usability."
    }
  }
];

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { openModal } = useInspectionRequest();
  const en = language === "en";

  if (id !== project.id) return <Navigate to="/portfolio" replace />;

  const rooms = project.rooms.filter(item => item.id !== "overview");

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: tr(project.shortTitle, language),
    description: tr(project.story, language),
    image: "https://www.renovivo.bg" + project.rooms[0].image,
    creator: { "@type": "Organization", name: "RENOVIVO" },
    url: "https://www.renovivo.bg/portfolio/" + project.id
  };

  return (
    <>
      <Helmet>
        <title>{en ? "Light-filled city apartment — interior concept" : "Светъл градски апартамент — цялостна концепция"} | RENOVIVO</title>
        <meta name="description" content={tr(project.intro, language)} />
        <link rel="canonical" href={"https://www.renovivo.bg/portfolio/" + project.id} />
        <meta property="og:image" content={"https://www.renovivo.bg" + project.rooms[0].image} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Layout>
        <main className="bg-[#FAF9F6] text-[#28352B]">
          <section className="relative isolate flex min-h-[520px] items-center overflow-hidden bg-[#999B92] py-14 text-white md:min-h-[620px]">
            <img src={project.rooms[0].image} alt={tr(project.rooms[0].alt,language)}
              width={1600} height={1066} fetchPriority="high"
              className="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#14231A]/85 via-[#14231A]/52 to-[#14231A]/10 max-md:bg-[#14231A]/55"/>
            <div className="container-custom relative">
              <Link to="/portfolio" className="mb-11 inline-flex items-center gap-2 text-xs text-white/85 transition hover:text-white"><ArrowLeft size={16}/>{en?"Back to portfolio":"Назад към портфолиото"}</Link>
              <div className="max-w-[650px]">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.19em] text-white/80">{en?"COMPLETE APARTMENT RENOVATION · DESIGN CONCEPT":"ЦЯЛОСТЕН РЕМОНТ НА АПАРТАМЕНТ · КОНЦЕПЦИЯ"}</p>
                <h1 className="rv-heading-serif text-[clamp(2.4rem,5.5vw,5rem)] leading-[1.1]">{tr(project.shortTitle,language)}</h1>
                <p className="mt-6 max-w-[500px] text-sm leading-[1.85] text-white/90 md:text-[15px]">{tr(project.intro,language)}</p>
                <a href="#project-story" className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-[5px] bg-white px-5 py-2 text-xs font-semibold text-[#344636] transition hover:bg-[#E6EADD]">{en?"Discover the project":"Разгледай проекта"} <ArrowRight size={16}/></a>
              </div>
              <p className="mt-8 max-w-[630px] text-[11px] leading-[1.6] text-white/80">{en
                ? "Illustrative design visualization — not a photograph of a completed RENOVIVO commission."
                : "Концептуална визуализация. Не е снимка на изпълнен от RENOVIVO клиентски обект."}</p>
            </div>
          </section>

          <section id="project-story" className="scroll-mt-[85px] py-14 md:py-20">
            <div className="container-custom grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
              <div>
                <p className="rv-kicker mb-4">{en?"THE IDEA":"ИДЕЯТА"}</p>
                <h2 className="rv-heading-serif max-w-[550px] text-[clamp(2rem,3.7vw,3.5rem)] leading-[1.14]">{en?<>A home designed <em>for everyday life.</em></>:<>Дом, създаден <em>за ежедневието.</em></>}</h2>
              </div>
              <div className="space-y-5 text-[14px] leading-[1.9] text-[#526054] md:text-[15px]">
                <p>{tr(project.story,language)}</p>
                <p>{en
                  ? "Warm surfaces, practical storage and lighting are more important here than decorative extravagance. The rooms are presented as parts of one proposed apartment renovation, not as separate reference jobs."
                  : "Целта не е интериор, който изглежда впечатляващо само на снимка. Търсим работещо разпределение, спокойна материална палитра, удобно съхранение и детайли, които могат да бъдат изпълнени качествено."}</p>
              </div>
            </div>
          </section>

          <section className="border-y border-[#E6E4DB] bg-[#F3F1EA] py-14 md:py-20">
            <div className="container-custom">
              <div className="mb-9 max-w-[770px]">
                <p className="rv-kicker mb-4">{en?"RENOVATION PROCESS":"ЕТАПИ НА РЕМОНТА"}</p>
                <h2 className="rv-heading-serif text-[clamp(2rem,3.7vw,3.6rem)] leading-[1.13]">{en?<>From preparation <em>to the finishing touch.</em></>:<>От подготовката <em>до последния детайл.</em></>}</h2>
                <p className="mt-4 text-sm leading-[1.8] text-[#5C675B]">{en
                  ? "The stages shown here illustrate how a complete renovation is organized in practice. Process photographs are illustrative and are not documentary evidence from this specific concept apartment."
                  : "Така се организират дейностите при цялостен ремонт. Снимките на строителните етапи са илюстративни, а не документален фотоотчет от този примерен апартамент."}</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stages.map(stage=>(
                  <article key={stage.no} className="overflow-hidden rounded-[7px] border border-[#DEDFD5] bg-[#FAF9F6]">
                    <div className="aspect-[4/3] overflow-hidden bg-[#DBDBD4]">
                      <img src={stage.image} alt={tr(stage.title,language)}
                        loading="lazy" decoding="async" width={650} height={500} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-5">
                      <span className="rv-heading-serif text-[25px] text-[#657B62]">{stage.no}</span>
                      <h3 className="mt-2 text-[15px] font-semibold leading-snug">{tr(stage.title,language)}</h3>
                      <p className="mt-3 text-xs leading-[1.75] text-[#627064]">{tr(stage.body,language)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="project-rooms" className="scroll-mt-[80px] py-14 md:py-20">
            <div className="container-custom">
              <div className="mb-10 max-w-[740px]">
                <p className="rv-kicker mb-4">{en?"THE HOME · ROOM BY ROOM":"АПАРТАМЕНТЪТ · ПО ПОМЕЩЕНИЯ"}</p>
                <h2 className="rv-heading-serif text-[clamp(2rem,3.8vw,3.7rem)] leading-[1.15]">{en?<>Every room has <em>its own purpose.</em></>:<>Всяко помещение <em>има своята роля.</em></>}</h2>
                <p className="mt-4 text-sm leading-[1.8] text-[#5C6A5D]">{en
                  ? "Browse the rooms in order — living room, kitchen, bedroom, bathroom and entrance. Each has its own visual, purpose and construction considerations."
                  : "Разгледай стаите последователно — дневна, кухня, спалня, баня и антре. Всяка има своя визуализация, функция и конкретни решения при изпълнението."}</p>
              </div>

              <nav aria-label={en?"Jump to a room":"Премини към помещение"} className="mb-11 flex flex-wrap gap-2">
                {rooms.map((room)=>(
                  <a key={room.id} href={"#room-"+room.id} className="inline-flex min-h-10 items-center rounded-[5px] border border-[#CBD4C9] bg-white px-4 text-xs font-semibold text-[#526752] transition hover:bg-[#E9EEE6]">
                    {tr(room.label,language)}
                  </a>
                ))}
              </nav>

              <div className="space-y-14 md:space-y-20">
                {rooms.map((room,index)=>(
                  <article key={room.id} id={"room-"+room.id} className="grid scroll-mt-[80px] items-center gap-7 border-b border-[#E4E5DD] pb-14 md:gap-12 md:pb-20 lg:grid-cols-2">
                    <div className={"min-w-0 overflow-hidden rounded-[7px] bg-[#E4E2D9] "+(index%2===1?"lg:order-2":"")}>
                      <img src={room.image} alt={tr(room.alt,language)}
                        loading="lazy" decoding="async" width={1200} height={850}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.015]" />
                    </div>
                    <div className={"max-w-[600px] "+(index%2===1?"lg:order-1":"")}>
                      <p className="rv-kicker mb-3">{en?"INTERIOR":"ПОМЕЩЕНИЕ"} / {String(index+1).padStart(2,"0")}</p>
                      <h3 className="rv-heading-serif text-[clamp(1.85rem,3vw,3rem)] leading-[1.16]">{tr(room.label,language)}</h3>
                      <p className="mt-4 text-[14px] leading-[1.85] text-[#4D5B51]">{tr(room.intro,language)}</p>
                      <div className="mt-7 border-t border-[#DFE1D8] pt-5">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#748574]">{en?"The challenge":"Предизвикателството"}</p>
                        <p className="text-[13px] leading-[1.8] text-[#47554B]">{tr(room.challenge,language)}</p>
                      </div>
                      <div className="mt-5 border-t border-[#DFE1D8] pt-5">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#667D65]">{en?"The solution":"Подходът"}</p>
                        <p className="text-[13px] leading-[1.8] text-[#47554B]">{tr(room.approach,language)}</p>
                      </div>
                      <ul className="mt-6 space-y-2.5">
                        {room.details.slice(0,3).map((detail,i)=>(
                          <li key={i} className="flex items-start gap-2.5 text-[12px] leading-[1.6] text-[#536252]"><Check size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-[#70836E]"/>{tr(detail,language)}</li>
                        ))}
                      </ul>
                      <p className="mt-6 text-[11px] leading-[1.6] text-[#879185]">{en?"Illustrative interior visualization":"Илюстративна интериорна визуализация"}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#F3F1EA] py-12 md:py-16">
            <div className="container-custom grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
              <div>
                <p className="rv-kicker mb-3">{en?"WHAT A COMPLETE RENOVATION INCLUDES":"КАКВО ВКЛЮЧВА ЦЯЛОСТНИЯТ РЕМОНТ"}</p>
                <h2 className="rv-heading-serif text-[clamp(1.7rem,3vw,3rem)] leading-[1.14]">{en?<>The work <em>behind the finish.</em></>:<>Работата <em>под красивата повърхност.</em></>}</h2>
              </div>
              <div className="grid gap-x-7 sm:grid-cols-2">
                {project.scope.map((item,i)=>(
                  <div key={i} className="flex items-start gap-2.5 border-b border-[#DADDD3] py-3.5">
                    <Check size={15} className="mt-0.5 shrink-0 text-[#61795F]"/>
                    <p className="text-[12px] leading-[1.65] text-[#4B5C50]">{tr(item,language)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#516650] py-14 text-white md:py-20">
            <div className="container-custom grid items-center gap-7 md:grid-cols-[1.35fr_.65fr]">
              <div>
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.2em] text-white/80">{en?"YOUR NEXT PROJECT":"ВАШИЯТ ДОМ"}</p>
                <h2 className="rv-heading-serif max-w-[700px] text-[clamp(2rem,4vw,3.8rem)] leading-[1.12]">{en?"Let's plan your entire renovation." : "Нека планираме вашия цялостен ремонт."}</h2>
                <p className="mt-4 max-w-[570px] text-sm leading-[1.8] text-white/85">{en?"A real project begins with site measurements, a clear brief and a detailed quotation.":"Реалният проект започва с оглед, точни размери, ясно задание и подробна оферта."}</p>
              </div>
              <button type="button" onClick={openModal}
                className="inline-flex min-h-12 items-center justify-center gap-3 justify-self-start rounded-[5px] bg-white px-6 text-[13px] font-semibold text-[#3A503C] transition hover:bg-[#E8EEE4]">{en?"Request a site visit":"Заяви безплатен оглед"} <ArrowRight size={17}/></button>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
