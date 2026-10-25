"use client";

import { useEffect } from "react";

// Overlays can stack (quick view hands off to the cart drawer), so the lock
// is counted and only released when the last one closes.
let lockCount = 0;
let saved: { overflow: string; paddingRight: string } | null = null;

function lock() {
  lockCount += 1;
  if (lockCount > 1) return;

  const { body, documentElement } = document;
  saved = {
    overflow: body.style.overflow,
    paddingRight: body.style.paddingRight,
  };

  // html reserves the scrollbar's space (scrollbar-gutter in globals.css), so
  // hiding overflow doesn't widen the page. Where that isn't supported, pad
  // the body by the scrollbar's width instead so nothing shifts sideways.
  const gutterReserved = CSS.supports("scrollbar-gutter", "stable");
  const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
  if (!gutterReserved && scrollbarWidth > 0) {
    const current = parseFloat(getComputedStyle(body).paddingRight) || 0;
    body.style.paddingRight = `${current + scrollbarWidth}px`;
  }
  body.style.overflow = "hidden";
}

function unlock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0 || !saved) return;
  document.body.style.overflow = saved.overflow;
  document.body.style.paddingRight = saved.paddingRight;
  saved = null;
}

/** Stops the page behind a drawer or dialog from scrolling, without layout shift. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lock();
    return unlock;
  }, [active]);
}
