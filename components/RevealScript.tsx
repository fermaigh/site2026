/**
 * Arms the reveal effect before first paint, so content starts hidden instead
 * of flashing in and then animating.
 *
 * Skipped when motion is unwelcome. The failsafe matters: if RevealOnScroll
 * never mounts — a bundle error, say — this removes the armed class on its own,
 * so a broken script can never leave the site looking blank.
 */
export function RevealScript() {
  const code = `(function(){try{if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;var r=document.documentElement;r.classList.add('reveal-armed');window.__revealFailsafe=window.setTimeout(function(){r.classList.remove('reveal-armed');},6000);}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
