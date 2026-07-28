import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "../data/site";

export const metadata: Metadata = {
  title: "Статьи и правовые советы",
  description:
    "Практические рекомендации адвоката: задержание, обыск, допрос и первые действия по уголовному делу.",
  alternates: { canonical: "/statyi" },
};

const articles = [
  ["Задержание", "Что делать, если вас задержали", "Главные правила поведения до прибытия защитника."],
  ["Следственные действия", "Как вести себя во время обыска", "Какие права есть у присутствующих и что важно зафиксировать."],
  ["Допрос", "Можно ли отказаться от дачи показаний", "Процессуальный статус, статья 51 Конституции и участие адвоката."],
];

export default function ArticlesPage() {
  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">Главная</Link> / Статьи</div>
          <p className="eyebrow">Правовые рекомендации</p>
          <h1>Как действовать в сложной ситуации</h1>
          <p className="hero-lead">Понятные материалы о первых действиях при взаимодействии со следствием и правоохранительными органами.</p>
        </div>
      </section>
      <section className="content-page">
        <div className="container">
          <div className="inner-cards">
            {articles.map(([category, title, text]) => (
              <article className="inner-card" key={title}>
                <span>{category}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <a className="mobile-call" href={contact.phoneHref}>Позвонить адвокату</a>
    </main>
  );
}
