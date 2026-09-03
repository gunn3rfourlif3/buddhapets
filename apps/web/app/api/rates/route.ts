import { NextResponse } from "next/server";
import { fetchRates } from "@/lib/currency";

/**
 * Rates for the browser. The upstream call is cached by Next, so a busy day
 * costs the rate service one request every six hours, not one per visitor.
 */
export const revalidate = 21600;

export async function GET() {
  const payload = await fetchRates();
  return NextResponse.json(payload, {
    headers: { "Cache-Control": "public, max-age=1800, stale-while-revalidate=86400" },
  });
}
