import { useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Phone, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { openModal } = useInspectionRequest();
  const en = language === "en";
  const links = [
    { bg: "Начало", en: "Home", path: "/" },
    { bg: "Услуги", en: "Services", path: "/services" },
    { bg: "Проекти", en: "Projects", path: "/portfolio" },
    { bg: "Процес", en: "Process", path: "/#process" },
    { bg: "За нас", en: "About", path: "/about" },
    { bg: "Контакти", en: "Contact", path: "/contact" },
  ];
  const onNav = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    setMenuOpen(false);
    if (!path.startsWith("/#")) return;
    event.preventDefault();
    const id = path.substring(2);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/");
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 180);
    }
    window.history.replaceState(null, "", path);
  };
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E6DF] bg-[#FAF9F6]/95 backdrop-blur-xl">
      <div className="container-custom flex h-[65px] items-center gap-2 lg:h-[64px] lg:gap-5">
        <Link to="/" onClick={() => setMenuOpen(false)} className="mr-auto inline-flex shrink-0 items-center lg:mr-0" aria-label="RENOVIVO — начало">
          <Wordmark className="text-[31px] lg:text-[33px]" showTagline />
        </Link>
        <nav className="ml-auto hidden items-center gap-[clamp(12px,1.7vw,28px)] lg:flex" aria-label={en ? "Main navigation" : "Главна навигация"}>
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} onClick={(event) => onNav(event, link.path)} className={"group relative whitespace-nowrap py-4 text-[11px] font-medium transition-colors hover:text-[#53634F] xl:text-[12px] " + (active ? "text-[#53634F]" : "text-[#313831]")}>
                {en ? link.en : link.bg}{link.path === "/services" && <ChevronDown className="ml-1 inline-block h-[11px] w-[11px] align-[-1px]" />}
                <span className={"absolute inset-x-0 bottom-[11px] h-px bg-[#50634F] transition-transform duration-200 " + (active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
              </Link>
            );
          })}
        </nav>
        <a href="tel:+359893712919" className="ml-2 hidden shrink-0 items-center gap-2 whitespace-nowrap text-[10px] font-semibold text-[#273128] lg:inline-flex xl:text-[11px]" aria-label={en ? "Call Renovivo" : "Обадете се на Renovivo"}>
          <Phone className="h-4 w-4" strokeWidth={1.65} /> +359 89 371 29 19
        </a>
        <button type="button" onClick={openModal} className="hidden min-h-[37px] shrink-0 items-center gap-2 rounded-[5px] bg-[#50614E] px-4 text-[11px] font-semibold text-white transition-colors hover:bg-[#303F33] lg:inline-flex">
          {en ? "Book a visit" : "Заяви оглед"} <ArrowRight className="h-4 w-4" />
        </button>
        <a href="tel:+359893712919" className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[7px] border border-[#D6D7D0] text-[#303D33] lg:hidden" aria-label={en ? "Call Renovivo" : "Обади се на Renovivo"}>
          <Phone className="h-[20px] w-[20px]" strokeWidth={1.7} />
        </a>
        <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="renovivo-navigation" aria-label={en ? "Navigation menu" : "Навигационно меню"} className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[7px] border border-[#D6D7D0] text-[#303D33] lg:hidden">
          {menuOpen ? <X className="h-[22px] w-[22px]" /> : <Menu className="h-[22px] w-[22px]" />}
        </button>
      </div>
      {menuOpen && (
        <nav id="renovivo-navigation" className="border-t border-[#E8E6DF] bg-[#FAF9F6] lg:hidden" aria-label={en ? "Mobile navigation" : "Мобилна навигация"}>
          <div className="container-custom flex flex-col pb-6 pt-2">
            {links.map((link) => (
              <Link key={link.path} to={link.path} onClick={(event) => onNav(event, link.path)} className="border-b border-[#E8E6DF] py-3 text-[14px] font-medium text-[#29342B]">{en ? link.en : link.bg}</Link>
            ))}
            <button type="button" onClick={() => setLanguage(en ? "bg" : "en")} className="self-start py-4 text-xs text-[#52634C]">{en ? "Български" : "English"}</button>
            <button type="button" onClick={() => { setMenuOpen(false); openModal(); }} className="min-h-[46px] rounded-[5px] bg-[#50614E] px-5 text-sm font-semibold text-white">{en ? "Book a free visit" : "Заяви безплатен оглед"}</button>
          </div>
        </nav>
      )}
    </header>
  );
}
