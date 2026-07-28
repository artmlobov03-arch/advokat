import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <p className="eyebrow">Ошибка 404</p>
          <h1>Страница не найдена</h1>
          <p className="hero-lead">Возможно, адрес изменился или в ссылке допущена ошибка.</p>
          <div className="hero-actions"><Link className="button" href="/">Вернуться на главную</Link></div>
        </div>
      </section>
    </main>
  );
}
