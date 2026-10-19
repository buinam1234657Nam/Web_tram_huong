"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/features/cart/useCartStore";
import { useIsMounted } from "@/hooks/useIsMounted";
import { mockCategories } from "@/data/mock/categories";
import { SearchOverlay } from "./SearchOverlay";
import { motion, AnimatePresence, useScroll } from "motion/react";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);

  const { scrollYProgress } = useScroll();
  const { getTotalItems, openCart } = useCartStore();
  const mounted = useIsMounted();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled((prev) => {
            const next = window.scrollY > 20;
            return prev !== next ? next : prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-[padding,background-color,box-shadow] duration-200 ${
          isScrolled
            ? "bg-[#F6F2E9]/98 backdrop-blur-xs shadow-xs border-b border-border-subtle py-3"
            : "bg-[#F6F2E9] border-b border-border-subtle/60 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-charcoal hover:text-forest transition-colors"
                aria-label="Mở menu điều hướng"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-charcoal hover:text-forest transition-colors ml-1"
                aria-label="Tìm kiếm sản phẩm"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link href="/" className="inline-block group">
                <span className="brand-heading text-2xl sm:text-3xl font-bold tracking-[0.22em] text-forest group-hover:text-champagne-dark transition-colors duration-300 block">
                  VĨNH TRẦM
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-agarwood-dark font-medium block -mt-0.5">
                  Trầm Hương Tự Nhiên
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
              <Link
                href="/"
                className={`transition-colors py-1 ${
                  pathname === "/"
                    ? "text-forest border-b-2 border-forest font-semibold"
                    : "text-charcoal/80 hover:text-forest"
                }`}
              >
                Trang Chủ
              </Link>

              {/* Mega menu trigger for Categories */}
              <div
                className="relative group py-1"
                onMouseEnter={() => setIsCategoryHovered(true)}
                onMouseLeave={() => setIsCategoryHovered(false)}
              >
                <Link
                  href="/san-pham"
                  className={`flex items-center gap-1 transition-colors ${
                    pathname.startsWith("/san-pham") || pathname.startsWith("/danh-muc")
                      ? "text-forest font-semibold"
                      : "text-charcoal/80 hover:text-forest"
                  }`}
                >
                  Sản Phẩm
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryHovered ? "rotate-180" : ""}`} />
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isCategoryHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 w-[490px] bg-white/98 backdrop-blur-md border border-border-subtle shadow-2xl rounded-sm p-4 grid grid-cols-2 gap-3 pt-3 z-50"
                    >
                      {mockCategories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/danh-muc/${cat.slug}`}
                          className="p-2.5 rounded hover:bg-ivory transition-colors group/item"
                        >
                          <p className="font-medium text-xs text-charcoal group-hover/item:text-forest transition-colors">
                            {cat.name}
                          </p>
                          <p className="text-[11px] text-muted line-clamp-1 mt-0.5">
                            {cat.vietnameseName}
                          </p>
                        </Link>
                      ))}
                      <div className="col-span-2 pt-2 border-t border-border-subtle flex justify-between items-center text-xs">
                        <span className="text-muted text-[11px]">Bộ sưu tập mộc độc bản</span>
                        <Link
                          href="/san-pham"
                          className="text-forest font-semibold hover:underline flex items-center gap-1 text-xs"
                        >
                          Xem tất cả sản phẩm
                          <Sparkles className="w-3 h-3 text-champagne" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/ve-chung-toi"
                className={`transition-colors py-1 ${
                  pathname === "/ve-chung-toi"
                    ? "text-forest border-b-2 border-forest font-semibold"
                    : "text-charcoal/80 hover:text-forest"
                }`}
              >
                Về Chúng Tôi
              </Link>

              <Link
                href="/bai-viet"
                className={`transition-colors py-1 ${
                  pathname.startsWith("/bai-viet")
                    ? "text-forest border-b-2 border-forest font-semibold"
                    : "text-charcoal/80 hover:text-forest"
                }`}
              >
                Kiến Thức Trầm
              </Link>

              <Link
                href="/chinh-sach/chinh-sach-bao-hanh"
                className={`transition-colors py-1 ${
                  pathname.startsWith("/chinh-sach")
                    ? "text-forest border-b-2 border-forest font-semibold"
                    : "text-charcoal/80 hover:text-forest"
                }`}
              >
                Chính Sách
              </Link>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-ivory-dark/60 text-charcoal hover:bg-forest hover:text-ivory text-xs transition-colors border border-border-subtle cursor-pointer"
                aria-label="Tìm kiếm sản phẩm"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Tìm kiếm...</span>
              </button>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-forest hover:text-forest-dark transition-colors cursor-pointer"
                aria-label={`Giỏ hàng có ${totalItems} sản phẩm`}
              >
                <ShoppingBag className="w-6 h-6" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: [1, 1.35, 1], opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="absolute top-1 right-0.5 bg-agarwood text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-ivory shadow-xs"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Smooth AnimatePresence */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden lg:hidden border-t border-border-subtle bg-ivory px-4 pt-4 pb-6 space-y-3"
            >
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-charcoal hover:text-forest"
              >
                Trang Chủ
              </Link>
              <div className="py-2">
                <p className="text-xs uppercase font-bold text-agarwood tracking-wider mb-2">
                  Danh Mục Sản Phẩm
                </p>
                <div className="space-y-1.5 pl-2 border-l border-border-subtle">
                  {mockCategories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/danh-muc/${c.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm text-charcoal hover:text-forest py-1"
                    >
                      {c.name}
                    </Link>
                  ))}
                  <Link
                    href="/san-pham"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm font-semibold text-forest py-1"
                  >
                    Tất cả sản phẩm →
                  </Link>
                </div>
              </div>
              <Link
                href="/ve-chung-toi"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-charcoal hover:text-forest"
              >
                Về Chúng Tôi
              </Link>
              <Link
                href="/bai-viet"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-charcoal hover:text-forest"
              >
                Kiến Thức Trầm Hương
              </Link>
              <Link
                href="/chinh-sach/chinh-sach-bao-hanh"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-charcoal hover:text-forest"
              >
                Chính Sách & Bảo Hành
              </Link>
              <div className="pt-2 border-t border-border-subtle flex gap-2">
                <Link
                  href="/gio-hang"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-semibold bg-forest hover:bg-forest-dark text-ivory rounded transition-colors shadow-sm"
                >
                  Xem Giỏ Hàng ({totalItems})
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Luxury Gold Scroll Reading Progress Bar */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-champagne via-champagne-light to-champagne origin-left pointer-events-none"
        />
      </header>

      {/* Global Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
