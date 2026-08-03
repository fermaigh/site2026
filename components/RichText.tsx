import { HoverArrow } from "@/components/HoverArrow";
import {
  isRichTextBold,
  isRichTextLink,
  type RichText,
} from "@/data/projects";

/**
 * Renders copy that may contain inline external links and bold emphasis.
 * Links match landing project link styling (bold, animated arrow).
 */
export function RichTextContent({ value }: { value: RichText }) {
  if (typeof value === "string") return value;

  return (
    <>
      {value.parts.map((part, index) => {
        if (typeof part === "string") {
          return <span key={`${index}-${part}`}>{part}</span>;
        }

        if (isRichTextLink(part)) {
          return (
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
          );
        }

        if (isRichTextBold(part)) {
          return (
            <strong
              key={`${index}-${part.bold}`}
              className="font-semibold text-foreground"
            >
              {part.bold}
            </strong>
          );
        }

        return null;
      })}
    </>
  );
}
