"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Controller,
  useForm,
  useWatch,
  type FieldError,
  type FieldErrors,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Loader2, PhoneCall } from "lucide-react";
import Link from "@/components/i18n/Link";
import { useCartStore } from "@/features/cart/useCartStore";
import { saveOrder } from "@/features/cart/orderStorage";
import { createOrderCode } from "@/features/cart/orderCode";
import { applyDiscountCode } from "@/features/cart/discount";
import {
  checkoutFormSchema,
  type CheckoutFormData,
  type CheckoutFormInput,
} from "@/data/schemas/checkout";
import { provinces, wardsOf } from "@/data/address";
import { formatVND } from "@/lib/format/currency";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";
import { Button } from "@/components/ui/Button";
import { AddressCombobox } from "@/components/checkout/AddressCombobox";
import { BankTransferDetails } from "@/components/checkout/BankTransferDetails";
import { inputClass } from "@/components/checkout/fieldStyles";
import type { Order, PaymentMethod } from "@/types/order";
import { useLocalizePath, useMessages } from "@/i18n/client";
import { checkoutMessages } from "@/i18n/messages/checkout";

interface VerifiedCartResponse {
  valid: boolean;
  errors: string[];
  items: Array<{
    id: string;
    productId: string;
    variantId: string;
    name: string;
    variantName: string;
    price: number;
    quantity: number;
    image: string;
    subtotal: number;
  }>;
  subtotal: number;
  shippingFee: number;
  total: number;
}

const PAYMENT_OPTIONS: PaymentMethod[] = ["cod", "bank_transfer"];

/** On-page order of the fields, so a failed submit scrolls to the topmost error. */
const FIELD_ORDER: Array<keyof CheckoutFormInput> = [
  "fullName",
  "phone",
  "email",
  "province",
  "ward",
  "streetAddress",
  "note",
];

const fieldId = (name: keyof CheckoutFormInput) => `checkout-${name}`;

type CheckoutText = (typeof checkoutMessages)["vi"];

/**
 * The zod schema (shared with /api/orders) carries Vietnamese messages; the
 * form shows the localized copy for the field that failed instead.
 */
function fieldError(
  t: CheckoutText,
  field: keyof CheckoutFormInput,
  error: FieldError | undefined,
): string | undefined {
  if (!error) return undefined;
  switch (field) {
    case "fullName":
      return error.type === "too_big" ? t.errors.fullNameMax : t.errors.fullNameMin;
    case "paymentMethod":
      return error.message;
    default:
      return t.errors[field];
  }
}

