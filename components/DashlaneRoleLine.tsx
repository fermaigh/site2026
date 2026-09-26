import Image from "next/image";

export function DashlaneRoleLine({ value }: { value: string }) {
  return (
    <p>
      <span className="font-medium text-foreground">Role:</span>{" "}
      <strong className="font-semibold text-foreground">{value}</strong>{" "}
      <span className="dashlane-brand-slot">
        <span className="dashlane-brand" role="img" aria-label="Dashlane">
          <span className="dashlane-brand-mark">
            <Image
              src="/projects/dashlane-logo.png"
              alt=""
              width={400}
              height={400}
              className="block size-full rounded-[0.24rem]"
              aria-hidden="true"
            />
          </span>
          <span className="dashlane-brand-name" aria-hidden="true">
            Dashlane
          </span>
        </span>
      </span>
    </p>
  );
}
