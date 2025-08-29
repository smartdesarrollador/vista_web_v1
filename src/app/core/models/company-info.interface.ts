export interface CompanyInfo {
  id: number;
  name: string;
  tagline?: string;
  description: string;
  mission?: string;
  vision?: string;
  values?: string[];
  foundedYear: number;
  logo: string;
  favicon?: string;
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
}

export interface AboutSection {
  id: number;
  title: string;
  content: string;
  image?: string;
  features?: string[];
  order: number;
}

export interface HeroSection {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  backgroundImage?: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}