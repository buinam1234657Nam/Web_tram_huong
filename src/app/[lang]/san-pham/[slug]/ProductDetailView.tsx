"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_RISE,
} from "@/components/motion/MotionPrimitives";
import { Product, ProductSummary, ProductVariant } from "@/types/product";
import { Review } from "@/types/review";
import { formatVND, calculateDiscountPercentage } from "@/lib/format/currency";
import { profileRows } from "@/lib/format/agarwood";
import { useCartStore } from "@/features/cart/useCartStore";
import { StarRating } from "@/components/ui/StarRating";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { SinksBadge } from "@/components/product/AgarwoodChips";
import { BackInStockForm } from "@/components/product/BackInStockForm";
import { brandConfig } from "@/lib/config/brand";
import { AuthenticitySigns } from "@/components/product/AuthenticitySigns";
import { careGuideFor } from "@/data/content/product-guides";
import { useLocale, useLocalizePath, useMessages } from "@/i18n/client";
import { productMessages } from "@/i18n/messages/product";

/** From this price up, offer a one-to-one Zalo consultation next to the cart buttons. */
const CONSULT_MIN_PRICE = 5_000_000;

const STAGGER_ITEM = {
  hidden: { opacity: 0, y: MOTION_RISE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION, ease: MOTION_EASE },
  },
};

