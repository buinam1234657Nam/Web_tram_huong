export interface Review {
  id: string;
  productId: string;
  authorName: string;
  authorLocation: string;
  /** Customer's own photo, shared with their consent. Initials are shown when absent. */
  authorAvatar?: string;
  verifiedPurchase: boolean;
  rating: number; // 1-5
  date: string;
  title: string;
  content: string;
  variantPurchased?: string;
  helpfulCount: number;
}
