/**
 * Stroke icons on a 24px grid, 1.5–2.4 stroke, rounded caps.
 * Never emoji — see the brand board's iconography rule.
 */
type IconProps = { size?: number; className?: string; strokeWidth?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

/** The enso — an open circle. The brand's core mark. */
export function Enso({ size = 16, className, strokeWidth = 2.4 }: IconProps) {
  return (
    <svg {...base(size)} className={className} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="8.5" strokeDasharray="44 9" transform="rotate(-50 12 12)" />
    </svg>
  );
}

export function Paw({ size = 16, className, strokeWidth = 2.4 }: IconProps) {
  return (
    <svg {...base(size)} className={className} strokeWidth={strokeWidth}>
      <circle cx="7.5" cy="9" r="1.7" />
      <circle cx="12" cy="7" r="1.7" />
      <circle cx="16.5" cy="9" r="1.7" />
      <path d="M8 16.5c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.4-1.1 2.5-2.5 2.5h-3c-1.4 0-2.5-1.1-2.5-2.5Z" />
    </svg>
  );
}

export function Heart({ size = 16, className, strokeWidth = 2.4 }: IconProps) {
  return (
    <svg {...base(size)} className={className} strokeWidth={strokeWidth}>
      <path d="M12 20s-7-4.5-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 2.5c0 5-7 9.5-7 9.5Z" />
    </svg>
  );
}

export function Shield({ size = 16, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size)} className={className} strokeWidth={strokeWidth}>
      <path d="M12 3 4.5 6v5.2c0 4.6 3.2 8.1 7.5 9.8 4.3-1.7 7.5-5.2 7.5-9.8V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function Bag({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} className={className} strokeWidth={strokeWidth}>
      <path d="M6 7h12l1.2 12.2a1.6 1.6 0 0 1-1.6 1.8H6.4a1.6 1.6 0 0 1-1.6-1.8L6 7Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </svg>
  );
}

export function Question({ size = 16, className, strokeWidth = 2.4 }: IconProps) {
  return (
    <svg {...base(size)} className={className} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 4.4 1.6c0 1.6-2 2-2 3.2" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function Journal({ size = 16, className, strokeWidth = 2.4 }: IconProps) {
  return (
    <svg {...base(size)} className={className} strokeWidth={strokeWidth}>
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15.5a2.5 2.5 0 0 1-2.5 2.5H7.5A2.5 2.5 0 0 1 5 18.5v-13Z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  );
}

export function Chevron({ size = 18, className, strokeWidth = 2.2 }: IconProps) {
  return (
    <svg {...base(size)} className={className} strokeWidth={strokeWidth}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Filled blush circle with a rose tick — the house checklist bullet. */
export function CheckDot({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="var(--color-blush)" />
      <path
        d="m8 12.2 2.6 2.6 5.2-5.4"
        stroke="var(--color-rose-deep)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The stacked zen stones that form the logo's interior. */
export function Logo({ size = 34, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" className={className} aria-hidden="true">
      <circle
        cx="36" cy="36" r="28"
        stroke="var(--color-rose)" strokeWidth="5" strokeLinecap="round"
        strokeDasharray="150 26" transform="rotate(-50 36 36)"
      />
      <ellipse cx="36" cy="44" rx="10" ry="6" fill="var(--color-violet)" />
      <ellipse cx="36" cy="35" rx="7.5" ry="4.5" fill="var(--color-violet-soft)" />
      <ellipse cx="36" cy="27.5" rx="5" ry="3.2" fill="var(--color-violet-mist)" />
    </svg>
  );
}

/** Logo variant for the midnight footer / hero. */
export function LogoLight({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" className={className} aria-hidden="true">
      <circle
        cx="36" cy="36" r="28"
        stroke="var(--color-rose)" strokeWidth="5" strokeLinecap="round"
        strokeDasharray="150 26" transform="rotate(-50 36 36)"
      />
      <ellipse cx="36" cy="44" rx="10" ry="6" fill="#f6f4fb" />
      <ellipse cx="36" cy="35" rx="7.5" ry="4.5" fill="#cfc5ea" />
      <ellipse cx="36" cy="27.5" rx="5" ry="3.2" fill="#9d8cce" />
    </svg>
  );
}

export function Wordmark({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`font-display ${className}`}>
      <span className={light ? "text-[#f6f4fb]" : "text-ink"}>Buddha</span>
      <span className={`italic ${light ? "text-rose-light" : "text-rose"}`}>Pets</span>
    </span>
  );
}
