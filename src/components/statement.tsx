"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** A large statement whose words come into full colour as it is scrolled through. */
export function Statement({ text, className }: { text: string; className?: string }) {
  const root = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: root.current, start: "top 82%", end: "bottom 48%", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <p ref={root} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} data-word>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
