import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BlogPost, BlogCategory } from '../../models/blog-post.interface';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class BlogMockService {

  private categories: BlogCategory[] = [
    { id: 1, name: 'Tecnología', slug: 'tecnologia', description: 'Últimas tendencias en tecnología', color: 'blue' },
    { id: 2, name: 'Diseño Web', slug: 'diseno-web', description: 'Tips y tendencias de diseño', color: 'purple' },
    { id: 3, name: 'Desarrollo', slug: 'desarrollo', description: 'Tutoriales y buenas prácticas', color: 'green' },
    { id: 4, name: 'Marketing Digital', slug: 'marketing-digital', description: 'Estrategias de marketing online', color: 'orange' },
    { id: 5, name: 'UX/UI', slug: 'ux-ui', description: 'Experiencia y diseño de usuario', color: 'pink' }
  ];

  private blogPosts: BlogPost[] = [];

  constructor(private mockData: MockDataService) {
    this.initializeBlogPosts();
  }

  private initializeBlogPosts(): void {
    this.blogPosts = [
      {
        id: 1,
        title: 'Las Últimas Tendencias en Desarrollo Web 2024',
        excerpt: 'Descubre las tecnologías y frameworks más populares que están definiendo el futuro del desarrollo web.',
        content: 'El mundo del desarrollo web evoluciona constantemente. En 2024, vemos tendencias como Web Components, JAMstack, y Progressive Web Apps tomando protagonismo...',
        author: 'María González',
        authorImage: this.mockData.getAvatarPlaceholder('maria-gonzalez'),
        publishedAt: new Date('2024-01-15'),
        category: 'Tecnología',
        tags: ['React', 'Angular', 'Vue.js', 'Web Development'],
        featuredImage: this.mockData.getPlaceholderImage(800, 600, 'technology'),
        readTime: 8,
        slug: 'tendencias-desarrollo-web-2024',
        isPublished: true
      },
      {
        id: 2,
        title: 'Principios de Diseño UX para Aplicaciones Móviles',
        excerpt: 'Aprende los fundamentos del diseño de experiencia de usuario específicamente para dispositivos móviles.',
        content: 'El diseño UX para móviles requiere consideraciones especiales. Desde la navegación táctil hasta la optimización para diferentes tamaños de pantalla...',
        author: 'Carlos Ruiz',
        authorImage: this.mockData.getAvatarPlaceholder('carlos-ruiz'),
        publishedAt: new Date('2024-01-10'),
        category: 'UX/UI',
        tags: ['UX Design', 'Mobile', 'User Interface', 'Design Patterns'],
        featuredImage: this.mockData.getPlaceholderImage(800, 600, 'abstract'),
        readTime: 6,
        slug: 'principios-diseno-ux-moviles',
        isPublished: true
      },
      {
        id: 3,
        title: 'Optimización SEO para Sitios Web Modernos',
        excerpt: 'Guía completa para mejorar el posicionamiento de tu sitio web en los motores de búsqueda.',
        content: 'El SEO moderno va más allá de las palabras clave. Factores como Core Web Vitals, contenido de calidad y experiencia de usuario son fundamentales...',
        author: 'Ana López',
        authorImage: this.mockData.getAvatarPlaceholder('ana-lopez'),
        publishedAt: new Date('2024-01-05'),
        category: 'Marketing Digital',
        tags: ['SEO', 'Marketing', 'Google', 'Web Performance'],
        featuredImage: this.mockData.getPlaceholderImage(800, 600, 'business'),
        readTime: 10,
        slug: 'optimizacion-seo-sitios-modernos',
        isPublished: true
      },
      {
        id: 4,
        title: 'Introducción a Angular 18: Nuevas Características',
        excerpt: 'Explora las nuevas funcionalidades y mejoras que trae Angular 18 para desarrolladores.',
        content: 'Angular 18 introduce mejoras significativas en rendimiento, nuevas APIs y herramientas de desarrollo que facilitan la creación de aplicaciones...',
        author: 'Pedro Martín',
        authorImage: this.mockData.getAvatarPlaceholder('pedro-martin'),
        publishedAt: new Date('2024-01-20'),
        category: 'Desarrollo',
        tags: ['Angular', 'TypeScript', 'Frontend', 'Framework'],
        featuredImage: this.mockData.getPlaceholderImage(800, 600, 'technology'),
        readTime: 12,
        slug: 'introduccion-angular-18',
        isPublished: true
      },
      {
        id: 5,
        title: 'Diseño Responsivo: Mejores Prácticas 2024',
        excerpt: 'Técnicas avanzadas para crear sitios web que se adapten perfectamente a cualquier dispositivo.',
        content: 'El diseño responsivo es esencial en la era móvil. Container queries, CSS Grid y Flexbox ofrecen nuevas posibilidades para crear layouts flexibles...',
        author: 'Laura Fernández',
        authorImage: this.mockData.getAvatarPlaceholder('laura-fernandez'),
        publishedAt: new Date('2024-01-25'),
        category: 'Diseño Web',
        tags: ['Responsive Design', 'CSS', 'Mobile First', 'Web Design'],
        featuredImage: this.mockData.getPlaceholderImage(800, 600, 'abstract'),
        readTime: 7,
        slug: 'diseno-responsivo-mejores-practicas',
        isPublished: true
      }
    ];
  }

  getAllPosts(): Observable<BlogPost[]> {
    return of(this.blogPosts);
  }

  getPostById(id: number): Observable<BlogPost | undefined> {
    const post = this.blogPosts.find(p => p.id === id);
    return of(post);
  }

  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    const post = this.blogPosts.find(p => p.slug === slug);
    return of(post);
  }

  getPostsByCategory(category: string): Observable<BlogPost[]> {
    const posts = this.blogPosts.filter(p => p.category === category);
    return of(posts);
  }

  getFeaturedPosts(limit: number = 3): Observable<BlogPost[]> {
    const featured = this.blogPosts
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
    return of(featured);
  }

  getCategories(): Observable<BlogCategory[]> {
    return of(this.categories);
  }

  getRecentPosts(limit: number = 5): Observable<BlogPost[]> {
    const recent = this.blogPosts
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
    return of(recent);
  }
}