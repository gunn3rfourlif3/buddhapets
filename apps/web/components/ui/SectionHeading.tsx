import type { ReactNode } from "react";

/**
 * Centred section heading: eyebrow pill above, serif headline below.
 * `accent` renders as the italic violet word that gives the brand its voice.
 */
export function SectionHeading({
  eyebrow,
  children,
  className = "",
}: {
  eyebrow: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-4 text-center ${className}`}>
      {eyebrow}
      <h2 className="text-[clamp(2rem,4vw,2.75rem)] leading-[1.15]">{children}</h2>
    </div>
  );
}
