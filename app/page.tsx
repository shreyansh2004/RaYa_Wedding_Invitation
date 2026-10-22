"use client";

import { useEffect, useState } from "react";
import { EnglishInvitation } from "../components/EnglishInvitation";
import { HindiInvitation } from "../components/HindiInvitation";
import { InvitationGate } from "../components/InvitationGate";
import { PageEffects } from "../components/PageEffects";
import type { Language } from "../data/translations";

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === "hi"
        ? "रिया और राहुल | विवाह निमंत्रण"
        : "Riya & Rahul | Wedding Invitation";
  }, [language]);

  return (
    <main>
      <PageEffects language={language}>
        <InvitationGate
          language={language}
          onLanguageToggle={() =>
            setLanguage((current) => (current === "en" ? "hi" : "en"))
          }
        >
          {language === "en" ? <EnglishInvitation /> : <HindiInvitation />}
        </InvitationGate>
      </PageEffects>
    </main>
  );
}
