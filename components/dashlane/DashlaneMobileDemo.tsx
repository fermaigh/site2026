"use client";

/* eslint-disable @next/next/no-img-element */

import { useLayoutEffect, useRef } from "react";
import { useDemoPlayback } from "@/components/useDemoPlayback";

const ASSET_ROOT = "/projects/dashlane-mobile";
const PHONE_WIDTH = 395;
const PHONE_HEIGHT = 832;

type Tool = {
  label: string;
  display: string;
  icon: string;
  upgrade?: boolean;
  interactive?: boolean;
};

const tools: Tool[] = [
  { label: "Identity Dashboard", display: "Identity\nDashboard", icon: "identity.svg" },
  { label: "Password generator", display: "Password\ngenerator", icon: "password-generator.svg" },
  { label: "New device connector", display: "New device\nconnector", icon: "new-device.svg" },
  {
    label: "Password Changer",
    display: "Password\nChanger",
    icon: "password-changer.svg",
    upgrade: true,
    interactive: true,
  },
  { label: "VPN", display: "VPN", icon: "vpn.svg", upgrade: true },
  { label: "Dark Web Monitoring", display: "Dark Web\nMonitoring", icon: "dark-web.svg", upgrade: true },
];

type Tab = {
  label: string;
  icon: string;
  active?: boolean;
};

const tabs: Tab[] = [
  { label: "Home", icon: "home.svg" },
  { label: "Vault", icon: "vault.svg" },
  { label: "Contacts", icon: "contacts.svg" },
  { label: "Tools", icon: "tools.svg", active: true },
  { label: "Settings", icon: "settings.svg" },
];

function StatusBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-20 h-10" aria-hidden="true">
      <span className="absolute left-[21px] top-[12px] w-[54px] text-center text-[15px] font-semibold tracking-[-0.3px] text-black">
        9:41
      </span>
      <img
        src={`${ASSET_ROOT}/status.svg`}
        alt=""
        className="absolute right-[0.4px] top-[17.33px]"
      />
    </div>
  );
}

function HomeBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 h-[34px]" aria-hidden="true">
      <span className="absolute bottom-[9px] left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-black" />
    </div>
  );
}

