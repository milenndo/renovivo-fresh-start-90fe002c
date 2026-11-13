import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight,
  Expand, Home, Layers3, MapPin, Maximize2, ShieldCheck, X
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import ApartmentPlan from "@/components/portfolio/ApartmentPlan";
import ApartmentWalkthrough from "@/components/portfolio/ApartmentWalkthrough";
import { rooms as geometryRooms, type WalkZoneId } from "@/data/portfolioArchitecture";
import { renovationProject01 as project, localText as l } from "@/data/portfolioProject01";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";

type ViewTab = "photos" | "plan" | "walk";
type CopyRoom = typeof project.rooms[number];
const roomToZone:Record<string,WalkZoneId> = {
  overview:"hall",living:"living",kitchen:"kitchen",bedroom:"bedroom",bathroom:"bathroom",hall:"hall",
};
const zoneToRoom=(zone:WalkZoneId)=>zone==="utility"?"hall":zone;
const wrap=(index:number)=> (index+project.rooms.length)%project.rooms.length;
export default function ProjectDetail(){
  const {id}=useParams<{id:string}>();
  const {language}=useLanguage();
  const en=language==="en";
  const {openModal}=useInspectionRequest();
  const [roomIndex,setRoomIndex]=useState(0);
  const [tab,setTab]=useState<ViewTab>("photos");
  const [expanded,setExpanded]=useState(false);
  const [walkZone,setWalkZone]=useState<WalkZoneId>("hall");
  const [imageLoaded,setImageLoaded]=useState(false);
  const touchStart=useRef<number|null>(null);
  const viewer=useRef<HTMLElement>(null);
  const current=project.rooms[roomIndex];

  useEffect(()=>{
    if(id!==project.id)return;
    const value=decodeURIComponent(window.location.hash.replace("#",""));
    const directIndex=project.rooms.findIndex(item=>item.id===value);
    if(directIndex>=0){setRoomIndex(directIndex);setWalkZone(roomToZone[project.rooms[directIndex].id]);}
  },[id]);
  if(id!==project.id)return <Navigate to="/portfolio" replace/>;

  const selectRoom=(index:number,scroll=false)=>{
    const target=wrap(index),r=project.rooms[target];
    setRoomIndex(target);setImageLoaded(false);setWalkZone(roomToZone[r.id]);
    if(scroll)viewer.current?.scrollIntoView({behavior:"smooth",block:"start"});
  };
  const selectZone=(zone:WalkZoneId,openWalk=false)=>{
    const key=zoneToRoom(zone);
    const target=project.rooms.findIndex(item=>item.id===key);
    setRoomIndex(Math.max(0,target));setWalkZone(zone);
    if(openWalk)setTab("walk");
    viewer.current?.scrollIntoView({behavior:"smooth",block:"start"});
  };
  const moveTouch=(end:number)=>{
    if(touchStart.current===null)return;
    const dx=touchStart.current-end;
    if(Math.abs(dx)>55)selectRoom(roomIndex+(dx>0?1:-1));
    touchStart.current=null;
  };
  const seo={
    "@context":"https://schema.org",
    "@type":"CreativeWork",
    "name":l(project.shortTitle,language),
    "description":l(project.intro,language),
    "about":"Illustrative apartment renovation concept",
    "url":"https://renovivo.bg/portfolio/"+project.id,
    "image":"https://renovivo.bg"+project.rooms[0].image,
    "creator":{"@type":"Organization","name":"Renovivo"}
  };
  return(
    <>
      <Helmet>
        <title>{l(project.shortTitle,language)} | {en?"Concept walkthrough":"Концепция и разходка"} · Renovivo</title>
        <meta name="description" content={l(project.intro,language)+" "+l(project.status,language)}/>
        <meta property="og:image" content={"https://renovivo.bg"+project.rooms[0].image}/>
        <link rel="canonical" href={"https://renovivo.bg/portfolio/"+project.id}/>
        <script type="application/ld+json">{JSON.stringify(seo)}</script>
      </Helmet>
      <Layout>
        <div className="bg-[#FAF9F6] text-[#263229]">
          <section className="relative isolate flex min-h-[570px] flex-col justify-center overflow-hidden bg-[#868C83] md:min-h-[650px]">
            <img src={project.rooms[0].image} width="1600" height="1030" alt={l(project.rooms[0].alt,language)}
              className="absolute inset-0 -z-10 h-full w-full object-cover object-center"/>
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(22,31,25,0.9),rgba(26,36,28,.67)_44%,rgba(27,37,29,.08)_100%)]"/>
            <div className="container-custom relative flex w-full flex-col py-16 text-white">
              <Link to="/portfolio" className="mb-14 inline-flex items-center gap-2 self-start text-xs text-white/85 hover:text-white"><ArrowLeft className="h-4 w-4"/>{en?"All projects":"Всички проекти"}</Link>
              <div className="max-w-[710px]">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.2em] text-white/85">{en?"COMPLETE RENOVATION · CONCEPT 01":"ЦЯЛОСТЕН РЕМОНТ · ПРОЕКТ 01"}</p>
                <h1 className="rv-heading-serif text-[clamp(2.25rem,5vw,5rem)] leading-[1.07]">{l(project.shortTitle,language)}</h1>
                <p className="mt-5 max-w-[535px] text-sm leading-[1.8] text-white/90 md:text-base">{l(project.intro,language)}</p>
                <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-white/90">
                  <span className="inline-flex items-center gap-2"><Home className="h-4 w-4"/>{l(project.typology,language)}</span>
                  <span className="inline-flex items-center gap-2"><Maximize2 className="h-4 w-4"/>{l(project.area,language)}</span>
                  <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4"/>{l(project.location,language)}</span>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#project-explorer" className="inline-flex min-h-11 items-center gap-3 rounded-[5px] bg-[#61755E] px-5 text-xs font-semibold text-white transition-colors hover:bg-[#435944]">{en?"Explore the apartment":"Разгледай апартамента"} <ArrowRight className="h-4 w-4"/></a>
                  <button type="button" onClick={()=>{setTab("walk");viewer.current?.scrollIntoView({behavior:"smooth",block:"start"});}}
                    className="inline-flex min-h-11 items-center gap-3 rounded-[5px] border border-white/70 bg-white/10 px-5 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20">{en?"Interactive walkthrough":"Виртуална разходка"} <ArrowUpRight className="h-4 w-4"/></button>
                </div>
              </div>
            </div>
            <p className="absolute bottom-4 right-4 rounded-full bg-black/40 px-3 py-1.5 text-[10px] text-white backdrop-blur-sm">{en?"ILLUSTRATIVE · NOT A FINISHED PROJECT":"КОНЦЕПЦИЯ · НЕ Е РЕАЛИЗИРАН ОБЕКТ"}</p>
          </section>

          <section className="border-b border-[#E2E2D8] bg-[#F5F3EE] py-5">
            <div className="container-custom grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
              {[
                {Icon:Layers3,title:en?"One coherent home":"Един цялостен дом",caption:en?"No disconnected rooms":"Без несвързани помещения"},
                {Icon:Home,title:en?"Six views":"Шест зони",caption:en?"Every room has a story":"История за всяка стая"},
                {Icon:Maximize2,title:en?"Floor plan":"Архитектурен план",caption:en?"Single source of geometry":"Единна геометрия"},
                {Icon:ArrowRight,title:en?"Door-to-door":"През вратите",caption:en?"Navigable 3D layout":"Интерактивен 3D модел"},
              ].map(({Icon,title,caption})=><div key={title} className="flex items-start gap-3"><Icon className="h-5 w-5 shrink-0 text-[#5B735A]" strokeWidth={1.5}/><div><p className="text-xs font-semibold md:text-sm">{title}</p><p className="mt-1 text-[11px] leading-[1.5] text-[#727D70]">{caption}</p></div></div>)}
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="container-custom grid gap-7 lg:grid-cols-[.86fr_1.14fr] lg:gap-16">
              <div>
                <p className="rv-kicker mb-3">{en?"THE PROJECT STORY":"ИСТОРИЯТА НА АПАРТАМЕНТА"}</p>
                <h2 className="rv-heading-serif text-[clamp(2rem,3.2vw,3.3rem)] leading-[1.12]">{en?<>A practical layout. <em>One interior language.</em></>:<>Практично разпределение. <em>Единен интериор.</em></>}</h2>
              </div>
              <div className="space-y-4 text-sm leading-[1.85] text-[#4D5B50] md:text-[15px]">
                <p>{l(project.story,language)}</p>
                <p>{en?"The architectural scheme and material choices below demonstrate how a full apartment renovation can be planned from one consistent brief. This is not a report of completed work.":"Архитектурната схема и материалите по-долу показват как може да се планира цялостен ремонт по едно последователно задание. Това не е отчет за действително изпълнен клиентски обект."}</p>
              </div>
            </div>
          </section>

          <section id="project-explorer" ref={viewer} className="scroll-mt-[65px] border-y border-[#E1DED5] bg-[#F1EFE9] pb-14">
            <div className="sticky top-[65px] z-30 border-b border-[#E1DFD7] bg-[#FAF9F6]/95 shadow-sm backdrop-blur-xl">
              <div className="container-custom flex items-center gap-2 overflow-x-auto [scrollbar-width:none]">
                {([
                  {id:"photos" as ViewTab,bg:"По помещения",en:"Room gallery"},
                  {id:"plan" as ViewTab,bg:"Архитектурен план",en:"Floor plan"},
                  {id:"walk" as ViewTab,bg:"Виртуална разходка",en:"3D walkthrough"}
                ]).map(item=><button key={item.id} type="button" onClick={()=>setTab(item.id)}
                  aria-pressed={tab===item.id}
                  className={"relative min-h-[54px] shrink-0 px-4 text-[12px] font-semibold md:px-6 md:text-[13px] "+(tab===item.id?"text-[#38543D]":"text-[#6D786D] hover:text-[#3F5140]")}>
                  {en?item.en:item.bg}{tab===item.id&&<span className="absolute inset-x-2 bottom-0 h-[2px] bg-[#557052]"/>}
                </button>)}
              </div>
            </div>
            <div className="container-custom pt-9 md:pt-12">
              {tab==="photos"&&<>
                <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
                  <div>
                    <p className="rv-kicker mb-2">{en?"THE HOME, ROOM BY ROOM":"АПАРТАМЕНТЪТ СТАЯ ПО СТАЯ"} · {roomIndex+1} / {project.rooms.length}</p>
                    <h2 className="rv-heading-serif text-[clamp(1.9rem,3.2vw,3.3rem)]">{l(current.label,language)}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="rv-project-circle" aria-label={en?"Previous room":"Предишна стая"} onClick={()=>selectRoom(roomIndex-1)}><ChevronLeft className="h-5 w-5"/></button>
                    <button type="button" className="rv-project-circle" aria-label={en?"Next room":"Следваща стая"} onClick={()=>selectRoom(roomIndex+1)}><ChevronRight className="h-5 w-5"/></button>
                  </div>
                </div>
                <div className="grid gap-8 lg:grid-cols-[1.4fr_.75fr] lg:gap-11">
                  <div className="min-w-0">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-[#DFDDD5] md:aspect-[16/10]"
                      onTouchStart={e=>{touchStart.current=e.touches[0]?.clientX??null;}}
                      onTouchEnd={e=>moveTouch(e.changedTouches[0]?.clientX??0)}>
                      <img key={current.id} src={current.image} width="1200" height="800" loading="eager" decoding="async" alt={l(current.alt,language)}
                        onLoad={()=>setImageLoaded(true)}
                        className={"h-full w-full object-cover object-center transition-opacity duration-400 "+(imageLoaded?"opacity-100":"opacity-70")}/>
                      <div className="absolute inset-x-0 bottom-0 flex justify-between gap-4 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-14 text-white">
                        <span className="text-xs font-medium">{l(current.label,language)} <span className="ml-2 opacity-75">{current.number} / 0{project.rooms.length}</span></span>
                        <button type="button" onClick={()=>setExpanded(true)} className="grid h-10 w-10 place-items-center rounded-full border border-white/70 bg-black/30" aria-label={en?"Enlarge image":"Увеличи снимката"}><Expand className="h-4 w-4"/></button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-6">
                      {project.rooms.map((room,index)=><button type="button" key={room.id} onClick={()=>selectRoom(index)}
                        aria-pressed={index===roomIndex} aria-label={(en?"Show ":"Покажи ")+l(room.label,language)}
                        className={"group relative aspect-[5/4] overflow-hidden rounded-[5px] border-2 "+(roomIndex===index?"border-[#5B7556]":"border-transparent hover:border-[#97AC95]")}>
                        <img src={room.image} loading="lazy" alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1 pb-1.5 pt-5 text-[10px] font-medium leading-[1.2] text-white">{l(room.label,language)}</span>
                      </button>)}
                    </div>
                  </div>
                  <div className="self-start">
                    <p className="rv-kicker mb-3">{en?"FUNCTION & DETAIL":"ФУНКЦИЯ И ДЕТАЙЛ"}</p>
                    <h3 className="rv-heading-serif text-[clamp(1.6rem,2.3vw,2.4rem)] leading-[1.15]">{l(current.heading,language)}</h3>
                    <p className="mt-4 text-[13px] leading-[1.8] text-[#5A655B]">{l(current.intro,language)}</p>
                    <div className="mt-6 border-t border-[#D6D8CE] pt-4">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#6E7B6D]">{en?"THE CHALLENGE":"ПРЕДИЗВИКАТЕЛСТВО"}</p>
                      <p className="text-[13px] leading-[1.75] text-[#475348]">{l(current.challenge,language)}</p>
                    </div>
                    <div className="mt-5 border-t border-[#D6D8CE] pt-4">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#4A624E]">{en?"PLANNED SOLUTION":"ПЛАНИРАНО РЕШЕНИЕ"}</p>
                      <p className="text-[13px] leading-[1.75] text-[#475348]">{l(current.approach,language)}</p>
                    </div>
                    <ul className="mt-5 space-y-2.5">
                      {current.details.map((detail,index)=><li key={index} className="flex gap-2 text-xs leading-[1.5] text-[#506052]"><ShieldCheck className="h-4 w-4 shrink-0 text-[#637D61]"/>{l(detail,language)}</li>)}
                    </ul>
                    <div className="mt-7 flex flex-wrap gap-4">
                      <button type="button" onClick={()=>{setWalkZone(roomToZone[current.id]);setTab("walk");}} className="inline-flex min-h-10 items-center gap-2 rounded-[5px] bg-[#526852] px-4 text-xs font-semibold text-white">{en?"Go to this room in 3D":"Отиди в тази стая в 3D"} <ArrowRight className="h-4 w-4"/></button>
                      <button type="button" onClick={()=>selectRoom(roomIndex+1)} className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-[#465E46]">{en?"Next room":"Следваща стая"} <ArrowRight className="h-4 w-4"/></button>
                    </div>
                  </div>
                </div>
              </>}

              {tab==="plan"&&<>
                <div className="mb-6">
                  <p className="rv-kicker mb-2">{en?"ARCHITECTURAL CONCEPT":"АРХИТЕКТУРЕН ПЛАН"}</p>
                  <h2 className="rv-heading-serif max-w-[900px] text-[clamp(1.8rem,3vw,3.2rem)]">{en?<>All rooms. <em>One shared footprint.</em></>:<>Всички помещения. <em>Една обща геометрия.</em></>}</h2>
                  <p className="mt-3 max-w-[720px] text-sm leading-[1.8] text-[#5A665B]">{en?"Select any room on the plan to explore it or enter the walkthrough. Dimensions are indicative.":"Избери стая от плана, за да я разгледаш или да започнеш разходката от нея. Размерите са примерни."}</p>
                </div>
                <ApartmentPlan language={language} activeRoom={walkZone} onRoomSelect={selectZone}/>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={()=>setTab("walk")} className="inline-flex min-h-11 items-center gap-2 rounded-[5px] bg-[#51664E] px-5 text-xs font-semibold text-white">{en?"Enter the 3D walkthrough":"Влез в 3D разходката"} <ArrowUpRight className="h-4 w-4"/></button>
                  <span className="text-xs text-[#768173]">{en?"Approximate gross footprint: 9.80 × 7.40 m":"Примерен външен габарит: 9.80 × 7.40 м"}</span>
                </div>
              </>}

              {tab==="walk"&&<>
                <div className="mb-7">
                  <p className="rv-kicker mb-3">{en?"EXPLORE THE SPACE":"ВЛЕЗ В АПАРТАМЕНТА"}</p>
                  <h2 className="rv-heading-serif max-w-[910px] text-[clamp(1.85rem,3.1vw,3.3rem)]">{en?<>Walk from room to room <em>through the doors.</em></>:<>Премини от стая в стая <em>през вратите.</em></>}</h2>
                  <p className="mt-4 max-w-[740px] text-sm leading-[1.8] text-[#5D685D]">{en?"Walk a simplified first-person model built from exactly the same walls and openings as the floor plan. Room image galleries remain available separately.":"Придвижвай се в опростен 3D модел, използващ същите стени и врати като плана. Снимките на помещенията се разглеждат отделно в галерията."}</p>
                </div>
                <ApartmentWalkthrough language={language} initialZone={walkZone} onZoneChange={setWalkZone}/>
              </>}
            </div>
          </section>

          <section className="py-14 md:py-20">
            <div className="container-custom grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
              <div>
                <p className="rv-kicker mb-3">{en?"COMPLETE RENOVATION SCOPE":"ОБХВАТ НА ЦЯЛОСТНИЯ РЕМОНТ"}</p>
                <h2 className="rv-heading-serif text-[clamp(2rem,3.2vw,3.4rem)] leading-[1.15]">{en?<>Quality starts <em>beneath the finish.</em></>:<>Качеството започва <em>под финиша.</em></>}</h2>
                <p className="mt-5 max-w-[460px] text-sm leading-[1.8] text-[#5A665B]">{en?"Every element is part of a coherent technical sequence — rather than disconnected cosmetic work.":"Всеки детайл е част от обща техническа последователност, а не отделна декоративна задача."}</p>
              </div>
              <div className="grid gap-x-8 md:grid-cols-2">
                {project.scope.map((item,index)=><div key={index} className="flex items-start gap-3 border-b border-[#E1E5DA] py-4"><span className="rv-heading-serif w-6 shrink-0 text-sm text-[#70846D]">0{index+1}</span><span className="text-[13px] leading-[1.6]">{l(item,language)}</span></div>)}
              </div>
            </div>
          </section>

          <section className="bg-[#F3F1EB] py-14 md:py-18">
            <div className="container-custom">
              <p className="rv-kicker mb-3">{en?"HOW THE WORK WOULD PROCEED":"РЕД НА ИЗПЪЛНЕНИЕ"}</p>
              <h2 className="rv-heading-serif max-w-[720px] text-[clamp(2rem,3vw,3.25rem)] leading-[1.15]">{en?<>From the first measurement <em>to the last detail.</em></>:<>От първото измерване <em>до последния детайл.</em></>}</h2>
              <div className="mt-9 grid gap-3 md:grid-cols-5">
                {project.steps.map((stage,index)=><div key={index} className="rounded-[6px] border border-[#E0DED5] bg-[#FAF9F6] p-5">
                  <span className="rv-heading-serif text-[25px] text-[#687D65]">0{index+1}</span>
                  <h3 className="mt-4 text-[13px] font-semibold">{l(stage.title,language)}</h3>
                  <p className="mt-3 text-[12px] leading-[1.7] text-[#667066]">{l(stage.body,language)}</p>
                </div>)}
              </div>
              <p className="mt-6 text-xs leading-[1.8] text-[#747E73]">{en?"Illustrative workflow, not a record of works already performed.":"Примерен работен процес, а не отчет за вече извършени ремонтни дейности."}</p>
            </div>
          </section>

          <section className="py-12">
            <div className="container-custom rounded-[8px] bg-[#4E644E] px-6 py-11 text-white md:px-12">
              <div className="grid gap-6 md:grid-cols-[1.4fr_.8fr] md:items-end">
                <div>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#DBE7D8]">{en?"YOUR APARTMENT":"ВАШИЯТ АПАРТАМЕНТ"}</p>
                  <h2 className="rv-heading-serif max-w-[740px] text-[clamp(2rem,3.5vw,3.8rem)]">{en?<>Let's plan <em className="!text-white/80">your home.</em></>:<>Нека планираме <em className="!text-white/80">вашия дом.</em></>}</h2>
                  <p className="mt-4 max-w-[610px] text-sm leading-[1.7] text-white/85">{en?"A walkthrough can show an idea. Actual renovation starts with your floor plan, measurements, needs and a site visit.":"Визуализацията показва идея. Истинският ремонт започва от вашия план, размерите, нуждите ви и оглед на място."}</p>
                </div>
                <button type="button" onClick={openModal} className="inline-flex min-h-12 items-center justify-center gap-3 justify-self-start rounded-[5px] bg-[#FAF9F6] px-6 text-sm font-semibold text-[#2E4232] md:justify-self-end">{en?"Request a visit":"Заяви оглед"} <ArrowUpRight className="h-4 w-4"/></button>
              </div>
            </div>
          </section>

          <section className="border-t border-[#E7E5DB] py-6">
            <div className="container-custom flex flex-wrap items-center justify-between gap-4">
              <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-[#455D47]"><ArrowLeft className="h-4 w-4"/>{en?"Back to projects":"Обратно към проектите"}</Link>
              <span className="text-[11px] text-[#778174]">{en?"Project 01 · Conceptual visualization":"Проект 01 · Концептуална визуализация"}</span>
            </div>
          </section>
        </div>
        {expanded&&<div role="dialog" aria-modal="true" aria-label={en?"Enlarged room illustration":"Увеличена визуализация"} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 md:p-10" onClick={()=>setExpanded(false)}>
          <button type="button" aria-label={en?"Close":"Затвори"} className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white" onClick={()=>setExpanded(false)}><X className="h-5 w-5"/></button>
          <button type="button" aria-label={en?"Previous room":"Предишно помещение"} className="absolute left-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white" onClick={e=>{e.stopPropagation();selectRoom(roomIndex-1);}}><ChevronLeft className="h-6 w-6"/></button>
          <img src={current.image} alt={l(current.alt,language)} className="max-h-[90vh] max-w-[90vw] object-contain" onClick={e=>e.stopPropagation()}/>
          <button type="button" aria-label={en?"Next room":"Следващо помещение"} className="absolute right-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white" onClick={e=>{e.stopPropagation();selectRoom(roomIndex+1);}}><ChevronRight className="h-6 w-6"/></button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/70">{l(current.label,language)}</span>
        </div>}
      </Layout>
    </>
  );
}
