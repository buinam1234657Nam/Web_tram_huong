import React from "react";
import { Metadata } from "next";
import { guideContentFor } from "@/data/content/nhan-biet-tram";
import { ritualsFor } from "@/data/content/rituals";
import { localeAlternates, localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { guideMessages } from "@/i18n/messages/guide";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/MotionPrimitives";
import { AuthenticitySigns } from "@/components/product/AuthenticitySigns";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = guideMessages[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: localeAlternates("/hieu-ve-tram", locale),
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      url: localizePath("/hieu-ve-tram", locale),
      images: [
        {
          url: "/images/raw-agarwood.jpg",
          width: 1024,
          height: 1024,
          alt: t.ogImageAlt,
        },
      ],
    },
  };
}

const CONTAINER = "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8";

const SECTIONS = [
  { id: "loai-tram", key: "grades" },
  { id: "vung-tram", key: "regions" },
  { id: "tuoi-tram", key: "age" },
  { id: "nhan-biet", key: "authenticity" },
] as const;

export default async function AgarwoodGuidePage() {
  const locale = await getLocale();
  const t = guideMessages[locale];
  const { gradeGuide, regionGuide, resinAgeNotes } = guideContentFor(locale);
  const breadcrumbs = [{ label: t.breadcrumb, href: "/hieu-ve-tram" }];

  return (
    <div className="pb-24">
      <div className={`${CONTAINER} pt-6`}>
        <BreadcrumbJsonLd items={breadcrumbs} />
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <header className={`${CONTAINER} mt-10 sm:mt-14`}>
        <p className="text-sm font-medium text-gold-dark">{t.eyebrow}</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold leading-[1.12] tracking-tight max-w-3xl">
          {t.title}
        </h1>
        <p className="mt-5 text-[17px] text-muted leading-relaxed max-w-2xl">
          {t.intro}
        </p>
        <nav aria-label={t.tocLabel} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex items-center h-10 px-4 rounded-full border border-gold/40 text-sm text-agarwood-dark hover:bg-ivory transition-colors"
                >
                  {t.sections[s.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section
        id="loai-tram"
        className={`${CONTAINER} mt-16 sm:mt-20 scroll-mt-[calc(var(--header-h)+1rem)]`}
      >
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl">{t.gradesTitle}</h2>
          <p className="mt-3 text-[15px] text-muted max-w-2xl leading-relaxed">
            {t.gradesBody}
          </p>
        </FadeIn>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gradeGuide.map((g, idx) => (
            <FadeIn
              key={g.grade}
              delay={(idx % 2) * 0.12}
              className="h-full rounded-2xl border border-gold/30 bg-ivory-light p-6"
            >
              <h3 className="text-xl font-semibold text-agarwood">{g.title}</h3>
              <p className="mt-2 text-[15px] text-charcoal/80 leading-relaxed">
                {g.body}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section
        id="vung-tram"
        className="mt-16 sm:mt-20 bg-espresso-dark text-white scroll-mt-[calc(var(--header-h)+1rem)]"
      >
        <div className={`${CONTAINER} py-16 sm:py-20`}>
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl text-white">
              {t.regionsTitle}
            </h2>
            <p className="mt-3 text-[15px] text-white/70 max-w-2xl leading-relaxed">
              {t.regionsBody}
            </p>
          </FadeIn>
          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {regionGuide.map((r) => (
              <div
                key={r.name}
                className="rounded-2xl border border-gold/30 bg-white/5 p-6"
              >
                <dt className="text-lg font-semibold text-gold-light">
                  {r.name}
                </dt>
                <dd className="mt-2 text-[15px] text-white/75 leading-relaxed">
                  {r.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="tuoi-tram"
        className={`${CONTAINER} mt-16 sm:mt-20 scroll-mt-[calc(var(--header-h)+1rem)]`}
      >
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl">
            {t.ageTitle}
          </h2>
        </FadeIn>
        <ul className="mt-8 space-y-4 max-w-3xl">
          {resinAgeNotes.map((note) => (
            <li
              key={note}
              className="flex gap-4 text-[17px] text-charcoal/85 leading-relaxed"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 w-2 h-2 shrink-0 rounded-full bg-gold"
              />
              {note}
            </li>
          ))}
        </ul>
      </section>

      <section
        id="nhan-biet"
        className={`${CONTAINER} mt-16 sm:mt-20 scroll-mt-[calc(var(--header-h)+1rem)]`}
      >
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl">
            {t.authenticityTitle}
          </h2>
          <p className="mt-3 text-[15px] text-muted max-w-2xl leading-relaxed">
            {t.authenticityBody}
          </p>
        </FadeIn>
        <div className="mt-8">
          <AuthenticitySigns variant="cards" />
        </div>
      </section>

      <section className={`${CONTAINER} mt-16 sm:mt-20`}>
        <FadeIn className="rounded-3xl bg-ivory p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl">{t.ritualsTitle}</h2>
          <p className="mt-3 text-[15px] text-muted max-w-xl mx-auto">
            {t.ritualsBody}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {ritualsFor(locale).map((r) => (
              <Button key={r.slug} href={`/nhu-cau/${r.slug}`} variant="outline">
                {r.label}
              </Button>
            ))}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
