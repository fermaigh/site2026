import Image from "next/image";

function SprocketsMark() {
  return (
    <Image
      src="/projects/hiring-app/sprockets-mark.svg"
      alt=""
      width={208}
      height={208}
      className="block size-full"
      aria-hidden="true"
    />
  );
}

export function SprocketsRoleLine({ value }: { value: string }) {
  return (
    <p>
      <span className="font-medium text-foreground">Role:</span>{" "}
      <strong className="font-semibold text-foreground">{value}</strong>{" "}
      <span className="sprockets-brand-slot">
        <span className="sprockets-brand" role="img" aria-label="Sprockets">
          <span className="sprockets-brand-mark">
            <SprocketsMark />
          </span>
          <span className="sprockets-brand-name" aria-hidden="true">
            Sprockets
          </span>
        </span>
      </span>
    </p>
  );
}