export function CheckoutForm() {
  const router = useRouter();
  const localize = useLocalizePath();
  const t = useMessages(checkoutMessages);
  const { items, clearCart } = useCartStore();

  const [isLoadingVerification, setIsLoadingVerification] = useState(true);
  const [verifiedData, setVerifiedData] = useState<VerifiedCartResponse | null>(
    null,
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // A ref as well as state: two quick taps can land before the re-render disables the button.
  const submittingRef = useRef(false);
  const [placedOrderCode, setPlacedOrderCode] = useState<string | null>(null);
  // Known before ordering because it is the transfer reference inside the VietQR.
  const [orderCode] = useState(createOrderCode);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<CheckoutFormInput, unknown, CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    // Validate a field when the shopper leaves it, then live while they fix it.
    mode: "onTouched",
    shouldFocusError: false,
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      province: "",
      ward: "",
      streetAddress: "",
      note: "",
      paymentMethod: "cod",
    },
  });

  const selectedPaymentMethod = useWatch({ control, name: "paymentMethod" });
  const selectedProvince = useWatch({ control, name: "province" });

  // Re-verify prices and stock against the catalog
  useEffect(() => {
    async function verify() {
      if (items.length === 0) {
        setIsLoadingVerification(false);
        return;
      }

      try {
        const res = await fetch("/api/validate-cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({
              productId: i.productId,
              variantId: i.variantId,
              quantity: i.quantity,
            })),
          }),
        });
        const data = await res.json();
        setVerifiedData(data);
      } catch {
        setServerError(t.verifyConnectionError);
      } finally {
        setIsLoadingVerification(false);
      }
    }

    verify();
  }, [items, t]);

  const onSubmit = async (formData: CheckoutFormData) => {
    if (submittingRef.current || !verifiedData || verifiedData.items.length === 0)
      return;

    submittingRef.current = true;
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, items: verifiedData.items, orderCode }),
      });
      const result: { success: boolean; order?: Order; error?: string } =
        await res.json();

      if (result.success && result.order) {
        saveOrder(result.order);
        setPlacedOrderCode(result.order.code);
        // Only the order code goes in the URL; details come from sessionStorage.
        router.push(
          localize(
            `/dat-hang/thanh-cong?orderCode=${encodeURIComponent(result.order.code)}`,
          ),
        );
        clearCart();
      } else {
        setServerError(result.error || t.orderFailed);
        submittingRef.current = false;
        setIsSubmitting(false);
      }
    } catch {
      setServerError(t.orderConnectionError);
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const onInvalid = (invalid: FieldErrors<CheckoutFormInput>) => {
    const first = FIELD_ORDER.find((name) => invalid[name]);
    if (!first) return;
    const el = document.getElementById(fieldId(first));
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Centered so the sticky header doesn't hide the field.
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    el.focus({ preventScroll: true });
  };

  if (placedOrderCode) {
    return (
      <div className="py-24 flex flex-col items-center gap-3 text-muted">
        <Loader2 className="w-6 h-6 animate-spin text-espresso" />
        <p className="text-[15px]">{t.openingOrder(placedOrderCode)}</p>
      </div>
    );
  }

  if (isLoadingVerification) {
    return (
      <div className="py-24 flex flex-col items-center gap-3 text-muted">
        <Loader2 className="w-6 h-6 animate-spin text-espresso" />
        <p className="text-[15px]">{t.verifying}</p>
      </div>
    );
  }

  if (items.length === 0 || !verifiedData || verifiedData.items.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-agarwood">
          {t.emptyTitle}
        </h2>
        <p className="mt-3 text-[15px] text-muted leading-relaxed">
          {t.emptyBody}
        </p>
        <div className="mt-8">
          <Button href="/san-pham">{t.browseProducts}</Button>
        </div>
      </div>
    );
  }

  // Same count as the header bag badge: total pieces, not distinct lines.
  const totalQuantity = verifiedData.items.reduce((n, i) => n + i.quantity, 0);
  const total = verifiedData.total;
  const paymentLine = t.payingWith(t.paymentShort[selectedPaymentMethod]);
  const submitLabel = isSubmitting ? t.placingOrder : t.placeOrder;

  return (
    <form
      onSubmit={(e) => handleSubmit(onSubmit, onInvalid)(e)}
      noValidate
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-24 lg:pb-0"
    >
      <div className="order-2 lg:order-1 lg:col-span-7 space-y-12">
        {verifiedData.errors && verifiedData.errors.length > 0 && (
          <div className="rounded-lg bg-cream-dark/50 px-5 py-4 text-sm text-charcoal">
            <p className="font-medium">{t.cartAdjusted}</p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-muted">
              {verifiedData.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {serverError && (
          <p
            role="alert"
            className="rounded-lg bg-rose-50 px-5 py-4 text-sm text-rose-700"
          >
            {serverError}
          </p>
        )}

        <section aria-labelledby="checkout-shipping">
          <h2
            id="checkout-shipping"
            className="text-xl font-semibold text-charcoal"
          >
            {t.shippingHeading}
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
            <Field
              label={t.fields.fullName.label}
              required
              error={fieldError(t, "fullName", errors.fullName)}
              registration={register("fullName")}
              placeholder={t.fields.fullName.placeholder}
              autoComplete="name"
            />
            <Field
              label={t.fields.phone.label}
              required
              type="tel"
              inputMode="tel"
              error={fieldError(t, "phone", errors.phone)}
              registration={register("phone")}
              placeholder={t.fields.phone.placeholder}
              autoComplete="tel"
            />
            <Field
              label={t.fields.email.label}
              type="email"
              inputMode="email"
              className="sm:col-span-2"
              hint={t.fields.email.hint}
              error={fieldError(t, "email", errors.email)}
              registration={register("email")}
              placeholder={t.fields.email.placeholder}
              autoComplete="email"
            />
            <Controller
              name="province"
              control={control}
              render={({ field, fieldState }) => (
                <AddressCombobox
                  id={fieldId("province")}
                  label={t.fields.province.label}
                  required
                  value={field.value}
                  options={provinces}
                  onChange={(name) => {
                    if (name === field.value) return;
                    field.onChange(name);
                    // A ward only exists inside its province.
                    setValue("ward", "");
                    clearErrors("ward");
                  }}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  placeholder={t.fields.province.placeholder}
                  noResults={t.fields.province.noResults}
                  error={fieldError(t, "province", fieldState.error)}
                />
              )}
            />
            <Controller
              name="ward"
              control={control}
              render={({ field, fieldState }) => (
                <AddressCombobox
                  id={fieldId("ward")}
                  label={t.fields.ward.label}
                  required
                  value={field.value}
                  options={wardsOf(selectedProvince)}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  disabled={!selectedProvince}
                  placeholder={
                    selectedProvince
                      ? t.fields.ward.placeholder
                      : t.fields.ward.placeholderDisabled
                  }
                  noResults={t.fields.ward.noResults}
                  error={fieldError(t, "ward", fieldState.error)}
                />
              )}
            />
            <Field
              label={t.fields.streetAddress.label}
              required
              className="sm:col-span-2"
              error={fieldError(t, "streetAddress", errors.streetAddress)}
              registration={register("streetAddress")}
              placeholder={t.fields.streetAddress.placeholder}
              autoComplete="street-address"
            />
            <div className="sm:col-span-2">
              <label
                htmlFor={fieldId("note")}
                className="block text-sm font-medium text-charcoal mb-2"
              >
                {t.fields.note.label}
              </label>
              <textarea
                id={fieldId("note")}
                rows={3}
                {...register("note")}
                placeholder={t.fields.note.placeholder}
                className={`${inputClass(Boolean(errors.note))} py-3`}
              />
              {errors.note && (
                <p className="mt-1.5 text-sm text-rose-600">
                  {fieldError(t, "note", errors.note)}
                </p>
              )}
            </div>
          </div>
        </section>

        <section aria-labelledby="checkout-payment">
          <h2
            id="checkout-payment"
            className="text-xl font-semibold text-charcoal"
          >
            {t.paymentHeading}
          </h2>

          <div className="mt-6 space-y-3">
            {PAYMENT_OPTIONS.map((method) => {
              const isSelected = selectedPaymentMethod === method;
              const option = t.payment[method];
              return (
                <div
                  key={method}
                  className={`rounded-lg border transition-colors ${
                    isSelected
                      ? "border-agarwood/60 bg-cream-dark/40"
                      : "border-gold/30 hover:border-gold/60"
                  }`}
                >
                  <label className="flex items-start gap-4 p-5 cursor-pointer">
                    <input
                      type="radio"
                      value={method}
                      {...register("paymentMethod")}
                      className="mt-1 w-4 h-4 accent-agarwood"
                    />
                    <span>
                      <span className="block text-[15px] font-medium text-charcoal">
                        {option.title}
                      </span>
                      <span className="block mt-0.5 text-sm text-muted">
                        {option.description}
                      </span>
                      {method === "cod" && (
                        <span className="mt-1.5 flex items-center gap-1.5 text-sm text-agarwood">
                          <PhoneCall className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          {option.note}
                        </span>
                      )}
                    </span>
                  </label>

                  <AnimatePresence initial={false}>
                    {isSelected && method === "bank_transfer" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: MOTION_EASE }}
                        className="overflow-hidden"
                      >
                        <div className="mx-5 mb-5 rounded-lg bg-cream-dark/50 px-5 py-5">
                          <p className="mb-4 text-sm text-charcoal/80 leading-relaxed">
                            {option.note}
                          </p>
                          <BankTransferDetails amount={total} reference={orderCode} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Phones: the button lives in the bottom bar, the fine print stays in the flow */}
        <div className="lg:hidden space-y-3 text-sm text-muted leading-relaxed">
          <LegalNote t={t} />
          <p>{t.reassurance}</p>
        </div>
      </div>

      {/* Order summary: first on phones (collapsed), sticky sidebar from lg up */}
      <aside className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-[calc(var(--header-h)+2rem)] rounded-2xl border border-gold/25 bg-cream-dark/40 p-5 sm:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold text-agarwood">
            {t.orderSummary(totalQuantity)}
          </h2>
          <Link
            href="/gio-hang"
            className="shrink-0 text-sm text-gold-dark underline underline-offset-4 hover:text-agarwood"
          >
            {t.editCart}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsSummaryOpen((v) => !v)}
          aria-expanded={isSummaryOpen}
          aria-controls="checkout-summary-details"
          className="lg:hidden mt-3 w-full flex items-center justify-between gap-3 text-[15px] cursor-pointer"
        >
          <span className="flex items-center gap-1.5 text-charcoal">
            {isSummaryOpen ? t.hideSummary : t.showSummary}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isSummaryOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </span>
          <span className="font-semibold text-agarwood">{formatVND(total)}</span>
        </button>

        <div
          id="checkout-summary-details"
          className={`${isSummaryOpen ? "block" : "hidden"} lg:block`}
        >
          <ul className="mt-6 space-y-4 max-h-80 overflow-y-auto">
            {verifiedData.items.map((item) => (
              <li key={item.id} className="flex items-start gap-4">
                <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-lg bg-cream">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover mix-blend-multiply"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium text-charcoal line-clamp-2">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-sm text-muted truncate">
                    {item.variantName}
                  </p>
                  <p className="text-sm text-muted">
                    {t.unitPrice(formatVND(item.price), item.quantity)}
                  </p>
                </div>
                <p className="text-[15px] font-medium text-charcoal shrink-0">
                  {formatVND(item.subtotal)}
                </p>
              </li>
            ))}
          </ul>

          <DiscountCode t={t} />

          <dl className="mt-6 pt-6 border-t border-border-dark/10 space-y-2 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-muted">{t.subtotal}</dt>
              <dd className="text-charcoal">
                {formatVND(verifiedData.subtotal)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{t.shipping}</dt>
              <dd className="text-charcoal">
                {verifiedData.shippingFee === 0
                  ? t.free
                  : formatVND(verifiedData.shippingFee)}
              </dd>
            </div>
            <div className="flex justify-between items-baseline pt-4 mt-2 border-t border-border-dark/10">
              <dt className="font-medium text-charcoal">{t.total}</dt>
              <dd className="text-2xl font-semibold text-agarwood">
                {formatVND(total)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="hidden lg:block">
          <p className="mt-8 text-sm text-charcoal">{paymentLine}</p>
          <Button
            type="submit"
            size="lg"
            className="mt-3 w-full"
            isLoading={isSubmitting}
          >
            {submitLabel}
          </Button>
          <div className="mt-4 space-y-2 text-sm text-muted text-center leading-relaxed">
            <LegalNote t={t} />
            <p>{t.reassurance}</p>
          </div>
        </div>
      </aside>

      {/* Phones and tablets: total and the order button stay in reach */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-cream/95 backdrop-blur-sm px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted truncate">{paymentLine}</p>
            <p className="text-lg font-semibold text-agarwood">{formatVND(total)}</p>
          </div>
          <Button type="submit" isLoading={isSubmitting} className="shrink-0 h-12">
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}

function LegalNote({ t }: { t: CheckoutText }) {
  // New tab so the filled-in form survives a look at the policy.
  const link = "text-charcoal underline underline-offset-4 hover:text-agarwood";
  return (
    <p>
      {t.legal.before}
      <Link
        href="/chinh-sach/chinh-sach-doi-tra"
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        {t.legal.returns}
      </Link>
      {t.legal.and}
      <Link
        href="/chinh-sach/chinh-sach-bao-mat"
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        {t.legal.privacy}
      </Link>
      {t.legal.after}
    </p>
  );
}

function DiscountCode({ t }: { t: CheckoutText }) {
  const [code, setCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

  const apply = async () => {
    const trimmed = code.trim();
    if (!trimmed) {
      setMessage({ ok: false, text: t.discount.empty });
      return;
    }
    setIsChecking(true);
    const result = await applyDiscountCode(trimmed);
    setIsChecking(false);
    setMessage(
      result.ok
        ? { ok: true, text: t.discount.applied(result.code) }
        : { ok: false, text: t.discount.invalid },
    );
  };

  return (
    <div className="mt-6 pt-6 border-t border-border-dark/10">
      <label
        htmlFor="checkout-discount"
        className="block text-sm font-medium text-charcoal mb-2"
      >
        {t.discount.label}
      </label>
      <div className="flex gap-2">
        <input
          id="checkout-discount"
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setMessage(null);
          }}
          onKeyDown={(e) => {
            // Enter applies the code instead of placing the order.
            if (e.key === "Enter") {
              e.preventDefault();
              apply();
            }
          }}
          placeholder={t.discount.placeholder}
          autoComplete="off"
          aria-describedby={message ? "checkout-discount-message" : undefined}
          className={`${inputClass(false)} h-11 flex-1 min-w-0`}
        />
        <button
          type="button"
          onClick={apply}
          disabled={isChecking}
          className="shrink-0 h-11 px-5 rounded-lg border border-agarwood/50 text-sm font-medium text-agarwood hover:bg-agarwood hover:text-white disabled:opacity-50 transition-colors cursor-pointer"
        >
          {t.discount.apply}
        </button>
      </div>
      {message && (
        <p
          id="checkout-discount-message"
          role="status"
          className={`mt-1.5 text-sm ${message.ok ? "text-agarwood" : "text-rose-600"}`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}

function Field({
  label,
  required = false,
  type = "text",
  inputMode,
  className = "",
  hint,
  error,
  registration,
  placeholder,
  autoComplete,
}: {
  label: string;
  required?: boolean;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  className?: string;
  hint?: string;
  error?: string;
  registration: UseFormRegisterReturn;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `checkout-${registration.name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-charcoal mb-2"
      >
        {label}
        {required && <span className="text-rose-600"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        {...registration}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`${inputClass(Boolean(error))} h-12`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-rose-600">
          {error}
        </p>
      )}
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
