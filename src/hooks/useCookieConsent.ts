import { useState, useEffect, useCallback } from "react";
import {
  ConsentPreferences,
  getConsentPreferences,
  saveConsentPreferences,
  hasConsentDecision,
  acceptAllCookies,
  rejectAllCookies,
} from "@/utils/consent";

interface UseCookieConsentReturn {
  /** Whether banner should be shown */
  showBanner: boolean;
  /** Whether settings modal is open */
  showSettings: boolean;
  /** Current consent preferences */
  preferences: ConsentPreferences | null;
  /** Open settings modal */
  openSettings: () => void;
  /** Close settings modal */
  closeSettings: () => void;
  /** Accept all cookies */
  acceptAll: () => void;
  /** Reject all cookies */
  rejectAll: () => void;
  /** Save custom preferences */
  savePreferences: (prefs: Partial<ConsentPreferences>) => void;
  /** Update single preference */
  updatePreference: (key: keyof Omit<ConsentPreferences, "version" | "updatedAt">, value: boolean) => void;
}

export function useCookieConsent(): UseCookieConsentReturn {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);

  // Initialize state from localStorage
  useEffect(() => {
    const hasDecision = hasConsentDecision();
    setShowBanner(!hasDecision);
    setPreferences(getConsentPreferences());
  }, []);

  // Listen for consent changes
  useEffect(() => {
    const handleConsentChange = (event: CustomEvent<ConsentPreferences>) => {
      setPreferences(event.detail);
      setShowBanner(false);
    };

    window.addEventListener("consentChanged", handleConsentChange as EventListener);
    return () => {
      window.removeEventListener("consentChanged", handleConsentChange as EventListener);
    };
  }, []);

  const openSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  const acceptAll = useCallback(() => {
    acceptAllCookies();
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const rejectAll = useCallback(() => {
    rejectAllCookies();
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const savePreferencesHandler = useCallback((prefs: Partial<ConsentPreferences>) => {
    saveConsentPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const updatePreference = useCallback(
    (key: keyof Omit<ConsentPreferences, "version" | "updatedAt">, value: boolean) => {
      const current = getConsentPreferences() || {
        version: 1,
        updatedAt: new Date().toISOString(),
        analytics: false,
        marketing: false,
        functional: false,
        thirdParty: false,
      };
      
      setPreferences({
        ...current,
        [key]: value,
      });
    },
    []
  );

  return {
    showBanner,
    showSettings,
    preferences,
    openSettings,
    closeSettings,
    acceptAll,
    rejectAll,
    savePreferences: savePreferencesHandler,
    updatePreference,
  };
}

export default useCookieConsent;
