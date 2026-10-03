import { cn } from "@/lib/utils";
import { coverage, networks, type Network } from "@/content/site";
import type { CSSProperties } from "react";
import { DrawCheck } from "@/components/draw-check";
import { Reveal } from "@/components/reveal";
import { Statement } from "@/components/statement";

// Each network's own colour, as text chips. No official logos.
const chip: Record<Network["id"], string> = {
  mtn: "bg-[#FBCC0D] text-[#10251A]",
  telecel: "bg-[#E32527] text-white",
  at: "bg-[#223D76] text-white",
};
// The same colour as a soft wash in the corner of each network's card.
const wash: Record<Network["id"], string> = { mtn: "#FBCC0D", telecel: "#E32527", at: "#3D63B8" };

export function Coverage() {
  return (
    <section className="py-24 sm:py-36">
      <div className="shell">
        <Reveal>
          <h2 data-reveal className="h-section mx-auto max-w-[52rem] text-center">
            {coverage.title}
          </h2>
        </Reveal>
        <Statement
          text={coverage.body}
          className="mx-auto mt-10 max-w-[46rem] text-center text-[clamp(1.5rem,3.6vw,2.5rem)] leading-[1.2] font-medium tracking-[-0.02em] sm:mt-14"
        />

        <Reveal className="mt-16 grid gap-4 sm:mt-24 sm:grid-cols-3 sm:gap-5">
          {networks.map((network, i) => (
            <div
              key={network.id}
              data-reveal
              className="tile inset-card relative flex items-center gap-4 overflow-hidden sm:flex-col sm:items-start sm:gap-14"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-1/3 -right-1/4 size-64 rounded-full opacity-25 blur-3xl dark:opacity-30"
                style={{ background: wash[network.id] }}
              />
              <span
                aria-hidden
                style={{ "--i": i } as CSSProperties}
                className={cn(
                  "pop relative inline-grid h-12 min-w-16 place-items-center rounded-2xl px-3 text-base font-bold shadow-[0_6px_16px_-6px_rgb(0_0_0/0.3)] sm:h-14 sm:min-w-20 sm:text-lg",
                  chip[network.id],
                )}
              >
                {network.chip}
              </span>
              <span className="relative text-2xl font-bold tracking-tight sm:text-[1.75rem]">{network.name}</span>
            </div>
          ))}

          <div data-reveal className="tile inset-card sm:col-span-3">
            <p className="text-lg text-muted-foreground">On every network</p>
            <ul className="mt-6 grid gap-y-5 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-0 lg:divide-x">
              {coverage.capabilities.map((capability, i) => (
                <li key={capability} className="flex gap-3 text-lg leading-snug font-medium lg:flex-col lg:px-7 lg:text-xl lg:first:pl-0 lg:last:pr-0">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                    <DrawCheck index={i} className="size-5" />
                  </span>
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <p className="lede mx-auto mt-10 max-w-[36rem] text-center">{coverage.note}</p>
      </div>
    </section>
  );
}
