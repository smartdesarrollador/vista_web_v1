export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    website?: string;
  };
  skills: string[];
  email?: string;
  phone?: string;
  isActive?: boolean;
  order?: number;
}

export interface TeamDepartment {
  id: number;
  name: string;
  description?: string;
  members?: TeamMember[];
}