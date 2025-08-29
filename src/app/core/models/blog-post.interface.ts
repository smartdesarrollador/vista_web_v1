export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishedAt: Date;
  category: string;
  tags: string[];
  featuredImage: string;
  readTime: number;
  slug?: string;
  isPublished?: boolean;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}