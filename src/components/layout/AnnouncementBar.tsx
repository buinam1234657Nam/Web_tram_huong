import React from "react";
import Link from "@/components/i18n/Link";
import { brandConfig } from "@/lib/config/brand";
import { formatVND } from "@/lib/format/currency";
import { getLocale } from "@/i18n/server";
import { layoutMessages } from "@/i18n/messages/layout";

export async function AnnouncementBar() {
  const t = layoutMessages[await getLocale()].announcement;
  return (
    <aside
      aria-label={t.label}
      className="bg-mahogany text-white/85 text-xs py-2.5 px-4"
    >
      <div className="max-w-site mx-auto flex items-center justify-center lg:justify-between gap-4">
        <span className="hidden lg:block text-white/60">
          Hotline{" "}
          <a
            href={`tel:${brandConfig.contact.hotline}`}
            className="text-white hover:text-gold-light transition-colors"
          >
            {brandConfig.contact.phoneFormatted}
          </a>
        </span>

        <p className="text-center">
          {t.freeShipping(formatVND(brandConfig.policies.freeShippingThreshold))}{" "}
          <Link
            href="/chinh-sach/chinh-sach-giao-hang"
            className="text-gold-light underline underline-offset-2 hover:text-white transition-colors"
          >
            {t.learnMore}
          </Link>
        </p>

        <Link
          href="/chinh-sach/chinh-sach-bao-hanh"
          className="hidden lg:block text-white/60 hover:text-white transition-colors"
        >
          {t.warranty}
        </Link>
      </div>
    </aside>
  );
}
