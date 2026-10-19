"use client";

import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

interface NumberCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export function NumberCounter({
  value,
  suffix = "",
  prefix = "",
  className = "",
  decimals = 0,
}: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (isInView) {
      motionVal.set(value);
    }
  }, [isInView, motionVal, value]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      if (ref.current) {
        const formatted = decimals > 0
          ? latest.toFixed(decimals)
          : Math.floor(latest).toLocaleString("vi-VN");
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
    return () => unsubscribe();
  }, [springVal, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
