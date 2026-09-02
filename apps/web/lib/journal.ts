/**
 * Journal article bodies.
 *
 * These are DRAFTS in the brand voice — edit them before publishing. They are
 * deliberately behavioural rather than physiological: "many owners find their
 * dog settles faster" rather than claims about what a product does to a
 * nervous system. Mechanism claims are a different regulatory category and the
 * evidence behind the ones repeated in pet marketing is thinner than the
 * confident phrasing suggests.
 *
 * Paragraphs render as-is; a string starting with "## " renders as a subhead.
 */

export type Article = {
  slug: string;
  /** Roughly how long the body takes to read, in minutes. */
  readingTime: number;
  body: string[];
};

export const articles: Record<string, Article> = {
  "five-evening-rituals-for-anxious-dogs": {
    slug: "five-evening-rituals-for-anxious-dogs",
    readingTime: 4,
    body: [
      "Most advice for an anxious dog arrives as a list of things to buy. This isn't that. What follows are five small practices that cost nothing, work in an ordinary house, and get better the more boringly you repeat them.",
      "The thing worth understanding first: a dog who can't settle in the evening usually hasn't been given a signal that the day is over. Houses wind down gradually and invisibly — to us. To a dog watching for cues, nothing has obviously changed.",
      "## 1. Dim the house an hour before bed",
      "Lights down, television down, movement down. Pets read the energy of a room far more reliably than they read a clock, and a household that is still bustling at ten is a household that says the day is ongoing. This one costs nothing and does more than most people expect.",
      "## 2. Give them one last slow task",
      "A lick mat, or a handful of food scattered on a towel. Sniffing and licking are both slow, repetitive, absorbing activities, and a dog who finishes one tends to be ready to lie down. A last burst of fetch does the opposite — it leaves them alert at exactly the wrong moment.",
      "## 3. Keep the order identical",
      "Same task, same spot, same bed, same sequence. Predictability is the active ingredient here, not cleverness. A ritual works because it is the same every night; the moment you start improvising, the dog goes back to watching for what happens next.",
      "## 4. Be boring on your way to bed",
      "No long goodnight, no fussing, no reassurance in a worried voice. Calm company beats comforting words — sitting nearby reading does more for a nervous dog than crouching over them saying it's alright, which can confirm that something was wrong in the first place.",
      "## 5. Give it two weeks before you judge it",
      "The first three nights usually change nothing. Somewhere in the second week, most owners notice the dog going to the bed on their own before being asked. That's the signal you're looking for — not a dramatic improvement, but a small piece of the routine starting to run itself.",
      "If your evenings are already like this and nothing has shifted, the problem may not be the evening. Noise fear, separation distress and pain all show up as restlessness at night, and each needs a different response. A vet visit is worth it before you spend money on anything else.",
    ],
  },

  "why-slow-feeding-calms-fast-eaters": {
    slug: "why-slow-feeding-calms-fast-eaters",
    readingTime: 3,
    body: [
      "A dog who finishes dinner in ninety seconds isn't necessarily greedy. More often they're aroused — and a meal that ends almost before it started leaves that arousal with nowhere to go.",
      "You can see it afterwards. The pacing, the checking of the bowl, the restlessness that follows a fast meal and doesn't follow a slow one. The food went in; the eating didn't really happen.",
      "## What changes when a meal takes twenty minutes",
      "Stretch the same food across a snuffle mat or a maze-bottomed bowl and the meal becomes work. The dog has to find each piece, which means using their nose, which is slow, methodical and quietly absorbing. Most dogs finish that version of dinner and lie down.",
      "Nothing about the food has changed. The only difference is how long it took and how much of the dog was involved in getting it.",
      "## Where to start",
      "Move one meal a day — dinner is usually the useful one, since it sits closest to the part of the evening you want to be calm. Keep the portion identical; you're changing the delivery, not the diet.",
      "Expect the first few attempts to be messy and a bit frustrating for them. A dog used to a bowl will nose at a snuffle mat impatiently before working out what it's for. Scatter a few pieces on top for the first couple of days so the reward is obvious.",
      "## A note on fast eating and bloat",
      "Rapid eating is one of several factors associated with bloat in deep-chested breeds — a genuine emergency. That's not a reason to panic about a fast eater, but it is a reason to take slowing them down seriously, and to talk to your vet if you have a Great Dane, a Weimaraner or a similar build.",
      "For everyone else, the payoff is simpler: a pet who finishes tired rather than wound up, and an evening that starts calmer than it used to.",
    ],
  },

  "l-theanine-explained": {
    slug: "l-theanine-explained",
    readingTime: 4,
    body: [
      "L-theanine turns up on the label of almost every calming chew sold for dogs, usually alongside a confident sentence about what it does to the brain. It's worth knowing what's actually established, what's plausible, and what's marketing.",
      "## What it is",
      "L-theanine is an amino acid found in tea leaves. In humans it has been studied for its effect on relaxed alertness — calm without drowsiness — and that framing is what carried it into pet supplements.",
      "## What the evidence looks like",
      "There is a real body of veterinary research on L-theanine in dogs and cats, some of it showing reduced signs of stress in noise-sensitive dogs and in cats adjusting to new environments. The studies tend to be small, and several were funded by manufacturers, which doesn't make them wrong but does mean the picture is less settled than a product label implies.",
      "The honest summary: it's one of the better-supported calming ingredients on the market, and it is nowhere near a guaranteed effect. Some dogs respond noticeably. Some don't respond at all.",
      "## What it isn't",
      "It isn't a sedative, and a chew is not a substitute for behavioural work or for veterinary advice on a dog with a serious phobia. If your dog panics during storms every year, a supplement is a supporting player at best — the ritual around it does more.",
      "## Using it sensibly",
      "Timing matters more than dose. Give it around forty minutes before the thing you're preparing for, not during — once a dog is already panicking, you've missed the window, and you're better off focusing on the environment.",
      "And check with your vet first if your pet is on medication, pregnant, or very young. That isn't a disclaimer for its own sake: L-theanine has interactions worth knowing about, and your vet knows your animal.",
      "## The short version",
      "Promising, reasonably well-tolerated, genuinely helpful for some pets, and much less powerful than the packaging suggests. Buy it as part of a routine, not as a solution.",
    ],
  },
};

export function articleBySlug(slug: string) {
  return articles[slug] ?? null;
}
