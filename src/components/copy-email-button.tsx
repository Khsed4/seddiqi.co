"use client";

import { useState } from "react";
import { email } from "@/data/projects";

export function CopyEmailButton({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard API is unavailable
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--background)] px-3.5 py-1.5 text-xs font-medium text-[var(--foreground)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95 cursor-pointer ${className}`}
      aria-label="Copy email address to clipboard"
    >
      {copied ? (
        <>
          <svg className="size-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-accent font-semibold">Email copied!</span>
        </>
      ) : (
        <>
          <svg className="size-3.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy address</span>
        </>
      )}
    </button>
  );
}
