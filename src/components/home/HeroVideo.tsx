"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Short looping clip laid over the hero photo. The photo (rendered by the
 * page) stays the LCP image; the video fades in only once it is actually
 * playing, and its first frame matches the photo so the swap is invisible.
 * It never plays for reduced-motion or data-saver visitors, and pauses
 * while scrolled out of view.
 */
export function HeroVideo({
  sources,
}: {
  sources: Array<{ src: string; type: string }>;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true;
    if (saveData) return;

    let inView = true;
    const sync = () => {
      if (reduceMotion.matches || !inView) video.pause();
      else void video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    reduceMotion.addEventListener("change", sync);
    sync();

    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setIsPlaying(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-400 ease-out ${
        isPlaying ? "opacity-100" : "opacity-0"
      }`}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
