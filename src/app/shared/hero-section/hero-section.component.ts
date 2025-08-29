import { 
  Component, 
  OnInit, 
  HostListener, 
  ElementRef, 
  ViewChild,
  PLATFORM_ID,
  Inject,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConfigService } from '../../core/services/config.service';
import { HeroSection } from '../../core/models/company-info.interface';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent implements OnInit {
  @ViewChild('heroContainer', { static: false }) heroContainer!: ElementRef;
  
  private configService = inject(ConfigService);
  private isBrowser: boolean = false;
  
  heroData: HeroSection | null = null;
  scrollY: number = 0;
  isVisible: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadHeroData();
    
    // Activar animaciones después de un pequeño delay
    if (this.isBrowser) {
      setTimeout(() => {
        this.isVisible = true;
      }, 100);
    }
  }

  private loadHeroData(): void {
    this.configService.getHeroSection().subscribe({
      next: (hero) => {
        this.heroData = hero;
      },
      error: (error) => {
        console.error('Error al cargar hero section:', error);
        // Fallback data
        this.heroData = {
          id: 1,
          title: 'Impulsa tu Negocio con Tecnología de Vanguardia',
          subtitle: 'Desarrollo Web | Apps Móviles | Consultoría IT',
          description: 'Creamos soluciones digitales que transforman ideas en realidad.',
          backgroundImage: 'https://images.unsplash.com/1920x1080/?technology,business',
          ctaText: 'Comenzar Proyecto',
          ctaLink: '/contacto',
          secondaryCtaText: 'Ver Catálogo',
          secondaryCtaLink: '/galeria'
        };
      }
    });
  }

  // Efecto parallax en el scroll
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.isBrowser && this.heroContainer) {
      this.scrollY = window.scrollY;
    }
  }

  // Animación de typing effect (opcional)
  getTypingAnimation(text: string): string {
    return text;
  }
}