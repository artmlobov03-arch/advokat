import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "../../components/JsonLd";
import { breadcrumbSchema, legalServiceSchema } from "../../data/seo";
import { absoluteUrl, contact, services } from "../../data/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: service.shortTitle,
    description: `${service.description} Консультация адвоката в Подольске, Москве и Московской области.`,
    alternates: { canonical: `/uslugi/${service.slug}` },
    openGraph: {
      title: `${service.title} — адвокат Дмитрий Рожновский`,
      description: service.description,
      url: `/uslugi/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const related = services.filter((item) => item.slug !== slug).slice(0, 3);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        url: absoluteUrl(`/uslugi/${service.slug}`),
        serviceType: service.shortTitle,
        description: service.description,
        areaServed: ["Подольск", "Москва", "Московская область"],
        provider: {
          ...legalServiceSchema,
          telephone: contact.phoneDisplay,
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
        { name: "Услуги", path: "/#services" },
        { name: service.shortTitle, path: `/uslugi/${service.slug}` },
      ]),
    ],
  };

  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">Главная</Link> / Услуги</div>
          <p className="eyebrow">{service.eyebrow}</p>
          <h1>{service.title}</h1>
          <p className="hero-lead">{service.description}</p>
        </div>
      </section>

      <section className="content-page">
        <div className="container content-grid">
          <article className="content-prose">
            <p>{service.intro}</p>
            <h2>Что важно на начальном этапе</h2>
            <p>
              До выработки позиции необходимо определить процессуальный статус,
              изучить вручённые документы и понять, какие действия уже
              проведены. Необдуманные объяснения, переписка с участниками или
              попытка самостоятельно исправить документы могут осложнить
              защиту. Оптимальный порядок действий определяется после
              конфиденциальной консультации.
            </p>
            <h2>Когда может потребоваться помощь</h2>
            <ul className="inner-list">
              {service.situations.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <h2>Как строится защита</h2>
            <ul className="inner-list">
              {service.approach.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p>
              Конкретный порядок действий определяется после изучения обстоятельств
              и документов. Консультация не является обещанием определённого
              процессуального результата.
            </p>
            <p>
              Ознакомьтесь также с <Link href="/praktika">обезличенной практикой</Link>
              {" "}и <Link href="/statyi">рекомендациями при задержании и допросе</Link>.
            </p>
          </article>
          <aside className="sidebar-card">
            <p className="eyebrow">Связаться с адвокатом</p>
            <h2>Обсудить ситуацию конфиденциально</h2>
            <a className="contact-phone" href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <p>Приём проводится по предварительной договорённости.</p>
            <a className="button" href={contact.telegram} target="_blank" rel="noreferrer">
              Написать в Telegram
            </a>
            <Link className="button button-ghost" href="/kontakty">Все контакты</Link>
          </aside>
        </div>
      </section>

      <section className="section section-about">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow eyebrow-dark">Другие направления</p><h2>Комплексная правовая помощь</h2></div>
          </div>
          <div className="inner-cards">
            {related.map((item) => (
              <Link className="inner-card" href={`/uslugi/${item.slug}`} key={item.slug}>
                <span>Услуга</span>
                <h3>{item.shortTitle}</h3>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <a className="mobile-call" href={contact.phoneHref}>Позвонить адвокату</a>
      <JsonLd data={serviceSchema} />
    </main>
  );
}
