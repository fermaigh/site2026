"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { DemoCursorHand } from "@/components/DemoCursorHand";
import { useDemoPlayback } from "@/components/useDemoPlayback";
import {
  APPLICANTS,
  SCORE_TONES,
  type Applicant,
} from "@/components/hiring/HiringApplicantsData";

/** The demo is authored at the size of the Figma frame and scaled to fit. */
const UI_WIDTH = 1464;
const UI_HEIGHT = 962;

function Chrome() {
  return (
    <div className="hiring-chrome">
      <div className="hiring-chrome-tabs">
        <span className="hiring-dot" style={{ background: "#EC6B5E" }} />
        <span className="hiring-dot" style={{ background: "#F4BF4F" }} />
        <span className="hiring-dot" style={{ background: "#61C453" }} />
        <span className="hiring-tab">Sprockets.ai</span>
      </div>
      <div className="hiring-chrome-nav">
        <span className="hiring-nav-glyph">←</span>
        <span className="hiring-nav-glyph">→</span>
        <span className="hiring-nav-glyph">⟳</span>
        <span className="hiring-url">
          <span className="hiring-lock" />
          sprockets.ai
        </span>
      </div>
    </div>
  );
}

type NavIcon = (props: { active?: boolean }) => React.JSX.Element;

const NAV: { id: string; label: string; icon: NavIcon }[] = [
  { id: "dashboard", label: "Dashboard", icon: IconDashboard },
  { id: "jobs", label: "Jobs", icon: IconJobs },
  { id: "applicants", label: "Applicants", icon: IconApplicants },
  { id: "campaigns", label: "Campaigns", icon: IconCampaigns },
];

/** Bar chart inside a rounded frame. */
function IconDashboard() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <rect
        x="3.6"
        y="3.6"
        width="16.8"
        height="16.8"
        rx="4.6"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <g fill="currentColor">
        <rect x="7.8" y="12.4" width="1.9" height="3.9" rx="0.7" />
        <rect x="11.05" y="8.3" width="1.9" height="8" rx="0.7" />
        <rect x="14.3" y="10.6" width="1.9" height="5.7" rx="0.7" />
      </g>
    </svg>
  );
}

/** Briefcase with a handle and a clasp band. */
function IconJobs() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.2" y="7.6" width="17.6" height="11.8" rx="3.2" />
      <path d="M9.1 7.6V6.7a2.1 2.1 0 0 1 2.1-2.1h1.6a2.1 2.1 0 0 1 2.1 2.1v.9" />
      <path d="M3.4 11.7c2.6 1.5 5.5 2.3 8.6 2.3s6-.8 8.6-2.3" />
      <path d="M10.7 13.9h2.6" />
    </svg>
  );
}

/** Two figures. Selected renders the solid variant, as in the design; the
 *  outline variant is what the other rows use. */
function IconApplicants({ active }: { active?: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="15" cy="7.9" r="3.7" />
        <path d="M15 13.1c3.4 0 5.9 2.3 5.9 5.2 0 .6-.5 1.1-1.1 1.1h-9.6c-.6 0-1.1-.5-1.1-1.1 0-2.9 2.5-5.2 5.9-5.2Z" />
        <circle cx="7.3" cy="10.4" r="2.9" />
        <path d="M7.3 14.5c1.2 0 2.3.3 3.1.9a6.6 6.6 0 0 0-1.9 3.4c-.1.3 0 .6.1.9H4.2c-.6 0-1.1-.5-1.1-1.1 0-2.4 1.8-4.1 4.2-4.1Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="15" cy="7.9" r="3.3" />
      <path d="M9.6 19.3c0-3 2.4-5.3 5.4-5.3s5.4 2.3 5.4 5.3" strokeLinecap="round" />
      <circle cx="7" cy="10.6" r="2.5" />
      <path d="M3.3 19.3c0-2.2 1.6-3.9 3.7-3.9.7 0 1.4.2 2 .5" strokeLinecap="round" />
    </svg>
  );
}

/** Megaphone with sound waves. */
function IconCampaigns() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.9 9.4 13.4 5.3c.9-.4 1.9.2 1.9 1.2v11c0 1-1 1.6-1.9 1.2L4.9 14.6c-.7-.3-1.2-1-1.2-1.8v-1.6c0-.8.5-1.5 1.2-1.8Z" />
      <path d="M7.6 14.1v3.4a1.7 1.7 0 0 0 3.4 0v-1.8" />
      <path d="M18.3 9.8a3.9 3.9 0 0 1 0 4.4" />
      <path d="M20.7 7.9a7.3 7.3 0 0 1 0 8.2" />
    </svg>
  );
}

