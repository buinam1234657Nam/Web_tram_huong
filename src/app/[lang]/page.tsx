import React from "react";
import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { brandConfig } from "@/lib/config/brand";
import { heroSlidesFor } from "@/data/content/home";
import { ritualsFor } from "@/data/content/rituals";
import { localeAlternates } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { homeMessages } from "@/i18n/messages/home";
import { brandMessages } from "@/i18n/messages/brand";
import { Button } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { ReviewerAvatar } from "@/components/ui/ReviewerAvatar";
import { CountUp, FadeIn } from "@/components/motion/MotionPrimitives";
import { HeroSlider } from "@/components/home/HeroSlider";
import { FeaturedShowcase } from "@/components/home/FeaturedShowcase";
import { AuthenticitySigns } from "@/components/product/AuthenticitySigns";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    description: homeMessages[locale].metaDescription,
    alternates: localeAlternates("/", locale),
  };
}

/** The two cards beside the featured carousel (titles live in homeMessages.collections). TODO: chủ shop thay ảnh bộ sưu tập thật. */
const SHOWCASE_COLLECTIONS = [
  { image: "/images/gift-set.jpg", href: "/nhu-cau/qua-bieu" },
  { image: "/images/raw-agarwood.jpg", href: "/danh-muc/tram-huong-mieng" },
];

/** Delay between siblings that reveal together (cards in a row, list items). */
const STAGGER = 0.12;

