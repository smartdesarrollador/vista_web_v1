export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  images: string[];
  technologies: string[];
  category: string;
  projectUrl?: string;
  githubUrl?: string;
  clientName?: string;
  completedDate: Date;
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface PortfolioCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
}