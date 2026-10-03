"use client";

import { motion, type HTMLMotionProps } from "motion/react";

/** A link with real press feedback. Used for the download buttons. */
export function PressLink(props: HTMLMotionProps<"a">) {
  return (
    <motion.a
      initial={false}
      animate={{ transform: "translateY(0px) scale(1)" }}
      whileHover={{ transform: "translateY(-2px) scale(1)" }}
      whileTap={{ transform: "translateY(0px) scale(0.97)" }}
      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      {...props}
    />
  );
}
