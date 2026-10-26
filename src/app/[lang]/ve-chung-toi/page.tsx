import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { ChevronRight } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";
import { ABOUT_INTRO, aboutContentFor } from "@/data/content/about";
import { localeAlternates, localizePath, type Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { aboutMessages } from "@/i18n/messages/about";
import { brandMessages } from "@/i18n/messages/brand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/MotionPrimitives";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = aboutMessages[locale];
  const { intro } = aboutContentFor(locale);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: localeAlternates("/ve-chung-toi", locale),
    openGraph: {
      title: t.metaTitle,
      description: t.ogDescription,
      url: localizePath("/ve-chung-toi", locale),
      images: [
        {
          url: ABOUT_INTRO.image,
          width: 1376,
          height: 768,
          alt: intro.shot,
        },
      ],
    },
  };
}

const CONTAINER = "max-w-site mx-auto px-4 sm:px-6 lg:px-8";

const mapLink = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default async function AboutUsPage() {
  const locale = await getLocale();
  const t = aboutMessages[locale];
  const {
    intro: ABOUT_INTRO,
    philosophy: PHILOSOPHY,
    timeline: TIMELINE,
    team: TEAM,
  } = aboutContentFor(locale);
  const breadcrumbs = [{ label: t.breadcrumb, href: "/ve-chung-toi" }];
  const { contact } = brandConfig;

  return (
    <div className="pb-24">
      <div className={`${CONTAINER} pt-6`}>
        <BreadcrumbJsonLd items={breadcrumbs} />
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Intro: text beside the photo, so the first screen isn't one huge stack */}
      <header
        className={`${CONTAINER} mt-8 sm:mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-14`}
      >
        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-gold-dark">
            {ABOUT_INTRO.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold text-agarwood leading-[1.12] tracking-tight">
            {ABOUT_INTRO.title}
          </h1>
          <p className="mt-5 text-[17px] text-muted leading-relaxed">
            {ABOUT_INTRO.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/san-pham">{t.viewProducts}</Button>
            <Link
              href="#xuong"
              className="inline-flex items-center gap-0.5 text-[15px] text-gold-dark hover:underline underline-offset-4"
            >
              {t.visitLink}
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7 relative aspect-4/3 overflow-hidden rounded-md bg-ivory">
          <Image
            src={ABOUT_INTRO.image}
            alt={ABOUT_INTRO.shot}
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
      </header>

      {/* Philosophy: one readable column, then the three rules as a row */}
      <section
        aria-labelledby="philosophy-title"
        className="mt-20 sm:mt-28 bg-cream-dark py-16 sm:py-20"
      >
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <h2
              id="philosophy-title"
              className="text-3xl sm:text-4xl font-semibold text-charcoal leading-[1.15] tracking-tight"
            >
              {PHILOSOPHY.title}
            </h2>
            <div className="mt-6 space-y-4 text-[17px] text-charcoal/85 leading-[1.75]">
              {PHILOSOPHY.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
            {PHILOSOPHY.rules.map((rule) => (
              <li
                key={rule.title}
                className="border-t border-border-dark/20 pt-5"
              >
                <h3 className="text-lg font-semibold text-charcoal">
                  {rule.title}
                </h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">
                  {rule.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Timeline: year · story · photo on one row */}
      <section
        aria-labelledby="timeline-title"
        className={`${CONTAINER} mt-20 sm:mt-28`}
      >
        <p className="text-sm font-medium text-gold-dark">
          {t.timelineEyebrow}
        </p>
        <h2
          id="timeline-title"
          className="mt-3 text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight"
        >
          {t.timelineTitle}
        </h2>
        <FadeIn>
          <ol className="mt-10 border-t border-border-subtle">
            {TIMELINE.map((entry) => (
              <li
                key={entry.year}
                className="grid grid-cols-1 gap-4 border-b border-border-subtle py-8 sm:grid-cols-[110px_1fr] lg:grid-cols-[150px_1fr_260px] lg:items-center lg:gap-10"
              >
                <p className="text-2xl sm:text-3xl font-semibold text-gold-dark tracking-tight">
                  {entry.year}
                </p>
                <div className="max-w-xl">
                  <h3 className="text-xl font-semibold text-charcoal">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-muted leading-relaxed">
                    {entry.body}
                  </p>
                </div>
                <div className="relative aspect-4/3 overflow-hidden rounded-md bg-ivory sm:col-start-2 lg:col-start-auto">
                  <Image
                    src={entry.image}
                    alt={entry.shot}
                    fill
                    sizes="(max-width: 1024px) 100vw, 260px"
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ol>
        </FadeIn>
      </section>

      {/* The people */}
      <section
        aria-labelledby="team-title"
        className={`${CONTAINER} mt-20 sm:mt-28`}
      >
        <h2
          id="team-title"
          className="text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight"
        >
          {t.teamTitle}
        </h2>
        <FadeIn>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {TEAM.map((person) => (
              <li key={person.name}>
                <div className="relative aspect-3/4 overflow-hidden rounded-md bg-ivory">
                  <Image
                    src={person.image}
                    alt={person.shot}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-3 text-[15px] font-semibold text-charcoal">
                  {person.name}
                </h3>
                <p className="text-sm text-gold-dark">{person.role}</p>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {person.note}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      {/* Where to find us */}
      <section
        id="xuong"
        aria-labelledby="places-title"
        className={`${CONTAINER} mt-20 sm:mt-28 scroll-mt-24`}
      >
        <h2
          id="places-title"
          className="text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight"
        >
          {t.placesTitle}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Place
            title={t.workshopTitle}
            address={contact.address}
            note={t.workshopNote}
            locale={locale}
          />
          <Place
            title={t.showroomTitle}
            address={contact.showroomAddress}
            note={t.showroomNote(brandMessages[locale].workingHours)}
            locale={locale}
          />
        </div>
        <p className="mt-6 text-[15px] text-muted">
          {t.callBefore}{" "}
          <a
            href={`tel:${contact.hotline}`}
            className="font-medium text-charcoal underline underline-offset-4 hover:text-gold-dark"
          >
            {contact.phoneFormatted}
          </a>{" "}
          {t.callAfter}
        </p>
      </section>
    </div>
  );
}

function Place({
  title,
  address,
  note,
  locale,
}: {
  title: string;
  address: string;
  note: string;
  locale: Locale;
}) {
  return (
    <div className="rounded-md border border-border-subtle p-6 sm:p-8">
      <h3 className="text-xl font-semibold text-charcoal">{title}</h3>
      <p className="mt-2 text-[15px] text-charcoal">{address}</p>
      <p className="mt-2 text-sm text-muted leading-relaxed">{note}</p>
      <Link
        href={mapLink(address)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-0.5 text-[15px] text-gold-dark hover:underline underline-offset-4"
      >
        {aboutMessages[locale].directions}
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
