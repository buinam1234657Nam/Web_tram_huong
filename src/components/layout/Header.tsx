"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "@/components/i18n/Link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/features/cart/useCartStore";
import { useIsMounted } from "@/hooks/useIsMounted";
import { mockCategories } from "@/data/mock/categories";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";
import { RITUALS } from "@/data/content/rituals";
import { LOCALE_LABELS, splitLocale, type Locale } from "@/i18n/config";
import { useLocale, useMessages } from "@/i18n/client";
import { layoutMessages } from "@/i18n/messages/layout";
import { brandMessages } from "@/i18n/messages/brand";
import { localizeCategory } from "@/i18n/messages/categories";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { SearchOverlay } from "./SearchOverlay";
import { motion, AnimatePresence } from "motion/react";

type HeaderText = (typeof layoutMessages)["vi"]["header"];

function navLinks(t: HeaderText) {
  return [
    { href: "/san-pham", label: t.nav.products, match: ["/san-pham"] },
    { href: "/danh-muc/vong-tay-tram-huong", label: t.nav.bracelets, match: [] },
    { href: "/danh-muc/nhang-tram-huong", label: t.nav.incense, match: [] },
    { href: "/nhu-cau/qua-bieu", label: t.nav.gifts, match: [] },
    { href: "/hieu-ve-tram", label: t.nav.guide, match: ["/hieu-ve-tram"] },
    { href: "/ve-chung-toi", label: t.nav.about, match: ["/ve-chung-toi"] },
    { href: "/bai-viet", label: t.nav.news, match: ["/bai-viet"] },
  ];
}

function megaColumns(t: HeaderText, locale: Locale) {
  const categoryLink = (slug: string) => {
    const category = mockCategories.find((c) => c.slug === slug);
    return {
      href: `/danh-muc/${slug}`,
      label: category ? localizeCategory(category, locale).name : slug,
    };
  };
  return [
    {
      title: t.mega.byNeed,
      links: [
        { href: "/san-pham", label: t.mega.allProducts },
        ...RITUALS.map((r) => ({
          href: `/nhu-cau/${r.slug}`,
          label: t.rituals[r.slug] ?? r.label,
        })),
      ],
    },
    {
      title: t.mega.wear,
      links: [
        categoryLink("vong-tay-tram-huong"),
        categoryLink("trang-suc-tram-huong"),
      ],
    },
    {
      title: t.mega.burn,
      links: [
        categoryLink("tram-nu-xong-nha"),
        categoryLink("nhang-tram-huong"),
        categoryLink("tram-huong-mieng"),
        categoryLink("tinh-dau-tram"),
        categoryLink("phu-kien-xong-tram"),
      ],
    },
    {
      title: t.mega.giftsArt,
      links: [
        categoryLink("bo-qua-tang"),
        categoryLink("my-nghe-tram-huong"),
        { href: "/chinh-sach/chinh-sach-bao-hanh", label: t.mega.warranty },
      ],
    },
    {
      title: t.mega.learn,
      links: [
        { href: "/hieu-ve-tram", label: t.mega.guide },
        { href: "/ve-chung-toi", label: t.mega.story },
        { href: "/bai-viet", label: t.mega.knowledge },
        { href: "/chinh-sach/chinh-sach-doi-tra", label: t.mega.returns },
        { href: "/chinh-sach/chinh-sach-giao-hang", label: t.mega.shipping },
      ],
    },
  ];
}

/** Stand-in while LanguageSwitcher (which reads search params) streams in. */
function LanguagePill({ locale }: { locale: Locale }) {
  return (
    <span className="h-9 px-3 rounded-full border border-gold/40 text-mahogany text-xs font-semibold inline-flex items-center">
      {LOCALE_LABELS[locale].short}
    </span>
  );
}

/** Index of the nav item that owns the mega menu. */
const MEGA_INDEX = 0;
/** Hover-intent delays so the menu doesn't flicker when the pointer just passes over. */
const OPEN_DELAY_MS = 120;
const CLOSE_DELAY_MS = 180;

