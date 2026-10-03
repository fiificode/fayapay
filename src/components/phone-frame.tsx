import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The one phone used everywhere a screen is shown. Sized by its width. */
export function PhoneFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative aspect-[540/1127] overflow-hidden rounded-[13%/6.2%] border-[5px] border-bezel bg-[#F3F7F2] shadow-[0_24px_60px_-28px_rgb(0_0_0/0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Screenshot({
  src,
  alt,
  priority,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={540}
      height={1127}
      priority={priority}
      sizes="(min-width: 1024px) 320px, 60vw"
      className={cn("absolute inset-0 size-full object-cover", className)}
    />
  );
}
