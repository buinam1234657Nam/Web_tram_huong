import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingContactWidget } from "@/components/ui/FloatingContactWidget";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { siteUrl } from "@/lib/config/site";

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

export const metadata: Metadata = {
  title: {
    template: "%s | VĨNH TRẦM",
    default: "VĨNH TRẦM | Tinh Hoa Trầm Hương Tự Nhiên Đất Việt",
  },
  description:
    "Thương hiệu trầm hương thượng hạng chế tác thủ công từ cây dó bầu Khánh Hòa & Quảng Nam. Vòng tay trầm hương, nhang trầm, trầm nụ, tinh dầu nguyên chất.",
  // No site-wide canonical here: pages without their own would all claim "/".
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "VĨNH TRẦM | Tinh Hoa Trầm Hương Tự Nhiên Đất Việt",
    description:
      "Kết nối thiên nhiên và tâm hồn qua hương trầm nguyên bản đất Việt.",
    siteName: "VĨNH TRẦM",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/hero-agarwood.jpg",
        width: 1376,
        height: 768,
        alt: "VĨNH TRẦM - Trầm Hương Tự Nhiên",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${playfair.variable} h-full antialiased`}
    >
      {/* Warm cream canvas like the reference site; white is kept for cards on top of it */}
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-sans">
        <SmoothScroll />
        <OrganizationJsonLd />
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        
        <CartDrawer />
        <FloatingContactWidget />
      </body>
    </html>
  );
}
