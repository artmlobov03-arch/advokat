import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
  IMAGES: {
    input() {
      throw new Error("Image optimization is disabled for this project");
    },
  },
};

const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

function request(path, init) {
  return worker.fetch(
    new Request(`https://xn----7sbbahcndsmamrwi2a7b2a6n.xn--p1ai${path}`, init),
    env,
    ctx,
  );
}

async function countFiles(url) {
  const entries = await readdir(url, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? countFiles(new URL(`${entry.name}/`, url))
        : Promise.resolve(1),
    ),
  );
  return nested.reduce((total, count) => total + count, 0);
}

test("главная страница содержит SEO и защитные заголовки", async () => {
  const response = await request("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);
  assert.match(response.headers.get("strict-transport-security") ?? "", /max-age=31536000/);

  const html = await response.text();
  assert.match(html, /<html lang="ru">/);
  assert.match(html, /<h1[\s>]/);
  assert.match(html, /rel="canonical" href="https:\/\/xn----7sbbahcndsmamrwi2a7b2a6n\.xn--p1ai\/"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Настройки файлов cookie/);
});

test("все URL из sitemap отвечают успешно и имеют canonical", async () => {
  const sitemapResponse = await request("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
  assert.equal(urls.length, 31);

  const responses = await Promise.all(urls.map((url) => request(url.pathname)));
  for (const response of responses) {
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /<h1[\s>]/);
    assert.match(html, /rel="canonical"/);
  }
});

test("старые маршруты перенаправляются на новые", async () => {
  const redirects = new Map([
    ["/about", "/ob-advokate"],
    ["/contact", "/kontakty"],
    ["/faq", "/statyi"],
    ["/practice-area", "/praktika"],
  ]);

  for (const [from, to] of redirects) {
    const response = await request(from, { redirect: "manual" });
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get("location")).pathname, to);
  }
});

test("карта не встраивается до согласия, а форма требует согласие", async () => {
  const contactsResponse = await request("/kontakty");
  const html = await contactsResponse.text();
  assert.match(html, /Карта не загружена/);
  assert.doesNotMatch(html, /<iframe[^>]+google\.com\/maps/i);
  assert.match(html, /условия обработки персональных данных/);

  const apiResponse = await request("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Sec-Fetch-Site": "same-origin",
    },
    body: JSON.stringify({
      fullName: "Тестовый Пользователь",
      email: "test@example.com",
      phone: "+79990000000",
      problem: "Проверка обязательного согласия без отправки письма",
    }),
  });
  assert.equal(apiResponse.status, 400);
  assert.deepEqual(await apiResponse.json(), {
    error: "Заполните все поля и подтвердите согласие",
  });
});

test("юридические страницы исправлены и закрыты от индексации", async () => {
  const response = await request("/politika");
  const html = await response.text();
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.match(html, /rel="canonical" href="https:\/\/xn----7sbbahcndsmamrwi2a7b2a6n\.xn--p1ai\/politika"/);

  const documents = await readFile(
    new URL("../app/data/legal-documents.json", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(documents, /advokat-skvortsov/);
  assert.doesNotMatch(documents, /https:\/[^/]/);
});

test("опубликованы 60 оригиналов и 60 облегчённых превью", async () => {
  const originals = await countFiles(new URL("../public/practice/", import.meta.url));
  const thumbnails = await countFiles(new URL("../public/practice-thumbs/", import.meta.url));
  assert.equal(originals, 60);
  assert.equal(thumbnails, 60);

  const response = await request("/praktika/otmena-prigovora-111");
  const html = await response.text();
  assert.match(html, /\/practice-thumbs\/novikov-111\/appeal-1\.webp/);
  assert.match(html, /href="\/practice\/novikov-111\/appeal-1\.jpg"/);
});
