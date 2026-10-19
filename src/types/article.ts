export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or rich HTML
  coverImage: string;
  category: "Kiến thức Trầm" | "Nghệ thuật Thưởng trầm" | "Phong thủy & Tinh thần";
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  readingTimeMinutes: number;
  tags: string[];
}
