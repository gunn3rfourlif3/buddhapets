"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Enso } from "@/components/ui/icons";
import { questions, scoreQuiz, scoreBand, type Answers } from "@/lib/quiz";

type Stage = { kind: "question"; index: number } | { kind: "capture" };

export function CalmQuiz() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>({ kind: "question", index: 0 });
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState("");
  const [petName, setPetName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = questions.length;
  const index = stage.kind === "question" ? stage.index : total;
  const progress = Math.round((index / total) * 100);

  // Only computed once every question has been answered.
  const outcome = useMemo(
    () => (stage.kind === "capture" ? scoreQuiz(answers) : null),
    [stage.kind, answers],
  );

  function choose(questionId: string, value: string, multi: boolean) {
    setAnswers((prev) => {
      if (!multi) return { ...prev, [questionId]: value };
      const current = new Set(Array.isArray(prev[questionId]) ? (prev[questionId] as string[]) : []);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      return { ...prev, [questionId]: [...current] };
    });

    // Single-choice questions advance on their own; multi-select waits for
    // "Continue" so people can pick more than one thing.
    if (!multi) {
      window.setTimeout(() => advance(), 180);
    }
  }

  function advance() {
    setStage((s) => {
      if (s.kind !== "question") return s;
      return s.index + 1 >= total ? { kind: "capture" } : { kind: "question", index: s.index + 1 };
    });
  }

  function back() {
    setStage((s) => {
      if (s.kind === "capture") return { kind: "question", index: total - 1 };
      return s.index === 0 ? s : { kind: "question", index: s.index - 1 };
    });
  }

  function isChosen(questionId: string, value: string) {
    const a = answers[questionId];
    return Array.isArray(a) ? a.includes(value) : a === value;
  }

  function canContinue(questionId: string) {
    const a = answers[questionId];
    return Array.isArray(a) ? a.length > 0 : Boolean(a);
  }

  async function submit(withEmail: boolean) {
    if (!outcome) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          email: withEmail ? email : null,
          petName: petName || null,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      router.push(`/quiz/${outcome.plan.slug}?score=${outcome.score}`);
    } catch {
      // The plan is computed client-side, so a failed save must never block
      // the customer from seeing their result.
      setError("We couldn't save your plan just now — here it is anyway.");
      router.push(`/quiz/${outcome.plan.slug}?score=${outcome.score}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[680px]">
      {/* Progress */}
      <div className="mb-10 flex items-center gap-4">
        <div className="h-1.5 grow overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-rose transition-[width] duration-500 ease-out"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-medium tabular-nums text-muted">
          {Math.min(index + 1, total)} / {total}
        </span>
      </div>

      {stage.kind === "question" && (
        <QuestionCard
          key={questions[stage.index].id}
          index={stage.index}
          isChosen={isChosen}
          onChoose={choose}
          onContinue={advance}
          onBack={back}
          canContinue={canContinue}
        />
      )}

      {stage.kind === "capture" && outcome && (
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-blush px-4 py-[7px] text-[12.5px] font-semibold text-rose-deep">
              <Enso size={14} />
              Your result is ready
            </span>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15]">
              They&rsquo;re <span className="accent">{scoreBand(outcome.score).label.toLowerCase()}</span>
            </h2>
            <p className="mx-auto max-w-[46ch] text-[15px] leading-[1.8] text-body">
              {scoreBand(outcome.score).note} We&rsquo;ve matched them to a ritual built for exactly
              this pattern.
            </p>
          </div>

          {/* Score meter */}
          <div className="rounded-card border border-line bg-white p-6 shadow-soft">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-[12.5px] font-semibold uppercase tracking-[1.5px] text-muted">
                Calm score
              </span>
              <span className="font-display text-3xl tabular-nums text-violet">{outcome.score}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-mist">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet to-rose"
                style={{ width: `${outcome.score}%` }}
              />
            </div>
          </div>

          <div className="rounded-card border border-line bg-white p-7 shadow-soft">
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-rose-deep">
              Where should we send it?
            </p>
            <p className="mt-2 text-sm leading-[1.7] text-body">
              We&rsquo;ll email the full plan so you have it when you need it, plus a short evening
              ritual for the first week. No spam, unsubscribe any time.
            </p>

            <form
              className="mt-5 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                void submit(true);
              }}
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="quiz-pet">
                  Your pet&rsquo;s name
                </label>
                <input
                  id="quiz-pet"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="Their name (optional)"
                  className="w-full rounded-full border border-line bg-ivory px-5 py-3 text-sm outline-none transition-colors focus:border-violet sm:w-2/5"
                />
                <label className="sr-only" htmlFor="quiz-email">
                  Email address
                </label>
                <input
                  id="quiz-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full grow rounded-full border border-line bg-ivory px-5 py-3 text-sm outline-none transition-colors focus:border-violet"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-violet px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-violet transition-all hover:bg-violet-deep disabled:opacity-60"
              >
                {submitting ? "Building your plan…" : "Show me their Zen Plan"}
              </button>

              <button
                type="button"
                onClick={() => void submit(false)}
                disabled={submitting}
                className="text-[13px] font-medium text-muted underline underline-offset-4 transition-colors hover:text-violet"
              >
                Skip — just show me the plan
              </button>

              {error && <p className="text-[13px] text-rose-deep">{error}</p>}
            </form>
          </div>

          <button
            type="button"
            onClick={back}
            className="mx-auto text-[13px] font-medium text-muted transition-colors hover:text-violet"
          >
            ← Change an answer
          </button>
        </section>
      )}
    </div>
  );
}

function QuestionCard({
  index,
  isChosen,
  onChoose,
  onContinue,
  onBack,
  canContinue,
}: {
  index: number;
  isChosen: (q: string, v: string) => boolean;
  onChoose: (q: string, v: string, multi: boolean) => void;
  onContinue: () => void;
  onBack: () => void;
  canContinue: (q: string) => boolean;
}) {
  const question = questions[index];
  const multi = Boolean(question.multi);

  return (
    <section className="flex animate-[fade-in_.35s_ease-out] flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-blush px-4 py-[7px] text-[12.5px] font-semibold text-rose-deep">
          {question.step}
        </span>
        <h2 className="text-[clamp(1.625rem,3.6vw,2.25rem)] leading-[1.2]">{question.prompt}</h2>
        {question.help && <p className="text-sm text-muted">{question.help}</p>}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => {
          const chosen = isChosen(question.id, option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={chosen}
              onClick={() => onChoose(question.id, option.value, multi)}
              className={`flex min-h-[56px] items-center gap-3 rounded-[18px] border px-5 py-4 text-left text-[14.5px] transition-all duration-200 ${
                chosen
                  ? "border-violet bg-violet/[0.06] font-semibold text-violet shadow-soft"
                  : "border-line bg-white text-ink hover:border-line-strong hover:shadow-soft"
              }`}
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  chosen ? "border-violet bg-violet" : "border-line-strong"
                }`}
                aria-hidden="true"
              >
                {chosen && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path
                      d="m6 12.4 4 4 8-8.4"
                      stroke="#fff"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        {index > 0 && (
          <button
            type="button"
            onClick={onBack}
            className="text-[13px] font-medium text-muted transition-colors hover:text-violet"
          >
            ← Back
          </button>
        )}
        {multi && (
          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue(question.id)}
            className="ml-auto rounded-full bg-violet px-7 py-3 text-[13.5px] font-semibold text-white shadow-violet transition-all hover:bg-violet-deep disabled:pointer-events-none disabled:opacity-40"
          >
            Continue
          </button>
        )}
      </div>
    </section>
  );
}
