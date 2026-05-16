import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Clock } from "lucide-react";
import logo from "@/assets/Renovivo_logover.2.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <img src={logo} alt="Renovivo" className="h-10 w-auto brightness-0 invert" />
            <p className="text-background/70 text-sm leading-relaxed">
              Професионални ремонтни услуги с внимание към всеки детайл. Трансформираме вашите пространства в мечтани
              домове.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com/renovivo.sofia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Последвайте ни във Facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com/renovivo.bg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Последвайте ни в Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Бързи връзки</h3>
            <ul className="space-y-3">
              {[
                { name: "Начало", path: "/" },
                { name: "Услуги", path: "/services" },
                { name: "Портфолио", path: "/portfolio" },
                { name: "Блог", path: "/blog" },
                { name: "За нас", path: "/about" },
                { name: "Контакти", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-background/70 hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Контакти</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+359893712919"
                  className="flex items-start gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 mt-0.5 text-primary" aria-hidden="true" />
                  <span className="text-sm">+359 89 371 29 19</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:renovivo.bg@gmail.com"
                  className="flex items-start gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 mt-0.5 text-primary" aria-hidden="true" />
                  <span className="text-sm">renovivo.bg@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="h-5 w-5 mt-0.5 text-primary" aria-hidden="true" />
                <span className="text-sm">гр. София, България</span>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <Clock className="h-5 w-5 mt-0.5 text-primary" aria-hidden="true" />
                <span className="text-sm">Пон - Пет: 08:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/70 text-sm">© {currentYear} Renovivo. Всички права запазени.</p>
          <p className="text-background/70 text-sm">Every Detail Matters</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
