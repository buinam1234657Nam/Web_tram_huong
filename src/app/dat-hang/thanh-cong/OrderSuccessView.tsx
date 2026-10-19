"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, PhoneCall, ArrowRight, ShieldCheck } from "lucide-react";
import { formatVND } from "@/lib/format/currency";
import { brandConfig } from "@/lib/config/brand";
import { Button } from "@/components/ui/Button";

export function OrderSuccessView() {
  const searchParams = useSearchParams();
  const orderCode = searchParams.get("orderCode");
  const total = searchParams.get("total");
  const name = searchParams.get("name");

  if (!orderCode) {
    return (
      <div className="bg-white border border-border-subtle p-8 rounded text-center max-w-lg mx-auto space-y-4">
        <h2 className="font-serif text-xl font-bold text-charcoal">
          Không tìm thấy thông tin đơn hàng
        </h2>
        <p className="text-xs text-muted leading-relaxed">
          Quý khách chưa có đơn hàng nào vừa hoàn tất hoặc liên kết đã hết hiệu lực.
        </p>
        <Button variant="primary" size="md">
          <Link href="/san-pham">Quay lại mua sắm</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white border border-border-subtle rounded-sm p-6 sm:p-10 space-y-8 shadow-xs">
      {/* Top Banner */}
      <div className="text-center space-y-3 pb-6 border-b border-border-subtle">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase font-semibold text-agarwood-dark tracking-widest block">
          Đơn Hàng Đã Được Ghi Nhận
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
          Cảm Ơn Quý Khách{name ? ` ${name}` : ""}!
        </h1>
        <p className="text-xs sm:text-sm text-muted max-w-lg mx-auto leading-relaxed">
          Yêu cầu đặt mua tác phẩm trầm hương của Quý khách đã được gửi tới hệ thống chăm sóc khách hàng của VĨNH TRẦM.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="bg-ivory p-6 rounded-sm border border-border-subtle space-y-3 text-xs sm:text-sm">
        <div className="flex justify-between items-center pb-2 border-b border-border-subtle/80">
          <span className="text-muted">Mã tham chiếu đơn hàng:</span>
          <strong className="font-mono text-base text-forest tracking-wider">
            {orderCode}
          </strong>
        </div>

        {total && (
          <div className="flex justify-between items-center pb-2 border-b border-border-subtle/80">
            <span className="text-muted">Tổng tiền thanh toán dự kiến:</span>
            <strong className="text-base text-forest font-serif">
              {formatVND(Number(total))}
            </strong>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-muted">Trạng thái vận chuyển:</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Chờ chuyên viên gọi xác nhận
          </span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="space-y-4">
        <h3 className="font-serif text-base font-semibold text-charcoal">
          Quy Trình Tiếp Nhận & Giao Hàng
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded bg-stone-50 border border-border-subtle space-y-1">
            <span className="font-bold text-forest block">Bước 1: Tiếp nhận</span>
            <p className="text-muted">Hệ thống ghi nhận đơn và chuẩn bị phôi trầm theo kích thước yêu cầu.</p>
          </div>
          <div className="p-4 rounded bg-stone-50 border border-border-subtle space-y-1">
            <span className="font-bold text-forest block">Bước 2: Gọi tư vấn</span>
            <p className="text-muted">Chuyên viên liên hệ số điện thoại của Quý khách để xác nhận size và thời gian giao.</p>
          </div>
          <div className="p-4 rounded bg-stone-50 border border-border-subtle space-y-1">
            <span className="font-bold text-forest block">Bước 3: Giao & Đồng kiểm</span>
            <p className="text-muted">Bưu tá phát tận tay, Quý khách được mở hộp kiểm tra hương thơm trước khi nhận.</p>
          </div>
        </div>
      </div>

      {/* Demo Disclosure Box */}
      <div className="bg-amber-50/70 border border-amber-200 p-4 rounded text-xs text-amber-900 space-y-1">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Thông Báo Môi Trường Trình Diễn (Storefront Showcase)</span>
        </div>
        <p className="leading-relaxed">
          Đây là đơn hàng mô phỏng đã được backend API ghi nhận mã số thực tế. Trong môi trường hoạt động chính thức, đơn hàng sẽ được tích hợp với hệ thống ERP/kho vận tự động.
        </p>
      </div>

      {/* Hotline Support & Action */}
      <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-muted">
          <PhoneCall className="w-4 h-4 text-forest" />
          <span>
            Hỗ trợ gấp: <strong className="text-charcoal">{brandConfig.contact.phoneFormatted}</strong>
          </span>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="primary" size="md" className="w-full sm:w-auto">
            <Link href="/san-pham" className="flex items-center gap-1.5">
              <span>Tiếp tục khám phá</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
