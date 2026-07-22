import { Button } from "@/components/ui/button";
import { Cookie, Settings, X, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface CookieBannerProps {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onOpenSettings: () => void;
}

const CookieBanner = ({ onAcceptAll, onRejectAll, onOpenSettings }: CookieBannerProps) => {
  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t border-border shadow-lg animate-in slide-in-from-bottom duration-300"
    >
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Cookie className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 id="cookie-banner-title" className="text-lg font-semibold text-foreground">
                Използваме бисквитки
              </h2>
            </div>
            <p id="cookie-banner-description" className="text-sm text-muted-foreground">
              Използваме бисквитки, за да подобрим вашето изживяване на сайта. Някои са строго необходими за работата 
              на сайта, докато други ни помагат да анализираме трафика и да персонализираме съдържанието.{" "}
              <Link
                to="/privacy-policy"
                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Политика за бисквитки
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
            <Button
              variant="outline"
              onClick={onOpenSettings}
              className="gap-2"
              aria-label="Отворете настройките за бисквитки"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
              Настройки
            </Button>
            <Button
              variant="outline"
              onClick={onRejectAll}
              className="gap-2"
              aria-label="Отказвам всички незадължителни бисквитки"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Отказвам всички
            </Button>
            <Button
              onClick={onAcceptAll}
              className="gap-2"
              aria-label="Приемам всички бисквитки"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              Приемам всички
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
