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
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <circle
        cx="60" cy="60" r="48"
        stroke="var(--color-rose)" strokeWidth="8" strokeLinecap="round"
        strokeDasharray="258 44" transform="rotate(-50 60 60)"
      />
      {/* The dog is drawn first so the cat overlaps it — that overlap is what
          makes the two read as one pair rather than two icons side by side. */}
      <g transform="translate(0,-1)">
        <ellipse cx="33.5" cy="67" rx="6.5" ry="11.5" fill="var(--color-violet-soft)" />
        <ellipse cx="62.5" cy="67" rx="6.5" ry="11.5" fill="var(--color-violet-soft)" />
        <ellipse cx="48" cy="63" rx="16" ry="14.5" fill="var(--color-violet)" />
        <ellipse cx="48" cy="70.5" rx="8.2" ry="6" fill="var(--color-violet-mist)" />
        <ellipse cx="48" cy="66.6" rx="2.3" ry="1.75" fill="var(--color-ink)" />
        <path d="M39.2 61.3 q2.8 -3.4 5.6 0" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M51.2 61.3 q2.8 -3.4 5.6 0" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinecap="round" />

        <path d="M62.5 58 L65 45 L73.5 52 Z" fill="var(--color-rose)" />
        <path d="M85.5 58 L83 45 L74.5 52 Z" fill="var(--color-rose)" />
        <ellipse cx="74" cy="63" rx="15.5" ry="14.5" fill="var(--color-rose)" />
        <ellipse cx="74" cy="70" rx="7.4" ry="5.4" fill="var(--color-blush)" />
        <path d="M71.9 66 h4.2 l-2.1 2.6 z" fill="var(--color-ink)" />
        <path d="M65.2 61 q2.8 -3.4 5.6 0" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M77.2 61 q2.8 -3.4 5.6 0" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      <g transform="translate(52,27) scale(0.72)">
        <path d="M12 21 C6 16.5 2 13.2 2 9 A5 5 0 0 1 12 6.6 A5 5 0 0 1 22 9 C22 13.2 18 16.5 12 21 Z" fill="var(--color-champagne)" />
      </g>
    </svg>
  );
}

/** Logo variant for the midnight footer / hero. */
export function LogoLight({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      {/* Same drawing as <Logo>, re-toned for the midnight footer: the brand
          violet is far too dark to read against it, so the fills lighten and
          only the facial marks stay dark. */}
      <circle
        cx="60" cy="60" r="48"
        stroke="#e884b2" strokeWidth="8" strokeLinecap="round"
        strokeDasharray="258 44" transform="rotate(-50 60 60)"
      />
      <g transform="translate(0,-1)">
        <ellipse cx="33.5" cy="67" rx="6.5" ry="11.5" fill="#9d8cce" />
        <ellipse cx="62.5" cy="67" rx="6.5" ry="11.5" fill="#9d8cce" />
        <ellipse cx="48" cy="63" rx="16" ry="14.5" fill="#cfc5ea" />
        <ellipse cx="48" cy="70.5" rx="8.2" ry="6" fill="#f6f4fb" />
        <ellipse cx="48" cy="66.6" rx="2.3" ry="1.75" fill="#2e2153" />
        <path d="M39.2 61.3 q2.8 -3.4 5.6 0" stroke="#2e2153" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M51.2 61.3 q2.8 -3.4 5.6 0" stroke="#2e2153" strokeWidth="2.2" strokeLinecap="round" />

        <path d="M62.5 58 L65 45 L73.5 52 Z" fill="#e884b2" />
        <path d="M85.5 58 L83 45 L74.5 52 Z" fill="#e884b2" />
        <ellipse cx="74" cy="63" rx="15.5" ry="14.5" fill="#e884b2" />
        <ellipse cx="74" cy="70" rx="7.4" ry="5.4" fill="#fae4ee" />
        <path d="M71.9 66 h4.2 l-2.1 2.6 z" fill="#2e2153" />
        <path d="M65.2 61 q2.8 -3.4 5.6 0" stroke="#2e2153" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M77.2 61 q2.8 -3.4 5.6 0" stroke="#2e2153" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      <g transform="translate(52,27) scale(0.72)">
        <path d="M12 21 C6 16.5 2 13.2 2 9 A5 5 0 0 1 12 6.6 A5 5 0 0 1 22 9 C22 13.2 18 16.5 12 21 Z" fill="#e8c778" />
      </g>
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
