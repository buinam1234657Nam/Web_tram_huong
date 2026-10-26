"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Email signup on a dark background. `line` is an underlined field with an
 * arrow (home showroom band); `pill` is a filled field with a gold button (footer).
 */
export function NewsletterForm({
  className = "",
  variant = "line",
}: {
  className?: string;
  variant?: "line" | "pill";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message || "Đăng ký thành công!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch {
      setStatus("error");
      setMessage("Không thể kết nối đến máy chủ, vui lòng thử lại sau.");
    }
  };

  const feedback = (
    <>
      {status === "success" && <p className="mt-2 text-xs text-gold-light">{message}</p>}
      {status === "error" && <p className="mt-2 text-xs text-rose-300">{message}</p>}
    </>
  );

  if (variant === "pill") {
    return (
      <form onSubmit={handleSubscribe} className={className}>
        <div className="flex items-center gap-1 rounded-full bg-white/6 border border-gold/25 p-1 pl-5 focus-within:border-gold transition-colors">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
            required
            aria-label="Địa chỉ email"
            className="flex-1 min-w-0 bg-transparent py-2.5 text-white placeholder-white/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 h-10 px-6 rounded-full bg-gold text-espresso-dark text-sm font-semibold hover:bg-gold-light transition-colors disabled:opacity-50 cursor-pointer"
          >
            Đăng ký
          </button>
        </div>
        {feedback}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className={className}>
      <div className="flex border-b border-white/30 focus-within:border-gold transition-colors">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Địa chỉ email"
          required
          aria-label="Địa chỉ email"
          className="flex-1 min-w-0 bg-transparent py-3 text-white placeholder-white/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="p-3 text-white hover:text-gold-light transition-colors disabled:opacity-50 cursor-pointer"
          aria-label="Đăng ký nhận tin"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      {feedback}
    </form>
  );
}
