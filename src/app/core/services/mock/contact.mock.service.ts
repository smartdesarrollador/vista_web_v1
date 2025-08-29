import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ContactInfo, ContactForm, SocialLinks } from '../../models/contact-info.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactMockService {

  private contactInfo: ContactInfo = {
    id: 1,
    address: 'Av. Tecnológica 123, Edificio Innovation',
    city: 'Madrid',
    state: 'Comunidad de Madrid',
    country: 'España',
    zipCode: '28001',
    phone: '+34 91 123 4567',
    email: 'hola@tuempresa.com',
    website: 'www.tuempresa.com',
    coordinates: {
      lat: 40.4168,
      lng: -3.7038
    }
  };

  private socialLinks: SocialLinks = {
    facebook: 'https://facebook.com/tuempresa',
    twitter: 'https://twitter.com/tuempresa',
    instagram: 'https://instagram.com/tuempresa',
    linkedin: 'https://linkedin.com/company/tuempresa',
    youtube: 'https://youtube.com/c/tuempresa',
    github: 'https://github.com/tuempresa'
  };

  private officeHours = [
    { day: 'Lunes', hours: '9:00 - 18:00', isOpen: true },
    { day: 'Martes', hours: '9:00 - 18:00', isOpen: true },
    { day: 'Miércoles', hours: '9:00 - 18:00', isOpen: true },
    { day: 'Jueves', hours: '9:00 - 18:00', isOpen: true },
    { day: 'Viernes', hours: '9:00 - 17:00', isOpen: true },
    { day: 'Sábado', hours: '10:00 - 14:00', isOpen: true },
    { day: 'Domingo', hours: 'Cerrado', isOpen: false }
  ];

  private departments = [
    { name: 'Ventas', email: 'ventas@tuempresa.com', phone: '+34 91 123 4567' },
    { name: 'Soporte Técnico', email: 'soporte@tuempresa.com', phone: '+34 91 123 4568' },
    { name: 'Proyectos', email: 'proyectos@tuempresa.com', phone: '+34 91 123 4569' },
    { name: 'Recursos Humanos', email: 'rrhh@tuempresa.com', phone: '+34 91 123 4570' }
  ];

  constructor() { }

  getContactInfo(): Observable<ContactInfo> {
    return of(this.contactInfo);
  }

  getSocialLinks(): Observable<SocialLinks> {
    return of(this.socialLinks);
  }

  getOfficeHours(): Observable<any[]> {
    return of(this.officeHours);
  }

  getDepartments(): Observable<any[]> {
    return of(this.departments);
  }

  submitContactForm(form: ContactForm): Observable<{ success: boolean; message: string }> {
    // Simular envío de formulario
    const response = {
      success: true,
      message: 'Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos en breve.'
    };
    
    // Simular delay de red
    return of(response).pipe(delay(1500));
  }

  subscribeNewsletter(email: string): Observable<{ success: boolean; message: string }> {
    // Simular suscripción a newsletter
    const response = {
      success: true,
      message: '¡Gracias por suscribirte! Recibirás nuestras últimas noticias y actualizaciones.'
    };
    
    return of(response).pipe(delay(1000));
  }

  getLocationCoordinates(): Observable<{ lat: number; lng: number }> {
    return of(this.contactInfo.coordinates!);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }
}