export type Project = {
  title: string;
  type: string;
  year: string;
  href: string;
  caseStudy?: { label: string; href: string };
  thumb?: string; // TODO: add /public/work/*.webp thumbnails when supplied
};

export const projects: Project[] = [
  {
    title: "Restorepoint",
    type: "Web design",
    year: "2025",
    href: "https://shifiyy-archive2.vercel.app/",
    caseStudy: { label: "Notion", href: "https://shifiyy-archive2.vercel.app/" },
    // thumb: "/work/xxx.webp", // TODO: add thumbnail
  },
  {
    title: "Luna Bloom",
    type: "Web design",
    year: "2025",
    href: "https://shifiyy-archive2.vercel.app/",
    caseStudy: { label: "Notion", href: "https://shifiyy-archive2.vercel.app/" },
    // thumb: "/work/xxx.webp", // TODO: add thumbnail
  },
  {
    title: "Dresso",
    type: "UI/UX case study",
    year: "2024",
    href: "https://shifiyy-archive2.vercel.app/",
    caseStudy: { label: "Medium", href: "https://shifiyy-archive2.vercel.app/" },
    // thumb: "/work/xxx.webp", // TODO: add thumbnail
  },
  {
    title: "NT Digital",
    type: "Web design",
    year: "2024",
    href: "https://shifiyy-archive2.vercel.app/",
    // thumb: "/work/xxx.webp", // TODO: add thumbnail
  },
];
