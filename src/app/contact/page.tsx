import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Arrow } from "@/components/site";
import { ContactForm } from "@/components/contact-form";
import { ContactFAQ } from "@/components/contact-faq";
import { CopyEmailButton } from "@/components/copy-email-button";
import { email, github, phone, whatsapp } from "@/data/projects";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Abdulkhaliq Sediqi about software engineering roles, web applications, APIs, and collaboration.",
  openGraph: {
    title: "Contact — Abdulkhaliq Sediqi",
    description: "Have a project or opportunity in mind? Let’s start a conversation.",
  },
};

const steps = [
  { title: "Send a message", text: "On WhatsApp or through the form. I usually reply within 24 hours." },
  { title: "We talk it through", text: "A call or a few messages about your goals, timeline, and stack." },
  { title: "Agree on the plan", text: "We settle scope and responsibilities before any work begins." },
];

export default async function ContactPage() {
  await connection();
  const deliveryEnabled = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);

  return (
    <main id="main-content" className="shell">
      <section className="page-hero" aria-labelledby="contact-page-title">
        <p className="serif-word kicker">Contact</p>
        <h1 id="contact-page-title">
          Let’s talk about
          <br />
          your <span className="serif-word">project</span>
        </h1>
        <p>
          Message me on WhatsApp or fill in the form below. A software
          engineering role, a web application, or a product that needs a
          reliable pair of hands.
        </p>
      </section>

      <div className="contact-grid">
        <div className="contact-side">
          <section className="whatsapp-card" aria-labelledby="whatsapp-title">
            <div>
              <h2 id="whatsapp-title">Message me on WhatsApp</h2>
              <p>The easiest way to reach me. Scan the code or start a chat.</p>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="button-dark">
                Start a chat <Arrow />
              </a>
            </div>
            <Image
              src="/whatsapp-qr.png"
              alt={`QR code that opens a WhatsApp chat with ${phone}`}
              width={280}
              height={280}
              loading="eager"
              className="whatsapp-qr"
            />
          </section>

          <section className="card" aria-labelledby="steps-title">
            <h2 id="steps-title" className="eyebrow">
              What happens next
            </h2>
            <ol className="steps">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span aria-hidden="true">{index + 1}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="card" aria-labelledby="reach-title">
            <h2 id="reach-title" className="eyebrow">
              Other ways to reach me
            </h2>
            <div className="reach-list">
              <a href={`mailto:${email}`} className="text-sm font-medium break-all hover:text-accent">
                {email}
              </a>
              <CopyEmailButton />
            </div>
            <div className="reach-list">
              <a href={github} target="_blank" rel="noopener noreferrer" className="button-ghost">
                GitHub <Arrow />
              </a>
              <Link href="/resume" className="button-ghost">
                Résumé
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted">
              Herat, Afghanistan (UTC+4:30) · Open to remote roles and client projects
            </p>
          </section>
        </div>

        <ContactForm deliveryEnabled={deliveryEnabled} />
      </div>

      <ContactFAQ />
    </main>
  );
}
