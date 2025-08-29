export interface BlogItem {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  authorImage?: string;
  publishedDate: Date;
  updatedDate?: Date;
  category: string;
  tags: string[];
  readingTime: number;
  slug: string;
  isPublished: boolean;
  isFeatured?: boolean;
  viewCount?: number;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  count?: number;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  count?: number;
}