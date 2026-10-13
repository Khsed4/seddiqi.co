"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    kicker: "Software engineering",
    title: "Software that",
    accent: "keeps products running",
    text: "I’m Abdulkhaliq Sediqi, a senior software engineer and team lead. For ten years I’ve built web, backend, and mobile software.",
    tools: ["TypeScript", "PHP", "Python", "Java", "NestJS", "Laravel"],
  },
  {
    kicker: "APIs & services",
    title: "APIs your apps",
    accent: "can rely on",
    text: "REST and gRPC APIs built with NestJS, Laravel, and Node.js, on data models that fit the product.",
    tools: ["NestJS", "Laravel", "Node.js", "JWT auth", "MySQL", "PostgreSQL"],
  },
  {
    kicker: "Microservices",
    title: "Services that",
    accent: "talk to each other",
    text: "Work on microservice projects where services share versioned contracts and sit behind an API gateway.",
    tools: ["gRPC", "Protocol Buffers", "RabbitMQ", "Redis", "Docker"],
  },
  {
    kicker: "Team leadership",
    title: "A team lead who",
    accent: "still writes code",
    text: "I lead the backend team at Raha Ertebat and led a team at PomTech ICT Solutions, while staying hands-on.",
    tools: ["Git", "Jira", "Bitbucket", "Slack"],
  },
  {
    kicker: "Web & mobile",
    title: "From Android apps",
    accent: "to the web",
    text: "I started with Java and Android, moved through Python and Django, and build with React when a project needs a frontend.",
    tools: ["React", "React Native", "Android", "Java", "Django"],
  },
];

const interval = 4000;

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // The first slide appears straight away; later ones wait for the previous to fade.
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      // Visitors who prefer reduced motion change slides themselves.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setChanged(true);
      setActive((current) => (current + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [paused, active]);

  return (
    <div
      className={`hero-slider${paused ? " is-paused" : ""}${changed ? " has-changed" : ""}`}
      role="group"
      aria-roledescription="carousel"
      aria-label="What I do"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero-slides">
        {slides.map((slide, index) => (
          <div
            key={slide.kicker}
            className={index === active ? "hero-slide is-active" : "hero-slide"}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.kicker}`}
            aria-hidden={index !== active}
          >
            <p className="eyebrow hero-kicker">
              <span>{String(index + 1).padStart(2, "0")}</span> {slide.kicker}
            </p>
            <p className="hero-title">
              {slide.title}
              <br />
              <span className="serif-word">{slide.accent}</span>
            </p>
            <p className="hero-lede">{slide.text}</p>
            <ul className="chip-list hero-tools" aria-label="Tools">
              {slide.tools.map((tool) => (
                <li key={tool} className="chip">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="hero-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.kicker}
            type="button"
            className={index === active ? "hero-dot is-active" : "hero-dot"}
            aria-label={`Show slide ${index + 1}: ${slide.kicker}`}
            aria-current={index === active}
            onClick={() => {
              setChanged(true);
              setActive(index);
            }}
          >
            <span style={{ animationDuration: `${interval}ms` }} />
          </button>
        ))}
      </div>
    </div>
  );
}
