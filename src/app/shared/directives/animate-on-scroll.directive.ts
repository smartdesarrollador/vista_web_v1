import { 
  Directive, 
  ElementRef, 
  Input, 
  OnInit, 
  OnDestroy, 
  AfterViewInit 
} from '@angular/core';
import { 
  AnimationService, 
  AnimationType, 
  IntersectionConfig 
} from '../../core/services/animation.service';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() animationType: AnimationType = 'fadeInUp';
  @Input() animationDuration: number = 600;
  @Input() animationDelay: number = 0;
  @Input() threshold: number = 0.1;
  @Input() rootMargin: string = '0px 0px -50px 0px';
  @Input() triggerOnce: boolean = true;

  constructor(
    private elementRef: ElementRef,
    private animationService: AnimationService
  ) {}

  ngOnInit(): void {
    // Preparar elemento para animación
    this.prepareElement();
  }

  ngAfterViewInit(): void {
    // Configurar observer de intersección después de que la vista esté inicializada
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    // La limpieza se maneja en el AnimationService
  }

  private prepareElement(): void {
    const element = this.elementRef.nativeElement;
    
    // Aplicar estilos iniciales basados en el tipo de animación
    element.style.transition = 'none';
    
    switch (this.animationType) {
      case 'fadeIn':
        element.style.opacity = '0';
        break;
      case 'fadeInUp':
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        break;
      case 'fadeInDown':
        element.style.opacity = '0';
        element.style.transform = 'translateY(-30px)';
        break;
      case 'fadeInLeft':
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        break;
      case 'fadeInRight':
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        break;
      case 'slideInUp':
        element.style.transform = 'translateY(100%)';
        break;
      case 'slideInLeft':
        element.style.transform = 'translateX(-100%)';
        break;
      case 'slideInRight':
        element.style.transform = 'translateX(100%)';
        break;
      case 'zoomIn':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        break;
      case 'rotateIn':
        element.style.opacity = '0';
        element.style.transform = 'rotate(-180deg) scale(0.8)';
        break;
    }
  }

  private setupIntersectionObserver(): void {
    const config: IntersectionConfig = {
      threshold: this.threshold,
      rootMargin: this.rootMargin,
      triggerOnce: this.triggerOnce,
      animationType: this.animationType,
      duration: this.animationDuration,
      delay: this.animationDelay
    };

    this.animationService.createIntersectionObserver(
      this.elementRef.nativeElement,
      (isIntersecting) => {
        if (isIntersecting) {
          this.animateElement();
        }
      },
      config
    );
  }

  private animateElement(): void {
    const element = this.elementRef.nativeElement;
    
    // Aplicar transición
    element.style.transition = `all ${this.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    element.style.transitionDelay = `${this.animationDelay}ms`;
    
    // Aplicar animación final
    setTimeout(() => {
      switch (this.animationType) {
        case 'fadeIn':
        case 'fadeInUp':
        case 'fadeInDown':
        case 'fadeInLeft':
        case 'fadeInRight':
        case 'zoomIn':
        case 'rotateIn':
          element.style.opacity = '1';
          element.style.transform = 'translateY(0) translateX(0) scale(1) rotate(0)';
          break;
        case 'slideInUp':
        case 'slideInLeft':
        case 'slideInRight':
          element.style.transform = 'translateY(0) translateX(0)';
          break;
      }
      
      element.classList.add('animation-completed');
    }, 50);
  }
}
