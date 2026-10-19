"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

export function AtmosphericSmoke() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.05 });

  // 5 lightweight embers for subtle atmosphere
  const embers = [
    { id: 1, left: "15%", delay: 0, duration: 6, size: 3 },
    { id: 2, left: "38%", delay: 1.5, duration: 8, size: 2 },
    { id: 3, left: "62%", delay: 0.8, duration: 7, size: 2.5 },
    { id: 4, left: "80%", delay: 2.2, duration: 9, size: 3 },
  ];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-10"
    >
      {/* Ambient warm radial glow */}
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(197, 164, 109, 0.22) 0%, rgba(150, 107, 69, 0.08) 45%, transparent 70%)",
        }}
      />

      {/* Layer 1: Atmospheric smoke billow left - using radial gradient instead of heavy blur filter */}
      {isInView && (
        <motion.div
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -30, -50, 0],
            scale: [1, 1.1, 1.15, 1],
            opacity: [0.2, 0.4, 0.25, 0.2],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(197, 164, 109, 0.18) 0%, rgba(246, 242, 233, 0.06) 50%, transparent 75%)",
          }}
          className="absolute -bottom-10 left-[10%] w-[380px] h-[380px] rounded-full will-change-transform"
        />
      )}

      {/* Layer 2: Atmospheric smoke billow center */}
      {isInView && (
        <motion.div
          animate={{
            x: [0, -20, 15, 0],
            y: [0, -40, -70, 0],
            scale: [1.05, 1.2, 1.3, 1.05],
            opacity: [0.15, 0.35, 0.2, 0.15],
          }}
          transition={{
            duration: 18,
            delay: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.16) 0%, rgba(197, 164, 109, 0.08) 50%, transparent 75%)",
          }}
          className="absolute -bottom-16 left-[35%] w-[420px] h-[420px] rounded-full will-change-transform"
        />
      )}

      {/* Layer 3: Organic SVG Incense Smoke Wisps rising */}
      {isInView && (
        <svg
          className="absolute bottom-0 right-1/4 w-72 h-96 opacity-45 overflow-visible"
          viewBox="0 0 100 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M 50 190 Q 40 140 60 100 T 45 40 T 55 10"
            stroke="url(#smokeGradient1)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1],
              pathOffset: [0, 0, 1],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M 52 195 Q 65 150 40 110 T 60 50 T 48 15"
            stroke="url(#smokeGradient2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1],
              pathOffset: [0, 0, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10,
              delay: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="smokeGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#C5A46D" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F6F2E9" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="smokeGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#DFC8A2" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* Floating Golden Embers (Tàn Trầm Hương Bay Bổng) */}
      {isInView &&
        embers.map((ember) => (
          <motion.div
            key={ember.id}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{
              y: ["60vh", "-10vh"],
              x: [0, ember.id % 2 === 0 ? 30 : -30, ember.id % 2 === 0 ? -15 : 20],
              opacity: [0, 0.75, 0.9, 0],
              scale: [0.6, 1.2, 0.8],
            }}
            transition={{
              duration: ember.duration,
              delay: ember.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{
              left: ember.left,
              width: ember.size,
              height: ember.size,
            }}
            className="absolute rounded-full bg-champagne-light shadow-[0_0_8px_#C5A46D]"
          />
        ))}
    </div>
  );
}
