"use client";

import { useEffect, type RefObject } from "react";
import { animate } from "motion/react";

/** Where a flick would come to rest, as scroll deceleration does. */
function project(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Lets a sideways-scrolling row be dragged with a mouse. The row follows the
 * pointer 1:1, and on release it carries the pointer's velocity into a spring
 * that settles on the card nearest to where the flick was heading. Touch and
 * trackpad keep the browser's own scrolling, which already behaves this way.
 */
export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pointer = -1;
    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    let history: { x: number; t: number }[] = [];
    let settle: { stop: () => void } | null = null;

    const release = () => {
      el.style.scrollSnapType = "";
      el.style.cursor = "";
    };
    const interrupt = () => {
      settle?.stop();
      settle = null;
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      // Grabbing a row that is still settling takes it over from where it is.
      interrupt();
      pointer = e.pointerId;
      startX = e.clientX;
      history = [{ x: e.clientX, t: e.timeStamp }];
    };

    const move = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      if (!dragging) {
        if (Math.abs(e.clientX - startX) < 10) return;
        dragging = true;
        el.setPointerCapture(pointer);
        el.style.scrollSnapType = "none";
        el.style.cursor = "grabbing";
        startX = e.clientX;
        startLeft = el.scrollLeft;
      }
      el.scrollLeft = startLeft - (e.clientX - startX);
      history.push({ x: e.clientX, t: e.timeStamp });
      while (history.length > 2 && e.timeStamp - history[0].t > 100) history.shift();
    };

    const up = (e: PointerEvent) => {
      if (e.pointerId !== pointer) return;
      pointer = -1;
      if (!dragging) return;
      dragging = false;

      const first = history[0];
      const last = history[history.length - 1];
      const elapsed = last.t - first.t;
      // The row scrolls opposite to the pointer.
      const velocity = elapsed > 0 ? (-(last.x - first.x) / elapsed) * 1000 : 0;

      const max = el.scrollWidth - el.clientWidth;
      const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
      const left = el.getBoundingClientRect().left;
      const projected = el.scrollLeft + project(velocity);
      let target = el.scrollLeft;
      let best = Infinity;
      for (const child of Array.from(el.children)) {
        const point = Math.min(max, Math.max(0, child.getBoundingClientRect().left - left + el.scrollLeft - pad));
        const distance = Math.abs(point - projected);
        if (distance < best) {
          best = distance;
          target = point;
        }
      }

      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.scrollLeft = target;
        release();
        return;
      }
      settle = animate(el.scrollLeft, target, {
        type: "spring",
        bounce: 0,
        duration: 0.5,
        velocity,
        onUpdate: (value) => {
          el.scrollLeft = value;
        },
        onComplete: release,
      });
    };

    const wheel = () => {
      if (!settle) return;
      interrupt();
      release();
    };
    const noNativeDrag = (e: Event) => e.preventDefault();

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("wheel", wheel, { passive: true });
    el.addEventListener("dragstart", noNativeDrag);
    return () => {
      interrupt();
      release();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("wheel", wheel);
      el.removeEventListener("dragstart", noNativeDrag);
    };
  }, [ref]);
}
