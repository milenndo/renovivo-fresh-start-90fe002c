import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Expand, Home, Layers3, ShieldCheck, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import { renovationProject01 as project, localText as tr, type RoomKey } from "@/data/portfolioProject01";
import ApartmentPlan from "@/components/project/ApartmentPlan";
import ApartmentExplorer from "@/components/project/ApartmentExplorer";

const COUNT=project.rooms.length;
const wrap=(index:number)=>(index+COUNT)%COUNT;

/** One complete apartment; no unsourced success statistics or fake before/after comparisons. */
export default function ProjectDetail() {
  const {id}=useParams<{id:string}>();
  const {language}=useLanguage();
  const {openModal}=useInspectionRequest();
  const en=language==="en";
  const [index,setIndex]=useState(0);
  const [lightbox,setLightbox]=useState(false);
  const touchStart=useRef<number|null>(null);
  const roomRef=useRef<HTMLElement|null>(null);
  const room=project.rooms[index];

  useEffect(()=>{
    if(id!==project.id)return;
    const hash=decodeURIComponent(window.location.hash.substring(1));
    const found=project.rooms.findIndex(r=>r.id===hash);
    if(found>=0)setIndex(found);
  },[id]);

  const select=(next:number,scroll=false)=>{
    const normalized=wrap(next);
    setIndex(normalized);
    window.history.replaceState(null,"",window.location.pathname+"#"+project.rooms[normalized].id);
    if(scroll)roomRef.current?.scrollIntoView({behavior:"smooth",block:"start"});
  };
  const selectById=(target:RoomKey,scroll=false)=>{
    const next=project.rooms.findIndex(r=>r.id===target);
    if(next>=0)select(next,scroll);
  };
  const swipe=(end:number)=>{
    const from=touchStart.current;
    if(from!==null&&Math.abs(end-from)>55)select(index+(from>end?1:-1));
    touchStart.current=null;
  };
  if(id!==project.id)return <Navigate to="/portfolio" replace/>;

  const schema={
    "@context":"https://schema.org",
    "@type":"CreativeWork",
    headline:tr(project.shortTitle,language),
    description:tr(project.intro,language),
    image:"https://renovivo.bg"+project.rooms[0].image,
    publisher:{"@type":"Organization",name:"Renovivo"},
    mainEntityOfPage:{"@type":"WebPage","@id":"https://renovivo.bg/portfolio/"+project.id}
  };
  return (
    <>
      <Helmet>
        <title>{tr(project.shortTitle,language)} | {en?"Concept":"Концепция"} | RENOVIVO</title>
        <meta name="description" content={tr(project.intro,language)+" "+tr(project.status,language)}/>
        <link rel="canonical" href={"https://renovivo.bg/portfolio/"+project.id}/>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Layout>
        <div className="rv-project bg-[#FAF9F6] text-[#28352B]">
          <section className="relative isolate flex min-h-[580px] flex-col justify-center overflow-hidden bg-[#AFAFA7] py-12 text-white md:min-h-[630px]">
            <img src={project.rooms[0].image} alt={tr(project.rooms[0].alt,language)} width="1600" height="1000" decoding="async" className="absolute inset-0 -z-10 h-full w-full object-cover object-center"/>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#17231C]/90 via-[#243129]/60 to-[#243129]/10 max-md:bg-gradient-to-t max-md:from-[#19261D]/80 max-md:via-[#243129]/45 max-md:to-[#243129]/35"/>
            <div className="container-custom">
              <Link to="/portfolio" className="mb-10 inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white"><ArrowLeft className="h-4 w-4"/>{en?"All projects":"Към портфолиото"}</Link>
              <div className="max-w-[680px]">
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.22em] text-white/85">{en?"PROJECT 01 · COMPLETE APARTMENT CONCEPT":"ПРОЕКТ 01 · ЦЯЛОСТНА ИНТЕРИОРНА КОНЦЕПЦИЯ"}</p>
                <h1 className="rv-heading-serif text-[clamp(2.3rem,5vw,5rem)] leading-[1.09]">{tr(project.shortTitle,language)}</h1>
                <p className="mt-6 max-w-[520px] text-[13px] leading-[1.85] text-white/90 md:text-[15px]">{tr(project.intro,language)}</p>
                <div className="mt-7 flex flex-wrap gap-3 text-[11px] font-medium text-white/95">
                  <span className="rounded-full border border-white/40 bg-white/10 px-3 py-2">{tr(project.typology,language)}</span>
                  <span className="rounded-full border border-white/40 bg-white/10 px-3 py-2">{tr(project.area,language)}</span>
                  <span className="rounded-full border border-white/40 bg-white/10 px-3 py-2">{en?"6 viewpoints":"6 гледни точки"}</span>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#architectural-plan" className="inline-flex min-h-11 items-center gap-3 rounded-[5px] bg-[#F7F6F1] px-5 text-xs font-semibold text-[#2C3C2F]">{en?"View architectural plan":"Виж архитектурния план"} <ArrowRight className="h-4 w-4"/></a>
                  <a href="#walkthrough" className="inline-flex min-h-11 items-center gap-3 rounded-[5px] border border-white/70 px-5 text-xs font-semibold text-white">{en?"Enter 3D walkthrough":"Влез във виртуалната разходка"}</a>
                </div>
              </div>
              <p className="mt-8 max-w-[530px] text-[11px] leading-[1.6] text-white/80">{en?"Illustrative design visualizations, not documentary photos of a Renovivo commission.":"Илюстративни визуализации, а не документални снимки на изпълнен от RENOVIVO обект."}</p>
            </div>
          </section>
          <section className="border-b border-[#E4E3DA] bg-[#F6F4EF] py-6">
            <div className="container-custom grid gap-3 sm:grid-cols-3">
              {[
                {Icon:Home,main:en?"One entire apartment":"Един цял апартамент",sub:en?"Not isolated room jobs":"Не отделни ремонти на стаи"},
                {Icon:Layers3,main:en?"One consistent material palette":"Единна материална концепция",sub:en?"Coherent rooms":"Свързани помещения"},
                {Icon:ShieldCheck,main:en?"Buildable details first":"Реалистични строителни детайли",sub:en?"Plans before finishes":"Първо планът, после финишите"}
              ].map(({Icon,main,sub})=><div key={main} className="flex items-start gap-3 px-2"><Icon className="mt-1 h-5 w-5 shrink-0 text-[#657C60]" strokeWidth={1.5}/><div><p className="text-xs font-semibold md:text-sm">{main}</p><p className="mt-1 text-[11px] text-[#667266]">{sub}</p></div></div>)}
            </div>
          </section>

          <section className="py-12 md:py-20">
            <div className="container-custom grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
              <div><p className="rv-kicker mb-4">{en?"THE WHOLE STORY":"ИСТОРИЯТА НА АПАРТАМЕНТА"}</p>
                <h2 className="rv-heading-serif text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.16]">{en?<>Less show. <em>More home.</em></>:<>По-малко показност. <em>Повече истински дом.</em></>}</h2></div>
              <div className="space-y-5 text-sm leading-[1.85] text-[#536053] md:text-[15px]">
                <p>{tr(project.story,language)}</p>
                <p>{en?"This is a designed demonstration, not a completed real-life customer commission. Project stages below explain the practical work that a complete renovation involves.":"Това е демонстрационен проект, а не измислена история за приключен клиентски обект. По-долу показваме реалистичните етапи и предизвикателства при един цялостен ремонт."}</p>
              </div>
            </div>
          </section>

          <ApartmentPlan activeRoom={room.id} onSelect={(id)=>selectById(id,true)}/>

          <section id="rooms" ref={roomRef} className="scroll-mt-[70px] bg-[#FAF9F6] pb-14 pt-12 md:pb-20 md:pt-20">
            <div className="container-custom">
              <div className="mb-8 grid gap-4 md:grid-cols-[.95fr_1.05fr] md:items-end">
                <div><p className="rv-kicker mb-3">{en?"ROOM BY ROOM":"ПО ПОМЕЩЕНИЯ"}</p>
                  <h2 className="rv-heading-serif text-[clamp(2.1rem,3.8vw,3.7rem)] leading-[1.12]">{en?<>Every room. <em>One story.</em></>:<>Всяка стая. <em>Един общ проект.</em></>}</h2></div>
                <p className="max-w-[520px] text-sm leading-[1.75] text-[#58665A]">{en?"Navigate the rooms, study the material details and see how each space connects with the whole apartment.":"Избери помещение, разгледай визуализациите му и виж защо конструктивните и довършителните решения трябва да се мислят за целия апартамент."}</p>
              </div>
              <div className="-mx-4 mb-6 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0" role="tablist" aria-label={en?"Select room":"Избор на помещение"}>
                {project.rooms.map((item,position)=>(
                  <button type="button" role="tab" aria-selected={index===position} aria-controls="room-01-panel" id={"room-01-tab-"+item.id} key={item.id}
                    onClick={()=>select(position)} className={"min-h-11 shrink-0 snap-start rounded-[5px] border px-4 text-[12px] font-semibold transition-colors "+(index===position?"border-[#536850] bg-[#536850] text-white":"border-[#DADFD6] bg-white text-[#556758] hover:bg-[#EAEFE8]")}>
                    {tr(item.label,language)}
                  </button>
                ))}
              </div>
              <div className="grid gap-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(290px,.75fr)] lg:gap-10">
                <div id="room-01-panel" role="tabpanel" aria-labelledby={"room-01-tab-"+room.id} className="min-w-0">
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-[8px] bg-[#DCDDD7] md:aspect-[16/10]"
                    onTouchStart={(event)=>{touchStart.current=event.touches[0]?.clientX??null;}}
                    onTouchEnd={(event)=>swipe(event.changedTouches[0]?.clientX??0)}>
                    <img key={room.id} src={room.image} alt={tr(room.alt,language)} width="1400" height="900" decoding="async" className="h-full w-full animate-fade-in object-cover object-center"/>
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/65 to-transparent px-4 pb-4 pt-16 text-white md:px-6 md:pb-6">
                      <span className="text-xs font-semibold md:text-sm">{tr(room.label,language)} · {room.number} / 0{COUNT}</span>
                      <button type="button" onClick={()=>setLightbox(true)} aria-label={en?"Enlarge room image":"Увеличи изображението"} className="grid h-10 w-10 place-items-center rounded-full border border-white/60 bg-black/25"><Expand className="h-4 w-4"/></button>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {project.rooms.map((item,position)=>(
                      <button key={item.id} type="button" onClick={()=>select(position)} aria-label={(en?"Show ":"Покажи ")+tr(item.label,language)} aria-pressed={index===position}
                        className={"group relative aspect-[4/3] overflow-hidden rounded-[5px] border-[3px] transition-colors "+(index===position?"border-[#52674E]":"border-transparent hover:border-[#B9C8B6]")}>
                        <img src={item.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-1 pb-1.5 pt-6 text-center text-[10px] font-medium text-white">{tr(item.label,language)}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 flex justify-between gap-3">
                    <button type="button" onClick={()=>select(index-1)} className="inline-flex items-center gap-2 border-b border-[#697D6A] pb-2 text-xs font-semibold"><ChevronLeft className="h-4 w-4"/>{en?"Previous room":"Предишно помещение"}</button>
                    <button type="button" onClick={()=>select(index+1)} className="inline-flex items-center gap-2 border-b border-[#697D6A] pb-2 text-xs font-semibold">{en?"Next room":"Следващо помещение"}<ChevronRight className="h-4 w-4"/></button>
                  </div>
                </div>
                <div key={room.id} className="animate-fade-in self-start">
                  <p className="rv-kicker mb-3">{en?"ROOM "+room.number:"ПОМЕЩЕНИЕ "+room.number}</p>
                  <h3 className="rv-heading-serif text-[clamp(1.8rem,2.6vw,2.8rem)] leading-[1.12]">{tr(room.heading,language)}</h3>
                  <p className="mt-5 text-[13px] leading-[1.85] text-[#556355]">{tr(room.intro,language)}</p>
                  <div className="mt-7 border-t border-[#DFE1D8] pt-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#687B67]">{en?"The challenge":"Предизвикателството"}</p>
                    <p className="text-[13px] leading-[1.85] text-[#425246]">{tr(room.challenge,language)}</p>
                  </div>
                  <div className="mt-5 border-t border-[#DFE1D8] pt-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#687B67]">{en?"The solution":"Подходът"}</p>
                    <p className="text-[13px] leading-[1.85] text-[#425246]">{tr(room.approach,language)}</p>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {room.details.map((detail,pos)=><li key={pos} className="flex items-start gap-2.5 text-xs leading-[1.5] text-[#4E5C4D]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#6E8068]" strokeWidth={1.5}/>{tr(detail,language)}</li>)}
                  </ul>
                  <p className="mt-7 text-[11px] leading-[1.6] text-[#838C82]">{en?"Illustrative visualization · not a construction photograph":"Илюстративна визуализация · не е снимка от изпълнение"}</p>
                </div>
              </div>
            </div>
          </section>

          <ApartmentExplorer onRoomSelect={(id)=>selectById(id)}/>

          <section className="border-b border-[#E5E4DB] bg-[#FAF9F6] py-12 md:py-20">
            <div className="container-custom grid gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
              <div><p className="rv-kicker mb-3">{en?"SCOPE OF A COMPLETE RENOVATION":"ОБХВАТ НА ЦЯЛОСТНИЯ РЕМОНТ"}</p>
                <h2 className="rv-heading-serif text-[clamp(2rem,3.2vw,3.4rem)] leading-[1.12]">{en?<>Quality starts <em>below the surface.</em></>:<>Качеството започва <em>под финиша.</em></>}</h2>
                <p className="mt-5 text-sm leading-[1.8] text-[#576457]">{en?"The technical scope behind the visual concept — from existing-condition checks through installation and finish sequencing.":"Реалните задачи зад всяка визуализация: от оценката на основите до координацията на инсталациите и финалните довършителни дейности."}</p>
              </div>
              <div className="grid gap-x-7 md:grid-cols-2">
                {project.scope.map((item,pos)=><div key={pos} className="flex items-start gap-3 border-b border-[#E4E5DE] py-4">
                  <span className="rv-heading-serif w-7 shrink-0 text-[16px] text-[#6E816C]">0{pos+1}</span>
                  <span className="text-[13px] leading-[1.7] text-[#475648]">{tr(item,language)}</span>
                </div>)}
              </div>
            </div>
          </section>

          <section className="bg-[#F4F2ED] py-12 md:py-20">
            <div className="container-custom">
              <p className="rv-kicker mb-3">{en?"BUILD SEQUENCE":"ЕТАПИ НА ИЗПЪЛНЕНИЕ"}</p>
              <h2 className="rv-heading-serif mb-9 text-[clamp(2rem,3.2vw,3.5rem)] leading-[1.13]">{en?<>From raw construction <em>to finished home.</em></>:<>От основата <em>до готовия дом.</em></>}</h2>
              <div className="grid gap-3 md:grid-cols-5">
                {project.steps.map((step,pos)=><div key={pos} className="rounded-[7px] border border-[#E0E3D9] bg-[#FAF9F6] p-5">
                  <span className="rv-heading-serif text-[28px] text-[#758876]">0{pos+1}</span>
                  <h3 className="mt-4 text-[14px] font-semibold text-[#334436]">{tr(step.title,language)}</h3>
                  <p className="mt-3 text-xs leading-[1.75] text-[#647065]">{tr(step.body,language)}</p>
                </div>)}
              </div>
              <div className="mt-8 flex flex-col gap-4 rounded-[7px] border border-[#DADFD3] bg-[#E9EEE5] p-5 sm:flex-row sm:items-start">
                <ShieldCheck className="h-6 w-6 shrink-0 text-[#567155]"/>
                <div><h3 className="text-sm font-semibold text-[#3B513E]">{en?"Before / after only with a matched camera position":"Преди / след — само при съвпадаща камера"}</h3>
                  <p className="mt-2 text-xs leading-[1.8] text-[#576B57]">{en?"We do not publish an image slider until both states show the same lens, angle, perspective and crop. Any unmatched comparison is omitted rather than presented as real proof.":"Няма да поставяме слайдер, докато кадрите „преди“ и „след“ нямат еднакъв ракурс, фокусно разстояние, геометрия и кадриране. Неизпитаните сравнения няма да се представят като доказателство за изпълнение."}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#50634F] py-14 text-white md:py-20">
            <div className="container-custom grid items-end gap-7 md:grid-cols-[1.5fr_.5fr]">
              <div><p className="mb-4 text-[10px] font-semibold uppercase tracking-[.2em] text-white/80">{en?"YOUR APARTMENT, YOUR PLAN":"ВАШИЯТ АПАРТАМЕНТ, ВАШИЯТ ПРОЕКТ"}</p>
                <h2 className="rv-heading-serif max-w-[750px] text-[clamp(2rem,4vw,4rem)] leading-[1.14]">{en?"Let's plan the whole renovation." : "Нека планираме целия ремонт."}</h2>
                <p className="mt-4 max-w-[550px] text-sm leading-[1.8] text-white/85">{en?"Every real project starts with measurements, a clear brief and an honest quotation.":"Всеки реален проект започва с точни измервания, подробно задание и прозрачна оферта."}</p>
              </div>
              <button type="button" onClick={openModal} className="inline-flex min-h-12 items-center justify-center gap-3 self-start rounded-[5px] bg-white px-6 text-[13px] font-semibold text-[#3A503C] md:self-end">{en?"Book a site visit":"Заяви безплатен оглед"} <ArrowRight className="h-4 w-4"/></button>
            </div>
          </section>

          {lightbox&&<div role="dialog" aria-modal="true" aria-label={en?"Expanded room image":"Разгънато изображение"} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101A13]/95 p-2 sm:p-8" onClick={()=>setLightbox(false)}>
            <button type="button" aria-label={en?"Close":"Затвори"} onClick={()=>setLightbox(false)} className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-black/20 text-white"><X className="h-5 w-5"/></button>
            <img src={room.image} alt={tr(room.alt,language)} className="max-h-[85vh] max-w-full object-contain" onClick={event=>event.stopPropagation()}/>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/80">{tr(room.label,language)}</span>
          </div>}
        </div>
      </Layout>
    </>
  );
}
