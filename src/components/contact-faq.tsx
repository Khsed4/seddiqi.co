const questions = [
  {
    question: "What kind of work can we discuss?",
    answer:
      "Software engineering and team lead roles, web applications, API and service development, microservice projects, and website builds. Whether you need someone to own part of a product or a reliable developer for an existing codebase, we can discuss where I can bring the most value.",
  },
  {
    question: "Can you work with an existing team or codebase?",
    answer:
      "Yes. Most of my experience is inside teams, including leading one: I currently lead the backend team at Raha Ertebat and previously led a team at PomTech ICT Solutions. I adapt to existing git workflows, codebases, and product roadmaps.",
  },
  {
    question: "What should I include in my message?",
    answer:
      "A brief overview of your product or role, your current tech stack, any links if available, and your desired timeline. For client projects, an estimated budget range helps too.",
  },
  {
    question: "Do you take on work after launch?",
    answer:
      "Yes. Follow-up work such as new features, fixes, and maintenance after handover is something we can agree on as part of the project.",
  },
];

export function ContactFAQ() {
  return (
    <section className="contact-faq section-space" aria-labelledby="faq-title">
      <p className="eyebrow">Questions</p>
      <div className="section-heading">
        <h2 id="faq-title">
          Before we <span className="serif-word">say hello.</span>
        </h2>
        <p>A few quick answers to help you write your message.</p>
      </div>

      <div className="grid gap-3">
        {questions.map((item) => (
          <details key={item.question} className="card group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-panel font-mono text-sm transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
