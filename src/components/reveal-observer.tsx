"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Adds `is-visible` to `.reveal` elements as they scroll into view. The hidden
// starting state only applies when the inline script in the root layout has
// marked the document as script-enabled, so content is never hidden without JS.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  // Stacking cards stick to the top while scrolling. A card that would not fit
  // on screen while stuck is left in normal flow so its end is never cut off,
  // and a card the next one has slid over is trimmed to its top edge so a
  // taller card never shows below a shorter one.
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".stack-card, .xp-row"));
    if (cards.length === 0) return;

    function measure() {
      cards.forEach((card) => {
        card.classList.remove("no-stick");
        const top = Number.parseFloat(getComputedStyle(card).top) || 0;
        card.classList.toggle("no-stick", card.offsetHeight + top + 16 > window.innerHeight);
      });
      update();
    }

    function update() {
      cards.forEach((card) => {
        const next = card.nextElementSibling;
        const covered =
          next instanceof HTMLElement &&
          !card.classList.contains("no-stick") &&
          next.getBoundingClientRect().top <= card.getBoundingClientRect().top + 28;
        card.classList.toggle("is-covered", covered);
      });
    }

    let frame = 0;
    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    }

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
