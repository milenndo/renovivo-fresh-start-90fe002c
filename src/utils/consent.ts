// Cookie Consent Utility Functions
// GDPR/ePrivacy compliant consent management

export const CONSENT_STORAGE_KEY = "cookie_consent_v1";

export interface ConsentPreferences {
  version: number;
  updatedAt: string;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  thirdParty: boolean;
}

const DEFAULT_PREFERENCES: ConsentPreferences = {
  version: 1,
  updatedAt: new Date().toISOString(),
  analytics: false,
  marketing: false,
  functional: false,
  thirdParty: false,
};

/**
 * Get stored consent preferences from localStorage
 */
export function getConsentPreferences(): ConsentPreferences | null {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored) as ConsentPreferences;
    // Validate version
    if (parsed.version !== 1) return null;
    
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Save consent preferences to localStorage
 */
export function saveConsentPreferences(preferences: Partial<ConsentPreferences>): void {
  const current = getConsentPreferences() || DEFAULT_PREFERENCES;
  const updated: ConsentPreferences = {
    ...current,
    ...preferences,
    version: 1,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updated));
  
  // Dispatch custom event for consent changes
  window.dispatchEvent(new CustomEvent("consentChanged", { detail: updated }));
}

/**
 * Check if user has made any consent decision
 */
export function hasConsentDecision(): boolean {
  return getConsentPreferences() !== null;
}

/**
 * Check if analytics consent is granted
 */
export function hasAnalyticsConsent(): boolean {
  const prefs = getConsentPreferences();
  return prefs?.analytics === true;
}

/**
 * Check if marketing consent is granted
 */
export function hasMarketingConsent(): boolean {
  const prefs = getConsentPreferences();
  return prefs?.marketing === true;
}

/**
 * Check if functional consent is granted
 */
export function hasFunctionalConsent(): boolean {
  const prefs = getConsentPreferences();
  return prefs?.functional === true;
}

/**
 * Check if third-party consent is granted
 */
export function hasThirdPartyConsent(): boolean {
  const prefs = getConsentPreferences();
  return prefs?.thirdParty === true;
}

/**
 * Accept all non-essential cookies
 */
export function acceptAllCookies(): void {
  saveConsentPreferences({
    analytics: true,
    marketing: true,
    functional: true,
    thirdParty: true,
  });
}

/**
 * Reject all non-essential cookies
 */
export function rejectAllCookies(): void {
  saveConsentPreferences({
    analytics: false,
    marketing: false,
    functional: false,
    thirdParty: false,
  });
  
  // Attempt to clear known non-essential cookies
  clearNonEssentialCookies();
}

/**
 * Clear known non-essential cookies
 * Note: This can only clear cookies accessible from JavaScript (not httpOnly)
 */
export function clearNonEssentialCookies(): void {
  // List of known analytics/marketing cookie patterns
  const cookiesToClear = [
    "_ga",
    "_gid",
    "_gat",
    "_gcl_au",
    "_fbp",
    "_fbc",
    "fr",
    "_pinterest_ct_ua",
  ];
  
  const cookies = document.cookie.split(";");
  
  cookies.forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    
    // Check if cookie matches any pattern
    const shouldClear = cookiesToClear.some(
      (pattern) => cookieName.startsWith(pattern)
    );
    
    if (shouldClear) {
      // Clear for current domain and common subdomain patterns
      const domains = [
        window.location.hostname,
        "." + window.location.hostname,
        window.location.hostname.replace(/^www\./, "."),
      ];
      
      domains.forEach((domain) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      });
    }
  });
}

/**
 * Inject a script tag dynamically (for consent-gated scripts)
 */
export function injectScript(
  src: string,
  id: string,
  async = true
): HTMLScriptElement | null {
  // Don't inject if already exists
  if (document.getElementById(id)) {
    return null;
  }
  
  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = async;
  document.head.appendChild(script);
  
  return script;
}

/**
 * Remove an injected script by ID
 */
export function removeScript(id: string): void {
  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
}

// ============================================================
// SCRIPT INJECTION PLACEHOLDERS
// Replace the placeholder IDs with your actual tracking IDs
// ============================================================

/**
 * Load Google Analytics (if consent granted)
 * Replace 'GA_MEASUREMENT_ID' with your actual GA4 Measurement ID (e.g., 'G-XXXXXXXXXX')
 */
export function loadGoogleAnalytics(): void {
  if (!hasAnalyticsConsent()) return;
  
  const GA_MEASUREMENT_ID = "GA_MEASUREMENT_ID"; // TODO: Replace with actual ID
  
  // Load gtag.js
  injectScript(
    `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
    "ga-script"
  );
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
}

/**
 * Load Google Tag Manager (if consent granted)
 * Replace 'GTM_CONTAINER_ID' with your actual GTM Container ID (e.g., 'GTM-XXXXXXX')
 */
export function loadGoogleTagManager(): void {
  if (!hasMarketingConsent()) return;
  
  const GTM_CONTAINER_ID = "GTM_CONTAINER_ID"; // TODO: Replace with actual ID
  
  // GTM script
  const script = document.createElement("script");
  script.id = "gtm-script";
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
  `;
  
  if (!document.getElementById("gtm-script")) {
    document.head.appendChild(script);
  }
}

/**
 * Load Meta (Facebook) Pixel (if consent granted)
 * Replace 'META_PIXEL_ID' with your actual Pixel ID (e.g., '1234567890')
 */
export function loadMetaPixel(): void {
  if (!hasMarketingConsent()) return;
  
  const META_PIXEL_ID = "META_PIXEL_ID"; // TODO: Replace with actual ID
  
  // Meta Pixel script
  const script = document.createElement("script");
  script.id = "meta-pixel-script";
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  
  if (!document.getElementById("meta-pixel-script")) {
    document.head.appendChild(script);
  }
}

// TypeScript declarations for global objects
declare global {
  interface Window {
    dataLayer: unknown[];
    fbq: (...args: unknown[]) => void;
  }
}
