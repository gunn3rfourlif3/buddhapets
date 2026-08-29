import type { ReactNode } from "react";

/**
 * The blush pill that sits above every section heading.
 * Carried over from the Pepito direction, restyled for the premium palette.
 */
export function Eyebrow({
  children,
  icon,
  tone = "blush",
}: {
  children: ReactNode;
  icon?: ReactNode;
  tone?: "blush" | "gold";
}) {
  const tones = {
    blush: "bg-blush text-rose-deep",
    gold: "bg-champagne-light/15 text-champagne-light ring-1 ring-champagne-light/35",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-[7px] text-[12.5px] font-semibold ${tones[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}
