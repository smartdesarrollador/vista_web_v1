import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  // Método simple para establecer título y descripción
  setPageData(title: string, description: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
  }

  // Método básico para páginas principales
  setPageSEO(page: string) {
    const seoData = this.getPageSEOData(page);
    this.setPageData(seoData.title, seoData.description);
    this.meta.updateTag({ property: 'og:title', content: seoData.title });
    this.meta.updateTag({ property: 'og:description', content: seoData.description });
  }

  // Datos SEO básicos para cada página
  private getPageSEOData(page: string) {
    const baseTitle = 'Mi Empresa - ';
    const seoPages: { [key: string]: { title: string; description: string } } = {
      'inicio': {
        title: baseTitle + 'Inicio',
        description: 'Bienvenido a nuestra empresa. Ofrecemos servicios profesionales de calidad.'
      },
      'about': {
        title: baseTitle + 'Nosotros',
        description: 'Conoce más sobre nuestra empresa, nuestro equipo y nuestra historia.'
      },
      'servicios': {
        title: baseTitle + 'Servicios',
        description: 'Descubre todos los servicios profesionales que ofrecemos para tu negocio.'
      },
      'contacto': {
        title: baseTitle + 'Contacto',
        description: 'Ponte en contacto con nosotros. Te ayudamos a resolver tus necesidades.'
      },
      'galeria': {
        title: baseTitle + 'Catálogo',
        description: 'Mira nuestros trabajos y proyectos realizados para otros clientes.'
      },
      'blog': {
        title: baseTitle + 'Blog',
        description: 'Lee nuestros artículos y mantente informado sobre las últimas novedades.'
      },
      '404': {
        title: baseTitle + 'Página no encontrada',
        description: 'La página que buscas no existe. Vuelve al inicio para continuar navegando.'
      }
    };

    return seoPages[page] || {
      title: baseTitle + 'Página',
      description: 'Página de nuestra empresa con información relevante.'
    };
  }
}
