import Image from "next/image";
import Link from "next/link";
import { cases, contact, faq, services } from "./data/site";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      name: "Адвокат Дмитрий Рожновский",
      url: "https://rozhnovskiy.ru/",
      image: "https://rozhnovskiy.ru/advokat-rozhnovskiy.webp",
      telephone: "+79852454433",
      email: contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Комсомольская, д. 61/31, офис 201",
        addressLocality: "Подольск",
        addressRegion: "Московская область",
        addressCountry: "RU",
      },
      areaServed: ["Подольск", "Москва", "Московская область"],
    },
    {
      "@type": "Person",
      name: "Дмитрий Владимирович Рожновский",
      jobTitle: "Адвокат",
      worksFor: { "@type": "Organization", name: "ПКА «СЕД ЛЕКС»" },
    },
  ],
};

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <Image
            src="/advokat-rozhnovskiy.webp"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-scrim" />
        <div className="container hero-content">
          <p className="eyebrow">Адвокат по уголовным делам · Подольск и Москва</p>
          <h1>Защита, когда на кону свобода и репутация</h1>
          <p className="hero-lead">
            Дмитрий Рожновский. Конфиденциальная правовая помощь на стадии
            проверки, следствия и судебного разбирательства.
          </p>
          <div className="hero-actions">
            <a className="button" href={contact.phoneHref}>Срочно связаться</a>
            <Link className="button button-ghost" href="/praktika">Смотреть практику</Link>
          </div>
          <div className="hero-facts" aria-label="Основная информация">
            <span>ПКА «СЕД ЛЕКС»</span>
            <span>Индивидуальная стратегия</span>
            <span>Строгая конфиденциальность</span>
          </div>
        </div>
      </section>

      <section className="urgent-panel" aria-label="Срочная помощь">
        <div className="container urgent-inner">
          <div>
            <span className="signal-dot" />
            <strong>Задержание, обыск или допрос?</strong>
            <p>Не давайте объяснений без защитника. Свяжитесь с адвокатом прямо сейчас.</p>
          </div>
          <a href={contact.phoneHref}>{contact.phoneDisplay}<span>Позвонить ↗</span></a>
        </div>
      </section>

      <section className="section section-light" id="services">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Направления практики</p>
              <h2>Правовая защита в сложных ситуациях</h2>
            </div>
            <p>
              Каждое дело начинается с анализа обстоятельств. Стратегия определяется
              только после изучения документов и позиции доверителя.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <Link className="service-card" href={`/uslugi/${service.slug}`} key={service.slug}>
                <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.shortTitle}</h3>
                <p>{service.description}</p>
                <span className="card-link">Подробнее <b>↗</b></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-heading section-heading-dark">
            <div>
              <p className="eyebrow">Практика</p>
              <h2>Решения, подтверждённые документами</h2>
            </div>
            <p>
              На сайте представлены обезличенные материалы дел, в которых Дмитрий
              Рожновский участвовал в качестве защитника.
            </p>
          </div>
          <div className="cases-grid">
            {cases.map((item) => (
              <article className="case-card" key={item.article}>
                <span>{item.article}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link href="/praktika">Изучить практику ↗</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-about">
        <div className="container about-grid">
          <div className="about-portrait">
            <Image
              src="/advokat-rozhnovskiy.webp"
              alt="Адвокат Дмитрий Рожновский в рабочем кабинете"
              fill
              sizes="(max-width: 800px) 100vw, 44vw"
            />
            <div className="portrait-caption">
              <span>Адвокат</span>
              <strong>Дмитрий Владимирович Рожновский</strong>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow eyebrow-dark">Об адвокате</p>
            <h2>Спокойная оценка ситуации. Последовательная защита.</h2>
            <p className="lead">
              Работа адвоката строится на доверии, конфиденциальности и внимании
              к деталям каждого дела.
            </p>
            <p>
              Защита включает анализ материалов, участие в следственных действиях,
              подготовку процессуальных документов и представление интересов
              доверителя в суде.
            </p>
            <ul className="clean-list">
              <li>Понятное объяснение рисков и возможных действий</li>
              <li>Прямое взаимодействие без посредников</li>
              <li>Правовая позиция, основанная на материалах дела</li>
            </ul>
            <Link className="text-link" href="/ob-advokate">Подробнее об адвокате ↗</Link>
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Порядок работы</p>
              <h2>От первого звонка до завершения дела</h2>
            </div>
          </div>
          <ol className="process-grid">
            {[
              ["Первичный разговор", "Кратко определяем ситуацию и срочность участия."],
              ["Изучение материалов", "Анализируем документы, риски и процессуальный статус."],
              ["Стратегия защиты", "Согласовываем последовательность действий и позицию."],
              ["Представление интересов", "Участие в следственных действиях и судебных заседаниях."],
            ].map(([title, text], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="container review-panel">
          <div>
            <p className="eyebrow">Отзывы доверителей</p>
            <blockquote>
              «Для меня важно, чтобы доверитель понимал происходящее, свои права
              и логику каждого следующего шага».
            </blockquote>
            <p className="quote-author">Дмитрий Рожновский</p>
          </div>
          <div className="review-source">
            <span className="review-score">5,0</span>
            <div aria-label="Пять звёзд">★★★★★</div>
            <p>Актуальные отзывы доступны в профиле адвоката на Яндексе.</p>
            <a
              className="button button-light"
              href="https://yandex.ru/profile/143096616667?lang=ru"
              target="_blank"
              rel="noreferrer"
            >
              Читать отзывы
            </a>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow eyebrow-dark">Вопросы и ответы</p>
            <h2>Что важно знать до обращения</h2>
            <p>Короткие ответы на вопросы, которые чаще всего возникают в начале работы.</p>
          </div>
          <div className="faq-list">
            {faq.map((item, index) => (
              <details key={item.question}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container contact-cta-grid">
          <div>
            <p className="eyebrow">Консультация адвоката</p>
            <h2>Опишите ситуацию лично и конфиденциально</h2>
            <p>
              Для срочной связи позвоните или напишите в Telegram. Приём проводится
              по предварительной договорённости.
            </p>
          </div>
          <div className="contact-actions">
            <a className="contact-phone" href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a className="button" href={contact.telegram} target="_blank" rel="noreferrer">
              Написать в Telegram
            </a>
            <Link className="button button-ghost" href="/kontakty">Все контакты</Link>
          </div>
        </div>
      </section>

      <a className="mobile-call" href={contact.phoneHref}>Позвонить адвокату</a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
