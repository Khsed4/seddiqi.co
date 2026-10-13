// Renders the /resume page to public/abdulkhaliq-sediqi-resume.pdf using
// headless Firefox over WebDriver BiDi. No dependencies; needs Node 22+ and
// Firefox, and the site running (npm run build && npm start).
//
//   node scripts/generate-resume-pdf.mjs [url]
import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const url = process.argv[2] ?? "http://localhost:3000/resume";
const output = path.resolve("public/abdulkhaliq-sediqi-resume.pdf");
const port = 9333;
// Inside the project so a sandboxed (snap) Firefox can reach it.
const profile = await mkdtemp(path.resolve("tmp-firefox-profile-"));

const firefox = spawn(
  "firefox",
  ["--headless", "--no-remote", "--profile", profile, `--remote-debugging-port=${port}`],
  { stdio: ["ignore", "ignore", "pipe"] },
);

async function cleanup() {
  firefox.kill();
  await new Promise((resolve) => setTimeout(resolve, 500));
  await rm(profile, { recursive: true, force: true });
}

try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Firefox did not start its BiDi server in time.")), 30_000);
    firefox.stderr.on("data", (chunk) => {
      if (String(chunk).includes("WebDriver BiDi listening")) {
        clearTimeout(timer);
        resolve();
      }
    });
    firefox.on("error", reject);
  });

  const socket = new WebSocket(`ws://127.0.0.1:${port}/session`);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", () => reject(new Error("Could not connect to Firefox.")), { once: true });
  });

  let nextId = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.type === "error") waiter.reject(new Error(`${message.error}: ${message.message}`));
    else waiter.resolve(message.result);
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++nextId;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });

  await send("session.new", { capabilities: {} });
  const tree = await send("browsingContext.getTree");
  const context = tree.contexts[0].context;
  await send("browsingContext.navigate", { context, url, wait: "complete" });
  const { data } = await send("browsingContext.print", {
    context,
    background: true,
    page: { width: 21, height: 29.7 },
    margin: { top: 1.3, bottom: 1.3, left: 1.4, right: 1.4 },
  });
  await writeFile(output, Buffer.from(data, "base64"));
  socket.close();
  console.log(`Wrote ${output}`);
} finally {
  await cleanup();
}
