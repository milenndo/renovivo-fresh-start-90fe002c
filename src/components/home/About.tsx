import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import detailImg from "@/assets/images/services/microcement-modern.jpg";
import videoPoster from "@/assets/images/projects/living-room-detail.jpg";

const About = () => {
  const { language } = useLanguage();
  const en=language==="en";
  return (
    <section id="approach" className="overflow-hidden bg-[#FAF9F6] py-16 md:py-24">
      <div className="container-custom">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,0.95fr)_minmax(0,1.35fr)] lg:items-center lg:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[9px] bg-[#E4E1D7] lg:aspect-[4/5]">
            <img src={detailImg} width={720} height={880} loading="lazy" decoding="async" alt={en?"Natural material and finishing detail":"Текстура и детайл от интериорно покритие"} className="h-full w-full object-cover"/>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#475448]">{en?"CRAFT / OUR APPROACH":"ДЕТАЙЛЪТ ИМА ЗНАЧЕНИЕ"}</p>
            <h2 className="renovivo-editorial max-w-[450px] text-[clamp(2rem,3vw,3.2rem)] leading-[1.15] text-[#212823]">
              {en?<>Beautiful interiors begin with <span className="italic text-[#586854]">unseen work.</span></>:<>Красивият интериор започва с работа, <span className="italic text-[#586854]">която не се вижда.</span></>}
            </h2>
            <p className="mt-6 max-w-[460px] text-[14px] leading-[1.8] text-[#5B615B]">
              {en?"Good foundations, true lines, well-executed transitions and thoughtful materials determine the quality long after the final photograph.":"Правилната подготовка, точните равнини и внимателно изпълнените преходи определят качеството дълго след финалната снимка."}
            </p>
            <Link to="/about" className="mt-7 inline-flex items-center gap-3 border-b border-[#52614F] pb-2 text-[13px] font-semibold text-[#303D33] hover:text-[#74866E]">
              {en?"Our approach":"Научи повече за подхода ни"} <ArrowRight className="h-4 w-4" aria-hidden="true"/>
            </Link>
          </div>
          <div className="overflow-hidden rounded-[9px] bg-[#D6D8D1]">
            <div className="relative aspect-[4/3] min-h-[250px]">
              <video controls playsInline preload="none" poster={videoPoster} width={900} height={680} aria-label={en?"Interior video presentation":"Видео представяне на интериорна атмосфера"} className="absolute inset-0 h-full w-full object-cover">
                <source src="/videos/hero-background.webm" type="video/webm"/>
                <source src="/videos/hero-background.mp4" type="video/mp4"/>
                {en?"Your browser does not support video playback.":"Браузърът не поддържа възпроизвеждане на видео."}
              </video>
            </div>
            <div className="flex items-center justify-between gap-3 bg-[#EDEFE7] px-5 py-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#697669]">{en?"VIDEO / ATMOSPHERE":"ВИДЕО / АТМОСФЕРА"}</p>
                <p className="mt-1 text-sm font-medium text-[#303D33]">{en?"Interior inspiration":"Интериорни решения отблизо"}</p>
              </div>
              <span className="text-xs text-[#657362]">{en?"Play on demand":"Пусни при желание"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
