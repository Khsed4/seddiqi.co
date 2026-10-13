import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer, Header } from "@/components/site";
import { RevealObserver } from "@/components/reveal-observer";

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

export const metadata: Metadata = {
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  title: {
    default: "Abdulkhaliq Sediqi — Senior Software Engineer",
    template: "%s — Abdulkhaliq Sediqi",
  },
  description:
    "Senior software engineer and team lead. Explore my work across streaming platforms, web products, open-source projects, and company websites.",
  openGraph: {
    title: "Abdulkhaliq Sediqi — Senior Software Engineer",
    description:
      "Software that keeps products running. Web products, APIs, and the teams behind them.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Abdulkhaliq Sediqi — Senior Software Engineer",
    description: "Web products, APIs, and services, built with care.",
  },
};

// Applies the stored or system theme before first paint to avoid a flash, and
// marks the document as script-enabled for scroll-reveal styles.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}document.documentElement.dataset.js="1"})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
