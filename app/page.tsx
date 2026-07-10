import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WorkIndex } from "@/components/WorkIndex";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CursorDot } from "@/components/CursorDot";
import { EasterEggs } from "@/components/EasterEggs";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:font-mono focus:text-xs"
      >
        skip to work
      </a>

      <Header />
      <main>
        <Hero />
        <WorkIndex />
        <About />
        <Contact />
      </main>
      <Footer />

      <CursorDot />
      <EasterEggs />
    </>
  );
}
