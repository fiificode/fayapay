"use client";

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const noop = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known in the browser, so render the icon after hydration.
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";

  // Cross-fade the whole page so the brightness doesn't jump.
  function flip() {
    const next = dark ? "light" : "dark";
    if (!document.startViewTransition) return setTheme(next);
    document.startViewTransition(() => flushSync(() => setTheme(next)));
  }

  return (
    <motion.button
      type="button"
      onClick={flip}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      className="relative grid size-9 place-items-center before:absolute before:-inset-1 rounded-full text-foreground outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={dark ? "moon" : "sun"}
            initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="grid"
          >
            {dark ? <Moon className="size-[1.125rem]" /> : <Sun className="size-[1.125rem]" />}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
