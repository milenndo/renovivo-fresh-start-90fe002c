import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "@/components/CookieBanner";
import CookieSettingsModal from "@/components/CookieSettingsModal";
import FloatingContact from "@/components/FloatingContact";
import MobileActionBar from "@/components/layout/MobileActionBar";
import { useCookieConsentContext } from "@/contexts/CookieConsentContext";
import {
  hasAnalyticsConsent,
  hasMarketingConsent,
  loadGoogleAnalytics,
  loadGoogleTagManager,
  loadMetaPixel,
  clearNonEssentialCookies,
} from "@/utils/consent";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const {
    showBanner,
    showSettings,
    openSettings,
    closeSettings,
    acceptAll,
    rejectAll,
    savePreferences,
    preferences,
  } = useCookieConsentContext();

  // Consent-gated script loading
  useEffect(() => {
    if (preferences) {
      // Each loader checks consent itself and skips trackers whose ID
      // is not set in the environment (see .env.example).
      loadGoogleAnalytics();
      loadGoogleTagManager();
      loadMetaPixel();

      // If consent was revoked, clear cookies
      if (!hasAnalyticsConsent() && !hasMarketingConsent()) {
        clearNonEssentialCookies();
      }
    }
  }, [preferences]);

  return (
    <div className="min-h-screen flex flex-col pb-[calc(68px+env(safe-area-inset-bottom))] md:pb-0">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      
      {/* Cookie Consent Banner */}
      {showBanner && (
        <CookieBanner
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
          onOpenSettings={openSettings}
        />
      )}

      {/* Cookie Settings Modal */}
      <CookieSettingsModal
        open={showSettings}
        onClose={closeSettings}
        onAcceptAll={acceptAll}
        onRejectAll={rejectAll}
        onSave={savePreferences}
      />

      <div className="hidden md:block"><FloatingContact /></div>
      {!showBanner && !showSettings && <MobileActionBar />}
    </div>
  );
};

export default Layout;
