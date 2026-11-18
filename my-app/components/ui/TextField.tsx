/** Labelled text input with an inline error message. */
export function TextField({
  name,
  label,
  type = "text",
  autoComplete,
  placeholder,
  optional,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  optional?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-lg font-bold">
        {label}
        {optional ? <span className="font-normal text-ink-soft"> (optional)</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={type === "email" ? "email" : undefined}
        className="field mt-2"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error ? (
        <p id={`${name}-error`} className="mt-2 font-bold text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
