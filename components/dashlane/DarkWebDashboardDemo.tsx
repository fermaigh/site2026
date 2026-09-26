"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ClipboardList,
  Gauge,
  Globe2,
  LockKeyhole,
  MoreVertical,
  Puzzle,
  RefreshCw,
  Settings,
  ShieldCheck,
  Star,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useDemoFit } from "@/components/useDemoFit";

const UI_WIDTH = 1440;
const UI_HEIGHT = 892;

function BrowserChrome() {
  return (
    <div className="absolute inset-x-0 top-0 h-[82px] overflow-hidden bg-[#f7f8fa] text-[#4c5156]">
      <div className="flex h-[35px] items-center bg-[#dfe2e6] px-4">
        <div className="mr-5 flex gap-[7px]">
          <span className="size-[12px] rounded-full bg-[#ef6a5b]" />
          <span className="size-[12px] rounded-full bg-[#f4bd4f]" />
          <span className="size-[12px] rounded-full bg-[#61c454]" />
        </div>
        <div className="flex h-[29px] w-[190px] items-center gap-2 self-end rounded-t-[8px] bg-[#eef0f2] px-3 text-[11px]">
          <Globe2 className="size-[14px] text-[#73787d]" strokeWidth={1.8} />
          New Tab
          <span className="ml-auto text-[16px] leading-none">×</span>
        </div>
        <div className="ml-[2px] flex h-[29px] w-[215px] items-center gap-2 self-end rounded-t-[8px] bg-white px-3 text-[11px] text-[#2e3337]">
          <span className="grid size-[16px] place-items-center overflow-hidden rounded-[3px] bg-[#0f3339]">
            <Image src="/projects/dashlane-logo.png" alt="" width={16} height={16} />
          </span>
          Dashlane
          <span className="ml-auto text-[16px] leading-none">×</span>
        </div>
        <span className="ml-3 text-[19px] leading-none text-[#62676d]">+</span>
      </div>
      <div className="flex h-[47px] items-center gap-4 border-b border-[#d7dadd] bg-white px-4">
        <ArrowLeft className="size-[16px]" strokeWidth={1.7} />
        <ArrowRight className="size-[16px] text-[#a9adb1]" strokeWidth={1.7} />
        <RefreshCw className="size-[15px]" strokeWidth={1.7} />
        <div className="flex h-[30px] flex-1 items-center rounded-full bg-[#f1f3f4] px-4 text-[11px] text-[#686d72]">
          <LockKeyhole className="mr-2 size-[12px]" strokeWidth={1.8} />
          <span className="font-medium text-[#30353a]">Dashlane</span>
          <span className="mx-1.5 text-[#a1a5a9]">|</span>
          https://console.dashlane.com/report
          <Star className="ml-auto size-[15px]" strokeWidth={1.6} />
        </div>
        <Puzzle className="size-[16px]" strokeWidth={1.7} />
        <MoreVertical className="size-[17px]" strokeWidth={1.7} />
        <span className="grid size-[25px] place-items-center rounded-full bg-[#4972ca] text-[11px] font-semibold text-white">
          A
        </span>
      </div>
    </div>
  );
}

