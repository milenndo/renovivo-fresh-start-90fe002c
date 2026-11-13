import { footprint, rooms, wallSegments, type WalkZoneId } from "@/data/portfolioArchitecture";

type Props = {
  activeRoom?: WalkZoneId;
  onRoomSelect?: (room:WalkZoneId)=>void;
  language?: string;
  camera?: {x:number; z:number; angle:number};
  compact?: boolean;
};
const S=88, X=128, Z=102;
const px=(x:number)=>X+x*S;
const pz=(z:number)=>Z+z*S;
const planLabels=[
  {id:"living",x:2.05,z:2.15,a:"ДНЕВНА",b:"Living",area:"21 м²"},
  {id:"kitchen",x:2.05,z:6.0,a:"КУХНЯ + ТРАПЕЗАРИЯ",b:"Kitchen + dining",area:"9 м²"},
  {id:"bedroom",x:7.7,z:1.94,a:"СПАЛНЯ",b:"Bedroom",area:"18 м²"},
  {id:"bathroom",x:6.97,z:5.57,a:"БАНЯ",b:"Bathroom",area:"8.5 м²"},
  {id:"hall",x:4.85,z:4.8,a:"АНТРЕ",b:"Hall",area:"11 м²"},
  {id:"utility",x:9.08,z:5.65,a:"СКЛАД",b:"Utility",area:"4.5 м²"},
] as const;

