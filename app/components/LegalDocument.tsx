import Link from "next/link";
import { Fragment } from "react";

type LegalRun = {
  text: string;
  bold: boolean;
  italic: boolean;
  href: string | null;
};

type LegalTextBlock = {
  kind: "title" | "heading" | "subheading" | "paragraph" | "bullet";
  text: string;
  runs: LegalRun[];
};

type LegalTableBlock = {
  kind: "table";
  rows: string[][];
};

export type LegalDocumentData = {
  title: string;
  revision: string;
  blocks: Array<LegalTextBlock | LegalTableBlock>;
};

function renderRuns(runs: LegalRun[]) {
  return runs.map((run, index) => {
    let content = <>{run.text}</>;

    if (run.italic) content = <em>{content}</em>;
    if (run.bold) content = <strong>{content}</strong>;
    if (run.href) {
      content = (
        <a href={run.href} target="_blank" rel="noreferrer">
          {content}
        </a>
      );
    }

    return <Fragment key={`${index}-${run.text}`}>{content}</Fragment>;
  });
}

export function LegalDocument({ document }: { document: LegalDocumentData }) {
  const headings = document.blocks
    .map((block, index) => ({ block, index }))
    .filter(
      (item): item is { block: LegalTextBlock; index: number } =>
        item.block.kind === "heading",
    );

  return (
    <main>
      <section className="inner-hero legal-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Главная</Link> / Правовые документы
          </div>
          <p className="eyebrow">Правовая информация</p>
          <h1>{document.title}</h1>
          <p className="legal-hero-note">
            Документ размещён в открытом доступе для ознакомления пользователей
            сайта.
          </p>
        </div>
      </section>

      <section className="content-page legal-page-section">
        <div className="container legal-layout">
          <aside className="legal-navigation" aria-label="Содержание документа">
            <div className="legal-navigation-inner">
              <span className="legal-navigation-label">Документ</span>
              <strong>{document.revision}</strong>
              <p>Содержание</p>
              <nav>
                {headings.map(({ block, index }) => (
                  <a key={index} href={`#legal-section-${index}`}>
                    {block.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="legal-document" id="document">
            <header className="legal-document-header">
              <span>Официальный документ</span>
              <h2>{document.title}</h2>
              <p>{document.revision}</p>
            </header>

            <div className="legal-document-body">
              {document.blocks.map((block, index) => {
                if (block.kind === "title") return null;

                if (block.kind === "table") {
                  return (
                    <div className="legal-table-wrap" key={index}>
                      <table>
                        <tbody>
                          {block.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => {
                                const Cell = rowIndex === 0 ? "th" : "td";
                                return <Cell key={cellIndex}>{cell}</Cell>;
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                if (block.kind === "heading") {
                  return (
                    <h2 id={`legal-section-${index}`} key={index}>
                      {renderRuns(block.runs)}
                    </h2>
                  );
                }

                if (block.kind === "subheading") {
                  return <h3 key={index}>{renderRuns(block.runs)}</h3>;
                }

                if (block.kind === "bullet") {
                  return (
                    <div className="legal-bullet" key={index}>
                      <span aria-hidden="true" />
                      <p>{renderRuns(block.runs)}</p>
                    </div>
                  );
                }

                return <p key={index}>{renderRuns(block.runs)}</p>;
              })}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
