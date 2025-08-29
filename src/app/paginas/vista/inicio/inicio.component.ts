import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeroSectionComponent } from '../../../shared/hero-section/hero-section.component';
import { FeatureCardsComponent } from '../../../shared/feature-cards/feature-cards.component';
import { FeatureCard } from '../../../shared/feature-cards/feature-cards.component';
import { ServicesMockService } from '../../../core/services/mock/services.mock.service';
import { TestimonialsMockService } from '../../../core/services/mock/testimonials.mock.service';
import { BlogMockService } from '../../../core/services/mock/blog.mock.service';
import { StatsMockService } from '../../../core/services/mock/stats.mock.service';
import { SeoService } from '../../../core/services/seo.service';
import { ServiceItem } from '../../../core/models/service-item.interface';
import { Testimonial } from '../../../core/models/testimonial.interface';
import { BlogPost } from '../../../core/models/blog-post.interface';
import { StatItem } from '../../../core/models/stat-item.interface';

interface Beneficio {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink,
    HeroSectionComponent,
    FeatureCardsComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  serviciosDestacados: FeatureCard[] = [];
  testimoniosDestacados: Testimonial[] = [];
  articulosBlog: FeatureCard[] = [];
  estadisticas: { value: string; label: string }[] = [];
  isBrowser: boolean = false;

  beneficios: Beneficio[] = [
    {
      title: 'Experiencia Comprobada',
      description: 'Más de 8 años desarrollando soluciones digitales exitosas para empresas de todos los sectores.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>'
    },
    {
      title: 'Metodología Ágil',
      description: 'Utilizamos metodologías ágiles para entregar proyectos de calidad en tiempos optimizados.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>'
    },
    {
      title: 'Soporte Continuo',
      description: 'Brindamos soporte técnico continuo y mantenimiento para asegurar el éxito a largo plazo.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>'
    },
    {
      title: 'Tecnología Moderna',
      description: 'Empleamos las últimas tecnologías y mejores prácticas para crear soluciones innovadoras.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>'
    }
  ];

  constructor(
    private servicesMockService: ServicesMockService,
    private testimonialsMockService: TestimonialsMockService,
    private blogMockService: BlogMockService,
    private statsMockService: StatsMockService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Configurar SEO básico
    this.seoService.setPageSEO('inicio');
    
    this.cargarServicios();
    this.cargarTestimonios();
    this.cargarBlog();
    this.cargarEstadisticas();
  }

  private cargarServicios(): void {
    this.servicesMockService.getAllServices().subscribe({
      next: (servicios: ServiceItem[]) => {
        // Tomar los primeros 6 servicios para destacados
        this.serviciosDestacados = servicios.slice(0, 6).map(servicio => ({
          id: servicio.id,
          title: servicio.title,
          description: servicio.description,
          icon: this.mapServiceIcon(servicio.category),
          badge: undefined,
          features: servicio.features?.slice(0, 3),
          color: this.getServiceColor(servicio.category),
          size: 'medium',
          variant: 'default',
          link: `/servicios/${servicio.id}`
        }));
      },
      error: (error: any) => {
        console.error('Error al cargar servicios:', error);
      }
    });
  }

  private cargarTestimonios(): void {
    this.testimonialsMockService.getAllTestimonials().subscribe({
      next: (testimonials: Testimonial[]) => {
        // Filtrar testimonios destacados o tomar los primeros 3
        this.testimoniosDestacados = testimonials
          .filter(t => t.isFeatured)
          .slice(0, 3);
        
        // Si no hay suficientes destacados, completar con otros
        if (this.testimoniosDestacados.length < 3) {
          const needed = 3 - this.testimoniosDestacados.length;
          const others = testimonials
            .filter(t => !t.isFeatured)
            .slice(0, needed);
          this.testimoniosDestacados = [...this.testimoniosDestacados, ...others];
        }
      },
      error: (error: any) => {
        console.error('Error al cargar testimonios:', error);
      }
    });
  }

  private cargarBlog(): void {
    this.blogMockService.getAllPosts().subscribe({
      next: (posts: BlogPost[]) => {
        // Tomar los 3 posts más recientes
        const recentPosts = posts
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          .slice(0, 3);

        this.articulosBlog = recentPosts.map(post => ({
          id: post.id,
          title: post.title,
          description: post.excerpt,
          icon: 'chart-bar', // Icono genérico para blog
          image: post.featuredImage,
          badge: undefined,
          color: 'purple',
          size: 'medium',
          variant: 'default',
          link: `/blog/${post.slug}`
        }));
      },
      error: (error: any) => {
        console.error('Error al cargar blog:', error);
      }
    });
  }

  private cargarEstadisticas(): void {
    this.statsMockService.getAllStats().subscribe({
      next: (stats: StatItem[]) => {
        this.estadisticas = stats.slice(0, 4).map(stat => ({
          value: stat.value.toString(),
          label: stat.title
        }));
      },
      error: (error: any) => {
        console.error('Error al cargar estadísticas:', error);
      }
    });
  }

  private mapServiceIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      'web-development': 'code',
      'mobile-development': 'smartphone',
      'design': 'palette',
      'consulting': 'cog',
      'marketing': 'trending-up',
      'ecommerce': 'shopping-cart',
      'maintenance': 'support',
      'security': 'shield'
    };
    return iconMap[category] || 'star';
  }

  private getServiceColor(category: string): 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'indigo' {
    const colorMap: { [key: string]: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'indigo' } = {
      'web-development': 'blue',
      'mobile-development': 'purple',
      'design': 'pink',
      'consulting': 'indigo',
      'marketing': 'orange',
      'ecommerce': 'green',
      'maintenance': 'blue',
      'security': 'purple'
    };
    return colorMap[category] || 'blue';
  }
}
