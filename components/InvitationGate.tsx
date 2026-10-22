"use client";

import { useEffect, useState, type ReactNode } from "react";
import { InvitationCover } from "./InvitationCover";
import { translations, type Language } from "../data/translations";

export function InvitationGate({
  children,
  language,
  onLanguageToggle,
}: {
  children: ReactNode;
  language: Language;
  onLanguageToggle: () => void;
}) {
  const [opened, setOpened] = useState(false);
  const copy = translations[language];

  useEffect(() => {
    if (!opened) return;
    document.querySelector<HTMLHeadingElement>(".hero h1")?.focus();
  }, [opened]);

  return (
    <>
      {!opened && <InvitationCover onOpenComplete={() => setOpened(true)} />}
      <div
        className="invitation-content"
        data-language={language}
        lang={language}
        aria-hidden={!opened}
        inert={!opened}
      >
        <div className={`invitation-page invitation-page--${language}`}>
          {opened && (
            <button
              className="language-toggle"
              type="button"
              onClick={onLanguageToggle}
              aria-label={copy.languageSwitchLabel}
              aria-pressed={language === "hi"}
            >
              {copy.languageSwitchText}
            </button>
          )}
          {children}
        </div>
      </div>
    </>
  );
}
