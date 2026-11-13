import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Eye, Expand, MapPinned, RotateCcw } from "lucide-react";
import { renovationProject01 as project, localText as tr, type RoomKey } from "@/data/portfolioProject01";
import { useLanguage } from "@/contexts/LanguageContext";

/** Conceptual (not measured) navigation model. All door openings are passable. */
const GRID = [
  "############",
  "#BBBBB#LLLL#",
  "#BBBBB#LLLL#",
  "#BBBBB#LLLL#",
  "###B###LLLL#",
  "#HHHHHHHLLL#",
  "#TT#HHH#KKK#",
  "#TT#HHH#KKK#",
  "#TTDHHH#KKK#",
  "####D#######"
];
const WIDTH = 12, HEIGHT = 10;
const HOME = {
  overview:{x:8.5,z:5.2,a:-Math.PI/2},
  living:{x:9.0,z:2.8,a:0.1},
  kitchen:{x:9,z:7.15,a:-1.5},
  bedroom:{x:3.15,z:2.7,a:-Math.PI/2},
  bathroom:{x:1.7,z:7.2,a:-Math.PI/2},
  hall:{x:5,z:7.25,a:-Math.PI/2}
} satisfies Record<RoomKey,{x:number;z:number;a:number}>;
const COLORS:Record<string,string> = {B:"#E9E6DF",L:"#E0E7DF",K:"#E7E0D3",T:"#DCE7E6",H:"#EEEAE2",D:"#EEEAE2","#":"#4F5A51"};
const NAMES:Record<string,RoomKey>={B:"bedroom",L:"living",K:"kitchen",T:"bathroom",H:"hall",D:"hall"};
const cell=(x:number,z:number) => GRID[Math.floor(z)]?.[Math.floor(x)] ?? "#";
const passable=(x:number,z:number) => cell(x,z)!=="#";
const canMove=(x:number,z:number)=>{
  const r=.17;
  return passable(x-r,z-r)&&passable(x+r,z-r)&&passable(x-r,z+r)&&passable(x+r,z+r);
};
const roomAt=(x:number,z:number):RoomKey => NAMES[cell(x,z)] || "hall";

function drawView(canvas:HTMLCanvasElement,position:{x:number;z:number;a:number}) {
  const ctx=canvas.getContext("2d");
  if(!ctx)return;
  const w=canvas.width,h=canvas.height;
  const sky=ctx.createLinearGradient(0,0,0,h*.52);
  sky.addColorStop(0,"#d5dcd7");sky.addColorStop(1,"#eee9df");
  ctx.fillStyle=sky;ctx.fillRect(0,0,w,h*.5);
  const ground=ctx.createLinearGradient(0,h*.5,0,h);
  ground.addColorStop(0,"#c4b8a5");ground.addColorStop(1,"#8f8173");
  ctx.fillStyle=ground;ctx.fillRect(0,h*.5,w,h*.5);
  const fov=Math.PI/2.95;
  // DDA rays: each wall cell is an opaque wall. Adjacent floor cells are open doors/passages.
  for(let px=0;px<w;px+=2){
    const angle=position.a + Math.atan(((px/w)*2-1)*Math.tan(fov/2));
    const dx=Math.cos(angle), dz=Math.sin(angle);
    let mx=Math.floor(position.x),mz=Math.floor(position.z);
    const stepx=dx<0?-1:1, stepz=dz<0?-1:1;
    const distx=Math.abs(1/(dx||1e-8)), distz=Math.abs(1/(dz||1e-8));
    let sx=(dx<0?position.x-mx:mx+1-position.x)*distx;
    let sz=(dz<0?position.z-mz:mz+1-position.z)*distz;
    let side=0, t=0;
    while(t++<34 && GRID[mz]?.[mx]!=="#"){
      if(sx<sz){mx+=stepx;sx+=distx;side=0;}
      else {mz+=stepz;sz+=distz;side=1;}
      if(mx<0||mx>=WIDTH||mz<0||mz>=HEIGHT)break;
    }
    const distance=Math.max(.12, (side===0?sx-distx:sz-distz)*Math.cos(angle-position.a));
    const height=Math.min(h*2,h/(distance*.82));
    const top=Math.round((h-height)*.5);
    const shade=Math.max(.51,1-distance/17)*(side===1?.87:1);
    const n=side===0?Math.floor((position.z+distance*dz)*8)%10:Math.floor((position.x+distance*dx)*8)%10;
    const variation=n===0?-.05:0;
    const base=Math.round(226*shade+variation*226);
    ctx.fillStyle="rgb("+Math.min(245,base)+","+Math.min(245,base+3)+","+Math.min(245,base-5)+")";
    ctx.fillRect(px,top,2,height);
    // Warm baseboards, thin vertical joins, and ceiling line are readable structural cues.
    ctx.fillStyle="rgba(106,100,87,.35)";
    ctx.fillRect(px,top+height-5,2,5);
    ctx.fillStyle="rgba(255,255,255,.32)";
    ctx.fillRect(px,top,2,2);
  }
  // Minimal horizon reticle to make steering easier.
  ctx.strokeStyle="rgba(52,67,56,.6)";
  ctx.lineWidth=1.6;
  ctx.beginPath();ctx.moveTo(w/2-6,h/2);ctx.lineTo(w/2+6,h/2);ctx.moveTo(w/2,h/2-6);ctx.lineTo(w/2,h/2+6);ctx.stroke();
}
type ViewState={x:number;z:number;a:number};

