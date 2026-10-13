import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" className="shell page-hero">
      <p className="serif-word kicker">404</p>
      <h1>This page isn’t here.</h1>
      <p>Let’s get you back to the work.</p>
      <div className="hero-actions">
        <Link href="/work" className="button-dark">
          See my projects
        </Link>
      </div>
    </main>
  );
}
