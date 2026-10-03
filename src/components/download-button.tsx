import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { downloadUrl } from "@/lib/download";
import { hero } from "@/content/site";
import { PressLink } from "./press-link";

const tones = {
  brand: "bg-primary text-primary-foreground",
} as const;

export function DownloadButton({
  tone = "brand",
  size = "lg",
  className,
}: {
  tone?: keyof typeof tones;
  size?: "sm" | "lg";
  className?: string;
}) {
  return (
    <PressLink
      href={downloadUrl}
      download
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        size === "lg" ? "h-13 px-7 text-[1.0625rem]" : "relative h-8 px-3.5 text-[0.8125rem] before:absolute before:-inset-x-1 before:-inset-y-1.5",
        tones[tone],
        className,
      )}
    >
      {size === "lg" && <Download className="size-5" aria-hidden />}
      {size === "lg" ? hero.cta : <><span className="sm:hidden">Download</span><span className="hidden sm:inline">{hero.cta}</span></>}
    </PressLink>
  );
}
