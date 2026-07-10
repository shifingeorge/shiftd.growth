// Single source of truth for all copy. Swap values here when final details land.

export const site = {
  wordmark: "shiftd.design",
  name: "Shifin George",
  location: "Kochi",
  timezone: "Asia/Kolkata",
  email: "shifiyy03.design@gmail.com",
  availability: "open for freelance + full-time",
} as const;

export const hero = {
  // Split per word so each can be painted independently.
  headline: ["They", "call", "it", "design.", "I", "call", "it", "organized", "obsession."],
  subline: "Shifin George — part designer, part vibe coder, full-time problem untangler.",
  selectionReward: "you just selected the whole thesis. hired.",
} as const;

export const about = {
  bio: "I design like I argue: with structure, receipts, and one strong accent color. Based in Kochi, working anywhere the wifi reaches. Clients get obsession disguised as process — recruiters get case studies that show the mess and the method.",
  toolkit: [
    "Figma",
    "Framer",
    "Next.js",
    "Tailwind",
    "Motion",
    "Notion",
    "Illustrator",
    "Claude Code",
  ],
} as const;

export const contact = {
  headline: "got a project that needs to be seen?",
  cta: "say hello",
  copied: "copied — now write it",
  socials: [
    { label: "Email", href: "mailto:shifiyy03.design@gmail.com" },
    { label: "WhatsApp", href: "https://wa.me/917994613019" },
    { label: "Figma", href: "https://www.figma.com/@shifiyy" },
    { label: "Medium", href: "https://medium.com/@shif.td" },
  ],
} as const;

export const footer = {
  thanks: "thanks for scrolling",
  colophon: "designed & vibe-coded by shifin · kochi · v3",
} as const;

export const eggs = {
  consoleNote:
    "snooping? respect. say shifiyy03.design@gmail.com — the code is the case study.",
  obsessionMode: "you found obsession mode",
  archiveTitle: "the archive",
  archiveNote: "where this came from.",
  archive: [
    { label: "shifiyy — poster sphere", href: "https://shifiyy.vercel.app/" },
    { label: "shiftd.design — v2", href: "https://shifiyy-archive2.vercel.app/" },
  ],
} as const;
