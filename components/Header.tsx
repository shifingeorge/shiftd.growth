"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { useObsessionMode } from "./EasterEggs";

function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: site.timezone,
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function Header() {
  const time = useLocalTime();
  const [scrolled, setScrolled] = useState(false);
  const registerWordmarkClick = useObsessionMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "rule bg-paper/80 backdrop-blur-md" : "border-transparent"
      }`}
      style={scrolled ? undefined : { background: "transparent" }}
    >
      <div className="mx-auto flex max-w-6xl items-baseline justify-between px-5 py-4 sm:px-8 lg:px-16">
        <button
          type="button"
          onClick={() => {
            registerWordmarkClick();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-display text-[1.05rem] font-bold tracking-tight transition-colors duration-200 hover:text-[var(--hot)]"
        >
          {site.wordmark}
        </button>

        <div className="flex items-baseline gap-5 font-mono text-[0.7rem] uppercase tracking-[0.08em]">
          <span className="meta hidden sm:inline tabular-nums">
            [{time ?? "--:--"} IST — {site.location}]
          </span>
          <Link
            href="/graphics"
            className="transition-colors duration-200 hover:text-[var(--hot)]"
          >
            graphics ↗
          </Link>
          <a
            href="#contact"
            className="transition-colors duration-200 hover:text-[var(--hot)]"
          >
            contact
          </a>
        </div>
      </div>
    </header>
  );
}
