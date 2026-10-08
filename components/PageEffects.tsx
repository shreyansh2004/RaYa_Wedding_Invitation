"use client";

import { useEffect, type ReactNode } from "react";

export function PageEffects({ children }: { children: ReactNode }) {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".scroll-reveal");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let observer: IntersectionObserver | undefined;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
      );
      observer = revealObserver;
      sections.forEach((section) => revealObserver.observe(section));
    }

    const scene = document.querySelector<HTMLElement>(".hero-scroll-scene");
    const stage = scene?.querySelector<HTMLElement>(".hero");
    let frame = 0;
    let scheduleUpdate: (() => void) | undefined;
    if (scene && stage && !reducedMotion) {
      const updatePortrait = () => {
        frame = 0;
        const travel = scene.clientHeight - stage.clientHeight;
        const progress =
          travel > 0
            ? Math.min(1, Math.max(0, -scene.getBoundingClientRect().top / travel))
            : 1;
        const easedProgress = 1 - (1 - progress) ** 3;
        scene.style.setProperty("--portrait-offset", `${(1 - easedProgress) * 108}%`);
      };
      scheduleUpdate = () => {
        if (frame === 0) frame = window.requestAnimationFrame(updatePortrait);
      };

      updatePortrait();
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate);
    }
    return () => {
      observer?.disconnect();
      if (scheduleUpdate) {
        window.removeEventListener("scroll", scheduleUpdate);
        window.removeEventListener("resize", scheduleUpdate);
      }
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return children;
}
