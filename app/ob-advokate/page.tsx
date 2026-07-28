import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { contact } from "../data/site";

export const metadata: Metadata = {
  title: "Об адвокате",
  description:
    "Дмитрий Владимирович Рожновский — адвокат ПКА «СЕД ЛЕКС». Принципы работы, территория практики и контакты.",
  alternates: { canonical: "/ob-advokate" },
};

export default function AboutPage() {
  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">Главная</Link> / Об адвокате</div>
          <p className="eyebrow">Дмитрий Владимирович Рожновский</p>
          <h1>Профессиональная защита без лишних обещаний</h1>
          <p className="hero-lead">
            Адвокат ПКА «СЕД ЛЕКС». Уголовная защита в Подольске, Москве и
            Московской области.
          </p>
        </div>
      </section>
      <section className="section section-about">
        <div className="container about-grid">
          <div className="about-portrait">
            <Image src="/advokat-rozhnovskiy.webp" alt="Дмитрий Рожновский" fill sizes="(max-width: 800px) 100vw, 50vw" />
          </div>
          <article className="about-copy">
            <p className="eyebrow eyebrow-dark">Подход к работе</p>
            <h2>Доверитель должен понимать каждый следующий шаг</h2>
            <p className="lead">
              В уголовном деле нет универсальных решений. Защита начинается с
              внимательного изучения фактов и честной оценки рисков.
            </p>
            <p>
              Дмитрий Рожновский лично взаимодействует с доверителем, участвует
              в следственных действиях, готовит процессуальные документы и
              представляет интересы в суде.
            </p>
            <ul className="clean-list">
              <li>Конфиденциальность адвокатского общения</li>
              <li>Последовательная правовая позиция</li>
              <li>Понятная коммуникация без сложных формулировок</li>
              <li>Работа с документами и доказательствами по делу</li>
            </ul>
            <a className="button" href={contact.telegram} target="_blank" rel="noreferrer">Обсудить ситуацию</a>
          </article>
        </div>
      </section>
      <a className="mobile-call" href={contact.phoneHref}>Позвонить адвокату</a>
    </main>
  );
}
