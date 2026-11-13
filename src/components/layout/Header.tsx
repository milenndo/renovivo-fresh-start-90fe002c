import { useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Phone, Menu, X, Globe, ArrowUpRight } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { openModal } = useInspectionRequest();

  const links = [
    { key: "nav.services", path: "/services" },
    { key: "nav.portfolio", path: "/portfolio" },
    { key: "nav.pricing", path: "/#estimator" },
    { key: "nav.about", path: "/about" },
    { key: "nav.contact", path: "/contact" },
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

  const switchLanguage = () => setLanguage(language === "bg" ? "en" : "bg");
  const isEn = language === "en";

  return (
    <header className="sticky top-0 z-50 border-b border-[#E6E2DA] bg-[#FAF9F6]/95 backdrop-blur-xl">
      <div className="container-custom flex h-[66px] items-center gap-3 md:h-[80px]">
        <Link to="/" onClick={() => setMenuOpen(false)} className="mr-auto inline-flex shrink-0 items-center" aria-label="Renovivo — начало">
          <Wordmark className="text-[32px] md:text-[40px]" showTagline />
        </Link>

        <nav aria-label={isEn ? "Main navigation" : "Главна навигация"} className="hidden items-center gap-6 xl:flex">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(event) => onNav(event, link.path)}
              className={"group relative py-3 text-[13px] font-medium transition-colors hover:text-[#6A746B] " + (location.pathname === link.path ? "text-[#6A746B]" : "text-[#2E342F]")}
            >
              {t(link.key)}
              <span className="absolute bottom-1 left-0 h-px w-0 bg-[#6A746B] transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-4 md:flex">
          <button type="button" onClick={switchLanguage} className="hidden items-center gap-1.5 text-xs font-medium text-[#63675F] hover:text-[#303D33] lg:inline-flex" aria-label={isEn ? "Switch to Bulgarian" : "Превключи на английски"}>
            <Globe className="h-4 w-4" aria-hidden="true" /> {isEn ? "BG" : "EN"}
          </button>
          <a href="tel:+359893712919" className="hidden items-center gap-2 text-[13px] font-semibold text-[#303D33] transition-colors hover:text-[#6A746B] lg:inline-flex">
            <Phone className="h-4 w-4" aria-hidden="true" /> +359 89 371 29 19
          </a>
          <button type="button" onClick={openModal} className="inline-flex min-h-11 items-center gap-3 rounded-md bg-[#4F5D4C] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#303D33]">
            {isEn ? "Book a visit" : "Заяви оглед"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <a href="tel:+359893712919" className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[#D9D9D1] text-[#303D33] transition-colors hover:bg-[#EBECE6] md:hidden" aria-label={isEn ? "Call Renovivo" : "Обади се на Renovivo"}>
          <Phone className="h-[19px] w-[19px]" />
        </a>
        <button
          type="button"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[#D9D9D1] text-[#303D33] xl:hidden md:ml-0"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="renovivo-navigation"
          aria-label={menuOpen ? (isEn ? "Close menu" : "Затвори менюто") : (isEn ? "Open menu" : "Отвори менюто")}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav id="renovivo-navigation" aria-label={isEn ? "Mobile navigation" : "Мобилна навигация"} className="border-t border-[#E6E2DA] bg-[#FAF9F6] xl:hidden">
          <div className="container-custom flex flex-col pb-5 pt-2">
            {links.map((link) => (
              <Link key={link.path} to={link.path} onClick={(event) => onNav(event, link.path)} className="border-b border-[#E6E2DA] py-3.5 text-base font-medium text-[#303D33]">
                {t(link.key)}
              </Link>
            ))}
            <button type="button" onClick={switchLanguage} className="self-start py-4 text-sm text-[#63675F]">{isEn ? "Български" : "English"}</button>
            <button type="button" onClick={() => { setMenuOpen(false); openModal(); }} className="min-h-12 rounded-md bg-[#4F5D4C] px-6 font-semibold text-white">{isEn ? "Book a free visit" : "Заяви безплатен оглед"}</button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
