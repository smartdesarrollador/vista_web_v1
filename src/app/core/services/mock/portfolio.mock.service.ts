import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PortfolioItem, PortfolioCategory } from '../../models/portfolio-item.interface';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioMockService {

  private categories: PortfolioCategory[] = [
    { id: 1, name: 'Web Development', slug: 'web-development', description: 'Sitios web y aplicaciones', icon: 'globe', order: 1 },
    { id: 2, name: 'Mobile Apps', slug: 'mobile-apps', description: 'Aplicaciones móviles', icon: 'smartphone', order: 2 },
    { id: 3, name: 'E-commerce', slug: 'e-commerce', description: 'Tiendas online', icon: 'shopping-cart', order: 3 },
    { id: 4, name: 'UI/UX Design', slug: 'ui-ux-design', description: 'Diseño de interfaces', icon: 'palette', order: 4 }
  ];

  private portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'E-commerce Fashion Store',
      description: 'Plataforma de e-commerce completa para una boutique de moda con sistema de inventario, pasarela de pagos y panel administrativo.',
      shortDescription: 'Tienda online de moda con experiencia de usuario excepcional',
      images: [
        this.mockData.getPlaceholderImage(600, 400, 'business'),
        this.mockData.getPlaceholderImage(600, 400, 'abstract'),
        this.mockData.getPlaceholderImage(600, 400, 'technology')
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      category: 'E-commerce',
      projectUrl: 'https://fashion-boutique-demo.com',
      clientName: 'Fashion Boutique Co.',
      completedDate: new Date('2024-01-20'),
      isFeatured: true,
      isActive: true
    },
    {
      id: 2,
      title: 'Corporate Website Redesign',
      description: 'Rediseño completo del sitio web corporativo con enfoque en UX/UI moderno, optimización SEO y responsive design.',
      shortDescription: 'Rediseño web corporativo con enfoque en conversión',
      images: [
        this.mockData.getPlaceholderImage(600, 400, 'business'),
        this.mockData.getPlaceholderImage(600, 400, 'abstract')
      ],
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Firebase'],
      category: 'Web Development',
      projectUrl: 'https://corporate-site-demo.com',
      clientName: 'TechCorp Solutions',
      completedDate: new Date('2024-01-15'),
      isFeatured: true,
      isActive: true
    },
    {
      id: 3,
      title: 'Fitness Tracking Mobile App',
      description: 'Aplicación móvil para seguimiento de ejercicios y nutrición con sincronización cloud y gamificación.',
      shortDescription: 'App móvil de fitness con seguimiento avanzado',
      images: [
        this.mockData.getPlaceholderImage(600, 400, 'technology'),
        this.mockData.getPlaceholderImage(600, 400, 'abstract')
      ],
      technologies: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
      category: 'Mobile Apps',
      githubUrl: 'https://github.com/example/fitness-app',
      clientName: 'FitLife Startup',
      completedDate: new Date('2024-01-10'),
      isFeatured: true,
      isActive: true
    },
    {
      id: 4,
      title: 'Restaurant Management System',
      description: 'Sistema completo de gestión para restaurantes incluyendo POS, inventario, reservas y delivery.',
      shortDescription: 'Sistema integral para gestión de restaurantes',
      images: [
        this.mockData.getPlaceholderImage(600, 400, 'business'),
        this.mockData.getPlaceholderImage(600, 400, 'technology')
      ],
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Socket.io'],
      category: 'Web Development',
      projectUrl: 'https://restaurant-system-demo.com',
      clientName: 'Gourmet Restaurants',
      completedDate: new Date('2024-01-05'),
      isFeatured: false,
      isActive: true
    },
    {
      id: 5,
      title: 'Learning Management Platform',
      description: 'Plataforma educativa con cursos online, evaluaciones, certificados y sistema de videoconferencias.',
      shortDescription: 'Plataforma LMS completa para educación online',
      images: [
        this.mockData.getPlaceholderImage(600, 400, 'technology'),
        this.mockData.getPlaceholderImage(600, 400, 'abstract'),
        this.mockData.getPlaceholderImage(600, 400, 'business')
      ],
      technologies: ['Next.js', 'PostgreSQL', 'WebRTC', 'AWS S3'],
      category: 'Web Development',
      projectUrl: 'https://learning-platform-demo.com',
      clientName: 'EduTech Institute',
      completedDate: new Date('2023-12-28'),
      isFeatured: false,
      isActive: true
    },
    {
      id: 6,
      title: 'Banking Mobile App UI/UX',
      description: 'Rediseño completo de la experiencia de usuario para aplicación bancaria móvil con enfoque en seguridad y usabilidad.',
      shortDescription: 'Diseño UX/UI para app bancaria móvil',
      images: [
        this.mockData.getPlaceholderImage(600, 400, 'abstract'),
        this.mockData.getPlaceholderImage(600, 400, 'business')
      ],
      technologies: ['Figma', 'Principle', 'Adobe XD', 'InVision'],
      category: 'UI/UX Design',
      clientName: 'SecureBank Corp',
      completedDate: new Date('2023-12-20'),
      isFeatured: false,
      isActive: true
    },
    {
      id: 7,
      title: 'Real Estate Marketplace',
      description: 'Marketplace inmobiliario con búsqueda avanzada, tours virtuales 360°, sistema de citas y CRM integrado.',
      shortDescription: 'Marketplace inmobiliario con tours virtuales',
      images: [
        this.mockData.getPlaceholderImage(600, 400, 'business'),
        this.mockData.getPlaceholderImage(600, 400, 'technology')
      ],
      technologies: ['Angular', 'Django', 'PostgreSQL', '3D.js'],
      category: 'Web Development',
      projectUrl: 'https://realestate-marketplace-demo.com',
      clientName: 'PropertyPro Realty',
      completedDate: new Date('2023-12-15'),
      isFeatured: false,
      isActive: true
    },
    {
      id: 8,
      title: 'Inventory Management App',
      description: 'Aplicación móvil para gestión de inventarios con códigos QR, alertas automáticas y reportes en tiempo real.',
      shortDescription: 'App móvil para gestión de inventarios',
      images: [
        this.mockData.getPlaceholderImage(600, 400, 'technology'),
        this.mockData.getPlaceholderImage(600, 400, 'abstract')
      ],
      technologies: ['Flutter', 'Node.js', 'MongoDB', 'QR Scanner'],
      category: 'Mobile Apps',
      clientName: 'Logistics Solutions Inc',
      completedDate: new Date('2023-12-10'),
      isFeatured: false,
      isActive: true
    },
    {
      id: 9,
      title: 'SaaS Analytics Dashboard',
      description: 'Dashboard analítico para SaaS con visualizaciones interactivas, reportes personalizables y exportación de datos.',
      shortDescription: 'Dashboard de analytics para plataforma SaaS',
      images: [
        this.mockData.getPlaceholderImage(600, 400, 'abstract'),
        this.mockData.getPlaceholderImage(600, 400, 'technology')
      ],
      technologies: ['React', 'D3.js', 'Express.js', 'Redis'],
      category: 'Web Development',
      projectUrl: 'https://analytics-dashboard-demo.com',
      clientName: 'DataInsights SaaS',
      completedDate: new Date('2023-12-05'),
      isFeatured: true,
      isActive: true
    },
    {
      id: 10,
      title: 'Multi-vendor E-commerce',
      description: 'Marketplace multi-vendor con sistema de comisiones, panel para vendedores y marketplace administration.',
      shortDescription: 'Marketplace multi-vendor completo',
      images: [
        this.mockData.getPlaceholderImage(600, 400, 'business'),
        this.mockData.getPlaceholderImage(600, 400, 'technology'),
        this.mockData.getPlaceholderImage(600, 400, 'abstract')
      ],
      technologies: ['Laravel', 'Vue.js', 'MySQL', 'PayPal', 'Stripe'],
      category: 'E-commerce',
      projectUrl: 'https://multivendor-marketplace-demo.com',
      clientName: 'MarketHub Solutions',
      completedDate: new Date('2023-11-30'),
      isFeatured: false,
      isActive: true
    }
  ];

  constructor(private mockData: MockDataService) { }

  getAllItems(): Observable<PortfolioItem[]> {
    return of(this.portfolioItems.filter(item => item.isActive));
  }

  getItemById(id: number): Observable<PortfolioItem | undefined> {
    const item = this.portfolioItems.find(p => p.id === id);
    return of(item);
  }

  getItemsByCategory(category: string): Observable<PortfolioItem[]> {
    const items = this.portfolioItems.filter(p => p.category === category && p.isActive);
    return of(items);
  }

  getFeaturedItems(): Observable<PortfolioItem[]> {
    const featured = this.portfolioItems.filter(p => p.isFeatured && p.isActive);
    return of(featured);
  }

  getRecentItems(limit: number = 6): Observable<PortfolioItem[]> {
    const recent = this.portfolioItems
      .filter(p => p.isActive)
      .sort((a, b) => b.completedDate.getTime() - a.completedDate.getTime())
      .slice(0, limit);
    return of(recent);
  }

  getCategories(): Observable<PortfolioCategory[]> {
    return of(this.categories.sort((a, b) => (a.order || 0) - (b.order || 0)));
  }
}