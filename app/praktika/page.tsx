import type { Metadata } from "next";
import Link from "next/link";
import { cases, contact } from "../data/site";

export const metadata: Metadata = {
  title: "Практика и результаты дел",
  description:
    "Обезличенные материалы из адвокатской практики Дмитрия Рожновского: прекращение дел, реабилитация и изменение квалификации.",
  alternates: { canonical: "/praktika" },
};

export default function PracticePage() {
  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">Главная</Link> / Практика</div>
          <p className="eyebrow">Судебные решения</p>
          <h1>Практика, подтверждённая материалами дел</h1>
          <p className="hero-lead">
            Обезличенные примеры дел, в которых Дмитрий Рожновский представлял
            интересы доверителей.
          </p>
        </div>
      </section>
      <section className="content-page">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow eyebrow-dark">Избранные дела</p><h2>Результаты и правовая позиция</h2></div>
            <p>Материалы размещаются с соблюдением конфиденциальности и без раскрытия персональных данных доверителей.</p>
          </div>
          <div className="inner-cards">
            {cases.map((item) => (
              <article className="inner-card" key={item.article}>
                <span>{item.article}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="contact-cta">
        <div className="container contact-cta-grid">
          <div>
            <p className="eyebrow">Важно</p>
            <h2>Каждое дело имеет собственные обстоятельства</h2>
            <p>Результаты прошлых дел не являются гарантией аналогичного результата. Для оценки ситуации необходимо изучить материалы.</p>
          </div>
          <div className="contact-actions">
            <a className="contact-phone" href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a className="button" href={contact.telegram} target="_blank" rel="noreferrer">Получить консультацию</a>
          </div>
        </div>
      </section>
      <a className="mobile-call" href={contact.phoneHref}>Позвонить адвокату</a>
    </main>
  );
}
