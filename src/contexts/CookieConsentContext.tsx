import { createContext, useContext, ReactNode } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { ConsentPreferences } from "@/utils/consent";

interface CookieConsentContextType {
  showBanner: boolean;
  showSettings: boolean;
  preferences: ConsentPreferences | null;
  openSettings: () => void;
  closeSettings: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: Partial<ConsentPreferences>) => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const consent = useCookieConsent();

  return (
    <CookieConsentContext.Provider value={consent}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsentContext = (): CookieConsentContextType => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsentContext must be used within a CookieConsentProvider");
  }
  return context;
};
