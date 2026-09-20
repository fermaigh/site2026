"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";

const PASSCODE = "0000";
const SESSION_KEY = "hiring-case-study-unlocked";

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
  const [personaSlide, setPersonaSlide] = useState(0);
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
                    className="h-full w-full max-w-[180px] object-contain"
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
                Design Deliverables
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
                User journey mapping: Showing how different user groups (Operation/Payer, Hiring Manager, Job Applicants) navigate through the hiring workflow from onboarding through job completion.
              </figcaption>
            </figure>

            <div className="mt-10 space-y-6">
              <figure className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
                <div className="w-full overflow-hidden rounded-lg bg-foreground/5">
                  <div
                    className="w-[300%] transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${personaSlide * (100 / 3)}%)` }}
                  >
                    <img
                      src="https://www.figma.com/api/mcp/asset/0931d153-f218-4453-9edb-66db7e6f6f6a/f73eb.png"
                      alt="Detailed personas for Operations, Hiring Manager, and Job Applicant user groups"
                      className="block h-auto w-full max-w-none"
                    />
                  </div>
                </div>
                <figcaption className="mt-6 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                  {personaSlide === 0 && "Operations / Payer: Makes decisions at the organizational level."}
                  {personaSlide === 1 && "Hiring Manager: Manages hiring and staffing at individual locations."}
                  {personaSlide === 2 && "Job Applicant: Applies and completes the assessment."}
                </figcaption>
              </figure>
              <div className="flex items-center justify-center gap-2" aria-label="Persona carousel">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setPersonaSlide(index)}
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
                  src="https://www.figma.com/api/mcp/asset/37e42041-998a-4705-b619-7e7ebdd03bdf/e03f9.png"
                  alt="System prioritization roadmap showing UX vision and product areas for improvements across the platform"
                  className="w-full h-auto max-w-none"
                />
              </div>
              <figcaption className="mt-6 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                System prioritization roadmap: UX vision principles (Efficiency, High quality, Effortless, Contextual, Humanity) and key product areas requiring improvements for optimal user experience across all platforms.
              </figcaption>
            </figure>

            <figure className="mt-10 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 overflow-hidden">
              <div className="w-full aspect-auto flex items-center justify-center bg-foreground/5 rounded-lg overflow-x-auto">
                <img
                  src="https://www.figma.com/api/mcp/asset/079a6df6-1e55-4bb0-8b3c-176a5f4ab378/b262e.png"
                  alt="Detailed workflow diagram showing CRM, Account Owner, Hiring Manager, and Applicants user flows and platform touchpoints"
                  className="w-full h-auto max-w-none"
                />
              </div>
              <figcaption className="mt-6 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                Detailed system flows: Comprehensive workflow diagram mapping how CRM administrators, Account Owners, Hiring Managers, and Applicants interact with the platform across different journey stages.
              </figcaption>
            </figure>

            <div className="mt-12 border-t border-foreground/10 pt-10 sm:mt-14 sm:pt-12">
              <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
                Design execution
              </h2>
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
              <div className="mt-6 grid grid-cols-1 gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-1 sm:grid-cols-3" aria-label="After design user segment">
                {([
                  ["operations", "Operations"],
                  ["hiring-manager", "Hiring Manager"],
                  ["job-applicant", "Job Applicant"],
                ] as const).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={afterAudience === value}
                    onClick={() => setAfterAudience(value)}
                    className={`min-h-10 rounded-lg px-4 py-2 font-sans text-[14px] font-medium transition-colors ${
                      afterAudience === value
                        ? "bg-background text-foreground shadow-sm"
                        : "text-foreground/55 hover:text-foreground"
                    }`}
                  >
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
                  <div className="flex aspect-video w-full items-center justify-center overflow-auto rounded-lg bg-foreground/5">
                    {hiringManagerSlide === 0 && (
                      <img
                        src="https://www.figma.com/api/mcp/asset/9ee0f701-1246-4aeb-b3e9-57d2b91bc2f6/5498d.png"
                        alt="View all talent source and interview prep in web app"
                        className="h-auto w-full max-w-none"
                      />
                    )}
                    {hiringManagerSlide === 1 && (
                      <img
                        src="https://www.figma.com/api/mcp/asset/5f98b044-04b9-4157-b7e4-956fbf13d318/ce628.png"
                        alt="Scheduling and manage interview in mobile app"
                        className="h-auto w-full max-w-none"
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
                  <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-foreground/5">
                    <img
                      src="/projects/hiring-app/screens/screen-16.png"
                      alt="Job applicant mobile interview and scheduling flow"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <figcaption className="mt-6 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
                    Mobile applicant experience: Candidates complete their virtual interview, provide required information, and schedule a conversation in one guided flow.
                  </figcaption>
                </figure>
              </div>
            ) : null}

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
