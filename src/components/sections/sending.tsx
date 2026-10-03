"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sending } from "@/content/site";
import { useDragScroll } from "@/lib/use-drag-scroll";
import { PhoneFrame, Screenshot } from "@/components/phone-frame";
import { Reveal } from "@/components/reveal";

/** Sending money as a gallery of four cards, moved by swipe or the arrows. */
export function Sending() {
  const row = useRef<HTMLOListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  useDragScroll(row);

  function measure() {
    const el = row.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft < 8,
      end: el.scrollLeft > el.scrollWidth - el.clientWidth - 8,
    });
  }

  useEffect(() => {
    measure();
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, []);

  function move(direction: 1 | -1) {
    const el = row.current;
    const card = el?.children[0] as HTMLElement | undefined;
    if (!el || !card) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * (card.offsetWidth + 20),
      behavior: reduce ? "auto" : "smooth",
    });
  }

  const arrows = [
    {
      label: "Previous step",
      direction: -1 as const,
      Icon: ChevronLeft,
      disabled: edge.start,
    },
    {
      label: "Next step",
      direction: 1 as const,
      Icon: ChevronRight,
      disabled: edge.end,
    },
  ];

  return (
    <section id="send" className="py-24 sm:py-36">
      <Reveal className="shell text-center">
        <h2 data-reveal className="h-section mx-auto max-w-[46rem]">
          {sending.title}
        </h2>
        <p data-reveal className="lede mx-auto mt-6 max-w-[36rem]">
          {sending.body}
        </p>
      </Reveal>

      <Reveal from="side">
        <ol ref={row} onScroll={measure} className="gallery mt-12 sm:mt-16">
          {sending.steps.map((step, i) => (
            <li
              key={step.src}
              data-reveal
              className="flex h-[32rem] w-[min(82vw,23rem)] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] inset-card sm:h-[36rem] sm:w-[25rem] sm:rounded-[2rem]"
            >
              <div className="p-7 pb-0 sm:p-9 sm:pb-0">
                <p className="grid size-9 place-items-center rounded-full bg-primary font-mono text-base font-bold text-primary-foreground">
                  {i + 1}
                </p>
                <h3 className="mt-5 text-[1.75rem] leading-tight font-bold tracking-tight sm:text-[2rem]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
              <div
                className="rise mx-auto mt-8 w-[68%] shrink-0"
                style={{ "--i": i } as CSSProperties}
              >
                <PhoneFrame className="shadow-[0_30px_60px_-24px_rgb(0_0_0/0.45)]">
                  <Screenshot src={step.src} alt={step.alt} />
                </PhoneFrame>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="shell mt-6 flex justify-end gap-3">
        {arrows.map(({ label, direction, Icon, disabled }) => (
          <motion.button
            key={label}
            type="button"
            aria-label={label}
            disabled={disabled}
            onClick={() => move(direction)}
            whileTap={disabled ? undefined : { scale: 0.92 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="grid size-11 place-items-center rounded-full bg-secondary text-foreground outline-none transition-opacity hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-35"
          >
            <Icon className="size-5" aria-hidden />
          </motion.button>
        ))}
      </div>
    </section>
  );
}
