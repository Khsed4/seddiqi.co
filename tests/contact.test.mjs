import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const compile = (path) => ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const validation = { exports: {} };
vm.runInNewContext(compile("../src/lib/contact.ts"), { exports: validation.exports });
const input = { name: "Review & Test", email: "review@example.com", topic: "Project inquiry", message: "A project inquiry with <markup> and line breaks.\nPlease reply.", website: "", submissionId: "c4fb3d8e-742f-412c-a1fb-f5381f74e307" };

function handler(fetch = async () => Response.json({ id: "test-only" }), env = { RESEND_API_KEY: "fake-test-key", CONTACT_FROM_EMAIL: "Portfolio <hello@example.com>" }) {
  const routeModule = { exports: {} };
  vm.runInNewContext(compile("../src/app/api/contact/route.ts"), {
    exports: routeModule.exports, Request, Response, URL, TextDecoder, AbortSignal,
    process: { env }, fetch,
    require: (name) => name === "@/lib/contact" ? validation.exports : name === "@/data/projects" ? { email: "owner@example.com" } : require(name),
  });
  return routeModule.exports.POST;
}

function request(data = input, headers = {}) {
  return new Request("https://portfolio.example/api/contact", { method: "POST", headers: { origin: "https://portfolio.example", "content-type": "application/json", ...headers }, body: JSON.stringify(data) });
}

test("valid message goes to fixed recipient with reply-to, plain text and idempotency", async () => {
  let sent;
  const post = handler(async (url, options) => { sent = { url, ...options }; return Response.json({ id: "accepted" }); });
  assert.equal((await post(request())).status, 200);
  assert.equal(sent.url, "https://api.resend.com/emails");
  const body = JSON.parse(sent.body);
  assert.deepEqual(body.to, ["owner@example.com"]);
  assert.equal(body.reply_to, input.email);
  assert.equal(body.from, "Portfolio <hello@example.com>");
  assert(body.text.includes(input.message));
  assert.equal(body.html, undefined);
  assert.equal(sent.headers["Idempotency-Key"], `portfolio-${input.submissionId}`);
});

test("rejects invalid fields and honeypot without contacting provider", async () => {
  const post = handler(() => assert.fail("Provider must not be called"));
  for (const change of [{ name: " " }, { name: "Name\r\nBcc: injected" }, { email: "invalid" }, { topic: "Unknown" }, { message: "     " }, { message: "x".repeat(1501) }, { website: "spam" }, { submissionId: "invalid" }]) {
    assert.equal((await post(request({ ...input, ...change }))).status, 400);
  }
});

test("rejects cross-origin and non-JSON requests", async () => {
  const post = handler();
  assert.equal((await post(request(input, { origin: "https://elsewhere.example" }))).status, 403);
  assert.equal((await post(request(input, { "content-type": "text/plain" }))).status, 415);
});

test("rejects oversized body without trusting content-length", async () => {
  assert.equal((await handler()(request({ ...input, message: "x".repeat(13000) }))).status, 413);
});

test("unconfigured delivery reports unavailable without attempting send", async () => {
  assert.equal((await handler(() => assert.fail("Must not send"), {})(request())).status, 503);
});

test("provider errors and timeouts never produce success or expose secrets", async () => {
  for (const upstream of [async () => Response.json({ error: "private provider detail" }, { status: 401 }), async () => { throw new Error("secret diagnostic"); }, async () => Response.json({})]) {
    const result = await handler(upstream)(request());
    assert.equal(result.status, 502);
    const body = await result.text();
    assert(!body.includes("private provider detail") && !body.includes("secret diagnostic"));
  }
});

test("limits repeated attempts per server instance", async () => {
  const post = handler();
  for (let i = 0; i < 5; i++) assert.equal((await post(request())).status, 200);
  const limited = await post(request());
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("Retry-After"), "900");
});
