"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { Poppins } from "next/font/google";
import { ArrowRight, ChevronDown, Info } from "lucide-react";
import { HiringApplicantsDemo } from "@/components/hiring/HiringApplicantsDemo";

const PASSCODE = "0000";
const SESSION_KEY = "hiring-case-study-unlocked";

const sprocketsHeading = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const personas = [
  {
    src: "https://www.figma.com/api/mcp/asset/1998ff27-84e0-40db-8905-ea34a458c8c6/43d31.png",
    alt: "Operations persona for Operation Oma, an account owner",
    caption: "Operations / Payer: Makes decisions at the organizational level.",
  },
  {
    src: "https://www.figma.com/api/mcp/asset/6fb48395-b848-4328-bf43-3ee63feff2c0/f850b.png",
    alt: "Hiring Manager persona for Hiring Manager Harry, a team member",
    caption: "Hiring Manager: Manages hiring and staffing at individual locations.",
  },
  {
    src: "https://www.figma.com/api/mcp/asset/7da1ec5a-6022-4f1e-bcb9-99cf54cf3136/47e04.png",
    alt: "Job Applicant persona for Job Applicant Jordan",
    caption: "Job Applicant: Applies and completes the assessment.",
  },
] as const;

const componentShowcaseItems = [
  {
    id: "font",
    label: "Font",
    caption: "Poppins creates hierarchy and emphasis; Inter keeps product content clear and readable.",
  },
  {
    id: "color",
    label: "Color",
    caption: "Neutral foundations support the interface; semantic colors communicate status, while teal and blue support brand and illustration.",
  },
  {
    id: "buttons",
    label: "Buttons",
    caption: "Primary, secondary, and tertiary actions share three sizes, optional icons, and consistent idle, hover, active, and disabled states.",
  },
  {
    id: "dropdown",
    label: "Dropdown",
    caption: "Single-select dropdown: The full field opens the menu, hover clarifies the target, selection updates the field, and unavailable options remain visible but muted.",
  },
  {
    id: "match-chips",
    label: "Match chips",
    caption: "Match-score colors progress from strong green to cautionary yellow and red; focused states use the next stronger shade, while unknown scores remain neutral.",
  },
] as const;

const subscribeNever = () => () => {};

function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden
    >
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.6" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
    </svg>
  );
}

