"use client";

import React from "react";
import type { AgarwoodProfile } from "@/types/product";
import { profileChips } from "@/lib/format/agarwood";
import { useLocale, useMessages } from "@/i18n/client";
import { productMessages } from "@/i18n/messages/product";

/** Loại trầm · vùng · tuổi trầm. Renders nothing when the profile is empty. */
export function AgarwoodChips({
  profile,
  className = "",
}: {
  profile: AgarwoodProfile;
  className?: string;
}) {
  const chips = profileChips(profile, useLocale());
  if (chips.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {chips.map((chip) => (
        <li
          key={chip}
          // max-w + truncate keeps a long region name from forcing a second line on 375px cards
          className="max-w-full truncate rounded-full border border-gold/30 bg-ivory px-2 py-0.5 text-xs leading-5 text-agarwood-dark"
        >
          {chip}
        </li>
      ))}
    </ul>
  );
}

export function SinksBadge({ className = "" }: { className?: string }) {
  const t = useMessages(productMessages);
  return (
    <span
      className={`inline-flex items-center rounded-full bg-espresso px-2.5 py-1 text-[11px] font-medium leading-none text-gold-light ${className}`}
    >
      {t.sinksBadge}
    </span>
  );
}
