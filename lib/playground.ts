export type PlaygroundProject = {
  title: string;
  story: string; // one-liner, lowercase, personal voice
  href: string;
  tag: string; // mono label, e.g. "wedding gift", "3d experiment"
  status?: "live" | "building";
};

export const playground: PlaygroundProject[] = [
  {
    title: "kukku weds nizma",
    href: "https://kwedsn.shiftd.in/",
    tag: "wedding gift",
    story: "built for my friend nizma's wedding — because a card felt lazy",
    status: "live",
  },
  {
    title: "ingsight",
    href: "https://ingsight.shiftd.in/",
    tag: "petty tooling",
    story: "finds who i follow that doesn't follow back. safely. no login drama",
    status: "live",
  },
  {
    title: "code a tree",
    href: "https://codeatree.shiftd.in/",
    tag: "3d experiment",
    story: "first ever three.js thing — top 5 at a tinkerhub competition",
    status: "live",
  },
  {
    title: "orbit",
    href: "https://orbit-tm.shiftd.in//",
    tag: "trello, but mine",
    story: "started because i hated trello for no reason. still building",
    status: "building",
  },
];