export function Header() {
  // Prerender sees the internal "/vi/..." path, the browser sees "/" or "/en/..."; compare bare paths.
  const { path: pathname } = splitLocale(usePathname());
  const locale = useLocale();
  const t = useMessages(layoutMessages).header;
  const brand = useMessages(brandMessages);
  const NAV_LINKS = navLinks(t);
  const MEGA_COLUMNS = megaColumns(t, locale);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { getTotalItems, openCart } = useCartStore();
  const mounted = useIsMounted();
  const totalItems = mounted ? getTotalItems() : 0;

  const isActive = (link: (typeof NAV_LINKS)[number]) =>
    pathname === link.href || link.match.some((m) => pathname.startsWith(m));
  const activeIndex = NAV_LINKS.findIndex(isActive);
  // Only one item is underlined at a time: whatever the pointer is on, else the current page.
  const underlinedIndex = isMegaOpen
    ? MEGA_INDEX
    : (hoveredIndex ?? (activeIndex >= 0 ? activeIndex : null));

  const scheduleMega = (open: boolean) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setIsMegaOpen(open),
      open ? OPEN_DELAY_MS : CLOSE_DELAY_MS,
    );
  };

  const closeMegaNow = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsMegaOpen(false);
  };

  useEffect(() => {
    if (!isMegaOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMegaNow();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMegaOpen]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b border-gold/20 transition-colors duration-300 bg-cream`}
      >
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 grid grid-cols-[1fr_auto_1fr] lg:grid-cols-[auto_1fr_auto] items-center gap-6">
            {/* Mobile: menu + search */}
            <div className="flex items-center gap-1 lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-2 text-mahogany"
                aria-label={t.openMenu}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-mahogany"
                aria-label={t.searchProducts}
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Wordmark */}
            <Link href="/" className="text-center lg:text-left leading-none">
              <span className="block text-lg sm:text-xl font-semibold tracking-[0.28em] text-mahogany">
                VĨNH TRẦM
              </span>
              <span className="block mt-1 text-[9px] uppercase tracking-[0.34em] text-gold-dark">
                {brand.wordmarkSubtitle}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-sm"
              onMouseLeave={() => {
                setHoveredIndex(null);
                scheduleMega(false);
              }}
            >
              {NAV_LINKS.map((link, idx) => {
                const isMegaTrigger = idx === MEGA_INDEX;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMegaNow}
                    onMouseEnter={() => {
                      setHoveredIndex(idx);
                      scheduleMega(isMegaTrigger);
                    }}
                    onFocus={() => isMegaTrigger && setIsMegaOpen(true)}
                    aria-haspopup={isMegaTrigger ? "true" : undefined}
                    aria-expanded={isMegaTrigger ? isMegaOpen : undefined}
                    aria-current={isActive(link) ? "page" : undefined}
                    className={`relative py-5 transition-colors duration-300 ${
                      isActive(link)
                        ? "text-gold-dark font-medium"
                        : "text-mahogany hover:text-gold-dark"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute left-0 right-0 bottom-4 h-px bg-gold origin-left transition-transform duration-300 ease-out ${
                        underlinedIndex === idx ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center justify-end gap-1">
              <Suspense fallback={<LanguagePill locale={locale} />}>
                <LanguageSwitcher className="hidden lg:block mr-1" />
              </Suspense>
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:inline-flex p-2 text-mahogany hover:text-gold-dark transition-colors cursor-pointer"
                aria-label={t.searchProducts}
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 -mr-2 text-mahogany hover:text-gold-dark transition-colors cursor-pointer"
                aria-label={t.cartWithCount(totalItems)}
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0.5 right-0 bg-gold text-white text-[10px] font-semibold rounded-full min-w-4.5 h-4.5 px-1 flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Dim the page below the header while the mega menu is open */}
        <AnimatePresence>
          {isMegaOpen && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: MOTION_EASE }}
              onMouseEnter={() => scheduleMega(false)}
              onClick={closeMegaNow}
              className="hidden lg:block absolute inset-x-0 top-full h-screen bg-espresso-dark/20"
            />
          )}
        </AnimatePresence>

        {/* Desktop mega menu */}
        <AnimatePresence>
          {isMegaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: MOTION_EASE }}
              onMouseEnter={() => scheduleMega(true)}
              onMouseLeave={() => scheduleMega(false)}
              className="hidden lg:block absolute inset-x-0 top-full bg-cream border-b border-gold/20"
            >
              {/* Text-only columns, Nike-style: bold heading, muted links */}
              <div className="max-w-6xl mx-auto px-8 pt-8 pb-12 grid grid-cols-5 gap-10">
                {MEGA_COLUMNS.map((column) => (
                  <div key={column.title}>
                    <p className="text-base font-medium text-agarwood">
                      {column.title}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={closeMegaNow}
                            className="text-sm font-medium text-muted hover:text-charcoal transition-colors duration-300"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: MOTION_EASE }}
              className="overflow-hidden lg:hidden border-t border-gold/20 bg-cream"
            >
              <div className="px-4 pt-4 pb-8">
                <ul className="divide-y divide-border-subtle">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3.5 text-lg font-medium text-charcoal"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 mb-3 text-base font-medium text-charcoal">
                  {t.categories}
                </p>
                <ul className="space-y-2.5">
                  {mockCategories.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/danh-muc/${c.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-[15px] font-medium text-muted"
                      >
                        {localizeCategory(c, locale).name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 mb-3 text-base font-medium text-charcoal">
                  {t.language}
                </p>
                <Suspense fallback={<LanguagePill locale={locale} />}>
                  <LanguageSwitcher variant="row" />
                </Suspense>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
