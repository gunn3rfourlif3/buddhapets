import { NextResponse } from "next/server";
import { scoreQuiz, type Answers } from "@/lib/quiz";
import { saveQuizResult } from "@/lib/quiz-store";

/**
 * Receives a completed Calm Quiz.
 *
 * Scoring is repeated server-side rather than trusted from the client, so the
 * stored score always matches the current plan definitions.
 */
export async function POST(request: Request) {
  let body: { answers?: Answers; email?: string | null; petName?: string | null };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { answers, email, petName } = body;

  if (!answers || typeof answers !== "object") {
    return NextResponse.json({ error: "Missing answers." }, { status: 400 });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  const outcome = scoreQuiz(answers);

  await saveQuizResult({
    answers,
    email: email ?? null,
    petName: petName ?? null,
    score: outcome.score,
    planSlug: outcome.plan.slug,
    planName: outcome.plan.name,
    petType:
      answers.pet === "cat" ? "CAT" : answers.pet === "both" ? "BOTH" : "DOG",
  });

  // TODO (week 4, per the hybrid build spec): once Brevo keys are in place,
  // trigger the plan-delivery automation and tag the Woo customer with
  // `zen_plan` via tagCustomerWithPlan() so email can segment on it.

  return NextResponse.json({
    score: outcome.score,
    plan: { slug: outcome.plan.slug, name: outcome.plan.name },
  });
}
