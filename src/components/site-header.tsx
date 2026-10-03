import Link from "next/link";
import { nav, site } from "@/content/site";
import { DownloadButton } from "./download-button";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="chrome sticky top-0 z-40 backdrop-blur-xl backdrop-saturate-[1.8]">
      <div className="shell flex h-12 items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-md text-[1.0625rem] font-bold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flame h-5 text-primary" aria-hidden />
          {site.name}
        </Link>
        <nav aria-label="Sections" className="ml-auto hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="t-small rounded-sm py-3 font-medium text-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring active:opacity-60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1 md:ml-5">
          <ThemeToggle />
          <DownloadButton size="sm" />
        </div>
      </div>
    </header>
  );
}
