import type { CSSProperties } from "react";
import Link from "next/link";
import { Arrow } from "@/components/site";
import { experience, skillGroups } from "@/data/profile";

export function ExperienceSection() {
  return (
    <section id="experience" className="shell section-space" aria-labelledby="experience-title">
      <p className="eyebrow">Experience</p>
      <div className="section-heading">
        <h2 id="experience-title">
          Ten years of
          <br />
          <span className="serif-word">building software.</span>
        </h2>
        <p>
          From Java and Android apps to Python and Django, and now web
          services and the team that builds them.
        </p>
      </div>

      <ol className="xp-list">
        {experience.map((item, index) => {
          const isCurrent = item.period.toLowerCase().includes("present");
          return (
            <li key={`${item.organization}-${item.period}`} className="xp-row reveal" style={{ "--i": index } as CSSProperties}>
              <div className="xp-period">
                <p>{item.period}</p>
                <p>{item.context}</p>
                {isCurrent && (
                  <p className="xp-current">
                    <span className="status-dot" /> Current
                  </p>
                )}
              </div>
              <div>
                <h3>{item.role}</h3>
                <p className="xp-org">
                  {item.organization}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
                {item.responsibilities && (
                  <ul className="xp-points">
                    {item.responsibilities.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                )}
                {item.technologies.length > 0 && (
                  <ul className="chip-list" aria-label={`Technologies used at ${item.organization}, ${item.period}`}>
                    {item.technologies.map((tool) => (
                      <li key={tool} className="chip">
                        {tool}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <a href="/abdulkhaliq-sediqi-resume.pdf" download className="button-dark">
          Download résumé (PDF) <Arrow direction="down" />
        </a>
        <Link href="/resume" className="text-link">
          Read it online <Arrow />
        </Link>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="band section-space" aria-labelledby="skills-title">
      <div className="shell">
        <p className="eyebrow">Skills</p>
        <div className="section-heading">
          <h2 id="skills-title">
            The tools behind
            <br />
            <span className="serif-word">the work.</span>
          </h2>
          <p>
            A practical toolkit built up across backend, mobile, and web work.
          </p>
        </div>

        <div className="grid-3">
          {skillGroups.map((group) => (
            <article key={group.title} className="card">
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul className="chip-list">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
