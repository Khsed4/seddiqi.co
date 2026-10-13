import type { CSSProperties } from "react";
import Link from "next/link";
import { Arrow } from "@/components/site";
import type { Project } from "@/data/projects";

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ol className="project-list">
      {projects.map((project, index) => (
        <li key={project.slug} className="project-row reveal" style={{ "--i": index } as CSSProperties}>
          <span className="project-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3>
              <Link href={`/work/${project.slug}`}>{project.name}</Link>
            </h3>
            <p className="project-meta">{project.role}</p>
            <p className="project-summary">{project.summary}</p>
          </div>
          <div className="project-stack">
            {project.stack.length > 0 && (
              <>
                <p className="eyebrow">Stack</p>
                <ul className="chip-list" aria-label={`${project.name} stack`}>
                  {project.stack.map((tool) => (
                    <li key={tool} className="chip">
                      {tool}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <span className="project-go" aria-hidden="true">
            <Arrow />
          </span>
        </li>
      ))}
    </ol>
  );
}