function Sidebar() {
  return (
    <aside className="hiring-sidebar">
      <div className="hiring-logo">
        <Image
          src="/projects/hiring-app/sprockets-logo.png"
          alt=""
          width={104}
          height={44}
          sizes="104px"
        />
      </div>
      <nav className="hiring-nav">
        {NAV.map(({ id, label, icon: Icon }) => (
          <span
            key={id}
            className={`hiring-nav-item${id === "applicants" ? " is-active" : ""}`}
          >
            <span className="hiring-nav-icon">
              <Icon active={id === "applicants"} />
            </span>
            {label}
            {id === "applicants" ? (
              <span className="hiring-nav-badge">
                <span className="hiring-badge-count" data-when="before">
                  2 New
                </span>
                <span className="hiring-badge-count" data-when="after">
                  1 New
                </span>
              </span>
            ) : null}
          </span>
        ))}
      </nav>
    </aside>
  );
}

function Field({ label, value, count }: { label: string; value: string; count?: string }) {
  return (
    <label className="hiring-field">
      <span className="hiring-field-label">{label}</span>
      <span className="hiring-select">
        {value}
        {count ? <span className="hiring-count">{count}</span> : null}
        <span className="hiring-chevron" aria-hidden>
          ⌄
        </span>
      </span>
    </label>
  );
}

function Row({ applicant }: { applicant: Applicant }) {
  const tone = SCORE_TONES[applicant.tone];
  return (
    <div
      className="hiring-row"
      data-row={applicant.id}
      data-cursor-target={applicant.detail ? applicant.id : undefined}
    >
      <span className="hiring-check" />
      <span className="hiring-cell-name">
        <span className="hiring-name">
          {applicant.name}
          {applicant.isNew ? <span className="hiring-new">New</span> : null}
        </span>
        <span className="hiring-role">{applicant.role}</span>
      </span>
      <span className="hiring-cell-score">
        <span
          className="hiring-score"
          style={{ background: tone.bg, color: tone.fg }}
        >
          {applicant.score} <span aria-hidden>→</span>
        </span>
        {applicant.flagged ? (
          <span className="hiring-flag" aria-hidden>
            ⚠
          </span>
        ) : null}
      </span>
      <span className="hiring-cell-applied">{applicant.applied}</span>
      <span className="hiring-cell-source">{applicant.source}</span>
      <span className="hiring-cell-stage">
        <span className="hiring-stage">
          Needs review
          <span className="hiring-chevron" aria-hidden>
            ⌄
          </span>
        </span>
      </span>
      <span className="hiring-cell-action">
        {applicant.hasNote ? <span className="hiring-note-dot" aria-hidden /> : null}
        <span className="hiring-contact">Contact</span>
        <span className="hiring-more" aria-hidden>
          ···
        </span>
      </span>
    </div>
  );
}

function MetaRow({ glyph, children }: { glyph: string; children: React.ReactNode }) {
  return (
    <span className="hiring-meta-row">
      <span className="hiring-meta-icon" aria-hidden>
        {glyph}
      </span>
      {children}
    </span>
  );
}

function DrawerBody({ applicant }: { applicant: Applicant }) {
  const d = applicant.detail;
  if (!d) return null;
  const tone = SCORE_TONES[applicant.tone];

  return (
    <>
      <header className="hiring-drawer-head">
        <span>
          <span className="hiring-drawer-name">{applicant.name}</span>
          <span className="hiring-drawer-sub">Applied {applicant.role}</span>
        </span>
        <span className="hiring-stage">
          Needs review
          <span className="hiring-chevron" aria-hidden>
            ⌄
          </span>
        </span>
      </header>

      <div className="hiring-drawer-body">
        <h4 className="hiring-drawer-h">Overall</h4>
        {d.overall.map((line) => (
          <p key={line} className="hiring-drawer-p">
            {line}
          </p>
        ))}

        <div className="hiring-match-card">
          <span
            className="hiring-match-pill"
            style={{ background: tone.bg, color: tone.fg }}
          >
            <strong>{d.rating}</strong> {d.verdict}
          </span>
          <span className="hiring-traits-label">Top traits this applicant has</span>
          <span className="hiring-traits">
            {d.has.map((t) => (
              <span key={t} className="hiring-chip is-has">
                {t}
              </span>
            ))}
          </span>
          <span className="hiring-traits-label">Traits to look for</span>
          <span className="hiring-traits">
            {d.lookFor.map((t) => (
              <span key={t} className="hiring-chip">
                {t}
              </span>
            ))}
          </span>
        </div>

        <div className="hiring-meta">
          <MetaRow glyph="🗓">{d.survey}</MetaRow>
          <MetaRow glyph="🔗">Via {applicant.source}</MetaRow>
          <MetaRow glyph="📄">View Resume</MetaRow>
          <MetaRow glyph="📍">{d.zip}</MetaRow>
          <MetaRow glyph="✉">{d.email}</MetaRow>
          <MetaRow glyph="📞">{d.phone}</MetaRow>
        </div>

        <span className="hiring-note">Add quick note</span>
        <span className="hiring-save">Save</span>
      </div>

      <footer className="hiring-drawer-foot">
        <span className="hiring-btn-dark">➤ Contact</span>
        <span className="hiring-btn-ghost">Send offer</span>
        <span className="hiring-btn-ghost hiring-btn-icon" aria-hidden>
          ···
        </span>
      </footer>
    </>
  );
}

