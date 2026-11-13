import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronLeft,
  ChevronRight, ClipboardList, FileText, Handshake, HardHat, Home, MapPin,
  Phone, Play, Search, ShieldCheck, UserRound
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
const heroImage = "/images/home/project-living.jpg";
const apartmentImage = "/images/home/service-apartment.jpg";
const finishingImage = "/images/home/service-finish.jpg";
const houseImage = "/images/home/service-house.jpg";
const bathroomImage = "/images/home/service-bath.jpg";
const projectLiving = "/images/home/project-living.jpg";
const projectKitchen = "/images/home/project-kitchen.jpg";
const projectBathroom = "/images/home/project-bath.jpg";
const projectBedroom = "/images/home/project-bedroom.jpg";
const craftDetail = "/images/home/craft.webp";
const workPhoto = "/images/home/team.jpg";
const budgetPhoto = "/images/home/budget.jpg";

const services = [
  { bg: "Цялостен ремонт на апартамент", en: "Complete apartment renovation", image: apartmentImage, path: "/services/apartment-renovation", number: "01", icon: Home },
  { bg: "Довършителни работи", en: "Interior finishing works", image: finishingImage, path: "/services/finishing-works", number: "02", icon: HardHat },
  { bg: "Ремонт на къща", en: "House renovation", image: houseImage, path: "/services/house-renovation", number: "03", icon: Home },
  { bg: "Бани и специализирани решения", en: "Bathrooms and specialist finishes", image: bathroomImage, path: "/services/bathroom", number: "04", icon: ShieldCheck },
] as const;
const projects = [
  { image: projectLiving, bg: "Проект 01 · дневна", en: "Concept 01 · living room" },
  { image: projectBathroom, bg: "Проект 01 · баня", en: "Concept 01 · bathroom" },
  { image: projectBedroom, bg: "Проект 01 · спалня", en: "Concept 01 · bedroom" },
  { image: projectKitchen, bg: "Проект 01 · кухня", en: "Concept 01 · kitchen" },
] as const;

/**
 * Reconstructed landing page based on the two OWNER-APPROVED 2026-11-13 mockups,
 * rather than the previous unrelated homepage composition.
 * The original layered mockup/photos are not in the repository: the photography
 * here uses available local assets until exact licensed source photographs arrive.
 */
