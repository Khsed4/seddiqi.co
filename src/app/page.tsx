import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow, Contact } from "@/components/site";
import { ProjectList } from "@/components/project-list";
import { HeroSlider } from "@/components/hero-slider";
import { ExperienceSection, SkillsSection } from "@/components/profile-sections";
import { projects, whatsapp } from "@/data/projects";
import { experience } from "@/data/profile";

const facts = [
  { label: "Building software", value: "Since 2016", note: "Web, backend, and mobile" },
  { label: "Current role", value: "Team Lead", note: "Backend at Raha Ertebat" },
  { label: "Core stack", value: "NestJS · Laravel", note: "PHP, Python, Java, Node.js, TypeScript" },
  { label: "Education", value: "ME in CSE", note: "Chandigarh University" },
];

const offers = [
  {
    label: "Backend systems",
    statement: "APIs and services that hold up under real use.",
    text: "Server-side applications built with Laravel, Node.js, and NestJS, with a data model that fits the product.",
    points: ["REST and gRPC APIs", "Laravel · Node.js · NestJS", "MySQL and PostgreSQL"],
  },
  {
    label: "Microservices",
    statement: "Services that talk to each other clearly.",
    text: "Experience on microservice projects where separate services share contracts and sit behind an API gateway.",
    points: ["Shared, versioned contracts", "Queues, caching, and search", "API gateways"],
  },
  {
    label: "Team leadership",
    statement: "A team lead who still writes the code.",
    text: "I lead the backend team at Raha Ertebat and led a team at PomTech ICT Solutions, while staying hands-on.",
    points: ["Leading development teams", "Hands-on development", "Working with foreign clients"],
  },
  {
    label: "Full delivery",
    statement: "From the database to the deployed website.",
    text: "When a project needs one person to build the whole thing, I do that too, from the data model to the pages.",
    points: ["Laravel and React", "Linux, Nginx, and Docker", "Handover and follow-up work"],
  },
];

// One portrait per theme. Both use the same photo until theme-specific
// versions (a black T-shirt for light mode, a white one for dark) exist.
const portraits = { light: "/portrait-outdoor.jpg", dark: "/portrait-outdoor.jpg" };

// Official logos, shown on a white tile so they read in both themes. Employers
// without an entry here are shown by name.
const logos: Record<string, { src: string; width: number; height: number }> = {
  "Raha Ertebat": { src: "/logos/raha-ertebat.png", width: 301, height: 187 },
  "Unique Natural Group": { src: "/logos/unique-group.png", width: 400, height: 373 },
  "PomTech ICT Solutions": { src: "/logos/pomtech.png", width: 520, height: 148 },
};

// Limeysoft appears twice in the experience list; show each employer once.
const organizations = experience.filter(
  (item, index) => experience.findIndex((other) => other.organization === item.organization) === index,
);

export default function Home() {
  return (
    <main id="main-content">
      <section className="shell hero" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div>
            <p className="hero-id" aria-hidden="true">
              <strong>Abdulkhaliq Sediqi</strong>
              Senior Software Engineer · Team Lead
            </p>
            <p className="hero-availability">
              <span className="status-dot" /> Available for new opportunities
            </p>
            <h1 id="hero-title" className="sr-only">
              Abdulkhaliq Sediqi, senior software engineer and team lead
            </h1>
            <HeroSlider />
            <div className="hero-row">
              <div className="hero-actions">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="button-accent">
                  Let’s talk <Arrow />
                </a>
                <a href="#work" className="button-ghost">
                  See my work
                </a>
              </div>
              <p className="eyebrow">Herat, Afghanistan · Remote friendly</p>
            </div>
          </div>
          <figure className="hero-photo">
            {(["light", "dark"] as const).map((theme) => (
              <Image
                key={theme}
                src={portraits[theme]}
                alt="Portrait of Abdulkhaliq Sediqi"
                width={578}
                height={722}
                loading="eager"
                sizes="(max-width: 900px) 220px, 380px"
                className={`only-${theme}`}
              />
            ))}
            <figcaption>
              <span className="status-dot" /> Abdulkhaliq Sediqi · Herat
            </figcaption>
          </figure>
        </div>
        <dl className="fact-grid">
          {facts.map((fact) => (
            <div key={fact.label} className="fact">
              <dt className="eyebrow">{fact.label}</dt>
              <dd>{fact.value}</dd>
              <p>{fact.note}</p>
            </div>
          ))}
        </dl>
      </section>

      <div className="shell">
        <ul className="teams" aria-label="Teams I have worked with">
          <li className="eyebrow">Teams I’ve worked with</li>
          {organizations.map((item) => {
            const logo = logos[item.organization];
            return (
              <li key={item.organization} className={logo ? "team team-logo" : "team"}>
                {logo ? (
                  <Image src={logo.src} alt={item.organization} width={logo.width} height={logo.height} />
                ) : (
                  item.organization
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <section id="approach" className="shell section-space" aria-labelledby="offers-title">
        <p className="eyebrow">What I do</p>
        <div className="section-heading">
          <h2 id="offers-title">
            Where I can
            <br />
            <span className="serif-word">help most.</span>
          </h2>
          <p>
            Four kinds of work I take on, for employers and for clients.
          </p>
        </div>
        <div className="stack">
          {offers.map((offer, index) => (
            <article key={offer.label} className="stack-card reveal" style={{ "--i": index } as CSSProperties}>
              <div>
                <p className="eyebrow">{offer.label}</p>
                <h3 className="stack-statement">{offer.statement}</h3>
              </div>
              <div>
                <p className="eyebrow">What that looks like</p>
                <p className="stack-text">{offer.text}</p>
                <ul className="check-list">
                  {offer.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="band section-space" aria-labelledby="work-title">
        <div className="shell">
          <p className="eyebrow">Selected work</p>
          <div className="section-heading">
            <h2 id="work-title">
              Projects I’ve
              <br />
              <span className="serif-word">worked on.</span>
            </h2>
            <p>
              Products at work, open-source projects, and websites, each with
              the stack I used.
            </p>
          </div>
          <ProjectList projects={projects} />
          <Link href="/work" className="text-link mt-8">
            All projects and side work <Arrow />
          </Link>
        </div>
      </section>

      <ExperienceSection />
      <SkillsSection />

      <section id="about" className="shell section-space" aria-labelledby="about-title">
        <p className="eyebrow">About</p>
        <div className="section-heading">
          <h2 id="about-title">
            Developer by craft.
            <br />
            <span className="serif-word">Builder by nature.</span>
          </h2>
          <p>Herat, Afghanistan. Persian, English, Pashto, and Urdu.</p>
        </div>
        <div className="prose max-w-3xl">
          <p>
            I started in 2016 with Java desktop and Android applications, led a
            team at PomTech ICT Solutions, and headed IT at the State Ministry
            for Peace, where I built Django and computer vision applications. Today I lead the backend team
            at Raha Ertebat.
          </p>
          <p>
            Alongside development, I’ve worked as an accountant with Zoho
            Books, which helps me understand the business side of the systems I
            build.
          </p>
        </div>
        <Link href="/about" className="text-link mt-8">
          More about me <Arrow />
        </Link>
      </section>

      <Contact />
    </main>
  );
}