export function HiringApplicantsDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);

  // Click order, not list order: the strong match opens first so the drawer
  // contrast between a 9/10 and a 6/10 reads as a comparison.
  const [first, second] = ["rayna", "corey"].map(
    (id) => APPLICANTS.find((a) => a.id === id)!,
  );

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const camera = cameraRef.current;
    const ui = uiRef.current;
    if (!stage || !camera || !ui) return;

    const fit = () => {
      const width = stage.clientWidth;
      if (!width) return;
      const scale = Math.min(1, width / UI_WIDTH);
      ui.style.transform = `scale(${scale})`;
      camera.style.height = `${Math.round(UI_HEIGHT * scale)}px`;
    };

    // The pointer's landing points are measured from the rendered elements
    // rather than hardcoded, so it stays on target if the layout shifts.
    // Offsets, not bounding boxes: the drawer sits translated off-screen at
    // rest, and offsetLeft/offsetTop ignore both transforms and the fit scale,
    // so they give the position the element will occupy once it slides in.
    const aim = () => {
      for (const el of ui.querySelectorAll<HTMLElement>("[data-cursor-target]")) {
        const key = el.dataset.cursorTarget;
        let x = 0;
        let y = 0;
        let node: HTMLElement | null = el;
        while (node && node !== ui) {
          x += node.offsetLeft;
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        // Rows are met inside the name column; the close button, at its centre.
        x += key === "close" ? el.offsetWidth / 2 : 150;
        y += el.offsetHeight / 2;
        ui.style.setProperty(`--aim-${key}-x`, `${Math.round(x)}px`);
        ui.style.setProperty(`--aim-${key}-y`, `${Math.round(y)}px`);
      }
    };

    const sync = () => {
      fit();
      aim();
    };

    sync();
    void document.fonts?.ready?.then(sync);

    const observer = new ResizeObserver(sync);
    observer.observe(stage);
    window.addEventListener("resize", sync);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  useDemoPlayback(cameraRef, "hiring-demo-active");

  return (
    <section className="mt-16 sm:mt-20" aria-label="Applicant review live demo">
      <h3 className="mb-8 font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
        Reviewing applicants by match score
      </h3>
      <div ref={stageRef} className="hiring-demo-stage">
        <div className="hiring-demo-bezel">
          <div ref={cameraRef} className="hiring-demo-camera">
            <div ref={uiRef} className="hiring-demo-ui">
              <Chrome />
              <div className="hiring-shell">
                <Sidebar />
                <main className="hiring-main">
                  <div className="hiring-topbar">
                    <span className="hiring-avatar">HL</span>
                    <span className="hiring-user">
                      <strong>Harry Lee</strong>
                      <span>Hiring manager</span>
                    </span>
                  </div>
                  <div className="hiring-titlebar">
                    <h1 className="hiring-title">Applicants</h1>
                    <span className="hiring-invite">Invite applicants</span>
                  </div>
                  <div className="hiring-filters">
                    <div className="hiring-filter-row">
                      <Field label="Locations" value="All locations" count="25" />
                      <Field label="Jobs" value="All jobs" count="7" />
                      <span className="hiring-search">Search by applicant name</span>
                      <span className="hiring-search-btn">Search</span>
                    </div>
                    <div className="hiring-filter-row">
                      <Field label="Time applied" value="All" />
                      <Field label="Match score" value="All scores" count="6" />
                      <Field label="Source" value="All sources" count="7" />
                      <Field label="Stage" value="All stages" count="6" />
                    </div>
                  </div>

                  <div className="hiring-table">
                    <div className="hiring-thead">
                      <span className="hiring-check" />
                      <span className="hiring-cell-name">Applicant name</span>
                      <span className="hiring-cell-score">Match score ⇅</span>
                      <span className="hiring-cell-applied">Applied ⇅</span>
                      <span className="hiring-cell-source">Source</span>
                      <span className="hiring-cell-stage">Stage</span>
                      <span className="hiring-cell-action">Action</span>
                    </div>
                    {APPLICANTS.map((a) => (
                      <Row key={a.id} applicant={a} />
                    ))}
                  </div>

                  <aside className="hiring-drawer" aria-hidden>
                    <span className="hiring-drawer-close" data-cursor-target="close">
                      ✕
                    </span>
                    <div className="hiring-drawer-pane" data-pane="first">
                      <DrawerBody applicant={first} />
                    </div>
                    <div className="hiring-drawer-pane" data-pane="second">
                      <DrawerBody applicant={second} />
                    </div>
                  </aside>
                </main>
              </div>

              <span className="hiring-cursor" aria-hidden>
                <svg
                  className="hiring-cursor-arrow"
                  width="24"
                  height="30"
                  viewBox="0 0 18 22"
                  fill="none"
                >
                  <path
                    d="M1 1L16.5 12.2L9.4 13.1L13.2 20.4L10.3 21.7L6.4 14.3L1 18.8V1Z"
                    fill="#171718"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="hiring-cursor-hand">
                  <DemoCursorHand />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
