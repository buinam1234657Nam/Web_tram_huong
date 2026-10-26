"use client";

import React, { useMemo, useState } from "react";
import { encode } from "uqr";
import { Check, Copy, TriangleAlert } from "lucide-react";
import { bankAccount } from "@/lib/config/payment";
import { buildVietQrPayload } from "@/lib/payment/vietqr";
import { formatVND } from "@/lib/format/currency";
import { useMessages } from "@/i18n/client";
import { paymentMessages } from "@/i18n/messages/payment";

/**
 * Account, amount and reference for a bank transfer, with copy buttons and a
 * VietQR code that pre-fills all three in any Vietnamese banking app.
 */
export function BankTransferDetails({
  amount,
  reference,
  className = "",
}: {
  amount: number;
  /** The order code, e.g. "VT12345678". */
  reference: string;
  className?: string;
}) {
  const t = useMessages(paymentMessages);
  const formattedAmount = formatVND(amount);

  return (
    <div className={className}>
      {bankAccount.isSample && (
        <p className="mb-4 flex gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-800">
          <TriangleAlert className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          {t.sampleWarning}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-start">
        <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-sm sm:text-[15px] items-center">
          <dt className="text-muted">{t.bank}</dt>
          <dd className="text-charcoal">{bankAccount.bankName}</dd>

          <dt className="text-muted">{t.accountNumber}</dt>
          <dd className="flex items-center gap-2 text-charcoal font-semibold tracking-wide">
            {bankAccount.accountNumber}
            <CopyButton value={bankAccount.accountNumber} label={t.accountNumber} />
          </dd>

          <dt className="text-muted">{t.accountHolder}</dt>
          <dd className="text-charcoal">{bankAccount.accountName}</dd>

          <dt className="text-muted">{t.amount}</dt>
          <dd className="flex items-center gap-2 text-charcoal font-semibold">
            {formattedAmount}
            <CopyButton value={String(Math.round(amount))} label={t.amount} />
          </dd>

          <dt className="text-muted">{t.reference}</dt>
          <dd className="flex items-center gap-2 text-agarwood font-semibold tracking-wide">
            {reference}
            <CopyButton value={reference} label={t.reference} />
          </dd>
        </dl>

        <figure className="justify-self-center sm:justify-self-end text-center">
          <VietQrCode
            amount={amount}
            reference={reference}
            label={t.qrAlt(formattedAmount, reference)}
          />
          <figcaption className="mt-2 text-xs text-muted">{t.qrCaption}</figcaption>
        </figure>
      </div>
      <p className="mt-4 text-sm text-muted leading-relaxed">{t.referenceHint}</p>
    </div>
  );
}

function VietQrCode({
  amount,
  reference,
  label,
}: {
  amount: number;
  reference: string;
  label: string;
}) {
  const { path, size } = useMemo(() => {
    const payload = buildVietQrPayload({
      bin: bankAccount.bin,
      accountNumber: bankAccount.accountNumber,
      amount,
      reference,
    });
    const { data } = encode(payload, { ecc: "M", border: 2 });
    // One path of 1×1 squares keeps the SVG small and crisp at any size.
    let d = "";
    data.forEach((row, y) =>
      row.forEach((dark, x) => {
        if (dark) d += `M${x} ${y}h1v1h-1z`;
      }),
    );
    return { path: d, size: data.length };
  }, [amount, reference]);

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${size} ${size}`}
      shapeRendering="crispEdges"
      className="w-40 h-40 rounded-lg bg-white"
    >
      <path d={path} fill="#1D1611" />
    </svg>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const t = useMessages(paymentMessages);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions); the value stays visible to copy by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={t.copyLabel(label)}
      className="inline-flex items-center gap-1 h-7 px-2 rounded-md border border-gold/40 text-xs font-medium text-agarwood hover:bg-cream-dark transition-colors cursor-pointer"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5" aria-hidden="true" />
      ) : (
        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? t.copied : t.copy}</span>
    </button>
  );
}
