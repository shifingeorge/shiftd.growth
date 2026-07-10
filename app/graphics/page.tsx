import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { GlobeGallery } from "@/components/globe/GlobeGallery";

export const metadata: Metadata = {
  title: "graphics — shiftd.design",
  description:
    "A wall of graphic-design work, bent into a sphere. Drag to spin, click to zoom.",
};

export default function GraphicsPage() {
  return (
    <>
      <Header />
      <GlobeGallery />
    </>
  );
}
