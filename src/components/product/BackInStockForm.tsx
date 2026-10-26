"use client";

import React, { useState } from "react";
import { BellRing } from "lucide-react";
import { useMessages } from "@/i18n/client";
import { productMessages } from "@/i18n/messages/product";

/**
 * Replaces the disabled "Hết hàng" button: the shopper leaves a phone number
 * or email and gets told when the item is back.
 */
export function BackInStockForm({
  productId,
  variantId,
}: {
  productId: string;
  variantId: string;
}) {
  const t = useMessages(productMessages);
  const [isOpen, setIsOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/back-in-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, variantId, contact }),
      });
      const data = await res.json();
      // The API answers in Vietnamese; show our own copy in the visitor's language.
      setStatus(data.success ? "success" : "error");
      setMessage(data.success ? t.bisSuccess : res.status >= 500 ? t.bisNetworkError : t.bisInvalid);
    } catch {
      setStatus("error");
      setMessage(t.bisNetworkError);
    }
  };

  if (status === "success") {
    return (
      <p
        role="status"
        className="rounded-2xl border border-gold/40 bg-cream-dark/40 px-5 py-4 text-[15px] text-charcoal"
      >
        {message}
      </p>
    );
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full h-14 rounded-full bg-espresso text-white text-[15px] font-medium hover:bg-espresso-light transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
      >
        <BellRing className="w-4 h-4" />
        {t.notifyMe}
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border-subtle p-4 sm:p-5"
    >
      <label
        htmlFor="back-in-stock-contact"
        className="block text-[15px] font-medium text-charcoal"
      >
        {t.bisContactLabel}
      </label>
      <p className="mt-1 text-sm text-muted">
        {t.bisIntro}
      </p>
      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <input
          id="back-in-stock-contact"
          type="text"
          inputMode="email"
          autoComplete="email"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder={t.bisPlaceholder}
          className="flex-1 min-w-0 h-12 rounded-full border border-border-subtle px-5 text-[15px] text-charcoal placeholder:text-muted-light focus:outline-none focus:border-charcoal"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-12 px-6 rounded-full bg-espresso text-white text-[15px] font-medium hover:bg-espresso-light transition-colors disabled:opacity-50 cursor-pointer"
        >
          {t.bisSubmit}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-rose-700">{message}</p>
      )}
    </form>
  );
}
