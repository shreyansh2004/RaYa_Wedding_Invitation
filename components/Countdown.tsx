"use client";

import { useEffect, useState } from "react";
import { weddingStart } from "../data/invitation";
import { translations, type Language } from "../data/translations";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const remaining = Math.max(0, new Date(weddingStart).getTime() - Date.now());
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  };
}

export function Countdown({ language }: { language: Language }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const copy = translations[language];

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const units: { label: string; value: number | undefined }[] = [
    { label: copy.countdownUnits[0], value: timeLeft?.days },
    { label: copy.countdownUnits[1], value: timeLeft?.hours },
    { label: copy.countdownUnits[2], value: timeLeft?.minutes },
    { label: copy.countdownUnits[3], value: timeLeft?.seconds },
  ];

  return (
    <div className="countdown" aria-label={copy.countdownLabel}>
      {units.map((unit) => (
        <div className="countdown-unit" key={unit.label}>
          <span className="countdown-number" aria-live={unit.label === "Seconds" ? "off" : "polite"}>
            {unit.value === undefined ? "—" : String(unit.value).padStart(2, "0")}
          </span>
          <span className="countdown-label">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
