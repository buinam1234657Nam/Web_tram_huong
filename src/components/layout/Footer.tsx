"use client";

import React from "react";
import Link from "@/components/i18n/Link";
import { usePathname } from "next/navigation";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";
import { mockCategories } from "@/data/mock/categories";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { splitLocale } from "@/i18n/config";
import { useLocale, useMessages } from "@/i18n/client";
import { layoutMessages } from "@/i18n/messages/layout";
import { brandMessages } from "@/i18n/messages/brand";
import { localizeCategory } from "@/i18n/messages/categories";
import { DoBauBranch } from "@/components/ui/AgarwoodOrnaments";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  ZaloIcon,
} from "@/components/ui/SocialIcons";

type FooterText = (typeof layoutMessages)["vi"]["footer"];

const policyLinks = (t: FooterText) => [
  { href: "/chinh-sach/chinh-sach-bao-hanh", label: t.policyLinks.warranty },
  { href: "/chinh-sach/chinh-sach-doi-tra", label: t.policyLinks.returns },
  { href: "/chinh-sach/chinh-sach-giao-hang", label: t.policyLinks.shipping },
  { href: "/chinh-sach/chinh-sach-bao-mat", label: t.policyLinks.privacy },
];

const aboutLinks = (t: FooterText) => [
  { href: "/ve-chung-toi", label: t.aboutLinks.story },
  { href: "/hieu-ve-tram", label: t.aboutLinks.guide },
  { href: "/bai-viet", label: t.aboutLinks.news },
  { href: "/gio-hang", label: t.aboutLinks.cart },
];

const SOCIAL_LINKS = [
  { href: brandConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: brandConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: brandConfig.social.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: brandConfig.social.zalo, label: "Zalo", Icon: ZaloIcon },
];

export function Footer() {
  const { path: pathname } = splitLocale(usePathname());
  const locale = useLocale();
  const t = useMessages(layoutMessages).footer;
  const brand = useMessages(brandMessages);
  // Checkout stays distraction-free; the home page has its own signup next to the showroom.
  const showNewsletter = pathname !== "/thanh-toan" && pathname !== "/";
  const { contact } = brandConfig;

  return (
    <footer className="relative overflow-hidden bg-espresso-dark text-white/70 text-sm">
      {/* Faint dó bầu sprigs growing in from two corners */}
      <DoBauBranch className="-left-20 -bottom-24 size-130 opacity-20 hidden md:block" />
      <DoBauBranch className="-right-24 -top-28 size-100 opacity-12 rotate-180 hidden md:block" />

      <div className="relative max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {showNewsletter && (
          <div className="py-10 border-b border-white/10 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,560px)] gap-6 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl text-white">{t.newsletterTitle}</h3>
              <p className="mt-1 text-white/55">
                {t.newsletterBody}
              </p>
            </div>
            <NewsletterForm variant="pill" />
          </div>
        )}

        <div className="py-14 grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-2 lg:col-span-4 lg:pr-10">
            <Link href="/" className="inline-block leading-none">
              <span className="block text-xl font-semibold tracking-[0.28em] text-gold-light">
                {brandConfig.name}
              </span>
              <span className="block mt-1.5 text-[10px] uppercase tracking-[0.34em] text-white/50">
                {brand.wordmarkSubtitle}
              </span>
            </Link>
            <p className="mt-5 leading-relaxed text-white/60">{brand.storySummary}</p>

            <ul className="mt-6 space-y-3">
              <ContactRow icon={MapPin}>{contact.showroomAddress}</ContactRow>
              <ContactRow icon={Phone}>
                <a href={`tel:${contact.hotline}`} className="text-gold-light hover:text-white transition-colors">
                  {contact.phoneFormatted}
                </a>
              </ContactRow>
              <ContactRow icon={Mail}>
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </ContactRow>
              <ContactRow icon={Clock}>{brand.workingHours}</ContactRow>
            </ul>

            <ul className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="block w-10 h-10 rounded-full transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105"
                  >
                    <s.Icon className="w-10 h-10" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title={t.products} className="lg:col-span-3">
            {mockCategories.map((c) => (
              <FooterLink key={c.id} href={`/danh-muc/${c.slug}`}>
                {localizeCategory(c, locale).name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t.policies} className="lg:col-span-3">
            {policyLinks(t).map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t.about} className="lg:col-span-2">
            {aboutLinks(t).map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/45">
          <p>© 2026 {brandConfig.name}. {t.rights}</p>
          <p>{brand.origin}</p>
        </div>
      </div>
    </footer>
  );
}

function ContactRow({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3 text-white/65">
      <Icon className="mt-0.5 w-4 h-4 shrink-0 text-gold" />
      <span>{children}</span>
    </li>
  );
}

function FooterColumn({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h4 className="text-[13px] uppercase tracking-[0.16em] text-gold-light font-semibold mb-5">{title}</h4>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-gold-light transition-colors">
        {children}
      </Link>
    </li>
  );
}