export default async function HomePage() {
  const locale = await getLocale();
  const t = homeMessages[locale];
  const brand = brandMessages[locale];
  const [featured, allProducts, categories, reviews, articles] =
    await Promise.all([
      catalogRepository.getFeaturedProducts(4),
      catalogRepository.getProducts(),
      catalogRepository.getCategories(),
      catalogRepository.getAllReviews(),
      catalogRepository.getArticles(),
    ]);

  // A product appears at most once on this page: later sections skip
  // anything an earlier section already showed.
  const shownProductIds = new Set(featured.map((p) => p.id));
  const featuredReviews = reviews
    .map((review) => ({
      review,
      product: allProducts.find((p) => p.id === review.productId),
    }))
    .filter(({ product }) => !product || !shownProductIds.has(product.id))
    .slice(0, 3);
  featuredReviews.forEach(({ product }) => product && shownProductIds.add(product.id));

  const brandFacts = [
    { value: "100%", label: t.factNatural },
    { value: String(brandConfig.foundingYear), label: t.factFounded },
    { value: String(categories.length), label: t.factLines },
    t.factReturns(brandConfig.policies.returnDays),
  ];
  const showroomMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    brandConfig.contact.showroomAddress,
  )}`;
  const latestArticle = articles[0];

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* 1. Hero: one positioning line + one main button per banner */}
      <HeroSlider slides={heroSlidesFor(locale)} />

      {/* 2. Tuyển tác phẩm: featured products in one large carousel card, beside two collections */}
      {featured.length > 0 && (
        <section className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold-dark">
                {t.showcaseEyebrow}
              </p>
              <h2 className="mt-2 font-serif text-4xl sm:text-5xl font-medium text-espresso tracking-normal">
                {t.showcaseTitle}
              </h2>
              <p className="mt-3 max-w-md text-[15px] text-muted leading-relaxed">
                {t.showcaseBody}
              </p>
            </div>
            <Link
              href="/san-pham"
              className="group self-start sm:self-auto inline-flex items-center gap-2 pb-1.5 pl-10 border-b border-gold/60 text-sm font-medium text-agarwood hover:text-gold-dark transition-colors"
            >
              {t.viewAll}
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </FadeIn>
          <FadeIn>
            <FeaturedShowcase
              products={featured.map((p) => ({
                id: p.id,
                slug: p.slug,
                name: p.name,
                image: p.images[0],
                line: p.storyLine ?? p.shortDescription,
                price: p.price,
                fromPrice: p.variants.some((v) => v.price !== p.price),
                bestseller: Boolean(p.bestseller),
              }))}
              collections={SHOWCASE_COLLECTIONS.map((c, i) => ({ ...c, ...t.collections[i] }))}
            />
          </FadeIn>
        </section>
      )}

      {/* 3. Shop by need / ritual */}
      <section className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t.ritualsTitle}
          href="/san-pham"
          linkLabel={t.ritualsLink}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ritualsFor(locale).map((ritual, idx) => (
            <FadeIn key={ritual.slug} delay={(idx % 4) * STAGGER}>
              <Link
                href={`/nhu-cau/${ritual.slug}`}
                className="group relative block aspect-4/5 sm:aspect-3/4 overflow-hidden rounded-2xl bg-espresso-dark"
              >
                <Image
                  src={ritual.image}
                  alt={ritual.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-espresso-dark/90 via-espresso-dark/30 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6 text-white">
                  <p className="text-sm font-medium text-gold-light">
                    {ritual.label}
                  </p>
                  <p className="mt-1 text-2xl font-semibold leading-snug">
                    {ritual.title}
                  </p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed line-clamp-2">
                    {ritual.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 h-10 px-5 rounded-full bg-white text-espresso text-sm font-medium transition-colors duration-300 group-hover:bg-gold-light">
                    {t.explore}
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 4. Hiểu về trầm: short version of the product-page guide, on a dark brand band */}
      <section className="relative overflow-hidden bg-espresso-dark text-white">
        <div className="relative max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-gold-light">{t.guideEyebrow}</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-white leading-[1.15] tracking-tight">
                {t.guideTitle}
              </h2>
              <p className="mt-4 text-[15px] sm:text-base text-white/70 leading-relaxed">
                {t.guideBody}
              </p>
            </div>
            <Button href="/hieu-ve-tram" variant="gold" className="self-start lg:self-auto shrink-0">
              {t.guideCta}
            </Button>
          </FadeIn>
          <FadeIn className="mt-10">
            <AuthenticitySigns variant="compact" />
          </FadeIn>
          {latestArticle && (
            <p className="mt-10 text-[15px] text-white/60">
              {t.readMore}{" "}
              <Link
                href={`/bai-viet/${latestArticle.slug}`}
                className="text-gold-light hover:underline underline-offset-4"
              >
                {latestArticle.title}
              </Link>{" "}
              ·{" "}
              <Link
                href="/bai-viet"
                className="text-white/80 hover:text-white hover:underline underline-offset-4"
              >
                {t.allArticles}
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* 5. Workshop & artisans, with the "why us" facts */}
      <section className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <Link
            href="/ve-chung-toi"
            className="group relative block w-full aspect-4/5 sm:aspect-16/8 bg-espresso-dark overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/artisan-story.jpg"
              alt={t.workshopImageAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute left-6 bottom-8 sm:left-12 sm:bottom-12 max-w-md text-white">
              <p className="text-[15px] font-medium text-gold-light">
                {t.workshopEyebrow}
              </p>
              <p className="mt-1 text-3xl sm:text-5xl font-bold uppercase leading-[1.12] tracking-tight">
                {t.workshopTitle}
              </p>
              <p className="mt-4 text-white/85">
                {t.workshopBody}
              </p>
              <span className="mt-6 inline-flex px-5 py-2 rounded-full bg-white text-charcoal text-[15px] font-medium transition-colors duration-300 group-hover:bg-ivory-dark">
                {t.workshopCta}
              </span>
            </div>
          </Link>
        </FadeIn>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeIn>
            <p className="text-sm font-medium text-gold-dark">
              {t.whyEyebrow}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15] tracking-tight">
              {t.whyTitle}
            </h2>
            <p className="mt-5 text-[15px] sm:text-base text-muted leading-relaxed max-w-md">
              {t.whyBody}
            </p>
          </FadeIn>

          {/* Each fact sits in its own soft card rather than a hard ruled grid */}
          <dl className="grid grid-cols-2 gap-3 sm:gap-4">
            {brandFacts.map((fact, idx) => (
              <FadeIn
                key={fact.label}
                delay={idx * STAGGER}
                className="h-full rounded-2xl border border-gold/35 bg-ivory-light p-5 sm:p-7"
              >
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <CountUp
                    value={fact.value}
                    className="block text-3xl sm:text-5xl font-bold text-agarwood tracking-tight"
                  />
                  <span className="mt-2 block text-sm sm:text-[15px] text-muted leading-snug">
                    {fact.label}
                  </span>
                </dd>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      {/* 6. Reviews (max 3; never re-shows a product from the sections above) */}
      {featuredReviews.length > 0 && (
        <section className="bg-cream-dark py-14 sm:py-16">
          <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
            {/* Same header pattern as "Tuyển tác phẩm": eyebrow, serif title, summary underneath */}
            <FadeIn className="mb-8 sm:mb-10">
              <p className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.14em] uppercase text-agarwood">
                <span aria-hidden="true" className="w-8 h-px bg-gold" />
                {t.reviewsEyebrow}
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-espresso tracking-normal">
                {t.reviewsTitle}
              </h2>
              <p className="mt-3 max-w-md text-[15px] text-charcoal/75 leading-relaxed">
                {t.reviewsBody}
              </p>
            </FadeIn>
            {/* Swipeable rail on mobile, 3-column grid from md up */}
            <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 gap-4">
              {featuredReviews.map(({ review, product }, idx) => (
                <FadeIn
                  key={review.id}
                  delay={idx * STAGGER}
                  className="h-full shrink-0 basis-[85%] md:basis-auto snap-start"
                >
                  <figure className="relative h-full flex flex-col rounded-2xl border border-gold/25 bg-ivory p-5 sm:p-6">
                    {/* Large decorative quote mark */}
                    <span
                      aria-hidden="true"
                      className="absolute right-5 top-2 font-serif text-6xl leading-none text-gold/25 select-none"
                    >
                      “
                    </span>

                    <figcaption className="flex items-center gap-3">
                      <ReviewerAvatar
                        name={review.authorName}
                        src={review.authorAvatar}
                      />
                      <span className="min-w-0">
                        <span className="block text-[15px] font-semibold text-charcoal truncate">
                          {review.authorName}
                        </span>
                        <span className="block text-xs text-muted">
                          {review.authorLocation}
                          {review.verifiedPurchase && (
                            <span className="text-gold-dark"> · {t.verifiedPurchase}</span>
                          )}
                        </span>
                      </span>
                    </figcaption>

                    <p
                      className="mt-4 text-gold text-sm tracking-widest"
                      aria-label={t.stars(review.rating)}
                    >
                      {"★".repeat(review.rating)}
                    </p>
                    <blockquote className="mt-2 flex-1 text-[15px] text-charcoal/85 leading-relaxed line-clamp-4">
                      {review.content}
                    </blockquote>

                    {product && (
                      <Link
                        href={`/san-pham/${product.slug}`}
                        className="group mt-4 pt-4 border-t border-gold/20 flex items-center gap-3"
                      >
                        <span className="relative w-10 h-10 shrink-0 overflow-hidden rounded-lg bg-cream">
                          <Image
                            src={product.images[0]}
                            alt=""
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </span>
                        <span className="min-w-0 text-xs">
                          <span className="block text-muted">{t.purchased}</span>
                          <span className="block truncate font-medium text-agarwood group-hover:text-gold-dark transition-colors">
                            {product.name}
                          </span>
                        </span>
                      </Link>
                    )}
                  </figure>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Showroom + newsletter */}
      <section className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="relative rounded-3xl bg-espresso text-white overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 py-14 sm:px-12 sm:py-16">
            {/* TODO: chủ shop thay bằng ảnh showroom thật. */}
            <Image
              src="/images/incense-sticks.jpg"
              alt={t.showroomImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Darker on the text side so the address stays readable */}
            <div className="absolute inset-0 bg-linear-to-r from-espresso-dark/95 via-espresso-dark/80 to-espresso-dark/40" />
            <div className="relative">
              <p className="text-sm font-medium text-gold-light">{t.showroomEyebrow}</p>
              <h2 className="mt-3 text-3xl sm:text-4xl text-white">
                {t.showroomTitle}
              </h2>
              <p className="mt-4 text-white/70 max-w-md leading-relaxed">
                {brandConfig.contact.showroomAddress}
                <br />
                {brand.workingHours}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={showroomMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold"
                >
                  {t.directions}
                </Button>
                <Button
                  href={`tel:${brandConfig.contact.hotline}`}
                  variant="outline-light"
                >
                  {t.call(brandConfig.contact.phoneFormatted)}
                </Button>
              </div>
            </div>
          </div>
          <div className="px-6 py-14 sm:px-12 sm:py-16 bg-espresso-dark/60 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl text-white">
              {t.newsletterTitle}
            </h2>
            <p className="mt-2 text-white/60 max-w-md">
              {t.newsletterBody}
            </p>
            <NewsletterForm className="mt-6 max-w-md" />
          </div>
        </FadeIn>
      </section>
    </div>
  );
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
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      <Link
        href={href}
        className="shrink-0 inline-flex items-center gap-0.5 text-[15px] text-gold-dark hover:underline underline-offset-4"
      >
        {linkLabel}
        <ChevronRight className="w-4 h-4" />
      </Link>
    </FadeIn>
  );
}
