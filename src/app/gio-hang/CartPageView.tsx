"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/features/cart/useCartStore";
import { useIsMounted } from "@/hooks/useIsMounted";
import { formatVND } from "@/lib/format/currency";
import { brandConfig } from "@/lib/config/brand";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/cart/CartDrawer";

export function CartPageView() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getTotalItems,
  } = useCartStore();

  const mounted = useIsMounted();

  if (!mounted) {
    return <div className="py-24" aria-busy="true" />;
  }

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();
  const threshold = brandConfig.policies.freeShippingThreshold;
  const isFreeShipping = subtotal >= threshold;
  const shippingFee = isFreeShipping
    ? 0
    : brandConfig.policies.shippingStandardFee;
  const total = subtotal + shippingFee;
  const remainingForFree = Math.max(0, threshold - subtotal);
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / threshold) * 100),
  );

  if (items.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-agarwood">
          Giỏ hàng của bạn đang trống
        </h2>
        <p className="mt-3 text-[15px] text-muted leading-relaxed">
          Khám phá vòng tay, nhang và trầm nụ tự nhiên của Vĩnh Trầm.
        </p>
        <div className="mt-8">
          <Button href="/san-pham">Xem sản phẩm</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      <div className="lg:col-span-8">
        <div>
          <p className="text-[15px] text-charcoal">
            {isFreeShipping ? (
              "Đơn hàng của bạn được miễn phí vận chuyển."
            ) : (
              <>
                Mua thêm{" "}
                <span className="font-medium">
                  {formatVND(remainingForFree)}
                </span>{" "}
                để được miễn phí vận chuyển.
              </>
            )}
          </p>
          <div
            className="mt-3 h-1 w-full rounded-full bg-ivory-dark overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Tiến độ miễn phí vận chuyển"
          >
            <div
              className="h-full rounded-full bg-espresso transition-[width] duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <ul className="mt-8 divide-y divide-border-subtle border-y border-border-subtle">
          {items.map((item) => (
            <li key={item.id} className="py-6 flex gap-4 sm:gap-6">
              <Link
                href={`/san-pham/${item.slug}`}
                className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 overflow-hidden bg-ivory"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </Link>

              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      href={`/san-pham/${item.slug}`}
                      className="text-[15px] sm:text-base font-medium text-charcoal hover:text-gold-dark transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted">
                      {item.variantName}
                    </p>
                  </div>
                  <p className="text-[15px] sm:text-base font-medium text-charcoal shrink-0">
                    {formatVND(item.price * item.quantity)}
                  </p>
                </div>

                <div className="mt-auto pt-4 flex items-center gap-6">
                  <QuantityStepper
                    quantity={item.quantity}
                    max={item.maxQuantity}
                    onChange={(q) => updateQuantity(item.id, q)}
                    label={item.name}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-muted underline underline-offset-4 hover:text-charcoal transition-colors cursor-pointer"
                    aria-label={`Xóa ${item.name} khỏi giỏ`}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link
            href="/san-pham"
            className="text-charcoal underline underline-offset-4 hover:text-gold-dark transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
          <button
            type="button"
            onClick={clearCart}
            className="text-muted hover:text-charcoal transition-colors cursor-pointer"
          >
            Xóa tất cả
          </button>
        </div>
      </div>

      <aside className="lg:col-span-4 lg:sticky lg:top-[calc(var(--header-h)+2rem)] rounded-2xl bg-ivory p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-agarwood">Tóm tắt</h2>
        <dl className="mt-6 space-y-2 text-[15px]">
          <div className="flex justify-between">
            <dt className="text-muted">Tạm tính ({totalItems} sản phẩm)</dt>
            <dd className="text-charcoal">{formatVND(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Vận chuyển</dt>
            <dd className="text-charcoal">
              {isFreeShipping ? "Miễn phí" : formatVND(shippingFee)}
            </dd>
          </div>
          <div className="flex justify-between items-baseline pt-4 mt-2 border-t border-border-dark/10">
            <dt className="font-medium text-charcoal">Tổng cộng</dt>
            <dd className="text-2xl font-semibold text-charcoal">
              {formatVND(total)}
            </dd>
          </div>
        </dl>

        <Button href="/thanh-toan" size="lg" className="mt-8 w-full">
          Thanh toán
        </Button>
        <p className="mt-4 text-sm text-muted text-center leading-relaxed">
          Giá đã gồm thuế và đóng gói. Bạn được kiểm tra hàng trước khi nhận.
        </p>
      </aside>
    </div>
  );
}
