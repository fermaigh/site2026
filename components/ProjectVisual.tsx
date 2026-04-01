import type { Project } from "@/data/projects";

function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 rounded-[1.35rem] border border-black/[0.08] bg-zinc-100 p-1 shadow-sm dark:border-white/10 dark:bg-zinc-900 ${className}`}
    >
      <div className="overflow-hidden rounded-[1.15rem] bg-white dark:bg-zinc-950">
        {children}
      </div>
    </div>
  );
}

export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  if (!visual) return null;

  if (visual === "rail") {
    return (
      <div className="mb-10 flex flex-wrap items-end gap-3 md:gap-4">
        <PhoneFrame className="h-[200px] w-[112px]">
          <div className="flex h-full flex-col bg-gradient-to-b from-violet-50 to-white p-2 dark:from-violet-950/40 dark:to-zinc-950">
            <div className="mb-2 h-2 w-8 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="space-y-1.5">
              <div className="h-6 rounded-md bg-violet-500/20" />
              <div className="h-6 rounded-md bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-6 rounded-md bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        </PhoneFrame>
        <div className="flex h-[160px] w-[200px] flex-col rounded-xl border border-black/[0.06] bg-white p-3 shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
            Sites
          </div>
          <div className="flex-1 rounded-lg bg-gradient-to-br from-sky-100 to-indigo-50 dark:from-sky-950/50 dark:to-indigo-950/30" />
        </div>
        <PhoneFrame className="h-[180px] w-[100px]">
          <div className="flex h-full flex-col bg-zinc-50 p-2 dark:bg-zinc-900">
            <div className="mb-2 flex gap-1">
              <div className="h-1.5 flex-1 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
            <div className="flex-1 rounded-md bg-gradient-to-b from-amber-100/80 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/20" />
          </div>
        </PhoneFrame>
      </div>
    );
  }

  if (visual === "interop") {
    return (
      <div className="mb-10 flex flex-wrap gap-3">
        {["Sites", "Draw", "Design", "Create"].map((label, i) => (
          <div
            key={label}
            className="flex h-28 w-24 flex-col rounded-xl border border-black/[0.06] bg-white p-2 shadow-sm dark:border-white/10 dark:bg-zinc-900"
            style={{ transform: `rotate(${i * 2 - 3}deg)` }}
          >
            <span className="text-[9px] font-medium text-zinc-400">{label}</span>
            <div
              className="mt-auto flex-1 rounded-lg"
              style={{
                background: `linear-gradient(135deg, hsl(${220 + i * 25}, 45%, 92%), hsl(${260 + i * 15}, 40%, 88%))`,
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (visual === "reels") {
    return (
      <div className="mb-10 flex gap-3">
        <PhoneFrame className="h-[220px] w-[124px]">
          <div className="relative flex h-full items-end justify-center bg-gradient-to-b from-fuchsia-600 via-purple-600 to-indigo-900 pb-6">
            <div className="absolute inset-x-2 top-3 h-24 rounded-lg bg-white/10 backdrop-blur-sm" />
            <div className="h-10 w-10 rounded-full border-2 border-white/80" />
          </div>
        </PhoneFrame>
        <PhoneFrame className="h-[200px] w-[112px] translate-y-4">
          <div className="flex h-full flex-col bg-black">
            <div className="flex-1 bg-gradient-to-b from-orange-500 to-pink-600" />
          </div>
        </PhoneFrame>
      </div>
    );
  }

  if (visual === "music") {
    return (
      <div className="mb-10 flex flex-wrap items-end gap-4">
        <PhoneFrame className="h-[210px] w-[118px]">
          <div className="flex h-full flex-col bg-black text-white">
            <div className="flex items-center justify-between px-3 pt-2 text-[10px] text-white/60">
              <span>9:41</span>
            </div>
            <div className="mx-3 mt-3 flex-1 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500" />
            <div className="p-3">
              <div className="h-1 rounded-full bg-white/20" />
            </div>
          </div>
        </PhoneFrame>
        <div className="flex h-36 w-36 flex-col items-center justify-center rounded-2xl border border-black/[0.06] bg-zinc-50 dark:border-white/10 dark:bg-zinc-900">
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-violet-400 to-pink-400" />
          <span className="mt-2 text-[10px] text-zinc-500">Album</span>
        </div>
        <div className="flex h-40 w-28 flex-col rounded-xl border border-black/[0.06] bg-white p-2 dark:border-white/10 dark:bg-zinc-900">
          <div className="flex-1 rounded-lg bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-950">
            <div className="mx-auto mt-4 w-12 space-y-1">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              ))}
            </div>
          </div>
          <span className="mt-1 text-center text-[9px] text-zinc-400">Lyrics</span>
        </div>
      </div>
    );
  }

  if (visual === "business") {
    return (
      <div className="mb-10 flex flex-wrap gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex h-32 w-[140px] flex-col rounded-xl border border-black/[0.06] bg-white p-2 shadow-sm dark:border-white/10 dark:bg-zinc-900"
          >
            <div className="h-16 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/30" />
            <div className="mt-2 h-6 rounded-md bg-zinc-900 dark:bg-zinc-100" />
          </div>
        ))}
      </div>
    );
  }

  if (visual === "keyboard") {
    return (
      <div className="mb-10 flex flex-wrap gap-4">
        <PhoneFrame className="h-[200px] w-[280px] max-w-full">
          <div className="flex h-full flex-col bg-zinc-100 p-2 dark:bg-zinc-900">
            <div className="flex-1 rounded-lg bg-white p-2 text-[11px] text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
              Type mode
            </div>
            <div className="mt-2 grid grid-cols-10 gap-0.5 rounded-lg bg-zinc-300/80 p-1.5 dark:bg-zinc-800">
              {Array.from({ length: 30 }).map((_, j) => (
                <div
                  key={j}
                  className="h-2 rounded-[2px] bg-white shadow-sm dark:bg-zinc-700"
                />
              ))}
            </div>
          </div>
        </PhoneFrame>
        <PhoneFrame className="h-[180px] w-[260px] max-w-full">
          <div className="flex h-full flex-col bg-zinc-100 p-2 dark:bg-zinc-900">
            <div className="flex-1 rounded-lg bg-white p-2 text-[11px] text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
              Search mode
            </div>
            <div className="mt-2 flex gap-1 rounded-lg bg-zinc-300/80 p-2 dark:bg-zinc-800">
              <div className="h-8 flex-1 rounded-md bg-white dark:bg-zinc-700" />
            </div>
          </div>
        </PhoneFrame>
      </div>
    );
  }

  if (visual === "lamp") {
    return (
      <div className="mb-10 flex flex-wrap items-end gap-6">
        <div className="flex h-44 w-32 flex-col items-center justify-end rounded-2xl border border-black/[0.06] bg-amber-50/80 p-4 dark:border-white/10 dark:bg-amber-950/20">
          <div className="h-20 w-3 rounded-full bg-amber-400/60" />
          <div className="mt-2 h-8 w-16 rounded-full bg-amber-300 dark:bg-amber-600/40" />
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-24 w-16 rounded-full border-2 border-zinc-200 bg-gradient-to-b from-yellow-100 to-amber-200 dark:border-zinc-700 dark:from-yellow-900/40 dark:to-amber-900/40"
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
