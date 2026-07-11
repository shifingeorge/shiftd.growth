"use client";

import { useState } from "react";
import { contact, site } from "@/lib/content";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-5 pb-[clamp(6rem,15vh,10rem)] sm:px-8 lg:px-16"
    >
      <p className="meta font-mono text-[0.72rem] uppercase tracking-[0.08em]">
        [ contact ]
      </p>

      <h2 className="font-display mt-4 max-w-3xl text-[clamp(1.3rem,3vw,1.9rem)] font-bold leading-[1.15] tracking-tight">
        {contact.headline}
      </h2>

      <button
        type="button"
        onClick={copyEmail}
        className="font-display mt-4 inline-flex items-center gap-3 text-[clamp(1.1rem,2.2vw,1.6rem)] font-bold tracking-tight transition-colors duration-200 hover:text-[var(--hot)]"
      >
        {copied ? (
          <span className="font-mono text-[var(--hot)] text-[clamp(0.85rem,1.6vw,1.1rem)] uppercase tracking-[0.08em]">
            {contact.copied}
          </span>
        ) : (
          <>
            {contact.cta}
            <span aria-hidden className="transition-transform duration-300 ease-quint">
              →
            </span>
          </>
        )}
      </button>

      <p className="meta mt-1 font-mono text-[0.7rem] tracking-[0.04em]">
        or just{" "}
        <a
          href={`mailto:${site.email}`}
          className="underline decoration-transparent underline-offset-4 transition-colors hover:text-[var(--hot)] hover:decoration-[var(--hot)]"
        >
          {site.email}
        </a>
      </p>

      <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.08em]">
        {contact.socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className="relative inline-block py-1 transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--hot)] after:transition-transform after:duration-300 after:ease-quint hover:text-[var(--hot)] hover:after:scale-x-100"
            >
              {social.label}
            </a>
          </li>
        ))}
      </ul>

      <p className="meta mt-10 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.08em]">
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
        {site.availability}
      </p>
    </section>
  );
}
