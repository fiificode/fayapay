"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, stagger, useInView } from "motion/react";

const offsets = { up: "translate(0px, 16px)", side: "translate(48px, 0px)" } as const;

/**
 * Staggers its [data-reveal] children in, once, when scrolled into view. It
 * also sets data-inview on itself ("false" while waiting, then "true"), which
 * the CSS in globals.css uses for the smaller in-view details.
 *
 * Content is only hidden if it starts below the fold and motion is allowed,
 * so nothing depends on JavaScript to be visible.
 */
export function Reveal({
  children,
  className,
  from = "up",
}: {
  children: ReactNode;
  className?: string;
  from?: keyof typeof offsets;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const armed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < innerHeight * 0.85) return;
    armed.current = true;
    el.dataset.inview = "false";
    const items = el.querySelectorAll("[data-reveal]");
    if (items.length) animate(items, { opacity: 0, transform: offsets[from] }, { duration: 0 });
  }, [from]);

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el || !armed.current) return;
    el.dataset.inview = "true";
    const items = el.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    animate(
      items,
      { opacity: 1, transform: "translate(0px, 0px)" },
      { duration: 0.6, delay: stagger(0.06), ease: [0.23, 1, 0.32, 1] },
    );
  }, [inView]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
