import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  robots: { index: false, follow: true },
};

export default function ConsentPage() {
  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">Главная</Link> / Документы</div>
          <h1>Согласие на обработку персональных данных</h1>
        </div>
      </section>
      <section className="content-page">
        <article className="container legal-copy">
          <p>Отправляя обращение через сайт, пользователь подтверждает добровольное согласие на обработку указанных им данных в целях получения ответа и организации консультации.</p>
          <p>Согласие распространяется на сбор, систематизацию, хранение и использование данных исключительно в заявленных целях.</p>
          <p>Пользователь может отозвать согласие, направив соответствующее обращение владельцу сайта.</p>
          <p><strong>Перед публикацией на основном домене текст необходимо проверить и дополнить реквизитами оператора персональных данных.</strong></p>
        </article>
      </section>
    </main>
  );
}
