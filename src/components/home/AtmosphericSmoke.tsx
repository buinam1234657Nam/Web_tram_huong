"use client";

import React from "react";

export function AtmosphericSmoke() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-10"
    >
      {/* Smoke particle 1 */}
      <div className="absolute bottom-12 left-1/4 w-72 h-72 rounded-full bg-radial from-white/12 via-white/5 to-transparent blur-3xl animate-smoke-1" />

      {/* Smoke particle 2 */}
      <div className="absolute bottom-6 left-1/3 w-96 h-96 rounded-full bg-radial from-champagne/15 via-white/5 to-transparent blur-3xl animate-smoke-2" />

      {/* Smoke particle 3 */}
      <div className="absolute bottom-20 left-1/2 w-80 h-80 rounded-full bg-radial from-white/10 via-champagne/5 to-transparent blur-3xl animate-smoke-3" />

      {/* Subtle floating golden embers */}
      <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-champagne-light opacity-60 animate-ping duration-1000" />
      <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-champagne-light opacity-50 animate-pulse duration-700" />
      <div className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full bg-champagne/40 blur-xs animate-bounce duration-1000" />
    </div>
  );
}
