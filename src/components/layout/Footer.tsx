import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Clock, Cookie, Globe } from "lucide-react";
import logo from "@/assets/Renovivo_logover.2.svg";
import { useCookieConsentContext } from "@/contexts/CookieConsentContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { openSettings } = useCookieConsentContext();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'bg' ? 'en' : 'bg');
  };

  const quickLinks = [
    { key: 'nav.home', path: "/" },
    { key: 'nav.services', path: "/services" },
    { key: 'nav.portfolio', path: "/portfolio" },
    { key: 'nav.blog', path: "/blog" },
    { key: 'nav.about', path: "/about" },
    { key: 'nav.contact', path: "/contact" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <img 
              src={logo} 
              alt="Renovivo" 
              width={160}
              height={40}
              loading="lazy"
              decoding="async"
              className="h-10 w-auto brightness-0 invert"
              style={{ aspectRatio: '160/40' }}
            />
            <p className="text-background/70 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/share/17eRc268rh/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/renovivo.bg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-background/70 hover:text-primary transition-colors text-sm">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.contacts')}</h3>
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
                  href="mailto:office@renovivo.bg"
                  className="flex items-start gap-3 text-background/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 mt-0.5 text-primary" aria-hidden="true" />
                  <span className="text-sm">office@renovivo.bg</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="h-5 w-5 mt-0.5 text-primary" aria-hidden="true" />
                <span className="text-sm">{t('footer.address')}</span>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <Clock className="h-5 w-5 mt-0.5 text-primary" aria-hidden="true" />
                <span className="text-sm">{t('nav.workingHours')}</span>
              </li>
            </ul>
          </div>

          {/* Language Toggle */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Language</h3>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors text-sm"
              aria-label={`Switch to ${language === 'bg' ? 'English' : 'Bulgarian'}`}
            >
              <Globe className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">{language === 'bg' ? 'Български' : 'English'}</span>
              <span className="text-background/50">→</span>
              <span>{language === 'bg' ? 'English' : 'Български'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/70 text-sm">© {currentYear} Renovivo. {t('footer.copyright')}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={openSettings}
              className="flex items-center gap-1.5 text-background/70 hover:text-primary transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-foreground rounded"
              aria-label="Open cookie settings"
            >
              <Cookie className="h-4 w-4" aria-hidden="true" />
              {t('footer.cookieSettings')}
            </button>
            <span className="text-background/70 text-sm">Every Detail Matters</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