/** A selectable architectural SCHEME, not a measured legal drawing. */
export default function ApartmentPlan({activeRoom,onRoomSelect,language="bg",camera,compact=false}:Props){
  const en=language==="en";
  return (
    <div className={"rounded-[8px] border border-[#DDDCD3] bg-[#FDFCF9] "+(compact?"p-1":"p-3 md:p-5")}>
      <svg role="img" aria-label={en?"Illustrative apartment floor plan with clickable rooms and real door openings":"Примерен архитектурен план с избираеми помещения и реални отвори за врати"}
        viewBox="0 0 1130 880" className="block h-auto w-full" preserveAspectRatio="xMidYMid meet">
        <rect width="1130" height="880" fill="#FDFCF9"/>
        <text x="128" y="43" fill="#3A493B" fontSize="18" fontWeight="700" letterSpacing="2.7">{en?"PROJECT 01 · FLOOR PLAN":"ПРОЕКТ 01 · АРХИТЕКТУРНА СХЕМА"}</text>
        <text x="128" y="69" fill="#7A8177" fontSize="15">{en?"Conceptual dimensions. Not a surveyed architectural drawing.":"Примерни размери · не е заснемане на реален имот"}</text>

        {rooms.map(room=><rect key={room.id} x={px(room.bounds.x)+7} y={pz(room.bounds.z)+7}
          width={room.bounds.w*S-14} height={room.bounds.h*S-14}
          rx="2" fill={room.id===activeRoom?"#CBD8C9":room.id==="living"||room.id==="kitchen"?"#EEE9DC":room.id==="bedroom"?"#E4E9E1":room.id==="bathroom"?"#E0E6E3":"#F0EFE9"} />)}

        {/* Fixed furnishing footprint: schematic only, not a furnishing specification. */}
        <g fill="none" stroke="#8A8E82" strokeWidth="3" opacity=".72">
          <rect x={px(.45)} y={pz(.88)} width={2.65*S} height={1.03*S} rx="9" fill="#DAD8CE"/>
          <path d={["M",px(.45),pz(1.52),"H",px(3.1)].join(" ")} />
          <rect x={px(1.2)} y={pz(2.45)} width={1.12*S} height={.54*S} rx="22" fill="#E8E5DC"/>
          <rect x={px(3.58)} y={pz(2.3)} width={.16*S} height={2.0*S} fill="#B5AE9D"/>
          <rect x={px(.28)} y={pz(5.35)} width={.58*S} height={1.57*S} rx="4" fill="#C5C0B4"/>
          <rect x={px(.85)} y={pz(6.45)} width={2.75*S} height={.48*S} rx="4" fill="#C5C0B4"/>
          <circle cx={px(1.24)} cy={pz(5.85)} r="14" fill="#EDECE5" stroke="#979990"/>
          <rect x={px(2.3)} y={pz(5.25)} width={1.3*S} height={.8*S} rx="26" strokeDasharray="6 6"/>
          <rect x={px(6.5)} y={pz(1.4)} width={2.4*S} height={1.78*S} rx="5" fill="#E7E4DA"/>
          <line x1={px(6.5)} y1={pz(1.82)} x2={px(8.9)} y2={pz(1.82)}/>
          <rect x={px(9.15)} y={pz(.3)} width={.35*S} height={3.15*S} rx="2" fill="#DBDDD3"/>
          <rect x={px(7.3)} y={pz(4.68)} width={.71*S} height={1.02*S} rx="4" fill="#C8D7D7"/>
          <rect x={px(5.92)} y={pz(6.66)} width={.7*S} height={.4*S} rx="10"/>
          <ellipse cx={px(6.21)} cy={pz(5.4)} rx="17" ry="23"/>
          <rect x={px(8.67)} y={pz(4.75)} width={.78*S} height={2.23*S} rx="2" strokeDasharray="7 6"/>
        </g>

        {/* Wall segments: intentional missing spans are functional 0.90–0.95 m doors. */}
        <g fill="none" strokeLinecap="square">
          {wallSegments.map((w,i)=><line key={i}
            x1={px(w.a[0])} y1={pz(w.a[1])} x2={px(w.b[0])} y2={pz(w.b[1])}
            stroke={w.kind==="window"?"#8DAFBC":w.kind==="entry"?"#9B9485":"#39483C"}
            strokeWidth={w.kind==="window"?10:w.kind==="entry"?9:13}/>)}
        </g>
        {/* Door leaf lines show the exact passages used by the walkthrough. */}
        <g fill="none" stroke="#69816A" strokeWidth="3" strokeDasharray="4 4" opacity=".85">
          <path d={'M '+px(4.1)+' '+pz(3.2)+' L '+px(3.18)+' '+pz(3.2)}/>
          <path d={'M '+px(5.6)+' '+pz(2.35)+' L '+px(6.49)+' '+pz(2.35)}/>
          <path d={'M '+px(5.6)+' '+pz(5.15)+' L '+px(6.49)+' '+pz(5.15)}/>
          <path d={'M '+px(8.35)+' '+pz(5.45)+' L '+px(9.24)+' '+pz(5.45)}/>
        </g>

        {planLabels.map((room)=>{
          const hit=room.id===activeRoom;
          const label=room.id==="hall"?"АНТРЕ":en?room.b:room.a;
          const long=room.id==="kitchen";
          return <g key={room.id} role={onRoomSelect?"button":"group"} tabIndex={onRoomSelect?0:undefined}
            aria-label={(en?"Show ":"Покажи ")+(en?room.b:room.a)}
            onClick={()=>onRoomSelect?.(room.id as WalkZoneId)}
            onKeyDown={(e)=>{if((e.key==="Enter"||e.key===" ")&&onRoomSelect){e.preventDefault();onRoomSelect(room.id as WalkZoneId);}}}
            className={onRoomSelect?"cursor-pointer outline-none focus:opacity-60":""}>
            <rect x={px(room.x)-(long?100:room.id==="hall"?38:90)} y={pz(room.z)-41} width={long?200:room.id==="hall"?76:180} height="85" rx="5" fill={hit?"#E4EDE1":"#FDFCF9"} opacity=".87"/>
            <text textAnchor="middle" x={px(room.x)} y={pz(room.z)-6} fill="#364739" fontSize={room.id==="hall"?12:long?13:16} fontWeight="700" letterSpacing=".65">{label}</text>
            <text textAnchor="middle" x={px(room.x)} y={pz(room.z)+20} fill="#738173" fontSize="15">{room.area}</text>
          </g>;
        })}

        {camera&&<g transform={'translate('+px(camera.x)+' '+pz(camera.z)+') rotate('+(camera.angle*180/Math.PI+90)+')'}>
          <circle r="21" fill="#557452" fillOpacity=".22"/>
          <circle r="9" fill="#3C6244" stroke="#fff" strokeWidth="3"/>
          <path d="M0 -30 L-8 -13 L8 -13 Z" fill="#3C6244" stroke="#fff" strokeWidth="1.5"/>
        </g>}

        {/* Dimension chains, intentionally rounded, in meters. */}
        <g stroke="#81887C" fill="none" strokeWidth="1.5">
          <line x1={px(0)} y1="83" x2={px(9.8)} y2="83"/>
          <line x1={px(0)} y1="78" x2={px(0)} y2="89"/>
          <line x1={px(9.8)} y1="78" x2={px(9.8)} y2="89"/>
          <line x1="101" y1={pz(0)} x2="101" y2={pz(7.4)}/>
          <line x1="95" y1={pz(0)} x2="108" y2={pz(0)}/>
          <line x1="95" y1={pz(7.4)} x2="108" y2={pz(7.4)}/>
        </g>
        <text x={px(4.9)} y="77" textAnchor="middle" fontSize="14" fill="#667365">9.80 м</text>
        <text x="85" y={pz(3.7)} textAnchor="middle" fontSize="14" fill="#667365" transform={'rotate(-90 85 '+pz(3.7)+')'}>7.40 м</text>

        <g>
          <path d={'M '+px(4.87)+' '+(pz(7.4)+41)+' L '+px(4.87)+' '+(pz(7.4)+9)} stroke="#52664F" strokeWidth="3" />
          <path d={'M '+(px(4.87)-7)+' '+(pz(7.4)+18)+' L '+px(4.87)+' '+(pz(7.4)+8)+' L '+(px(4.87)+7)+' '+(pz(7.4)+18)} fill="none" stroke="#52664F" strokeWidth="3" />
          <text x={px(4.87)} y={pz(7.4)+62} textAnchor="middle" fontSize="14" fill="#52664F">{en?"ENTRY":"ВХОД"}</text>
        </g>
        <g transform="translate(1050 150)" fill="none" stroke="#52654E" strokeWidth="2">
          <path d="M0 23 L0 -23 M0 -23 L-8 -7 M0 -23 L8 -7"/>
          <text x="0" y="-34" stroke="none" fill="#52654E" textAnchor="middle" fontSize="16" fontWeight="700">N</text>
        </g>
        <g transform="translate(140 835)">
          <path d="M0 0 H176 M0 -5 V6 M88 -5 V6 M176 -5 V6" stroke="#5A6B57" strokeWidth="3"/>
          <text x="0" y="-11" fill="#607160" fontSize="13">0</text>
          <text x="88" y="-11" fill="#607160" fontSize="13" textAnchor="middle">1 m</text>
          <text x="176" y="-11" fill="#607160" fontSize="13" textAnchor="middle">2 m</text>
        </g>
        <text x="1016" y="836" textAnchor="end" fontSize="13" fill="#7C8479">{en?"SCHEMATIC · NOT FOR CONSTRUCTION":"КОНЦЕПТ · НЕ Е ЗА СТРОИТЕЛСТВО"}</text>
      </svg>
      {!compact&&<p className="mt-2 text-xs leading-[1.65] text-[#707A6F]">{en
        ?"The plan illustrates the agreed visual story. The dimensions are conceptual; detailed site measurements and an architect's verification are required before construction."
        :"Планът показва общата геометрия на концепцията. Размерите са условни; за изпълнение са задължителни реално заснемане и проверка от проектант."}</p>}
    </div>
  );
}
