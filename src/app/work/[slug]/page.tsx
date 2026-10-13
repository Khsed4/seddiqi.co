import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Arrow, Contact } from "@/components/site";
import { caseStudies } from "@/data/case-studies";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: `${project.name} — Abdulkhaliq Sediqi`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const study = caseStudies[slug];
  const next = projects[(index + 1) % projects.length];
  const link = new URL(project.url);
  const isRepository = link.hostname === "github.com";
  return (
    <main id="main-content">
      <div className="shell">
        <section className="page-hero">
          <Link href="/work" className="text-link">
            ← All projects
          </Link>
          <p className="eyebrow mt-8">{project.category}</p>
          <h1>{project.name}</h1>
          <p>{project.summary}</p>
          <div className="hero-actions">
            <a className="button-dark" href={project.url} target="_blank" rel="noopener noreferrer">
              {isRepository ? "View on GitHub" : "Visit website"} <Arrow />
            </a>
            <Link href="/contact" className="button-ghost">
              Discuss a similar project
            </Link>
          </div>
        </section>

        <div className="detail-grid">
          <aside className="detail-aside">
            <div>
              <h2 className="eyebrow">My role</h2>
              <p>{project.role}</p>
            </div>
            {project.stack.length > 0 && (
              <div>
                <h2 className="eyebrow">Stack</h2>
                <ul className="chip-list mt-2">
                  {project.stack.map((tool) => (
                    <li key={tool} className="chip">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h2 className="eyebrow">Link</h2>
              <p>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-link">
                  {isRepository ? link.pathname.slice(1) : link.hostname} <Arrow />
                </a>
              </p>
            </div>
          </aside>
          <div>
            <section className="detail-section">
              <h2>The project</h2>
              <p>{project.context}</p>
              {study && <p>{study.challenge}</p>}
            </section>
            <section className="detail-section">
              <h2>What I did</h2>
              <p>{project.contribution}</p>
              {study && (
                <ul className="chip-list mt-5" aria-label="Contribution scope">
                  {study.scope.map((item) => (
                    <li className="chip" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <section className="detail-section" aria-label="Areas of work">
              {(study?.considerations ?? project.areas).map((area, i) => (
                <div key={area.title} className="detail-area">
                  <p className="eyebrow">0{i + 1}</p>
                  <div>
                    <h3>{area.title}</h3>
                    <p>{area.text}</p>
                  </div>
                </div>
              ))}
            </section>
            {study && (
              <section className="detail-section">
                <h2>In practice</h2>
                <p>{study.outcome}</p>
              </section>
            )}
            <p className="credit-note">
              <strong className="text-foreground">Credits. </strong>
              {project.credit}
            </p>
          </div>
        </div>

        <Link className="next-project" href={`/work/${next.slug}`}>
          <div>
            <p className="eyebrow mb-2">Next project</p>
            <span>{next.name}</span>
          </div>
          <Arrow />
        </Link>
      </div>
      <Contact />
    </main>
  );
}
