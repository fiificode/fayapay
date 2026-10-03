"use client";

import { useRef } from "react";
import { useDragScroll } from "@/lib/use-drag-scroll";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { journey } from "@/content/site";
import { PhoneFrame, Screenshot } from "@/components/phone-frame";
import { Reveal } from "@/components/reveal";

/**
 * The showcase. On wide screens the stage holds still for the length of the
 * scroll while the phone's screen and the text change, scrubbed by the scroll
 * position. On small screens, with reduced motion, or without JavaScript, the
 * four steps are a row of cards to swipe through.
 */
export function Journey() {
  const root = useRef<HTMLElement>(null);
  const cards = useRef<HTMLOListElement>(null);
  useDragScroll(cards);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)",
        () => {
          section.dataset.enhanced = "true";

          const shots = q("[data-shot]");
          const texts = q("[data-text]");
          gsap.set(shots.slice(1), { autoAlpha: 0 });
          gsap.set(texts.slice(1), { autoAlpha: 0, y: 48 });

          const tl = gsap.timeline({
            defaults: { duration: 0.5, ease: "power2.inOut" },
            scrollTrigger: {
              trigger: q("[data-stage]")[0],
              start: "top top",
              end: () => `+=${innerHeight * 3}`,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          tl.from(
            q("[data-device]"),
            { scale: 1.12, y: 70, duration: 0.6, ease: "power2.out" },
            0,
          );
          for (let i = 1; i < shots.length; i++) {
            const at = i * 1.4;
            tl.to(texts[i - 1], { autoAlpha: 0, y: -48, duration: 0.3 }, at)
              .to(shots[i], { autoAlpha: 1, duration: 0.3 }, at + 0.1)
              .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.25);
          }
          tl.to({}, { duration: 0.9 });
          tl.fromTo(
            q("[data-progress]"),
            { scaleX: 0.04 },
            { scaleX: 1, ease: "none", duration: tl.duration() },
            0,
          );
          // The backdrop moves with the scroll: the dots drift up and the glow swells.
          tl.fromTo(
            q("[data-dots]"),
            { yPercent: 0 },
            { yPercent: -32, ease: "none", duration: tl.duration() },
            0,
          );
          tl.fromTo(
            q("[data-glow]"),
            { scale: 0.8, opacity: 0.6 },
            { scale: 1.2, opacity: 1, ease: "none", duration: tl.duration() },
            0,
          );

          // Screens and fonts load after this runs, and move everything below.
          const refresh = () => ScrollTrigger.refresh();
          addEventListener("load", refresh);
          document.fonts?.ready.then(refresh);

          return () => {
            removeEventListener("load", refresh);
            delete section.dataset.enhanced;
          };
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="how"
      className="group/journey bg-black text-on-deep"
    >
      <Reveal className="shell pt-24 pb-12 sm:pt-36 lg:group-data-[enhanced=true]/journey:pb-0">
        <h2 data-reveal className="h-section mx-auto max-w-[50rem] text-center">
          {journey.title}
        </h2>
      </Reveal>

      {/* The pinned stage */}
      <div
        data-stage
        className="hidden h-svh lg:group-data-[enhanced=true]/journey:block"
      >
        <div className="shell grid h-full grid-cols-[minmax(0,1fr)_auto] items-center gap-20 pt-12">
          <div>
            <div className="relative h-72">
              {journey.steps.map((step, i) => (
                <div
                  key={step.src}
                  data-text
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <p className="font-mono text-lg font-bold text-[#6FCF8A]">
                    {i + 1} of 4
                  </p>
                  <h3 className="mt-4 max-w-[30rem] text-[3.25rem] leading-[1.04] font-bold tracking-[-0.028em]">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-[28rem] text-xl leading-relaxed text-on-deep-muted">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
            <div
              aria-hidden
              className="mt-10 h-1 w-48 overflow-hidden rounded-full bg-white/15"
            >
              <div
                data-progress
                className="size-full origin-left rounded-full bg-[#6FCF8A]"
              />
            </div>
          </div>
          <div data-device aria-hidden className="relative isolate">
            {/*
              Behind the phone: a glow and a field of dots. Both are centred on
              the phone and fade out well before the text beside it.
            */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[min(44rem,60vw)] -translate-1/2">
              <div
                data-glow
                className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgb(111_207_138/0.5),transparent)]"
              />
              <div className="absolute inset-0 overflow-hidden rounded-full [mask-image:radial-gradient(closest-side,black_48%,transparent)]">
                <div
                  data-dots
                  className="absolute inset-x-0 top-0 h-[150%] bg-[radial-gradient(circle,rgb(255_255_255/0.75)_1px,transparent_1.5px)] bg-[length:1.5rem_1.5rem]"
                />
              </div>
            </div>
            <PhoneFrame className="h-[min(42rem,calc(100svh-8rem))] w-auto border-[#3a3a3c]">
              {journey.steps.map((step) => (
                <div key={step.src} data-shot className="absolute inset-0">
                  <Screenshot src={step.src} alt="" />
                </div>
              ))}
            </PhoneFrame>
          </div>
        </div>
      </div>

      {/* The same four steps as cards */}
      <Reveal
        from="side"
        className="lg:group-data-[enhanced=true]/journey:hidden"
      >
        <ol ref={cards} className="gallery pb-24 sm:pb-32">
          {journey.steps.map((step, i) => (
            <li
              key={step.src}
              data-reveal
              className="flex w-[min(82vw,22rem)] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] bg-[linear-gradient(#262629,#1d1d1f_60%)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.07),inset_0_1px_0_rgb(255_255_255/0.06)] lg:w-[calc((68rem-4rem-3.75rem)/4)]"
            >
              <div className="p-6 pb-0">
                <p className="font-mono text-sm font-bold text-[#6FCF8A]">
                  {i + 1} of 4
                </p>
                <h3 className="mt-2 text-2xl leading-tight font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-on-deep-muted">
                  {step.body}
                </p>
              </div>
              <PhoneFrame className="mx-auto mt-7 -mb-[55%] w-[72%] border-[#3a3a3c]">
                <Screenshot src={step.src} alt={step.alt} />
              </PhoneFrame>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
