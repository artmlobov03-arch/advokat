import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "../../components/JsonLd";
import { attorneySchema, breadcrumbSchema } from "../../data/seo";
import {
  absoluteUrl,
  contact,
  practiceCases,
  siteConfig,
} from "../../data/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return practiceCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = practiceCases.find((practiceCase) => practiceCase.slug === slug);

  if (!item) return {};

  return {
    title: item.seoTitle ?? item.title,
    description: `${item.result} Обезличенные материалы дела и результат работы адвоката Дмитрия Рожновского.`,
    alternates: { canonical: `/praktika/${item.slug}` },
    openGraph: {
      title: `${item.title} — адвокат Дмитрий Рожновский`,
      description: item.result,
      url: `/praktika/${item.slug}`,
    },
  };
}

export default async function PracticeCasePage({ params }: PageProps) {
  const { slug } = await params;
  const item = practiceCases.find((practiceCase) => practiceCase.slug === slug);

  if (!item) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: item.title,
        description: item.result,
        url: absoluteUrl(`/praktika/${item.slug}`),
        mainEntityOfPage: absoluteUrl(`/praktika/${item.slug}`),
        image: absoluteUrl("/og.jpg"),
        dateModified: siteConfig.contentUpdatedAt,
        inLanguage: "ru-RU",
        author: attorneySchema,
      },
      breadcrumbSchema([
        { name: "Главная", path: "/" },
        { name: "Практика", path: "/praktika" },
        { name: item.title, path: `/praktika/${item.slug}` },
      ]),
    ],
  };

  return (
    <main>
      <section className="inner-hero practice-detail-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Главная</Link> /{" "}
            <Link href="/praktika">Практика</Link> / Решение
          </div>
          <p className="eyebrow">{item.article}</p>
          <h1>{item.title}</h1>
          <p className="hero-lead">{item.result}</p>
        </div>
      </section>

      <section className="content-page practice-detail">
        <div className="container">
          <div className="practice-summary">
            <div>
              <p className="eyebrow eyebrow-dark">Результат защиты</p>
              <h2>Материалы дела</h2>
            </div>
            <div>
              <p>{item.description}</p>
              <p className="practice-disclaimer">
                Документы опубликованы исключительно для подтверждения практики.
                Персональные данные участников и реквизиты, позволяющие их
                идентифицировать, скрыты.
              </p>
            </div>
          </div>

          <div className="document-gallery">
            {item.documents.map((document, index) => (
              <a
                className="document-page"
                href={document}
                target="_blank"
                rel="noreferrer"
                key={document}
                aria-label={`Открыть страницу ${index + 1} документа`}
              >
                <span>Страница {String(index + 1).padStart(2, "0")}</span>
                <Image
                  src={document
                    .replace("/practice/", "/practice-thumbs/")
                    .replace(/\.jpg$/u, ".webp")}
                  alt={`Обезличенный документ по делу: страница ${index + 1}`}
                  width={900}
                  height={1216}
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  unoptimized
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container contact-cta-grid">
          <div>
            <p className="eyebrow">Нужна оценка ситуации?</p>
            <h2>Обсудите обстоятельства дела конфиденциально</h2>
            <p>
              Результат зависит от фактов и материалов конкретного производства.
              Для первичной оценки свяжитесь с адвокатом.
            </p>
          </div>
          <div className="contact-actions">
            <a className="contact-phone" href={contact.phoneHref}>
              {contact.phoneDisplay}
            </a>
            <a
              className="button"
              href={contact.telegram}
              target="_blank"
              rel="noreferrer"
            >
              Получить консультацию
            </a>
          </div>
        </div>
      </section>

      <a className="mobile-call" href={contact.phoneHref}>
        Позвонить адвокату
      </a>
      <JsonLd data={schema} />
    </main>
  );
}
