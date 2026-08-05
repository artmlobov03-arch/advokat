import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";
import { breadcrumbSchema } from "../data/seo";
import { absoluteUrl, contact, practiceCases } from "../data/site";

export const metadata: Metadata = {
  title: "Практика по уголовным делам",
  description:
    "Практика адвоката Дмитрия Рожновского: прекращение уголовных дел, реабилитация, переквалификация обвинения и примирение сторон.",
  alternates: { canonical: "/praktika" },
  openGraph: {
    title: "Практика по уголовным делам — адвокат Дмитрий Рожновский",
    description:
      "Обезличенные результаты по делам о мошенничестве, ДТП, наркотиках и преступлениях против собственности.",
    url: "/praktika",
  },
};

const practiceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Практика адвоката Дмитрия Рожновского",
      itemListElement: practiceCases.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${item.title} — ${item.article}`,
        url: absoluteUrl(`/praktika/${item.slug}`),
      })),
    },
    breadcrumbSchema([
      { name: "Главная", path: "/" },
      { name: "Практика", path: "/praktika" },
    ]),
  ],
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
            Прекращение уголовного преследования, реабилитация, примирение
            сторон и изменение первоначальной квалификации обвинения.
          </p>
        </div>
      </section>
      <section className="content-page">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow eyebrow-dark">Избранные дела</p><h2>Результаты и правовая позиция</h2></div>
            <p>
              Результаты подтверждаются судебными и процессуальными
              документами. Перечень опубликован без раскрытия персональных
              данных доверителей.
            </p>
          </div>
          <div className="practice-cards">
            {practiceCases.map((item, index) => (
              <article className="practice-card" key={item.slug}>
                <div className="practice-card-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.article}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.result}</p>
                <div className="practice-card-footer">
                  <span>{item.documents.length} стр. документов</span>
                  <Link href={`/praktika/${item.slug}`}>
                    Смотреть решение <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="privacy-note">
            Все опубликованные документы обезличены: скрыты данные доверителей,
            судей, прокуроров, следователей и иных участников производства.
            Сохранены только сведения об адвокате Рожновском Дмитрии
            Владимировиче.
          </p>
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
      <JsonLd data={practiceSchema} />
    </main>
  );
}
