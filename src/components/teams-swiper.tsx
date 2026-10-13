"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type Team = { name: string; logo?: { src: string; width: number; height: number } };

// A row of team tiles. When the row is wider than the screen it becomes a
// swipeable carousel that advances on its own and shows its position in dots;
// when everything fits (desktop) it is a plain centred row.
export function TeamsSwiper({ teams }: { teams: Team[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  // Autoplay holds off for a few seconds after the visitor touches the row.
  const paused = useRef(false);
  const resume = useRef(0);

  function pause() {
    paused.current = true;
    window.clearTimeout(resume.current);
    resume.current = window.setTimeout(() => {
      paused.current = false;
    }, 6000);
  }

  useEffect(() => {
    const list = track.current;
    if (!list) return;

    function measure() {
      if (!list) return;
      setPages(Math.max(1, Math.round(list.scrollWidth / list.clientWidth)));
      setPage(Math.round(list.scrollLeft / list.clientWidth));
    }
    function onScroll() {
      if (!list) return;
      setPage(Math.round(list.scrollLeft / list.clientWidth));
    }

    measure();
    window.addEventListener("resize", measure);
    list.addEventListener("scroll", onScroll, { passive: true });
    list.addEventListener("pointerdown", pause);
    list.addEventListener("touchstart", pause, { passive: true });

    const timer = window.setInterval(() => {
      const scrollable = list.scrollWidth - list.clientWidth;
      if (scrollable < 8 || paused.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const atEnd = list.scrollLeft >= scrollable - 8;
      list.scrollTo({ left: atEnd ? 0 : list.scrollLeft + list.clientWidth, behavior: "smooth" });
    }, 3200);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(resume.current);
      window.removeEventListener("resize", measure);
      list.removeEventListener("scroll", onScroll);
      list.removeEventListener("pointerdown", pause);
      list.removeEventListener("touchstart", pause);
    };
  }, []);

  function goTo(index: number) {
    const list = track.current;
    if (!list) return;
    pause();
    list.scrollTo({ left: index * list.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="teams">
      <p className="eyebrow">Teams I’ve worked with</p>
      <ul ref={track} className="teams-list" aria-label="Teams I have worked with">
        {teams.map((team) => (
          <li key={team.name} className={team.logo ? "team team-logo" : "team"}>
            {team.logo ? (
              <Image src={team.logo.src} alt={team.name} width={team.logo.width} height={team.logo.height} />
            ) : (
              team.name
            )}
          </li>
        ))}
      </ul>
      {pages > 1 && (
        <div className="teams-dots">
          {Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              type="button"
              className={index === page ? "teams-dot is-active" : "teams-dot"}
              aria-label={`Show teams ${index + 1} of ${pages}`}
              aria-current={index === page}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
