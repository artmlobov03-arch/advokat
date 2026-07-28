import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "../data/site";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты адвоката Дмитрия Рожновского в Подольске: телефон, Telegram, адрес и график работы.",
  alternates: { canonical: "/kontakty" },
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
              <span>График работы</span>
              <strong>Пн–Пт: 08:00–23:00<br />Сб: 10:00–20:00<br />Вс: выходной</strong>
            </div>
            <div className="contact-detail">
              <span>Электронная почта</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          </div>
          <form className="contact-form" action={`mailto:${contact.email}`} method="post" encType="text/plain">
            <h2>Опишите ситуацию</h2>
            <p>После отправки откроется почтовая программа с подготовленным сообщением.</p>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">Имя</label>
                <input id="name" name="Имя" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="phone">Телефон</label>
                <input id="phone" name="Телефон" type="tel" autoComplete="tel" required />
              </div>
              <div className="field field-full">
                <label htmlFor="message">Краткое описание ситуации</label>
                <textarea id="message" name="Описание ситуации" required />
              </div>
            </div>
            <label className="consent">
              <input type="checkbox" required />
              <span>Я принимаю <Link href="/soglasie">условия обработки персональных данных</Link>.</span>
            </label>
            <button className="button" type="submit">Подготовить обращение</button>
          </form>
        </div>
      </section>
      <a className="mobile-call" href={contact.phoneHref}>Позвонить адвокату</a>
    </main>
  );
}
