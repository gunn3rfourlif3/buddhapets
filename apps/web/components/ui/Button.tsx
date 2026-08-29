import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "rose" | "outline" | "outline-light" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-violet text-white shadow-violet hover:bg-violet-deep",
  rose: "bg-rose text-white shadow-rose hover:brightness-105",
  outline: "border-[1.5px] border-line-strong text-violet hover:border-violet hover:bg-violet/5",
  "outline-light": "border-[1.5px] border-white/35 text-white hover:bg-white/10",
  light: "bg-white text-violet shadow-lifted hover:bg-mist",
};

export function Button({
  children,
  href = "#",
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-[13.5px] font-semibold transition-all duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
