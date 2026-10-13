export type Project = {
  slug: string;
  name: string;
  category: string;
  role: string;
  shortRole: string;
  summary: string;
  url: string;
  cover: "learning" | "software" | "movie" | "mars" | "foundation";
  stack: string[];
  context: string;
  contribution: string;
  areas: { title: string; text: string }[];
  credit: string;
};

export const projects: Project[] = [
  {
    slug: "movie-af",
    name: "Movie.af",
    category: "MOVIES & SERIES",
    role: "Senior backend development",
    shortRole: "BACKEND DEVELOPMENT",
    cover: "movie",
    url: "https://movie.af/",
    stack: ["NestJS", "TypeScript", "gRPC", "MySQL", "Redis"],
    summary:
      "A Persian-language movie and series platform, available in Afghanistan. Backend work on the NestJS services behind the catalogue and viewer features.",
    context:
      "Movie.af brings movies and series together in a Persian-language streaming platform. The service is only available inside Afghanistan, where viewers use it to browse and watch entertainment content.",
    contribution:
      "I work on the Movie.af backend at Raha Ertebat as part of a team of backend developers. The backend is built with NestJS as a set of services, and my work covers the catalogue, viewer features, the API that clients call, and playback statistics.",
    areas: [
      {
        title: "Content and catalogue",
        text: "Backend work on movies, series, seasons, and episodes, including localized titles and keeping catalogue data in sync with external movie databases.",
      },
      {
        title: "Viewer features",
        text: "Profiles, preferences, watch history, comments, reviews, and reporting, tied to viewer accounts.",
      },
      {
        title: "APIs and statistics",
        text: "The API endpoints that expose these features to the apps, and backend work on playback statistics.",
      },
    ],
    credit:
      "Movie.af is built by a team at Raha Ertebat. My contribution described here is backend development; the website interface, the platform’s content, and much of the backend are the work of my colleagues.",
  },
  {
    slug: "onairnow",
    name: "OnAirNow",
    category: "RADIO PLATFORM",
    role: "Backend development · Laravel",
    shortRole: "BACKEND DEVELOPMENT",
    cover: "mars",
    url: "https://onairnow.ai/",
    stack: ["Laravel", "PHP", "JWT auth", "Laravel Reverb", "Queues", "Redis", "Mail"],
    summary:
      "AiR, a radio platform presented as “The Future of Radio”. Backend work on the Laravel application behind onairnow.ai.",
    context:
      "OnAirNow is the home of AiR, a radio product presented as “The Future of Radio”. Its public website currently announces a new experience that is coming soon.",
    contribution:
      "I worked on the backend of OnAirNow, a Laravel project. The work used the parts of Laravel a product like this depends on: token-based authentication, real-time events, background jobs, caching, and email.",
    areas: [
      {
        title: "Authentication and APIs",
        text: "API endpoints for the product’s clients, protected with JWT authentication.",
      },
      {
        title: "Real-time and background work",
        text: "Real-time events over WebSockets with Laravel Reverb, and queued jobs for work that should not hold up a request, with Redis behind queues and caching.",
      },
      {
        title: "Email",
        text: "Transactional email sent through Laravel’s mailing features.",
      },
    ],
    credit:
      "My contribution described here is backend development. The interface and other parts of the product are credited to their respective teams.",
  },
  {
    slug: "unique-group",
    name: "Unique Natural Group",
    category: "COMPANY WEBSITE",
    role: "Website development",
    shortRole: "WEBSITE DEVELOPMENT",
    cover: "software",
    url: "https://uniquegroupco.com/",
    stack: [],
    summary:
      "A simple company website for Unique Natural Group, where I also worked as an accountant. Developed by me.",
    context:
      "Unique Group describes itself as a platform for venture creation, identifying and scaling commercial opportunities across global markets. Its website is a simple one that presents the group’s approach, activities, sectors, and markets. I also worked with the group remotely as an accountant from 2022 to 2026, using Zoho Books.",
    contribution:
      "I developed the Unique Natural Group website. It is a straightforward company site, built alongside my accounting role with the group.",
    areas: [
      {
        title: "A home for the company",
        text: "A public website introducing the group, with sections for its approach, activities, sectors, and markets.",
      },
      {
        title: "Development and accounting",
        text: "A website built for a company whose accounts I also kept, bringing together two sides of my work.",
      },
      {
        title: "Remote collaboration",
        text: "My work with the group was carried out online.",
      },
    ],
    credit:
      "I developed the website. The company’s content, products, and brand belong to Unique Natural Group.",
  },
  {
    slug: "cs-mastery",
    name: "90-Days CS Mastery",
    category: "LEARNING PLATFORM · OPEN SOURCE",
    role: "Design & full-stack development",
    shortRole: "PERSONAL PROJECT",
    cover: "learning",
    url: "https://github.com/Khsed4/90-days-CS-mastery",
    stack: ["NestJS", "Next.js", "Prisma", "MySQL", "Nx"],
    summary:
      "A full-stack learning platform for working through 90 days of algorithms, data structures, and system design challenges. NestJS API, Next.js frontend, one Nx monorepo.",
    context:
      "90-Days CS Mastery is a platform where learners follow a 90-day curriculum of computer science challenges and track their progress. It is a personal open-source project, published on GitHub.",
    contribution:
      "I built the platform as an Nx monorepo with a NestJS REST API, a Next.js App Router frontend, and Prisma with MySQL. The API is split into feature modules, and shared TypeScript contracts keep the client and server in agreement.",
    areas: [
      {
        title: "A modular NestJS API",
        text: "Feature modules for authentication with JWT, the challenge curriculum and its moderation, streak and daily progress tracking, admin statistics, and email verification. The API is documented with Swagger.",
      },
      {
        title: "Shared contracts and enforced boundaries",
        text: "Request and response contracts live in a shared library as plain TypeScript, while the API owns its validation DTOs. Nx tags and ESLint rules stop the API, the web app, and the shared code from importing across their boundaries.",
      },
      {
        title: "Data and roles",
        text: "A MySQL schema managed with Prisma migrations and an idempotent seeder, covering users with roles, email verification, challenges with an approval status, and per-user progress.",
      },
    ],
    credit:
      "A personal open-source project. The source code is public on GitHub.",
  },
  {
    slug: "product-catalog",
    name: "Product Catalog",
    category: "CATALOG MANAGEMENT · OPEN SOURCE",
    role: "Backend & full-stack development",
    shortRole: "LARAVEL APPLICATION",
    cover: "foundation",
    url: "https://github.com/Khsed4/catalog",
    stack: ["Laravel", "PHP", "Blade", "DomPDF"],
    summary:
      "A Laravel product catalog management system with roles, product and category management, and PDF catalog export.",
    context:
      "Product Catalog is a web application for managing a company’s products and categories and turning them into a printable catalog. I have worked on it since 2023, and the source code is public on GitHub.",
    contribution:
      "I developed the application with Laravel and Blade: the data model, the admin screens, access control, and the PDF export.",
    areas: [
      {
        title: "Role-based access",
        text: "Every route requires authentication, and admin-only areas for products, categories, company settings, and users sit behind an additional admin middleware.",
      },
      {
        title: "Products and categories",
        text: "Create, edit, and delete products and categories with image uploads, stock status, search, and category filtering.",
      },
      {
        title: "PDF catalog export",
        text: "Export a category as a PDF catalog with one or two items per page, generated from Blade templates with DomPDF. Company settings and product sharing are part of the application too.",
      },
    ],
    credit:
      "The repository has one other contributor. The description here covers the application as a whole.",
  },
];

export const email = "kh.seddiqi14@gmail.com";
export const phone = "+93 729 651 800";
export const whatsapp = "https://wa.me/93729651800";
export const github = "https://github.com/Khsed4";