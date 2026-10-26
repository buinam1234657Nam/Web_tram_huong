import React, { Suspense } from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getLocale } from "@/i18n/server";
import { localeAlternates } from "@/i18n/config";
import { orderMessages } from "@/i18n/messages/order";
import { OrderLoading, OrderSuccessView } from "./OrderSuccessView";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = orderMessages[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: localeAlternates("/dat-hang/thanh-cong", locale),
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function OrderSuccessPage() {
  const t = orderMessages[await getLocale()];
  const breadcrumbs = [
    { label: t.breadcrumbCart, href: "/gio-hang" },
    { label: t.breadcrumbSuccess, href: "/dat-hang/thanh-cong" },
  ];

  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-10">
        {/* The order code comes from searchParams, so it must render inside Suspense. */}
        <Suspense fallback={<OrderLoading />}>
          <OrderSuccessView />
        </Suspense>
      </div>
    </div>
  );
}
