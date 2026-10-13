import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Contact } from "@/components/site";
import { ExperienceSection } from "@/components/profile-sections";
import { education, languages } from "@/data/profile";
import { whatsapp } from "@/data/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Abdulkhaliq Sediqi, a senior software engineer and team lead working with Laravel, Node.js, NestJS, React, and microservices.",
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <div className="shell">
        <section className="page-hero">
          <p className="serif-word kicker">About</p>
          <h1>
            The person behind
            <br />
            <span className="serif-word">the software</span>
          </h1>
          <p>
            I’m Khaliq, a senior software engineer and team lead based in
            Herat, Afghanistan.
          </p>
          <div className="hero-actions">
            <a href="/abdulkhaliq-sediqi-resume.pdf" download className="button-dark">
              Download résumé (PDF) <Arrow direction="down" />
            </a>
            <Link href="/resume" className="button-ghost">
              Read résumé
            </Link>
          </div>
        </section>

        <section className="split">
          <h2>
            What I <span className="serif-word">do</span>
          </h2>
          <div className="prose">
            <p>
              I’m a software engineer who has spent most of recent years on
              the backend, with Laravel and PHP, Node.js and NestJS,
              microservice projects, and gRPC. I also build frontends with
              React, and I have a background in Python, Java, and Android.
            </p>
            <p>
              Today I lead the backend team at Raha Ertebat, where I work on
              the NestJS services behind Movie.af. My recent projects also
              include OnAirNow.
            </p>
            <Link href="/work" className="text-link justify-self-start">
              See the projects <Arrow />
            </Link>
          </div>
        </section>

        <section className="split">
          <h2>
            How I <span className="serif-word">got here</span>
          </h2>
          <div className="prose">
            <p>
              I started in 2016 with Java desktop and native Android
              applications, then led a team at PomTech ICT Solutions. As head of IT at
              the State Ministry for Peace, I built Django and computer vision
              applications.
            </p>
            <p>
              Alongside development, I worked remotely as an accountant for
              Unique Natural Group using Zoho Books, and developed the
              company’s website. I have also taught Android development at
              Khaja Abdullah Ansari Institute of Higher Education and
              JavaScript at PomTech Academy.
            </p>
          </div>
        </section>

        <section className="split">
          <h2>
            Education &amp; <span className="serif-word">languages</span>
          </h2>
          <div className="prose">
            {education.map((item) => (
              <p key={item.title}>
                <strong className="text-foreground">{item.title}</strong>
                <br />
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.institution}
                  </a>
                ) : (
                  item.institution
                )}
                , {item.period}
              </p>
            ))}
            <p>{languages.join(" · ")}</p>
          </div>
        </section>

        <section className="split">
          <h2>
            What comes <span className="serif-word">next</span>
          </h2>
          <div className="prose">
            <p>
              I’m interested in employment opportunities and client projects
              where I can contribute to reliable software and web products. If
              you’re building a product or looking for a senior software
              engineer or team lead, let’s talk.
            </p>
            <a href={whatsapp} className="text-link justify-self-start" target="_blank" rel="noopener noreferrer">
              Message on WhatsApp <Arrow />
            </a>
          </div>
        </section>
      </div>
      <ExperienceSection />
      <Contact />
    </main>
  );
}
