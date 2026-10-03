"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Check, Pause, Play } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { demo } from "@/content/site";
import { PhoneFrame } from "./phone-frame";

const hidden = "invisible opacity-0";
const tiles = [
  "bg-[#2E7D32] text-white",
  "bg-[#10251A] text-white",
  "bg-[#DDEEDC] text-[#10251A]",
];

/**
 * The hero's live demo: a phone that plays each flow the way the app does.
 * It dials the code, answers the network's menus and lands the result.
 * `children` is the hero copy, rendered on the server.
 */
export function UssdDemo({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const wantsPlay = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(-1);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const reduce = Boolean(ctx.conditions?.reduce);
          const balance = q("[data-balance]")[0];
          const card = q("[data-card]");
          const scrim = q("[data-scrim]");
          const dial = q("[data-dial]");
          const dialChars = q("[data-dial] [data-char]");
          const rings = q("[data-ring]");

          const amount = { v: demo.balance };
          const paint = () => {
            balance.textContent = amount.v.toFixed(2);
          };

          gsap.set(q("[data-scrim], [data-dial], [data-pop], [data-result], [data-busy], [data-hl], [data-char], [data-ring]"), { autoAlpha: 0 });
          gsap.set(q("[data-pop]"), { y: 14, scale: 0.96 });
          gsap.set(q("[data-result]"), { y: 30, scale: 0.94 });
          gsap.set(dial, { scale: 0.8 });

          const starts: number[] = [];
          let current = -1;
          const tl = gsap.timeline({
            paused: true,
            repeat: -1,
            onUpdate: () => {
              const t = tl.time();
              const i = starts.findLastIndex((s) => t >= s);
              if (i !== current) setActive((current = i));
            },
          });

          demo.flows.forEach((flow, f) => {
            const outcome = q(`[data-outcome="${f}"]`);
            const busy = q(`[data-busy="${f}"]`);
            const tile = q(`[data-tile="${f}"]`);
            const menu = q(`[data-pop="menu-${f}"]`);
            const pin = q(`[data-pop="pin-${f}"]`);
            const result = q(`[data-result="${f}"]`);
            const checking = flow.id === "balance";
            const press = (target: Element[], at: string) =>
              tl.to(target, { scale: 0.9, duration: 0.1 }, at).to(target, { scale: 1, duration: 0.2 });

            starts.push(tl.duration());
            tl.addLabel(`flow${f}`);

            // Set the scene: each flow starts from its own balance.
            tl.to(card, { autoAlpha: checking ? 0.45 : 0, duration: 0.15 })
              .to(amount, { v: checking ? demo.balance : flow.from, duration: 0.01, onUpdate: paint })
              .to(outcome, { autoAlpha: 0, y: -6, duration: 0.2 }, "<")
              .to(busy, { autoAlpha: 1, duration: 0.2 }, "<");
            if (!checking) tl.to(card, { autoAlpha: 1, duration: 0.2 });

            // Tap the flow, then dial.
            tl.to(tile, { scale: 0.93, duration: 0.12 }, "+=0.35")
              .to(tile, { scale: 1, duration: 0.3, ease: "power3.out" })
              .to(scrim, { autoAlpha: 1, duration: 0.25 })
              .to(dial, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out" }, "<")
              .to(dialChars, { autoAlpha: 1, duration: 0.01, stagger: 0.09 })
              .fromTo(
                rings,
                { scale: 1, autoAlpha: 0.6 },
                { scale: 2.3, autoAlpha: 0, duration: 1, stagger: 0.2, ease: "power1.out", immediateRender: false },
                "<0.1",
              )
              .to(dial, { autoAlpha: 0, scale: 0.9, duration: 0.2 })
              .set(dialChars, { autoAlpha: 0 });

            // The network's menu: pick the option and send.
            tl.to(menu, { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }).to(
              q(`[data-pop="menu-${f}"] [data-hl]`),
              { autoAlpha: 1, duration: 0.2 },
              "+=0.5",
            );
            press(q(`[data-pop="menu-${f}"] [data-send]`), "+=0.35");
            tl.to(menu, { autoAlpha: 0, y: 14, scale: 0.96, duration: 0.2 });

            // The PIN prompt. Only dots are ever shown.
            tl.to(pin, { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }).to(
              q(`[data-pop="pin-${f}"] [data-char]`),
              { autoAlpha: 1, duration: 0.01, stagger: 0.14 },
              "+=0.4",
            );
            press(q(`[data-pop="pin-${f}"] [data-send]`), "+=0.3");
            tl.to(pin, { autoAlpha: 0, y: 14, scale: 0.96, duration: 0.2 });

            // The result lands, in the phone and on the pill.
            tl.to(scrim, { autoAlpha: 0, duration: 0.25 }).to(
              result,
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" },
              "<",
            );
            if (checking) {
              tl.to(amount, { v: 0, duration: 0.01, onUpdate: paint }, "<").to(card, { autoAlpha: 1, duration: 0.2 }, "<");
            }
            tl.to(amount, { v: demo.balance, duration: 0.9, ease: "power2.out", onUpdate: paint }, "<0.1")
              .to(busy, { autoAlpha: 0, duration: 0.15 }, "<")
              .to(outcome, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" }, "<0.1")
              .to({}, { duration: 1.7 })
              .to(result, { autoAlpha: 0, y: 30, scale: 0.94, duration: 0.3, ease: "power2.in" });
          });

          timeline.current = tl;
          wantsPlay.current = !reduce;
          let started = reduce;
          let visible = true;

          // Don't run where nobody is looking.
          const trigger = ScrollTrigger.create({
            trigger: q("[data-phone]")[0],
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              visible = self.isActive;
              if (visible && started && wantsPlay.current) tl.play();
              else tl.pause();
            },
          });
          visible = trigger.isActive;

          // The phone rises further out of the hero as the page scrolls.
          if (!reduce) {
            gsap.to(q("[data-rise]"), {
              y: -70,
              ease: "none",
              scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
            });
          }

          if (reduce) {
            setPlaying(false);
          } else {
            setPlaying(true);
            gsap
              .timeline({
                onComplete: () => {
                  started = true;
                  if (visible && wantsPlay.current) tl.play();
                },
              })
              .fromTo(q("[data-strike]"), { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.out" }, 0.15)
              .fromTo(
                q("[data-enter]"),
                { y: 24 },
                { y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
                0.3,
              );
          }

          return () => {
            timeline.current = null;
          };
        },
      );
    },
    { scope: root },
  );

  function toggle() {
    const tl = timeline.current;
    if (!tl) return;
    wantsPlay.current = !wantsPlay.current;
    setPlaying(wantsPlay.current);
    if (wantsPlay.current) tl.play();
    else tl.pause();
  }

  function playFlow(index: number) {
    const tl = timeline.current;
    if (!tl) return;
    wantsPlay.current = true;
    setPlaying(true);
    tl.play(`flow${index}`);
  }

  return (
    <div ref={root} className="shell flex flex-col items-center pt-14 sm:pt-16">
      {children}

      <div data-enter className="mt-10 flex w-full flex-col items-center sm:mt-12">
        <div className="flex w-full max-w-[34rem] flex-col items-stretch gap-2 sm:flex-row">
          <ul className="grid flex-1 rounded-[1.125rem] bg-secondary p-1 sm:grid-cols-3">
            {demo.flows.map((flow, i) => (
              <li key={flow.id}>
                <button
                  type="button"
                  onClick={() => playFlow(i)}
                  className="relative z-0 flex size-full min-h-12 items-center justify-between gap-4 rounded-[0.875rem] px-4 py-2 outline-none transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] sm:flex-col sm:justify-center sm:gap-0.5 sm:px-2 sm:text-center"
                >
                  {active === i && (
                    <motion.span
                      layoutId="flow-thumb"
                      aria-hidden
                      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                      className="absolute inset-0 -z-10 rounded-[0.875rem] bg-thumb shadow-[0_1px_4px_rgb(0_0_0/0.14),0_0_0_0.5px_rgb(0_0_0/0.04)]"
                    />
                  )}
                  <span className="text-base font-medium">
                    {flow.label}
                    <span className="sr-only">: play this demo. Result:</span>
                  </span>
                  <span
                    className={cn(
                      "relative block shrink-0 text-right font-mono text-sm sm:w-full sm:text-center",
                      active === i ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <span data-outcome={i} className="inline-block">
                      {flow.outcome}
                    </span>
                    <span data-busy={i} aria-hidden className={cn("absolute top-0 right-0 whitespace-nowrap sm:left-0", hidden)}>
                      Dialling…
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause demo" : "Play demo"}
            className="press flex h-11 shrink-0 items-center justify-center gap-2 self-center rounded-full bg-secondary px-5 text-sm font-medium outline-none hover:bg-border focus-visible:ring-2 focus-visible:ring-ring sm:h-auto sm:w-14 sm:self-stretch sm:rounded-[1.125rem] sm:px-0"
          >
            {playing ? <Pause className="size-5" aria-hidden /> : <Play className="size-5" aria-hidden />}
            <span className="sm:hidden">{playing ? "Pause demo" : "Play demo"}</span>
          </button>
        </div>

        <p className="sr-only">
          An animated demo of the app. You tap a flow, FayaPay dials {demo.code}, picks the option in your network&apos;s
          USSD menu, enters your PIN where the menu asks for it, and shows the result: money sent, airtime bought, or
          your balance.
        </p>
        {/* The phone rises out of the bottom of the hero. */}
        <div data-rise className="mt-8 h-[min(31rem,118vw)] sm:mt-10 sm:h-[34rem]">
        <PhoneFrame className="@container w-[min(19rem,78vw)] sm:w-[21rem]">
          <div data-phone aria-hidden className="absolute inset-0 text-[3.7cqw] leading-tight text-[#10251A] select-none">
            {/* The app's home screen */}
            <div className="flex h-full flex-col gap-[1.1em] p-[1.4em] pt-[2.2em]">
              <p className="flex items-center gap-[0.35em] text-[1.75em] font-bold tracking-tight text-[#2E7D32]">
                <span className="flame h-[1em]" />
                FayaPay
              </p>
              <div data-card className="rounded-[1.5em] bg-white p-[1.3em]">
                <p className="flex items-center gap-[0.6em] text-[1.05em] font-medium">
                  <span className="rounded-[0.4em] bg-[#FBCC0D] px-[0.5em] py-[0.2em] text-[0.8em] font-bold">MTN</span>
                  {demo.account}
                </p>
                <p className="mt-[0.7em] flex items-baseline gap-[0.4em] font-bold">
                  <span className="font-mono text-[1.1em]">GHS</span>
                  <span data-balance className="text-[3.1em] leading-none tracking-tight tabular-nums">
                    {demo.balance.toFixed(2)}
                  </span>
                </p>
                <p className="mt-[0.9em] text-[0.95em] text-[#4E6354]">From SMS</p>
              </div>
              <div className="grid grid-cols-2 gap-[0.8em]">
                {demo.flows.map((flow, i) => (
                  <div
                    key={flow.id}
                    data-tile={i}
                    className={cn("flex h-[6.4em] flex-col justify-between rounded-[1.3em] p-[1em]", tiles[i])}
                  >
                    <span className="text-[1.15em] font-bold">{flow.label}</span>
                    <span className="font-mono text-[0.95em] opacity-80">{demo.code}</span>
                  </div>
                ))}
                <div className="flex h-[6.4em] flex-col justify-between rounded-[1.3em] border border-dashed border-[#A9C2A7] p-[1em] text-[#4E6354]">
                  <span className="text-[1.15em] font-bold">All flows</span>
                  <span className="text-[0.9em]">+ add a shortcut</span>
                </div>
              </div>
              <div>
                <p className="text-[1.15em] font-medium">Recent</p>
                <ul className="mt-[0.6em] divide-y divide-[#DCE6D9] rounded-[1.3em] bg-white px-[1.1em]">
                  {demo.recent.map((row) => (
                    <li key={row.name} className="flex items-center gap-[0.9em] py-[0.85em]">
                      <span className="grid size-[2.6em] place-items-center rounded-full bg-[#DDEEDC] text-[0.85em] font-medium">
                        {row.initials}
                      </span>
                      <span className="flex-1">
                        <span className="block font-medium">{row.name}</span>
                        <span className="block text-[0.9em] text-[#4E6354]">{row.when}</span>
                      </span>
                      <span
                        className={cn(
                          "font-mono font-bold",
                          row.amount.startsWith("+") ? "text-[#1E6B32]" : "text-[#B3261E]",
                        )}
                      >
                        {row.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div data-scrim className={cn("absolute inset-0 bg-[#10251A]/55", hidden)} />

            {/* Dialling */}
            <div data-dial className={cn("absolute inset-x-0 top-[34%] grid place-items-center", hidden)}>
              <span className="relative grid size-[11em] place-items-center rounded-full bg-[#DDEEDC] ring-[0.18em] ring-[#2E7D32]">
                {[0, 1, 2].map((ring) => (
                  <span key={ring} data-ring className="absolute inset-0 rounded-full border-[0.15em] border-[#A5D6A7]" />
                ))}
                <span className="font-mono text-[2.1em] font-bold text-[#2E7D32]">
                  {[...demo.code].map((char, i) => (
                    <span key={i} data-char>
                      {char}
                    </span>
                  ))}
                </span>
              </span>
            </div>

            {/* The network's USSD pop-ups */}
            {demo.flows.map((flow, f) => (
              <div key={flow.id}>
                <Popup name={`menu-${f}`}>
                  <ul className="font-mono text-[1.25em] leading-[1.75]">
                    {demo.menu.map((item, i) => (
                      <li key={item} className="relative px-[0.5em]">
                        {i + 1 === flow.pick && (
                          <span data-hl className={cn("absolute inset-0 rounded-[0.5em] bg-[#DDEEDC]", hidden)} />
                        )}
                        <span className="relative">
                          {i + 1} {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Popup>
                <Popup name={`pin-${f}`}>
                  <p className="px-[0.5em] font-mono text-[1.2em] leading-[1.5]">{flow.prompt}</p>
                  <p className="mx-[0.5em] mt-[0.9em] flex h-[2.2em] items-center gap-[0.55em] border-b-[0.15em] border-[#2E7D32] text-[1.25em]">
                    {[0, 1, 2, 3].map((dot) => (
                      <span key={dot} data-char className="size-[0.6em] rounded-full bg-[#10251A]" />
                    ))}
                  </p>
                </Popup>
                <div
                  data-result={f}
                  className={cn(
                    "absolute inset-x-[6%] top-[52%] flex items-center gap-[1em] rounded-[1.6em] bg-white p-[1.3em] shadow-[0_1.5em_4em_rgb(16_37_26/0.3)]",
                    hidden,
                  )}
                >
                  <span className="grid size-[3.2em] shrink-0 place-items-center rounded-full bg-[#2E7D32] text-white">
                    <Check className="size-[1.7em]" strokeWidth={3} />
                  </span>
                  <span>
                    <span className="block text-[1.35em] font-bold">{flow.result.title}</span>
                    <span className="block font-mono text-[1.1em] text-[#4E6354]">{flow.result.detail}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </PhoneFrame>
        </div>
      </div>
    </div>
  );
}

function Popup({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div
      data-pop={name}
      className={cn(
        "absolute inset-x-[9%] top-[26%] rounded-[1.6em] bg-white p-[1.2em] shadow-[0_1.5em_4em_rgb(16_37_26/0.35)]",
        hidden,
      )}
    >
      {children}
      <p className="mt-[1.2em] flex items-center justify-end gap-[1.4em] text-[1.1em] font-bold text-[#2E7D32]">
        <span>Cancel</span>
        <span data-send className="rounded-full bg-[#2E7D32] px-[1.2em] py-[0.55em] text-white">
          Send
        </span>
      </p>
    </div>
  );
}
