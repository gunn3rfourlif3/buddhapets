"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckDot, Enso } from "@/components/ui/icons";
import {
  NIGHTS,
  clearDiary,
  compressImage,
  completedCount,
  currentStreak,
  emptyDiary,
  loadDiary,
  nightPrompts,
  saveDiary,
  type Diary,
} from "@/lib/diary";

/**
 * Seven nights of a Zen Plan, logged by the owner.
 *
 * Deliberately works for one person with no account and nobody else on the
 * site: nothing is uploaded, so it is useful from the very first customer.
 */
export function RitualDiary({
  planSlug,
  planName,
  steps,
}: {
  planSlug: string;
  planName: string;
  steps: { title: string; detail: string }[];
}) {
  // `null` until the client has read storage, so server and first client render
  // agree and React doesn't complain about a hydration mismatch.
  const [diary, setDiary] = useState<Diary | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileInputs = useRef<Record<number, HTMLInputElement | null>>({});

  useEffect(() => {
    setDiary(loadDiary(planSlug) ?? emptyDiary(planSlug));
  }, [planSlug]);

  function update(next: Diary) {
    setDiary(next);
    setSaveFailed(!saveDiary(next));
  }

  function patchNight(night: number, patch: Partial<Diary["entries"][number]>) {
    if (!diary) return;
    update({
      ...diary,
      entries: diary.entries.map((e) => (e.night === night ? { ...e, ...patch } : e)),
    });
  }

  function toggleNight(night: number) {
    if (!diary) return;
    const entry = diary.entries.find((e) => e.night === night);
    if (!entry) return;

    const nowDone = !entry.done;
    patchNight(night, { done: nowDone, at: nowDone ? new Date().toISOString() : undefined });
    setOpen(nowDone ? night : null);
  }

  async function attachPhoto(night: number, file: File) {
    setPhotoError(null);
    try {
      const photo = await compressImage(file);
      patchNight(night, { photo });
    } catch (error) {
      setPhotoError(error instanceof Error ? error.message : "That photo wouldn't load.");
    }
  }

  const prompts = nightPrompts(steps);

  // Skeleton until storage has been read — same shape, so nothing jumps.
  if (!diary) {
    return (
      <section className="bg-mist px-6 py-section lg:px-gutter">
        <div className="mx-auto h-[420px] max-w-[820px] animate-pulse rounded-card bg-white/60" />
      </section>
    );
  }

  const done = completedCount(diary);
  const streak = currentStreak(diary);
  const finished = done === NIGHTS;

  return (
    <section className="bg-mist px-6 py-section lg:px-gutter">
      <div className="mx-auto flex max-w-[820px] flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow icon={<Enso size={14} />}>Seven evenings of calm</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)]">
            Keep a <span className="accent">diary</span> of the week
          </h2>
          <p className="max-w-[52ch] text-[15px] leading-[1.8] text-body">
            Tick off each night of {planName} as you do it. Add a note or a photo if you want one —
            everything here stays on this device, and nothing is uploaded anywhere.
          </p>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-4 rounded-card border border-line bg-white p-6 shadow-soft">
          <div className="flex items-baseline justify-between">
            <span className="text-[12.5px] font-semibold uppercase tracking-[1.5px] text-muted">
              {finished ? "Week complete" : `Night ${Math.min(streak + 1, NIGHTS)} of ${NIGHTS}`}
            </span>
            <span className="font-display text-3xl tabular-nums text-violet">
              {done}
              <span className="text-lg text-muted">/{NIGHTS}</span>
            </span>
          </div>

          <div className="flex gap-1.5" role="img" aria-label={`${done} of ${NIGHTS} nights complete`}>
            {diary.entries.map((entry) => (
              <div
                key={entry.night}
                className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                  entry.done ? "bg-rose" : "bg-mist"
                }`}
              />
            ))}
          </div>

          {streak >= 2 && !finished && (
            <p className="text-[13.5px] text-body">
              <span className="font-semibold text-ink">{streak} nights in a row.</span> The
              consistency is what shifts things — keep the sequence identical.
            </p>
          )}
        </div>

        {/* Nights */}
        <ol className="flex flex-col gap-3">
          {diary.entries.map((entry) => {
            const isOpen = open === entry.night;
            return (
              <li
                key={entry.night}
                className={`rounded-card border bg-white transition-shadow ${
                  entry.done ? "border-violet/30 shadow-soft" : "border-line"
                }`}
              >
                <div className="flex items-center gap-4 p-4 px-5">
                  <button
                    type="button"
                    onClick={() => toggleNight(entry.night)}
                    aria-pressed={entry.done}
                    aria-label={`Mark night ${entry.night} ${entry.done ? "not done" : "done"}`}
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full border-[1.5px] font-display text-base transition-colors ${
                      entry.done
                        ? "border-violet bg-violet text-white"
                        : "border-line-strong text-violet hover:border-violet"
                    }`}
                  >
                    {entry.done ? "✓" : entry.night}
                  </button>

                  <div className="flex grow flex-col gap-0.5">
                    <p className={`text-[14.5px] font-semibold ${entry.done ? "text-ink" : ""}`}>
                      Night {entry.night}
                    </p>
                    <p className="text-[13px] leading-[1.5] text-muted">{prompts[entry.night - 1]}</p>
                  </div>

                  {entry.photo && (
                    // eslint-disable-next-line @next/next/no-img-element -- a local data URL, never a remote asset
                    <img
                      src={entry.photo}
                      alt={`Night ${entry.night}`}
                      className="size-12 shrink-0 rounded-xl object-cover"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : entry.night)}
                    className="shrink-0 text-[12.5px] font-semibold text-violet transition-colors hover:text-violet-deep"
                  >
                    {isOpen ? "Close" : entry.note || entry.photo ? "Edit" : "Add"}
                  </button>
                </div>

                {isOpen && (
                  <div className="flex flex-col gap-3 border-t border-line p-5">
                    <label className="sr-only" htmlFor={`note-${entry.night}`}>
                      Note for night {entry.night}
                    </label>
                    <textarea
                      id={`note-${entry.night}`}
                      value={entry.note ?? ""}
                      onChange={(e) => patchNight(entry.night, { note: e.target.value })}
                      rows={2}
                      placeholder="How did they settle tonight?"
                      className="w-full resize-none rounded-2xl border border-line bg-ivory px-4 py-3 text-sm outline-none transition-colors focus:border-violet"
                    />

                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        ref={(el) => {
                          fileInputs.current[entry.night] = el;
                        }}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void attachPhoto(entry.night, file);
                          e.target.value = "";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputs.current[entry.night]?.click()}
                        className="rounded-full border-[1.5px] border-line-strong px-5 py-2.5 text-[13px] font-semibold text-violet transition-colors hover:border-violet"
                      >
                        {entry.photo ? "Replace photo" : "Add a photo"}
                      </button>

                      {entry.photo && (
                        <button
                          type="button"
                          onClick={() => patchNight(entry.night, { photo: undefined })}
                          className="text-[13px] font-medium text-muted underline underline-offset-4 transition-colors hover:text-rose-deep"
                        >
                          Remove photo
                        </button>
                      )}
                    </div>

                    {entry.photo && (
                      // eslint-disable-next-line @next/next/no-img-element -- a local data URL, never a remote asset
                      <img
                        src={entry.photo}
                        alt={`Night ${entry.night}`}
                        className="max-h-56 w-full rounded-2xl object-cover"
                      />
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {photoError && <p className="text-center text-[13px] text-rose-deep">{photoError}</p>}

        {saveFailed && (
          <p className="text-center text-[13px] text-rose-deep">
            We couldn&rsquo;t save that on this device — storage may be full or blocked. Removing a
            photo or two usually frees up room.
          </p>
        )}

        {finished && (
          <div className="flex flex-col items-center gap-4 rounded-card bg-midnight p-8 text-center">
            <p className="font-display text-[1.75rem] text-[#f6f4fb]">
              Seven nights <span className="italic text-champagne-light">done</span>
            </p>
            <p className="max-w-[44ch] text-[14.5px] leading-[1.7] text-[#f6f4fb]/70">
              That&rsquo;s the week. Retake the Calm Quiz in a few weeks and see whether their score
              has moved — it&rsquo;s the most honest measure of whether the ritual is working.
            </p>
            <Link
              href="/quiz"
              className="rounded-full bg-rose px-7 py-3 text-[13.5px] font-semibold text-white shadow-rose transition-all hover:brightness-105"
            >
              Retake the Calm Quiz
            </Link>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 text-[12.5px] text-muted">
          <span className="inline-flex items-center gap-2">
            <CheckDot size={15} />
            Stored on this device only
          </span>
          {done > 0 && (
            <button
              type="button"
              onClick={() => {
                clearDiary(planSlug);
                setDiary(emptyDiary(planSlug));
                setOpen(null);
              }}
              className="underline underline-offset-4 transition-colors hover:text-rose-deep"
            >
              Start the week again
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
