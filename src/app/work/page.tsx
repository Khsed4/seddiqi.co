import type { Metadata } from "next";
import { Arrow, Contact } from "@/components/site";
import { ProjectList } from "@/components/project-list";
import { github, projects } from "@/data/projects";
import { socialImage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work & Projects",
  alternates: { canonical: "/work" },
  description: "Projects Abdulkhaliq Sediqi has worked on, with the stack used on each: streaming platforms, web products, open-source work, and company websites.",
  openGraph: {
    title: "Work & Projects — Abdulkhaliq Sediqi",
    url: "/work",
    images: [socialImage],
    description: "Projects, contributions, and the stack behind each one.",
  },
};

const additionalProjects: { name: string; category: string; description: string; tags: string[]; href?: string }[] = [
  {
    name: "Internal Business Platform",
    category: "Enterprise software",
    description: "Backend work on a module of an internal business platform: its data model, services, API, permission-based access control, and audit logging. Built within a larger team.",
    tags: ["NestJS", "Prisma", "PostgreSQL"],
  },
  {
    name: "Game2Play",
    category: "React & TypeScript",
    description: "A game discovery interface built with React, TypeScript, Vite, and Chakra UI. A personal project, with the source on GitHub.",
    tags: ["React", "TypeScript", "Chakra UI"],
    href: "https://github.com/Khsed4/game2play",
  },
  {
    name: "Lung Cancer Detection",
    category: "Machine learning",
    description: "A Jupyter notebook working through lung cancer detection, from my machine learning work in Python.",
    tags: ["Python", "Jupyter", "Machine Learning"],
    href: "https://github.com/Khsed4/Lung-Cancer-Detection",
  },
  {
    name: "Attendance & Vehicle Recognition",
    category: "Python & computer vision",
    description: "Django web applications, an attendance application, and a vehicle recognition application using OpenCV, built as head of IT at the State Ministry for Peace.",
    tags: ["Python", "Django", "OpenCV"],
  },
  {
    name: "Android & Desktop Applications",
    category: "Mobile & desktop",
    description: "Native Android applications and Java desktop projects at Tiyan Software Solutions and PomTech ICT Solutions, where I also led the team.",
    tags: ["Java", "Android", "React Native"],
  },
];

export default function WorkPage() {
  return (
    <main id="main-content">
      <div className="shell">
        <section className="page-hero" aria-labelledby="work-page-title">
          <p className="serif-word kicker">Work</p>
          <h1 id="work-page-title">
            Projects I’ve
            <br />
            <span className="serif-word">worked on</span>
          </h1>
          <p>
            Each project lists my role and the stack. Open one to read what it
            is and what I did on it.
          </p>
        </section>

        <section aria-labelledby="project-list-title">
          <h2 id="project-list-title" className="sr-only">
            Projects
          </h2>
          <ProjectList projects={projects} />
        </section>

        <section className="section-space" aria-labelledby="more-work-title">
          <p className="eyebrow">More work</p>
          <div className="section-heading">
            <h2 id="more-work-title">
              Side projects and
              <br />
              <span className="serif-word">earlier work.</span>
            </h2>
            <p>Smaller pieces that round out the picture.</p>
          </div>
          <div className="grid-3">
            {additionalProjects.map((project) => (
              <article key={project.name} className="card flex flex-col">
                <p className="eyebrow">{project.category}</p>
                <h3 className="mt-2">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
                <ul className="chip-list" aria-label={`${project.name} stack`}>
                  {project.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
                {project.href && (
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className="text-link mt-5 self-start">
                    View on GitHub <Arrow />
                  </a>
                )}
              </article>
            ))}
            <article className="card flex flex-col">
              <p className="eyebrow">Open source</p>
              <h3 className="mt-2">More code on GitHub</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Personal projects, experiments, and the source for the open-source work above.
              </p>
              <a href={github} target="_blank" rel="noopener noreferrer" className="button-dark mt-6 self-start">
                Explore GitHub <Arrow />
              </a>
            </article>
          </div>
        </section>
      </div>

      <Contact />
    </main>
  );
}
