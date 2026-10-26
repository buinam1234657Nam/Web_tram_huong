"use client";

import React, { forwardRef } from "react";
import NextLink from "next/link";
import { useLocalizePath } from "@/i18n/client";

type NextLinkProps = React.ComponentProps<typeof NextLink>;

/**
 * Drop-in for next/link that keeps the visitor in their language:
 * href="/san-pham" becomes "/en/san-pham" on English pages.
 * External, tel:, mailto: and /api links pass through unchanged.
 */
const Link = forwardRef<HTMLAnchorElement, NextLinkProps>(function Link(
  { href, ...props },
  ref,
) {
  const localize = useLocalizePath();
  const localized =
    typeof href === "string"
      ? localize(href)
      : href.pathname
        ? { ...href, pathname: localize(href.pathname) }
        : href;
  return <NextLink ref={ref} href={localized} {...props} />;
});

export default Link;
