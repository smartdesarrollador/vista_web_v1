export interface StatItem {
  id: number;
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: string;
  description?: string;
  color?: string;
  isAnimated?: boolean;
  order?: number;
}

export interface CompanyStats {
  yearsInBusiness: number;
  projectsCompleted: number;
  happyClients: number;
  teamMembers: number;
  awards?: number;
  countriesServed?: number;
}