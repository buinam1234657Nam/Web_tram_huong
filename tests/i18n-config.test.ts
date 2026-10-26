import { describe, it, expect } from "vitest";
import { localeAlternates, localizePath, splitLocale } from "@/i18n/config";

describe("i18n paths", () => {
  it("keeps Vietnamese URLs unprefixed and prefixes English with /en", () => {
    expect(localizePath("/san-pham", "vi")).toBe("/san-pham");
    expect(localizePath("/san-pham", "en")).toBe("/en/san-pham");
    expect(localizePath("/", "en")).toBe("/en");
    expect(localizePath("/", "vi")).toBe("/");
  });

  it("re-localizes an already prefixed path instead of stacking prefixes", () => {
    expect(localizePath("/en/gio-hang", "en")).toBe("/en/gio-hang");
    expect(localizePath("/en/gio-hang", "vi")).toBe("/gio-hang");
    expect(localizePath("/vi/gio-hang", "en")).toBe("/en/gio-hang");
  });

  it("leaves external, protocol, anchor and API links alone", () => {
    for (const href of ["https://zalo.me/x", "tel:0908866989", "mailto:a@b.vn", "#faq", "/api/orders", "//cdn.example.com/a.png"]) {
      expect(localizePath(href, "en")).toBe(href);
    }
  });

  it("splits the locale off a pathname", () => {
    expect(splitLocale("/en/san-pham/abc")).toEqual({ locale: "en", path: "/san-pham/abc" });
    expect(splitLocale("/vi")).toEqual({ locale: "vi", path: "/" });
    expect(splitLocale("/san-pham")).toEqual({ locale: "vi", path: "/san-pham" });
    // A slug that merely starts with "en" is not a locale prefix.
    expect(splitLocale("/english-tea")).toEqual({ locale: "vi", path: "/english-tea" });
  });

  it("builds hreflang alternates", () => {
    expect(localeAlternates("/hieu-ve-tram", "en")).toEqual({
      canonical: "/en/hieu-ve-tram",
      languages: { "vi-VN": "/hieu-ve-tram", en: "/en/hieu-ve-tram", "x-default": "/hieu-ve-tram" },
    });
  });
});
