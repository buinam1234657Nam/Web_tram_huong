import React from "react";
import Link from "@/components/i18n/Link";
import { ChevronRight } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";
import { MarkdownContent } from "@/app/[lang]/bai-viet/MarkdownContent";

export interface PolicyData {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  content: string;
}

export function PolicyDetailView({
  currentSlug,
  policies,
}: {
  currentSlug: string;
  policies: PolicyData[];
}) {
  const policy = policies.find((p) => p.slug === currentSlug) ?? policies[0];

  return (
    <div className="mt-8 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-x-16">
      {/* Mobile: compact scrollable tabs so the document comes right after */}
      <nav
        aria-label="Chính sách"
        className="lg:hidden flex gap-6 overflow-x-auto no-scrollbar border-b border-border-subtle -mx-4 px-4 mb-8"
      >
        {policies.map((p) => (
          <PolicyLink key={p.slug} policy={p} active={p.slug === currentSlug}>
            {p.shortTitle}
          </PolicyLink>
        ))}
      </nav>

      {/* Desktop: quiet sidebar list */}
      <aside className="hidden lg:block lg:col-span-3">
        <nav
          aria-label="Chính sách"
          className="sticky top-[calc(var(--header-h)+2rem)]"
        >
          <p className="text-base font-medium text-charcoal">Chính sách</p>
          <ul className="mt-4 space-y-3">
            {policies.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/chinh-sach/${p.slug}`}
                  aria-current={p.slug === currentSlug ? "page" : undefined}
                  className={`text-[15px] transition-colors duration-300 ${
                    p.slug === currentSlug
                      ? "text-charcoal font-medium"
                      : "text-muted hover:text-charcoal"
                  }`}
                >
                  {p.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted leading-relaxed">
            Cần hỗ trợ thêm? Gọi{" "}
            <a
              href={`tel:${brandConfig.contact.hotline}`}
              className="text-charcoal font-medium hover:text-gold-dark"
            >
              {brandConfig.contact.phoneFormatted}
            </a>
          </p>
        </nav>
      </aside>

      <article className="lg:col-span-9">
        <h1 className="text-3xl sm:text-5xl font-semibold text-agarwood leading-[1.15] tracking-tight max-w-3xl">
          {policy.title}
        </h1>
        <p className="mt-5 text-lg text-muted leading-relaxed max-w-[60ch]">
          {policy.summary}
        </p>

        <MarkdownContent className="mt-10">{policy.content}</MarkdownContent>

        <div className="mt-14 pt-8 border-t border-border-subtle max-w-[65ch] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[15px] text-muted">
            Còn câu hỏi? Gọi{" "}
            <a
              href={`tel:${brandConfig.contact.hotline}`}
              className="text-charcoal font-medium hover:text-gold-dark"
            >
              {brandConfig.contact.phoneFormatted}
            </a>{" "}
            ({brandConfig.contact.workingHours}).
          </p>
          <Link
            href="/san-pham"
            className="shrink-0 inline-flex items-center gap-0.5 text-[15px] text-gold-dark hover:underline underline-offset-4"
          >
            Xem sản phẩm
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </div>
  );
}

function PolicyLink({
  policy,
  active,
  children,
}: {
  policy: PolicyData;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/chinh-sach/${policy.slug}`}
      aria-current={active ? "page" : undefined}
      className={`relative shrink-0 py-3 text-[15px] transition-colors duration-300 ${
        active ? "text-charcoal font-medium" : "text-muted"
      }`}
    >
      {children}
      {active && (
        <span className="absolute inset-x-0 -bottom-px h-px bg-espresso" />
      )}
    </Link>
  );
}
