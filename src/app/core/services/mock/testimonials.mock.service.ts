import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Testimonial, TestimonialStats } from '../../models/testimonial.interface';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsMockService {

  private testimonials: Testimonial[] = [];
  
  private stats: TestimonialStats = {
    totalReviews: 120,
    averageRating: 4.8,
    fiveStarCount: 95,
    fourStarCount: 20,
    threeStarCount: 3,
    twoStarCount: 1,
    oneStarCount: 1
  };

  constructor(private mockData: MockDataService) {
    this.initializeTestimonials();
  }

  private initializeTestimonials(): void {
    this.testimonials = [
      {
        id: 1,
        name: 'Roberto Jiménez',
        position: 'CEO',
        company: 'TechStart Solutions',
        content: 'El equipo superó todas nuestras expectativas. Entregaron un producto de calidad excepcional en tiempo récord. Su profesionalismo y atención al detalle son incomparables.',
        rating: 5,
        avatar: this.mockData.getAvatarPlaceholder('roberto-jimenez'),
        date: new Date('2024-01-15'),
        isActive: true,
        isFeatured: true
      },
      {
        id: 2,
        name: 'Carmen Vázquez',
        position: 'Directora de Marketing',
        company: 'Innovate Corp',
        content: 'Trabajar con este equipo fue una experiencia fantástica. No solo cumplieron con todos los requisitos, sino que también sugirieron mejoras que no habíamos considerado.',
        rating: 5,
        avatar: this.mockData.getAvatarPlaceholder('carmen-vazquez'),
        date: new Date('2024-01-10'),
        isActive: true,
        isFeatured: true
      },
      {
        id: 3,
        name: 'Miguel Torres',
        position: 'Fundador',
        company: 'EcoGreen startup',
        content: 'La transformación digital de nuestro negocio no habría sido posible sin su expertise. Aumentamos nuestras ventas online en un 300% en solo 6 meses.',
        rating: 5,
        avatar: this.mockData.getAvatarPlaceholder('miguel-torres'),
        date: new Date('2024-01-05'),
        isActive: true,
        isFeatured: true
      },
      {
        id: 4,
        name: 'Isabel Moreno',
        position: 'Gerente General',
        company: 'Fashion Boutique',
        content: 'Su e-commerce es intuitivo y elegante. Nuestros clientes constantemente elogian la facilidad de navegación y el proceso de compra.',
        rating: 5,
        avatar: this.mockData.getAvatarPlaceholder('isabel-moreno'),
        date: new Date('2023-12-28'),
        isActive: true,
        isFeatured: false
      },
      {
        id: 5,
        name: 'Fernando Silva',
        position: 'Director IT',
        company: 'Global Services Inc',
        content: 'La migración de nuestra plataforma legacy fue compleja, pero manejaron cada desafío con profesionalismo. Zero downtime y resultados excepcionales.',
        rating: 5,
        avatar: this.mockData.getAvatarPlaceholder('fernando-silva'),
        date: new Date('2023-12-20'),
        isActive: true,
        isFeatured: false
      },
      {
        id: 6,
        name: 'Patricia Ruiz',
        position: 'Coordinadora de Proyectos',
        company: 'Creative Agency',
        content: 'La comunicación fue excelente durante todo el proyecto. Siempre estuvieron disponibles para resolver dudas y hacer ajustes según nuestras necesidades.',
        rating: 4,
        avatar: this.mockData.getAvatarPlaceholder('patricia-ruiz'),
        date: new Date('2023-12-15'),
        isActive: true,
        isFeatured: false
      },
      {
        id: 7,
        name: 'Andrés García',
        position: 'Product Manager',
        company: 'FinTech Solutions',
        content: 'Su enfoque en UX/UI resultó en una aplicación que nuestros usuarios adoran. Las métricas de engagement mejoraron significativamente.',
        rating: 5,
        avatar: this.mockData.getAvatarPlaceholder('andres-garcia'),
        date: new Date('2023-12-10'),
        isActive: true,
        isFeatured: false
      },
      {
        id: 8,
        name: 'Lucía Fernández',
        position: 'Directora Comercial',
        company: 'Wellness Center',
        content: 'El sistema de reservas online transformó nuestro negocio. Ahora podemos manejar 3x más citas con la mitad del esfuerzo administrativo.',
        rating: 5,
        avatar: this.mockData.getAvatarPlaceholder('lucia-fernandez'),
        date: new Date('2023-12-05'),
        isActive: true,
        isFeatured: false
      },
      {
        id: 9,
        name: 'Javier Molina',
        position: 'CEO',
        company: 'Logistics Pro',
        content: 'La optimización de nuestro sistema logístico redujo los costos operativos en un 25%. ROI excepcional en menos de 4 meses.',
        rating: 5,
        avatar: this.mockData.getAvatarPlaceholder('javier-molina'),
        date: new Date('2023-11-30'),
        isActive: true,
        isFeatured: false
      },
      {
        id: 10,
        name: 'Elena Castro',
        position: 'Head of Digital',
        company: 'Media Group',
        content: 'Su estrategia de marketing digital aumentó nuestro tráfico orgánico en un 400%. Los resultados hablan por sí solos.',
        rating: 4,
        avatar: this.mockData.getAvatarPlaceholder('elena-castro'),
        date: new Date('2023-11-25'),
        isActive: true,
        isFeatured: false
      },
      {
        id: 11,
        name: 'David Sánchez',
        position: 'Founder',
        company: 'EdTech Startup',
        content: 'La plataforma educativa que desarrollaron está siendo utilizada por más de 10,000 estudiantes. Escalabilidad y rendimiento impecables.',
        rating: 5,
        avatar: this.mockData.getAvatarPlaceholder('david-sanchez'),
        date: new Date('2023-11-20'),
        isActive: true,
        isFeatured: false
      },
      {
        id: 12,
        name: 'Monica Delgado',
        position: 'Operations Manager',
        company: 'Restaurant Chain',
        content: 'El sistema POS integrado mejoró nuestra eficiencia operativa dramáticamente. Los reportes en tiempo real son invaluables para la toma de decisiones.',
        rating: 4,
        avatar: this.mockData.getAvatarPlaceholder('monica-delgado'),
        date: new Date('2023-11-15'),
        isActive: true,
        isFeatured: false
      }
    ];
  }

  getAllTestimonials(): Observable<Testimonial[]> {
    return of(this.testimonials.filter(t => t.isActive));
  }

  getTestimonialById(id: number): Observable<Testimonial | undefined> {
    const testimonial = this.testimonials.find(t => t.id === id);
    return of(testimonial);
  }

  getFeaturedTestimonials(): Observable<Testimonial[]> {
    const featured = this.testimonials.filter(t => t.isActive && t.isFeatured);
    return of(featured);
  }

  getRandomTestimonials(limit: number = 3): Observable<Testimonial[]> {
    const active = this.testimonials.filter(t => t.isActive);
    const randomized = this.mockData.getRandomItems(active, limit);
    return of(randomized);
  }

  getTestimonialsByRating(rating: number): Observable<Testimonial[]> {
    const filtered = this.testimonials.filter(t => t.isActive && t.rating === rating);
    return of(filtered);
  }

  getTestimonialStats(): Observable<TestimonialStats> {
    return of(this.stats);
  }

  getRecentTestimonials(limit: number = 6): Observable<Testimonial[]> {
    const recent = this.testimonials
      .filter(t => t.isActive)
      .sort((a, b) => {
        const dateA = a.date ? a.date.getTime() : 0;
        const dateB = b.date ? b.date.getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, limit);
    return of(recent);
  }
}