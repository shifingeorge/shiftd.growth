import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 sm:px-8 lg:px-16">
      <p className="meta font-mono text-[0.72rem] uppercase tracking-[0.08em]">[ 404 ]</p>
      <h1 className="font-display mt-6 max-w-3xl text-[clamp(1.4rem,3.6vw,2.6rem)] font-bold leading-[1.15] tracking-tight">
        this page is not organized. obsession failed.
      </h1>
      <Link
        href="/"
        className="mt-10 inline-flex w-fit items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] transition-colors hover:text-red"
      >
        ← back to order
      </Link>
    </main>
  );
}
