"use client";

import { useEffect, useState, type ReactNode } from "react";
import { InvitationCover } from "./InvitationCover";

export function InvitationGate({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      document.querySelector<HTMLHeadingElement>(".hero h1")?.focus();

      const sections = document.querySelectorAll<HTMLElement>(".scroll-reveal");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion || !("IntersectionObserver" in window)) {
        sections.forEach((section) => section.classList.add("is-visible"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
      );
      sections.forEach((section) => observer.observe(section));
      return () => observer.disconnect();
    }
  }, [opened]);

  return (
    <>
      {!opened && <InvitationCover onOpenComplete={() => setOpened(true)} />}
      <div className="invitation-content" aria-hidden={!opened} inert={!opened}>
        {children}
      </div>
    </>
  );
}
