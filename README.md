# Abdulkhaliq Sediqi — Portfolio

A personal developer portfolio showcasing professional backend work, team leadership, and web projects.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production checks

```bash
npm run lint
npm run build
npm start
```

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. Fonts are stored locally. The site has light and dark themes.

Project content and contact details live in `src/data/projects.ts`; experience and grouped skills live in `src/data/profile.ts`. Expanded case studies live in `src/data/case-studies.ts`. Browse `/work`, `/contact`, and the printable `/resume` page. Regenerate the downloadable résumé with `npm run resume:pdf` while the built site is running. See [implementation notes](docs/implementation-notes.md) for content provenance and design notes.

## Contact delivery

Copy `.env.example` to `.env.local`, set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (a sender on a verified Resend domain), and restart the app. Configure the same variables on your deployment. The contact page uses direct sending when both are set; otherwise it offers an email draft. Delivery is always to the portfolio email in `src/data/projects.ts`; the visitor address is used only as Reply-To.

If your reverse proxy changes the request origin, set `CONTACT_SITE_ORIGIN` to your exact public origin without a trailing slash. Configure your hosting platform to overwrite the client IP header and apply a persistent rate limit to `/api/contact`; the application’s in-memory limit is per instance. No credentials are exposed to the browser. Run `npm run test:contact` for mocked delivery tests; these send no emails.
