import { contact } from "../../data/site";

type ContactRequest = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  problem?: unknown;
  company?: unknown;
  consent?: unknown;
  consentVersion?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d{10,15}$/;
const PERSONAL_DATA_CONSENT_VERSION = "2026-08-04";
const MAX_BODY_LENGTH = 12_000;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestsByIp = new Map<string, number[]>();

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function json(data: Record<string, unknown>, status = 200, headers?: HeadersInit) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function clientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW,
  );

  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  requestsByIp.set(ip, recent);
  return false;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  let body: ContactRequest;

  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return json({ error: "Запрос с другого сайта запрещён" }, 403);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_LENGTH) {
    return json({ error: "Запрос слишком большой" }, 413);
  }

  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_LENGTH) {
      return json({ error: "Запрос слишком большой" }, 413);
    }
    body = JSON.parse(rawBody) as ContactRequest;
  } catch {
    return json({ error: "Некорректный запрос" }, 400);
  }

  // Hidden field: bots usually fill it, real visitors never see it.
  if (clean(body.company, 120)) {
    return json({ ok: true });
  }

  const fullName = clean(body.fullName, 120).replace(/[\r\n]+/gu, " ");
  const email = clean(body.email, 160).toLowerCase();
  const phone = clean(body.phone, 40).replace(/[\r\n]+/gu, " ");
  const phoneDigits = phone.replace(/\D/g, "");
  const problem = clean(body.problem, 5000);
  const consentVersion = clean(body.consentVersion, 32);

  if (
    fullName.length < 3 ||
    !emailPattern.test(email) ||
    !phonePattern.test(phoneDigits) ||
    problem.length < 10 ||
    body.consent !== true ||
    consentVersion !== PERSONAL_DATA_CONSENT_VERSION
  ) {
    return json({ error: "Заполните все поля и подтвердите согласие" }, 400);
  }

  if (isRateLimited(clientIp(request))) {
    return json(
      { error: "Слишком много заявок. Повторите попытку позже" },
      429,
      { "Retry-After": "600" },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || contact.email;

  if (!apiKey || !fromEmail) {
    return json({ error: "Отправка пока не настроена" }, 503);
  }

  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeProblem = escapeHtml(problem).replaceAll("\n", "<br />");

  let response: Response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Заявка с сайта — ${fullName}`,
        text: [
          `ФИО: ${fullName}`,
          `Электронная почта: ${email}`,
          `Телефон: ${phone}`,
          "",
          "Описание ситуации:",
          problem,
          "",
          `Согласие на обработку ПД: версия ${consentVersion}`,
          `Получено: ${new Date().toISOString()}`,
        ].join("\n"),
        html: `
          <h2>Новая заявка с сайта</h2>
          <p><strong>ФИО:</strong> ${safeName}</p>
          <p><strong>Электронная почта:</strong> ${safeEmail}</p>
          <p><strong>Телефон:</strong> ${safePhone}</p>
          <p><strong>Описание ситуации:</strong></p>
          <p>${safeProblem}</p>
          <hr />
          <p><small>Согласие на обработку ПД: версия ${consentVersion}. Получено ${new Date().toISOString()}.</small></p>
        `,
      }),
    });
  } catch {
    return json({ error: "Сервис отправки недоступен" }, 502);
  }

  if (!response.ok) {
    return json({ error: "Сервис отправки недоступен" }, 502);
  }

  return json({ ok: true });
}
