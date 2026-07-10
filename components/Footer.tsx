import { footer, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="overflow-hidden">
      <p className="meta text-center font-mono text-[0.72rem] uppercase tracking-[0.08em]">
        {footer.thanks}
      </p>

      <p className="meta mt-4 text-center font-mono text-[0.65rem] tracking-[0.04em]">
        {footer.colophon}
      </p>

      {/* Cropped by the viewport bottom on purpose — the reward for reaching the end. */}
      <div
        aria-label={site.wordmark}
        className="font-display mt-8 flex justify-center whitespace-nowrap text-[clamp(2rem,9vw,7.5rem)] font-bold leading-[0.85] tracking-tight"
        style={{ marginBottom: "-0.28em" }}
      >
        {site.wordmark.split("").map((char, i) => (
          <span
            key={`${char}-${i}`}
            aria-hidden
            className="inline-block transition-colors duration-[600ms] ease-quint hover:text-[var(--hot)] hover:duration-150"
          >
            {char}
          </span>
        ))}
      </div>
    </footer>
  );
}
