"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore } from "@/features/cart/useCartStore";
import { useIsMounted } from "@/hooks/useIsMounted";
import { formatVND } from "@/lib/format/currency";
import { brandConfig } from "@/lib/config/brand";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const router = useRouter();
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

  // Prefetch critical pages as soon as cart drawer is opened
  useEffect(() => {
    if (isOpen) {
      router.prefetch("/gio-hang");
      router.prefetch("/thanh-toan");
    }
  }, [isOpen, router]);

  const handleNavigate = (path: string) => {
    closeCart();
    router.push(path);
  };

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();
  const threshold = brandConfig.policies.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, threshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="cart-drawer-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-border-subtle">
          {/* Header */}
          <div className="p-5 border-b border-border-subtle flex items-center justify-between bg-ivory">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-forest" />
              <h2 id="cart-drawer-title" className="font-serif text-lg font-semibold text-charcoal">
                Giỏ Hàng Của Bạn
              </h2>
              <span className="text-xs bg-forest text-ivory px-2 py-0.5 rounded-full font-medium">
                {totalItems}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-stone-500 hover:text-charcoal hover:bg-stone-100 rounded-full transition-colors"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-stone-50 border-b border-border-subtle">
            <div className="flex items-center gap-2 text-xs text-charcoal mb-1.5">
              <Truck className="w-4 h-4 text-forest shrink-0" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Mua thêm <strong className="text-forest font-semibold">{formatVND(remainingForFreeShipping)}</strong> để được <strong>Miễn phí vận chuyển</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-medium inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-champagne shrink-0" />
                  <span>Đơn hàng của bạn đã đủ điều kiện <strong>Miễn Phí Vận Chuyển!</strong></span>
                </span>
              )}
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-forest h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center text-forest mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-base font-medium text-charcoal mb-1">
                  Giỏ hàng hiện đang trống
                </h3>
                <p className="text-xs text-muted max-w-xs mb-6">
                  Khám phá các sản phẩm trầm hương tự nhiên thượng phẩm của VĨNH TRẦM ngay.
                </p>
                <Button
                  onClick={() => handleNavigate("/san-pham")}
                  variant="primary"
                  size="sm"
                >
                  Khám phá bộ sưu tập
                </Button>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -25, height: 0, paddingTop: 0, paddingBottom: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="py-4 flex gap-4 overflow-hidden"
                  >
                    <div className="relative w-20 h-20 rounded-sm overflow-hidden bg-ivory shrink-0 border border-border-subtle">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/san-pham/${item.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigate(`/san-pham/${item.slug}`);
                            }}
                            className="text-sm font-medium text-charcoal hover:text-forest line-clamp-1 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-stone-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                            title="Xóa khỏi giỏ"
                            aria-label={`Xóa ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-muted mt-0.5">{item.variantName}</p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border-subtle rounded-sm bg-stone-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                            aria-label="Giảm số lượng"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxQuantity}
                            className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors disabled:opacity-30 cursor-pointer"
                            aria-label="Tăng số lượng"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold text-forest">
                            {formatVND(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-border-subtle bg-ivory space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Tạm tính:</span>
                <span className="text-base font-bold text-forest">{formatVND(subtotal)}</span>
              </div>
              <p className="text-[11px] text-muted italic">
                * Phí vận chuyển và ưu đãi sẽ được tính toán chi tiết tại bước thanh toán.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  onClick={() => handleNavigate("/gio-hang")}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs sm:text-sm font-medium"
                >
                  Xem giỏ hàng
                </Button>
                <Button
                  onClick={() => handleNavigate("/thanh-toan")}
                  variant="primary"
                  size="sm"
                  className="w-full text-xs sm:text-sm font-medium"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Thanh toán
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
