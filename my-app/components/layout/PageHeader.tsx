export function PageHeader({
  title,
  intro,
  compact = false,
}: {
  title: string;
  intro?: React.ReactNode;
  /** Less space and a smaller title on phones, so a short page fits on one screen */
  compact?: boolean;
}) {
  return (
    <div className={`wrap md:pt-16 md:pb-10 ${compact ? "pt-6 pb-5" : "pt-10 pb-8"}`}>
      <h1 className={`enter h-display max-w-[18ch] ${compact ? "max-md:text-[2.375rem] max-md:leading-[1.05]" : ""}`}>{title}</h1>
      {intro ? (
        <div
          className={`enter lead max-w-[46ch] text-ink-soft ${compact ? "mt-3 max-md:text-[1.0625rem]" : "mt-4"}`}
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {intro}
        </div>
      ) : null}
    </div>
  );
}
