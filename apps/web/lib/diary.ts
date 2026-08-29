/**
 * The Ritual Diary — seven nights of a Zen Plan, logged by the owner.
 *
 * Everything here stays on the visitor's own device. No upload, no account,
 * no server: a plan is useful to your very first customer, before there is
 * anyone else on the site, and photos of someone's home shouldn't leave their
 * phone until they've deliberately chosen to share them.
 *
 * When (if) sharing lands, this is the layer that gains an explicit
 * "share this night" action — see the notes at the bottom of the file.
 */

export const NIGHTS = 7;

export type DiaryEntry = {
  /** 1-7 */
  night: number;
  done: boolean;
  note?: string;
  /** Downscaled JPEG data URL. Re-encoding through canvas also strips EXIF. */
  photo?: string;
  /** ISO timestamp of when it was marked done. */
  at?: string;
};

export type Diary = {
  planSlug: string;
  petName?: string;
  startedAt: string;
  entries: DiaryEntry[];
};

function storageKey(planSlug: string) {
  return `buddhapets:diary:${planSlug}`;
}

export function emptyDiary(planSlug: string): Diary {
  return {
    planSlug,
    startedAt: new Date().toISOString(),
    entries: Array.from({ length: NIGHTS }, (_, i) => ({ night: i + 1, done: false })),
  };
}

/**
 * localStorage throws outright in some privacy modes, so every access is
 * guarded — a diary that can't be saved must never break the page.
 */
export function loadDiary(planSlug: string): Diary | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey(planSlug));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Diary;
    if (!Array.isArray(parsed.entries) || parsed.entries.length !== NIGHTS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveDiary(diary: Diary): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(storageKey(diary.planSlug), JSON.stringify(diary));
    return true;
  } catch {
    // Usually a full quota (photos are the bulk of it) or a blocked store.
    return false;
  }
}

export function clearDiary(planSlug: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(storageKey(planSlug));
  } catch {
    /* nothing useful to do */
  }
}

/** Nights completed, counted from night one until the first gap. */
export function currentStreak(diary: Diary): number {
  let streak = 0;
  for (const entry of diary.entries) {
    if (!entry.done) break;
    streak += 1;
  }
  return streak;
}

export function completedCount(diary: Diary): number {
  return diary.entries.filter((e) => e.done).length;
}

/**
 * Downscale and re-encode a photo in the browser before it is stored.
 *
 * Two reasons, both important:
 *   1. A phone photo is 3-8 MB; localStorage gives us about 5 MB in total.
 *   2. Re-encoding through a canvas discards EXIF — including the GPS tag that
 *      would otherwise carry the owner's home address around with the picture.
 */
export function compressImage(file: File, maxEdge = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);

      const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Your browser wouldn't let us process that image."));
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That file didn't look like an image we could read."));
    };

    img.src = url;
  });
}

/**
 * Night prompts. The first three follow the plan's own ritual steps; the rest
 * say the quiet part — repetition is the active ingredient, not novelty.
 */
export function nightPrompts(steps: { title: string; detail: string }[]): string[] {
  const later = [
    "Same order, same time. The repetition is doing the work now.",
    "Notice what changed tonight — even a little. Small shifts count.",
    "If tonight was harder, that's normal. Keep the sequence identical.",
    "Last night of the week. Whatever settled them, keep it.",
  ];
  return [
    ...steps.slice(0, 3).map((s) => s.title),
    ...later,
  ].slice(0, NIGHTS);
}

/*
 * If sharing is added later:
 *   - keep the on-device diary as the source of truth
 *   - add an explicit per-night "share" action that uploads only that image
 *   - store a timestamped licence grant alongside it
 *   - nothing auto-publishes; everything lands in a moderation queue
 */
