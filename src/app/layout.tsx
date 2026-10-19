import type { Metadata } from "next";
import { Playfair_Display, Inter, Lora } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingContactWidget } from "@/components/ui/FloatingContactWidget";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | VĨNH TRẦM",
    default: "VĨNH TRẦM | Tinh Hoa Trầm Hương Tự Nhiên Đất Việt",
  },
  description:
    "Thương hiệu trầm hương thượng hạng chế tác thủ công từ cây dó bầu Khánh Hòa & Quảng Nam. Vòng tay trầm hương, nhang trầm, trầm nụ, tinh dầu nguyên chất.",
  metadataBase: new URL("https://vinhtram.vn"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VĨNH TRẦM | Tinh Hoa Trầm Hương Tự Nhiên Đất Việt",
    description: "Kết nối thiên nhiên và tâm hồn qua hương trầm nguyên bản đất Việt.",
    url: "https://vinhtram.vn",
    siteName: "VĨNH TRẦM",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/hero-agarwood.jpg",
        width: 1200,
        height: 675,
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
      className={`${playfair.variable} ${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-charcoal font-sans selection:bg-[#28392F] selection:text-[#F5F5F7]">
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
