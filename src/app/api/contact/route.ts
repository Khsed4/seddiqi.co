import { createHash } from "node:crypto";
import { validateContact } from "@/lib/contact";
import { email } from "@/data/projects";

export const runtime = "nodejs";

// Best-effort per-instance protection. Configure host-level rate limiting for
// deployments with multiple instances; no message content is retained here.
const attempts = new Map<string, { count: number; until: number }>();
const windowMs = 15 * 60 * 1000;
const maxBytes = 12_000;

function failure(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const origin = process.env.CONTACT_SITE_ORIGIN || new URL(request.url).origin;
  if (request.headers.get("origin") !== origin) return failure("Please submit this form from the portfolio website.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return failure("Unsupported request format.", 415);
  if (Number(request.headers.get("content-length")) > maxBytes) return failure("Please shorten your message.", 413);

  const reader = request.body?.getReader();
  if (!reader) return failure("Please complete all required fields.", 400);
  let text = "";
  let size = 0;
  const decoder = new TextDecoder();
  let data: unknown;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        return failure("Please shorten your message.", 413);
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    data = JSON.parse(text + decoder.decode());
  } catch {
    return failure("Please check the form and try again.", 400);
  }
  const message = validateContact(data);
  if (!message) return failure("Please check your name, email, topic, and message (10–1,500 characters).", 400);

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) return failure("Direct sending is unavailable. Please use the email draft option below.", 503);

  const now = Date.now();
  for (const [id, entry] of attempts) if (entry.until <= now) attempts.delete(id);
  const address = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const id = createHash("sha256").update(address).digest("hex");
  const attempt = attempts.get(id) ?? { count: 0, until: now + windowMs };
  if (attempt.count >= 5 || (!attempts.has(id) && attempts.size >= 5000)) {
    return Response.json({ error: "Too many attempts. Please try again in 15 minutes or email me directly." }, { status: 429, headers: { "Retry-After": "900" } });
  }
  attempts.set(id, { count: attempt.count + 1, until: attempt.until });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `portfolio-${message.submissionId}` },
      body: JSON.stringify({
        from,
        to: [email],
        reply_to: message.email,
        subject: `${message.topic} — ${message.name}`,
        text: `From: ${message.name}\nReply to: ${message.email}\nTopic: ${message.topic}\n\n${message.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return failure("Your message could not be submitted. Please try again or use an email draft.", 502);
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string") {
      return failure("Submission could not be confirmed. Please retry or use an email draft.", 502);
    }
    return Response.json({ success: true });
  } catch {
    return failure("Submission could not be confirmed. Your message is still here; please retry or use an email draft.", 502);
  }
}
