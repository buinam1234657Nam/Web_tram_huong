import React from "react";
import Markdown, { type Components } from "react-markdown";

// Long-form reading styles for articles and policy pages.
// No typography plugin is installed, so each element is styled explicitly.
const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 text-2xl sm:text-[28px] font-semibold text-charcoal leading-snug">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 mb-3 text-xl font-semibold text-charcoal leading-snug">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-5 text-[17px] leading-[1.75] text-charcoal/85">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-5 space-y-3 pl-5 list-disc marker:text-gold-dark">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-5 space-y-3 pl-5 list-decimal marker:text-gold-dark marker:font-medium">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-1 text-[17px] leading-[1.7] text-charcoal/85">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-charcoal">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-gold-dark underline underline-offset-4 hover:text-espresso"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-gold pl-5 text-lg text-charcoal">
      {children}
    </blockquote>
  ),
};

export function MarkdownContent({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    // First element drops its top margin so the body aligns with what precedes it
    <div className={`max-w-[65ch] [&>*:first-child]:mt-0 ${className}`}>
      <Markdown components={components}>{children}</Markdown>
    </div>
  );
}
