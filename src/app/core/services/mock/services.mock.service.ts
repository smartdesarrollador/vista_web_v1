import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceItem, ServiceCategory } from '../../models/service-item.interface';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesMockService {

  private categories: ServiceCategory[] = [
    { id: 1, name: 'Desarrollo Web', slug: 'desarrollo-web', description: 'Sitios web y aplicaciones personalizadas', icon: 'code' },
    { id: 2, name: 'Diseño Digital', slug: 'diseno-digital', description: 'Diseño UX/UI y branding', icon: 'palette' },
    { id: 3, name: 'Marketing Digital', slug: 'marketing-digital', description: 'SEO, SEM y redes sociales', icon: 'trending-up' },
    { id: 4, name: 'Consultoría IT', slug: 'consultoria-it', description: 'Asesoramiento tecnológico', icon: 'lightbulb' }
  ];

  private services: ServiceItem[] = [];

  constructor(private mockData: MockDataService) {
    this.initializeServices();
  }

  private initializeServices(): void {
    this.services = [
      {
        id: 1,
        title: 'Desarrollo Web Frontend',
        description: 'Creación de interfaces modernas y responsivas utilizando las últimas tecnologías como React, Angular y Vue.js.',
        icon: 'monitor',
        features: [
          'Diseño responsivo',
          'Optimización SEO',
          'Integración con APIs',
          'Progressive Web Apps (PWA)',
          'Animaciones y efectos visuales'
        ],
        price: 'Desde $2,500',
        image: this.mockData.getPlaceholderImage(400, 300, 'technology'),
        category: 'Desarrollo Web',
        isActive: true,
        order: 1
      },
      {
        id: 2,
        title: 'Desarrollo Backend',
        description: 'Construcción de APIs robustas y escalables con Node.js, Laravel, Django y otras tecnologías server-side.',
        icon: 'server',
        features: [
          'APIs REST y GraphQL',
          'Bases de datos optimizadas',
          'Autenticación y seguridad',
          'Integración con servicios cloud',
          'Documentación técnica'
        ],
        price: 'Desde $3,000',
        image: this.mockData.getPlaceholderImage(400, 300, 'technology'),
        category: 'Desarrollo Web',
        isActive: true,
        order: 2
      },
      {
        id: 3,
        title: 'Diseño UX/UI',
        description: 'Diseño de experiencias de usuario intuitivas y interfaces atractivas que convierten visitantes en clientes.',
        icon: 'brush',
        features: [
          'Research y análisis de usuarios',
          'Wireframes y prototipos',
          'Diseño visual moderno',
          'Testing de usabilidad',
          'Design System'
        ],
        price: 'Desde $1,800',
        image: this.mockData.getPlaceholderImage(400, 300, 'abstract'),
        category: 'Diseño Digital',
        isActive: true,
        order: 3
      },
      {
        id: 4,
        title: 'E-commerce Development',
        description: 'Tiendas online completas con sistemas de pago, gestión de inventario y experiencia de compra optimizada.',
        icon: 'shopping-cart',
        features: [
          'Catálogo de productos',
          'Carrito de compras',
          'Pasarelas de pago',
          'Panel de administración',
          'Analytics y reportes'
        ],
        price: 'Desde $4,500',
        image: this.mockData.getPlaceholderImage(400, 300, 'business'),
        category: 'Desarrollo Web',
        isActive: true,
        order: 4
      },
      {
        id: 5,
        title: 'SEO y Marketing Digital',
        description: 'Estrategias integrales para mejorar la visibilidad online y aumentar el tráfico orgánico de tu sitio web.',
        icon: 'search',
        features: [
          'Auditoría SEO completa',
          'Optimización on-page y off-page',
          'Estrategia de contenidos',
          'Google Ads y SEM',
          'Analytics e informes'
        ],
        price: 'Desde $800/mes',
        image: this.mockData.getPlaceholderImage(400, 300, 'business'),
        category: 'Marketing Digital',
        isActive: true,
        order: 5
      },
      {
        id: 6,
        title: 'Branding y Identidad Visual',
        description: 'Desarrollo completo de marca incluyendo logo, manual de marca y aplicaciones en diferentes medios.',
        icon: 'star',
        features: [
          'Diseño de logotipo',
          'Paleta de colores',
          'Tipografía corporativa',
          'Manual de marca',
          'Aplicaciones de marca'
        ],
        price: 'Desde $1,200',
        image: this.mockData.getPlaceholderImage(400, 300, 'abstract'),
        category: 'Diseño Digital',
        isActive: true,
        order: 6
      },
      {
        id: 7,
        title: 'Aplicaciones Móviles',
        description: 'Desarrollo de apps nativas y híbridas para iOS y Android con funcionalidades avanzadas.',
        icon: 'smartphone',
        features: [
          'Apps nativas iOS/Android',
          'Apps híbridas con React Native',
          'Integración con APIs',
          'Push notifications',
          'Publicación en stores'
        ],
        price: 'Desde $5,000',
        image: this.mockData.getPlaceholderImage(400, 300, 'technology'),
        category: 'Desarrollo Web',
        isActive: true,
        order: 7
      },
      {
        id: 8,
        title: 'Consultoría Tecnológica',
        description: 'Asesoramiento experto para la transformación digital y optimización de procesos tecnológicos.',
        icon: 'users',
        features: [
          'Análisis de requerimientos',
          'Arquitectura de soluciones',
          'Selección de tecnologías',
          'Plan de implementación',
          'Capacitación del equipo'
        ],
        price: 'Desde $150/hora',
        image: this.mockData.getPlaceholderImage(400, 300, 'business'),
        category: 'Consultoría IT',
        isActive: true,
        order: 8
      }
    ];
  }

  getAllServices(): Observable<ServiceItem[]> {
    return of(this.services.filter(s => s.isActive).sort((a, b) => (a.order || 0) - (b.order || 0)));
  }

  getServiceById(id: number): Observable<ServiceItem | undefined> {
    const service = this.services.find(s => s.id === id);
    return of(service);
  }

  getServicesByCategory(category: string): Observable<ServiceItem[]> {
    const services = this.services.filter(s => s.category === category && s.isActive);
    return of(services);
  }

  getFeaturedServices(limit: number = 4): Observable<ServiceItem[]> {
    const featured = this.services
      .filter(s => s.isActive)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .slice(0, limit);
    return of(featured);
  }

  getCategories(): Observable<ServiceCategory[]> {
    return of(this.categories);
  }
}