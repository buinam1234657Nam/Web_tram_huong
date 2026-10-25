"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

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
