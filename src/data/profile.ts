// Titles, organizations, and dates come from the owner's two CVs in `resumes/`
// and from details the owner supplied directly. Do not assign projects,
// achievements, or stacks to employers without confirmation.
// Responsibility descriptions for the older roles paraphrase the ALTEN CV; the
// recent roles are described only as far as the owner has confirmed.
export type Experience = {
  organization: string;
  role: string;
  context: string;
  period: string;
  location?: string;
  responsibilities?: string[];
  achievement?: string;
  technologies: string[];
};

export const experience: Experience[] = [
  {
    organization: "Raha Ertebat",
    role: "Senior Backend Developer & Team Lead",
    context: "Full-time",
    period: "Dec 2024 – Present",
    location: "Herat, Afghanistan",
    responsibilities: ["Backend development for Movie.af with NestJS: catalogue, viewer features, APIs, and playback statistics.", "Backend development on an internal business platform, including access control and audit logging.", "Leading the backend team alongside hands-on development."],
    technologies: ["NestJS", "TypeScript", "gRPC", "MySQL", "PostgreSQL", "Redis", "Docker"],
  },
  {
    organization: "Limeysoft",
    role: "Senior Backend Developer",
    context: "Remote",
    period: "Nov 2025 – Jul 2026",
    responsibilities: ["Senior backend development in a second engagement with the company, carried out online alongside my role at Raha Ertebat."],
    technologies: [],
  },
  {
    organization: "Unique Natural Group",
    role: "Accountant",
    context: "Remote",
    period: "Feb 2022 – Aug 2026",
    responsibilities: ["Accounting for the group, carried out online using Zoho Books.", "Also developed the company website."],
    technologies: ["Zoho Books"],
  },
  {
    organization: "Limeysoft",
    role: "Software Developer",
    context: "Remote",
    period: "From Sep 2022",
    responsibilities: ["Django and AI development with Python in a multi-project agile environment, covering websites and desktop applications.", "Hosting websites on Linux servers with Nginx and Gunicorn."],
    technologies: ["Python", "Django", "Nginx", "Gunicorn", "Linux", "Bash", "Git", "Bitbucket", "Jira"],
  },
  {
    organization: "State Ministry for Peace",
    role: "Head of IT",
    context: "Full-time",
    period: "Jul 2019 – Aug 2020",
    responsibilities: ["Headed IT for the ministry: planned and prioritised IT work in meetings with ministry leadership and was responsible for the software its staff relied on.", "Designed and developed web applications with Django, an attendance application, and a vehicle recognition application using OpenCV and image processing.", "Trained the ministry’s security staff to use the products."],
    technologies: ["Python", "Django", "OpenCV", "Image processing", "SQL"],
  },
  {
    organization: "PomTech ICT Solutions",
    role: "Software Developer & Team Leader",
    context: "Full-time",
    period: "Jan 2017 – Jun 2019",
    responsibilities: ["Led the development team: planning the work and managing the team’s members.", "Developed Java, Android, web, and React Native mobile applications.", "Communicated directly with foreign clients, mostly American companies, through Slack and Teamwork.", "Joined as a software development intern in 2016, and taught JavaScript at PomTech Academy from 2018."],
    technologies: ["Java", "Python", "JavaScript", "React Native", "Firebase", "SQL"],
  },
  {
    organization: "Tiyan Software Solutions",
    role: "Software Developer",
    context: "Full-time",
    period: "Apr 2016 – Dec 2016",
    responsibilities: ["Built desktop applications in Java across several projects.", "Developed native Android applications, using Firebase and JSON-based data."],
    technologies: ["Java", "Android", "Firebase"],
  },
];

// Skills named by the owner, listed in the CVs, or used in the owner's own
// work and personal repositories. Do not add tools from other sources.
export const skillGroups = [
  { title: "Languages", description: "The languages I work in.", items: ["PHP", "JavaScript", "TypeScript", "Python", "Java", "SQL"] },
  { title: "Backend frameworks", description: "Frameworks for APIs and server-side applications.", items: ["Laravel", "Laravel Reverb", "Node.js", "NestJS", "Django", "REST APIs", "JWT auth", "TypeORM", "Prisma", "tRPC"] },
  { title: "Architecture", description: "How services are split up and talk to each other.", items: ["Microservices", "gRPC", "Protocol Buffers", "RabbitMQ", "Nx monorepos"] },
  { title: "Frontend & mobile", description: "Client-side work alongside the backend.", items: ["React", "React Native", "Android"] },
  { title: "Data & infrastructure", description: "Databases and the servers that run the code.", items: ["MySQL", "PostgreSQL", "Redis", "Elasticsearch", "Firebase", "Docker", "Linux", "Nginx", "Gunicorn", "Bash"] },
  { title: "Collaboration", description: "Working with a team and leading one.", items: ["Git", "Bitbucket", "Jira", "Slack", "Team leadership"] },
  { title: "Finance", description: "Accounting experience alongside software.", items: ["Accounting", "Zoho Books"] },
];

export const education: { title: string; institution: string; period: string; url?: string }[] = [
  { title: "Master of Engineering (ME) in Computer Science and Engineering", institution: "Chandigarh University", period: "2020", url: "https://www.cuchd.in/" },
  { title: "Bachelor of Computer Science", institution: "Herat University", period: "2013 – 2016" },
];

export const languages = ["Persian (native)", "English (fluent)", "Pashto", "Urdu"];