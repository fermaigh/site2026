"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "America/Los_Angeles";

function formatBellevueTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatBellevueTime(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="font-sans text-[13px] text-foreground/40">
      {time ? `${time} · Bellevue` : "(Local time in Bellevue)"}
    </p>
  );
}
