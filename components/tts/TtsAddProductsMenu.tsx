import { TtsIcon } from "@/components/tts/TtsIcon";

function AddRow({
  icon,
  tag,
  title,
  body,
  action,
  first,
}: {
  icon: string;
  tag?: string;
  title: string;
  body: string;
  action: string;
  first?: boolean;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-[#d3d4d5] px-4 pb-4 pt-7 @[700px]:px-6 @[700px]:pb-6 @[700px]:pt-8">
      {tag ? (
        <span className="absolute left-[-1px] top-0 flex h-4 max-w-[186px] items-center rounded-br-lg rounded-tl-lg bg-[rgba(51,127,248,0.15)] px-1.5 text-[12px] leading-[18px] text-[#337ff8]">
          {tag}
        </span>
      ) : null}
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-[#e3e7eb]">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <TtsIcon name={icon} size={34} />
            </span>
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-medium leading-[18px] text-[#171718]">
              {title}
            </p>
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
          {action}
        </span>
      </div>
    </div>
  );
}

export function TtsAddProductsMenu() {
  return (
    <div className="tts-invite-menu flex w-full flex-col gap-[11px] rounded bg-white p-3 shadow-[0px_8px_20px_0px_rgba(0,0,0,0.12)] @[700px]:p-4">
      <p className="text-[18px] font-medium leading-7 text-[rgba(0,0,0,0.92)] @[700px]:text-[20px]">
        Add products to open collaboration
      </p>
      <AddRow
        icon="products-selected"
        tag="Recommended"
        title="From your catalog"
        body="Choose live products and set a default commission so eligible creators can start promoting."
        action="Add"
        first
      />
      <AddRow
        icon="invite-commission"
        title="Set commission first"
        body="Apply one commission rate across selected products. Best for launching a new collection quickly."
        action="Add"
      />
    </div>
  );
}
