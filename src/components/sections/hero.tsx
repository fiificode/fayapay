import { ChevronRight } from "lucide-react";
import { hero } from "@/content/site";
import { ApkLine } from "@/components/apk-info";
import { DownloadButton } from "@/components/download-button";
import { UssdDemo } from "@/components/ussd-demo";

export function Hero() {
  return (
    <section className="overflow-hidden bg-soft">
      <UssdDemo>
        <div className="mx-auto max-w-[58rem] text-center">
          <p aria-hidden className="font-mono text-[clamp(1.5rem,4vw,2.25rem)] leading-none font-bold text-muted-foreground/60">
            <span className="relative inline-block">
              {hero.code}
              <span data-strike className="absolute top-1/2 -right-1.5 -left-1.5 -mt-[1.5px] h-[3px] origin-left rounded-full bg-primary" />
            </span>
          </p>
          <h1 className="h-display mt-4 lg:whitespace-nowrap">
            {hero.title}
          </h1>
          <p className="lede mx-auto mt-6 max-w-[42rem]">{hero.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <DownloadButton />
            <a
              href="#how"
              className="press group inline-flex h-13 items-center gap-0.5 rounded-full border border-primary pr-5 pl-7 text-[1.0625rem] font-medium text-primary outline-none transition-[background-color,color,transform] duration-150 ease-out hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-soft active:scale-[0.97]"
            >
              See how it works
              <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
          <ApkLine className="mt-4 text-sm text-muted-foreground" />
        </div>
      </UssdDemo>
    </section>
  );
}
