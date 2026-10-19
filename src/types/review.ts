export interface Review {
  id: string;
  productId: string;
  authorName: string;
  authorLocation: string;
  verifiedPurchase: boolean;
  rating: number; // 1-5
  date: string;
  title: string;
  content: string;
  variantPurchased?: string;
  helpfulCount: number;
}
