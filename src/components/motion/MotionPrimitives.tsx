"use client";

import React, { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

/**
 * The site's single motion language: a slow fade with a gentle rise.
 * Keep every scroll/entrance animation on these values so pages feel consistent.
 */
export const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const MOTION_DURATION = 1;
export const MOTION_RISE = 24;

export function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : MOTION_RISE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: MOTION_DURATION, delay, ease: MOTION_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Counts a stat up from 0 when it scrolls into view: "100%", "2018", "7 ngày".
 * The leading number animates; any text around it stays put. Server render,
 * no-JS and reduced-motion visitors simply see the final value.
 */
export function CountUp({
  value,
  duration = 1.8,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  // "7 ngày" → prefix "", number 7, suffix " ngày". No digits → shown as-is.
  const match = /^(\D*)(\d+)(.*)$/.exec(value);
  const hasNumber = match !== null;
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  // Starts at the real value so the server HTML is correct before JS runs.
  const count = useMotionValue(target);
  const text = useTransform(count, (n) =>
    hasNumber ? `${prefix}${Math.round(n)}${suffix}` : value,
  );

  useEffect(() => {
    if (!hasNumber || reduceMotion) return;
    if (!isInView) {
      // Still below the fold (and hidden by FadeIn), so resetting to 0 isn't visible.
      count.set(0);
      return;
    }
    const controls = animate(count, target, { duration, ease: MOTION_EASE });
    return () => controls.stop();
  }, [isInView, reduceMotion, hasNumber, target, duration, count]);

  return (
    // tabular-nums keeps the width steady while digits change
    <motion.span ref={ref} className={`tabular-nums ${className}`}>
      {text}
    </motion.span>
  );
}
