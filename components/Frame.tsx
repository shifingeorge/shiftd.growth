/**
 * A thin fixed frame around the whole viewport, inspired by chandumachineni.com.
 * Reuses the `.rule` token so it inherits the obsession-mode color flip for
 * free — no separate CSS needed. Pointer-events are disabled so it never
 * intercepts clicks, which is why it can safely sit above the header.
 */
export function Frame() {
  return (
    <div
      aria-hidden
      className="rule pointer-events-none fixed inset-[6px] z-50 border sm:inset-2"
    />
  );
}
