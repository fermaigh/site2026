import { TtsIcon } from "@/components/tts/TtsIcon";

function InviteRow({
  icon,
  iconBg,
  tag,
  title,
  body,
}: {
  icon: string;
  iconBg?: string;
  tag?: string;
  title?: string;
  body: string;
}) {
  return (
    <div className="relative w-[600px] overflow-hidden rounded-lg border border-[#d3d4d5] px-6 pb-6 pt-8">
      {tag ? (
        <span className="absolute left-0 top-0 max-w-[186px] rounded-br-lg rounded-tl-lg bg-[rgba(51,127,248,0.15)] px-1.5 text-[12px] leading-4 text-[#337ff8]">
          {tag}
        </span>
      ) : null}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full ${
              iconBg ?? ""
            }`}
          >
            <TtsIcon
              name={icon}
              size={iconBg ? 34 : 40}
              className={icon === "invite-gmv" ? "rotate-180" : undefined}
            />
          </span>
          <div className="w-[380px]">
            {title ? (
              <p className="truncate text-[12px] font-medium leading-[18px] text-[#171718]">
                {title}
              </p>
            ) : null}
            <p className="text-[14px] leading-5 text-[#848688]">{body}</p>
          </div>
        </div>
        <span className="flex h-8 w-[89px] items-center justify-center rounded bg-[#009995] text-[14px] font-medium text-white">
          Invite
        </span>
      </div>
    </div>
  );
}

export function TtsInviteMenu() {
  return (
    <div className="tts-invite-menu w-[632px] rounded bg-white p-4 shadow-[0px_8px_20px_0px_rgba(0,0,0,0.12)]">
      <p className="h-7 text-[20px] font-medium leading-7 text-[rgba(0,0,0,0.92)]">
        Get matched by TikTok Shop
      </p>
      <div className="mt-[11px]">
        <InviteRow
          icon="invite-crm"
          tag="Outreach optimized"
          body="Defined your goals, and let us find the creators to achieve your goal. Commission only."
        />
      </div>
      <div className="mt-[11px] flex h-7 items-end gap-2">
        <p className="text-[20px] font-medium leading-7 text-[rgba(0,0,0,0.92)]">
          Invite on your own
        </p>
        <span className="mb-0.5 inline-flex items-center gap-1 text-[12px] font-medium leading-[18px] text-[#017b77]">
          Compare fee structure
          <TtsIcon name="launch" size={16} />
        </span>
      </div>
      <div className="mt-[11px] flex flex-col gap-[11px]">
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
        />
      </div>
    </div>
  );
}
