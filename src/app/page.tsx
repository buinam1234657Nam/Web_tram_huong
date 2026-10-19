import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  CheckCircle,
  Quote,
  Clock,
  BookOpen,
} from "lucide-react";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { brandConfig } from "@/lib/config/brand";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { GuidedShopping } from "@/components/home/GuidedShopping";
import { AtmosphericSmoke } from "@/components/home/AtmosphericSmoke";
import { LuxuryTicker } from "@/components/home/LuxuryTicker";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
  SlideInLeft,
  SlideInRight,
} from "@/components/motion/MotionPrimitives";

export default async function HomePage() {
  const [bestsellers, allProducts, categories, reviews, articles] =
    await Promise.all([
      catalogRepository.getBestsellers(4),
      catalogRepository.getProducts(),
      catalogRepository.getCategories(),
      catalogRepository.getAllReviews(),
      catalogRepository.getArticles(),
    ]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* ============================================================
          SECTION 3: FULL-WIDTH LUXURY HERO WITH ATMOSPHERIC SMOKE
          ============================================================ */}
      <section className="relative w-full bg-forest-dark text-ivory overflow-hidden min-h-[600px] lg:min-h-[720px] flex flex-col justify-between">
        {/* Background Editorial Image with Mask */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-agarwood.jpg"
            alt="Trầm hương tự nhiên Việt Nam VĨNH TRẦM"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-50 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-transparent to-black/30" />
        </div>

        {/* Dynamic Incense Smoke & Golden Embers Overlay */}
        <AtmosphericSmoke />

        {/* Hero Main Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 my-auto w-full">
          <div className="max-w-2xl space-y-6">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne/15 border border-champagne/35 text-champagne-light text-xs font-semibold tracking-widest uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-champagne animate-spin duration-1000" />
                <span>Trầm Tự Nhiên Khánh Hòa & Quảng Nam</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ivory leading-[1.12]">
                Kết nối thiên nhiên <br />
                <span className="text-champagne font-normal italic font-serif">
                  và tâm hồn
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-sm sm:text-base lg:text-lg text-ivory/85 leading-relaxed font-light">
                Gìn giữ trọn vẹn thớ gỗ tích dầu tự nhiên từ rừng sâu đất Việt. Từng chuỗi vòng tay, nén nhang mộc và phiến trầm xông phòng được các nghệ nhân VĨNH TRẦM gọt giũa tỉ mỉ, mang lại sự bình an và tĩnh tại cho tâm hồn đương đại.
              </p>
            </FadeIn>

            <FadeIn delay={0.55}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button
                  variant="champagne"
                  size="lg"
                  className="shadow-lg shadow-champagne/20"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  <Link href="/san-pham" className="w-full text-center">
                    Khám Phá Bộ Sưu Tập
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-ivory/50 text-ivory hover:bg-ivory hover:text-forest"
                >
                  <Link href="/ve-chung-toi" className="w-full text-center">
                    Câu Chuyện Thương Hiệu
                  </Link>
                </Button>
              </div>
            </FadeIn>

            {/* Quick Authentic Highlights with glowing numbers */}
            <FadeIn delay={0.7}>
              <div className="pt-6 border-t border-ivory/20 grid grid-cols-3 gap-6 text-xs text-ivory/80">
                <div>
                  <strong className="block text-champagne text-2xl sm:text-3xl font-serif font-bold">100%</strong>
                  <span className="font-medium">Trầm tự nhiên</span>
                </div>
                <div>
                  <strong className="block text-champagne text-2xl sm:text-3xl font-serif font-bold">Trọn đời</strong>
                  <span className="font-medium">Bảo dưỡng hạt & dây</span>
                </div>
                <div>
                  <strong className="block text-champagne text-2xl sm:text-3xl font-serif font-bold">Đồng kiểm</strong>
                  <span className="font-medium">Trước khi thanh toán</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Infinite Luxury Marquee Ticker */}
        <div className="relative z-20 w-full mt-auto">
          <LuxuryTicker />
        </div>
      </section>

      {/* ============================================================
          SECTION 4: TRUST / VALUE PROPOSITION ROW
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.1}>
          <div className="bg-white border border-border-subtle rounded-sm p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle/70">
              {brandConfig.trustPillars.map((pillar, idx) => {
                const icons = [
                  <ShieldCheck key="1" className="w-6 h-6 text-forest" />,
                  <Sparkles key="2" className="w-6 h-6 text-agarwood" />,
                  <Award key="3" className="w-6 h-6 text-champagne-dark" />,
                  <Truck key="4" className="w-6 h-6 text-forest" />,
                ];

                return (
                  <div
                    key={pillar.id}
                    className={`flex items-start gap-4 group transition-transform duration-300 hover:translate-y-[-2px] ${
                      idx > 0 ? "pt-5 sm:pt-0 sm:pl-6 lg:pl-8" : ""
                    }`}
                  >
                    <div className="p-3 rounded-full bg-ivory shrink-0 border border-border-subtle group-hover:border-champagne group-hover:scale-110 transition-all duration-300">
                      {icons[idx]}
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-medium text-agarwood-dark mt-0.5 mb-1.5">
                        {pillar.subtitle}
                      </p>
                      <p className="text-xs text-muted leading-relaxed font-light">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ============================================================
          SECTION 5: VISUAL CATEGORY GALLERY (CAROUSEL)
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.15}>
          <CategoryCarousel categories={categories} />
        </FadeIn>
      </section>

      {/* ============================================================
          SECTION 6: BESTSELLER PRODUCT GRID
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase font-semibold text-agarwood-dark tracking-widest block mb-1">
                Tuyển Chọn Thượng Phẩm
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
                Sản Phẩm Được Yêu Thích Nhất
              </h2>
            </div>
            <Link
              href="/san-pham"
              className="text-xs font-semibold text-forest hover:text-agarwood transition-colors flex items-center gap-1.5 group"
            >
              <span>Xem tất cả {allProducts.length} sản phẩm</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        <FadeInStagger staggerDelay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <FadeInStaggerItem key={product.id}>
                <ProductGrid products={[product]} columns={4} />
              </FadeInStaggerItem>
            ))}
          </div>
        </FadeInStagger>
      </section>

      {/* ============================================================
          SECTION 7: EDITORIAL CRAFTSMANSHIP STORY (SPLIT-SCREEN)
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-dark text-ivory rounded-sm overflow-hidden border border-forest grid grid-cols-1 lg:grid-cols-2 shadow-xl">
          {/* Left Image */}
          <SlideInLeft className="relative min-h-[380px] lg:min-h-[520px] overflow-hidden group">
            <Image
              src="/images/artisan-story.jpg"
              alt="Nghệ nhân điêu khắc trầm hương thủ công VĨNH TRẦM"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent lg:hidden" />
          </SlideInLeft>

          {/* Right Narrative */}
          <SlideInRight className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <span className="text-xs uppercase tracking-widest text-champagne font-semibold block">
              Gìn Giữ Hồn Gỗ Việt
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory leading-tight">
              Hành Trình Chế Tác Từ Đôi Bàn Tay Nghệ Nhân
            </h2>

            <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-light">
              Mỗi thanh trầm, từng hạt chuỗi tại VĨNH TRẦM không phải là sản phẩm công nghiệp đại trà. Đó là kết tinh của hàng chục năm cây dó bầu bền bỉ chắt chiu nhựa thơm nơi rừng sâu Khánh Hòa, được các nghệ nhân lành nghề dùng dao đục xỉa sạch từng mảnh giác trắng không dầu.
            </p>

            <ul className="space-y-3.5 text-xs sm:text-sm text-ivory/90 pt-1">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-champagne shrink-0" />
                <span>Không tẩm ướp hóa chất tạo mùi nhân tạo</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-champagne shrink-0" />
                <span>Tiện mộc thủ công từng hạt, giữ nguyên thớ dầu tự nhiên</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-champagne shrink-0" />
                <span>Minh bạch xuất xứ từng lô trầm thu hái</span>
              </li>
            </ul>

            <div className="pt-2">
              <Button variant="champagne" size="md">
                <Link href="/ve-chung-toi">Tìm hiểu về xưởng chế tác</Link>
              </Button>
            </div>
          </SlideInRight>
        </div>
      </section>

      {/* ============================================================
          SECTION 8: GUIDED SHOPPING (PURPOSE & BUDGET)
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.1}>
          <GuidedShopping products={allProducts} />
        </FadeIn>
      </section>

      {/* ============================================================
          SECTION 9: TRANSPARENT CUSTOMER REVIEWS
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-semibold text-agarwood-dark tracking-widest block mb-1">
              Đánh Giá Minh Bạch
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-2">
              Cảm Nhận Từ Quý Khách Đã Thưởng Trầm
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <StarRating rating={4.9} count={reviews.length} size="md" />
              <span className="text-xs text-muted">
                (Dữ liệu đánh giá từ khách hàng đã mua và xác nhận)
              </span>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white border border-border-subtle rounded-sm p-6 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-champagne transition-all duration-300 hover:translate-y-[-4px]"
            >
              <div>
                <Quote className="w-8 h-8 text-champagne/45 mb-3" />
                <StarRating rating={review.rating} showScore={false} size="sm" />
                <h3 className="font-serif text-base font-bold text-charcoal mt-3 mb-2">
                  &quot;{review.title}&quot;
                </h3>
                <p className="text-xs text-charcoal/80 leading-relaxed italic font-light">
                  {review.content}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border-subtle/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-charcoal">{review.authorName}</p>
                  <p className="text-[11px] text-muted">{review.authorLocation}</p>
                </div>
                {review.verifiedPurchase && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
                    Đã mua hàng
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          SECTION 10: KNOWLEDGE / BLOG CARDS FOR AGARWOOD EDUCATION
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase font-semibold text-agarwood-dark tracking-widest block mb-1">
                Góc Tri Thức
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
                Cẩm Nang Thưởng Trầm Đất Việt
              </h2>
            </div>
            <Link
              href="/bai-viet"
              className="text-xs font-semibold text-forest hover:text-agarwood transition-colors flex items-center gap-1.5 group"
            >
              <span>Tất cả bài viết</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-white border border-border-subtle rounded-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:border-champagne/60 transition-all duration-300 hover:translate-y-[-4px]"
            >
              <div className="relative aspect-16/10 w-full bg-ivory overflow-hidden">
                <Image
                  src={art.coverImage}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-2.5 left-2.5 text-[11px] font-semibold bg-forest text-ivory px-2.5 py-0.5 rounded-xs shadow-xs">
                  {art.category}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-muted mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readingTimeMinutes} phút đọc
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {art.author.name}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-forest transition-colors line-clamp-2 mb-2 leading-snug">
                    <Link href={`/bai-viet/${art.slug}`}>{art.title}</Link>
                  </h3>

                  <p className="text-xs text-muted leading-relaxed line-clamp-3 font-light">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border-subtle/50">
                  <Link
                    href={`/bai-viet/${art.slug}`}
                    className="text-xs font-semibold text-agarwood-dark group-hover:text-forest transition-colors inline-flex items-center gap-1"
                  >
                    Đọc tiếp
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
