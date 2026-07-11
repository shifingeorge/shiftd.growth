"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/projects";

/** Thumbnail that trails the cursor while a row is hovered. Desktop, motion-allowed only. */
function ImagePeek({ project }: { project: Project | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX + 24, y: e.clientY - 100 };
    };
    window.addEventListener("pointermove", onMove);

    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
    >
      <div
        className={`h-[200px] w-[320px] overflow-hidden bg-ink/5 transition-opacity duration-300 ${
          project?.thumb ? "opacity-100" : "opacity-0"
        }`}
      >
        {project?.thumb && (
          <Image
            src={project.thumb}
            alt=""
            width={320}
            height={200}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

function WorkRow({
  project,
  ...handlers
}: { project: Project } & React.ComponentProps<"li">) {
  return (
    <li className="rule border-t last:border-b" {...handlers}>
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer noopener"
        className={`group relative flex flex-col gap-1 overflow-hidden px-2 pt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:pt-8 ${
          project.caseStudy ? "pb-3 sm:pb-4" : "pb-6 sm:pb-8"
        }`}
      >
        {/* The flood: wipes in from the left, out to the right. */}
        <span
          aria-hidden
          className="absolute inset-0 origin-left scale-x-0 bg-[var(--flood)] transition-transform duration-[350ms] ease-quint group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100"
        />

        <span className="relative font-display text-[clamp(1.4rem,3vw,2.2rem)] font-bold leading-tight tracking-tight transition-colors duration-200 group-hover:text-[var(--flood-text)] group-focus-visible:text-[var(--flood-text)]">
          {project.title}
        </span>

        <span className="relative flex items-baseline gap-4 font-mono text-[0.72rem] uppercase tracking-[0.08em] sm:gap-10">
          <span className="meta transition-colors duration-200 group-hover:text-[var(--flood-text)]/80 group-focus-visible:text-[var(--flood-text)]/80">
            {project.type}
          </span>
          <span className="meta tabular-nums transition-colors duration-200 group-hover:text-[var(--flood-text)]/80 group-focus-visible:text-[var(--flood-text)]/80">
            {project.year}
          </span>
          <span className="inline-block transition-all duration-300 ease-quint group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--flood-text)] group-focus-visible:text-[var(--flood-text)]">
            ↗
          </span>
        </span>
      </a>

      {project.caseStudy && (
        <p className="meta px-2 pb-6 font-mono text-[0.7rem] tracking-[0.04em] sm:pb-7">
          case study ·{" "}
          <a
            href={project.caseStudy.href}
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-transparent underline-offset-4 transition-colors hover:text-[var(--hot)] hover:decoration-[var(--hot)]"
          >
            {project.caseStudy.label} ↗
          </a>
        </p>
      )}
    </li>
  );
}

export function WorkIndex() {
  const [active, setActive] = useState<Project | null>(null);
  const [peekable, setPeekable] = useState(false);

  useEffect(() => {
    setPeekable(
      window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const bind = useCallback(
    (project: Project) => ({
      onPointerEnter: () => setActive(project),
      onPointerLeave: () => setActive((cur) => (cur === project ? null : cur)),
    }),
    []
  );

  return (
    <section
      id="work"
      className="mx-auto max-w-6xl px-5 py-[clamp(6rem,15vh,10rem)] sm:px-8 lg:px-16"
    >
      <h2 className="meta mb-2 font-mono text-[0.72rem] uppercase tracking-[0.08em]">
        Selected work [{String(projects.length).padStart(2, "0")}]
      </h2>

      <ul>
        {projects.map((project) => (
          <WorkRow key={project.title} project={project} {...bind(project)} />
        ))}
      </ul>

      {peekable && <ImagePeek project={active} />}
    </section>
  );
}
