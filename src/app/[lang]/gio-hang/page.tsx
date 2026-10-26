import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getLocale } from "@/i18n/server";
import { localeAlternates } from "@/i18n/config";
import { cartMessages } from "@/i18n/messages/cart";
import { CartPageView } from "./CartPageView";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = cartMessages[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: localeAlternates("/gio-hang", locale),
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CartPage() {
  const t = cartMessages[await getLocale()];
  const breadcrumbs = [{ label: t.breadcrumb, href: "/gio-hang" }];

  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="mt-6 mb-10 text-3xl sm:text-4xl font-semibold text-agarwood">
        {t.heading}
      </h1>

      <CartPageView />
    </div>
  );
}
