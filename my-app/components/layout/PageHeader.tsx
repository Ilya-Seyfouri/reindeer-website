export function PageHeader({ title, intro }: { title: string; intro?: React.ReactNode }) {
  return (
    <div className="wrap pt-10 pb-8 md:pt-16 md:pb-10">
      <h1 className="enter h-display max-w-[18ch]">{title}</h1>
      {intro ? (
        <div className="enter lead mt-4 max-w-[46ch] text-ink-soft" style={{ "--i": 1 } as React.CSSProperties}>
          {intro}
        </div>
      ) : null}
    </div>
  );
}