export function HiringCaseStudy() {
  const isUnlocked = useSyncExternalStore(subscribeNever, readSession);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [afterSlide, setAfterSlide] = useState(0);
  const [hiringManagerSlide, setHiringManagerSlide] = useState(0);
  const [componentShowcaseItem, setComponentShowcaseItem] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState<string | null>(null);
  const [personaSlide, setPersonaSlide] = useState(0);
  const [visiblePersonaSlide, setVisiblePersonaSlide] = useState(0);
  const [loadedPersonaSlides, setLoadedPersonaSlides] = useState<boolean[]>(
    () => personas.map(() => false),
  );
  const [executionMode, setExecutionMode] = useState<"before" | "after">("after");
  const [afterAudience, setAfterAudience] = useState<
    "operations" | "hiring-manager" | "job-applicant"
  >("operations");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value === PASSCODE) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Private mode or blocked storage
      }
      setValue("");
      // Rerender by triggering a state change
      window.location.reload();
    } else {
      setError(true);
      setValue("");
    }
  }

  if (isUnlocked) {
    return (
      <article className="pb-16 sm:pb-24">
        <header className="reveal">
          <h1 className="font-sans text-[clamp(1.75rem,6vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
            Evolving a Service-Led MVP into a Self-Service Platform
          </h1>
          <p className="mt-6 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
            Navigating ambiguity toward a clear, useful, and scalable platform
          </p>
        </header>

        <div className="mt-12 space-y-10 border-t border-foreground/10 pt-10 sm:mt-16 sm:space-y-14 sm:pt-14 md:mt-20 md:pt-16">
          <section className="reveal">
            <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
              Context
            </h2>
            <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-6 sm:text-[17px]">
              Sprockets had validated its MVP with franchise businesses, using <strong>AI-powered candidate assessments</strong>{" "}to help them identify and hire better hourly workers. But much of the experience was still operated by Sprockets&apos; internal Customer Success team.
              <br />
              To scale, the company needed to evolve from a <strong>service-led MVP into a self-service product</strong>—without losing the core value that made the MVP successful. I joined to help define what that experience should become.
            </p>
            <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
              Sprockets MVP consists of two pillars.
            </p>

            <div className="grid grid-cols-1 gap-6 mt-8 sm:mt-10 sm:grid-cols-2">
              <figure className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 overflow-hidden">
                <div className="flex aspect-[2/1] w-full items-center justify-center overflow-hidden">
                  <img
                    src="https://www.figma.com/api/mcp/asset/95eeec98-a249-4ec3-a55b-6dcd5ee49443/2be08.svg"
                    alt="Sourcing and filtering illustration showing candidate filtering interface"
                    className="h-full w-full max-w-[360px] object-contain"
                  />
                </div>
                <figcaption className="mt-4 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                  Sourcing and filtering
                </figcaption>
              </figure>

              <figure className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 overflow-hidden">
                <div className="flex aspect-[2/1] w-full items-center justify-center overflow-hidden">
                  <img
                    src="https://www.figma.com/api/mcp/asset/f55d7c46-19e4-451d-9e8e-62ae0b37ce1b/6f59c.svg"
                    alt="Job application illustration showing candidate profile and application status"
                    className="h-full w-full max-w-[90px] object-contain"
                  />
                </div>
                <figcaption className="mt-4 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                  Job application
                </figcaption>
              </figure>
            </div>

            <div className="mt-12 border-t border-foreground/10 pt-10 sm:mt-14 sm:pt-12">
              <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
                Understanding Who We&apos;re Designing For
              </h2>
              <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-6 sm:text-[17px]">
                I started by interviewing internal teams, facilitating workshops, and visiting customers in the field to understand <strong>who actually made hiring work across a franchise organization</strong>.
              </p>
              <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
                I translated those insights into three core user groups:
              </p>

              <ul className="mt-4 space-y-2 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground min-w-fit">Operations / Payer</span>
                  <span>— Makes decisions at the organizational level</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground min-w-fit">Hiring Manager</span>
                  <span>— Manages hiring and staffing at individual locations</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground min-w-fit">Job Applicant</span>
                  <span>— Applies and completes the assessment</span>
                </li>
              </ul>
            </div>

            <figure className="mt-10 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 overflow-hidden">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <img
                    src="https://www.figma.com/api/mcp/asset/0931d153-f218-4453-9edb-66db7e6f6f6a/2ff33.png"
                    alt="Research workshop - affinity mapping left"
                    className="rounded-lg w-full h-auto object-cover border border-foreground/5"
                  />
                  <img
                    src="https://www.figma.com/api/mcp/asset/0931d153-f218-4453-9edb-66db7e6f6f6a/888a6.png"
                    alt="Research workshop - affinity mapping right"
                    className="rounded-lg w-full h-auto object-cover border border-foreground/5"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <img
                    src="https://www.figma.com/api/mcp/asset/0931d153-f218-4453-9edb-66db7e6f6f6a/4f251.png"
                    alt="Research documentation - interview notes"
                    className="rounded-lg w-full h-auto object-cover border border-foreground/5"
                  />
                  <img
                    src="https://www.figma.com/api/mcp/asset/0931d153-f218-4453-9edb-66db7e6f6f6a/8c77b.png"
                    alt="Research documentation - findings synthesis"
                    className="rounded-lg w-full h-auto object-cover border border-foreground/5"
                  />
                </div>
                <img
                  src="https://www.figma.com/api/mcp/asset/0931d153-f218-4453-9edb-66db7e6f6f6a/d15b3.png"
                  alt="User journey and interaction flows"
                  className="rounded-lg w-full h-auto object-cover border border-foreground/5"
                />
              </div>
            </figure>

            <div className="mt-12 border-t border-foreground/10 pt-10 sm:mt-14 sm:pt-12">
              <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
                Turning Research into vision and direction
              </h2>
              <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-6 sm:text-[17px]">
                I then mapped how these users interact across the end-to-end hiring journey: turning fragmented operational knowledge into a <strong>shared view of the system</strong> that helped cross-functional teams align on product priorities and roadmap.
              </p>
            </div>

            <figure className="mt-10 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 overflow-hidden">
              <div className="w-full overflow-hidden rounded-lg bg-foreground/5">
                <img
                  src="https://www.figma.com/api/mcp/asset/37e42041-998a-4705-b619-7e7ebdd03bdf/2dbff.png"
                  alt="User journey diagram showing how Operation, Hiring Manager, and Applicant users navigate through the hiring platform"
                  className="block h-auto w-full max-w-none"
                />
              </div>
              <figcaption className="mt-6 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                End-to-End User journey mapping: Showing how different user groups (Operation/Payer, Hiring Manager, Job Applicants) navigate through the hiring workflow from onboarding through job completion.
              </figcaption>
            </figure>

            <div className="mt-10 space-y-6">
              <figure className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
                <div
                  className="relative aspect-[814/383] w-full overflow-hidden rounded-[18px] bg-foreground/[0.04]"
                  aria-busy={!loadedPersonaSlides[personaSlide]}
                >
                  {personas.map((persona, index) => (
                    <img
                      key={persona.src}
                      src={persona.src}
                      alt={index === visiblePersonaSlide ? persona.alt : ""}
                      loading="eager"
                      decoding="async"
                      onLoad={(event) => {
                        const image = event.currentTarget;
                        void image
                          .decode()
                          .catch(() => undefined)
                          .then(() => {
                            setLoadedPersonaSlides((loaded) => {
                              if (loaded[index]) return loaded;
                              const next = [...loaded];
                              next[index] = true;
                              return next;
                            });
                            if (personaSlide === index) {
                              setVisiblePersonaSlide(index);
                            }
                          });
                      }}
                      className={`absolute inset-0 block h-full w-full rounded-[18px] object-contain transition-opacity duration-300 ease-out ${
                        index === visiblePersonaSlide ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                  <div
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-background/20 transition-opacity duration-200 ${
                      loadedPersonaSlides[personaSlide]
                        ? "opacity-0"
                        : "opacity-100"
                    }`}
                    role="status"
                    aria-live="polite"
                    aria-hidden={loadedPersonaSlides[personaSlide]}
                  >
                    <span className="size-5 animate-spin rounded-full border-2 border-foreground/15 border-t-foreground/60" />
                    <span className="sr-only">Loading persona</span>
                  </div>
                </div>
                <figcaption className="mt-6 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                  {personas[visiblePersonaSlide].caption}
                </figcaption>
              </figure>
              <div className="flex items-center justify-center gap-2" aria-label="Persona carousel">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setPersonaSlide(index);
                      if (loadedPersonaSlides[index]) {
                        setVisiblePersonaSlide(index);
                      }
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === personaSlide
                        ? "w-8 bg-foreground"
                        : "w-2 bg-foreground/30 hover:bg-foreground/50"
                    }`}
                    aria-label={`View persona ${index + 1}`}
                    aria-current={index === personaSlide ? "true" : undefined}
                  />
                ))}
              </div>
            </div>

            <figure className="mt-10 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 overflow-hidden">
              <div className="w-full aspect-auto flex items-center justify-center bg-foreground/5 rounded-lg overflow-x-auto">
                <img
                  src="https://www.figma.com/api/mcp/asset/079a6df6-1e55-4bb0-8b3c-176a5f4ab378/b262e.png"
                  alt="Detailed workflow diagram showing CRM, Account Owner, Hiring Manager, and Applicants user flows and platform touchpoints"
                  className="w-full h-auto max-w-none"
                />
              </div>
              <figcaption className="mt-6 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                Comprehensive workflow diagram mapping key product areas and UX improvement for CRM administrators, Account Owners, Hiring Managers, and Applicants interact with the platform across different journey stages.
              </figcaption>
            </figure>

            <div className="mt-12 border-t border-foreground/10 pt-10 sm:mt-14 sm:pt-12">
              <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
                Result
              </h2>
              <h3 className="mt-8 font-sans text-[18px] font-semibold tracking-tight text-foreground/80">
                Design deliverables
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="Design execution state">
                <button
                  type="button"
                  aria-pressed={executionMode === "before"}
                  onClick={() => setExecutionMode("before")}
                  className={`min-h-[72px] rounded-xl border px-4 py-3 text-center font-sans text-[14px] leading-[1.45] transition-colors sm:text-[15px] ${
                    executionMode === "before"
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/15 bg-foreground/[0.03] text-foreground/70 hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  <span className="font-semibold">Before:</span> All in one platform used by customer success team.
                </button>
                <button
                  type="button"
                  aria-pressed={executionMode === "after"}
                  onClick={() => setExecutionMode("after")}
                  className={`min-h-[72px] rounded-xl border px-4 py-3 text-center font-sans text-[14px] leading-[1.45] transition-colors sm:text-[15px] ${
                    executionMode === "after"
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/15 bg-foreground/[0.03] text-foreground/70 hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  <span className="font-semibold">After:</span> Individual view and solutions for each user segments.
                </button>
              </div>
            </div>

            {executionMode === "after" ? (
              <div className="mt-6 grid grid-cols-1 gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-1 dark:border-foreground/15 dark:bg-foreground/[0.06] sm:grid-cols-3" aria-label="After design user segment">
                {([
                  [
                    "operations",
                    "Operations",
                    "https://www.figma.com/api/mcp/asset/4ecf0ea9-fc6e-4143-a74b-cf1e21248c97/1b704.png",
                  ],
                  [
                    "hiring-manager",
                    "Hiring Manager",
                    "https://www.figma.com/api/mcp/asset/1bd36dc2-f40c-414e-b0e0-435bad631aa3/52aea.png",
                  ],
                  [
                    "job-applicant",
                    "Job Applicant",
                    "https://www.figma.com/api/mcp/asset/fdc30ef2-80e3-476b-b6eb-6b843bc82f6b/47e83.png",
                  ],
                ] as const).map(([value, label, avatar]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={afterAudience === value}
                    onClick={() => setAfterAudience(value)}
                    className={`flex min-h-12 items-center justify-center gap-2 rounded-lg px-4 py-2 font-sans text-[14px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-foreground/30 ${
                      afterAudience === value
                        ? "bg-background text-foreground shadow-sm dark:bg-foreground/[0.12] dark:text-foreground dark:ring-1 dark:ring-foreground/20 dark:shadow-none"
                        : "text-foreground/55 hover:bg-foreground/[0.04] hover:text-foreground dark:text-foreground/60 dark:hover:bg-foreground/[0.08] dark:hover:text-foreground"
                    }`}
                  >
                    <img
                      src={avatar}
                      alt=""
                      className={`size-8 shrink-0 rounded-full object-cover ring-1 ${
                        afterAudience === value
                          ? "ring-foreground/25 dark:ring-foreground/40"
                          : "ring-foreground/10 dark:ring-foreground/20"
                      }`}
                    />
                    {label}
                  </button>
                ))}
              </div>
            ) : null}

            {executionMode === "before" ? (
              <div className="mt-10 space-y-6">
                <figure className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
                  <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-foreground/5">
                    {currentSlide === 0 && (
                      <img
                        src="https://www.figma.com/api/mcp/asset/59ff5460-5854-499e-afbc-92efcbf2e75c/40174.png"
                        alt="Location management screen"
                        className="h-auto w-full max-w-none"
                      />
                    )}
                    {currentSlide === 1 && (
                      <img
                        src="https://www.figma.com/api/mcp/asset/c024e64c-7714-46e4-a82f-c1ed8f84e3c5/38ef3.png"
                        alt="Candidate sourcing screen"
                        className="h-auto w-full max-w-none"
                      />
                    )}
                    {currentSlide === 2 && (
                      <img
                        src="https://www.figma.com/api/mcp/asset/a4ce3e61-6bbe-4b01-a18a-8ac45d80c40d/05d77.png"
                        alt="Account level management screen"
                        className="h-auto w-full max-w-none"
                      />
                    )}
                  </div>
                  <figcaption className="mt-6 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                    {currentSlide === 0 && "Location management: Users managed location information and staff hiring directly within the platform."}
                    {currentSlide === 1 && "Candidate sourcing: All participants were displayed in a single comprehensive table with filtering and scoring capabilities."}
                    {currentSlide === 2 && "Account level management: Administrative settings and automation preferences were centralized in the account management section."}
                  </figcaption>
                </figure>
                <div className="flex items-center justify-center gap-2">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-foreground" : "w-2 bg-foreground/30 hover:bg-foreground/50"}`}
                      aria-label={`View before screen ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {executionMode === "after" && afterAudience === "operations" ? (
              <div className="mt-10 space-y-6">
                <figure className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
                  <div className="flex aspect-video w-full items-center justify-center overflow-auto rounded-lg bg-foreground/5">
                  {afterSlide === 0 && (
                    <img
                      src="https://www.figma.com/api/mcp/asset/f2226e71-b286-4e5e-9867-00726c1740df/44af3.png"
                      alt="Dashboard and report system screen"
                      className="w-full h-auto max-w-none"
                    />
                  )}
                  {afterSlide === 1 && (
                    <img
                      src="https://www.figma.com/api/mcp/asset/67e92ba9-6741-422d-9da4-50dde9677813/3f10c.png"
                      alt="Source automation tool screen"
                      className="w-full h-auto max-w-none"
                    />
                  )}
                  {afterSlide === 2 && (
                    <img
                      src="https://www.figma.com/api/mcp/asset/60e0334e-775d-4527-a482-ba27b237a1fa/98008.png"
                      alt="Account level management screen"
                      className="w-full h-auto max-w-none"
                    />
                  )}
                </div>
                <figcaption className="mt-6 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                  {afterSlide === 0 && "Dashboard and report system: Centralized dashboard providing high-level insights, success metrics, and key performance indicators for operations management."}
                  {afterSlide === 1 && "Source automation tool: Streamlined job creation and automation settings allowing operations teams to configure automated workflows and sourcing preferences."}
                  {afterSlide === 2 && "Account level management: Dedicated company settings interface for managing organization preferences, branding, and administrative configurations."}
                </figcaption>
              </figure>
              <div className="flex items-center justify-center gap-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setAfterSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === afterSlide
                        ? "w-8 bg-foreground"
                        : "w-2 bg-foreground/30 hover:bg-foreground/50"
                    }`}
                      aria-label={`View screen ${index + 1}`}
                  />
                ))}
              </div>
              </div>
            ) : null}

            {executionMode === "after" && afterAudience === "hiring-manager" ? (
              <div className="mt-10 space-y-6">
                <figure className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
                  <div className="flex aspect-[1464/962] w-full items-center justify-center overflow-hidden rounded-lg bg-foreground/5">
                    {hiringManagerSlide === 0 && (
                      <HiringApplicantsDemo showHeading={false} />
                    )}
                    {hiringManagerSlide === 1 && (
                      <img
                        src="https://www.figma.com/api/mcp/asset/5f98b044-04b9-4157-b7e4-956fbf13d318/ce628.png"
                        alt="Scheduling and manage interview in mobile app"
                        className="h-full w-full max-w-full object-contain"
                      />
                    )}
                  </div>
                  <figcaption className="mt-6 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                    {hiringManagerSlide === 0 && "Web application: Comprehensive view of all candidates, talent sources, and interview preparation tools for managing the hiring process across locations."}
                    {hiringManagerSlide === 1 && "Mobile application: Scheduling and managing interviews on-the-go with calendar integration, availability management, and interview tracking."}
                  </figcaption>
                </figure>
                <div className="flex items-center justify-center gap-2">
                  {[0, 1].map((index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setHiringManagerSlide(index)}
                      className={`h-2 rounded-full transition-all ${index === hiringManagerSlide ? "w-8 bg-foreground" : "w-2 bg-foreground/30 hover:bg-foreground/50"}`}
                      aria-label={`View hiring manager screen ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {executionMode === "after" && afterAudience === "job-applicant" ? (
              <div className="mt-10 space-y-6">
                <figure className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
                  <div className="flex aspect-[2048/1109] w-full items-center justify-center overflow-hidden rounded-lg bg-foreground/5">
                    <img
                      src="/projects/hiring-app/job-applicant-flow.png"
                      alt="Four-screen mobile job applicant flow covering interview onboarding, questions, analysis, and interview scheduling"
                      width={2048}
                      height={1109}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <figcaption className="mt-6 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                    Mobile applicant experience: Candidates complete their virtual interview, provide required information, and schedule a conversation in one guided flow.
                  </figcaption>
                </figure>
              </div>
            ) : null}

            <p className="mt-12 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-16 sm:text-[17px]">
              I <strong>initiated and drove a new design system</strong> that standardized core patterns, reduced repetitive design and engineering work, and helped the team <strong>ship faster with greater consistency as the product scaled</strong>.
            </p>

            <div className="mt-6 space-y-4">
              <div
                className="flex w-full gap-1 overflow-x-auto rounded-xl border border-foreground/10 bg-foreground/[0.03] p-1"
                role="tablist"
                aria-label="UI component showcase"
              >
                {componentShowcaseItems.map((item, index) => (
                  <button
                    key={item.id}
                    id={`component-tab-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={componentShowcaseItem === index}
                    aria-controls={`component-panel-${item.id}`}
                    onClick={() => setComponentShowcaseItem(index)}
                    className={`min-h-10 shrink-0 rounded-lg px-4 py-2 font-sans text-[14px] font-medium transition-colors ${
                      componentShowcaseItem === index
                        ? "bg-background text-foreground shadow-sm"
                        : "text-foreground/55 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <figure className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
                <div className="grid min-h-[280px] overflow-hidden rounded-lg bg-foreground/5">
                  {componentShowcaseItems.map((item, index) => (
                    <div
                      key={item.id}
                      id={`component-panel-${item.id}`}
                      role="tabpanel"
                      aria-labelledby={`component-tab-${item.id}`}
                      aria-hidden={componentShowcaseItem !== index}
                      className={`col-start-1 row-start-1 flex min-h-[280px] items-center justify-center p-6 transition-opacity duration-300 sm:p-10 ${
                        componentShowcaseItem === index
                          ? "visible opacity-100"
                          : "pointer-events-none invisible opacity-0"
                      }`}
                    >
                      {item.id === "font" ? (
                        <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-foreground/10 bg-background">
                          <div className="flex flex-col gap-4 border-b border-foreground/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
                                Typography
                              </p>
                              <p className="mt-1 font-sans text-[14px] font-medium text-foreground">
                                Poppins + Inter
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2 font-mono text-[10px] text-foreground/55">
                              <span className="rounded-full bg-foreground/[0.06] px-2.5 py-1">Headlines 12–40</span>
                              <span className="rounded-full bg-foreground/[0.06] px-2.5 py-1">Body 10–18</span>
                              <span className="rounded-full bg-foreground/[0.06] px-2.5 py-1">Eyebrow 10–16</span>
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-[1.08fr_0.92fr]">
                            <div className="border-b border-foreground/10 p-5 sm:border-r sm:border-b-0 sm:p-6">
                              <p className="font-mono text-[10px] text-foreground/45">H300 · 22/30 · Semibold</p>
                              <p className={`${sprocketsHeading.className} mt-3 text-[22px] font-semibold leading-[30px] text-foreground`}>
                                Hire people who thrive.
                              </p>
                              <p className="mt-2 font-sans text-[12px] leading-[18px] text-foreground/50">
                                Default headline style
                              </p>
                            </div>

                            <div className="p-5 sm:p-6">
                              <p className="font-mono text-[10px] text-foreground/45">P500 · 14/20 · Regular</p>
                              <p className="mt-3 font-sans text-[14px] leading-[20px] text-foreground/75">
                                Match applicants to the qualities shared by your top-performing employees.
                              </p>
                              <p className="mt-2 font-sans text-[12px] leading-[18px] text-foreground/50">
                                Default paragraph style
                              </p>
                            </div>
                          </div>

                          <div className="grid border-t border-foreground/10 sm:grid-cols-2">
                            <div className="border-b border-foreground/10 px-5 py-4 sm:border-r sm:border-b-0 sm:px-6">
                              <p className="font-mono text-[10px] text-foreground/45">B200 · 14/20 · Medium</p>
                              <p className={`${sprocketsHeading.className} mt-2 text-[14px] font-medium leading-[20px] text-foreground`}>
                                View applicants
                              </p>
                            </div>
                            <div className="px-5 py-4 sm:px-6">
                              <p className="font-mono text-[10px] text-foreground/45">E200 · 12/16 · Medium</p>
                              <p className={`${sprocketsHeading.className} mt-2 text-[12px] font-medium uppercase leading-[16px] tracking-[0.04em] text-foreground`}>
                                Candidate insights
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {item.id === "color" ? (
                        <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-foreground/10 bg-background">
                          <div className="flex flex-col gap-3 border-b border-foreground/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
                                Color system
                              </p>
                              <p className="mt-1 font-sans text-[14px] font-medium text-foreground">
                                Foundation + functional color
                              </p>
                            </div>
                            <span className="w-fit rounded-full bg-foreground/[0.06] px-2.5 py-1 font-mono text-[10px] text-foreground/55">
                              7 families · 50–900 scales
                            </span>
                          </div>

                          <div className="border-b border-foreground/10 p-5 sm:p-6">
                            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/45">
                              Interface foundation
                            </p>
                            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                              {[
                                ["Canvas", "Gray 50", "#F9FAFB"],
                                ["Stroke", "Gray 200", "#E9E9E9"],
                                ["Body", "Gray 700", "#4F5457"],
                                ["Action", "Gray 800", "#313131"],
                              ].map(([label, token, color]) => (
                                <div key={label} className="overflow-hidden rounded-lg border border-foreground/10">
                                  <div className="h-12" style={{ backgroundColor: color }} />
                                  <div className="bg-background px-2.5 py-2">
                                    <p className="font-sans text-[11px] font-semibold leading-none text-foreground">
                                      {label}
                                    </p>
                                    <p className="mt-1 font-mono text-[9px] leading-none text-foreground/45">
                                      {token} · {color}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-5 sm:p-6">
                            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/45">
                              Semantic, brand, and support
                            </p>
                            <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-6">
                              {[
                                ["Error", "Red 800", "#AD001A"],
                                ["Support", "Orange 500", "#F97316"],
                                ["Attention", "Yellow 800", "#614B03"],
                                ["Success", "Green 900", "#123F20"],
                                ["Illustration", "Blue 500", "#79A6ED"],
                                ["Brand", "Teal 500", "#60D1E0"],
                              ].map(([label, token, color]) => (
                                <div key={label} className="min-w-0">
                                  <div className="h-7 w-full rounded-md" style={{ backgroundColor: color }} />
                                  <p className="mt-2 truncate font-sans text-[10px] font-semibold leading-none text-foreground">
                                    {label}
                                  </p>
                                  <p className="mt-1 truncate font-mono text-[9px] leading-none text-foreground/45">
                                    {token}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {item.id === "buttons" ? (
                        <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-foreground/10 bg-background">
                          <div className="flex flex-col gap-3 border-b border-foreground/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
                                Button system
                              </p>
                              <p className="mt-1 font-sans text-[14px] font-medium text-foreground">
                                Three levels of emphasis
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2 font-mono text-[10px] text-foreground/55">
                              <span className="rounded-full bg-foreground/[0.06] px-2.5 py-1">Large · 58</span>
                              <span className="rounded-full bg-foreground/[0.06] px-2.5 py-1">Medium · 40</span>
                              <span className="rounded-full bg-foreground/[0.06] px-2.5 py-1">Small · 32</span>
                            </div>
                          </div>

                          <div className="grid bg-[#F9FAFB] sm:grid-cols-3">
                            <div className="flex flex-col items-start border-b border-[#E9E9E9] p-5 sm:border-r sm:border-b-0 sm:p-6">
                              <p className="font-mono text-[10px] text-[#87888A]">01 · Primary</p>
                              <button
                                type="button"
                                className={`${sprocketsHeading.className} mt-4 h-10 rounded-[4px] bg-[#313131] px-4 text-[14px] font-medium leading-[18px] text-white transition-colors duration-150 hover:bg-[#0A1516] active:bg-[#0A1516]`}
                              >
                                Continue
                              </button>
                              <p className="mt-3 font-sans text-[11px] leading-[16px] text-[#4F5457]">
                                Highest-emphasis action
                              </p>
                            </div>

                            <div className="flex flex-col items-start border-b border-[#E9E9E9] p-5 sm:border-r sm:border-b-0 sm:p-6">
                              <p className="font-mono text-[10px] text-[#87888A]">02 · Secondary</p>
                              <button
                                type="button"
                                className={`${sprocketsHeading.className} mt-4 h-10 rounded-[4px] border border-[#313131] bg-white px-4 text-[14px] font-medium leading-[18px] text-[#313131] transition-colors duration-150 hover:border-[#0A1516] hover:bg-[#F5F5F5] hover:text-[#0A1516] active:bg-[#E9E9E9]`}
                              >
                                Save draft
                              </button>
                              <p className="mt-3 font-sans text-[11px] leading-[16px] text-[#4F5457]">
                                Supporting action
                              </p>
                            </div>

                            <div className="flex flex-col items-start p-5 sm:p-6">
                              <p className="font-mono text-[10px] text-[#87888A]">03 · Tertiary</p>
                              <button
                                type="button"
                                className={`${sprocketsHeading.className} mt-4 h-10 rounded-[4px] px-4 text-[14px] font-medium leading-[18px] text-[#313131] transition-colors duration-150 hover:text-[#0A1516] active:text-[#0A1516]`}
                              >
                                Cancel
                              </button>
                              <p className="mt-3 font-sans text-[11px] leading-[16px] text-[#4F5457]">
                                Lowest-emphasis action
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 border-t border-foreground/10 sm:grid-cols-4">
                            {[
                              ["Idle", "Default"],
                              ["Hover", "Clear feedback"],
                              ["Active", "Pressed"],
                              ["Disabled", "60% opacity"],
                            ].map(([state, note], index) => (
                              <div
                                key={state}
                                className={`px-4 py-3 ${index % 2 === 0 ? "border-r border-foreground/10" : ""} ${index < 2 ? "border-b border-foreground/10 sm:border-b-0" : ""} ${index === 1 ? "sm:border-r" : ""}`}
                              >
                                <p className="font-sans text-[11px] font-semibold leading-none text-foreground">
                                  {state}
                                </p>
                                <p className="mt-1 font-mono text-[9px] leading-none text-foreground/45">
                                  {note}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {item.id === "dropdown" ? (
                        <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-foreground/10 bg-background">
                          <div className="flex flex-col gap-3 border-b border-foreground/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
                                Form interaction
                              </p>
                              <p className="mt-1 font-sans text-[14px] font-medium text-foreground">
                                Single-select dropdown
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2 font-mono text-[10px] text-foreground/55">
                              <span className="rounded-full bg-foreground/[0.06] px-2.5 py-1">40px field</span>
                              <span className="rounded-full bg-foreground/[0.06] px-2.5 py-1">300px default</span>
                            </div>
                          </div>

                          <div className="flex min-h-[322px] items-start justify-center bg-[#F9FAFB] px-4 py-8 sm:px-8">
                            <div
                              className="relative w-full max-w-[300px]"
                              onBlur={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget)) {
                                  setDropdownOpen(false);
                                }
                              }}
                            >
                              <label
                                id="design-system-dropdown-label"
                                className="block font-sans text-[12px] font-semibold leading-[18px] text-[#4F5457]"
                              >
                                User group
                              </label>
                              <button
                                type="button"
                                aria-haspopup="listbox"
                                aria-expanded={dropdownOpen}
                                aria-labelledby="design-system-dropdown-label design-system-dropdown-value"
                                onClick={() => setDropdownOpen((open) => !open)}
                                onKeyDown={(event) => {
                                  if (event.key === "Escape") setDropdownOpen(false);
                                }}
                                className={`mt-2 flex h-10 w-full items-center justify-between rounded-[4px] border bg-white px-[7px] text-left font-sans text-[14px] leading-5 outline-none transition-colors ${
                                  dropdownOpen
                                    ? "border-[#87888A]"
                                    : "border-[#D6D6D6] hover:border-[#87888A]"
                                }`}
                              >
                                <span
                                  id="design-system-dropdown-value"
                                  className={dropdownValue ? "text-[#4F5457]" : "text-[#BEBFC2]"}
                                >
                                  {dropdownValue ?? "— Select —"}
                                </span>
                                <ChevronDown
                                  aria-hidden
                                  className={`size-4 shrink-0 text-[#4F5457] transition-transform duration-200 ${
                                    dropdownOpen ? "rotate-180" : ""
                                  }`}
                                  strokeWidth={1.5}
                                />
                              </button>

                              <div
                                className={`absolute left-0 top-[68px] z-10 grid w-full overflow-hidden rounded-[4px] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] transition-[grid-template-rows,opacity,transform] duration-200 ease-out ${
                                  dropdownOpen
                                    ? "grid-rows-[1fr] translate-y-0 opacity-100"
                                    : "pointer-events-none grid-rows-[0fr] -translate-y-1 opacity-0"
                                }`}
                              >
                                <div
                                  className="min-h-0 overflow-hidden py-1"
                                  role="listbox"
                                  aria-labelledby="design-system-dropdown-label"
                                >
                                  {[
                                    "Operations / Payer",
                                    "Hiring Manager",
                                    "Job Applicant",
                                    "Regional customer success administrator",
                                  ].map((option) => {
                                    const selected = dropdownValue === option;
                                    return (
                                      <button
                                        key={option}
                                        type="button"
                                        role="option"
                                        aria-selected={selected}
                                        onClick={() => {
                                          setDropdownValue(option);
                                          setDropdownOpen(false);
                                        }}
                                        className={`block w-full px-4 py-2 text-left font-sans text-[14px] leading-5 transition-colors hover:bg-[#CFF1F6] hover:text-[#0A1516] ${
                                          selected
                                            ? "bg-[#CFF1F6] font-semibold text-[#0A1516]"
                                            : "font-normal text-[#4F5457]"
                                        }`}
                                      >
                                        {option}
                                      </button>
                                    );
                                  })}
                                  <button
                                    type="button"
                                    role="option"
                                    aria-selected="false"
                                    disabled
                                    className="block w-full cursor-not-allowed px-4 py-2 text-left font-sans text-[14px] font-normal leading-5 text-[#BEBFC2]"
                                  >
                                    Unavailable user group
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {item.id === "match-chips" ? (
                        <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-foreground/10 bg-background">
                          <div className="flex flex-col gap-3 border-b border-foreground/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
                                Match-score color
                              </p>
                              <p className="mt-1 font-sans text-[14px] font-medium text-foreground">
                                Confidence at a glance
                              </p>
                            </div>
                            <span className="w-fit rounded-full bg-foreground/[0.06] px-2.5 py-1 font-mono text-[10px] text-foreground/55">
                              Hover chips for focused color
                            </span>
                          </div>

                          <div className="bg-[#F9FAFB] p-4 sm:p-5">
                            <div className="hidden grid-cols-[1.15fr_0.7fr_1fr_1.25fr] gap-3 border-b border-[#E9E9E9] px-3 pb-2 font-mono text-[9px] uppercase tracking-[0.1em] text-[#87888A] sm:grid">
                              <span>Match level</span>
                              <span>Range</span>
                              <span>Chip</span>
                              <span>Default → focused</span>
                            </div>

                            <div className="divide-y divide-[#E9E9E9]">
                              {[
                                {
                                  label: "Excellent match",
                                  range: "9.0–10.0",
                                  score: "9.6",
                                  token: "Green 400 → 500",
                                  colors: "#4ADE80 → #22C55E",
                                  chip: "bg-[#4ADE80] text-black hover:bg-[#22C55E]",
                                },
                                {
                                  label: "Good match",
                                  range: "8.0–8.9",
                                  score: "8.3",
                                  token: "Green 200 → 300",
                                  colors: "#BBF7D0 → #86EFAC",
                                  chip: "bg-[#BBF7D0] text-[#123F20] hover:bg-[#86EFAC]",
                                },
                                {
                                  label: "Fair match",
                                  range: "7.0–7.9",
                                  score: "7.5",
                                  token: "Yellow 100 → 200",
                                  colors: "#FDEFC0 → #FEF08A",
                                  chip: "bg-[#FDEFC0] text-[#614B03] hover:bg-[#FEF08A]",
                                },
                                {
                                  label: "Poor match",
                                  range: "Below 7.0",
                                  score: "4.9",
                                  token: "Red 100 → 200",
                                  colors: "#FFEAEA → #FECACA",
                                  chip: "bg-[#FFEAEA] text-[#700E1D] hover:bg-[#FECACA]",
                                },
                              ].map((match) => (
                                <div
                                  key={match.label}
                                  className="grid gap-3 px-3 py-3 sm:grid-cols-[1.15fr_0.7fr_1fr_1.25fr] sm:items-center"
                                >
                                  <div className="flex items-baseline justify-between gap-3 sm:block">
                                    <p className="font-sans text-[12px] font-semibold leading-4 text-[#0A1516]">
                                      {match.label}
                                    </p>
                                    <p className="font-mono text-[10px] text-[#87888A] sm:hidden">
                                      {match.range}
                                    </p>
                                  </div>
                                  <p className="hidden font-mono text-[10px] text-[#4F5457] sm:block">
                                    {match.range}
                                  </p>
                                  <div>
                                    <button
                                      type="button"
                                      aria-label={`${match.label}: ${match.score}`}
                                      className={`inline-flex h-10 items-center gap-2 rounded-full px-4 font-sans text-[14px] font-semibold leading-5 transition-colors duration-150 ${match.chip}`}
                                    >
                                      {match.score}
                                      <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
                                    </button>
                                  </div>
                                  <div>
                                    <p className="font-sans text-[10px] font-semibold leading-4 text-[#4F5457]">
                                      {match.token}
                                    </p>
                                    <p className="font-mono text-[9px] leading-4 text-[#87888A]">
                                      {match.colors}
                                    </p>
                                  </div>
                                </div>
                              ))}

                              <div className="grid gap-3 px-3 py-3 sm:grid-cols-[1.15fr_0.7fr_1fr_1.25fr] sm:items-center">
                                <div className="flex items-baseline justify-between gap-3 sm:block">
                                  <p className="font-sans text-[12px] font-semibold leading-4 text-[#0A1516]">
                                    Unknown
                                  </p>
                                  <p className="font-mono text-[10px] text-[#87888A] sm:hidden">N/A</p>
                                </div>
                                <p className="hidden font-mono text-[10px] text-[#4F5457] sm:block">N/A</p>
                                <div className="group relative w-fit">
                                  <button
                                    type="button"
                                    aria-label="Unknown score: waiting for response"
                                    className="inline-flex h-10 items-center gap-2 rounded-full px-4 font-sans text-[14px] font-semibold leading-5 text-[#87888A]"
                                  >
                                    N/A
                                    <Info aria-hidden className="size-4" strokeWidth={1.75} />
                                  </button>
                                  <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-10 -translate-x-1/2 translate-y-1 rounded-[4px] bg-white px-3 py-2 font-sans text-[11px] font-semibold whitespace-nowrap text-[#4F5457] opacity-0 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] transition-[opacity,transform] duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                                    Waiting for response
                                  </span>
                                </div>
                                <div>
                                  <p className="font-sans text-[10px] font-semibold leading-4 text-[#4F5457]">
                                    Gray 600
                                  </p>
                                  <p className="font-mono text-[9px] leading-4 text-[#87888A]">#87888A</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {item.id.startsWith("placeholder") ? (
                        <div className="w-full max-w-sm rounded-xl border border-dashed border-foreground/20 bg-background/40 p-8 text-center">
                          <div className="mx-auto size-10 rounded-lg bg-foreground/10" />
                          <p className="mt-4 font-sans text-[15px] font-medium text-foreground/60">
                            {item.label}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <figcaption className="mt-6 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                  {componentShowcaseItems[componentShowcaseItem].caption}
                </figcaption>
              </figure>
            </div>

            <h3 className="mt-12 font-sans text-[18px] font-semibold tracking-tight text-foreground/80 sm:mt-16">
              Business Impacts
            </h3>
            <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
              Launched the platform and rollout to the existing clients
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2">
              <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
                <h4 className="mb-3 font-sans text-[20px] font-bold text-foreground">
                  74%↓ less time
                </h4>
                <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[16px]">
                  Customer success team spent 74% less with Sprockets weekly after fully adopted.
                </p>
              </div>
              <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
                <h4 className="mb-3 font-sans text-[20px] font-bold text-foreground">
                  87%↑ interview conversion
                </h4>
                <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[16px]">
                  With the newly designed job application flow, scored high applicants are able to proactively schedule interviews
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
    );
  }

  return (
    <article className="pb-16 sm:pb-24">
      <div className="reveal mx-auto mt-16 w-full max-w-sm sm:mt-24">
        <span className="flex size-11 items-center justify-center rounded-full bg-foreground/5 text-foreground/70">
          <LockIcon />
        </span>

        <h1 className="mt-5 font-sans text-[clamp(1.375rem,5vw,1.75rem)] font-semibold tracking-tight text-foreground">
          Protected
        </h1>
        <p className="mt-2 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/55">
          These case studies are shared privately. Enter the passcode, or get in
          touch and I&apos;ll send it over.
        </p>

        <form onSubmit={onSubmit} className="mt-6">
          <label
            htmlFor="hiring-case-study-passcode"
            className="block font-sans text-[13px] font-medium text-foreground/70"
          >
            Passcode
          </label>
          <input
            id="hiring-case-study-passcode"
            name="passcode"
            type="password"
            autoComplete="off"
            autoFocus
            value={value}
            aria-invalid={error || undefined}
            aria-describedby={error ? "hiring-case-study-passcode-error" : undefined}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              if (error) setError(false);
            }}
            className="mt-2 block h-11 w-full rounded-lg border border-foreground/15 bg-transparent px-3 font-sans text-[15px] text-foreground outline-none transition-colors placeholder:text-foreground/30 focus-visible:border-foreground/40"
          />

          {error ? (
            <p
              id="hiring-case-study-passcode-error"
              role="alert"
              className="mt-2 font-sans text-[13px] text-[#E11919]"
            >
              That passcode isn&apos;t right. Try again.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-4 inline-flex min-h-11 items-center rounded-full border border-foreground/15 bg-foreground px-5 font-sans text-[14px] font-medium text-background transition-opacity hover:opacity-80 active:opacity-70"
          >
            Unlock
          </button>
        </form>
      </div>
    </article>
  );
}
