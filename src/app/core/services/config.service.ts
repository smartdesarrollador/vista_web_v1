import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CompanyInfo, HeroSection } from '../models/company-info.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private companyInfo: CompanyInfo = {
    id: 1,
    name: 'TechSolutions Pro',
    tagline: 'Transformamos ideas en soluciones digitales',
    description: 'Somos una empresa especializada en desarrollo web, aplicaciones móviles y consultoría tecnológica. Nuestro equipo de expertos trabaja con las últimas tecnologías para crear soluciones innovadoras que impulsen el crecimiento de tu negocio.',
    mission: 'Democratizar la tecnología ayudando a empresas de todos los tamaños a digitalizar sus procesos y alcanzar sus objetivos de negocio a través de soluciones tecnológicas accesibles e innovadoras.',
    vision: 'Ser la empresa líder en transformación digital, reconocida por la excelencia en nuestros servicios y el impacto positivo en el éxito de nuestros clientes.',
    values: [
      'Innovación constante',
      'Calidad sin compromisos',
      'Transparencia total',
      'Orientación al cliente',
      'Trabajo en equipo',
      'Responsabilidad social'
    ],
    foundedYear: 2016,
    logo: '/assets/images/logo.png',
    favicon: '/assets/images/favicon.ico',
    primaryColor: '#3B82F6',
    secondaryColor: '#64748B',
    accentColor: '#10B981'
  };

  private heroSection: HeroSection = {
    id: 1,
    title: 'Impulsa tu Negocio con Tecnología de Vanguardia',
    subtitle: 'Desarrollo Web | Apps Móviles | Consultoría IT',
    description: 'Creamos soluciones digitales que transforman ideas en realidad. Desde sitios web modernos hasta aplicaciones móviles innovadoras, ayudamos a empresas a destacar en el mundo digital.',
    backgroundImage: 'https://images.unsplash.com/1920x1080/?technology,business',
    ctaText: 'Comenzar Proyecto',
    ctaLink: '/contacto',
    secondaryCtaText: 'Ver Catálogo',
    secondaryCtaLink: '/galeria'
  };

  constructor() { }

  /**
   * Obtiene la configuración del entorno
   */
  getEnvironmentConfig(): any {
    return environment;
  }

  /**
   * Verifica si se deben usar datos mock
   */
  shouldUseMockData(): boolean {
    return environment.useMockData || false;
  }

  /**
   * Verifica si están habilitadas las imágenes placeholder
   */
  isPlaceholderImagesEnabled(): boolean {
    return environment.placeholderImagesEnabled || false;
  }

  /**
   * Verifica si están habilitadas las animaciones
   */
  isAnimationsEnabled(): boolean {
    return environment.animationsEnabled || true;
  }

  /**
   * Obtiene información de la empresa
   */
  getCompanyInfo(): Observable<CompanyInfo> {
    return of(this.companyInfo);
  }

  /**
   * Obtiene la configuración de la sección hero
   */
  getHeroSection(): Observable<HeroSection> {
    return of(this.heroSection);
  }

  /**
   * Obtiene la configuración de colores del tema
   */
  getThemeColors(): { primary: string; secondary: string; accent: string } {
    return {
      primary: this.companyInfo.primaryColor,
      secondary: this.companyInfo.secondaryColor || '#64748B',
      accent: this.companyInfo.accentColor || '#10B981'
    };
  }

  /**
   * Obtiene configuración de URLs
   */
  getApiConfig(): { baseUrl: string; apiUrl: string } {
    return {
      baseUrl: environment.urlDominioApi,
      apiUrl: environment.apiUrl
    };
  }

  /**
   * Obtiene configuración para SEO
   */
  getSEOConfig(): any {
    return {
      siteName: this.companyInfo.name,
      siteDescription: this.companyInfo.description,
      siteUrl: 'https://your-domain.com', // Cambiar por la URL real
      ogImage: this.companyInfo.logo,
      twitterHandle: '@tuempresa'
    };
  }

  /**
   * Obtiene configuración de análiticas
   */
  getAnalyticsConfig(): any {
    return {
      googleAnalyticsId: 'GA_TRACKING_ID', // Reemplazar con ID real
      facebookPixelId: 'FB_PIXEL_ID', // Reemplazar con ID real
      hotjarId: 'HOTJAR_ID' // Reemplazar con ID real
    };
  }

  /**
   * Configuración de features flags
   */
  getFeatureFlags(): any {
    return {
      enableBlog: true,
      enableGaleria: true,
      enableTestimonials: true,
      enableTeam: true,
      enableServices: true,
      enableContact: true,
      enableNewsletter: true,
      enableChatbot: false,
      enableDarkMode: true,
      enableMultiLanguage: false
    };
  }
}