"use client";

import { CONSENT_OPEN_EVENT } from "../lib/consent";

export function CookieSettingsButton() {
  return (
    <button
      className="footer-link-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
    >
      Настройки cookie
    </button>
  );
}
