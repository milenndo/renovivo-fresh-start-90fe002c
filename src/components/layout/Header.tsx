import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Clock, Menu, X, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Renovivo_logover.2.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Начало", path: "/" },
    { name: "Услуги", path: "/services" },
    { name: "Портфолио", path: "/portfolio" },
    { name: "Блог", path: "/blog" },
    { name: "За нас", path: "/about" },
    { name: "Контакти", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-foreground text-background py-2">
        <div className="container-custom flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a
              href="tel:+359893712919"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">+359 89 371 29 19</span>
            </a>
            <a
              href="mailto:renovivo.bg@gmail.com"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">renovivo.bg@gmail.com</span>
            </a>
            <div className="hidden md:flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Пон - Пет: 08:00 - 18:00</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Последвайте ни във Facebook"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Последвайте ни в Instagram"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-background shadow-sm sticky top-0 z-50">
        <div className="container-custom py-1">
          {/* Mobile Layout */}
          <div className="relative lg:hidden flex items-center justify-center h-16">
            <Link to="/" className="flex items-center justify-center">
              <img
                src={logo}
                alt="Renovivo - Every Detail Matters"
                className="h-12 w-auto"
              />
            </Link>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop / Tablet Layout */}
          <div className="hidden lg:flex items-center py-2">
            {/* Лого вляво – ~30% по-голямо */}
            <div className="flex items-center shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="Renovivo - Every Detail Matters"
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Навигация – центрирана между ляво и дясно */}
            <nav className="flex-1 flex justify-center items-center">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-base whitespace-nowrap font-medium transition-colors relative py-1 ${
                      isActive(link.path)
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${
                      isActive(link.path) ? "after:scale-x-100" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Телефон вдясно, на един ред */}
            <div className="flex items-center shrink-0">
              <a
                href="tel:+359893712919"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold whitespace-nowrap"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span>+359 89 371 29 19</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t animate-fade-in">
            <nav className="container-custom py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-xl font-medium py-2 ${
                    isActive(link.path) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a href="tel:+359893712919" className="mt-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                  Обадете се
                </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
