import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationForm } from "../components/ApplicationForm";
import { ConsentMap } from "../components/ConsentMap";
import { JsonLd } from "../components/JsonLd";
import { breadcrumbSchema, legalServiceSchema } from "../data/seo";
import { absoluteUrl, contact } from "../data/site";

export const metadata: Metadata = {
  title: "Контакты адвоката в Подольске",
  description:
    "Телефон, мессенджеры, адрес и график работы адвоката Дмитрия Рожновского в Подольске. Приём по предварительной договорённости.",
  alternates: { canonical: "/kontakty" },
  openGraph: {
    title: "Контакты адвоката Дмитрия Рожновского",
    description: "Запись на консультацию и срочная правовая помощь в Подольске.",
    url: "/kontakty",
  },
};

const contactsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      name: "Контакты адвоката Дмитрия Рожновского",
      url: absoluteUrl("/kontakty"),
      mainEntity: {
        ...legalServiceSchema,
        telephone: contact.phoneDisplay,
        email: contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "ул. Комсомольская, д. 61/31, офис 201",
          addressLocality: "Подольск",
          addressRegion: "Московская область",
          addressCountry: "RU",
        },
      },
    },
    breadcrumbSchema([
      { name: "Главная", path: "/" },
      { name: "Контакты", path: "/kontakty" },
    ]),
  ],
};

export default function ContactsPage() {
  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">Главная</Link> / Контакты</div>
          <p className="eyebrow">Связаться с адвокатом</p>
          <h1>Лично. Конфиденциально. По существу.</h1>
          <p className="hero-lead">Приём проводится по предварительной договорённости в Подольске.</p>
        </div>
      </section>
      <section className="content-page">
        <div className="container contact-page-grid">
          <div className="contact-details">
            <div className="contact-detail">
              <span>Телефон</span>
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            </div>
            <div className="contact-detail">
              <span>Мессенджеры</span>
              <a href={contact.telegram} target="_blank" rel="noreferrer">Telegram</a>
              <a href={contact.max} target="_blank" rel="noreferrer">MAX</a>
            </div>
            <div className="contact-detail">
              <span>Адрес приёма</span>
              <a href={contact.map} target="_blank" rel="noreferrer">{contact.address}</a>
            </div>
            <div className="contact-detail">
              <span>Юридический адрес</span>
              <strong>{contact.legalAddress}</strong>
            </div>
            <div className="contact-detail">
              <span>Электронная почта</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          </div>
          <ApplicationForm recipientEmail={contact.email} />
        </div>
      </section>

      <section className="contact-location">
        <div className="container">
          <div className="schedule-panel">
            <span className="schedule-clock" aria-hidden="true" />
            <div>
              <p className="eyebrow eyebrow-dark">Время для связи и приёма</p>
              <h2>График работы</h2>
              <div className="schedule-lines">
                <p>{contact.schedule.weekdays}</p>
                <p>{contact.schedule.saturday}</p>
                <p>{contact.schedule.sunday}</p>
              </div>
            </div>
          </div>

          <div className="map-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Место приёма</p>
              <h2>Офис в центре Подольска</h2>
            </div>
            <div>
              <p>{contact.address}</p>
              <a className="text-link" href={contact.map} target="_blank" rel="noreferrer">
                Открыть в Google Картах ↗
              </a>
            </div>
          </div>

          <div className="office-map">
            <ConsentMap />
          </div>
        </div>
      </section>
      <a className="mobile-call" href={contact.phoneHref}>Позвонить адвокату</a>
      <JsonLd data={contactsSchema} />
    </main>
  );
}
