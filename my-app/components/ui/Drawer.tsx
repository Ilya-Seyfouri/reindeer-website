"use client";

import { useEffect, useRef } from "react";
import { CloseIcon } from "@/components/ui/icons";

/**
 * Slide-in panel built on the native <dialog>, so focus trapping,
 * the Escape key and screen-reader semantics come for free.
 */
export function Drawer({
  open,
  onClose,
  side = "right",
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = `drawer-title-${side}`;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        // A click on the dimmed backdrop lands on the <dialog> itself.
        if (event.target === event.currentTarget) onClose();
      }}
      className={`drawer z-(--z-drawer) ${side === "left" ? "drawer-left" : ""}`}
    >
      <div className="flex h-full flex-col">
        <div
          className="flex items-center justify-between gap-4 border-b border-line py-3"
          style={{
            paddingLeft: side === "left" ? "var(--safe-left)" : "var(--drawer-pad)",
            paddingRight: side === "right" ? "max(var(--drawer-pad), env(safe-area-inset-right))" : "var(--drawer-pad)",
            paddingTop: "max(0.75rem, env(safe-area-inset-top))",
          }}
        >
          <h2 id={titleId} className="font-display text-[1.625rem]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 grid size-12 place-items-center rounded-full text-ink transition-colors hover:bg-fawn-soft"
            aria-label="Close"
          >
            <CloseIcon size={26} />
          </button>
        </div>
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
          style={{
            paddingLeft: side === "left" ? "var(--safe-left)" : "var(--drawer-pad)",
            paddingRight: side === "right" ? "max(var(--drawer-pad), env(safe-area-inset-right))" : "var(--drawer-pad)",
          }}
        >
          {children}
        </div>
        {footer ? (
          <div
            className="border-t border-line bg-white pt-4"
            style={{
              paddingLeft: side === "left" ? "var(--safe-left)" : "var(--drawer-pad)",
              paddingRight: side === "right" ? "max(var(--drawer-pad), env(safe-area-inset-right))" : "var(--drawer-pad)",
              paddingBottom: "max(1rem, var(--safe-bottom))",
            }}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
