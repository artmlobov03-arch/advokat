"use client";

import { useSyncExternalStore } from "react";
import {
  allowsFunctional,
  readConsent,
  readServerConsent,
  subscribeToConsent,
  writeConsent,
} from "../lib/consent";

const mapUrl =
  "https://www.google.com/maps?q=%D0%9A%D0%BE%D0%BC%D1%81%D0%BE%D0%BC%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%2C%2061%2F31%2C%20%D0%9F%D0%BE%D0%B4%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%2C%20%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%BB%D0%B0%D1%81%D1%82%D1%8C&output=embed";

export function ConsentMap() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readConsent,
    readServerConsent,
  );
  const allowed = allowsFunctional(consent);

  if (!allowed) {
    return (
      <div className="map-consent-placeholder">
        <strong>Карта не загружена</strong>
        <p>
          Google Карты относятся к функциональным внешним сервисам и
          загружаются только с вашего согласия.
        </p>
        <button
          className="button"
          type="button"
          onClick={() => writeConsent("functional")}
        >
          Показать карту
        </button>
      </div>
    );
  }

  return (
    <iframe
      title="Место приёма адвоката Дмитрия Рожновского"
      src={mapUrl}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
