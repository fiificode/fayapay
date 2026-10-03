import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** A check mark that draws itself when its Reveal comes into view. */
export function DrawCheck({ index = 0, className }: { index?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("draw", className)}
      style={{ "--i": index } as CSSProperties}
    >
      <path pathLength={1} d="M4 12l5 5L20 6" />
    </svg>
  );
}
