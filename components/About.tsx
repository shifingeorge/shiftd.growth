import { about } from "@/lib/content";
import { experience } from "@/lib/experience";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-5 pb-[clamp(6rem,15vh,10rem)] sm:px-8 lg:px-16"
    >
      <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-16">
        <h2 className="meta font-mono text-[0.72rem] uppercase tracking-[0.08em] lg:pt-2">
          About
        </h2>

        <div>
          <p className="max-w-[34rem] text-base leading-relaxed">{about.bio}</p>

          <ul className="mt-14">
            {experience.map((role) => (
              <li key={role.org} className="rule border-t last:border-b">
                <div className="group relative overflow-hidden px-2 py-5">
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-[var(--flood)] transition-transform duration-[350ms] ease-quint group-hover:scale-x-100"
                  />
                  <div className="relative flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5">
                      <span className="meta w-16 shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.08em] transition-colors duration-200 group-hover:text-[var(--flood-text)]/70">
                        {role.label}
                      </span>
                      <span className="font-display text-lg font-bold tracking-tight transition-colors duration-200 group-hover:text-[var(--flood-text)] sm:text-xl">
                        {role.role}
                        <span className="meta font-sans text-base font-normal transition-colors duration-200 group-hover:text-[var(--flood-text)]/80">
                          {" "}
                          — {role.org}
                        </span>
                      </span>
                    </div>
                    <span className="meta shrink-0 font-mono text-[0.7rem] tabular-nums tracking-[0.08em] transition-colors duration-200 group-hover:text-[var(--flood-text)]/70">
                      {role.period}
                    </span>
                  </div>

                  {role.note && (
                    <p className="meta relative mt-2 max-w-[34rem] pl-0 text-sm leading-relaxed transition-colors duration-200 group-hover:text-[var(--flood-text)]/80 sm:pl-[5.25rem]">
                      {role.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-14 flex flex-wrap gap-x-1 font-mono text-[0.72rem] uppercase tracking-[0.08em]">
            {about.toolkit.map((tool, i) => (
              <span key={tool}>
                <span className="meta cursor-default transition-colors duration-200 hover:text-[var(--hot)]">
                  {tool}
                </span>
                {i < about.toolkit.length - 1 && <span className="meta">,</span>}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
