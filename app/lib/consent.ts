export type ConsentValue = "necessary" | "functional" | "all";

const COOKIE_NAME = "site_consent_v1";
const CONSENT_EVENT = "site-consent-change";
export const CONSENT_OPEN_EVENT = "site-consent-open";

export function readConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;

  const value = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];

  return value === "necessary" || value === "functional" || value === "all"
    ? value
    : null;
}

export function writeConsent(value: ConsentValue) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function subscribeToConsent(listener: () => void) {
  const handler = () => listener();

  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}

export const readServerConsent = () => null;

export const allowsFunctional = (value: ConsentValue | null) =>
  value === "functional" || value === "all";

export const allowsAnalytics = (value: ConsentValue | null) => value === "all";