export function ProductDetailView({
  product,
  relatedProducts,
  reviews,
  faq,
}: {
  product: Product;
  relatedProducts: ProductSummary[];
  reviews: Review[];
  faq: Array<{ question: string; answer: string }>;
}) {
  const router = useRouter();
  const locale = useLocale();
  const localize = useLocalizePath();
  const t = useMessages(productMessages);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0],
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const price = selectedVariant.price;
  const compareAtPrice = selectedVariant.compareAtPrice;
  const discount = calculateDiscountPercentage(price, compareAtPrice);
  const isOutOfStock = selectedVariant.inventoryStatus === "out_of_stock";
  const images =
    product.images.length > 0 ? product.images : ["/images/hero-agarwood.jpg"];
  const isBracelet = product.categorySlug === "vong-tay-tram-huong";
  const profile = product.agarwoodProfile;
  const profileTable = profileRows(profile, locale);
  // Spec labels come from the (Vietnamese) product data; only the two fixed rows are translated.
  const specRows = [
    { label: t.specOrigin, value: product.origin },
    { label: t.specHarvest, value: product.harvestMethod },
    ...product.specifications,
  ].filter((row) => row.value);

  const showImage = (idx: number) =>
    setActiveImageIndex((idx + images.length) % images.length);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, 1);
    router.push(localize("/thanh-toan"));
  };

  const trustPoints = [
    t.shippingFree(formatVND(brandConfig.policies.freeShippingThreshold)),
    t.shippingInspect,
    t.shippingReturns(brandConfig.policies.returnDays),
    t.shippingWarranty,
  ];

  // The second photo sits beside the description; one-photo products skip it.
  const detailImage = images[1];
  const tabs: ProductTab[] = [
    {
      id: "mo-ta",
      label: t.description,
      content: (
        <div
          className={
            detailImage
              ? "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
              : "max-w-3xl"
          }
        >
          <div>
            {product.storyLine && (
              <h2 className="mb-5 text-2xl sm:text-3xl font-semibold text-espresso leading-snug">
                {product.storyLine}
              </h2>
            )}
            <p className="whitespace-pre-line">{product.description}</p>
          </div>
          {detailImage && (
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-cream-dark lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <Image
                src={detailImage}
                alt={t.imageAlt(product.name, 2)}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      ),
    },
  ];
  if (product.scentProfile) {
    tabs.push({
      id: "huong-thom",
      label: t.scent,
      content: (
        <DetailList
          rows={[
            { label: t.scentIntensity, value: product.scentProfile.intensity },
            { label: t.scentNotes, value: product.scentProfile.notes.join(", ") },
            { label: t.scentLongevity, value: product.scentProfile.longevity },
          ]}
        />
      ),
    });
  }
  tabs.push(
    {
      id: "thong-so",
      label: t.specs,
      content: (
        <DetailList
          rows={[...specRows, { label: t.sku, value: selectedVariant.sku }]}
        />
      ),
    },
    {
      id: "nhan-biet",
      label: t.authenticity,
      content: (
        <div className="max-w-3xl">
          <AuthenticitySigns variant="list" />
          <Link
            href="/hieu-ve-tram"
            className="mt-6 inline-flex items-center gap-0.5 text-gold-dark hover:underline underline-offset-4"
          >
            {t.authenticityMore}
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      ),
    },
    {
      id: "bao-quan",
      label: t.care,
      content: (
        <ul className="max-w-3xl list-disc pl-5 space-y-2">
          {careGuideFor(product.categorySlug, locale).map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "danh-gia",
      label: t.reviews(reviews.length),
      content:
        reviews.length > 0 ? (
          <div className="max-w-3xl divide-y divide-border-subtle">
            {reviews.map((rev) => (
              <div key={rev.id} className="py-6 first:pt-0">
                <StarRating rating={rev.rating} showScore={false} size="sm" />
                <p className="mt-2 font-medium text-charcoal">{rev.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {rev.authorName} · {rev.date}
                </p>
                <p className="mt-2">{rev.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">{t.noReviews}</p>
        ),
    },
  );

  return (
    <div>
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 grid grid-cols-1 lg:grid-cols-[minmax(0,800px)_minmax(0,440px)] lg:justify-center gap-8 lg:gap-14 xl:gap-20 items-start">
        {/* Gallery: vertical thumbnails + main image */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : MOTION_RISE }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION_DURATION, ease: MOTION_EASE }}
          className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] flex flex-col-reverse sm:flex-row gap-3"
        >
          {images.length > 1 && (
            <div className="flex sm:flex-col gap-2.5 shrink-0">
              {images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onMouseEnter={() => showImage(idx)}
                  onClick={() => showImage(idx)}
                  className={`relative w-16 h-16 sm:w-18 sm:h-18 overflow-hidden rounded-xl border-2 bg-cream cursor-pointer transition-all duration-300 ${
                    activeImageIndex === idx
                      ? "border-espresso"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={t.viewImage(idx + 1)}
                  aria-current={activeImageIndex === idx}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="72px"
                    className="object-cover mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="relative flex-1 aspect-square bg-cream overflow-hidden rounded-2xl">
            {/* Plain crossfade between gallery images */}
            <AnimatePresence initial={false}>
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: MOTION_EASE }}
                className="absolute inset-0 bg-cream"
              >
                <Image
                  src={images[activeImageIndex]}
                  alt={t.imageAlt(product.name, activeImageIndex + 1)}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-cover mix-blend-multiply"
                />
              </motion.div>
            </AnimatePresence>
            {profile.sinksInWater && (
              <SinksBadge className="absolute left-4 top-4" />
            )}
            {images.length > 1 && (
              <div className="absolute right-4 bottom-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => showImage(activeImageIndex - 1)}
                  className="w-9 h-9 rounded-full bg-cream/90 border border-gold/30 flex items-center justify-center text-charcoal hover:bg-cream-dark cursor-pointer"
                  aria-label={t.prevImage}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => showImage(activeImageIndex + 1)}
                  className="w-9 h-9 rounded-full bg-cream/90 border border-gold/30 flex items-center justify-center text-charcoal hover:bg-cream-dark cursor-pointer"
                  aria-label={t.nextImage}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Buy box: blocks cascade in on load */}
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.15 },
            },
          }}
        >
          <motion.div variants={STAGGER_ITEM}>
            {product.bestseller && (
              <p className="text-[15px] font-medium text-gold-dark mb-2">
                {t.bestseller}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl font-semibold text-espresso leading-tight tracking-tight">
              {product.name}
            </h1>
          </motion.div>

          <motion.div
            variants={STAGGER_ITEM}
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            <p className="text-3xl font-bold text-agarwood tracking-tight">
              {formatVND(price)}
            </p>
            {compareAtPrice && compareAtPrice > price && (
              <p className="text-base text-muted-light line-through">
                {formatVND(compareAtPrice)}
              </p>
            )}
            {discount && (
              <p
                className="px-2 py-0.5 rounded-md bg-mahogany text-xs font-semibold text-white"
                aria-label={t.discount(discount)}
              >
                -{discount}%
              </p>
            )}
          </motion.div>

          <motion.p
            variants={STAGGER_ITEM}
            className="mt-5 text-[15px] text-charcoal/80 leading-relaxed"
          >
            {product.shortDescription}
          </motion.p>

          {/* Hồ sơ trầm: only confirmed facts; the whole block hides when none are */}
          {(profileTable.length > 0 || profile.treatment) && (
            <motion.section
              variants={STAGGER_ITEM}
              aria-labelledby="ho-so-tram"
              className="mt-6 rounded-2xl border border-gold/30 bg-cream-dark/30 p-5"
            >
              <h2
                id="ho-so-tram"
                className="text-[15px] font-semibold text-agarwood"
              >
                {t.profileTitle}
              </h2>
              {profileTable.length > 0 && (
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[15px]">
                  {profileTable.map((row) => (
                    <React.Fragment key={row.label}>
                      <dt className="text-muted">{row.label}</dt>
                      <dd className="text-charcoal">{row.value}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              )}
              {profile.treatment && (
                <p className="mt-4 pt-4 border-t border-gold/20 flex gap-2 text-[15px] text-charcoal">
                  <ShieldCheck
                    className="w-5 h-5 shrink-0 text-gold-dark"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-medium">{t.commitment}</span>{" "}
                    {profile.treatment}
                  </span>
                </p>
              )}
            </motion.section>
          )}

          {product.variants.length > 0 && (
            <motion.div variants={STAGGER_ITEM} className="mt-7">
              <div className="flex items-center justify-between mb-3">
                <p
                  id="chon-quy-cach"
                  className="text-[15px] font-semibold text-charcoal"
                >
                  {t.chooseVariant}
                </p>
                {isBracelet && (
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[15px] text-muted underline underline-offset-4 hover:text-charcoal cursor-pointer"
                  >
                    {t.sizeGuide}
                  </button>
                )}
              </div>
              <div
                role="radiogroup"
                aria-labelledby="chon-quy-cach"
                className="grid grid-cols-1 gap-2.5"
              >
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  const soldOut = v.inventoryStatus === "out_of_stock";
                  return (
                    // Sold-out sizes stay selectable so the shopper can ask to be notified.
                    <label
                      key={v.id}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-[15px] cursor-pointer transition-colors duration-300 ${
                        soldOut ? "bg-cream-dark/50" : "bg-cream-dark/20"
                      } ${
                        isSelected
                          ? "border-espresso ring-1 ring-espresso"
                          : "border-gold/30 hover:border-charcoal/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`variant-${product.id}`}
                        value={v.id}
                        checked={isSelected}
                        onChange={() => setSelectedVariant(v)}
                        className="w-4 h-4 shrink-0 accent-espresso cursor-pointer"
                      />
                      <span
                        className={`flex-1 min-w-0 ${soldOut ? "text-muted" : "text-charcoal"}`}
                      >
                        {v.name}
                      </span>
                      <span
                        className={`shrink-0 whitespace-nowrap ${
                          soldOut ? "text-muted" : "font-semibold text-charcoal"
                        }`}
                      >
                        {soldOut ? t.soldOut : formatVND(v.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </motion.div>
          )}

          <motion.div
            variants={STAGGER_ITEM}
            id="bao-khi-co-hang"
            className="mt-7 space-y-3 scroll-mt-[calc(var(--header-h)+1.5rem)]"
          >
            {isOutOfStock ? (
              <BackInStockForm
                key={selectedVariant.id}
                productId={product.id}
                variantId={selectedVariant.id}
              />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="relative h-14 overflow-hidden rounded-full bg-espresso text-white text-[15px] font-semibold hover:bg-espresso-light transition-colors duration-300 cursor-pointer"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isAdded ? "added" : "add"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 flex items-center justify-center gap-2"
                    >
                      {isAdded && <Check className="w-4 h-4" />}
                      {isAdded ? t.added : t.addToCart}
                    </motion.span>
                  </AnimatePresence>
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="h-14 rounded-full border border-espresso text-[15px] font-semibold text-espresso hover:bg-espresso hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {t.buyNow}
                </button>
              </div>
            )}
            {price >= CONSULT_MIN_PRICE && (
              <a
                href={brandConfig.social.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 rounded-full bg-cream-dark/60 text-[15px] font-medium text-agarwood-dark hover:bg-cream-dark transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {t.zaloConsult}
              </a>
            )}
          </motion.div>

          <motion.ul
            variants={STAGGER_ITEM}
            className="mt-7 pt-6 border-t border-gold/25 space-y-2.5 text-sm text-charcoal/80"
          >
            {trustPoints.map((point) => (
              <li key={point} className="flex gap-2">
                <Check
                  className="w-4 h-4 mt-0.5 shrink-0 text-gold-dark"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Details: tabs on the same cream as the rest of the page, set off by a hairline */}
      <section className="border-t border-gold/20">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <ProductTabs label={t.detailsLabel} tabs={tabs} />
        </div>
      </section>

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-24">
        {/* FAQ: answers are server-rendered as FAQPage JSON-LD by the page */}
        <section aria-labelledby="faq-heading" className="max-w-3xl">
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl text-agarwood"
          >
            {t.faq}
          </h2>
          <div className="mt-4 border-b border-border-subtle">
            {faq.map((item) => (
              <Accordion key={item.question} title={item.question}>
                <p>{item.answer}</p>
              </Accordion>
            ))}
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <ProductCarousel
            title={t.related}
            products={relatedProducts}
            contained={false}
          />
        )}
      </div>

      <AnimatePresence>
        {isSizeGuideOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={t.sizeGuide}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsSizeGuideOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: MOTION_RISE }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: MOTION_RISE }}
              transition={{ duration: 0.5, ease: MOTION_EASE }}
              className="relative w-full max-w-lg rounded-2xl bg-cream p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-medium text-charcoal">
                  {t.sizeGuide}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="p-2 -m-2 rounded-full hover:bg-cream-dark cursor-pointer"
                  aria-label={t.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-4 text-[15px] text-charcoal/80 leading-relaxed">
                {t.sizeGuideIntro}
              </p>
              <table className="mt-6 w-full text-[15px] text-left">
                <thead>
                  <tr className="border-b border-border-subtle text-muted">
                    <th className="py-2 font-normal">{t.sizeBead}</th>
                    <th className="py-2 font-normal">{t.sizeWrist}</th>
                    <th className="py-2 font-normal">{t.sizeFit}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-charcoal">
                  <tr>
                    <td className="py-3">6mm</td>
                    <td className="py-3">14 – 15,5 cm</td>
                    <td className="py-3">{t.sizeSmall}</td>
                  </tr>
                  <tr>
                    <td className="py-3">8mm</td>
                    <td className="py-3">16 – 17,5 cm</td>
                    <td className="py-3">{t.sizeMedium}</td>
                  </tr>
                  <tr>
                    <td className="py-3">10 – 12mm</td>
                    <td className="py-3">17,5 – 19,5 cm</td>
                    <td className="py-3">{t.sizeLarge}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-6 text-sm text-muted">
                {t.sizeNote}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProductTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

/** Tabs in the WAI-ARIA pattern; every panel stays in the HTML so search engines read it all. */
function ProductTabs({ label, tabs }: { label: string; tabs: ProductTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (idx: number) => {
    const next = (idx + tabs.length) % tabs.length;
    setActiveId(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div
        role="tablist"
        aria-label={label}
        className="flex gap-7 sm:gap-10 overflow-x-auto no-scrollbar border-b border-border-subtle -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {tabs.map((tab, idx) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-controls={`panel-${tab.id}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  focusTab(idx + 1);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  focusTab(idx - 1);
                }
              }}
              className={`relative shrink-0 py-5 text-[15px] sm:text-base whitespace-nowrap cursor-pointer transition-colors duration-300 ${
                isActive
                  ? "font-semibold text-espresso"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="product-tab-underline"
                  transition={{ duration: 0.35, ease: MOTION_EASE }}
                  className="absolute inset-x-0 -bottom-px h-0.75 rounded-full bg-espresso"
                />
              )}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== activeId}
          className="py-10 sm:py-14 text-[15px] sm:text-base text-charcoal/80 leading-relaxed"
        >
          {tab.content}
        </div>
      ))}
    </>
  );
}

function DetailList({ rows }: { rows: Array<{ label: string; value: string }> }) {
  return (
    <dl className="max-w-2xl divide-y divide-border-subtle">
      {rows.map((row) => (
        <div key={row.label} className="flex justify-between gap-6 py-3.5 first:pt-0">
          <dt className="text-muted shrink-0">{row.label}</dt>
          <dd className="text-right text-charcoal first-letter:uppercase">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Accordion({
  title,
  aside,
  defaultOpen = false,
  children,
}: {
  title: string;
  aside?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-border-subtle">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-6 text-lg font-medium text-charcoal cursor-pointer"
      >
        <span className="text-left">{title}</span>
        <span className="flex items-center gap-3">
          {aside}
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: MOTION_EASE }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-[15px] text-charcoal/80 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
