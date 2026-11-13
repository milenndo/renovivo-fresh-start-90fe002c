import { useEffect, useRef, useState } from "react";
import ApartmentPlan from "./ApartmentPlan";
import {
  canWalkTo, footprint, getZone, rooms, wallSegments, type WalkZoneId, type WallKind,
} from "@/data/portfolioArchitecture";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Compass, DoorOpen, RotateCcw } from "lucide-react";

type Camera = { x:number; z:number; angle:number };
const START: Camera = {x:4.85,z:6.6,angle:-Math.PI/2};
type Direction = "forward" | "back" | "left" | "right" | "turnLeft" | "turnRight";
const normalize=(n:number)=>(n%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
const cross=(x:number,z:number,xx:number,zz:number)=>x*zz-z*xx;

function castRay(x:number,z:number,angle:number) {
  const dx=Math.cos(angle),dz=Math.sin(angle);
  let distance=50,kind:WallKind="perimeter",coord=0;
  for(const wall of wallSegments){
    const vx=wall.b[0]-wall.a[0],vz=wall.b[1]-wall.a[1];
    const denom=cross(dx,dz,vx,vz);
    if(Math.abs(denom)<1e-8)continue;
    const ax=wall.a[0]-x,az=wall.a[1]-z;
    const t=cross(ax,az,vx,vz)/denom;
    const u=cross(ax,az,dx,dz)/denom;
    if(t>0.001&&t<distance&&u>=0&&u<=1){distance=t;kind=wall.kind;coord=u*Math.hypot(vx,vz);}
  }
  return {distance,kind,coord};
}
const color=(kind:WallKind,shade:number)=>{
  const base=kind==="window"?[153,190,202]:kind==="entry"?[119,131,120]:kind==="bath"?[202,203,195]:kind==="perimeter"?[225,222,213]:[217,214,205];
  return "rgb("+base.map(n=>Math.round(Math.max(0,n*shade))).join(",")+")";
};
function paint(ctx:CanvasRenderingContext2D,W:number,H:number,pose:Camera){
  const ceiling=ctx.createLinearGradient(0,0,0,H*.52);
  ceiling.addColorStop(0,"#D5D5CF");ceiling.addColorStop(1,"#F4F2EB");
  ctx.fillStyle=ceiling;ctx.fillRect(0,0,W,H*.52);
  const ground=ctx.createLinearGradient(0,H*.52,0,H);
  ground.addColorStop(0,"#A28E74");ground.addColorStop(1,"#D6C2A6");
  ctx.fillStyle=ground;ctx.fillRect(0,H*.52,W,H*.48);
  // Perspective floorboards / guide lines. The architecture itself comes from the plan above.
  ctx.lineWidth=1;
  for(let j=1;j<15;j++){
    const yy=H*.52+(H*.48)*(1-Math.exp(-j*.23));
    ctx.strokeStyle="rgba(74,65,47,"+(.16+j*.003)+")";
    ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(W,yy);ctx.stroke();
  }
  const rays=Math.min(600,Math.ceil(W/2.5)), column=W/rays, fov=1.18;
  for(let i=0;i<rays;i++){
    const da=Math.atan((2*((i+.5)/rays)-1)*Math.tan(fov/2));
    const hit=castRay(pose.x,pose.z,pose.angle+da);
    if(hit.distance>45)continue;
    const corrected=Math.max(.05,hit.distance*Math.cos(da));
    const wallH=Math.min(H*2.5,H*1.05/corrected);
    const top=(H-wallH)/2;
    const side=(hit.kind==="perimeter"?.98:1.0);
    const shade=Math.max(.56,1-Math.min(20,corrected)*.038)*side;
    const x=Math.floor(i*column);
    if(hit.kind==="window"){
      ctx.fillStyle="#DCDDD6";ctx.fillRect(x,top,column+1,wallH*.19);
      ctx.fillStyle=color("window",shade);ctx.fillRect(x,top+wallH*.19,column+1,wallH*.67);
      ctx.fillStyle="#CACAC3";ctx.fillRect(x,top+wallH*.86,column+1,wallH*.14);
      if((hit.coord%1.2)<.036){ctx.fillStyle="#7F918C";ctx.fillRect(x,top+wallH*.19,column+1,wallH*.67);}
    }else{
      ctx.fillStyle=color(hit.kind,shade);
      ctx.fillRect(x,top,column+1,wallH);
      ctx.fillStyle="rgba(255,255,255,.16)";ctx.fillRect(x,top,column+1,Math.max(1,wallH*.022));
      ctx.fillStyle="rgba(65,53,42,.22)";ctx.fillRect(x,top+wallH*.93,column+1,Math.max(1,wallH*.035));
      if(hit.kind==="entry"){ctx.fillStyle="rgba(16,20,17,.25)";ctx.fillRect(x,top,column+1,Math.max(1,wallH*.08));}
      if((hit.coord%1.3)<.022){ctx.fillStyle="rgba(80,80,73,.035)";ctx.fillRect(x,top,column+1,wallH);}
    }
  }
  // Camera aim / UI overlay.
  ctx.strokeStyle="rgba(255,255,255,.72)";ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(W/2-10,H/2);ctx.lineTo(W/2-3,H/2);
  ctx.moveTo(W/2+3,H/2);ctx.lineTo(W/2+10,H/2);
  ctx.moveTo(W/2,H/2-10);ctx.lineTo(W/2,H/2-3);
  ctx.moveTo(W/2,H/2+3);ctx.lineTo(W/2,H/2+10);ctx.stroke();
}

export default function ApartmentWalkthrough({language="bg",initialZone,onZoneChange}:{
  language?:string;
  initialZone?:WalkZoneId;
  onZoneChange?:(zone:WalkZoneId)=>void;
}){
  const en=language==="en";
  const canvas=useRef<HTMLCanvasElement|null>(null);
  const pose=useRef<Camera>(START);
  const [visiblePose,setVisiblePose]=useState<Camera>(START);
  const [activeZone,setActiveZone]=useState<WalkZoneId>("hall");
  const keyState=useRef(new Set<string>());
  const touch=useRef<{x:number;y:number}|null>(null);
  const controls=useRef(new Set<Direction>());
  const [expanded,setExpanded]=useState(false);
  const [hasFocus,setHasFocus]=useState(false);

  const navigateTo=(id:WalkZoneId)=>{
    const zone=rooms.find(room=>room.id===id);
    if(!zone)return;
    const position={...zone.entry};
    if(!canWalkTo(position.x,position.z))return;
    pose.current=position;setVisiblePose(position);setActiveZone(id);
    onZoneChange?.(id);
  };
  // External selections move the camera; walking across a room boundary must NOT teleport it.
  useEffect(()=>{if(initialZone && initialZone!==activeZone)navigateTo(initialZone);},[initialZone]);

  useEffect(()=>{
    const el=canvas.current;
    if(!el)return;
    const context=el.getContext("2d",{alpha:false});
    if(!context)return;
    let id=0,last=0,lastUpdate=0;
    const frame=(now:number)=>{
      const dt=Math.min(.04,(now-last)/1000||0);
      last=now;
      const canvasRect=el.getBoundingClientRect();
      const pixelRatio=Math.min(1.5,window.devicePixelRatio||1);
      const W=Math.max(2,Math.floor(canvasRect.width*pixelRatio));
      const H=Math.max(2,Math.floor(canvasRect.height*pixelRatio));
      if(el.width!==W||el.height!==H){el.width=W;el.height=H;}
      const p=pose.current,k=keyState.current,b=controls.current;
      const forwards=(k.has("w")||k.has("arrowup")||b.has("forward")?1:0)-(k.has("s")||k.has("arrowdown")||b.has("back")?1:0);
      const strafe=(k.has("d")||b.has("right")?1:0)-(k.has("a")||b.has("left")?1:0);
      const turn=(k.has("arrowright")||k.has("e")||b.has("turnRight")?1:0)-(k.has("arrowleft")||k.has("q")||b.has("turnLeft")?1:0);
      if(turn)p.angle=normalize(p.angle+turn*dt*1.65);
      if(forwards||strafe){
        const step=dt*1.8/Math.max(1,Math.hypot(forwards,strafe));
        const x=p.x+(Math.cos(p.angle)*forwards-Math.sin(p.angle)*strafe)*step;
        const z=p.z+(Math.sin(p.angle)*forwards+Math.cos(p.angle)*strafe)*step;
        if(canWalkTo(x,p.z))p.x=x;
        if(canWalkTo(p.x,z))p.z=z;
      }
      paint(context,W,H,p);
      if(now-lastUpdate>120){
        lastUpdate=now;setVisiblePose({...p});
        const zone=getZone(p.x,p.z);
        if(zone!==activeZone){setActiveZone(zone);onZoneChange?.(zone);}
      }
      id=window.requestAnimationFrame(frame);
    };
    id=window.requestAnimationFrame(frame);
    return()=>window.cancelAnimationFrame(id);
  },[activeZone]);

  useEffect(()=>{
    const onKey=(event:KeyboardEvent,down:boolean)=>{
      const key=event.key.toLowerCase();
      if(!["w","a","s","d","q","e","arrowleft","arrowright","arrowup","arrowdown"].includes(key))return;
      if(!hasFocus)return;
      event.preventDefault();
      if(down)keyState.current.add(key);else keyState.current.delete(key);
    };
    const down=(e:KeyboardEvent)=>onKey(e,true),up=(e:KeyboardEvent)=>onKey(e,false);
    window.addEventListener("keydown",down);window.addEventListener("keyup",up);
    return()=>{window.removeEventListener("keydown",down);window.removeEventListener("keyup",up);keyState.current.clear();};
  },[hasFocus]);

  const controlHandlers=(name:Direction)=>({
    onPointerDown:(e:React.PointerEvent<HTMLButtonElement>)=>{e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);controls.current.add(name);},
    onPointerUp:()=>controls.current.delete(name),
    onPointerCancel:()=>controls.current.delete(name),
    onLostPointerCapture:()=>controls.current.delete(name),
  });
  const labels=rooms.find(r=>r.id===activeZone);
  return(
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="rv-kicker mb-1">{en?"INTERACTIVE FIRST-PERSON WALKTHROUGH":"ИНТЕРАКТИВНА РАЗХОДКА В ПЪРВО ЛИЦЕ"}</p>
          <p className="text-sm font-medium text-[#39483B]">{en?"Current room":"Текущо помещение"}: {en?labels?.nameEn:labels?.nameBg}</p>
        </div>
        <button type="button" className="inline-flex min-h-10 items-center gap-2 rounded-[5px] border border-[#C8CFC5] px-3 text-xs font-medium" onClick={()=>navigateTo("hall")}><RotateCcw className="h-4 w-4"/>{en?"Back to entrance":"Обратно към входа"}</button>
      </div>
      <div className={"grid gap-5 "+(expanded?"":"lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,.85fr)]")}>
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-[#CFCDC5] shadow-sm"
            onPointerDown={(e)=>{if(e.target===canvas.current){touch.current={x:e.clientX,y:e.clientY};setHasFocus(true);canvas.current?.focus();}}}
            onPointerMove={(e)=>{if(!touch.current)return;const delta=e.clientX-touch.current.x;pose.current.angle=normalize(pose.current.angle+delta*.006);touch.current={x:e.clientX,y:e.clientY};}}
            onPointerUp={()=>{touch.current=null;}} onPointerCancel={()=>{touch.current=null;}}>
            <canvas ref={canvas} tabIndex={0} onFocus={()=>setHasFocus(true)} onBlur={()=>{setHasFocus(false);keyState.current.clear();}}
              aria-label={en?"Navigable schematic 3D apartment. Use WASD to move; Q/E or arrow keys to look. Doors are open passages.":"Схематичен 3D апартамент. С WASD се движите, с Q/E или стрелките се завъртате. Вратите са проходими."}
              className="block h-full w-full touch-pan-y cursor-crosshair outline-offset-[-3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6C8767]"/>
            <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-[5px] bg-[#F7F6F0]/90 px-3 py-2 text-[11px] font-medium text-[#2C3B2F] backdrop-blur-sm"><DoorOpen className="h-4 w-4"/> {en?"Walk through open doorways":"Преминавай през отворените врати"}</div>
            <div className="absolute bottom-3 left-3 flex select-none gap-2">
              <button type="button" {...controlHandlers("turnLeft")} aria-label={en?"Rotate left":"Завърти наляво"} className="rv-walk-control"><RotateCcw className="h-5 w-5"/></button>
              <button type="button" {...controlHandlers("forward")} aria-label={en?"Walk forward":"Напред"} className="rv-walk-control"><ArrowUp className="h-5 w-5"/></button>
              <button type="button" {...controlHandlers("back")} aria-label={en?"Walk backward":"Назад"} className="rv-walk-control"><ArrowDown className="h-5 w-5"/></button>
              <button type="button" {...controlHandlers("turnRight")} aria-label={en?"Rotate right":"Завърти надясно"} className="rv-walk-control"><RotateCcw className="h-5 w-5 -scale-x-100"/></button>
            </div>
            <button type="button" onClick={()=>setExpanded(v=>!v)} className="absolute bottom-3 right-3 rounded-[5px] border border-white/60 bg-[#233428]/80 px-3 py-2 text-xs font-medium text-white">{expanded?(en?"Show plan":"Покажи плана"):(en?"Wide view":"Широк изглед")}</button>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-[#647063]">
            <span className="inline-flex items-center gap-1.5"><Compass className="h-4 w-4"/>{en?"WASD: move · Arrows/Q/E: turn · drag: look":"WASD: движение · стрелки/Q/E: завъртане · плъзгане: поглед"}</span>
            <span>{en?"2.65 m conceptual ceiling":"Примерен таван 2.65 м"}</span>
          </div>
        </div>
        {!expanded&&<div className="min-w-0">
          <ApartmentPlan language={language} camera={visiblePose} activeRoom={activeZone} compact
            onRoomSelect={navigateTo}/>
          <p className="mt-3 text-xs leading-[1.6] text-[#667267]">{en
            ?"Click a room on the plan to move there; use the green arrow to track your view. Walk to door gaps with the controls."
            :"Натисни помещение върху плана, за да се преместиш там. Зелената стрелка показва къде гледаш. До другите стаи се преминава през реалните отвори."}</p>
        </div>}
      </div>
      <p className="border-l-2 border-[#7A9076] pl-4 text-xs leading-[1.8] text-[#687469]">{en
        ?"This is a navigable, simplified 3D massing model constructed from the same conceptual floor plan. It is not a photorealistic digital twin, architectural survey or Matterport scan; room images are a separate illustration gallery."
        :"Това е истински навигируем, опростен 3D геометричен модел, изграден от същия примерен план. Не е фотореалистичен дигитален двойник, архитектурно заснемане или Matterport скан. Интериорните визуализации са отделна галерия."}</p>
    </div>
  );
}
