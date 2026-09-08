import { TtsIcon } from "@/components/tts/TtsIcon";

function InviteRow({
  icon,
  iconBg,
  tag,
  title,
  body,
  first,
  padded,
}: {
  icon: string;
  iconBg?: string;
  tag?: string;
  title?: string;
  body: string;
  first?: boolean;
  padded?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border border-[#d3d4d5] ${
        padded ? "p-4 @[700px]:p-6" : "px-4 pb-4 pt-7 @[700px]:px-6 @[700px]:pb-6 @[700px]:pt-8"
      }`}
    >
      {tag ? (
        <span className="absolute left-[-1px] top-0 flex h-4 max-w-[186px] items-center rounded-br-lg rounded-tl-lg bg-[rgba(51,127,248,0.15)] px-1.5 text-[12px] leading-[18px] text-[#337ff8]">
          {tag}
        </span>
      ) : null}
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`relative size-10 shrink-0 overflow-hidden ${
              iconBg ? `rounded-full ${iconBg}` : ""
            }`}
          >
            <span
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                icon === "invite-gmv" ? "-scale-y-100 rotate-180" : ""
              }`}
            >
              <TtsIcon name={icon} size={iconBg ? 34 : 40} />
            </span>
          </span>
          <div className="min-w-0">
            {title ? (
              <p className="truncate text-[12px] font-medium leading-[18px] text-[#171718]">
                {title}
              </p>
            ) : null}
            <p className="text-[13px] leading-5 text-[#848688] @[700px]:text-[14px]">
              {body}
            </p>
          </div>
        </div>
        <span
          className={`flex h-8 w-[89px] shrink-0 items-center justify-center rounded bg-[#009995] text-[14px] font-medium text-white ${
            first ? "tts-invite-first" : ""
          }`}
        >
          Invite
        </span>
      </div>
    </div>
  );
}

export function TtsInviteMenu() {
  return (
    <div className="tts-invite-menu flex w-full flex-col gap-[11px] rounded bg-white p-3 shadow-[0px_8px_20px_0px_rgba(0,0,0,0.12)] @[700px]:p-4">
      <p className="text-[18px] font-medium leading-7 text-[rgba(0,0,0,0.92)] @[700px]:text-[20px]">
        Get matched by TikTok Shop
      </p>
      <InviteRow
        icon="invite-crm"
        tag="Outreach optimized"
        body="Defined your goals, and let us find the creators to achieve your goal. Commission only."
        first
      />
      <div className="flex flex-wrap items-end gap-2">
        <p className="text-[18px] font-medium leading-7 text-[rgba(0,0,0,0.92)] @[700px]:text-[20px]">
          Invite on your own
        </p>
        <span className="mb-0.5 inline-flex items-center gap-1 py-1 text-[12px] font-medium leading-[18px] text-[#017b77]">
          Compare fee structure
          <TtsIcon name="launch" size={16} />
        </span>
      </div>
      <InviteRow
        icon="invite-gmv"
        iconBg="bg-[#e3e7eb]"
        tag="Creator preferred"
        title="Flat fee"
        body="Flat fee increase invite acceptance best for hero products, ads, and final cut control."
      />
      <InviteRow
        icon="invite-commission"
        iconBg="bg-[#e3e7eb]"
        title="Commission only"
        body="Only pay when a sale is made. Best for scaling creator content across multiple products."
        padded
      />
    </div>
  );
}
