import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/site";
import { education, experience, languages, skillGroups } from "@/data/profile";
import { email, github, phone, projects, whatsapp } from "@/data/projects";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Professional experience, selected projects, and technical skills of Abdulkhaliq Sediqi, senior software engineer.",
};

export default function ResumePage() {
  return (
    <main id="main-content" className="shell resume-page">
      <div className="resume-actions">
        <Link href="/about" className="text-link">
          ← About me
        </Link>
        <a href="/abdulkhaliq-sediqi-resume.pdf" download className="button-dark">
          Download PDF <Arrow direction="down" />
        </a>
      </div>
      <div className="resume-sheet">
        <header>
          <h1>Abdulkhaliq Sediqi</h1>
          <p className="mt-2 text-lg font-medium">Senior Software Engineer · Team Lead</p>
          <p className="muted mt-2">
            Herat, Afghanistan · <a href={`mailto:${email}`}>{email}</a> ·{" "}
            <a href={whatsapp}>{phone} (WhatsApp)</a> ·{" "}
            <a href={github}>{github.replace("https://", "")}</a>
          </p>
        </header>
        <section aria-labelledby="resume-profile">
          <h2 id="resume-profile">Profile</h2>
          <p>
            Senior software engineer and team lead with ten years of experience
            building web, backend, and mobile software. Strongest on the
            backend, with NestJS, Node.js, Laravel, and PHP on APIs,
            microservice projects, and gRPC. I also work with React, and have a
            background in Python and Django and in Java and Android. Also
            experienced in accounting with Zoho Books.
          </p>
        </section>
        <section aria-labelledby="resume-experience">
          <h2 id="resume-experience">Experience</h2>
          {experience.map((item) => (
            <article key={`${item.organization}-${item.period}`} className="resume-item">
              <header>
                <h3>
                  {item.role} · {item.organization}
                </h3>
                <p className="muted">
                  {item.period} · {item.context}
                </p>
              </header>
              <ul>
                {item.responsibilities?.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
              {item.technologies.length > 0 && <p className="muted">{item.technologies.join(" · ")}</p>}
            </article>
          ))}
        </section>
        <section aria-labelledby="resume-projects">
          <h2 id="resume-projects">Selected projects</h2>
          {projects.map((project) => (
            <article key={project.slug} className="resume-item">
              <header>
                <h3>
                  <a href={project.url}>{project.name}</a> · {project.role}
                </h3>
                {project.stack.length > 0 && <p className="muted">{project.stack.join(" · ")}</p>}
              </header>
              <p>{project.summary}</p>
            </article>
          ))}
        </section>
        <section aria-labelledby="resume-skills">
          <h2 id="resume-skills">Skills</h2>
          <dl>
            {skillGroups.map((group) => (
              <p key={group.title}>
                <dt className="inline font-semibold">{group.title}: </dt>
                <dd className="inline">{group.items.join(" · ")}</dd>
              </p>
            ))}
          </dl>
        </section>
        <section aria-labelledby="resume-education">
          <h2 id="resume-education">Education</h2>
          {education.map((item) => (
            <p key={item.title}>
              <strong>{item.title}</strong>, {item.institution}, {item.period}
            </p>
          ))}
        </section>
        <section aria-labelledby="resume-more">
          <h2 id="resume-more">Teaching &amp; languages</h2>
          <p>
            <strong>Teaching:</strong> Android development at Khaja Abdullah
            Ansari Institute of Higher Education and JavaScript at PomTech
            Academy.
          </p>
          <p>
            <strong>Languages:</strong> {languages.join(" · ")}
          </p>
        </section>
      </div>
    </main>
  );
}
