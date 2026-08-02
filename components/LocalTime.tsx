"use client";

import { useEffect, useState } from "react";
import { Text } from "@astryxdesign/core/Text";

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
    <Text type="supporting" size="sm" color="secondary" display="block">
      {time ? `${time} · Bellevue` : "(Local time in Bellevue)"}
    </Text>
  );
}
