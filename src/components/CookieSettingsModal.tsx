import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Cookie, Check, X, Lock } from "lucide-react";
import { ConsentPreferences, getConsentPreferences } from "@/utils/consent";

interface CookieSettingsModalProps {
  open: boolean;
  onClose: () => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSave: (preferences: Partial<ConsentPreferences>) => void;
}

interface CategoryConfig {
  key: keyof Omit<ConsentPreferences, "version" | "updatedAt">;
  label: string;
  description: string;
  required?: boolean;
}

const categories: CategoryConfig[] = [
  {
    key: "analytics" as const,
    label: "Строго необходими",
    description:
      "Тези бисквитки са задължителни за правилното функциониране на уебсайта. Те включват бисквитки за сесия, сигурност и основни функции. Не могат да бъдат изключени.",
    required: true,
  },
  {
    key: "analytics",
    label: "Аналитични",
    description:
      "Тези бисквитки ни помагат да разберем как посетителите използват сайта. Събираме анонимна информация за подобряване на съдържанието и потребителското изживяване.",
  },
  {
    key: "marketing",
    label: "Маркетингови",
    description:
      "Тези бисквитки се използват за показване на реклами, които са подходящи за вас. Те могат да проследяват посещенията ви на други сайтове.",
  },
  {
    key: "functional",
    label: "Функционални",
    description:
      "Тези бисквитки позволяват разширени функции като персонализация, запомняне на предпочитания и социално споделяне.",
  },
  {
    key: "thirdParty",
    label: "Бисквитки на трети страни",
    description:
      "Тези бисквитки се задават от външни услуги като социални мрежи, видео платформи и други интегрирани функции.",
  },
];

const CookieSettingsModal = ({
  open,
  onClose,
  onAcceptAll,
  onRejectAll,
  onSave,
}: CookieSettingsModalProps) => {
  const [localPreferences, setLocalPreferences] = useState({
    analytics: false,
    marketing: false,
    functional: false,
    thirdParty: false,
  });

  // Load current preferences when modal opens
  useEffect(() => {
    if (open) {
      const current = getConsentPreferences();
      if (current) {
        setLocalPreferences({
          analytics: current.analytics,
          marketing: current.marketing,
          functional: current.functional,
          thirdParty: current.thirdParty,
        });
      } else {
        // Default all to OFF for GDPR compliance
        setLocalPreferences({
          analytics: false,
          marketing: false,
          functional: false,
          thirdParty: false,
        });
      }
    }
  }, [open]);

  const handleToggle = (key: keyof typeof localPreferences) => {
    setLocalPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    onSave(localPreferences);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary" aria-hidden="true" />
            <DialogTitle>Настройки на бисквитките</DialogTitle>
          </div>
          <DialogDescription>
            Изберете кои категории бисквитки да разрешите. Можете да промените настройките си по всяко време.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Strictly necessary - always on, non-toggleable */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label className="text-base font-medium">Строго необходими</Label>
                <Lock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Тези бисквитки са задължителни за правилното функциониране на уебсайта. 
                Те включват бисквитки за сесия, сигурност и основни функции. Не могат да бъдат изключени.
              </p>
            </div>
            <Switch
              checked={true}
              disabled
              aria-label="Строго необходими бисквитки - винаги активни"
            />
          </div>

          {/* Analytics */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-border">
            <div className="flex-1">
              <Label htmlFor="analytics-toggle" className="text-base font-medium cursor-pointer">
                Аналитични
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Тези бисквитки ни помагат да разберем как посетителите използват сайта. 
                Събираме анонимна информация за подобряване на съдържанието и потребителското изживяване.
              </p>
            </div>
            <Switch
              id="analytics-toggle"
              checked={localPreferences.analytics}
              onCheckedChange={() => handleToggle("analytics")}
              aria-label="Включи или изключи аналитични бисквитки"
            />
          </div>

          {/* Marketing */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-border">
            <div className="flex-1">
              <Label htmlFor="marketing-toggle" className="text-base font-medium cursor-pointer">
                Маркетингови
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Тези бисквитки се използват за показване на реклами, които са подходящи за вас. 
                Те могат да проследяват посещенията ви на други сайтове.
              </p>
            </div>
            <Switch
              id="marketing-toggle"
              checked={localPreferences.marketing}
              onCheckedChange={() => handleToggle("marketing")}
              aria-label="Включи или изключи маркетингови бисквитки"
            />
          </div>

          {/* Functional */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-border">
            <div className="flex-1">
              <Label htmlFor="functional-toggle" className="text-base font-medium cursor-pointer">
                Функционални
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Тези бисквитки позволяват разширени функции като персонализация, 
                запомняне на предпочитания и социално споделяне.
              </p>
            </div>
            <Switch
              id="functional-toggle"
              checked={localPreferences.functional}
              onCheckedChange={() => handleToggle("functional")}
              aria-label="Включи или изключи функционални бисквитки"
            />
          </div>

          {/* Third Party */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-border">
            <div className="flex-1">
              <Label htmlFor="thirdparty-toggle" className="text-base font-medium cursor-pointer">
                Бисквитки на трети страни
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Тези бисквитки се задават от външни услуги като социални мрежи, 
                видео платформи и други интегрирани функции.
              </p>
            </div>
            <Switch
              id="thirdparty-toggle"
              checked={localPreferences.thirdParty}
              onCheckedChange={() => handleToggle("thirdParty")}
              aria-label="Включи или изключи бисквитки на трети страни"
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onRejectAll}
            className="gap-2 w-full sm:w-auto"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Отказвам всички
          </Button>
          <Button
            variant="outline"
            onClick={onAcceptAll}
            className="gap-2 w-full sm:w-auto"
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            Приемам всички
          </Button>
          <Button onClick={handleSave} className="gap-2 w-full sm:w-auto">
            Запази избора
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookieSettingsModal;
