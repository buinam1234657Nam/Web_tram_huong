import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["vietnamese", "latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["vietnamese", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | VĨNH TRẦM - Trầm Hương Thượng Hạng",
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
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Cinzel:wght@500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal font-sans">
        <OrganizationJsonLd />
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
