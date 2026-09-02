import type { Metadata } from "next";
import { Instrument_Serif, Poppins } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://buddhapets.co.za"),
  title: {
    default: "BuddhaPets — Calm pets, peaceful homes",
    template: "%s · BuddhaPets",
  },
  description:
    "Hand-selected wellness for anxious dogs, restless cats, and the people who love them. Backed by the 60-Day Happy Pet Guarantee.",
  openGraph: {
    type: "website",
    siteName: "BuddhaPets",
    title: "BuddhaPets — Calm pets, peaceful homes",
    description:
      "The science of pet serenity: calming beds, enrichment toys, and rituals for pets and their people.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
