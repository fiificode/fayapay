"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { fetchApkInfo, type ApkInfo } from "@/lib/download";
import { site } from "@/content/site";

function useApkInfo() {
  const [info, setInfo] = useState<ApkInfo | null>(null);
  useEffect(() => {
    let live = true;
    fetchApkInfo().then((apk) => live && setInfo(apk));
    return () => {
      live = false;
    };
  }, []);
  return info;
}

/** "Version 1.0.0, 66 MB, for Android 7 and newer", or the requirement alone. */
export function ApkLine({ className }: { className?: string }) {
  const info = useApkInfo();
  return (
    <p className={className}>
      {info
        ? `Version ${info.version}, ${Math.round(info.size / 1e6)} MB, for ${site.requirement}`
        : site.requirement}
    </p>
  );
}

export function Checksum() {
  const info = useApkInfo();
  const [copied, setCopied] = useState(false);
  if (!info?.sha256) return null;
  const sha = info.sha256;

  async function copy() {
    try {
      await navigator.clipboard.writeText(sha);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <div className="raised mt-5 rounded-[1.75rem] bg-card p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-muted-foreground">SHA-256</span>
        <motion.button
          type="button"
          onClick={copy}
          whileTap={{ scale: 0.94 }}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-input px-3.5 text-sm font-medium outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "copied" : "copy"}
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.14 }}
              className="inline-flex items-center gap-1.5"
            >
              {copied ? <Check className="size-4 text-primary" aria-hidden /> : <Copy className="size-4" aria-hidden />}
              <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
      <code className="mt-3 block font-mono text-sm leading-relaxed break-all text-foreground">{sha}</code>
    </div>
  );
}
