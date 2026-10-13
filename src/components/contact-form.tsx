"use client";

import { useRef, useState, type FormEvent } from "react";
import { email } from "@/data/projects";
import { contactTopics } from "@/lib/contact";

export function ContactForm({ deliveryEnabled = false }: { deliveryEnabled?: boolean }) {
  const [draftReady, setDraftReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(0);
  const submissionId = useRef<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending") return;
    const form = event.currentTarget;
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const replyTo = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "").trim();
    if (message.length < 10) {
      const field = event.currentTarget.elements.namedItem("message");
      if (field instanceof HTMLTextAreaElement) {
        field.setCustomValidity("Please enter at least 10 characters, excluding surrounding spaces.");
        field.reportValidity();
      }
      return;
    }
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const draft = !deliveryEnabled || (submitter instanceof HTMLButtonElement && submitter.value === "draft");
    const body = `Hi Khaliq,\n\n${message}\n\nFrom: ${name}\nEmail: ${replyTo}`;
    if (draft) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`${topic} — ${name}`)}&body=${encodeURIComponent(body)}`;
      setDraftReady(true);
      setStatus("idle");
      return;
    }
    setStatus("pending");
    setDraftReady(false);
    setError("");
    submissionId.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: replyTo, topic, message, website: data.get("website"), submissionId: submissionId.current }),
        signal: AbortSignal.timeout(15_000),
      });
      const result: unknown = await response.json();
      if (!response.ok || !result || typeof result !== "object" || !("success" in result) || result.success !== true) {
        const detail = result && typeof result === "object" && "error" in result && typeof result.error === "string" ? result.error : "Your message could not be submitted. Please retry or use an email draft.";
        throw new Error(detail);
      }
      setStatus("sent");
      form.reset();
      setSelectedTopic("");
      setCharCount(0);
      submissionId.current = null;
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError" ? cause.message : "Submission could not be confirmed. Please retry or use an email draft.");
      setStatus("error");
    }
  }

  return (
    <form
      action={`mailto:${email}`}
      method="post"
      encType="text/plain"
      onSubmit={handleSubmit}
      onChange={() => {
        setDraftReady(false);
        if (status !== "pending") setStatus("idle");
        submissionId.current = null;
      }}
      className="contact-form p-6 sm:p-9"
      aria-labelledby="form-title"
      aria-describedby="form-description"
      aria-busy={status === "pending"}
    >
      <div className="border-b border-[var(--line)] pb-6">
        <h2 id="form-title" className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Prefer email? Send a message
        </h2>
        <p id="form-description" className="mt-2 text-sm leading-relaxed text-muted">
          {deliveryEnabled
            ? "Share a few details about your project or opportunity. I’ll use your email address to reply directly."
            : "Complete the form to send directly or prepare an email draft in your client."}
        </p>
      </div>

      <fieldset disabled={status === "pending"} className="min-w-0 border-0 p-0">
        <div hidden aria-hidden="true">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Name and Email */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-2">
              Your name <span className="text-[var(--accent)]" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="e.g. Alex Morgan"
              required
              maxLength={100}
              pattern=".*\S.*"
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-muted/60 transition-colors focus:border-[var(--accent)] focus:outline-hidden"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-2">
              Email address <span className="text-[var(--accent)]" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex@company.com"
              required
              maxLength={254}
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-muted/60 transition-colors focus:border-[var(--accent)] focus:outline-hidden"
            />
          </div>
        </div>

        {/* Quick Topic Chips & Dropdown */}
        <div className="mt-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <label htmlFor="contact-topic" className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
              What’s this about? <span className="text-[var(--accent)]" aria-hidden="true">*</span>
            </label>
            <span className="text-[0.6875rem] text-muted">Select or click a chip</span>
          </div>

          {/* Quick Click Chips */}
          <div className="mb-3 flex flex-wrap gap-2">
            {contactTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                  selectedTopic === topic
                    ? "bg-[var(--accent)] text-[var(--accent-ink)] shadow-xs"
                    : "border border-[var(--line)] bg-[var(--background)] text-muted hover:border-[var(--accent)]/50 hover:text-[var(--foreground)]"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          <select
            id="contact-topic"
            name="topic"
            value={selectedTopic}
            onChange={(event) => setSelectedTopic(event.target.value)}
            required
            className="w-full rounded-lg border border-[var(--line)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] transition-colors focus:border-[var(--accent)] focus:outline-hidden"
          >
            <option value="" disabled>Select a topic</option>
            {contactTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        {/* Message TextArea */}
        <div className="mt-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Your message <span className="text-[var(--accent)]" aria-hidden="true">*</span>
            </label>
            <span className="font-mono text-[0.6875rem] text-muted">
              {charCount}/1500 chars
            </span>
          </div>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={1500}
            onChange={(event) => {
              event.currentTarget.setCustomValidity("");
              setCharCount(event.currentTarget.value.length);
            }}
            placeholder="A little about your project or role, what you need, timing, and any relevant links."
            aria-describedby="message-hint"
            className="w-full rounded-lg border border-[var(--line)] bg-[var(--background)] p-4 text-sm leading-relaxed text-[var(--foreground)] placeholder:text-muted/60 transition-colors focus:border-[var(--accent)] focus:outline-hidden"
          />
          <p id="message-hint" className="mt-2 text-xs leading-5 text-muted">
            Minimum 10 characters. All fields are required.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={status === "pending"}
            className="button-accent disabled:opacity-50"
          >
            {status === "pending" ? (
              <span className="flex items-center gap-2">
                <span className="size-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Submitting…
              </span>
            ) : deliveryEnabled ? (
              <>Send message <span aria-hidden="true">↗</span></>
            ) : (
              <>Create email draft <span aria-hidden="true">↗</span></>
            )}
          </button>
          {deliveryEnabled && (
            <button
              type="submit"
              value="draft"
              className="rounded-lg border border-[var(--line)] bg-[var(--background)] px-4 py-3 text-xs font-medium text-muted hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-all cursor-pointer"
            >
              Open in email app instead
            </button>
          )}
        </div>
      </fieldset>

      {/* Status & Error */}
      {status === "error" && (
        <div role="alert" className="mt-5 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-foreground">
          <span className="font-semibold block mb-0.5">Could not submit</span>
          {error} Your form entries have been preserved.
        </div>
      )}

      {status === "sent" && (
        <div role="status" className="mt-5 rounded-lg border border-[var(--accent)] bg-[var(--accent)]/10 p-4 text-sm text-foreground">
          <span className="font-semibold block mb-0.5">Thank you!</span>
          Your message has been received. I will review it and reply by email shortly.
        </div>
      )}

      {draftReady && (
        <p role="status" className="mt-5 rounded-lg border border-amber-500/60 bg-amber-500/10 p-4 text-sm text-foreground">
          Your draft is ready to open in your email client. If it did not open automatically, email{" "}
          <a className="underline font-semibold" href={`mailto:${email}`}>{email}</a> directly.
        </p>
      )}

      <noscript>
        <p className="mt-4 text-sm text-muted">
          JavaScript is needed to prepare a draft. Please <a className="underline font-medium" href={`mailto:${email}`}>email me directly</a>.
        </p>
      </noscript>
    </form>
  );
}
