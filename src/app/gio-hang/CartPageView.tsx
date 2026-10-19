"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useCartStore } from "@/features/cart/useCartStore";
import { useIsMounted } from "@/hooks/useIsMounted";
import { formatVND } from "@/lib/format/currency";
import { brandConfig } from "@/lib/config/brand";
import { Button } from "@/components/ui/Button";

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
  const [orderNote, setOrderNote] = useState("");

  if (!mounted) {
    return (
      <div className="py-24 text-center text-muted text-xs">
        Đang đồng bộ dữ liệu giỏ hàng...
      </div>
    );
  }

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();
  const threshold = brandConfig.policies.freeShippingThreshold;
  const isFreeShipping = subtotal >= threshold;
  const shippingFee = isFreeShipping ? 0 : brandConfig.policies.shippingStandardFee;
  const total = subtotal + shippingFee;
  const remainingForFree = Math.max(0, threshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-border-subtle rounded-sm p-8 max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center text-forest mx-auto">
          <ShoppingBag className="w-8 h-8 opacity-60" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-charcoal">
          Giỏ Hàng Của Bạn Hiện Đang Trống
        </h2>
        <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
          Quý khách chưa thêm sản phẩm nào vào giỏ hàng. Hãy khám phá những tác phẩm trầm hương tự nhiên thượng phẩm của VĨNH TRẦM.
        </p>
        <div className="pt-2">
          <Button href="/san-pham" variant="primary" size="md">
            Khám phá bộ sưu tập
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left 2 Cols: Items List */}
      <div className="lg:col-span-2 space-y-6">
        {/* Free Shipping Bar */}
        <div className="bg-white p-4 border border-border-subtle rounded-sm">
          <div className="flex items-center gap-2 text-xs text-charcoal mb-2">
            <Truck className="w-4 h-4 text-forest shrink-0" />
            {isFreeShipping ? (
              <span className="text-emerald-700 font-semibold">
                Đơn hàng của Quý khách được <strong>Miễn Phí Vận Chuyển Toàn Quốc!</strong>
              </span>
            ) : (
              <span>
                Mua thêm <strong className="text-forest">{formatVND(remainingForFree)}</strong> để nhận <strong>Miễn phí vận chuyển</strong>
              </span>
            )}
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-forest h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items Table */}
        <div className="bg-white border border-border-subtle rounded-sm overflow-hidden">
          <div className="p-4 border-b border-border-subtle flex justify-between items-center bg-ivory">
            <span className="font-serif text-sm font-semibold text-charcoal">
              Danh Sách Sản Phẩm ({totalItems})
            </span>
            <button
              onClick={clearCart}
              className="text-xs text-stone-500 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Xóa tất cả
            </button>
          </div>

          <div className="divide-y divide-border-subtle p-4 sm:p-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xs overflow-hidden bg-ivory shrink-0 border border-border-subtle">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link
                      href={`/san-pham/${item.slug}`}
                      className="font-serif text-sm sm:text-base font-semibold text-charcoal hover:text-forest transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted mt-0.5">{item.variantName}</p>
                    <p className="text-xs font-semibold text-forest sm:hidden mt-1">
                      {formatVND(item.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  {/* Quantity */}
                  <div className="flex items-center border border-border-subtle rounded-sm bg-stone-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-200 cursor-pointer"
                      aria-label="Giảm số lượng"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-charcoal">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.maxQuantity}
                      className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-200 disabled:opacity-30 cursor-pointer"
                      aria-label="Tăng số lượng"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[100px]">
                    <p className="text-sm font-bold text-forest">
                      {formatVND(item.price * item.quantity)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-[11px] text-muted">
                        {formatVND(item.price)} / sản phẩm
                      </p>
                    )}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                    aria-label={`Xóa ${item.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Note */}
        <div className="bg-white p-5 border border-border-subtle rounded-sm space-y-2">
          <label htmlFor="order-note" className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
            Ghi chú đơn hàng (nếu có):
          </label>
          <textarea
            id="order-note"
            rows={3}
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
            placeholder="Ví dụ: Vui lòng đo đúng chu vi cổ tay 16cm, đóng gói hộp quà biếu giúp tôi..."
            className="w-full text-xs p-3 rounded-sm bg-white border border-stone-300 hover:border-stone-400 text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Right Col: Summary & Checkout */}
      <div className="space-y-6">
        <div className="bg-white p-6 border border-border-subtle rounded-sm space-y-4 sticky top-24">
          <h3 className="font-serif text-lg font-bold text-charcoal pb-3 border-b border-border-subtle">
            Tóm Tắt Đơn Hàng
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted">Tổng tiền hàng:</span>
              <span className="font-semibold text-charcoal">{formatVND(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Phí vận chuyển:</span>
              <span className="font-semibold text-charcoal">
                {isFreeShipping ? (
                  <span className="text-emerald-700">Miễn phí</span>
                ) : (
                  formatVND(shippingFee)
                )}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-border-subtle flex justify-between items-baseline">
            <span className="text-sm font-bold text-charcoal">Tổng cộng:</span>
            <span className="font-serif text-2xl font-bold text-forest">
              {formatVND(total)}
            </span>
          </div>

          <p className="text-[11px] text-muted leading-relaxed italic">
            * Giá đã bao gồm thuế và chi phí đóng gói chống sốc an toàn. Quý khách được đồng kiểm trước khi nhận.
          </p>

          <Button
            href="/thanh-toan"
            variant="primary"
            size="lg"
            className="w-full font-serif shadow-md text-base"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Tiến Hành Đặt Hàng
          </Button>

          <div className="pt-2 text-center">
            <Link
              href="/san-pham"
              className="text-xs text-forest hover:underline font-semibold"
            >
              ← Tiếp tục mua sắm
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-border-subtle/70 space-y-2 text-[11px] text-stone-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-forest shrink-0" />
              <span>Cam kết 100% trầm tự nhiên chuẩn xuất xứ</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-forest shrink-0" />
              <span>Giao hàng hỏa tốc và đồng kiểm tận nơi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
