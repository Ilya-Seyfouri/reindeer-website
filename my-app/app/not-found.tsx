import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap flex flex-col items-start gap-6 py-24 md:py-32">
      <h1 className="h-display max-w-[16ch]">We can&rsquo;t find that page</h1>
      <p className="lead max-w-[40ch] text-ink-soft">
        The link may be old or mistyped. The costume is right where we left it, though.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary btn-lg">
          Go to the shop
        </Link>
        <Link href="/contact" className="btn btn-secondary btn-lg">
          Contact us
        </Link>
      </div>
    </div>
  );
}
