import type { CSSProperties } from "react";
import Link from "next/link";
import { ChevronRight, MegaphoneOff, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { privacy } from "@/content/site";
import { Reveal } from "@/components/reveal";

// An illustration of "it reads only what it needs": one receipt, read; the rest, skipped.
const inbox = [
  { from: "Mobile money", text: "Payment received GHS 150.00", read: true },
  { from: "A friend", text: "", read: false },
  { from: "Your bank", text: "", read: false },
];

const span = { pin: "lg:col-span-2", upload: "lg:col-span-3", reads: "lg:col-span-3", ads: "lg:col-span-2" } as const;

function Art({ id }: { id: keyof typeof span }) {
  if (id === "pin") {
    // A PIN field whose dots fade: typed, used, forgotten.
    return (
      <div className="flex items-center gap-4 rounded-2xl bg-card px-6 py-5 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.25)] ring-1 ring-foreground/5">
        {[1, 0.6, 0.3, 0.12].map((opacity, i) => (
          <span key={opacity} style={{ opacity }}>
            <span className="pop block size-4 rounded-full bg-primary sm:size-5" style={{ "--i": i } as CSSProperties} />
          </span>
        ))}
      </div>
    );
  }
  if (id === "reads") {
    return (
      <div className="grid w-full max-w-[26rem] gap-1.5">
        {inbox.map((sms, i) => (
          <div
            key={sms.from}
            style={{ "--i": i } as CSSProperties}
            className={cn(
              "slide flex items-center justify-between gap-4 rounded-2xl px-4 py-3",
              sms.read
                ? "bg-card shadow-[0_8px_24px_-12px_rgb(0_0_0/0.25)] ring-1 ring-foreground/5"
                : "text-muted-foreground",
            )}
          >
            <span className="min-w-0">
              <span className="block text-sm font-bold">{sms.from}</span>
              {sms.read ? (
                <span className="block truncate font-mono text-sm">{sms.text}</span>
              ) : (
                <span className="mt-1.5 block h-2 w-28 rounded-full bg-border" />
              )}
            </span>
            <span
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-xs font-bold",
                sms.read ? "bg-primary text-primary-foreground" : "font-medium ring-1 ring-input",
              )}
            >
              {sms.read ? "Read" : "Skipped"}
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (id === "upload") {
    // The five things the copy names, kept on the phone.
    return (
      <div className="flex max-w-[26rem] flex-wrap items-center justify-center gap-2">
        <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Smartphone className="size-6" strokeWidth={2} />
        </span>
        {["SMS", "Contacts", "Phone numbers", "Payments", "Balances"].map((item, i) => (
          <span
            key={item}
            style={{ "--i": i } as CSSProperties}
            className="pop rounded-full bg-card px-3.5 py-2 text-sm font-medium shadow-[0_6px_16px_-10px_rgb(0_0_0/0.3)] ring-1 ring-foreground/5"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }
  return (
    <span className="grid size-20 place-items-center rounded-[1.5rem] bg-card shadow-[0_8px_24px_-12px_rgb(0_0_0/0.25)] ring-1 ring-foreground/5">
      <MegaphoneOff className="size-9 text-primary" strokeWidth={1.75} />
    </span>
  );
}

export function Promises() {
  return (
    <section id="privacy" className="bg-soft py-24 sm:py-36">
      <div className="shell">
        <Reveal>
          <h2 data-reveal className="h-section text-center">
            {privacy.title}
          </h2>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-4 sm:mt-20 sm:gap-5 lg:grid-cols-5">
          {privacy.promises.map((promise) => (
            <div
              key={promise.id}
              data-reveal
              className={cn(
                "raised flex min-w-0 flex-col rounded-[1.75rem] bg-card p-2.5 sm:rounded-[2rem] sm:p-3",
                span[promise.id],
              )}
            >
              <div aria-hidden className="stage">
                <Art id={promise.id} />
              </div>
              <div className="flex-1 px-4 pt-6 pb-5 sm:px-6 sm:pt-8 sm:pb-6">
                <h3 className="text-[1.625rem] leading-[1.1] font-bold tracking-[-0.025em] sm:text-[2rem]">
                  {promise.title}
                </h3>
                <p className="mt-3 max-w-[30rem] text-[1.0625rem] leading-relaxed text-muted-foreground">
                  {promise.body}
                </p>
              </div>
            </div>
          ))}
        </Reveal>

        <p className="mt-10 text-center">
          <Link
            href="/privacy"
            className="group inline-flex items-center gap-0.5 rounded-sm text-lg font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          >
            {privacy.link}
            <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
}
