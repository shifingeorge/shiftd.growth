export type Role = {
  label: "NOW" | "BEFORE";
  role: string;
  org: string;
  period: string;
  note?: string;
};

export const experience: Role[] = [
  {
    label: "NOW",
    role: "Operations Manager",
    org: "Smashed Burgers & Co",
    period: "2026—",
    note: "Running kitchens taught me more about systems design than any Figma file.",
  },
  {
    label: "BEFORE",
    role: "Freelance designer & vibe coder",
    org: "shiftd.design",
    period: "2023—", // TODO: confirm start year
  },
];