const navItems = [
  { label: "Dashboard", icon: Gauge, active: true },
  { label: "Users", icon: UserRound },
  { label: "Groups", icon: UsersRound },
  { label: "Activity log", icon: ClipboardList },
  { label: "Settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="absolute bottom-0 left-0 top-[82px] w-[256px] bg-[#10353c] text-white">
      <div className="flex h-[83px] items-center border-b border-white/10 px-8">
        <span className="grid size-[39px] place-items-center overflow-hidden rounded-[8px] bg-[#10353c]">
          <Image src="/projects/dashlane-logo.png" alt="" width={39} height={39} />
        </span>
        <span className="ml-3 text-[18px] font-bold tracking-[0.21em]">DASHLANE</span>
      </div>
      <nav className="pt-5" aria-label="Dashlane admin navigation">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`flex h-[52px] w-full items-center px-8 text-left text-[14px] transition-colors duration-200 ${
              active
                ? "bg-[#3d5e64] font-semibold"
                : "text-white/85 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="mr-4 size-[19px]" strokeWidth={1.7} />
            {label}
          </button>
        ))}
        <div className="mb-2 mt-7 px-8 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/50">
          Security tools
        </div>
        <button
          type="button"
          className="flex h-[52px] w-full items-center px-8 text-left text-[14px] text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-white"
        >
          <Activity className="mr-4 size-[19px]" strokeWidth={1.7} />
          Dark Web Insights
          <span className="ml-auto rounded-[3px] bg-[#8ce5d6] px-[6px] py-[3px] text-[9px] font-bold tracking-wide text-[#12373d]">
            NEW
          </span>
        </button>
      </nav>
    </aside>
  );
}

function MetricCard({
  label,
  value,
  meta,
  icon,
  valueClassName = "text-[#1f282b]",
}: {
  label: string;
  value: string;
  meta?: string;
  icon?: ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="h-[132px] rounded-[8px] border border-[#dce1e2] bg-white px-5 py-[18px] shadow-[0_1px_2px_rgba(14,41,45,0.03)] transition-transform duration-200 hover:-translate-y-[2px] hover:shadow-[0_5px_18px_rgba(14,41,45,0.09)]">
      <div className="flex items-center text-[12px] font-medium text-[#536065]">
        {label}
        {icon ? <span className="ml-auto">{icon}</span> : null}
      </div>
      <div className="mt-[13px] flex items-baseline gap-2">
        <span className={`text-[38px] font-light leading-none tracking-[-0.035em] ${valueClassName}`}>
          {value}
        </span>
        {meta ? <span className="text-[12px] text-[#778286]">{meta}</span> : null}
      </div>
    </div>
  );
}

const summary = [
  ["86.2%", "Overall score"],
  ["5,177", "Total passwords"],
  ["3,934", "Safe"],
  ["823", "Weak"],
  ["520", "Reused"],
  ["5", "Compromised"],
  ["32", "Excluded"],
];

function PasswordHealthChart() {
  return (
    <section className="h-[418px] rounded-[8px] border border-[#dce1e2] bg-white shadow-[0_1px_2px_rgba(14,41,45,0.03)]">
      <header className="flex h-[64px] items-center border-b border-[#e5e8e9] px-6">
        <h4 className="text-[16px] font-semibold text-[#263135]">Password Health score details</h4>
        <button
          type="button"
          className="ml-auto flex h-[32px] min-w-[88px] items-center justify-between rounded-[4px] border border-[#cbd2d4] px-3 text-[11px] text-[#465256] transition-colors hover:bg-[#f3f6f6]"
        >
          All time
          <ChevronDown className="size-[14px]" strokeWidth={1.8} />
        </button>
      </header>
      <div className="px-6 pt-5">
        <div className="relative ml-8 h-[188px] w-[620px]">
          <div className="absolute -left-8 top-[-5px] flex h-[162px] flex-col justify-between text-[10px] text-[#929b9e]">
            <span>100</span>
            <span>50</span>
            <span>0</span>
          </div>
          <svg viewBox="0 0 620 168" className="h-[168px] w-full overflow-visible" aria-label="Password health score trend">
            <defs>
              <linearGradient id="dashlane-chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#35c29b" stopOpacity="0.26" />
                <stop offset="100%" stopColor="#35c29b" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {[2, 55, 108, 161].map((y) => (
              <line key={y} x1="0" x2="620" y1={y} y2={y} stroke="#e6eaea" strokeWidth="1" />
            ))}
            <path
              d="M0 68 L45 68 L91 99 L137 129 L183 108 L229 84 L275 64 L321 38 L367 29 L413 21 L459 35 L505 25 L551 30 L597 20 L620 22 L620 162 L0 162 Z"
              fill="url(#dashlane-chart-fill)"
            />
            <path
              d="M0 68 L45 68 L91 99 L137 129 L183 108 L229 84 L275 64 L321 38 L367 29 L413 21 L459 35 L505 25 L551 30 L597 20 L620 22"
              fill="none"
              stroke="#23ad86"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <div className="mt-2 flex justify-between text-[9px] text-[#929b9e]">
            <span>Jul 2019</span>
            <span>Nov</span>
            <span>Mar 2020</span>
            <span>Jul</span>
            <span>Nov</span>
            <span>Mar 2021</span>
            <span>Jul</span>
            <span>Feb</span>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-7 border-t border-[#e7eaeb] pt-[17px]">
          {summary.map(([value, label], index) => (
            <div key={label} className={`${index ? "border-l border-[#e7eaeb]" : ""} px-3 text-center`}>
              <div className="text-[15px] font-semibold text-[#273337]">{value}</div>
              <div className="mt-1 whitespace-nowrap text-[9px] text-[#7f898d]">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DarkWebCard() {
  return (
    <section className="flex h-[418px] flex-col rounded-[8px] border border-[#dce1e2] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(14,41,45,0.03)]">
      <span className="w-fit rounded-[3px] bg-[#dbf7f1] px-2 py-1 text-[9px] font-bold tracking-[0.08em] text-[#0c5d52]">
        NEW
      </span>
      <h4 className="mt-4 text-[18px] font-semibold leading-[1.35] text-[#263135]">
        Discover security risks that may be affecting RainDrop INC
      </h4>
      <p className="mt-3 text-[11px] leading-[1.55] text-[#667277]">
        Dark Web Insights helps you uncover compromised employee accounts and take action before they put your organization at risk.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 border-y border-[#e5e8e9] py-4">
        <div>
          <div className="text-[25px] font-light text-[#d74848]">23</div>
          <div className="mt-1 text-[10px] text-[#737e82]">Security incidents</div>
        </div>
        <div className="border-l border-[#e5e8e9] pl-4">
          <div className="text-[25px] font-light text-[#263135]">15</div>
          <div className="mt-1 text-[10px] text-[#737e82]">Emails affected</div>
        </div>
      </div>
      <button
        type="button"
        className="mt-auto h-[38px] rounded-[4px] bg-[#0f3b42] text-[12px] font-semibold text-white transition-[background-color,transform,box-shadow] duration-200 hover:bg-[#092a2f] hover:shadow-[0_5px_12px_rgba(9,42,47,0.2)] active:translate-y-px"
      >
        Get started
      </button>
    </section>
  );
}

function Dashboard() {
  return (
    <div className="absolute bottom-0 left-[256px] right-0 top-[82px] bg-[#f5f7f7]">
      <header className="flex h-[83px] items-center border-b border-[#dfe3e4] bg-white px-8">
        <span className="text-[20px] font-semibold text-[#263135]">Dashboard</span>
        <button type="button" className="ml-auto flex items-center gap-3 text-[12px] text-[#4e5a5e]">
          <span className="grid size-[32px] place-items-center rounded-full bg-[#d9eeeb] font-semibold text-[#17464c]">AR</span>
          Account
          <ChevronDown className="size-[14px]" strokeWidth={1.8} />
        </button>
      </header>
      <main className="px-8 pb-8 pt-8">
        <div className="grid grid-cols-4 gap-6">
          <MetricCard
            label="Password Health Score"
            value="86.2%"
            icon={<ShieldCheck className="size-[28px] text-[#28b68c]" strokeWidth={1.7} />}
          />
          <MetricCard label="Compromised passwords" value="122" valueClassName="text-[#d34b4b]" />
          <MetricCard label="Seats taken" value="420" meta="of 500" />
          <MetricCard label="Pending invitations" value="86" />
        </div>
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_300px] gap-6">
          <PasswordHealthChart />
          <DarkWebCard />
        </div>
      </main>
    </div>
  );
}

export function DarkWebDashboardDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);

  useDemoFit(stageRef, fitRef, UI_WIDTH, cameraRef, () => UI_HEIGHT);

  return (
    <>
      <h3 className="mb-8 font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
        Dark Web Monitoring dashboard
      </h3>
      <figure
        className="w-full rounded-[20px] border border-foreground/10 bg-foreground/[0.03] p-3 sm:p-5"
        aria-label="Interactive Dashlane admin dashboard showing Password Health and Dark Web Insights"
      >
        <div ref={stageRef} className="w-full">
          <div
            ref={cameraRef}
            className="relative w-full overflow-hidden rounded-[20px] bg-[#f5f7f7] shadow-[0_12px_35px_rgba(21,45,49,0.11)]"
            style={{ aspectRatio: `${UI_WIDTH} / ${UI_HEIGHT}` }}
          >
            <div
              ref={fitRef}
              className="relative overflow-hidden rounded-[20px] bg-[#f5f7f7] font-sans text-[#263135]"
              style={{ width: UI_WIDTH, height: UI_HEIGHT, transformOrigin: "top left" }}
            >
              <BrowserChrome />
              <Sidebar />
              <Dashboard />
            </div>
          </div>
        </div>
      </figure>
    </>
  );
}
