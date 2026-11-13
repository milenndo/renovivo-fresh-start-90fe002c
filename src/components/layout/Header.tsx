import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Phone, Menu, X, Globe, ArrowUpRight } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { openModal } = useInspectionRequest();

  const navLinks = [
    { key: "nav.services", path: "/services" },
    { key: "nav.portfolio", path: "/portfolio" },
    { key: "nav.pricing", path: "/#estimator" },
    { key: "nav.about", path: "/about" },
    { key: "nav.contact", path: "/contact" },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    setIsMenuOpen(false);
    if (!path.startsWith("/#")) return;
    e.preventDefault();
    const id = path.slice(2);
    if (location.pathname === "/") {
      scrollToSection(id);
    } else {
      navigate("/");
      window.setTimeout(() => scrollToSection(id), 180);
    }
    window.history.replaceState(null, "", path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="container-custom flex h-[76px] md:h-[88px] items-center justify-between gap-6">
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="shrink-0 text-foreground" aria-label="Renovivo — начална страница">
          <Wordmark className="text-[29px] md:text-[34px]" showTagline />
        </Link>

        <nav aria-label={language === "en" ? "Main navigation" : "Главна навигация"} className="hidden xl:flex items-center gap-7 2xl:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className={`group relative py-3 text-sm font-medium transition-colors hover:text-[#6A746B] ${location.pathname === link.path ? "text-[#6A746B]" : "text-foreground"}`}
            >
              {t(link.key)}
              <span className="absolute bottom-1 left-0 h-px w-0 bg-[#6A746B] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden md:flex items-center gap-4 lg:gap-6">
          <button
            type="button"
            onClick={() => setLanguage(language === "bg" ? "en" : "bg")}
            className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            aria-label={language === "bg" ? "Switch to English" : "Превключи на български"}
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            {language === "bg" ? "EN" : "BG"}
          </button>
          <a href="tel:+359893712919" className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-[#6A746B] transition-colors">
            <Phone className="h-4 w-4" aria-hidden="true" />
            +359 89 371 29 19
          </a>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex min-h-11 items-center gap-3 bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-[#444D47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A746B]"
          >
            {t("cta.inspection")}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          className="inline-flex xl:hidden h-11 w-11 items-center justify-center border border-border text-foreground"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? (language === "en" ? "Close menu" : "Затвори менюто") : (language === "en" ? "Open menu" : "Отвори менюто")}
          aria-expanded={isMenuOpen}
          aria-controls="renovivo-mobile-menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav id="renovivo-mobile-menu" aria-label={language === "en" ? "Mobile navigation" : "Мобилна навигация"} className="xl:hidden border-t border-border bg-background">
          <div className="container-custom flex flex-col gap-0 py-3">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={(e) => handleNavClick(e, link.path)} className="border-b border-border/70 py-3.5 text-base text-foreground">
                {t(link.key)}
              </Link>
            ))}
            <div className="flex items-center justify-between gap-4 pt-5 pb-2">
              <a className="inline-flex items-center gap-2 text-sm font-medium" href="tel:+359893712919"><Phone className="h-4 w-4" /> +359 89 371 29 19</a>
              <button type="button" onClick={() => setLanguage(language === "bg" ? "en" : "bg")} className="text-sm font-semibold text-muted-foreground">{language === "bg" ? "EN" : "BG"}</button>
            </div>
            <button type="button" onClick={() => { setIsMenuOpen(false); openModal(); }} className="mt-4 min-h-12 bg-foreground px-5 text-background font-semibold">
              {t("cta.inspection")}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
