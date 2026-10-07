"use client";

import { useEffect, useRef, useState } from "react";
import { invitation } from "../data/invitation";

export function InvitationCover({ onOpenComplete }: { onOpenComplete: () => void }) {
  const [opening, setOpening] = useState(false);
  const [complete, setComplete] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    openButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  function openInvitation() {
    if (opening) return;
    setOpening(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      setComplete(true);
      onOpenComplete();
    }, reduceMotion ? 80 : 1500);
  }

  if (complete) return null;

  return (
    <div
      className={`invitation-cover${opening ? " is-opening" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation cover"
      aria-hidden={complete}
    >
      <div className="cover-door cover-door--left" aria-hidden="true" />
      <div className="cover-door cover-door--right" aria-hidden="true" />
      <div className="cover-center-light" aria-hidden="true" />
      <div className="cover-copy">
        <p className="cover-small-title">Together with our families</p>
        <h1>
          <span>{invitation.bride.name}</span>
          <i aria-hidden="true">&</i>
          <span>{invitation.groom.name}</span>
        </h1>
        <p className="cover-date">27 <span aria-hidden="true">·</span> 12 <span aria-hidden="true">·</span> 2026</p>
        <p className="cover-invited">Joyfully invite you to celebrate</p>
      </div>
      <button
  className="cover-open-button cover-open-action"
  style={{ fontSize: '0.8rem' }} /* Adjust the size here */
  type="button"
  onClick={openInvitation}
  disabled={opening}
  ref={openButtonRef}
>
  {opening ? "Opening your invitation" : "Open invitation"}
  
</button>
    </div>
  );
}
