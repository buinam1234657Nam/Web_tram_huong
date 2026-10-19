export interface Category {
  id: string;
  slug: string;
  name: string;
  vietnameseName: string;
  description: string;
  image: string;
  productCount: number;
  featured?: boolean;
}
