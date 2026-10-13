# Portfolio implementation

The portfolio contains a homepage, About page, a `/work` index with five prerendered project-detail pages, a contact page, a printable `/resume` page, and a custom not-found page. It uses Next.js App Router, Server Components, TypeScript, and Tailwind CSS with a shared CSS theme. No application dependencies were added.

The project started from another developer's portfolio. In October 2026 the content was replaced with Abdulkhaliq Sediqi's and the design was rebuilt (see Design below).

## Content provenance

- Sources: the two CVs in `resumes/` (not in the repository) (ALTEN format, last updated December 2022, and a Europass CV) and details supplied directly by the owner. Nothing else is asserted.
- `src/data/profile.ts` holds employment history, skill groups, education, and languages. Raha Ertebat (Dec 2024–Present), Limeysoft (Nov 2025–Jul 2026), and Unique Natural Group (Feb 2022–Aug 2026) come from the owner; the earlier roles and their descriptions come from the ALTEN CV. The State Ministry for Peace role is titled Head of IT at the owner's request (the ALTEN CV says Python Developer); its leadership bullet is a general description drafted for that title and should be reviewed by the owner. The owner worked for Limeysoft twice, so it appears as two entries. The end date of the first engagement was not supplied and is shown as "From Sep 2022".
- The name is spelled "Abdulkhaliq Sediqi" at the owner's request (the ALTEN CV uses "Abdul Khaliq Seddiqi").
- `src/data/projects.ts` is the source for project content and contact details. The owner supplied the three project URLs, a backend role in general, and confirmed developing the Unique Natural Group website. Per-project stacks, responsibilities, and employers were not supplied, so project copy is deliberately generic and `stack` is empty. Expand it when the owner provides details.
- "Additional work" on `/work` summarizes applications described in the ALTEN CV.
- The GitHub profile (`github.com/Khsed4`) was identified from the owner's SSH key. Two public repositories are featured as case studies: `90-days-CS-mastery` and `catalog`. Their descriptions come from each repository's README, `CLAUDE.md`, dependency files, and schema. Game2Play and Lung Cancer Detection are listed briefly under additional work. `Gal` (Galaxy Lube) was left out because its live demo still shows template placeholder content, and the `catalog` demo URL is not linked because it serves a saved third-party page rather than the application.
- Movie.af, the Raha Ertebat experience entry, one card on `/work`, and several skills were expanded from the owner's own work in private employer repositories (October 2026). At the owner's request the text is limited to technologies and general feature areas; the internal platform is not named. Keep it at that level unless the employer agrees to more.
- No LinkedIn URL was supplied.
- No testimonials, metrics, or achievements were supplied, so none appear.

## Design

- The visual design was rebuilt in October 2026, taking its direction from a reference site the owner chose: warm paper background, bold sans headings with one italic serif phrase, pill buttons, rounded cards, and a green accent. All styles live in `src/app/globals.css`.
- Light and dark themes are defined as CSS variables at the top of `globals.css`. An inline script in `src/app/layout.tsx` applies the stored choice, or the system preference, before first paint; `src/components/theme-toggle.tsx` switches and stores it in `localStorage`.
- The logo is an "aks" monogram (Abdul Khaliq Sediqi) beside the full name (`Wordmark` in `src/components/site.tsx`); the favicon uses the same monogram.
- The home hero is a slideshow (`src/components/hero-slider.tsx`): five headlines, each with a sentence and a row of tools. It advances every six seconds, pauses on hover or focus, and does not auto-advance for visitors who prefer reduced motion. The page's real `h1` is a visually hidden static line.
- Sections reveal on scroll and the "What I do" and experience cards stack while scrolling (`src/components/reveal-observer.tsx` and the Motion block in `globals.css`).
- Projects are shown as a list with role and stack (`src/components/project-list.tsx`). There are no project screenshots, at the owner's request. The hero portrait (`public/portrait-outdoor.jpg`) is a 4:5 crop of a photo the owner supplied (`resumes/img.png`). The page has one portrait slot per theme (`portraits` in `src/app/page.tsx`); both currently use this photo.
- The contact page shows the owner's WhatsApp QR code (`public/whatsapp-qr.png`, cropped from the image they supplied).

- The "Teams I've worked with" strip shows official logos where one could be found on the company's own website (`public/logos/`: Raha Ertebat, using the Rahanet logo as the owner confirmed they are the same company, PomTech ICT Solutions, and Unique Group). Other employers are shown by name. To add a logo, save it in `public/logos/` and add an entry to the `logos` map in `src/app/page.tsx`.

## Résumé PDF

`/resume` uses the same profile and project sources and has print styles. `public/abdulkhaliq-sediqi-resume.pdf` is generated from it. After changing profile content, run `npm run build && npm start`, then `npm run resume:pdf` in another terminal (headless Firefox, no extra dependencies), and review the PDF before publishing.

## Contact form and Resend configuration

`/contact` includes contact links, next steps, FAQs, and a validated form. Direct delivery uses Resend when server credentials are configured; otherwise the email-draft flow remains available. See `.env.example` and the README. The sender must belong to a verified Resend domain; the recipient is fixed to the portfolio address. No credentials are committed. The form sends plain text, validates on the server, bounds payload size, checks origin, uses a honeypot and per-instance request limit, and times out provider requests. The proxy must overwrite `X-Forwarded-For`; configure a persistent platform-level rate limit for a multi-instance public deployment. The app does not store message content.

`npm run test:contact` loads the actual validator and route handler with a mocked provider. No live delivery has been attempted.

## Running locally

Run `npm run dev`, then open http://localhost:3000. To verify a production build, run `npm run lint`, `npm run build`, and `npm start`.

## Before publishing

Add the production domain for canonical URLs and review project copy. The stacks for OnAirNow and the Unique Natural Group website are not listed yet. The site's own repository is `github.com/Khsed4/seddiqi.co` (remote `seddiqi`, branch `main`), which starts from a single clean commit. The CVs and original photos in `resumes/` and the project root are git-ignored and exist only on the owner's machine; the older `origin` remote is the original author's repository.
