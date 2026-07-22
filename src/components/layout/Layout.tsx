import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "@/components/CookieBanner";
import CookieSettingsModal from "@/components/CookieSettingsModal";
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
      if (hasAnalyticsConsent()) {
        // Load analytics scripts only if consent is granted
        // TODO: Uncomment and add your actual IDs
        // loadGoogleAnalytics();
        console.log("[Consent] Analytics consent granted - ready to load GA");
      }

      if (hasMarketingConsent()) {
        // Load marketing scripts only if consent is granted
        // TODO: Uncomment and add your actual IDs
        // loadGoogleTagManager();
        // loadMetaPixel();
        console.log("[Consent] Marketing consent granted - ready to load GTM/Meta Pixel");
      }

      // If consent was revoked, clear cookies
      if (!hasAnalyticsConsent() && !hasMarketingConsent()) {
        clearNonEssentialCookies();
      }
    }
  }, [preferences]);

  return (
    <div className="min-h-screen flex flex-col">
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

    </div>
  );
};

export default Layout;
