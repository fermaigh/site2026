function TikTokShopMark() {
  return (
    <svg
      viewBox="0 0 28 31"
      className="block size-full"
      aria-hidden="true"
    >
      <path
        d="M10.58 12.26V11c-.41-.06-.83-.09-1.26-.09C4.18 10.91 0 15.12 0 20.3c0 3.18 1.58 5.99 3.98 7.7a9.45 9.45 0 0 1-2.45-6.4c0-5.11 4.01-9.22 9.05-9.34Z"
        fill="#25F4EE"
      />
      <path
        d="M10.8 25.93a4.3 4.3 0 0 0 4.29-4.17L15.1 1.34l3.68.01-.01-.05A7.2 7.2 0 0 1 18.65 0h-5.07l-.01 20.47a4.26 4.26 0 0 1-4.25 4.13c-.71 0-1.38-.18-1.97-.5a4.3 4.3 0 0 0 3.45 1.83Z"
        fill="#25F4EE"
      />
      <path
        d="M25.7 8.32V7.1a7.04 7.04 0 0 1-3.84-1.15A7.06 7.06 0 0 0 25.7 8.32Z"
        fill="#25F4EE"
      />
      <path
        d="M21.86 5.95a7.12 7.12 0 0 1-1.73-4.65h-1.4a7.12 7.12 0 0 0 3.13 4.65ZM9.32 15.97a4.32 4.32 0 0 0-4.29 4.33 4.34 4.34 0 0 0 2.32 3.8 4.34 4.34 0 0 1 3.45-6.8c.44 0 .86.08 1.26.2v-5.2a9.48 9.48 0 0 0-1.48-.09l-.04 3.94a4.02 4.02 0 0 0-1.22-.18Z"
        fill="#FE2C55"
      />
      <path
        d="m25.7 8.24-.03-.01-.01 3.94a12.1 12.1 0 0 1-7.04-2.3l-.01 10.43a9.3 9.3 0 0 1-9.29 9.37A9.2 9.2 0 0 1 3.98 28a9.25 9.25 0 0 0 6.82 3 9.35 9.35 0 0 0 9.32-9.4V11.22a12.07 12.07 0 0 0 7.05 2.29V8.4c-.5 0-.99-.05-1.47-.16Z"
        fill="#FE2C55"
      />
      <path
        d="M18.65 20.3V9.93a12.07 12.07 0 0 0 7.04 2.28V8.24a7.03 7.03 0 0 1-3.84-2.29 7.13 7.13 0 0 1-3.09-4.65h-3.7l-.01 20.46a4.26 4.26 0 0 1-4.25 4.13 4.28 4.28 0 0 1-3.45-1.79 4.33 4.33 0 0 1 1.97-8.09c.44 0 .86.07 1.26.2v-4c-5.04.11-9.1 4.28-9.1 9.39a9.39 9.39 0 0 0 2.5 6.4 9.2 9.2 0 0 0 5.34 1.7 9.35 9.35 0 0 0 9.33-9.4Z"
        fill="white"
      />
    </svg>
  );
}

export function TikTokShopRoleLine({ value }: { value: string }) {
  return (
    <p>
      <span className="font-medium text-foreground">Role:</span>{" "}
      <strong className="font-semibold text-foreground">{value}</strong>{" "}
      <span
        className="tiktok-shop-brand"
        role="img"
        aria-label="TikTok Shop"
      >
        <span className="tiktok-shop-brand-mark">
          <TikTokShopMark />
        </span>
        <span className="tiktok-shop-brand-name" aria-hidden="true">
          TikTok Shop
        </span>
      </span>
    </p>
  );
}
