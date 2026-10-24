import Image from "next/image";

export function ViRoleLine({ value }: { value: string }) {
  return (
    <p>
      <span className="font-medium text-foreground">Role:</span>{" "}
      <strong className="font-semibold text-foreground">{value}</strong>{" "}
      <span className="vi-brand-slot">
        <span className="vi-brand" role="img" aria-label="Vi">
          <span className="vi-brand-mark">
            <Image
              src="/projects/vi-logo.svg"
              alt=""
              width={39}
              height={34}
              className="block size-full"
              aria-hidden="true"
            />
          </span>
          <span className="vi-brand-name" aria-hidden="true">
            Vi
          </span>
        </span>
      </span>
    </p>
  );
}
