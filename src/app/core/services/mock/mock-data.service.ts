import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  /**
   * Simula una petición HTTP con delay aleatorio
   */
  private simulateHttpCall<T>(data: T, delayMs: number = 500): Observable<T> {
    return of(data).pipe(delay(delayMs));
  }

  /**
   * Genera URLs de imágenes placeholder
   */
  getPlaceholderImage(width: number, height: number, category: string = 'business'): string {
    const categories = {
      business: 'https://picsum.photos',
      technology: 'https://picsum.photos',
      people: 'https://picsum.photos', 
      nature: 'https://picsum.photos',
      abstract: 'https://picsum.photos'
    };
    
    const baseUrl = categories[category as keyof typeof categories] || categories.business;
    const seed = Math.floor(Math.random() * 1000);
    return `${baseUrl}/${width}/${height}?random=${seed}`;
  }

  /**
   * Genera avatares placeholder
   */
  getAvatarPlaceholder(seed: string): string {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
  }

  /**
   * Genera fechas aleatorias dentro de un rango
   */
  getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  /**
   * Selecciona elementos aleatorios de un array
   */
  getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}