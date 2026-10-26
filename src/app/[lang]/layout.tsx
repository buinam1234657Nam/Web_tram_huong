import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "../globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingContactWidget } from "@/components/ui/FloatingContactWidget";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { siteUrl } from "@/lib/config/site";
import { LOCALES, LOCALE_TAGS, isLocale } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { LocaleProvider } from "@/i18n/client";
import { siteMessages } from "@/i18n/messages/site";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/** Display serif for editorial headings (font-serif); has full Vietnamese diacritics. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = siteMessages[locale];
  return {
    title: {
      template: "%s | VĨNH TRẦM",
      default: t.defaultTitle,
    },
    description: t.defaultDescription,
    // No site-wide canonical here: pages without their own would all claim "/".
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: t.defaultTitle,
      description: t.ogDescription,
      siteName: "VĨNH TRẦM",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/hero-agarwood.jpg",
          width: 1376,
          height: 768,
          alt: t.ogImageAlt,
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={LOCALE_TAGS[lang]}
      className={`${beVietnam.variable} ${playfair.variable} h-full antialiased`}
    >
      {/* Warm cream canvas like the reference site; white is kept for cards on top of it */}
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-sans">
        <LocaleProvider locale={lang}>
          <SmoothScroll />
          <OrganizationJsonLd />
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingContactWidget />
        </LocaleProvider>
      </body>
    </html>
  );
}
