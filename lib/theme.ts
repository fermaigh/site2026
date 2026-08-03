export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "auto";

export const THEME_STORAGE_KEY = "site-theme-preference";
export const BELLEVUE_TIME_ZONE = "America/Los_Angeles";

/** Daylight in Bellevue: 7:00–18:59 local → light; otherwise dark */
export const BELLEVUE_DAY_START_HOUR = 7;
export const BELLEVUE_DAY_END_HOUR = 19;

export function getBellevueHour(date = new Date()): number {
  const hourPart = new Intl.DateTimeFormat("en-US", {
    timeZone: BELLEVUE_TIME_ZONE,
    hour: "numeric",
    hourCycle: "h23",
  })
    .formatToParts(date)
    .find((part) => part.type === "hour")?.value;

  const hour = Number(hourPart);
  return Number.isFinite(hour) ? hour % 24 : 12;
}

export function getBellevueAutoTheme(date = new Date()): ThemeMode {
  const hour = getBellevueHour(date);
  return hour >= BELLEVUE_DAY_START_HOUR && hour < BELLEVUE_DAY_END_HOUR
    ? "light"
    : "dark";
}

export function resolveTheme(
  preference: ThemePreference,
  date = new Date(),
): ThemeMode {
  if (preference === "auto") return getBellevueAutoTheme(date);
  return preference;
}

export function applyThemeClass(mode: ThemeMode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
  document.documentElement.style.colorScheme = mode;
}

export function readStoredPreference(): ThemePreference {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    if (value === "light" || value === "dark" || value === "auto") return value;
  } catch {
    // ignore
  }
  return "auto";
}

export function storePreference(preference: ThemePreference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // ignore
  }
}
