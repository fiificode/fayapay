import Link from "next/link";
import { site } from "@/content/site";

const link = "rounded-sm outline-none hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring";

export function SiteFooter() {
  return (
    <footer className="bg-soft">
      <div className="shell py-8 t-small leading-relaxed text-muted-foreground">
        <p className="border-b pb-5">
          {site.name} is made by{" "}
          <a href={site.maker.url} target="_blank" rel="noopener" className={`${link} underline`}>
            {site.maker.name}
          </a>
          . Available in Ghana.
        </p>
        <p className="flex flex-wrap gap-x-6 gap-y-2 pt-5">
          <Link href="/privacy" className={link}>
            Privacy policy
          </Link>
          <a href={`mailto:${site.supportEmail}`} className={link}>
            {site.supportEmail}
          </a>
        </p>
      </div>
    </footer>
  );
}
