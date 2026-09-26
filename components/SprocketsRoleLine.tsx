import Image from "next/image";

function SprocketsMark() {
  return (
    <span className="sprockets-brand-logo-crop" aria-hidden="true">
      <Image
        src="/projects/hiring-app/sprockets-logo.png"
        alt=""
        width={207}
        height={87}
        className="sprockets-brand-logo"
      />
    </span>
  );
}

export function SprocketsRoleLine({ value }: { value: string }) {
  return (
    <p>
      <span className="font-medium text-foreground">Role:</span>{" "}
      <strong className="font-semibold text-foreground">{value}</strong>{" "}
      <span className="sprockets-brand" role="img" aria-label="Sprockets">
        <span className="sprockets-brand-mark">
          <SprocketsMark />
        </span>
        <span className="sprockets-brand-name" aria-hidden="true">
          Sprockets
        </span>
      </span>
    </p>
  );
}
