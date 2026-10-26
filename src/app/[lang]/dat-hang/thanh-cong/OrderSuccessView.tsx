"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { loadOrder } from "@/features/cart/orderStorage";
import { formatVND } from "@/lib/format/currency";
import { brandConfig } from "@/lib/config/brand";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/MotionPrimitives";
import { useMessages } from "@/i18n/client";
import { orderMessages } from "@/i18n/messages/order";

/** Placeholder while the order is read from the browser; keeps a heading for every state. */
export function OrderLoading() {
  const t = useMessages(orderMessages);
  return (
    <div className="py-24" aria-busy="true">
      <h1 className="sr-only">{t.yourOrder}</h1>
    </div>
  );
}

export function OrderSuccessView() {
  const searchParams = useSearchParams();
  const mounted = useIsMounted();
  const t = useMessages(orderMessages);
  const orderCode = searchParams.get("orderCode");

  // sessionStorage only exists in the browser; render nothing until mounted.
  if (!mounted) {
    return <OrderLoading />;
  }

  const order = orderCode ? loadOrder(orderCode) : null;

  if (!order) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <h1 className="text-3xl font-semibold text-agarwood">
          {t.notFoundTitle}
        </h1>
        <p className="mt-3 text-[15px] text-muted leading-relaxed">
          {t.notFoundBody}{" "}
          <a
            href={`tel:${brandConfig.contact.hotline}`}
            className="text-charcoal underline underline-offset-4"
          >
            {brandConfig.contact.phoneFormatted}
          </a>
          .
        </p>
        <div className="mt-8">
          <Button href="/san-pham">{t.browseProducts}</Button>
        </div>
      </div>
    );
  }

  const address = order.shippingAddress;

  return (
    <div className="max-w-3xl mx-auto">
      <FadeIn className="text-center">
        <span className="mx-auto flex w-14 h-14 items-center justify-center rounded-full bg-espresso text-white">
          <Check className="w-7 h-7" />
        </span>
        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold text-agarwood">
          {t.thanks}
        </h1>
        <p className="mt-3 text-[15px] text-muted">
          {t.orderCode}{" "}
          <span className="font-medium text-charcoal tracking-wide">
            {order.code}
          </span>
        </p>
      </FadeIn>

      {order.paymentMethod === "bank_transfer" && (
        <section className="mt-12 rounded-2xl border border-charcoal p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-agarwood">
            {t.transferTitle}
          </h2>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[15px]">
            <dt className="text-muted">{t.bank}</dt>
            <dd className="text-charcoal">Vietcombank</dd>
            <dt className="text-muted">{t.accountNumber}</dt>
            <dd className="text-charcoal font-medium tracking-wide">
              0123 456 789
            </dd>
            <dt className="text-muted">{t.accountHolder}</dt>
            <dd className="text-charcoal">VĨNH TRẦM</dd>
            <dt className="text-muted">{t.amount}</dt>
            <dd className="text-charcoal font-medium">
              {formatVND(order.total)}
            </dd>
            <dt className="text-muted">{t.transferNote}</dt>
            <dd className="text-charcoal font-medium tracking-wide">
              {order.code}
            </dd>
          </dl>
        </section>
      )}

      <section className="mt-12 rounded-2xl bg-ivory p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-agarwood">
          {t.detailsTitle}
        </h2>
        <ul className="mt-6 space-y-4">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-white">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-charcoal truncate">
                  {item.name}
                </p>
                <p className="text-sm text-muted truncate">
                  {item.variantName} · {t.quantityShort(item.quantity)}
                </p>
              </div>
              <p className="text-[15px] text-charcoal shrink-0">
                {formatVND(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-6 pt-6 border-t border-border-dark/10 space-y-2 text-[15px]">
          <div className="flex justify-between">
            <dt className="text-muted">{t.subtotal}</dt>
            <dd className="text-charcoal">{formatVND(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">{t.shipping}</dt>
            <dd className="text-charcoal">
              {order.shippingFee === 0
                ? t.free
                : formatVND(order.shippingFee)}
            </dd>
          </div>
          <div className="flex justify-between items-baseline pt-4 mt-2 border-t border-border-dark/10">
            <dt className="font-medium text-charcoal">{t.total}</dt>
            <dd className="text-2xl font-semibold text-charcoal">
              {formatVND(order.total)}
            </dd>
          </div>
        </dl>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[15px]">
          <div>
            <h3 className="text-sm text-muted">{t.shipTo}</h3>
            <p className="mt-1 text-charcoal">
              {address.fullName} · {address.phone}
            </p>
            <p className="text-charcoal">
              {address.streetAddress}, {address.ward}, {address.district},{" "}
              {address.province}
            </p>
          </div>
          <div>
            <h3 className="text-sm text-muted">{t.payment}</h3>
            <p className="mt-1 text-charcoal">
              {t.paymentLabels[order.paymentMethod]}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-agarwood">{t.nextTitle}</h2>
        <ol className="mt-4 space-y-3">
          {t.nextSteps.map((step, idx) => (
            <li key={step} className="flex gap-4 text-[15px] text-charcoal">
              <span className="w-6 shrink-0 text-muted">{idx + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border-subtle">
        <p className="text-[15px] text-muted">
          {t.needHelp}{" "}
          <a
            href={`tel:${brandConfig.contact.hotline}`}
            className="text-charcoal underline underline-offset-4"
          >
            {brandConfig.contact.phoneFormatted}
          </a>
        </p>
        <Button href="/san-pham">{t.continueShopping}</Button>
      </div>
    </div>
  );
}
