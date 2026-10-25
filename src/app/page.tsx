import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { brandConfig } from "@/lib/config/brand";
import { Button } from "@/components/ui/Button";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { FadeIn } from "@/components/motion/MotionPrimitives";
import { HeroVideo } from "@/components/home/HeroVideo";

/**
 * Hero clip: rendered from /images/hero-agarwood.jpg (smoke rising from the
 * ember, slow push-in, 10s seamless loop). Swap these files for real footage
 * shot the same way; WebM first (smaller), MP4 for older Safari.
 */
const HERO_VIDEO_SOURCES = [
  { src: "/videos/hero-khoi-tram.webm", type: "video/webm" },
  { src: "/videos/hero-khoi-tram.mp4", type: "video/mp4" },
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const BRAND_STATEMENT = {
  eyebrow: "Vì sao chọn Vĩnh Trầm",
  title: "Tinh túy từ rừng dó bầu Khánh Hòa",
  body: "Mỗi chuỗi trầm bắt đầu từ cây dó bầu tích nhựa hàng chục năm. Chúng tôi chỉ giữ lại phần tinh túy nhất để trao đến tay bạn.",
};

const FEATURED_TILES = [
  {
    label: "Vòng tay trầm hương",
    title: "Hộ thân, giữ tâm",
    image: "/images/single-bracelet.jpg",
    href: "/danh-muc/vong-tay-tram-huong",
  },
  {
    label: "Nhang trầm tự nhiên",
    title: "Khói mảnh, hương êm",
    image: "/images/incense-sticks.jpg",
    href: "/danh-muc/nhang-tram-huong",
  },
];

const PROMO_TILES = [
  {
    title: "Tinh Dầu Trầm Hương",
    subtitle: "Chưng cất nguyên chất. Lưu hương sâu lắng.",
    image: "/images/oud-oil.jpg",
    href: "/danh-muc/tinh-dau-tram",
  },
  {
    title: "Bộ Quà Tặng",
    subtitle: "Trao lời chúc bình an, hanh thông.",
    image: "/images/gift-set.jpg",
    href: "/danh-muc/bo-qua-tang",
  },
];

/** Delay between siblings that reveal together (cards in a row, list items). */
const STAGGER = 0.12;

export default async function HomePage() {
  const [bestsellers, allProducts, categories, reviews, articles] =
    await Promise.all([
      catalogRepository.getBestsellers(8),
      catalogRepository.getProducts(),
      catalogRepository.getCategories(),
      catalogRepository.getAllReviews(),
      catalogRepository.getArticles(),
    ]);

  // Mock catalog has no publish dates; treat the most recently added entries as new arrivals.
  const newArrivals = [...allProducts].reverse();
  const featuredReviews = reviews.slice(0, 3).map((review) => ({
    review,
    product: allProducts.find((p) => p.id === review.productId),
  }));
  const brandFacts = [
    { value: "100%", label: "Trầm tự nhiên, không tẩm ướp" },
    { value: String(brandConfig.foundingYear), label: "Năm thành lập xưởng" },
    { value: String(categories.length), label: "Dòng sản phẩm thủ công" },
    {
      value: `${brandConfig.policies.returnDays} ngày`,
      label: "Đổi trả nếu sản phẩm lỗi",
    },
  ];
  const showroomMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    brandConfig.contact.showroomAddress,
  )}`;

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* Hero: full-bleed photo with a short smoke loop over it, headline block below. */}
      <section>
        <Link
          href="/san-pham"
          className="block relative w-full aspect-4/3 sm:aspect-16/7 bg-ivory overflow-hidden"
        >
          <Image
            src="/images/hero-agarwood.jpg"
            alt="Trầm hương tự nhiên Việt Nam VĨNH TRẦM"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
          <HeroVideo sources={HERO_VIDEO_SOURCES} />
        </Link>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 text-center">
          <p className="text-[15px] font-medium text-charcoal animate-fade-up [animation-delay:200ms]">
            Trầm hương tự nhiên đất Việt
          </p>
          {/* Looser leading than Nike's Latin headlines so Vietnamese diacritics don't collide */}
          <h1 className="mt-4 text-[2.5rem] sm:text-6xl lg:text-7xl font-bold uppercase text-charcoal leading-[1.18] sm:leading-[1.12] tracking-tight animate-fade-up [animation-delay:350ms]">
            <span className="sm:whitespace-nowrap">Hương trầm Việt.</span>
            <br />
            Nguyên bản.
          </h1>
          <p className="mt-5 text-[15px] sm:text-base text-charcoal/80 animate-fade-up [animation-delay:500ms]">
            Từ rừng dó bầu Khánh Hòa đến đôi tay nghệ nhân, giữ trọn hương thơm
            tự nhiên.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2 animate-fade-up [animation-delay:650ms]">
            <Button href="/san-pham">Mua ngay</Button>
            <Button href="/ve-chung-toi" variant="outline">
              Câu chuyện thương hiệu
            </Button>
          </div>
        </div>
      </section>

      {/* Brand statement: short pitch beside a 2×2 facts grid, on a tinted band */}
      <section className="bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeIn>
            <p className="text-sm font-medium text-gold-dark">
              {BRAND_STATEMENT.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal leading-[1.15] tracking-tight">
              {BRAND_STATEMENT.title}
            </h2>
            <p className="mt-5 text-[15px] sm:text-base text-muted leading-relaxed max-w-md">
              {BRAND_STATEMENT.body}
            </p>
          </FadeIn>

          <dl className="grid grid-cols-2 border-t border-l border-border-dark/15">
            {brandFacts.map((fact, idx) => (
              <FadeIn
                key={fact.label}
                delay={idx * STAGGER}
                className="border-r border-b border-border-dark/15 p-5 sm:p-8"
              >
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="block text-3xl sm:text-5xl font-bold text-espresso tracking-tight">
                    {fact.value}
                  </span>
                  <span className="mt-2 block text-sm sm:text-[15px] text-muted leading-snug">
                    {fact.label}
                  </span>
                </dd>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Nổi bật</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURED_TILES.map((tile, idx) => (
            <FadeIn key={tile.href} delay={idx * STAGGER}>
              <Link
                href={tile.href}
                className="group relative block aspect-4/5 bg-ivory overflow-hidden"
              >
                <Image
                  src={tile.image}
                  alt={tile.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute left-6 bottom-8 sm:left-10 sm:bottom-10 text-white">
                  <p className="text-[15px] font-medium">{tile.label}</p>
                  <p className="mt-1 text-2xl sm:text-3xl font-semibold">
                    {tile.title}
                  </p>
                  <span className="mt-5 inline-flex px-5 py-2 rounded-full bg-white text-charcoal text-[15px] font-medium transition-colors duration-300 group-hover:bg-ivory-dark">
                    Mua
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      <ProductCarousel
        title="Bán chạy nhất"
        products={bestsellers}
        href="/san-pham"
      />

      {/* Editorial banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Câu chuyện Vĩnh Trầm</SectionTitle>
        <FadeIn>
          <Link
            href="/ve-chung-toi"
            className="group relative block w-full aspect-4/5 sm:aspect-16/8 bg-espresso-dark overflow-hidden"
          >
            <Image
              src="/images/artisan-story.jpg"
              alt="Nghệ nhân VĨNH TRẦM chế tác trầm hương thủ công"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute left-6 bottom-8 sm:left-12 sm:bottom-12 max-w-md text-white">
              <p className="text-[15px] font-medium">Chế tác thủ công</p>
              <p className="mt-1 text-3xl sm:text-5xl font-bold uppercase leading-[1.12] tracking-tight">
                Từ đôi tay nghệ nhân
              </p>
              <p className="mt-4 text-white/85">
                Không tẩm hóa chất, không phủ bóng nhân tạo. Từng mảnh giác được
                xỉa sạch để giữ nguyên thớ dầu.
              </p>
              <span className="mt-6 inline-flex px-5 py-2 rounded-full bg-white text-charcoal text-[15px] font-medium transition-colors duration-300 group-hover:bg-ivory-dark">
                Tìm hiểu thêm
              </span>
            </div>
          </Link>
        </FadeIn>
      </section>

      <ProductCarousel
        title="Sản phẩm mới về"
        products={newArrivals}
        href="/san-pham"
      />

      {/* Two-up promo tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROMO_TILES.map((tile, idx) => (
          <FadeIn
            key={tile.href}
            delay={idx * STAGGER}
            className="bg-ivory flex flex-col overflow-hidden"
          >
            <div className="pt-12 px-6 text-center">
              <h2 className="text-3xl sm:text-4xl text-charcoal">
                {tile.title}
              </h2>
              <p className="mt-2 text-lg text-muted">{tile.subtitle}</p>
              <div className="mt-4 flex justify-center gap-6">
                <TextLink href={tile.href}>Tìm hiểu thêm</TextLink>
                <TextLink href={tile.href}>Mua</TextLink>
              </div>
            </div>
            <div className="relative mt-8 aspect-4/3">
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        ))}
      </section>

      {/* Shop by category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Mua theo danh mục</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, idx) => (
            <FadeIn key={cat.id} delay={(idx % 3) * STAGGER}>
              <Link
                href={`/danh-muc/${cat.slug}`}
                className="group relative block aspect-square bg-ivory overflow-hidden"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute left-3 bottom-3 sm:left-6 sm:bottom-6 max-w-[calc(100%-1.5rem)] px-4 py-2 rounded-full bg-white text-charcoal text-sm sm:text-[15px] font-medium truncate transition-colors duration-300 group-hover:bg-ivory-dark">
                  {cat.name}
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-ivory py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl text-charcoal mb-12">
              Khách hàng nói gì
            </h2>
          </FadeIn>
          {/* Swipeable rail on mobile, 3-column grid from md up */}
          <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 gap-4 lg:gap-6">
            {featuredReviews.map(({ review, product }, idx) => (
              <FadeIn
                key={review.id}
                delay={idx * STAGGER}
                className="h-full shrink-0 basis-[85%] md:basis-auto snap-start"
              >
                <figure className="group h-full flex flex-col bg-white overflow-hidden">
                  {/* No customer photos exist, so show the product they bought */}
                  {product && (
                    <Link
                      href={`/san-pham/${product.slug}`}
                      className="relative block aspect-4/3 bg-ivory overflow-hidden"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                    </Link>
                  )}
                  <div className="flex-1 flex flex-col p-6 sm:p-8">
                    <p
                      className="text-gold text-sm tracking-widest"
                      aria-label={`${review.rating} trên 5 sao`}
                    >
                      {"★".repeat(review.rating)}
                    </p>
                    <blockquote className="mt-4 flex-1 text-[17px] text-charcoal leading-relaxed">
                      “{review.content}”
                    </blockquote>
                    <figcaption className="mt-6 pt-6 border-t border-border-subtle flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="w-11 h-11 shrink-0 rounded-full bg-espresso text-white flex items-center justify-center text-sm font-semibold"
                      >
                        {initialsOf(review.authorName)}
                      </span>
                      <span className="min-w-0 text-sm">
                        <span className="block font-medium text-charcoal">
                          {review.authorName}
                          <span className="font-normal text-muted">
                            {" · "}
                            {review.authorLocation}
                          </span>
                        </span>
                        {product && (
                          <Link
                            href={`/san-pham/${product.slug}`}
                            className="block truncate text-muted hover:text-gold-dark transition-colors duration-300"
                          >
                            Đã mua: {product.name}
                          </Link>
                        )}
                      </span>
                    </figcaption>
                  </div>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Tin tức & kiến thức trầm"
          href="/bai-viet"
          linkLabel="Tất cả bài viết"
        />
        <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 gap-4">
          {articles.slice(0, 3).map((art, idx) => (
            <FadeIn
              key={art.id}
              delay={idx * STAGGER}
              className="shrink-0 basis-[80%] md:basis-auto snap-start"
            >
              <article>
                <Link href={`/bai-viet/${art.slug}`} className="group block">
                  <div className="relative aspect-16/10 bg-ivory overflow-hidden">
                    <Image
                      src={art.coverImage}
                      alt={art.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-4 text-sm text-muted">
                    {art.category} · {art.readingTimeMinutes} phút đọc
                  </p>
                  <h3 className="mt-1 text-xl font-medium text-charcoal leading-snug group-hover:text-gold-dark transition-colors duration-300">
                    {art.title}
                  </h3>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Showroom */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="bg-espresso text-white px-6 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl">Ghé thăm showroom</h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            {brandConfig.contact.showroomAddress}
            <br />
            {brandConfig.contact.workingHours}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              href={showroomMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="gold"
            >
              Xem đường đi
            </Button>
            <Button
              href={`tel:${brandConfig.contact.hotline}`}
              variant="outline-light"
            >
              Gọi {brandConfig.contact.phoneFormatted}
            </Button>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

/** "Nguyễn Thùy Linh" → "TL": last two words, as Vietnamese names are addressed by the given name. */
function initialsOf(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function SectionHeader({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 sm:gap-4 mb-8">
      <h2 className="text-3xl sm:text-4xl text-charcoal">{title}</h2>
      <TextLink href={href} className="shrink-0">
        {linkLabel}
      </TextLink>
    </FadeIn>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <FadeIn>
      <h2 className="text-2xl sm:text-3xl text-charcoal mb-6">{children}</h2>
    </FadeIn>
  );
}

function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-0.5 text-[15px] text-gold-dark hover:underline underline-offset-4 ${className}`}
    >
      {children}
      <ChevronRight className="w-4 h-4" />
    </Link>
  );
}
