"use client";

import React, { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "@/components/i18n/Link";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore } from "@/features/cart/useCartStore";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useScrollLock } from "@/hooks/useScrollLock";
import { formatVND } from "@/lib/format/currency";
import { brandConfig } from "@/lib/config/brand";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";
import { Button } from "@/components/ui/Button";
import { useLocalizePath, useMessages } from "@/i18n/client";
import { layoutMessages } from "@/i18n/messages/layout";
import { commonMessages } from "@/i18n/messages/common";

export function CartDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const localize = useLocalizePath();
  const t = useMessages(layoutMessages).cart;
  const common = useMessages(commonMessages);
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotalItems,
  } = useCartStore();
  const mounted = useIsMounted();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openedOnPath = useRef(pathname);

  // Close when the route changes (e.g. "Mua ngay" adds to cart then navigates to checkout).
  useEffect(() => {
    if (isOpen && pathname !== openedOnPath.current) closeCart();
    openedOnPath.current = pathname;
  }, [pathname, isOpen, closeCart]);

  useEffect(() => {
    if (!isOpen) return;
    router.prefetch(localize("/gio-hang"));
    router.prefetch(localize("/thanh-toan"));
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, router, closeCart, localize]);

  useScrollLock(isOpen);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();
  const threshold = brandConfig.policies.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, threshold - subtotal);
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / threshold) * 100),
  );

  const navigate = (path: string) => {
    closeCart();
    router.push(localize(path));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-espresso-dark/30"
            onClick={closeCart}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: MOTION_EASE }}
            className="absolute inset-y-0 right-0 w-full max-w-md bg-cream flex flex-col"
          >
            <div className="px-6 h-16 flex items-center justify-between border-b border-border-subtle">
              <h2
                id="cart-drawer-title"
                className="text-lg font-semibold text-charcoal"
              >
                {t.title}{totalItems > 0 && ` (${totalItems})`}
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeCart}
                className="p-2 -mr-2 rounded-full text-charcoal hover:bg-cream-dark transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso focus-visible:ring-offset-2"
                aria-label={t.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {items.length > 0 && (
              <div className="px-6 py-4 border-b border-border-subtle">
                <p className="text-sm text-charcoal">
                  {remainingForFreeShipping > 0
                    ? t.freeShippingRemaining(formatVND(remainingForFreeShipping))
                    : t.freeShippingReached}
                </p>
                <div className="mt-2.5 h-1 w-full rounded-full bg-ivory-dark overflow-hidden">
                  <div
                    className="h-full rounded-full bg-espresso transition-[width] duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <p className="text-lg font-medium text-charcoal">
                    {t.emptyTitle}
                  </p>
                  <p className="mt-2 text-sm text-muted max-w-xs">
                    {t.emptyBody}
                  </p>
                  <Button
                    onClick={() => navigate("/san-pham")}
                    className="mt-6"
                  >
                    {common.viewProducts}
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-border-subtle">
                  {items.map((item) => (
                    <li key={item.id} className="py-5 flex gap-4">
                      <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-lg bg-cream">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover mix-blend-multiply"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/san-pham/${item.slug}`}
                          onClick={closeCart}
                          className="block text-[15px] font-medium text-charcoal hover:text-gold-dark line-clamp-2 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-sm text-muted">
                          {item.variantName}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <QuantityStepper
                            quantity={item.quantity}
                            max={item.maxQuantity}
                            onChange={(q) => updateQuantity(item.id, q)}
                            label={item.name}
                            size="sm"
                          />
                          <p className="text-[15px] text-charcoal">
                            {formatVND(item.price * item.quantity)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-2 text-sm text-muted underline underline-offset-4 hover:text-charcoal transition-colors cursor-pointer"
                          aria-label={t.removeLabel(item.name)}
                        >
                          {t.remove}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-border-subtle">
                <div className="flex items-baseline justify-between">
                  <span className="text-[15px] text-muted">{t.subtotal}</span>
                  <span className="text-xl font-semibold text-charcoal">
                    {formatVND(subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {t.shippingNote}
                </p>
                <div className="mt-5 space-y-2.5">
                  <Button
                    onClick={() => navigate("/thanh-toan")}
                    size="lg"
                    className="w-full"
                  >
                    {t.checkout}
                  </Button>
                  <Button
                    onClick={() => navigate("/gio-hang")}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    {t.viewCart}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** Pill-shaped −/+ control shared by the drawer and the cart page. */
export function QuantityStepper({
  quantity,
  max,
  onChange,
  label,
  size = "md",
}: {
  quantity: number;
  max: number;
  onChange: (quantity: number) => void;
  label: string;
  size?: "sm" | "md";
}) {
  const t = useMessages(layoutMessages).cart;
  const buttonSize = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  return (
    <div className="inline-flex items-center rounded-full border border-border-subtle">
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        className={`${buttonSize} flex items-center justify-center rounded-full text-charcoal hover:bg-cream-dark transition-colors cursor-pointer`}
        aria-label={t.decrease(label)}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span
        className="min-w-8 text-center text-sm font-medium text-charcoal"
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= max}
        className={`${buttonSize} flex items-center justify-center rounded-full text-charcoal hover:bg-cream-dark transition-colors disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed`}
        aria-label={t.increase(label)}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
