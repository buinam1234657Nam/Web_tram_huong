import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import NextLink from "next/link";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["vietnamese", "latin"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 | VĨNH TRẦM",
  description: "Không tìm thấy trang. Page not found.",
};

/**
 * For URLs that match no route at all. It renders outside the [lang] layout,
 * so it can't know the visitor's language: it says everything in both.
 * (Routes that call notFound() use the localized [lang]/not-found.tsx.)
 */
export default function GlobalNotFound() {
  return (
    <html lang="vi-VN" className={`${beVietnam.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-sans">
        <header className="bg-mist border-b border-black/8">
          <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
            <NextLink href="/" className="leading-none">
              <span className="block text-lg font-semibold tracking-[0.28em] text-mahogany">VĨNH TRẦM</span>
              <span className="block mt-1 text-[9px] uppercase tracking-[0.34em] text-gold-dark">
                Trầm Hương Việt
              </span>
            </NextLink>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-24 text-center">
          <div className="max-w-xl">
            <p className="font-serif text-7xl sm:text-8xl font-medium text-gold/60">404</p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-agarwood">
              Không tìm thấy trang
            </h1>
            <p className="mt-1 font-serif text-xl text-muted" lang="en">
              Page not found
            </p>
            <p className="mt-6 text-[15px] text-charcoal/75 leading-relaxed">
              Đường dẫn có thể đã thay đổi hoặc không còn tồn tại.
              <br />
              <span lang="en">The link may have changed or no longer exists.</span>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <NextLink
                href="/"
                className="inline-flex items-center h-12 px-7 rounded-full bg-espresso text-white text-sm font-medium hover:bg-espresso-light transition-colors"
              >
                Về trang chủ
              </NextLink>
              <NextLink
                href="/en"
                lang="en"
                className="inline-flex items-center h-12 px-7 rounded-full border border-charcoal/25 text-charcoal text-sm font-medium hover:border-charcoal transition-colors"
              >
                Go to homepage
              </NextLink>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
