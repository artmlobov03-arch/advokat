import Link from "next/link";
import { contact, services } from "../data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand brand-light" href="/">
            <span className="brand-mark">ДР</span>
            <span>
              <strong>Дмитрий Рожновский</strong>
              <small>адвокат · ПКА «СЕД ЛЕКС»</small>
            </span>
          </Link>
          <p className="footer-note">
            Профессиональная защита доверителей по уголовным делам в Подольске,
            Москве и Московской области.
          </p>
        </div>
        <div>
          <p className="footer-title">Направления</p>
          <div className="footer-links">
            {services.slice(0, 4).map((service) => (
              <Link key={service.slug} href={`/uslugi/${service.slug}`}>
                {service.shortTitle}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="footer-title">Контакты</p>
          <div className="footer-links">
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.map} target="_blank" rel="noreferrer">
              {contact.address}
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Адвокат Рожновский Д.В.</span>
        <div>
          <Link href="/politika">Политика конфиденциальности</Link>
          <Link href="/soglasie">Согласие на обработку данных</Link>
        </div>
      </div>
    </footer>
  );
}