export default function EditorialHome() {
  const { language } = useLanguage();
  const { openModal } = useInspectionRequest();
  const en = language === "en";
  const serviceRail = useRef<HTMLDivElement>(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const heroPhotos = [heroImage, projectKitchen, houseImage];

  const assurances = [
    { Icon: UserRound, bg: "Един отговорен ръководител", en: "One accountable lead" },
    { Icon: FileText, bg: "Подробна оферта", en: "Detailed quotation" },
    { Icon: Handshake, bg: "Договорени условия и срокове", en: "Agreed terms & deadlines" },
    { Icon: ShieldCheck, bg: "Гаранция за изпълнените работи", en: "Workmanship warranty" },
    { Icon: MapPin, bg: "София и Софийска област", en: "Sofia & Sofia region" },
  ];
  const process = [
    { Icon: Search, bg: <>Оглед<br />и консултация</>, en: <>Site visit<br />& consultation</> },
    { Icon: ClipboardList, bg: <>Оферта<br />и договор</>, en: <>Quote<br />& contract</> },
    { Icon: HardHat, bg: <>Изпълнение<br />и контрол</>, en: <>Execution<br />& supervision</> },
    { Icon: Check, bg: <>Предаване<br />и гаранция</>, en: <>Handover<br />& warranty</> },
  ];

  return (
    <div className="rv-approved-home">
      <section className="rv-approved-hero relative isolate overflow-hidden" aria-labelledby="home-hero-title">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <img key={heroIndex} src={heroPhotos[heroIndex]} alt="" width="1600" height="1000" decoding="async" className="h-full w-full animate-fade-in object-cover object-[65%_center] md:object-[58%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,249,246,0.99)_0%,rgba(250,249,246,0.97)_26%,rgba(250,249,246,0.67)_44%,rgba(250,249,246,0.05)_72%)] max-md:bg-[linear-gradient(90deg,rgba(250,249,246,0.98)_0%,rgba(250,249,246,0.9)_38%,rgba(250,249,246,0.27)_100%)]" />
        </div>
        <div className="container-custom relative z-10 flex h-full min-h-[500px] flex-col justify-center py-14 md:min-h-[450px] md:py-12 lg:min-h-[540px]">
          <div className="max-w-[590px]">
            <p className="rv-kicker mb-5 md:mb-4">{en ? "COMPLETE RENOVATIONS IN SOFIA" : "ЦЯЛОСТНИ РЕМОНТИ В СОФИЯ"}</p>
            <h1 id="home-hero-title" className="rv-heading-serif max-w-[580px] text-[clamp(2.05rem,5.7vw,4.2rem)] leading-[1.06] text-[#202620] md:text-[clamp(2.55rem,4.1vw,4.35rem)]">
              {en ? (
                <>Spaces finished with attention <em>to every detail.</em></>
              ) : (
                <>Пространства, завършени с внимание <em>към всеки детайл.</em></>
              )}
            </h1>
            <p className="mt-5 max-w-[365px] text-[13px] leading-[1.6] text-[#323931] md:mt-6 md:max-w-[410px] md:text-[15px]">
              {en ? "From A to Z — a clear plan, controlled quality and precise execution." : "Ремонт от А до Я — с ясен план, контрол на качеството и прецизно изпълнение."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-7">
              <button onClick={openModal} type="button" className="rv-button-primary group">
                {en ? "Book a free visit" : "Заяви безплатен оглед"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Link to="/portfolio" className="rv-button-outline">
                {en ? "View projects" : "Разгледай проектите"}
              </Link>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-2 md:bottom-6 md:right-8">
            <button type="button" onClick={() => setHeroIndex((index) => (index + 1) % heroPhotos.length)} className="grid h-9 w-9 place-items-center rounded-full border border-[#BEC3B7] bg-[#FAF9F6]/90 text-[#313F33] transition-transform hover:translate-x-0.5" aria-label={en ? "Next background image" : "Следваща снимка"}>
              <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#services" className="grid h-9 w-9 place-items-center rounded-full border border-[#BEC3B7] bg-[#FAF9F6]/90 text-[#313F33]" aria-label={en ? "Scroll to services" : "Към услугите"}><ArrowDown className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section aria-label={en ? "Our commitments" : "Нашите ангажименти"} className="border-y border-[#E6E3DA] bg-[#FAF9F6]">
        <div className="container-custom grid grid-cols-4 py-3 lg:grid-cols-5 lg:py-4">
          {assurances.map(({ Icon, bg, en: translation }, index) => (
            <div key={bg} className={"flex min-h-[65px] flex-col items-center justify-center gap-2 border-[#DEDCD2] px-1 text-center lg:min-h-[48px] lg:flex-row lg:gap-3 lg:px-5 lg:text-left " + (index ? "border-l" : "") + (index === 4 ? " max-lg:hidden" : "")}>
              <Icon className="h-6 w-6 shrink-0 text-[#556250] lg:h-5 lg:w-5" strokeWidth={1.45} aria-hidden="true" />
              <span className="max-w-[136px] text-[9px] font-medium leading-[1.3] text-[#252D26] sm:text-[11px] lg:text-[12px]">{en ? translation : bg}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="bg-[#FAF9F6] py-10 md:py-12 lg:py-16">
        <div className="container-custom lg:grid lg:grid-cols-[minmax(225px,0.83fr)_minmax(0,2.2fr)] lg:items-stretch lg:gap-10">
          <div className="mb-5 flex flex-col items-start lg:mb-0">
            <p className="rv-kicker mb-3">{en ? "OUR SERVICES" : "КАКВО ИЗПЪЛНЯВАМЕ"}</p>
            <h2 className="rv-heading-serif max-w-[400px] text-[clamp(1.75rem,3.4vw,3.2rem)] leading-[1.12] text-[#232A24]">
              {en ? <>One partner <em>for the whole renovation.</em></> : <>Един партньор <em>за целия ремонт.</em></>}
            </h2>
            <p className="mt-4 max-w-[300px] text-[12px] leading-[1.65] text-[#4A5149] md:text-[14px]">
              {en ? "One coordinated process and one responsible team — from the first plan to the finished result." : "Организираме и изпълняваме ремонтните дейности като един последователен процес — с ясна отговорност и внимание към крайния резултат."}
            </p>
            <Link to="/services" className="rv-text-link mt-5">{en ? "All services" : "Виж всички услуги"} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="relative min-w-0">
            <div ref={serviceRail} className="rv-services-track" aria-label={en ? "Service photo gallery" : "Галерия с услуги"} tabIndex={0}>
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link to={service.path} key={service.number} className="rv-service-card group">
                    <img src={service.image} alt="" width="580" height="760" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#121913]/80 via-transparent to-transparent" />
                    <Icon className="absolute bottom-[55px] left-3 z-10 h-5 w-5 text-white/90 md:bottom-[80px] md:left-5 md:h-6 md:w-6" strokeWidth={1.25} />
                    <div className="absolute bottom-0 left-0 z-10 w-full p-3 text-white md:p-5">
                      <span className="mb-1 hidden text-[10px] uppercase tracking-widest text-white/75 md:block">{service.number} / RENOVIVO</span>
                      <h3 className="max-w-[260px] text-[11px] font-medium leading-[1.28] sm:text-[13px] md:text-[15px]">{en ? service.en : service.bg}</h3>
                    </div>
                    <ArrowUpRight className="absolute bottom-3 right-2 z-10 h-3.5 w-3.5 text-white md:bottom-5 md:right-4 md:h-5 md:w-5" />
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 hidden justify-end gap-2 lg:flex">
              <button type="button" onClick={() => serviceRail.current?.scrollBy({ left: -320, behavior: "smooth" })} className="rv-round-button" aria-label={en ? "Previous services" : "Предишни услуги"}><ChevronLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => serviceRail.current?.scrollBy({ left: 320, behavior: "smooth" })} className="rv-round-button" aria-label={en ? "More services" : "Още услуги"}><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="border-y border-[#E7E4DC] bg-[#F6F4F0] py-10 md:py-14">
        <div className="container-custom grid gap-7 lg:grid-cols-[minmax(240px,0.83fr)_minmax(0,2.2fr)] lg:items-center lg:gap-10">
          <div>
            <p className="rv-kicker mb-3">{en ? "OUR APARTMENT PROJECTS" : "ЦЯЛОСТНИ РЕМОНТИ / ПРОЕКТИ"}</p>
            <h2 className="rv-heading-serif text-[clamp(1.75rem,3.3vw,3.2rem)] leading-[1.12] text-[#232A24]">
              {en ? <>One home. <em>The complete story.</em></> : <>Един апартамент. <em>Цялата история.</em></>}
            </h2>
            <p className="mt-4 max-w-[320px] text-[12px] leading-[1.7] text-[#4A5149] md:text-[14px]">
              {en
                ? "Instead of unrelated kitchens and bathrooms, explore a coherent apartment renovation concept — every room, floor plan and an interactive walkthrough."
                : "Без отделни кухни и бани, представени като цели проекти. Разгледайте концепцията за един апартамент — всяко помещение, архитектурен план и виртуална разходка."}
            </p>
            <Link to="/portfolio/apartment-01" className="rv-text-link mt-5">{en?"Explore Project 01":"Разгледай Проект 01"} <ArrowRight className="h-4 w-4"/></Link>
          </div>
          <Link to="/portfolio/apartment-01" className="group relative block min-h-[270px] overflow-hidden rounded-[7px] bg-[#D5D6CB] md:min-h-[350px]">
            <img src="/images/project-01/overview.jpg" alt={en?"Apartment renovation interior concept":"Концепция за цялостен ремонт на апартамент"} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#17241B]/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 text-white md:p-7">
              <div><p className="mb-2 text-[10px] font-semibold tracking-[.17em] text-white/80">{en?"PROJECT 01 / CONCEPT":"ПРОЕКТ 01 / КОНЦЕПЦИЯ"}</p>
                <h3 className="rv-heading-serif text-[clamp(1.35rem,2.5vw,2.5rem)] leading-[1.16]">{en?"Light-filled city apartment":"Светъл градски апартамент"}</h3>
                <p className="mt-2 text-[11px] text-white/80">{en?"Room gallery · Floor plan · Walkthrough":"Галерия · Архитектурен план · Виртуална разходка"}</p></div>
              <ArrowUpRight className="h-6 w-6 shrink-0" />
            </div>
          </Link>
        </div>
      </section>

      <section id="process" className="bg-[#FAF9F6] py-11 md:py-14">
        <div className="container-custom grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <p className="rv-kicker mb-3">{en ? "OUR PROCESS" : "НАШИЯТ ПРОЦЕС"}</p>
            <h2 className="rv-heading-serif text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.11] text-[#242A24]">
              {en ? <>A clear path <em>to the finished home.</em></> : <>Ясен път <em>към готовия дом.</em></>}
            </h2>
            <div className="relative mt-8 grid grid-cols-4 gap-1 sm:mt-10 sm:gap-3">
              <span className="absolute left-[12%] right-[12%] top-[13px] h-px bg-[#E0DCD1]" aria-hidden="true" />
              {process.map(({ Icon, bg, en: translation }, index) => (
                <div key={index} className="relative z-10 text-center">
                  <span className="mx-auto grid h-[27px] w-[27px] place-items-center rounded-full bg-[#E9E3D7] text-[10px] text-[#414A3F]">0{index + 1}</span>
                  <Icon className="mx-auto mb-2 mt-3 h-6 w-6 text-[#323E32]" strokeWidth={1.45} aria-hidden="true" />
                  <p className="text-[10px] font-semibold leading-[1.35] text-[#343C34] md:text-xs">{en ? translation : bg}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative isolate min-h-[260px] overflow-hidden rounded-[5px] bg-[#EAE6DE] md:min-h-[300px]">
            <img src={budgetPhoto} alt="" width="850" height="560" loading="lazy" decoding="async" className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]" />
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#F6F4EF]/95 via-[#F6F4EF]/80 to-[#F6F4EF]/15" />
            <div className="flex h-full max-w-[430px] flex-col justify-center px-5 py-7 sm:px-8">
              <p className="rv-kicker mb-3">{en ? "PLAN YOUR BUDGET" : "ПЛАНИРАНЕ НА БЮДЖЕТА"}</p>
              <h3 className="rv-heading-serif text-[clamp(1.7rem,2.6vw,2.7rem)] leading-[1.12] text-[#232B23]">
                {en ? <>Begin with an estimate. <em>Continue with a precise quote.</em></> : <>Започнете с ориентир. <em>Продължете с точна оферта.</em></>}
              </h3>
              <p className="mt-3 max-w-[320px] text-[12px] leading-[1.65] text-[#495047]">{en ? "Choose a project type and area to receive an indicative budget." : "Посочете типа проект и площта, за да получите ориентировъчна цена."}</p>
              <a href="#estimator" className="rv-button-primary mt-4 self-start"><CalendarDays className="h-4 w-4" /> {en ? "Calculate a budget" : "Изчисли ориентировъчна цена"} <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="approach" className="bg-[#F6F4F0] py-10 md:py-14">
        <div className="container-custom grid items-center gap-5 lg:grid-cols-[0.78fr_0.82fr_1.2fr] lg:gap-8">
          <div className="relative h-[230px] overflow-hidden rounded-[5px] md:h-[300px]">
            <img src={craftDetail} alt={en ? "Close-up of a finishing detail" : "Детайл от интериорно покритие"} width="520" height="550" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
          <div className="py-2">
            <p className="rv-kicker mb-3">{en ? "DETAILS MATTER" : "ДЕТАЙЛЪТ ИМА ЗНАЧЕНИЕ"}</p>
            <h2 className="rv-heading-serif text-[clamp(1.8rem,2.85vw,2.9rem)] leading-[1.1] text-[#232A24]">
              {en ? <>Beautiful interiors begin with <em>work you never see.</em></> : <>Красивият интериор започва с работа, която не се вижда.</>}
            </h2>
            <p className="mt-4 text-[12px] leading-[1.65] text-[#4B534A] md:text-[13px]">{en ? "Precise preparation, correct levels and attention to every joint make the quality last." : "Правилната подготовка, точните равнини и вниманието към детайла определят качеството дълго след финалната снимка."}</p>
            <Link to="/about" className="rv-text-link mt-5">{en ? "Learn more about our approach" : "Научи повече за подхода ни"} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <Link to="/about" className="group relative block h-[230px] overflow-hidden rounded-[5px] md:h-[300px]" aria-label={en ? "Learn about Renovivo's process" : "Как работим — зад кулисите"}>
            <img src={workPhoto} alt={en ? "Renovation team" : "Работа по ремонтен обект"} width="690" height="520" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-black/30 text-white"><Play className="h-5 w-5 fill-white" /></span>
            <span className="absolute bottom-4 left-4 text-[13px] font-semibold text-white">{en ? "See how we work" : "Как работим — зад кулисите"}</span>
          </Link>
        </div>
      </section>

      <section className="overflow-hidden bg-[#FAF9F6]">
        <div className="container-custom grid lg:grid-cols-[0.75fr_1.25fr]">
          <div className="flex flex-col justify-center border-b border-[#E9E5DA] py-8 lg:border-b-0 lg:py-12 lg:pr-8">
            <p className="rv-kicker mb-3">{en ? "OUR COMMITMENT" : "НАШИЯТ АНГАЖИМЕНТ"}</p>
            <p className="rv-heading-serif max-w-[430px] text-[clamp(1.35rem,2.2vw,2.2rem)] italic leading-[1.25] text-[#303D33]">{en ? "Clear communication, an agreed plan and attention to every detail." : "„Коректна комуникация, ясен план и внимание към всеки детайл.“"}</p>
            <span className="mt-4 text-xs text-[#667064]">{en ? "The standard we work towards" : "Стандартът, към който се стремим"}</span>
          </div>
          <div className="relative isolate flex min-h-[270px] flex-col justify-center overflow-hidden bg-[#50634F] px-6 py-8 text-white md:px-12">
            <img src={heroImage} alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20" />
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#526551]/90 to-[#526551]/70" />
            <p className="rv-kicker !text-[#F0F1EB]">{en ? "YOUR NEXT PROJECT" : "ВАШИЯТ СЛЕДВАЩ ПРОЕКТ"}</p>
            <h2 className="rv-heading-serif mt-2 text-[clamp(1.9rem,3vw,3.5rem)] leading-[1.15]">{en ? "Let's discuss your idea." : "Нека обсъдим идеята ви."}</h2>
            <p className="mt-3 max-w-[510px] text-[13px] leading-[1.6] text-white/90">{en ? "We arrange a visit, discuss the possibilities and prepare a concrete quotation." : "Организираме оглед, обсъждаме възможностите и подготвяме конкретна оферта."}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button type="button" onClick={openModal} className="inline-flex min-h-[42px] items-center gap-3 rounded-[5px] bg-[#FAF9F6] px-5 text-xs font-semibold text-[#303D33] hover:bg-white">{en ? "Book a free visit" : "Заяви безплатен оглед"} <ArrowRight className="h-4 w-4" /></button>
              <a href="tel:+359893712919" className="inline-flex items-center gap-2 text-xs font-medium text-white"><Phone className="h-4 w-4" /> +359 89 371 29 19</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
