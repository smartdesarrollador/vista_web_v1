export interface ContactInfo {
  id: number;
  address: string;
  city: string;
  state?: string;
  country: string;
  zipCode?: string;
  phone: string;
  email: string;
  website?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  company?: string;
  budget?: string;
  service?: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  github?: string;
}