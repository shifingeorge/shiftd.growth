export type PlaygroundProject = {
  title: string;
  story: string; // one-liner, lowercase, personal voice
  href: string;
  tag: string; // mono label, e.g. "wedding gift", "3d experiment"
  status?: "live" | "building";
};

export const playground: PlaygroundProject[] = [
  {
    title: "kukku",
    href: "https://nizmakukku.vercel.app/",
    tag: "wedding gift",
    story: "built for my friend nizma's wedding — because a card felt lazy",
    status: "live",
  },
  {
    title: "ingsight",
    href: "https://ingsight.vercel.app/",
    tag: "petty tooling",
    story: "finds who i follow that doesn't follow back. safely. no login drama",
    status: "live",
  },
  {
    title: "code a tree",
    href: "https://codeatree.vercel.app/",
    tag: "3d experiment",
    story: "first ever three.js thing — top 5 at a tinkerhub competition",
    status: "live",
  },
  {
    title: "orbit",
    href: "https://orbit-tm.vercel.app/",
    tag: "trello, but mine",
    story: "started because i hated trello for no reason. still building",
    status: "building",
  },
];
