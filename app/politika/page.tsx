import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "../data/site";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">Главная</Link> / Документы</div>
          <h1>Политика конфиденциальности</h1>
        </div>
      </section>
      <section className="content-page">
        <article className="container legal-copy">
          <p>Настоящая политика описывает общий порядок обработки информации, которую пользователь добровольно передаёт через сайт.</p>
          <h2>Какие данные могут обрабатываться</h2>
          <p>Имя, номер телефона, адрес электронной почты и информация, указанная пользователем в обращении.</p>
          <h2>Цель обработки</h2>
          <p>Связь с пользователем, рассмотрение обращения и организация консультации.</p>
          <h2>Передача данных</h2>
          <p>Данные не используются для массовых рассылок и не передаются третьим лицам, кроме случаев, предусмотренных законодательством.</p>
          <h2>Контакты</h2>
          <p>Вопросы по обработке данных можно направить на адрес <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
          <p><strong>Перед публикацией на основном домене документ необходимо проверить и дополнить реквизитами оператора персональных данных.</strong></p>
        </article>
      </section>
    </main>
  );
}
