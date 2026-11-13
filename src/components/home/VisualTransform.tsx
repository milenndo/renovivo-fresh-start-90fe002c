import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import beforeImage from "@/assets/images/projects/living-room-before.jpg";
import afterImage from "@/assets/images/projects/living-room-after.jpg";

/** Interactive visual comparison; existing reference imagery is not independently authenticated as a client project. */
const VisualTransform = () => {
  const [position,setPosition]=useState(52);
  const {language}=useLanguage();
  const en=language==="en";
  return (
    <section className="bg-[#F0EEE9] py-16 md:py-24">
      <div className="container-custom">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(270px,0.8fr)] lg:gap-14">
          <div className="relative aspect-[1.1/1] overflow-hidden rounded-[9px] bg-[#D9D6CE] sm:aspect-[16/9]">
            <img src={afterImage} width={1920} height={810} loading="lazy" decoding="async" alt={en?"Finished interior visualization":"Завършен интериор — визуален пример"} className="absolute inset-0 h-full w-full object-cover"/>
            <div className="absolute inset-0 overflow-hidden" style={{clipPath:"inset(0 "+(100-position)+"% 0 0)"}} aria-hidden="true">
              <img src={beforeImage} width={1920} height={810} loading="lazy" decoding="async" alt="" className="absolute inset-0 h-full w-full object-cover"/>
            </div>
            <div className="pointer-events-none absolute inset-y-0 z-10 w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,.3)]" style={{left:position+"%"}} aria-hidden="true">
              <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-[#52614F] text-white shadow-lg">
                <ArrowLeftRight className="h-5 w-5"/>
              </span>
            </div>
            <span className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-md bg-[#FAF9F6]/95 px-3 py-2 text-xs font-semibold text-[#303D33]">{en?"Before":"Преди"}</span>
            <span className="pointer-events-none absolute bottom-4 right-4 z-10 rounded-md bg-[#FAF9F6]/95 px-3 py-2 text-xs font-semibold text-[#303D33]">{en?"After":"След"}</span>
            <label htmlFor="renovivo-before-after" className="sr-only">{en?"Move slider to compare before and after":"Премести плъзгача за сравнение преди и след"}</label>
            <input id="renovivo-before-after" type="range" min="5" max="95" step="1" value={position} onChange={(event)=>setPosition(Number(event.target.value))} className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0" style={{touchAction:"pan-y"}} aria-valuetext={en?position+"% before":position+"% преди"}/>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#475448]">{en?"SPACE / TRANSFORMATION":"ПРОСТРАНСТВО / ТРАНСФОРМАЦИЯ"}</p>
            <h2 className="renovivo-editorial max-w-[520px] text-[clamp(2rem,3.6vw,3.65rem)] leading-[1.16] text-[#212823]">
              {en?<>From an idea to <span className="italic text-[#586854]">a completed space.</span></>:<>От идея до <span className="italic text-[#586854]">завършен дом.</span></>}
            </h2>
            <p className="mt-6 max-w-[400px] text-sm leading-[1.8] text-[#5B615B]">{en?"Slide the handle to compare the visual stages of an interior. Real project photographs will be added as they are verified.":"Плъзнете разделителя и сравнете етапите на един интериор. След потвърждение тук ще показваме фотографии от реални обекти."}</p>
            <p className="mt-4 text-xs italic text-[#7B8077]">{en?"Illustrative visual example, not a verified Renovivo case study.":"Илюстративен визуален пример, не удостоверен реализиран обект на Renovivo."}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default VisualTransform;
