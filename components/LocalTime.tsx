"use client";

import { useEffect, useState } from "react";
import { Text } from "@astryxdesign/core/Text";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BELLEVUE_TIME_ZONE } from "@/lib/theme";

function formatBellevueTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: BELLEVUE_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatBellevueTime(new Date()));
    update();
    const id = window.setInterval(update, 1_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Text type="supporting" size="sm" color="secondary" display="block">
        {time ? `${time} · Bellevue` : "(Local time in Bellevue)"}
      </Text>
      <ThemeToggle />
    </div>
  );
}
