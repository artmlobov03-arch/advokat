"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  allowsAnalytics,
  CONSENT_OPEN_EVENT,
  readConsent,
  readServerConsent,
  subscribeToConsent,
  type ConsentValue,
  writeConsent,
} from "../lib/consent";

const metrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.replace(/\D/g, "");

export function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readConsent,
    readServerConsent,
  );
  const [forceOpen, setForceOpen] = useState(false);

  useEffect(() => {
    const reopen = () => setForceOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  function choose(value: ConsentValue) {
    writeConsent(value);
    setForceOpen(false);
  }

  return (
    <>
      {allowsAnalytics(consent) && metrikaId && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${metrikaId}','ym');ym(${metrikaId},'init',{ssr:true,webvisor:true,clickmap:true,accurateTrackBounce:true,trackLinks:true});`}
        </Script>
      )}

      {(!consent || forceOpen) && (
        <aside className="cookie-banner" aria-label="Настройки файлов cookie">
          <div>
            <strong>Настройки файлов cookie</strong>
            <p>
              Технические cookie нужны для сохранения выбора. Google Карты и
              Яндекс.Метрика загружаются только после согласия. Подробнее — в{" "}
              <Link href="/soglasie-cookie" target="_blank">
                документе об использовании cookie
              </Link>.
            </p>
          </div>
          <div className="cookie-actions">
            <button
              className="button button-ghost"
              type="button"
              onClick={() => choose("necessary")}
            >
              Только необходимые
            </button>
            <button className="button" type="button" onClick={() => choose("all")}>
              Принять все
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
