"use client";

import React from "react";
import Image from "next/image";
import { useMessages } from "@/i18n/client";
import { commonMessages } from "@/i18n/messages/common";

/** "Nguyễn Thùy Linh" → "TL": last two words, as Vietnamese names are addressed by the given name. */
function initialsOf(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * Reviewer photo in a gold ring. Falls back to initials until the shop has a
 * real photo the customer agreed to share; never a stock face.
 */
export function ReviewerAvatar({
  name,
  src,
  size = 48,
}: {
  name: string;
  src?: string;
  size?: number;
}) {
  const t = useMessages(commonMessages);
  return (
    <span
      className="relative shrink-0 rounded-full p-0.5 bg-linear-to-br from-gold-light to-gold"
      style={{ width: size, height: size }}
    >
      <span className="relative block w-full h-full overflow-hidden rounded-full bg-espresso ring-2 ring-white">
        {src ? (
          <Image
            src={src}
            alt={t.photoOf(name)}
            fill
            sizes={`${size}px`}
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gold-light"
          >
            {initialsOf(name)}
          </span>
        )}
      </span>
    </span>
  );
}