export default function ApartmentExplorer({onRoomSelect}:{onRoomSelect?:(room:RoomKey)=>void}) {
  const {language}=useLanguage();
  const en=language==="en";
  const canvas=useRef<HTMLCanvasElement|null>(null);
  const ref=useRef<ViewState>({...HOME.hall});
  const held=useRef<Set<string>>(new Set());
  const drag=useRef<number|null>(null);
  const [current,setCurrent]=useState<RoomKey>("hall");
  const [ready,setReady]=useState(false);
  const [showPlan,setShowPlan]=useState(true);
  const focusRef=useRef<HTMLDivElement|null>(null);

  const travel=(id:RoomKey)=>{
    ref.current={...HOME[id]};
    setCurrent(id);
    onRoomSelect?.(id);
    if(canvas.current)drawView(canvas.current,ref.current);
  };
  const reset=()=>travel("hall");

  useEffect(()=>{
    const el=canvas.current;
    if(!el)return;
    el.width=768;el.height=432;
    drawView(el,ref.current);setReady(true);
    let frame=0,previous=performance.now(),lastRoom=current;
    const animate=(time:number)=>{
      const delta=Math.min(.04,(time-previous)/1000);previous=time;
      const p=ref.current;
      let turn=0,forward=0,strafe=0;
      if(held.current.has("left"))turn-=1;
      if(held.current.has("right"))turn+=1;
      if(held.current.has("forward"))forward+=1;
      if(held.current.has("backward"))forward-=1;
      if(held.current.has("strafe-left"))strafe-=1;
      if(held.current.has("strafe-right"))strafe+=1;
      if(turn||forward||strafe) {
        p.a+=turn*delta*1.65;
        const distance=delta*2.2;
        const mx=(Math.cos(p.a)*forward-Math.sin(p.a)*strafe)*distance;
        const mz=(Math.sin(p.a)*forward+Math.cos(p.a)*strafe)*distance;
        if(canMove(p.x+mx,p.z))p.x+=mx;
        if(canMove(p.x,p.z+mz))p.z+=mz;
        drawView(el,p);
      }
      const rm=roomAt(p.x,p.z);
      if(rm!==lastRoom) {
        lastRoom=rm;
        setCurrent(rm);
        onRoomSelect?.(rm);
      }
      frame=requestAnimationFrame(animate);
    };
    frame=requestAnimationFrame(animate);
    const mapping:Record<string,string> = {
      ArrowUp:"forward",w:"forward",W:"forward",
      ArrowDown:"backward",s:"backward",S:"backward",
      ArrowLeft:"left",a:"left",A:"left",
      ArrowRight:"right",d:"right",D:"right",
      q:"strafe-left",Q:"strafe-left",e:"strafe-right",E:"strafe-right"
    };
    const keyDown=(event:KeyboardEvent)=>{
      if(!focusRef.current?.contains(document.activeElement))return;
      const code=mapping[event.key];
      if(code){event.preventDefault();held.current.add(code);}
    };
    const keyUp=(event:KeyboardEvent)=>{
      const code=mapping[event.key];
      if(code)held.current.delete(code);
    };
    const leave=()=>held.current.clear();
    window.addEventListener("keydown",keyDown);
    window.addEventListener("keyup",keyUp);
    window.addEventListener("blur",leave);
    return ()=>{
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown",keyDown);
      window.removeEventListener("keyup",keyUp);
      window.removeEventListener("blur",leave);
    };
  },[]);

  const hold=(control:string)=>(event:React.PointerEvent<HTMLButtonElement>)=>{
    event.preventDefault();
    held.current.add(control);
    event.currentTarget.setPointerCapture(event.pointerId);
    focusRef.current?.focus();
  };
  const stop=(control:string)=>()=>held.current.delete(control);
  const activeRoom=project.rooms.find(x=>x.id===current);
  return (
    <section id="walkthrough" className="border-t border-[#e6e5dc] bg-[#F0EEE8] py-12 md:py-20">
      <div className="container-custom">
        <div className="mb-8 grid gap-5 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
          <div>
            <p className="rv-kicker mb-3">{en?"INTERACTIVE APARTMENT EXPLORER":"ИНТЕРАКТИВНА РАЗХОДКА ПО АПАРТАМЕНТА"}</p>
            <h2 className="rv-heading-serif text-[clamp(2.1rem,4vw,3.8rem)] leading-[1.14]">
              {en?<>Walk through <em>every doorway.</em></>:<>Премини <em>през всяка врата.</em></>}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-[1.75] text-[#5B685B]">{en
            ?"A navigable, conceptual 3D shell showing room connections and circulation. Use the arrow controls, keyboard or select a room on the plan."
            :"Свободно управляем концептуален 3D модел с действително преминаване между помещенията. Използвай стрелките, клавиатурата или избери стая от плана."}</p>
        </div>

        <div className="grid overflow-hidden rounded-[12px] border border-[#D9DBD2] bg-[#FAF9F6] shadow-[0_14px_45px_rgba(38,45,39,.07)] lg:grid-cols-[minmax(0,1.6fr)_minmax(290px,.8fr)]">
          <div className="min-w-0 border-b border-[#E3E5DB] lg:border-b-0 lg:border-r">
            <div ref={focusRef} tabIndex={0} className="relative outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#566B55]">
              <canvas ref={canvas} width={768} height={432} onPointerDown={(e)=>{drag.current=e.clientX;e.currentTarget.setPointerCapture(e.pointerId);focusRef.current?.focus();}} onPointerMove={(e)=>{if(drag.current===null)return;ref.current.a+=(e.clientX-drag.current)*.006;drag.current=e.clientX;drawView(e.currentTarget,ref.current);}} onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}} className="block aspect-video w-full cursor-grab touch-pan-y bg-[#DCDDD5] active:cursor-grabbing" aria-label={en?"Navigable 3D apartment model":"Проходим 3D модел на апартамента"} />
              <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#23312A]/85 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">{en?"Inside":"В помещение"}: {activeRoom?tr(activeRoom.label,language):current}</span>
              <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/30 px-3 py-1.5 text-[10px] text-white">{en?"Conceptual 3D model":"Схематичен 3D модел"}</span>
              {!ready&&<span className="absolute inset-0 grid place-items-center text-sm text-[#455145]">{en?"Loading room model":"Зареждане на модела"}</span>}
            </div>
            <div className="flex flex-col gap-3 border-t border-[#E4E4DB] px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="flex items-center gap-2">
                <button type="button" onClick={reset} className="flex min-h-9 items-center gap-2 rounded-[5px] border border-[#D9DDD1] px-3 text-[11px] font-semibold text-[#465746]"><RotateCcw className="h-3.5 w-3.5"/>{en?"Entrance":"Към входа"}</button>
                <button type="button" onClick={()=>setShowPlan(!showPlan)} className="flex min-h-9 items-center gap-2 rounded-[5px] border border-[#D9DDD1] px-3 text-[11px] font-semibold text-[#465746] lg:hidden"><MapPinned className="h-3.5 w-3.5"/>{en?"Plan":"План"}</button>
              </div>
              <div className="flex items-center gap-1.5" aria-label={en?"Walkthrough controls":"Управление на разходката"}>
                {[
                  {id:"left",Icon:ArrowLeft,label:en?"Turn left":"Завий наляво"},
                  {id:"forward",Icon:ArrowUp,label:en?"Move forward":"Напред"},
                  {id:"backward",Icon:ArrowDown,label:en?"Move backward":"Назад"},
                  {id:"right",Icon:ArrowRight,label:en?"Turn right":"Завий надясно"}
                ].map(({id,Icon,label})=>(
                  <button type="button" key={id} aria-label={label} title={label}
                    onPointerDown={hold(id)} onPointerUp={stop(id)} onPointerCancel={stop(id)} onLostPointerCapture={stop(id)}
                    className="grid h-10 w-10 touch-none place-items-center rounded-[5px] border border-[#CBD1C5] bg-[#EDF1E9] text-[#384C3B] active:bg-[#C9D4C6]">
                    <Icon className="h-5 w-5"/>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={(showPlan?"":"max-lg:hidden ")+"flex min-w-0 flex-col gap-5 p-4 sm:p-6"}>
            <div className="flex items-center justify-between gap-3">
              <div><p className="rv-kicker mb-1">{en?"ARCHITECTURAL SCHEMATIC":"АРХИТЕКТУРНА СХЕМА"}</p><p className="text-[12px] text-[#626F62]">{en?"Concept layout · unmeasured":"Концептуално разпределение · не е заснет план"}</p></div>
              <Expand className="h-4 w-4 text-[#657763]"/>
            </div>

            <svg viewBox="0 0 516 452" role="img" aria-label={en?"Interactive floor plan showing room connections":"Интерактивен архитектурен план с помещения и врати"} className="w-full rounded-[6px] bg-[#F2F0E9]">
              <defs><pattern id="plan-grid-01" width="38" height="38" patternUnits="userSpaceOnUse"><path d="M 38 0 L 0 0 0 38" fill="none" stroke="#D7D9D2" strokeWidth=".65"/></pattern></defs>
              <g transform="translate(30 32)">
                {GRID.map((row,z)=>row.split("").map((type,x)=><rect key={x+"-"+z} x={x*38} y={z*38} width="38" height="38" fill={COLORS[type]}/>) )}
                <rect width={WIDTH*38} height={HEIGHT*38} fill="url(#plan-grid-01)" opacity=".4"/>
                {[
                  {x:1.1,y:2.5,key:"bedroom" as RoomKey},
                  {x:7.4,y:2.5,key:"living" as RoomKey},
                  {x:8.1,y:7.4,key:"kitchen" as RoomKey},
                  {x:.65,y:7.25,key:"bathroom" as RoomKey},
                  {x:4.0,y:6.4,key:"hall" as RoomKey}
                ].map(({x,y,key})=>{
                  const room=project.rooms.find(r=>r.id===key)!;
                  return <g key={key} onClick={()=>travel(key)} className="cursor-pointer" role="button" aria-label={tr(room.label,language)}>
                    <rect x={x*38-4} y={y*38-17} width={key==="living"?110:key==="bedroom"?94:80} height="34" rx="6" fill={current===key?"#344B3B":"#FAF9F6"} stroke="#9AA99B" strokeWidth="1.4"/>
                    <text x={x*38+8} y={y*38+5} fill={current===key?"#ffffff":"#314336"} fontSize="12" fontWeight="600">{tr(room.label,language)}</text>
                  </g>;
                })}
                <circle cx={ref.current.x*38} cy={ref.current.z*38} r="10" fill="#365F47" stroke="white" strokeWidth="3"/>
                <circle cx={ref.current.x*38} cy={ref.current.z*38} r="2.5" fill="white"/>
              </g>
              <text x="32" y="428" fontSize="11" fill="#607264">{en?"~70 m² concept · not for construction":"~70 м² схема · не е за строителство"}</text>
            </svg>
            <div className="grid grid-cols-2 gap-2">
              {project.rooms.filter(r=>r.id!=="overview").map(room=><button key={room.id} onClick={()=>travel(room.id)} type="button"
                className={"flex min-h-9 items-center justify-between gap-2 rounded-[5px] border px-3 text-left text-[11px] font-medium "+(current===room.id?"border-[#556B55] bg-[#E6ECE1] text-[#354936]":"border-[#E3E6DD] bg-white text-[#546257] hover:bg-[#F1F4EE]")}>
                <span>{tr(room.label,language)}</span><Eye className="h-3.5 w-3.5 shrink-0"/>
              </button>)}
            </div>
            <p className="text-[11px] leading-[1.65] text-[#788278]">{en?"This walkable model is a schematic of connections and proportions, not a photorealistic 3D scan or approved construction drawing.":"Това е проходим 3D схематичен модел на връзките между стаите, а не фотографски 3D скан или одобрен работен архитектурен план."}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
