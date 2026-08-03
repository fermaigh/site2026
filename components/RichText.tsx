import { HoverArrow } from "@/components/HoverArrow";
import type { RichText } from "@/data/projects";

/**
 * Renders copy that may contain inline external links, styled like the
 * landing project links (bold, current color, animated arrow).
 */
export function RichTextContent({ value }: { value: RichText }) {
  if (typeof value === "string") return value;

  return (
    <>
      {value.parts.map((part, index) =>
        typeof part === "string" ? (
          <span key={`${index}-${part}`}>{part}</span>
        ) : (
          <a
            key={`${index}-${part.href}`}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 font-semibold text-foreground transition-opacity hover:opacity-70 active:opacity-60"
          >
            <span>{part.text}</span>
            <HoverArrow />
          </a>
        ),
      )}
    </>
  );
}
