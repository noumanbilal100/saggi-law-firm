import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[720px] flex-col items-start gap-6 px-6 py-32">
      <span className="inline-flex items-center gap-2.5 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-rust">
        <span className="inline-block h-px w-6 bg-rust" />
        404
      </span>
      <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1]">
        Page not found.
      </h1>
      <p className="text-[1.05rem] leading-[1.7] text-muted">
        The page you are looking for is not available. It may have moved, or the link may be incorrect. Return to the home page and continue from there.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-rust px-6 py-3 font-body text-[1.02rem] font-bold text-white shadow-[0_4px_14px_rgba(173,82,7,0.28)] transition-all hover:-translate-y-px hover:bg-rust-hover"
        >
          Return home →
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-rule bg-transparent px-6 py-3 font-body text-[1.02rem] font-bold text-ink transition-all hover:-translate-y-px hover:border-rust hover:text-rust"
        >
          Browse services
        </Link>
      </div>
    </section>
  );
}
