import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer, Header } from "@/components/site";
import { RevealObserver } from "@/components/reveal-observer";
import { email, github } from "@/data/projects";
import { siteName, siteUrl, socialImage } from "@/lib/site";

const geistSans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const description =
  "Abdulkhaliq Sediqi is a senior software engineer and team lead in Herat, Afghanistan, building web products, APIs, and services with NestJS, Laravel, Node.js, PHP, Python, and Java.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abdulkhaliq Sediqi — Senior Software Engineer & Team Lead",
    template: "%s — Abdulkhaliq Sediqi",
  },
  description,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  keywords: [
    "Abdulkhaliq Sediqi",
    "Abdul Khaliq Seddiqi",
    "senior software engineer",
    "backend developer",
    "team lead",
    "NestJS developer",
    "Laravel developer",
    "Node.js",
    "PHP",
    "Python",
    "Java",
    "microservices",
    "gRPC",
    "Herat",
    "Afghanistan",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Abdulkhaliq Sediqi — Senior Software Engineer & Team Lead",
    description:
      "Software that keeps products running. Web products, APIs, and the teams behind them.",
    url: "/",
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulkhaliq Sediqi — Senior Software Engineer & Team Lead",
    description: "Web products, APIs, and services, built with care.",
    images: [socialImage.url],
  },
  robots: { index: true, follow: true },
};

// Structured data that tells search engines who this site is about.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description,
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Abdulkhaliq Sediqi",
      alternateName: ["Abdul Khaliq Seddiqi", "Khaliq Sediqi", "AKS"],
      url: siteUrl,
      image: `${siteUrl}/portrait-outdoor.jpg`,
      jobTitle: "Senior Software Engineer & Team Lead",
      worksFor: { "@type": "Organization", name: "Raha Ertebat" },
      address: { "@type": "PostalAddress", addressLocality: "Herat", addressCountry: "AF" },
      email: `mailto:${email}`,
      sameAs: [github],
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Chandigarh University" },
        { "@type": "CollegeOrUniversity", name: "Herat University" },
      ],
      knowsLanguage: ["Persian", "English", "Pashto", "Urdu"],
      knowsAbout: ["Software engineering", "Backend development", "NestJS", "Laravel", "Node.js", "PHP", "Python", "Java", "Microservices", "gRPC", "React"],
    },
  ],
};

// Applies the visitor's stored theme (light unless they chose dark) before first
// paint to avoid a flash, and
// marks the document as script-enabled for scroll-reveal styles.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"){t="light"}document.documentElement.dataset.theme=t}catch(e){}document.documentElement.dataset.js="1"})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
