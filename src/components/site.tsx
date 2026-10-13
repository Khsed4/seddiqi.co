import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { email, github, projects, whatsapp } from "@/data/projects";

export function Arrow({
  direction = "diagonal",
}: {
  direction?: "diagonal" | "down" | "right";
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`arrow arrow-${direction}`}
    >
      <path
        d="M6 18 18 6M6 6h12v12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// The logo: an "aks" monogram (Abdul Khaliq Sediqi) beside the full name.
function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label="Abdulkhaliq Sediqi, home">
      <span className="wordmark-badge" aria-hidden="true">
        aks<i />
      </span>
      <span className="wordmark-name" aria-hidden="true">
        Abdulkhaliq <span className="serif-word">Sediqi</span>
      </span>
    </Link>
  );
}

const navigation = [
  { href: "/work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="shell site-header-inner">
        <Wordmark />
        <nav aria-label="Main navigation" className="main-nav">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link href="/contact" className="button-dark">
            Let’s talk <Arrow direction="right" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SectionLabel({ label }: { label: string }) {
  return <p className="eyebrow">{label}</p>;
}

export function Contact() {
  return (
    <section id="contact" className="shell" aria-labelledby="contact-title">
      <div className="cta">
        <div>
          <p className="eyebrow">Employment &amp; client work</p>
          <h2 id="contact-title">
            Have a role or
            <br />
            a project <span className="serif-word">in mind?</span>
          </h2>
          <p>
            A software engineering role, a web application, or a product that
            needs a reliable pair of hands. I’d like to hear about it.
          </p>
        </div>
        <div className="cta-actions">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="button-accent">
            Chat on WhatsApp <Arrow />
          </a>
          <Link href="/contact" className="button-ghost">
            Send a message
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="shell site-footer">
      <div className="footer-grid">
        <div>
          <Wordmark />
          <p>
            Abdulkhaliq Sediqi. Senior software engineer and team lead, building
            web products, APIs, and services with NestJS, Laravel, and Node.js.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Projects</p>
          <ul>
            {projects.slice(0, 4).map((project) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`}>{project.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/work">All projects</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Connect</p>
          <ul>
            <li>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </li>
            <li>
              <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </li>
            <li>
              <a href={`mailto:${email}`}>Email</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer-mark" aria-hidden="true">
        aks<span>.</span>
      </p>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Abdulkhaliq Sediqi</p>
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  );
}
