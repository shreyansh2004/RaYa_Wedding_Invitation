"use client";

import { useState } from "react";

export function InvitationActions() {
  const [message, setMessage] = useState("");

  async function shareInvitation() {
    const shareData = {
      title: "Riya & Rahul - Wedding Invitation",
      text: "Join us to celebrate Riya Kothari and Rahul Mehta on 27 December 2026.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setMessage("Invitation shared.");
        return;
      }
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      setMessage("Invitation link copied to clipboard.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage("Sharing isn’t available here. You can copy the page link from your browser.");
    }
  }

  return (
    <div className="action-area">
      <button className="share-button" onClick={shareInvitation}>
        Share this invitation <span aria-hidden="true">↗</span>
      </button>
      <p className="action-status" role="status" aria-live="polite">{message}</p>
    </div>
  );
}
