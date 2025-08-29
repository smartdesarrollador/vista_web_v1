export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  image: string;
  category: string;
  isActive?: boolean;
  order?: number;
}

export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}