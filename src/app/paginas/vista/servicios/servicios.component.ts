import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeatureCardsComponent } from '../../../shared/feature-cards/feature-cards.component';
import { FeatureCard } from '../../../shared/feature-cards/feature-cards.component';
import { ServicesMockService } from '../../../core/services/mock/services.mock.service';
import { ServiceItem } from '../../../core/models/service-item.interface';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FeatureCardsComponent
  ],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent implements OnInit {
  serviciosPrincipales: FeatureCard[] = [];

  constructor(
    private servicesMockService: ServicesMockService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setPageSEO('servicios');
    this.cargarServicios();
  }

  private cargarServicios(): void {
    this.servicesMockService.getAllServices().subscribe({
      next: (servicios: ServiceItem[]) => {
        this.serviciosPrincipales = servicios.map(servicio => ({
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
