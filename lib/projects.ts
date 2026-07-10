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
    href: "https://www.restorepoint.co.in/",
    caseStudy: {
      label: "Notion",
      href: "https://cedar-ninja-e62.notion.site/Restore-point-2a4dd300afb380f68986eec2debc61af",
    },
  },
  {
    title: "Luna Bloom",
    type: "Web design",
    year: "2025",
    href: "https://lunabloom.in/",
  },
  {
    title: "Dresso",
    type: "UI/UX case study",
    year: "2024",
    href: "https://www.figma.com/community/file/1511432111707648819/dresso-e-commerce",
    caseStudy: {
      label: "Medium",
      href: "https://medium.com/@shif.td/dresso-ai-powered-fashion-companion-7cc2dca86a54",
    },
  },
  {
    title: "NT Digital",
    type: "Web design",
    year: "2024",
    href: "https://www.ntdigital.in/",
  },
];