function ToolsScreen() {
  return (
    <div className="dashlane-tools-screen absolute inset-0 bg-[#f5f4f3]">
      <div className="absolute inset-x-0 top-10 h-12 bg-[#d9e6e9]">
        <img
          src={`${ASSET_ROOT}/bell.svg`}
          alt=""
          className="absolute bottom-[13px] left-[18px]"
        />
        <p className="absolute inset-x-0 bottom-[10px] text-center text-[17px] font-semibold leading-[23px] tracking-[-0.41px] text-[#0e353d]">
          Tools
        </p>
      </div>

      <div className="absolute inset-x-[7px] top-24 grid grid-cols-2 gap-2">
        {tools.map((tool) => (
          <div
            key={tool.label}
            className={`relative flex h-40 flex-col items-center justify-center gap-0.5 bg-white px-4 py-6 ${tool.interactive ? "dashlane-password-card" : ""}`}
          >
            {tool.upgrade ? (
              <span className="absolute left-2 top-2 rounded-[2px] border border-[#9fc1c8] px-1 py-0.5 font-sans text-[10px] font-semibold uppercase leading-3 text-[#0e353d]">
                Upgrade
              </span>
            ) : null}
            <img src={`${ASSET_ROOT}/${tool.icon}`} alt="" />
            <p className="flex h-[60px] w-36 items-center justify-center whitespace-pre-line text-center text-[17px] leading-[23px] tracking-[-0.41px] text-black">
              {tool.display}
            </p>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[83px] bg-white">
        <img
          src={`${ASSET_ROOT}/tabbar.svg`}
          alt=""
          className="absolute inset-x-0 top-px"
        />
        <div className="absolute left-1/2 top-px flex -translate-x-1/2 items-start gap-[27px] px-[13.5px]">
          {tabs.map((tab) => (
            <div key={tab.label} className="relative h-[49px] w-12 shrink-0">
              <img
                src={`${ASSET_ROOT}/${tab.icon}`}
                alt=""
                className="absolute left-1/2 top-1 -translate-x-1/2"
              />
              <span
                className={`absolute inset-x-0 bottom-[2px] text-center text-[10px] font-medium tracking-[0.12px] ${tab.active ? "text-[#0e6476]" : "text-[#999592]"}`}
              >
                {tab.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <StatusBar />
      <HomeBar />
    </div>
  );
}

function PaywallScreen() {
  return (
    <div className="dashlane-paywall-screen absolute inset-0 bg-white">
      <StatusBar />
      <span className="absolute right-[15px] top-[54px] text-[17px] leading-[23px] tracking-[-0.41px] text-[#0e353d]">
        Close
      </span>

      <div className="absolute left-6 top-[229px] w-[327px]">
        <img src={`${ASSET_ROOT}/paywall-password-changer.svg`} alt="" />
        <h4 className="mt-2 text-[26px] font-bold leading-[30px] text-[#0e353d]">
          Password Changer is a paid feature
        </h4>
        <p className="mt-4 text-[17px] leading-[23px] tracking-[-0.41px] text-[#615b57]">
          Upgrade to our Essentials plan to change multiple weak passwords—in
          just one tap.
        </p>
      </div>

      <div className="absolute bottom-24 left-6 flex w-[327px] flex-col gap-2">
        <div className="relative h-[50px]">
          <img src={`${ASSET_ROOT}/paywall-main.svg`} alt="" />
          <span className="absolute inset-0 flex items-center justify-center text-[17px] font-medium tracking-[-0.41px] text-white">
            Upgrade to Essentials
          </span>
        </div>
        <div className="dashlane-plan-button relative h-[50px]">
          <span className="absolute inset-0 flex items-center justify-center text-[17px] font-medium tracking-[-0.41px] text-[#0e6476]">
            See plan options
          </span>
        </div>
      </div>

      <HomeBar />
    </div>
  );
}

function DashlanePhone() {
  return (
    <div
      className="relative h-[832px] w-[395px] shrink-0"
      role="img"
      aria-label="Animated Dashlane mobile upgrade flow"
    >
      <div className="absolute inset-0 rounded-[62px] bg-[linear-gradient(150deg,#f4f0e4_0%,#cbc5b1_28%,#8f8979_58%,#d8d3c0_78%,#efebdd_100%)] shadow-[0_18px_40px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.12)]" />
      <div className="absolute inset-px rounded-[61px] border border-[#524b40]/40" />
      <div className="absolute inset-1 rounded-[58px] bg-black" />
      <div className="absolute inset-[5px] rounded-[57px] border border-white/25" />

      <div className="dashlane-phone-screen absolute inset-[10px] overflow-hidden rounded-[52px] bg-white font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Helvetica_Neue',sans-serif]">
        <ToolsScreen />
        <PaywallScreen />
        <span className="dashlane-touch-indicator" aria-hidden="true" />
      </div>

      <div className="absolute left-1/2 top-6 z-30 h-[31px] w-[111px] -translate-x-1/2 rounded-full bg-black" />
      <div className="absolute left-[calc(50%+30px)] top-[35px] z-30 size-[9px] rounded-full bg-[#0b1114]" />
      <div className="absolute left-[-2px] top-[149px] h-[31px] w-[5px] rounded-l-[2px] bg-[#f0ece3]" />
      <div className="absolute left-[-2px] top-[209px] h-14 w-[5px] rounded-l-[2px] bg-[#f0ece3]" />
      <div className="absolute left-[-2px] top-[282px] h-14 w-[5px] rounded-l-[2px] bg-[#f0ece3]" />
      <div className="absolute right-[-2px] top-[246px] h-[100px] w-[5px] rounded-r-[2px] bg-[#f0ece3]" />
    </div>
  );
}

export function DashlaneMobileDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const camera = cameraRef.current;
    const phone = phoneRef.current;
    if (!stage || !camera || !phone) return;

    const fit = () => {
      const width = stage.clientWidth;
      if (!width) return;

      const padding = width < 640 ? 16 : 32;
      const scale = Math.min(1, (width - padding * 2) / PHONE_WIDTH);
      const left = Math.round((width - PHONE_WIDTH * scale) / 2);

      phone.style.top = `${padding}px`;
      phone.style.transform = `translateX(${left}px) scale(${scale})`;
      camera.style.height = `${Math.round(PHONE_HEIGHT * scale + padding * 2)}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    window.addEventListener("resize", fit);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  useDemoPlayback(cameraRef, "dashlane-mobile-active");

  return (
    <section aria-label="Password Changer mobile live demo">
      <h3 className="mb-8 px-4 font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground sm:px-6">
        Mobile upgrade flow
      </h3>
      <div ref={stageRef} className="tts-collab-stage @container">
        <div className="tts-collab-bezel tts-demo3-bezel">
          <div ref={cameraRef} className="tts-collab-camera">
            <div
              ref={phoneRef}
              className="absolute left-0 top-0 origin-top-left will-change-transform"
            >
              <DashlanePhone />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
