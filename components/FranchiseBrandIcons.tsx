type Brand = {
  id: string;
  label: string;
  className: string;
  width: string;
  path?: string;
};

const brands: Brand[] = [
  {
    id: "mcdonalds",
    label: "McDonald's",
    className: "is-mcdonalds",
    width: "7rem",
    path: "M17.243 3.006c2.066 0 3.742 8.714 3.742 19.478H24c0-11.588-3.042-20.968-6.766-20.968-2.127 0-4.007 2.81-5.248 7.227C10.745 4.327 8.865 1.516 6.755 1.516 3.031 1.516 0 10.888 0 22.476h3.014c0-10.763 1.658-19.47 3.724-19.47s3.741 8.05 3.741 17.98h2.997c0-9.93 1.684-17.98 3.75-17.98Z",
  },
  {
    id: "chickfila",
    label: "Chick-fil-A",
    className: "is-chickfila",
    width: "6.8rem",
  },
  {
    id: "tacobell",
    label: "Taco Bell",
    className: "is-tacobell",
    width: "6.25rem",
    path: "M12.079 1.137c-4.908 0-9.286 2.894-11.08 7.206C.3 9.93-.024 11.67.004 13.401v8.984c-.015.163.083.3.15.44 1.159.072 2.322.014 3.483.031-.57-.207-1.224-.547-1.334-1.208-.18-.952.279-1.878.77-2.664.789-1.227 1.834-2.263 2.91-3.237 1.308-1.132 2.754-2.092 4.238-2.975.398-.256.855-.458 1.141-.85-.26.022-.515.085-.752.196-2.35 1.021-5.048 2.657-7.12 4.544-.124-.94-.349-1.863-.585-2.78-.289-1.22-.477-2.476-.396-3.731.06-1.285.47-2.562 1.234-3.602 1.557-2.278 4.497-3.82 7.997-3.49 3.864.365 6.296 3.25 6.963 5.143.325.289.698.526 1.104.684.948.372 1.997.343 2.953.692.3.101.571.27.844.43C22.083 4.936 17.33 1.137 12.08 1.137Zm8.469 11.113c-.167-.003-.336.01-.498.028-4.042.497-9.052 2.738-11.538 4.51-.938.75-1.865 1.544-2.56 2.533-.209.33-.472.733-.323 1.136.191.266.547.313.85.353 3.724.333 8.298-1.884 10.052-3.386 1.193-1.05 2.635-2.226 3.104-3.831.127-.433.107-.955-.265-1.153-.24-.151-.516-.2-.795-.204Zm3.426.076c-.789 1.993-2.352 3.549-3.97 4.898-3.58 2.91-7.819 4.813-12.554 5.624 5.035.022 10.07.004 15.106.009.226.031.457-.143.441-.381V13.883c.002-.519.008-1.039-.025-1.557ZM12.717 15.757c.36.77.401 1.697.055 2.478a2.91 2.91 0 0 1-1.769 1.647c-1.05.362-2.276.082-3.066-.701 1.402-1.382 3.06-2.478 4.78-3.424Z",
  },
  {
    id: "dominos",
    label: "Domino's",
    className: "is-dominos",
    width: "6.35rem",
  },
  {
    id: "jerseymikes",
    label: "Jersey Mike's",
    className: "is-jerseymikes",
    width: "7.65rem",
  },
];

function ChickFilAMark() {
  return (
    <svg viewBox="0 0 24 24" className="block size-full" aria-hidden="true">
      <path
        d="M17.4 7.2A7.6 7.6 0 1 0 18.1 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
      <path
        d="m17 10.2 3.2 1.8-3.2 1.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M13.9 5.4c.1-1.2.8-2.2 1.9-2.7.2 1.2-.1 2.3-1 3.1M10.8 5c-.3-1.1 0-2.2.8-3 .6 1 .7 2 .2 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="15.7" cy="8.8" r="1" fill="currentColor" />
    </svg>
  );
}

function DominosMark() {
  return (
    <svg viewBox="0 0 24 24" className="block size-full" aria-hidden="true">
      <g transform="rotate(-45 12 12)">
        <rect x="4" y="3" width="16" height="18" rx="2.5" fill="#fff" />
        <path d="M4 12h16v6.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5Z" fill="#e31837" />
        <circle cx="8" cy="7.5" r="1.5" fill="#006491" />
        <circle cx="16" cy="7.5" r="1.5" fill="#006491" />
        <circle cx="12" cy="16.5" r="1.5" fill="#fff" />
      </g>
    </svg>
  );
}

function JerseyMikesMark() {
  return (
    <svg viewBox="0 0 24 24" className="block size-full" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="#fff" />
      <circle cx="12" cy="12" r="8.5" fill="#c8102e" />
      <path
        d="M7.1 8.4h2.4v5.2c0 1.5.7 2.1 1.9 2.1.5 0 .9-.1 1.2-.3v2c-.5.2-1.1.3-1.8.3-2.5 0-3.7-1.3-3.7-4.1V8.4Zm5.9 0h2.4l1.5 3 1.5-3h2.4v9.2h-2.3v-5.5l-1.6 3.1-1.6-3.1v5.5H13V8.4Z"
        fill="#fff"
      />
    </svg>
  );
}

export function FranchiseBrandIcons() {
  return (
    <span
      className="franchise-brand-list"
      role="list"
      aria-label="McDonald's, Chick-fil-A, Taco Bell, Domino's, and Jersey Mike's"
    >
      {brands.map((brand) => (
        <span
          key={brand.id}
          className={`franchise-brand ${brand.className}`}
          style={{ "--franchise-brand-width": brand.width } as React.CSSProperties}
          role="listitem"
          aria-label={brand.label}
        >
          <span className="franchise-brand-mark">
            {brand.id === "chickfila" ? (
              <ChickFilAMark />
            ) : brand.id === "dominos" ? (
              <DominosMark />
            ) : brand.id === "jerseymikes" ? (
              <JerseyMikesMark />
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="block size-full"
                aria-hidden="true"
              >
                <path d={brand.path} fill="currentColor" />
              </svg>
            )}
          </span>
          <span className="franchise-brand-name" aria-hidden="true">
            {brand.label}
          </span>
        </span>
      ))}
    </span>
  );
}
