export type Role = {
  label: "NOW" | "BEFORE";
  role: string;
  org: string;
  orgHref?: string;
  period: string;
  note?: string;
};

export const experience: Role[] = [
  {
    label: "NOW",
    role: "Operations Manager",
    org: "Smashed Burgers & Co",
    orgHref: "https://www.linkedin.com/company/smashed-burgers-and-co/",
    period: "May 2026 — [present]",
    note: "Running kitchens taught me more about systems design than any Figma file.",
  },
  {
    label: "NOW",
    role: "UI Designer, freelance",
    org: "shiftd.growth",
    period: "Feb 2025 — [present]",
    note: "Still taking on freelance work.",
  },
  {
    label: "BEFORE",
    role: "Social Media Strategist",
    org: "Smashed Burgers & Co",
    orgHref: "https://www.instagram.com/smashedburgersandco",
    period: "Sep 2025 — May 2026",
  },
  {
    label: "BEFORE",
    role: "UI/UX Designer, intern",
    org: "Techmindz",
    orgHref: "https://www.techmindz.com/",
    period: "Aug 2024 — Feb 2025",
  },
  {
    label: "BEFORE",
    role: "UI Designer, intern",
    org: "Eduport",
    orgHref: "https://web.eduport.app/",
    period: "May 2023 — Jul 2023",
  },
];
