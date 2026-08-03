import {
  BELLEVUE_DAY_END_HOUR,
  BELLEVUE_DAY_START_HOUR,
  BELLEVUE_TIME_ZONE,
  THEME_STORAGE_KEY,
} from "@/lib/theme";

/**
 * Inline script to apply theme before paint and avoid a flash.
 * Mirrors lib/theme.ts Bellevue auto rules.
 */
export function ThemeScript() {
  const code = `(function(){try{var key=${JSON.stringify(THEME_STORAGE_KEY)};var pref=localStorage.getItem(key);var mode;if(pref==='light'||pref==='dark'){mode=pref;}else{var hourPart=new Intl.DateTimeFormat('en-US',{timeZone:${JSON.stringify(BELLEVUE_TIME_ZONE)},hour:'numeric',hourCycle:'h23'}).formatToParts(new Date()).find(function(p){return p.type==='hour';});var hour=Number(hourPart&&hourPart.value)%24;mode=(hour>=${BELLEVUE_DAY_START_HOUR}&&hour<${BELLEVUE_DAY_END_HOUR})?'light':'dark';}var root=document.documentElement;root.classList.toggle('dark',mode==='dark');root.style.colorScheme=mode;}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
