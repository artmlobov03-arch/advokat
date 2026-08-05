import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "../../components/JsonLd";
import { attorneySchema, breadcrumbSchema } from "../../data/seo";
import {
  absoluteUrl,
  advice,
  contact,
  siteConfig,
} from "../../data/site";

export function generateStaticParams() {
  return advice.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = advice.find((item) => item.slug === slug);
  if (!article) return {};

  return {
    title: article.seoTitle ?? article.question,
    description: article.summary,
    alternates: { canonical: `/statyi/${article.slug}` },
    openGraph: {
      type: "article",
      title: `${article.question} — совет уголовного адвоката`,
      description: article.summary,
      url: `/statyi/${article.slug}`,
    },
  };
}

export default async function AdvicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = advice.find((item) => item.slug === slug);
  if (!article) notFound();

  const related = advice
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.question,
        description: article.summary,
        url: absoluteUrl(`/statyi/${article.slug}`),
        mainEntityOfPage: absoluteUrl(`/statyi/${article.slug}`),
        image: absoluteUrl("/og.jpg"),
        dateModified: siteConfig.contentUpdatedAt,
        inLanguage: "ru-RU",
        author: attorneySchema,
        publisher: {
          "@type": "Organization",
          name: "ПКА «СЕД ЛЕКС»",
        },
      },
      breadcrumbSchema([
        { name: "Главная", path: "/" },
        { name: "Статьи", path: "/statyi" },
        { name: article.question, path: `/statyi/${article.slug}` },
      ]),
    ],
  };

  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Главная</Link> / <Link href="/statyi">Статьи</Link> / {article.category}
          </div>
          <p className="eyebrow">Советы уголовного адвоката</p>
          <h1>{article.question}</h1>
          <p className="hero-lead">{article.summary}</p>
        </div>
      </section>

      <section className="content-page">
        <div className="container content-grid">
          <article className="content-prose">
            {article.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {article.steps && (
              <>
                <h2>Последовательность действий</h2>
                <ul className="inner-list">
                  {article.steps.map((step) => <li key={step}>{step}</li>)}
                </ul>
              </>
            )}

            <h2>Почему важно обратиться к защитнику заранее</h2>
            <p>
              Первые объяснения и процессуальные документы могут повлиять на
              дальнейшее развитие ситуации. До принятия решений адвокату
              необходимо установить ваш статус, изучить имеющиеся документы и
              оценить возможные риски.
            </p>
            <p>
              Материал носит общий информационный характер и не заменяет
              персональную юридическую консультацию.
            </p>
          </article>

          <aside className="sidebar-card">
            <p className="eyebrow">Срочная помощь</p>
            <h2>Обсудить ситуацию конфиденциально</h2>
            <p>
              При задержании, допросе или приводе не откладывайте обращение к
              защитнику.
            </p>
            <a className="contact-phone" href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a className="button" href={contact.telegram} target="_blank" rel="noreferrer">
              Написать в Telegram
            </a>
          </aside>
        </div>
      </section>

      <section className="section section-about">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Другие материалы</p>
              <h2>Практические рекомендации</h2>
            </div>
          </div>
          <div className="inner-cards">
            {related.map((item) => (
              <Link className="inner-card" href={`/statyi/${item.slug}`} key={item.slug}>
                <span>{item.category}</span>
                <h3>{item.question}</h3>
                <p>{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <a className="mobile-call" href={contact.phoneHref}>Позвонить адвокату</a>
      <JsonLd data={articleSchema} />
    </main>
  );
}
