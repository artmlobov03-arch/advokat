import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";
import { breadcrumbSchema } from "../data/seo";
import { absoluteUrl, advice, contact } from "../data/site";

export const metadata: Metadata = {
  title: "Советы при задержании и допросе",
  description:
    "Что делать при задержании, допросе, приводе или возбуждении уголовного дела. Практические рекомендации уголовного адвоката в Подольске.",
  alternates: { canonical: "/statyi" },
  openGraph: {
    title: "Правовые советы адвоката Дмитрия Рожновского",
    description:
      "Первые действия при задержании, допросе и других процессуальных ситуациях.",
    url: "/statyi",
  },
};

const articlesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Правовые советы адвоката Дмитрия Рожновского",
      url: absoluteUrl("/statyi"),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: advice.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.question,
          url: absoluteUrl(`/statyi/${item.slug}`),
        })),
      },
    },
    breadcrumbSchema([
      { name: "Главная", path: "/" },
      { name: "Статьи", path: "/statyi" },
    ]),
  ],
};

export default function ArticlesPage() {
  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">Главная</Link> / Статьи</div>
          <p className="eyebrow">Правовые рекомендации</p>
          <h1>Как действовать при задержании и вызове на допрос</h1>
          <p className="hero-lead">
            Практические рекомендации о первых действиях при взаимодействии
            со следствием и правоохранительными органами.
          </p>
        </div>
      </section>

      <section className="content-page">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Советы адвоката</p>
              <h2>Спокойствие и правильная последовательность действий</h2>
            </div>
            <p>
              Материалы основаны на рекомендациях со старого сайта и
              структурированы по отдельным ситуациям. Они носят общий
              информационный характер: тактика зависит от статуса, документов
              и обстоятельств конкретного дела.
            </p>
          </div>
          <div className="inner-cards">
            {advice.map((item, index) => (
              <Link className="inner-card" href={`/statyi/${item.slug}`} key={item.slug}>
                <span>{String(index + 1).padStart(2, "0")} · {item.category}</span>
                <h3>{item.question}</h3>
                <p>{item.summary}</p>
                <strong className="card-link">Читать рекомендацию <b>↗︎</b></strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container contact-cta-grid">
          <div>
            <p className="eyebrow">Срочная помощь</p>
            <h2>Если ситуация уже развивается — не откладывайте звонок</h2>
            <p>
              При задержании, обыске или вызове на допрос время имеет значение.
              До консультации не давайте необдуманных объяснений.
            </p>
          </div>
          <div className="contact-actions">
            <a className="contact-phone" href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a className="button" href={contact.telegram} target="_blank" rel="noreferrer">
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>

      <a className="mobile-call" href={contact.phoneHref}>Позвонить адвокату</a>
      <JsonLd data={articlesSchema} />
    </main>
  );
}
