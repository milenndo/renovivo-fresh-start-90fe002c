import { Home, Info, Maximize2, MousePointerClick } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { renovationProject01 as project, localText as tr, type RoomKey } from "@/data/portfolioProject01";

/** Indicative architectural diagram, NOT a measured existing apartment. */
export default function ApartmentPlan({activeRoom,onSelect}:{activeRoom:RoomKey;onSelect:(id:RoomKey)=>void}) {
  const {language}=useLanguage();
  const en=language==="en";
  const hotspots=[
    {id:"bedroom" as RoomKey,x:275,y:206,label:en?"Bedroom":"Спалня"},
    {id:"living" as RoomKey,x:660,y:207,label:en?"Living":"Дневна"},
    {id:"kitchen" as RoomKey,x:685,y:492,label:en?"Kitchen":"Кухня"},
    {id:"bathroom" as RoomKey,x:186,y:458,label:en?"Bathroom":"Баня"},
    {id:"hall" as RoomKey,x:405,y:505,label:en?"Hallway":"Антре"},
  ];
  return (
    <section id="architectural-plan" className="border-y border-[#E4E3D9] bg-[#F6F4EF] py-12 md:py-20 scroll-mt-[70px]">
      <div className="container-custom">
        <div className="mb-8 grid items-end gap-4 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
          <div>
            <p className="rv-kicker mb-3">{en?"ARCHITECTURAL CONCEPT":"АРХИТЕКТУРЕН ПЛАН"}</p>
            <h2 className="rv-heading-serif text-[clamp(2.1rem,4vw,3.8rem)] leading-[1.12]">{en?<>One layout. <em>Connected rooms.</em></>:<>Едно разпределение. <em>Свързани помещения.</em></>}</h2>
          </div>
          <p className="max-w-xl text-sm leading-[1.8] text-[#5B675C]">{en
            ?"A clear plan of the apartment's spatial idea — living and kitchen in one open zone, a separate bedroom, bathroom and practical entrance. Select a room to see its detailed story below."
            :"Концептуално разпределение на цялото жилище: свързани дневна и кухня, самостоятелна спалня, баня и практично антре. Избери помещение, за да видиш неговата история и визуализации по-долу."}</p>
        </div>
        <div className="grid overflow-hidden rounded-[10px] border border-[#DEE0D7] bg-[#FAF9F6] lg:grid-cols-[minmax(0,1.65fr)_minmax(270px,.75fr)]">
          <div className="overflow-hidden border-b border-[#E1E2D9] p-3 sm:p-6 lg:border-b-0 lg:border-r">
            <svg viewBox="0 0 960 700" className="block w-full rounded-[6px] bg-[#F4F2ED]" role="img" aria-label={en?"Floor plan with labeled bedroom, bathroom, hall, living room and kitchen":"Концептуален архитектурен план на апартамента с помещения и врати"}>
              <defs>
                <pattern id="plan-hatch-project01" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M 0 12 L 12 0" stroke="#E9E8E2" strokeWidth="1"/></pattern>
                <pattern id="plan-wood-project01" width="40" height="16" patternUnits="userSpaceOnUse"><path d="M0 0 H40 M0 8 H40" stroke="#D4CDBD" strokeWidth="1" opacity=".45"/></pattern>
              </defs>
              <text x="53" y="39" fontSize="13" fontWeight="600" letterSpacing="2" fill="#5E6A60">RENOVIVO / PROJECT 01</text>
              <text x="835" y="39" textAnchor="end" fontSize="13" fill="#6A7669">{en?"SCHEMATIC PLAN":"КОНЦЕПТУАЛЕН ПЛАН"}</text>
              <rect x="58" y="67" width="838" height="556" fill="#FAF9F6"/>
              <rect x="82" y="91" width="423" height="211" fill="#E8E4DC"/>
              <rect x="82" y="327" width="228" height="270" fill="#DDE6E2"/>
              <rect x="333" y="327" width="172" height="270" fill="#EEEAE3"/>
              <rect x="530" y="91" width="340" height="506" fill="#E8EBE3"/>
              <rect x="530" y="91" width="340" height="506" fill="url(#plan-wood-project01)"/>
              <rect x="58" y="67" width="838" height="556" fill="none" stroke="#344239" strokeWidth="22"/>
              {/* Bedroom wall, door opening down to hall */}
              <path d="M 517 81 V 316 H 528" fill="none" stroke="#344239" strokeWidth="13"/>
              <path d="M 70 316 H 368 M 420 316 H 519" fill="none" stroke="#344239" strokeWidth="13"/>
              <path d="M 323 316 V 430 M 323 491 V 608" fill="none" stroke="#344239" strokeWidth="13"/>
              {/* Hallway / open living connection with a proper 85cm door opening */}
              <path d="M 517 316 V 411 M 517 482 V 609" fill="none" stroke="#344239" strokeWidth="13"/>
              {/* Door swing arcs: the gaps above correspond to working openings */}
              <path d="M 368 317 A 52 52 0 0 1 420 369" stroke="#8B9C8B" fill="none" strokeWidth="2" strokeDasharray="5 4"/>
              <path d="M 323 430 A 61 61 0 0 1 384 491" stroke="#8B9C8B" fill="none" strokeWidth="2" strokeDasharray="5 4"/>
              <path d="M 517 411 A 71 71 0 0 1 588 482" stroke="#8B9C8B" fill="none" strokeWidth="2" strokeDasharray="5 4"/>
              {/* Entrance / threshold */}
              <path d="M 380 608 H 450" stroke="#B7AD98" strokeWidth="10"/>
              <path d="M 380 608 A 70 70 0 0 1 450 538" stroke="#8B9C8B" fill="none" strokeWidth="2" strokeDasharray="4 4"/>
              {/* Basic equipment furniture symbols, no claim to measured built-ins */}
              <rect x="142" y="131" width="175" height="120" rx="7" fill="#CEC9C1" stroke="#9CA298" strokeWidth="2"/>
              <rect x="160" y="136" width="64" height="36" rx="7" fill="#F6F4EF"/>
              <rect x="232" y="136" width="64" height="36" rx="7" fill="#F6F4EF"/>
              <rect x="100" y="103" width="23" height="180" rx="3" fill="#D6C6AA" stroke="#9CA298"/>
              <rect x="550" y="131" width="165" height="85" rx="14" fill="#CCCEC5" stroke="#A0A69D" strokeWidth="2"/>
              <rect x="566" y="148" width="143" height="53" rx="5" fill="none" stroke="#B1BAAE"/>
              <ellipse cx="648" cy="265" rx="51" ry="30" fill="#D7D2C8" stroke="#A6AA9E"/>
              <rect x="796" y="142" width="33" height="168" rx="3" fill="#D8C7AA" stroke="#ABAC9D"/>
              <rect x="539" y="509" width="306" height="61" rx="2" fill="#C2C8BF" stroke="#9EA99E" strokeWidth="1.5"/>
              <rect x="795" y="360" width="56" height="140" rx="3" fill="#BDC9BC" stroke="#9EA99E"/>
              <circle cx="819" cy="441" r="14" fill="#F1F3EF" stroke="#889B8A" strokeWidth="2"/>
              <rect x="625" y="387" width="98" height="78" rx="8" fill="#D6CDBF" stroke="#ABAC9D"/>
              <rect x="101" y="356" width="118" height="112" rx="4" stroke="#A1ADA6" fill="none" strokeWidth="3"/>
              <path d="M 103 359 L 216 465 M 216 359 L 103 465" stroke="#B1B9B3" strokeWidth="1.5"/>
              <ellipse cx="260" cy="516" rx="22" ry="30" fill="#F5F6F2" stroke="#A1ADA6" strokeWidth="3"/>
              <rect x="125" y="515" width="96" height="40" rx="4" fill="#C4B9A8" stroke="#A1ADA6"/>
              <ellipse cx="173" cy="534" rx="20" ry="12" fill="#F5F6F2"/>
              <rect x="357" y="347" width="120" height="34" rx="4" fill="#D0C4AD" stroke="#A5B1A3"/>
              {/* Zone labels */}
              {hotspots.map(({id,x,y,label})=>{
                const selected=activeRoom===id;
                return <g key={id} onClick={()=>onSelect(id)} onKeyDown={(event)=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();onSelect(id);}}} tabIndex={0} role="button" aria-label={(en?"View ":"Покажи ")+label} className="cursor-pointer">
                  <circle cx={x} cy={y} r="23" fill={selected?"#354D3D":"#FAFAF7"} stroke={selected?"#293E30":"#798C7B"} strokeWidth="2.5"/>
                  <text x={x} y={y+5} fill={selected?"white":"#334739"} textAnchor="middle" fontSize="12" fontWeight="700">{id==="living"?"L":id==="kitchen"?"K":id==="bedroom"?"S":id==="bathroom"?"B":"A"}</text>
                  <text x={x} y={y+39} fill="#485C4A" textAnchor="middle" fontSize="14" fontWeight="600">{label}</text>
                </g>;
              })}
              <text x="480" y="672" textAnchor="middle" fontSize="13" fill="#637164">{en?"ILLUSTRATIVE LAYOUT · NOT A SURVEY OR BUILDING PERMIT DRAWING":"ПРИМЕРНО РАЗПРЕДЕЛЕНИЕ · НЕ Е ГЕОДЕЗИЧНО ЗАСНЕМАНЕ ИЛИ РАБОТЕН ЧЕРТЕЖ"}</text>
            </svg>
          </div>
          <div className="flex flex-col justify-between p-6 md:p-8">
            <div>
              <p className="rv-kicker mb-5">{en?"ROOM REGISTER":"РЕГИСТЪР НА ПОМЕЩЕНИЯТА"}</p>
              <div className="space-y-2">
                {hotspots.map((h,index)=><button key={h.id} type="button" onClick={()=>onSelect(h.id)}
                  className={"flex min-h-11 w-full items-center gap-3 rounded-[6px] border px-3 text-left transition-colors "+(activeRoom===h.id?"border-[#789077] bg-[#E7EDE5]":"border-[#E6E8DF] hover:bg-[#F0F2EC]")}>
                  <span className="rv-heading-serif w-6 text-sm text-[#647767]">0{index+1}</span>
                  <span className="flex-1 text-[13px] font-semibold text-[#354438]">{h.label}</span>
                  <MousePointerClick className="h-4 w-4 text-[#69806C]"/>
                </button>)}
              </div>
            </div>
            <div className="mt-7 border-t border-[#DFE1D9] pt-6">
              <p className="mb-3 flex items-center gap-2 text-[12px] font-semibold text-[#425444]"><Info className="h-4 w-4"/>{en?"Important":"Важно уточнение"}</p>
              <p className="text-[12px] leading-[1.8] text-[#69756B]">{en?"This architectural diagram is an illustrative design concept. Dimensions, structural walls, services and door widths require site measurements before any construction work.":"Това е архитектурна концепция за демонстрационния апартамент. Реалните размери, носещите стени, инсталациите и светлите отвори се проверяват чрез заснемане преди изпълнение."}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-[11px] text-[#788476]"><Maximize2 className="h-4 w-4"/>{tr(project.area,language)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
