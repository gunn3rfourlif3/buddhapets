/**
 * The Calm Quiz — BuddhaPets' conversion engine.
 *
 * Six questions about a pet's stress signals produce an anxiety score and map
 * to one named Zen Plan. The plan, not the product, is what we sell: it gives
 * the customer a ritual to follow and gives us a segment to email.
 *
 * Scoring is deliberately transparent and stored alongside the raw answers
 * (see prisma/schema.prisma) so plans can be re-scored when definitions change.
 */

import type { Tile } from "./content";

/* -------------------------------------------------------------------------- */
/* Questions                                                                   */
/* -------------------------------------------------------------------------- */

export type Option = {
  value: string;
  label: string;
  /** Contribution to the 0–100 anxiety score. */
  weight?: number;
  /** Plans this answer argues for; the highest total wins. */
  signals?: PlanSlug[];
};

export type Question = {
  id: string;
  /** Shown as the eyebrow pill above the question. */
  step: string;
  prompt: string;
  help?: string;
  multi?: boolean;
  options: Option[];
};

export const questions: Question[] = [
  {
    id: "pet",
    step: "About them",
    prompt: "Who are we bringing calm to?",
    options: [
      { value: "dog", label: "My dog" },
      { value: "cat", label: "My cat" },
      { value: "both", label: "Both, honestly" },
    ],
  },
  {
    id: "signals",
    step: "Their signals",
    prompt: "What does stress look like for them?",
    help: "Pick everything you recognise.",
    multi: true,
    options: [
      { value: "pacing", label: "Restless pacing", weight: 10, signals: ["gentle-evening"] },
      { value: "vocal", label: "Barking or crying", weight: 12, signals: ["home-alone-ritual"] },
      { value: "trembling", label: "Trembling or hiding", weight: 16, signals: ["thunder-protocol"] },
      { value: "destructive", label: "Chewing or scratching things", weight: 14, signals: ["busy-mind"] },
      { value: "gulping", label: "Inhaling their food", weight: 8, signals: ["slow-bowl"] },
      { value: "clingy", label: "Shadowing me everywhere", weight: 10, signals: ["home-alone-ritual"] },
      { value: "sleepless", label: "Unsettled at night", weight: 12, signals: ["gentle-evening"] },
    ],
  },
  {
    id: "triggers",
    step: "The moments",
    prompt: "When does it peak?",
    help: "Pick everything that applies.",
    multi: true,
    options: [
      { value: "departure", label: "When I pick up my keys", weight: 14, signals: ["home-alone-ritual"] },
      { value: "storms", label: "Storms and fireworks", weight: 16, signals: ["thunder-protocol"] },
      { value: "visitors", label: "Visitors at the door", weight: 8, signals: ["busy-mind"] },
      { value: "travel", label: "Car rides and vet trips", weight: 10, signals: ["thunder-protocol"] },
      { value: "evening", label: "Evenings and bedtime", weight: 10, signals: ["gentle-evening"] },
      { value: "mealtime", label: "Around mealtimes", weight: 8, signals: ["slow-bowl"] },
    ],
  },
  {
    id: "alone",
    step: "Their day",
    prompt: "How long are they alone on a normal day?",
    options: [
      { value: "under2", label: "Under 2 hours", weight: 2 },
      { value: "2to5", label: "2 to 5 hours", weight: 8, signals: ["home-alone-ritual"] },
      { value: "5to8", label: "5 to 8 hours", weight: 14, signals: ["home-alone-ritual"] },
      { value: "over8", label: "More than 8 hours", weight: 18, signals: ["home-alone-ritual"] },
    ],
  },
  {
    id: "stimulation",
    step: "Their day",
    prompt: "How busy is their body and brain?",
    options: [
      { value: "rich", label: "Long walks, puzzles, plenty to do", weight: 2 },
      { value: "walks", label: "A daily walk, not much else", weight: 8, signals: ["busy-mind"] },
      { value: "quiet", label: "Mostly indoors and quiet", weight: 14, signals: ["busy-mind"] },
    ],
  },
  {
    id: "goal",
    step: "Your goal",
    prompt: "What would help you most right now?",
    options: [
      { value: "sleep", label: "A pet who sleeps through the night", signals: ["gentle-evening"] },
      { value: "departures", label: "Calm goodbyes when I leave", signals: ["home-alone-ritual"] },
      { value: "noise", label: "Getting through storm season", signals: ["thunder-protocol"] },
      { value: "meals", label: "Slowing down their meals", signals: ["slow-bowl"] },
      { value: "general", label: "A calmer home overall", signals: ["busy-mind"] },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Plans                                                                       */
/* -------------------------------------------------------------------------- */

export type PlanSlug =
  | "thunder-protocol"
  | "home-alone-ritual"
  | "gentle-evening"
  | "busy-mind"
  | "slow-bowl";

export type Plan = {
  slug: PlanSlug;
  name: string;
  tagline: string;
  /** One paragraph the customer reads first — the "why this plan". */
  intro: string;
  /** The ritual itself: three repeatable steps. */
  steps: { title: string; detail: string }[];
  /** Product slugs from lib/content.ts (later: Woo SKUs) that support the ritual. */
  products: string[];
  tile: Tile;
};

export const plans: Record<PlanSlug, Plan> = {
  "thunder-protocol": {
    slug: "thunder-protocol",
    name: "The Thunder Protocol",
    tagline: "For pets who come apart at loud noises",
    intro:
      "Noise fear isn't disobedience — it's a body flooded with adrenaline and nowhere to put it. The Thunder Protocol builds a safe place before the storm arrives, so the fear has somewhere to land.",
    steps: [
      {
        title: "Build the den before the season",
        detail:
          "Set the bed somewhere small, low and away from windows. Let them find it on a calm day so it means safety before it means shelter.",
      },
      {
        title: "Start the ritual at the first rumble",
        detail:
          "Not at the first crash. Chew, den, white noise — in the same order every time, so the sequence itself becomes the reassurance.",
      },
      {
        title: "Stay boring",
        detail:
          "Calm company beats comforting words. Sitting nearby reading does more than fussing over them, which can confirm that something is wrong.",
      },
    ],
    products: ["cloud-nine-donut-bed", "zenchews-calming-treats"],
    tile: "lavender",
  },
  "home-alone-ritual": {
    slug: "home-alone-ritual",
    name: "The Home-Alone Ritual",
    tagline: "For the ones who watch the door",
    intro:
      "Separation distress starts long before you leave — at the keys, the shoes, the bag. This ritual rewrites the departure cues into something dull, and gives them a job for the first twenty minutes, which is when it's hardest.",
    steps: [
      {
        title: "Defuse the cues",
        detail:
          "Pick up your keys and sit back down. Put your coat on and make tea. Repeat until the cue predicts nothing at all.",
      },
      {
        title: "Leave them working, not watching",
        detail:
          "Set out the snuffle mat as you go. Foraging occupies the exact window when anxiety spikes, and it ends in a nap rather than a vigil.",
      },
      {
        title: "Come home boring",
        detail:
          "No big reunion. Hang up your coat first, greet them once they've settled — big returns make the absence feel bigger.",
      },
    ],
    products: ["forage-and-flow-snuffle-mat", "zenchews-calming-treats"],
    tile: "sky",
  },
  "gentle-evening": {
    slug: "gentle-evening",
    name: "The Gentle Evening",
    tagline: "For restless nights and late-night pacing",
    intro:
      "A pet who can't switch off at night usually hasn't been given a signal that the day is over. This ritual builds a wind-down your household repeats until it works on its own.",
    steps: [
      {
        title: "Dim the house an hour before bed",
        detail:
          "Lights down, television down, movement down. Pets read the room's energy far more than the clock.",
      },
      {
        title: "One last slow task",
        detail:
          "A lick mat or a scattered handful of food. Licking and sniffing both lower arousal — a short calm task beats a last burst of play.",
      },
      {
        title: "Same bed, same order, every night",
        detail:
          "Predictability is the active ingredient. The ritual works because it is identical, not because any single part of it is clever.",
      },
    ],
    products: ["cloud-nine-donut-bed", "lotus-whisper-fountain"],
    tile: "mint",
  },
  "busy-mind": {
    slug: "busy-mind",
    name: "The Busy Mind",
    tagline: "For clever pets with too little to do",
    intro:
      "Chewing, scratching and door-barking are often boredom wearing an anxious costume. A busy brain is a quiet brain — this plan spends their energy on purpose, before they spend it on your furniture.",
    steps: [
      {
        title: "Feed from a puzzle, not a bowl",
        detail:
          "Turn one meal a day into twenty minutes of work. It is the cheapest enrichment there is and it changes behaviour within a week.",
      },
      {
        title: "Two short sniff sessions",
        detail:
          "Ten minutes of nose work tires a dog more than an hour of fetch, and leaves them calm rather than wired.",
      },
      {
        title: "Rotate, don't accumulate",
        detail:
          "Keep three toys out and the rest away. Swapping weekly makes old things new and stops the novelty running out.",
      },
    ],
    products: ["forage-and-flow-snuffle-mat", "cloud-nine-donut-bed"],
    tile: "lemon",
  },
  "slow-bowl": {
    slug: "slow-bowl",
    name: "The Slow Bowl",
    tagline: "For the ones who inhale dinner",
    intro:
      "Gulping isn't greed — it's arousal, and it leaves a pet wound up rather than satisfied. Stretching the meal out settles the body and the mood together.",
    steps: [
      {
        title: "Make dinner take twenty minutes",
        detail:
          "Move the meal into a snuffle mat or slow feeder. The goal is a pet who finishes tired, not one who finishes first.",
      },
      {
        title: "Feed away from the doorway",
        detail:
          "Traffic makes eating urgent. A quiet corner with a clear view of the room lowers the stakes.",
      },
      {
        title: "Water where they'll use it",
        detail:
          "Moving water encourages steady drinking — especially in cats, where hydration and calm track together more than people expect.",
      },
    ],
    products: ["forage-and-flow-snuffle-mat", "lotus-whisper-fountain"],
    tile: "peach",
  },
};

export const planList = Object.values(plans);

/* -------------------------------------------------------------------------- */
/* Scoring                                                                     */
/* -------------------------------------------------------------------------- */

export type Answers = Record<string, string | string[]>;

export type QuizOutcome = {
  /** 0–100. Higher means more distress signals reported. */
  score: number;
  plan: Plan;
  /** How loudly each plan was argued for — useful for tuning. */
  tally: Record<PlanSlug, number>;
};

const MAX_RAW_SCORE = 110;

function selectedOptions(question: Question, answer: string | string[] | undefined): Option[] {
  if (!answer) return [];
  const values = Array.isArray(answer) ? answer : [answer];
  return question.options.filter((o) => values.includes(o.value));
}

/**
 * Turn a set of answers into a score and a plan.
 * Ties break toward the goal question, since that is what the customer
 * told us they actually want fixed.
 */
export function scoreQuiz(answers: Answers): QuizOutcome {
  const tally: Record<PlanSlug, number> = {
    "thunder-protocol": 0,
    "home-alone-ritual": 0,
    "gentle-evening": 0,
    "busy-mind": 0,
    "slow-bowl": 0,
  };

  let raw = 0;

  for (const question of questions) {
    for (const option of selectedOptions(question, answers[question.id])) {
      raw += option.weight ?? 0;
      // The closing goal question counts double: it is a stated preference,
      // not an inferred one.
      const weight = question.id === "goal" ? 2 : 1;
      for (const slug of option.signals ?? []) {
        tally[slug] += weight;
      }
    }
  }

  const score = Math.max(5, Math.min(100, Math.round((raw / MAX_RAW_SCORE) * 100)));

  const winner = (Object.entries(tally) as [PlanSlug, number][])
    .sort((a, b) => b[1] - a[1])
    .at(0);

  // With no signals at all (every answer neutral), the general plan is the
  // honest default rather than a coin flip.
  const planSlug: PlanSlug = winner && winner[1] > 0 ? winner[0] : "busy-mind";

  return { score, plan: plans[planSlug], tally };
}

/** Plain-language band for the score, shown on the result. */
export function scoreBand(score: number): { label: string; note: string } {
  if (score >= 70) {
    return {
      label: "Highly wound up",
      note: "There's a lot going on for them. Start with one step, not all three.",
    };
  }
  if (score >= 40) {
    return {
      label: "Often unsettled",
      note: "Clear signals, but a consistent ritual usually shifts this within a few weeks.",
    };
  }
  return {
    label: "Mostly settled",
    note: "They're doing well. This plan is about protecting the calm they already have.",
  };
}

export function isPlanSlug(value: string): value is PlanSlug {
  return value in plans;
}
