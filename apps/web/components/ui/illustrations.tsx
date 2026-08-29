/**
 * Brand spot illustrations.
 *
 * These are the shipping default wherever a photograph hasn't landed yet.
 * House style: soft filled shapes, two or three tones drawn from the brand
 * palette, closed eyes and resting postures — every animal here is calm.
 * No outlines around everything; line work is used sparingly for detail.
 *
 * Each illustration fills its container, so it sits in a Figure slot of any size.
 */

type Props = { className?: string };

const fill = {
  violet: "#5b4397",
  violetSoft: "#8a72c2",
  violetMist: "#c9bfe6",
  rose: "#de5493",
  roseSoft: "#f2cbdb",
  ink: "#2e2153",
  cream: "#fcfbf9",
  gold: "#c9a24b",
  goldSoft: "#e8c778",
} as const;

/* -------------------------------------------------------------------------- */
/* Scenes                                                                      */
/* -------------------------------------------------------------------------- */

/** A dog curled asleep in a donut bed, under an enso moon. The hero image. */
export function SleepingDog({ className }: Props) {
  return (
    <svg viewBox="0 0 260 200" className={className} role="img" aria-label="A dog curled asleep in a round bed">
      {/* enso moon */}
      <circle
        cx="206" cy="46" r="30"
        fill="none" stroke={fill.goldSoft} strokeWidth="4" strokeLinecap="round"
        strokeDasharray="160 28" transform="rotate(-50 206 46)"
      />
      <circle cx="46" cy="34" r="3" fill={fill.goldSoft} opacity="0.75" />
      <circle cx="70" cy="18" r="2" fill={fill.goldSoft} opacity="0.5" />
      <circle cx="244" cy="102" r="2.5" fill={fill.rose} opacity="0.5" />

      {/* bed shadow */}
      <ellipse cx="130" cy="174" rx="96" ry="14" fill={fill.violet} opacity="0.12" />

      {/* bed rim */}
      <path
        d="M30 148c0-24 45-40 100-40s100 16 100 40-45 34-100 34S30 172 30 148Z"
        fill={fill.violet}
      />
      {/* bed cushion */}
      <ellipse cx="130" cy="142" rx="78" ry="24" fill={fill.violetSoft} />

      {/* curled body */}
      <path
        d="M96 140c-6-30 18-52 50-52 30 0 52 19 54 41 1 13-10 20-26 22-26 3-74 4-78-11Z"
        fill={fill.cream}
      />
      {/* haunch */}
      <ellipse cx="176" cy="130" rx="27" ry="20" fill={fill.violetMist} opacity="0.5" />
      {/* tail curling over the flank */}
      <path
        d="M196 134c15-2 24-11 21-21-2-8-12-11-17-5"
        fill="none" stroke={fill.cream} strokeWidth="12" strokeLinecap="round"
      />

      {/* head: skull, then snout laid along the rim */}
      <circle cx="94" cy="116" r="28" fill={fill.cream} />
      <path
        d="M74 106c-13 2-23 8-25 16-2 9 6 15 18 15 11 0 21-6 24-14Z"
        fill={fill.cream}
      />
      {/* snout shading + nose */}
      <path
        d="M60 112c-7 2-11 6-11 11 0 5 5 8 12 8 5 0 10-2 12-5Z"
        fill={fill.roseSoft} opacity="0.45"
      />
      <ellipse cx="50" cy="120" rx="6" ry="5" fill={fill.ink} />
      {/* mouth line */}
      <path d="M58 130c5 2 11 2 15-1" fill="none" stroke={fill.ink} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      {/* floppy ear */}
      <path
        d="M104 92c14-2 24 6 24 20 0 15-10 26-21 26-6 0-10-5-10-13Z"
        fill={fill.violetMist}
      />
      {/* closed eye */}
      <path d="M76 106c4-4 11-4 15 0" fill="none" stroke={fill.ink} strokeWidth="3" strokeLinecap="round" />
      {/* brow freckles */}
      <circle cx="98" cy="128" r="1.6" fill={fill.ink} opacity="0.35" />
      <circle cx="104" cy="133" r="1.6" fill={fill.ink} opacity="0.35" />

      {/* sleep marks */}
      <path d="M52 84c0-5 8-5 8-10" fill="none" stroke={fill.rose} strokeWidth="2.4" strokeLinecap="round" opacity="0.6" />
      <path d="M38 70c0-4 6-4 6-8" fill="none" stroke={fill.rose} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/** A cat curled into a comma, asleep. */
export function SleepingCat({ className }: Props) {
  return (
    <svg viewBox="0 0 260 200" className={className} role="img" aria-label="A cat curled asleep">
      <ellipse cx="130" cy="170" rx="86" ry="14" fill={fill.violet} opacity="0.12" />

      {/* mat */}
      <ellipse cx="130" cy="156" rx="88" ry="22" fill={fill.violetMist} opacity="0.55" />

      {/* body — one continuous curl */}
      <path
        d="M64 140c0-32 28-56 66-56 36 0 62 22 62 48 0 16-12 24-34 25-30 1-94 5-94-17Z"
        fill={fill.violet}
      />
      {/* tail wrapping the front */}
      <path
        d="M74 150c-14 0-22-8-20-18 2-9 12-13 20-9"
        fill="none" stroke={fill.violetSoft} strokeWidth="13" strokeLinecap="round"
      />

      {/* head */}
      <ellipse cx="176" cy="112" rx="30" ry="27" fill={fill.violetSoft} />
      {/* ears */}
      <path d="M154 94l-3-20 19 10Z" fill={fill.violetSoft} />
      <path d="M196 92l7-19 8 17Z" fill={fill.violetSoft} />
      <path d="M156 92l-1-11 10 6Z" fill={fill.roseSoft} opacity="0.75" />
      <path d="M197 91l4-10 4 9Z" fill={fill.roseSoft} opacity="0.75" />

      {/* closed eyes */}
      <path d="M162 110c3.5-3.5 9-3.5 12.5 0" fill="none" stroke={fill.cream} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M184 110c3.5-3.5 9-3.5 12.5 0" fill="none" stroke={fill.cream} strokeWidth="2.8" strokeLinecap="round" />
      {/* nose + whiskers */}
      <path d="M176 120l-4 4h8Z" fill={fill.roseSoft} />
      <path d="M150 118h-16M152 126l-15 5M202 118h16M200 126l15 5" stroke={fill.cream} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />

      {/* sleep marks */}
      <path d="M214 74c0-5 8-5 8-10" fill="none" stroke={fill.rose} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
      <circle cx="52" cy="52" r="3" fill={fill.goldSoft} opacity="0.7" />
      <circle cx="76" cy="34" r="2" fill={fill.goldSoft} opacity="0.45" />
    </svg>
  );
}

/** A dog and cat asleep together — the "Together" collection. */
export function DogAndCat({ className }: Props) {
  return (
    <svg viewBox="0 0 260 200" className={className} role="img" aria-label="A dog and a cat asleep side by side">
      <ellipse cx="130" cy="168" rx="96" ry="15" fill={fill.violet} opacity="0.12" />
      <path d="M34 146c0-22 43-38 96-38s96 16 96 38-43 32-96 32-96-10-96-32Z" fill={fill.rose} opacity="0.85" />
      <ellipse cx="130" cy="140" rx="76" ry="22" fill={fill.roseSoft} />

      {/* dog, back left */}
      <path d="M92 136c-5-26 16-46 44-46 26 0 46 17 47 36 1 12-9 18-22 20-23 3-66 3-69-10Z" fill={fill.cream} />
      <circle cx="92" cy="118" r="24" fill={fill.cream} />
      <path d="M75 110c-11 2-19 7-21 14-1 8 5 13 15 13 9 0 18-5 20-12Z" fill={fill.cream} />
      <path d="M64 116c-6 2-9 5-9 9 0 4 4 6 10 6 4 0 8-1 10-4Z" fill={fill.roseSoft} opacity="0.45" />
      <ellipse cx="56" cy="122" rx="5" ry="4.2" fill={fill.ink} />
      <path d="M100 96c12-2 21 5 21 17 0 13-9 22-18 22-5 0-9-4-9-11Z" fill={fill.violetMist} />
      <path d="M76 110c3.4-3.4 9-3.4 12.4 0" fill="none" stroke={fill.ink} strokeWidth="2.6" strokeLinecap="round" />

      {/* cat, front right, tucked against the dog */}
      <path d="M140 148c0-20 18-34 40-34 22 0 38 13 38 28 0 10-8 14-22 15-20 1-56 3-56-9Z" fill={fill.violet} />
      <ellipse cx="196" cy="130" rx="22" ry="20" fill={fill.violetSoft} />
      <path d="M180 118l-2-14 13 7Z" fill={fill.violetSoft} />
      <path d="M210 117l5-13 6 12Z" fill={fill.violetSoft} />
      <path d="M186 129c2.6-2.6 6.6-2.6 9.2 0" fill="none" stroke={fill.cream} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M202 129c2.6-2.6 6.6-2.6 9.2 0" fill="none" stroke={fill.cream} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M197 137l-3 3h6Z" fill={fill.roseSoft} />

      <path d="M148 76c0-5 8-5 8-10" fill="none" stroke={fill.gold} strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
      <circle cx="60" cy="56" r="3" fill={fill.goldSoft} opacity="0.7" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Products                                                                    */
/* -------------------------------------------------------------------------- */

export function DonutBed({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A round donut-style pet bed">
      <ellipse cx="100" cy="132" rx="72" ry="12" fill={fill.violet} opacity="0.14" />
      {/* outer rim */}
      <ellipse cx="100" cy="96" rx="72" ry="40" fill={fill.violet} />
      {/* rim highlight */}
      <path d="M28 96c0-22 32-40 72-40s72 18 72 40" fill="none" stroke={fill.violetSoft} strokeWidth="7" strokeLinecap="round" opacity="0.55" />
      {/* cushion */}
      <ellipse cx="100" cy="94" rx="45" ry="22" fill={fill.cream} />
      <ellipse cx="100" cy="92" rx="45" ry="22" fill={fill.roseSoft} opacity="0.35" />
      {/* quilting */}
      <path d="M70 88c8 6 22 9 30 9s22-3 30-9" fill="none" stroke={fill.violetMist} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M100 72v41" stroke={fill.violetMist} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function SnuffleMat({ className }: Props) {
  const tufts = [
    { x: 46, y: 66, r: 11, c: fill.gold },
    { x: 74, y: 58, r: 13, c: fill.goldSoft },
    { x: 104, y: 62, r: 12, c: fill.gold },
    { x: 134, y: 57, r: 13, c: fill.goldSoft },
    { x: 158, y: 68, r: 10, c: fill.gold },
    { x: 58, y: 88, r: 12, c: fill.goldSoft },
    { x: 88, y: 84, r: 13, c: fill.gold },
    { x: 118, y: 86, r: 12, c: fill.goldSoft },
    { x: 146, y: 90, r: 11, c: fill.gold },
    { x: 72, y: 108, r: 11, c: fill.gold },
    { x: 102, y: 110, r: 12, c: fill.goldSoft },
    { x: 132, y: 108, r: 11, c: fill.gold },
  ];
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A snuffle mat with fabric tufts">
      <ellipse cx="100" cy="134" rx="70" ry="11" fill={fill.violet} opacity="0.14" />
      <rect x="26" y="42" width="148" height="86" rx="18" fill="#a8862c" />
      <rect x="32" y="46" width="136" height="76" rx="14" fill="#c19a35" />
      {tufts.map((t, i) => (
        <circle key={i} cx={t.x} cy={t.y} r={t.r} fill={t.c} opacity={0.92} />
      ))}
      {/* a treat hidden in the pile */}
      <circle cx="112" cy="98" r="5" fill={fill.rose} />
    </svg>
  );
}

export function Fountain({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A ceramic pet water fountain">
      <ellipse cx="100" cy="136" rx="62" ry="11" fill={fill.violet} opacity="0.14" />
      {/* basin */}
      <path d="M42 100c0-8 26-14 58-14s58 6 58 14v10c0 12-26 20-58 20s-58-8-58-20Z" fill="#2f7a55" />
      <ellipse cx="100" cy="100" rx="58" ry="15" fill="#57a578" />
      <ellipse cx="100" cy="100" rx="46" ry="11" fill="#7dc2a0" opacity="0.65" />
      {/* column */}
      <path d="M92 96V70c0-10 4-16 8-20 4 4 8 10 8 20v26Z" fill="#2f7a55" />
      {/* water arc */}
      <path d="M100 46c0 10-14 16-14 26a14 14 0 0 0 28 0c0-10-14-16-14-26Z" fill="#7db8d8" />
      <path d="M100 52c0 7-8 11-8 17a8 8 0 0 0 16 0c0-6-8-10-8-17Z" fill="#a9d5ea" opacity="0.85" />
      {/* ripples */}
      <path d="M74 104c6 3 14 4 26 4s20-1 26-4" fill="none" stroke="#cdeade" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function Chews({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="Calming chew treats in a pouch">
      <ellipse cx="100" cy="136" rx="60" ry="11" fill={fill.violet} opacity="0.14" />
      {/* pouch */}
      <path d="M56 52h88a8 8 0 0 1 8 8v58a12 12 0 0 1-12 12H60a12 12 0 0 1-12-12V60a8 8 0 0 1 8-8Z" fill="#b04a7c" />
      <path d="M56 52h88a8 8 0 0 1 8 8v14H48V60a8 8 0 0 1 8-8Z" fill="#c9628f" />
      {/* seal */}
      <path d="M62 44h76l-6 8H68Z" fill="#8f3462" />
      {/* label enso */}
      <circle
        cx="100" cy="100" r="20"
        fill="none" stroke={fill.roseSoft} strokeWidth="3" strokeLinecap="round"
        strokeDasharray="100 24" transform="rotate(-50 100 100)"
      />
      {/* two chews spilling out */}
      <g transform="rotate(-16 44 122)">
        <rect x="26" y="114" width="34" height="14" rx="7" fill="#8a5a3a" />
        <circle cx="28" cy="115" r="5" fill="#8a5a3a" />
        <circle cx="28" cy="127" r="5" fill="#8a5a3a" />
        <circle cx="58" cy="115" r="5" fill="#8a5a3a" />
        <circle cx="58" cy="127" r="5" fill="#8a5a3a" />
      </g>
      <g transform="rotate(12 162 124)">
        <rect x="146" y="118" width="30" height="12" rx="6" fill="#9c6a46" />
        <circle cx="148" cy="119" r="4.5" fill="#9c6a46" />
        <circle cx="148" cy="129" r="4.5" fill="#9c6a46" />
        <circle cx="174" cy="119" r="4.5" fill="#9c6a46" />
        <circle cx="174" cy="129" r="4.5" fill="#9c6a46" />
      </g>
    </svg>
  );
}

/** A hooded cave bed — enclosed, for pets who like to disappear. */
export function CaveBed({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A hooded cave-style pet bed">
      <ellipse cx="100" cy="134" rx="68" ry="11" fill={fill.violet} opacity="0.14" />
      {/* hood */}
      <path d="M32 118V88a68 40 0 0 1 136 0v30Z" fill="#4a7fa0" />
      <path d="M42 116V90a58 34 0 0 1 116 0v26Z" fill="#6ea4c4" />
      {/* opening */}
      <ellipse cx="100" cy="114" rx="38" ry="30" fill="#2e5a75" />
      <ellipse cx="100" cy="118" rx="30" ry="23" fill="#23485e" />
      {/* base cushion */}
      <path d="M28 118h144v6a10 10 0 0 1-10 10H38a10 10 0 0 1-10-10Z" fill="#4a7fa0" />
      <ellipse cx="100" cy="126" rx="30" ry="8" fill="#a9d0e4" />
      {/* two sleepy eyes inside the dark */}
      <path d="M88 112c2.6-2.6 6.6-2.6 9.2 0" fill="none" stroke="#a9d0e4" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
      <path d="M104 112c2.6-2.6 6.6-2.6 9.2 0" fill="none" stroke="#a9d0e4" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

/** Two matching mats — one human-sized, one pet-sized. */
export function MatSet({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A large meditation mat with a smaller matching pet mat">
      <ellipse cx="100" cy="136" rx="72" ry="10" fill={fill.violet} opacity="0.14" />
      {/* large mat */}
      <path d="M18 100l58-24 106 20-58 26Z" fill={fill.violet} />
      <path d="M18 100l58-24 106 20-58 26Z" fill={fill.violetSoft} opacity="0.35" />
      <path d="M34 100l44-18 82 16-44 20Z" fill="none" stroke={fill.violetMist} strokeWidth="2" opacity="0.6" />
      {/* small pet mat, laid on top */}
      <path d="M74 86l30-12 52 10-30 13Z" fill={fill.rose} />
      <path d="M84 85l22-8 36 7-22 9Z" fill="none" stroke={fill.roseSoft} strokeWidth="2" opacity="0.8" />
      {/* rolled edge */}
      <path d="M18 100c-6 3-6 9 0 12l56 12 6-14Z" fill={fill.violet} opacity="0.85" />
    </svg>
  );
}

/** A maze-bottomed slow feeder bowl. */
export function SlowFeeder({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A slow feeder bowl with a maze base">
      <ellipse cx="100" cy="132" rx="62" ry="11" fill="#8a5a20" opacity="0.16" />
      <path d="M38 84h124l-11 34a12 12 0 0 1-11 8H60a12 12 0 0 1-11-8Z" fill="#c07f3a" />
      <ellipse cx="100" cy="84" rx="62" ry="17" fill="#e0a05c" />
      <ellipse cx="100" cy="84" rx="50" ry="13" fill="#f0c391" />
      {/* maze ridges */}
      <path d="M74 78a10 10 0 0 1 20 0 10 10 0 0 0 20 0" fill="none" stroke="#c07f3a" strokeWidth="5" strokeLinecap="round" />
      <path d="M64 90a10 10 0 0 1 20 0 10 10 0 0 0 20 0 10 10 0 0 1 20 0" fill="none" stroke="#c07f3a" strokeWidth="5" strokeLinecap="round" />
      {/* kibble caught in the maze */}
      <circle cx="86" cy="86" r="4" fill="#8a5a20" opacity="0.8" />
      <circle cx="112" cy="82" r="3.6" fill="#8a5a20" opacity="0.7" />
    </svg>
  );
}

/** A raked-sand cardboard scratcher. */
export function Scratcher({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A curved cardboard scratcher with a raked pattern">
      <ellipse cx="100" cy="136" rx="64" ry="10" fill="#8a5a20" opacity="0.16" />
      {/* base */}
      <path d="M34 122h132v8a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6Z" fill="#a8762f" />
      {/* wave body */}
      <path d="M40 122c0-30 22-46 48-46 30 0 26 30 50 30 12 0 18-8 20-18v34Z" fill="#e0b76a" />
      <path d="M40 122c0-30 22-46 48-46 30 0 26 30 50 30 12 0 18-8 20-18" fill="none" stroke="#c19a45" strokeWidth="3" />
      {/* raked corrugation lines */}
      <path d="M52 122c0-22 16-36 36-36M64 122c0-16 12-28 28-30M76 122c0-11 8-20 22-24M90 122c2-8 8-14 18-16M104 122c4-6 10-9 18-9M118 122c4-4 9-6 15-6" fill="none" stroke="#b8892f" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

/** A boxed starter kit. */
export function StarterKit({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A boxed starter kit with a guide and treats">
      <ellipse cx="100" cy="136" rx="64" ry="10" fill={fill.violet} opacity="0.14" />
      {/* box */}
      <path d="M42 76h116v50a10 10 0 0 1-10 10H52a10 10 0 0 1-10-10Z" fill="#c07f3a" />
      <path d="M42 66h116v14H42Z" fill="#e0a05c" />
      {/* ribbon */}
      <path d="M94 66h12v70H94Z" fill={fill.rose} opacity="0.9" />
      {/* guide booklet leaning out */}
      <g transform="rotate(-10 62 62)">
        <rect x="48" y="34" width="34" height="44" rx="3" fill={fill.cream} />
        <rect x="48" y="34" width="7" height="44" rx="3" fill={fill.violet} />
        <path d="M62 46h14M62 54h14M62 62h10" stroke={fill.violetMist} strokeWidth="2.4" strokeLinecap="round" />
      </g>
      {/* chews spilling */}
      <g transform="rotate(14 146 92)">
        <rect x="134" y="86" width="26" height="11" rx="5.5" fill="#8a5a3a" />
        <circle cx="136" cy="87" r="4" fill="#8a5a3a" />
        <circle cx="136" cy="96" r="4" fill="#8a5a3a" />
        <circle cx="158" cy="87" r="4" fill="#8a5a3a" />
        <circle cx="158" cy="96" r="4" fill="#8a5a3a" />
      </g>
    </svg>
  );
}

/** A wrap-style calming vest. */
export function CalmingVest({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A calming pressure vest for a dog">
      <ellipse cx="100" cy="138" rx="52" ry="9" fill="#8f3462" opacity="0.16" />
      {/* body of the vest */}
      <path d="M62 46c10-8 26-12 38-12s28 4 38 12l-6 66a14 14 0 0 1-14 12H82a14 14 0 0 1-14-12Z" fill="#c9628f" />
      {/* front panel */}
      <path d="M74 52c8-6 18-9 26-9s18 3 26 9l-5 56a10 10 0 0 1-10 9H89a10 10 0 0 1-10-9Z" fill="#e089ac" />
      {/* strap */}
      <path d="M66 74h68" stroke="#a3406c" strokeWidth="9" strokeLinecap="round" />
      <rect x="90" y="67" width="20" height="14" rx="4" fill="#f2cbdb" />
      {/* stitch line */}
      <path d="M100 46v76" stroke="#f2cbdb" strokeWidth="2" strokeDasharray="5 5" opacity="0.8" />
    </svg>
  );
}

/** A textured lick mat. */
export function LickMat({ className }: Props) {
  const dots: { x: number; y: number }[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 7; c++) {
      dots.push({ x: 48 + c * 17, y: 62 + r * 15 });
    }
  }
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A textured lick mat spread with a soft topping">
      <ellipse cx="100" cy="132" rx="66" ry="10" fill="#2a6b48" opacity="0.16" />
      <rect x="32" y="46" width="136" height="76" rx="16" fill="#2f7a55" />
      <rect x="38" y="52" width="124" height="64" rx="12" fill="#57a578" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="5" fill="#7dc2a0" />
      ))}
      {/* smeared topping */}
      <path
        d="M56 70c14-8 34-10 52-4 16 5 30 3 38-4v30c-10 8-26 10-42 5-16-5-34-4-48 4Z"
        fill={fill.cream} opacity="0.62"
      />
    </svg>
  );
}

/** A weighted stoneware bowl pair. */
export function BowlSet({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A pair of weighted stoneware pet bowls">
      <ellipse cx="100" cy="130" rx="72" ry="11" fill="#1f5c7a" opacity="0.16" />
      {/* back bowl */}
      <path d="M104 74h64l-8 26a10 10 0 0 1-9 7h-30a10 10 0 0 1-9-7Z" fill="#4a7fa0" />
      <ellipse cx="136" cy="74" rx="32" ry="10" fill="#7fb0cd" />
      <ellipse cx="136" cy="74" rx="24" ry="7" fill="#a9d0e4" />
      {/* front bowl */}
      <path d="M28 86h72l-9 30a11 11 0 0 1-11 8H48a11 11 0 0 1-11-8Z" fill="#2e5a75" />
      <ellipse cx="64" cy="86" rx="36" ry="11" fill="#6ea4c4" />
      <ellipse cx="64" cy="86" rx="27" ry="8" fill="#a9d0e4" />
      {/* water line */}
      <path d="M44 88c6 2 14 3 20 3s14-1 20-3" fill="none" stroke="#d8ecf5" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Journal                                                                     */
/* -------------------------------------------------------------------------- */

/** Evening rituals: a moon over a sleeping house line. */
export function EveningRitual({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A crescent moon over a quiet room at night">
      <circle cx="132" cy="52" r="26" fill={fill.goldSoft} opacity="0.9" />
      <circle cx="120" cy="46" r="24" fill="#d8d2ee" />
      <circle cx="58" cy="38" r="3" fill={fill.goldSoft} />
      <circle cx="82" cy="24" r="2" fill={fill.goldSoft} opacity="0.7" />
      <circle cx="168" cy="30" r="2.4" fill={fill.goldSoft} opacity="0.6" />
      <circle cx="42" cy="66" r="2" fill={fill.goldSoft} opacity="0.5" />

      {/* lamp */}
      <path d="M40 128V96" stroke={fill.violet} strokeWidth="4" strokeLinecap="round" />
      <path d="M26 96h28l-6-16H32Z" fill={fill.gold} opacity="0.9" />
      <ellipse cx="40" cy="130" rx="14" ry="4" fill={fill.violet} />

      {/* bed with sleeping form */}
      <path d="M76 128c0-18 26-30 56-30s52 12 52 30Z" fill={fill.violet} />
      <path d="M92 118c8-8 24-12 40-12s28 4 34 10" fill="none" stroke={fill.violetMist} strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="118" cy="104" rx="14" ry="10" fill="#d8d2ee" />
      <path d="M112 102c2.4-2.4 6-2.4 8.4 0" fill="none" stroke={fill.ink} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Slow feeding: a bowl and a slow clock. */
export function SlowBowl({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A pet bowl beside a clock face">
      <ellipse cx="88" cy="132" rx="58" ry="11" fill="#2a6b48" opacity="0.16" />
      {/* bowl */}
      <path d="M36 92h104l-10 30a10 10 0 0 1-9 6H55a10 10 0 0 1-9-6Z" fill="#2f7a55" />
      <ellipse cx="88" cy="92" rx="52" ry="14" fill="#57a578" />
      <ellipse cx="88" cy="92" rx="40" ry="10" fill="#7dc2a0" />
      {/* kibble */}
      <circle cx="72" cy="90" r="6" fill="#a8862c" />
      <circle cx="90" cy="86" r="6" fill="#c19a35" />
      <circle cx="106" cy="92" r="5.5" fill="#a8862c" />
      <circle cx="82" cy="96" r="5" fill="#c19a35" />
      {/* clock */}
      <circle cx="150" cy="56" r="28" fill="#c6e2d2" />
      <circle cx="150" cy="56" r="22" fill={fill.cream} />
      <path d="M150 40v17l11 8" fill="none" stroke="#2a6b48" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M142 26h16" stroke="#2f7a55" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** Ingredients: a botanical sprig and a leaf. */
export function Botanical({ className }: Props) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="A botanical sprig with leaves">
      <ellipse cx="100" cy="140" rx="52" ry="9" fill="#8a5a20" opacity="0.14" />
      {/* jar */}
      <path d="M74 76h52v50a12 12 0 0 1-12 12H86a12 12 0 0 1-12-12Z" fill="#f0d8be" />
      <path d="M74 76h52v12H74Z" fill="#dcb98e" />
      <path d="M84 68h32v8H84Z" fill="#c49a68" />
      {/* stem */}
      <path d="M100 68V26" stroke="#4f7a3c" strokeWidth="3.4" strokeLinecap="round" />
      {/* leaves */}
      <path d="M100 40c-14 0-24-8-26-20 14-3 24 4 26 20Z" fill="#6a9c52" />
      <path d="M100 52c14 0 24-8 26-20-14-3-24 4-26 20Z" fill="#89b96f" />
      <path d="M100 62c-11 0-19-6-21-16 11-2 19 3 21 16Z" fill="#6a9c52" opacity="0.85" />
      {/* contents */}
      <path d="M82 108c6-4 12-4 18 0s12 4 18 0" fill="none" stroke="#c49a68" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <circle cx="90" cy="122" r="4" fill="#89b96f" opacity="0.8" />
      <circle cx="104" cy="126" r="3.4" fill="#6a9c52" opacity="0.8" />
      <circle cx="114" cy="120" r="3" fill="#89b96f" opacity="0.7" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Collections                                                                 */
/* -------------------------------------------------------------------------- */

export const collectionArt: Record<string, (p: Props) => React.ReactElement> = {
  "calm-comfort": DonutBed,
  "slow-living": SnuffleMat,
  "zen-home": Fountain,
  together: DogAndCat,
};

/** Products borrow a drawing by art key, so several can share one illustration. */
export const artByKey: Record<string, (p: Props) => React.ReactElement> = {
  bed: DonutBed,
  "cave-bed": CaveBed,
  "mat-set": MatSet,
  mat: SnuffleMat,
  "slow-feeder": SlowFeeder,
  scratcher: Scratcher,
  "starter-kit": StarterKit,
  fountain: Fountain,
  "bowl-set": BowlSet,
  chews: Chews,
  vest: CalmingVest,
  "lick-mat": LickMat,
};

export const journalArt: Record<string, (p: Props) => React.ReactElement> = {
  "five-evening-rituals-for-anxious-dogs": EveningRitual,
  "why-slow-feeding-calms-fast-eaters": SlowBowl,
  "l-theanine-explained": Botanical,
};
