import Link from "next/link";
import { contact } from "../data/site";

const links = [
  { href: "/#services", label: "Услуги" },
  { href: "/praktika", label: "Практика" },
  { href: "/ob-advokate", label: "Об адвокате" },
  { href: "/statyi", label: "Статьи" },
  { href: "/kontakty", label: "Контакты" },
];

export function Header() {
  return (
    <>
      <div className="notice-bar">
        <div className="container notice-inner">
          <span>Срочная правовая помощь при задержании, обыске или допросе</span>
          <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" href="/" aria-label="На главную">
            <span className="brand-mark">ДР</span>
            <span>
              <strong>Дмитрий Рожновский</strong>
              <small>адвокат · ПКА «СЕД ЛЕКС»</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Основная навигация">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <a className="button button-sm" href={contact.telegram} target="_blank" rel="noreferrer">
            Написать
          </a>
          <details className="mobile-menu">
            <summary aria-label="Открыть меню"><span /><span /></summary>
            <nav aria-label="Мобильная навигация">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
