import { brandConfig } from "@/lib/config/brand";
import { defineMessages } from "../config";

/**
 * The translatable parts of brandConfig. Addresses, phone numbers and the
 * brand name stay as they are in every language.
 */
export const brandMessages = defineMessages({
  vi: {
    slogan: brandConfig.slogan,
    tagline: brandConfig.tagline,
    storySummary: brandConfig.storySummary,
    origin: brandConfig.origin,
    workingHours: brandConfig.contact.workingHours,
    wordmarkSubtitle: "Trầm Hương Việt",
  },
  en: {
    slogan: "Connecting nature and the soul",
    tagline: "Fine Natural Vietnamese Agarwood",
    storySummary:
      "Born in the natural aquilaria forests of Khanh Hoa and Tien Phuoc, Quang Nam, VĨNH TRẦM keeps agarwood's original scent and its quiet calm alive for modern life.",
    origin: "Van Gia, Van Ninh, Khanh Hoa & Tien Phuoc, Quang Nam, Vietnam",
    workingHours: "8:30 AM – 9:00 PM (Monday – Sunday)",
    wordmarkSubtitle: "Vietnamese Agarwood",
  },
});
