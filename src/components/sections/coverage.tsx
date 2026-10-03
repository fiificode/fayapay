import { cn } from "@/lib/utils";
import { coverage, networks, type Network } from "@/content/site";
import type { CSSProperties } from "react";
import Image from "next/image";
import { DrawCheck } from "@/components/draw-check";
import { Reveal } from "@/components/reveal";
import { Statement } from "@/components/statement";

// Each network as a SIM card in its own colour, with its logo from its own website.
const sim: Record<
  Network["id"],
  {
    card: string;
    text: string;
    logo: { src: string; width: number; height: number };
    tile: boolean;
  }
> = {
  mtn: {
    card: "#FFCB05",
    text: "text-[#1d1d1f]",
    logo: { src: "/networks/mtn.svg", width: 567, height: 283 },
    tile: false,
  },
  telecel: {
    card: "#E32527",
    text: "text-white",
    logo: { src: "/networks/telecel.png", width: 389, height: 388 },
    tile: true,
  },
  at: {
    card: "#223D76",
    text: "text-white",
    logo: { src: "/networks/at.png", width: 65, height: 60 },
    tile: true,
  },
};

/** The SIM card's body: rounded corners with one cut, drawn so the shape scales cleanly. */
function SimBody({ color }: { color: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 200"
      className="absolute inset-0 size-full drop-shadow-[0_18px_22px_rgb(0_0_0/0.2)]"
    >
      <path
        fill={color}
        d="M24 0H256q8 0 13.7 5.7L314.3 50.3Q320 56 320 64V176q0 24-24 24H24Q0 200 0 176V24Q0 0 24 0Z"
      />
    </svg>
  );
}

/** The gold contact pad. */
function SimChip({ index }: { index: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 54 42"
      className="pop absolute top-[36%] right-[9%] w-[19%]"
      style={{ "--i": index } as CSSProperties}
    >
      <rect
        x="0.75"
        y="0.75"
        width="52.5"
        height="40.5"
        rx="7.5"
        fill="#E8C468"
        stroke="#A9832F"
        strokeWidth="1.5"
      />
      <path
        d="M0 14H18M0 28H18M36 14H54M36 28H54M18 0V12M36 0V12M18 30V42M36 30V42"
        stroke="#A9832F"
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="18"
        y="12"
        width="18"
        height="18"
        rx="4"
        fill="none"
        stroke="#A9832F"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Coverage() {
  return (
    <section className="py-24 sm:py-36">
      <div className="shell">
        <Reveal>
          <h2
            data-reveal
            className="h-section mx-auto max-w-[52rem] text-center"
          >
            {coverage.title}
          </h2>
        </Reveal>
        <Statement
          text={coverage.body}
          className="mx-auto mt-10 max-w-[46rem] text-center text-[clamp(1.5rem,3.6vw,2.5rem)] leading-[1.2] font-medium tracking-[-0.02em] sm:mt-14"
        />

        <Reveal className="mt-16 sm:mt-24">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {networks.map((network, i) => {
              const { card, text, logo, tile } = sim[network.id];
              return (
                <div
                  key={network.id}
                  data-reveal
                  className="w-[9.5rem] sm:w-[13rem] lg:w-[15rem]"
                >
                  <div className={cn("@container relative aspect-[8/5]", text)}>
                    <SimBody color={card} />
                    <span
                      className={cn(
                        "absolute top-[11%] left-[8%] grid place-items-center",
                        tile
                          ? "aspect-square w-[18%] rounded-[22%] bg-white"
                          : "w-[30%]",
                      )}
                    >
                      <Image
                        src={logo.src}
                        alt=""
                        width={logo.width}
                        height={logo.height}
                        className={cn("h-auto", tile ? "w-[66%]" : "w-full")}
                      />
                    </span>
                    <SimChip index={i} />
                    <span className="absolute bottom-[11%] left-[8%] text-[8.5cqw] leading-none font-bold tracking-[-0.02em]">
                      {network.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div data-reveal className="tile inset-card mt-10 sm:mt-14">
            <p className="text-lg text-muted-foreground">On every network</p>
            <ul className="mt-6 grid gap-y-5 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-0 lg:divide-x">
              {coverage.capabilities.map((capability, i) => (
                <li
                  key={capability}
                  className="flex gap-3 text-lg leading-snug font-medium lg:flex-col lg:px-7 lg:text-xl lg:first:pl-0 lg:last:pr-0"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                    <DrawCheck index={i} className="size-5" />
                  </span>
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <p className="lede mx-auto mt-10 max-w-[36rem] text-center">
          {coverage.note}
        </p>
      </div>
    </section>
  );
}
