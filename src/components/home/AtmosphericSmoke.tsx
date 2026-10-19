"use client";

import React from "react";
import { motion } from "motion/react";

export function AtmosphericSmoke() {
  // Generate random embers for organic natural drift
  const embers = [
    { id: 1, left: "15%", delay: 0, duration: 6, size: 3 },
    { id: 2, left: "28%", delay: 1.5, duration: 8, size: 2.5 },
    { id: 3, left: "42%", delay: 0.8, duration: 7, size: 2 },
    { id: 4, left: "60%", delay: 2.2, duration: 9, size: 3.5 },
    { id: 5, left: "75%", delay: 1.1, duration: 6.5, size: 2 },
    { id: 6, left: "85%", delay: 3, duration: 7.5, size: 2.5 },
    { id: 7, left: "33%", delay: 4, duration: 8.5, size: 1.5 },
  ];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-10"
    >
      {/* Ambient warm radial glow in the center-right */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-champagne/15 via-agarwood/10 to-transparent blur-3xl opacity-70 animate-pulse duration-1000" />

      {/* Layer 1: Atmospheric smoke billow left */}
      <motion.div
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -35, -70, 0],
          scale: [1, 1.15, 1.25, 1],
          opacity: [0.15, 0.35, 0.2, 0.15],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-10 left-[10%] w-[420px] h-[420px] rounded-full bg-gradient-to-t from-champagne/20 via-ivory/10 to-transparent blur-3xl"
      />

      {/* Layer 2: Atmospheric smoke billow center */}
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, -50, -100, 0],
          scale: [1.1, 1.3, 1.45, 1.1],
          opacity: [0.12, 0.3, 0.15, 0.12],
        }}
        transition={{
          duration: 18,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-16 left-[35%] w-[480px] h-[480px] rounded-full bg-gradient-to-t from-white/20 via-champagne/10 to-transparent blur-3xl"
      />

      {/* Layer 3: Organic SVG Incense Smoke Wisps rising */}
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
          filter="blur(3px)"
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
          filter="blur(2px)"
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

      {/* Floating Golden Embers (Tàn Trầm Hương Bay Bổng) */}
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: ["60vh", "-10vh"],
            x: [0, (ember.id % 2 === 0 ? 30 : -30), (ember.id % 2 === 0 ? -15 : 20)],
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
