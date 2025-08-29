import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, fromEvent, throttleTime } from 'rxjs';

export interface ScrollPosition {
  scrollY: number;
  scrollPercent: number;
  direction: 'up' | 'down';
  isScrolling: boolean;
}

export type AnimationType = 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'zoomIn' | 'slideInUp' | 'slideInLeft' | 'slideInRight' | 'rotateIn';

export interface IntersectionConfig {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animationType?: AnimationType;
  delay?: number;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private _scrollPosition = new BehaviorSubject<ScrollPosition>({
    scrollY: 0,
    scrollPercent: 0,
    direction: 'down',
    isScrolling: false
  });

  private _isScrolling = false;
  private _scrollTimeout: any;
  private _lastScrollY = 0;
  private _observers: Map<Element, IntersectionObserver> = new Map();
  private _paralaxElements: Map<Element, number> = new Map();

  public readonly scrollPosition$ = this._scrollPosition.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeScrollTracking();
      this.initializeParallaxScrolling();
    }
  }

  private initializeScrollTracking(): void {
    fromEvent(window, 'scroll')
      .pipe(throttleTime(16)) // ~60fps
      .subscribe(() => {
        this.updateScrollPosition();
      });
  }

  private updateScrollPosition(): void {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min((scrollY / documentHeight) * 100, 100);
    const direction: 'up' | 'down' = scrollY > this._lastScrollY ? 'down' : 'up';

    this._isScrolling = true;
    clearTimeout(this._scrollTimeout);
    
    this._scrollTimeout = setTimeout(() => {
      this._isScrolling = false;
      this._scrollPosition.next({
        scrollY,
        scrollPercent,
        direction,
        isScrolling: false
      });
    }, 150);

    this._scrollPosition.next({
      scrollY,
      scrollPercent,
      direction,
      isScrolling: true
    });

    this._lastScrollY = scrollY;
  }

  // Crear observer de intersección para animaciones
  public createIntersectionObserver(
    element: Element,
    callback: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
    config: IntersectionConfig = {}
  ): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const options: IntersectionObserverInit = {
      threshold: config.threshold || 0.1,
      rootMargin: config.rootMargin || '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting && config.delay) {
          setTimeout(() => {
            callback(isIntersecting, entry);
          }, config.delay);
        } else {
          callback(isIntersecting, entry);
        }

        if (isIntersecting && config.triggerOnce) {
          observer.unobserve(entry.target);
          this._observers.delete(entry.target);
        }
      });
    }, options);

    observer.observe(element);
    this._observers.set(element, observer);
  }

  // Aplicar animación CSS
  public applyAnimation(
    element: Element,
    animationType: AnimationType,
    duration: number = 800,
    delay: number = 0
  ): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const htmlElement = element as HTMLElement;
    
    // Aplicar estilos iniciales
    htmlElement.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    htmlElement.style.transitionDelay = `${delay}ms`;
    
    // Aplicar clase de animación
    setTimeout(() => {
      htmlElement.classList.add('animate-in', `animate-${animationType}`);
    }, 50);
  }

  // Remover animación
  public removeAnimation(element: Element, animationType: AnimationType): void {
    const htmlElement = element as HTMLElement;
    htmlElement.classList.remove('animate-in', `animate-${animationType}`);
  }

  // Configurar parallax para un elemento
  public setupParallax(element: Element, speed: number = 0.5): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this._paralaxElements.set(element, speed);
  }

  private initializeParallaxScrolling(): void {
    fromEvent(window, 'scroll')
      .pipe(throttleTime(16))
      .subscribe(() => {
        this.updateParallaxElements();
      });
  }

  private updateParallaxElements(): void {
    const scrollY = window.scrollY;

    this._paralaxElements.forEach((speed, element) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calcular si el elemento está en la ventana de visualización
      if (elementTop < scrollY + windowHeight && elementTop + elementHeight > scrollY) {
        const yPos = -(scrollY - elementTop) * speed;
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      }
    });
  }

  // Animaciones de entrada suaves
  public fadeInOnScroll(element: Element, config: IntersectionConfig = {}): void {
    this.createIntersectionObserver(element, (isIntersecting) => {
      if (isIntersecting) {
        this.applyAnimation(
          element, 
          config.animationType || 'fadeInUp',
          config.duration || 600,
          config.delay || 0
        );
      }
    }, config);
  }

  // Contador animado
  public animateCounter(
    element: Element,
    finalValue: number,
    duration: number = 2000,
    startValue: number = 0
  ): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const htmlElement = element as HTMLElement;
    const startTime = performance.now();
    const increment = finalValue - startValue;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (increment * easeOut));
      
      htmlElement.textContent = currentValue.toString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        htmlElement.textContent = finalValue.toString();
      }
    };

    requestAnimationFrame(updateCounter);
  }

  // Limpiar observadores
  public cleanup(): void {
    this._observers.forEach(observer => observer.disconnect());
    this._observers.clear();
    this._paralaxElements.clear();
  }

  // Obtener posición actual del scroll
  public getCurrentScrollPosition(): ScrollPosition {
    return this._scrollPosition.value;
  }

  // Scroll suave hacia elemento
  public scrollToElement(elementId: string, offset: number = 0): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  // Scroll suave hacia arriba
  public scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
