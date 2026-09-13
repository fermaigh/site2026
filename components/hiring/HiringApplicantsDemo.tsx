"use client";

import { useLayoutEffect, useRef } from "react";
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

function Sidebar() {
  return (
    <aside className="hiring-sidebar">
      <div className="hiring-logo">Spr✳ckets</div>
      <nav className="hiring-nav">
        <span className="hiring-nav-item">
          <span className="hiring-nav-icon" aria-hidden>
            ▤
          </span>
          Jobs
        </span>
        <span className="hiring-nav-item is-active">
          <span className="hiring-nav-icon" aria-hidden>
            ◎
          </span>
          Applicants
          <span className="hiring-nav-badge">4 New</span>
        </span>
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
                <svg className="hiring-cursor-arrow" width="24" height="30" viewBox="0 0 18 22" fill="none">
                  <path
                    d="M1 1L16.5 12.2L9.4 13.1L13.2 20.4L10.3 21.7L6.4 14.3L1 18.8V1Z"
                    fill="#171718"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg className="hiring-cursor-hand" width="26" height="30" viewBox="0 0 24 26" fill="none">
                  <path
                    d="M8 11V4.5a2 2 0 1 1 4 0V10h1V6a2 2 0 1 1 4 0v5h1V8a2 2 0 1 1 4 0v9a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7v-4a2 2 0 1 1 4 0v-2Z"
                    fill="#171718"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
