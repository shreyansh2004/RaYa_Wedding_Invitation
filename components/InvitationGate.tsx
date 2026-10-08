"use client";

import { useEffect, useState, type ReactNode } from "react";
import { InvitationCover } from "./InvitationCover";

export function InvitationGate({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) return;
    document.querySelector<HTMLHeadingElement>(".hero h1")?.focus();
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
