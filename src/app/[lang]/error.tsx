"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { brandConfig } from "@/lib/config/brand";
import { useMessages } from "@/i18n/client";
import { layoutMessages } from "@/i18n/messages/layout";
import { commonMessages } from "@/i18n/messages/common";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useMessages(layoutMessages).error;
  const common = useMessages(commonMessages);

  useEffect(() => {
    console.error("App boundary error caught:", error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
      <p className="text-sm font-medium text-gold-dark">{t.eyebrow}</p>
      <h1 className="mt-3 text-3xl sm:text-5xl font-semibold text-agarwood tracking-tight">
        {t.title}
      </h1>
      <p className="mt-4 text-[15px] sm:text-base text-muted leading-relaxed">
        {t.bodyBefore}{" "}
        <a
          href={`tel:${brandConfig.contact.hotline}`}
          className="text-charcoal underline underline-offset-4"
        >
          {brandConfig.contact.phoneFormatted}
        </a>{" "}
        {t.bodyAfter}
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button onClick={() => reset()}>{t.retry}</Button>
        <Button href="/" variant="outline">
          {common.backHome}
        </Button>
      </div>
    </div>
  );
}
