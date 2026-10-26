import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getLocale } from "@/i18n/server";
import { localeAlternates } from "@/i18n/config";
import { checkoutMessages } from "@/i18n/messages/checkout";
import { CheckoutForm } from "./CheckoutForm";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = checkoutMessages[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: localeAlternates("/thanh-toan", locale),
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CheckoutPage() {
  const t = checkoutMessages[await getLocale()];
  const breadcrumbs = [
    { label: t.breadcrumbCart, href: "/gio-hang" },
    { label: t.breadcrumbCheckout, href: "/thanh-toan" },
  ];

  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="mt-6 mb-10 text-3xl sm:text-4xl font-semibold text-agarwood">
        {t.heading}
      </h1>

      <CheckoutForm />
    </div>
  );
}
