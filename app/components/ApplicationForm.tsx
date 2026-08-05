"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";

const consentVersion = "2026-08-04";

type ApplicationFormProps = {
  recipientEmail: string;
};

export function ApplicationForm({ recipientEmail }: ApplicationFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: String(form.get("fullName") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? ""),
          problem: String(form.get("problem") ?? ""),
          company: String(form.get("company") ?? ""),
          consent: form.get("consent") === "on",
          consentVersion,
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      formElement.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <p className="eyebrow eyebrow-dark">Заявка на консультацию</p>
      <h2>Опишите вашу ситуацию</h2>
      <p>
        Заполните форму — заявка будет отправлена адвокату напрямую. Для срочной
        помощи лучше позвонить.
      </p>
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="company">Компания</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-grid">
        <div className="field field-full">
          <label htmlFor="fullName">ФИО</label>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder="Иванов Иван Иванович"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="email">Электронная почта</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.ru"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Номер телефона</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+7 999 000-00-00"
            required
          />
        </div>
        <div className="field field-full">
          <label htmlFor="problem">Описание проблемы</label>
          <textarea
            id="problem"
            name="problem"
            placeholder="Кратко опишите обстоятельства и укажите, насколько срочно требуется помощь"
            required
          />
        </div>
      </div>
      <label className="consent">
        <input name="consent" type="checkbox" required />
        <span>
          Я принимаю <Link href="/soglasie">условия обработки персональных данных</Link>.
        </span>
      </label>
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Отправляем…" : "Отправить заявку"}
      </button>
      {status === "success" && (
        <p className="form-status form-status-success" role="status">
          Заявка отправлена. С вами свяжутся по указанным контактам.
        </p>
      )}
      {status === "error" && (
        <p className="form-status form-status-error" role="alert">
          Не удалось отправить заявку. Попробуйте ещё раз или напишите на{" "}
          <a href={`mailto:${recipientEmail}`}>{recipientEmail}</a>.
        </p>
      )}
    </form>
  );
}
