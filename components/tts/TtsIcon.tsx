export function TtsIcon({
  name,
  size,
  width,
  height,
  className,
  alt = "",
}: {
  name: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}) {
  const w = width ?? size ?? 16;
  const h = height ?? size ?? 16;

  return (
    <span
      className={`inline-flex shrink-0 overflow-hidden ${className ?? ""}`}
      style={{ width: w, height: h }}
      aria-hidden={alt ? undefined : true}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/projects/tts-ui/${name}.svg`}
        alt={alt}
        width={w}
        height={h}
        className="size-full object-contain"
      />
    </span>
  );
}
