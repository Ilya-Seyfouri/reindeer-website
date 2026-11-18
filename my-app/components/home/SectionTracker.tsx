"use client";

import { useEffect } from "react";
import { trackSection } from "@/lib/analytics";

/**
 * Sends "section_<name>" to PostHog the first time each homepage <section
 * data-section="..."> reaches the middle of the screen, so a funnel of those
 * events shows which section people stop scrolling at. Renders nothing.
 */
export function SectionTracker() {
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("[data-section]")];
    const seen = new Set<string>();
    let timer = 0;

    function check() {
      timer = 0;
      const middle = window.innerHeight / 2;
      sections.forEach((section, i) => {
        const name = section.dataset.section;
        if (!name || seen.has(name) || section.getBoundingClientRect().top > middle) return;
        seen.add(name);
        trackSection(name, i + 1);
      });
      if (seen.size === sections.length) window.removeEventListener("scroll", onScroll);
    }

    // Checks at most every 150ms while scrolling.
    function onScroll() {
      if (!timer) timer = window.setTimeout(check, 150);
    }

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
