import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { ToastService } from '../../../core/services/toast.service';

interface ContactInfo {
  telefono: string;
  email: string;
  direccion: string;
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

interface ContactInfoItem {
  title: string;
  value: string;
  icon: string;
  link?: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  showSuccessMessage = false;

  contactInfo: ContactInfo = {
    telefono: '+34 123 456 789',
    email: 'contacto@miempresa.com',
    direccion: 'Calle Principal 123, Madrid, España',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/miempresa',
      twitter: 'https://twitter.com/miempresa',
      instagram: 'https://instagram.com/miempresa',
      facebook: 'https://facebook.com/miempresa'
    }
  };

  contactInfoItems: ContactInfoItem[] = [
    {
      title: 'Teléfono',
      value: this.contactInfo.telefono,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>',
      link: `tel:${this.contactInfo.telefono.replace(/\s/g, '')}`
    },
    {
      title: 'Email',
      value: this.contactInfo.email,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>',
      link: `mailto:${this.contactInfo.email}`
    },
    {
      title: 'Dirección',
      value: this.contactInfo.direccion,
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>',
      link: 'https://maps.google.com/?q=Calle+Principal+123+Madrid+España'
    }
  ];

  socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/miempresa',
      icon: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>',
      color: 'text-blue-600 hover:text-blue-700'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/miempresa',
      icon: '<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>',
      color: 'text-sky-500 hover:text-sky-600'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/miempresa',
      icon: '<path d="M12.017 0C8.396 0 7.989.016 6.741.097 5.495.18 4.652.446 3.926.84 3.184 1.247 2.568 1.768 1.952 2.384 1.336 3.001.815 3.617.408 4.359.014 5.085-.252 5.928-.335 7.174-.416 8.422-.432 8.829-.432 12.45s.016 4.028.097 5.276c.083 1.246.349 2.089.743 2.815.407.742.928 1.358 1.544 1.974.616.616 1.232 1.137 1.974 1.544.726.394 1.569.66 2.815.743 1.248.081 1.655.097 5.276.097s4.028-.016 5.276-.097c1.246-.083 2.089-.349 2.815-.743.742-.407 1.358-.928 1.974-1.544.616-.616 1.137-1.232 1.544-1.974.394-.726.66-1.569.743-2.815.081-1.248.097-1.655.097-5.276s-.016-4.028-.097-5.276c-.083-1.246-.349-2.089-.743-2.815-.407-.742-.928-1.358-1.544-1.974C20.406.831 19.79.31 19.048-.097 18.322-.491 17.479-.757 16.233-.84 14.985-.921 14.578-.937 10.957-.937L12.017 0zm-2.033 2.204h2.033c3.573 0 3.994.016 5.404.096 1.17.053 1.806.249 2.227.415.56.217.96.477 1.38.896.42.42.679.82.896 1.381.164.421.361 1.057.413 2.227.081 1.409.098 1.83.098 5.404s-.017 3.995-.098 5.404c-.052 1.17-.249 1.806-.413 2.227-.217.56-.477.96-.896 1.381-.42.42-.82.679-1.381.896-.421.164-1.057.361-2.227.413-1.409.081-1.831.098-5.404.098s-3.995-.017-5.404-.098c-1.17-.052-1.806-.249-2.227-.413-.56-.217-.96-.477-1.381-.896-.42-.42-.679-.82-.896-1.381-.164-.421-.361-1.057-.413-2.227-.081-1.409-.098-1.831-.098-5.404s.017-3.995.098-5.404c.052-1.17.249-1.806.413-2.227.217-.56.477-.96.896-1.381.42-.42.82-.679 1.381-.896.421-.164 1.057-.361 2.227-.413 1.409-.081 1.831-.098 5.404-.098z"></path><path d="M12.017 15.33a3.313 3.313 0 1 1 0-6.626 3.313 3.313 0 0 1 0 6.626zM12.017 7.729a4.296 4.296 0 1 0 0 8.592 4.296 4.296 0 0 0 0-8.592z"></path><circle cx="16.239" cy="7.729" r="1.004"></circle>',
      color: 'text-pink-600 hover:text-pink-700'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/miempresa',
      icon: '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>',
      color: 'text-gray-800 hover:text-gray-900'
    }
  ];

  faqs: FAQ[] = [
    {
      question: '¿Cuál es el tiempo de respuesta promedio?',
      answer: 'Nos comprometemos a responder todas las consultas en un plazo máximo de 24 horas durante días laborables.',
      isOpen: false
    },
    {
      question: '¿Ofrecen consultas gratuitas?',
      answer: 'Sí, ofrecemos una consulta inicial gratuita de 30 minutos para analizar tu proyecto y determinar la mejor solución.',
      isOpen: false
    },
    {
      question: '¿Trabajan con empresas de todos los tamaños?',
      answer: 'Absolutamente. Trabajamos desde startups hasta grandes corporaciones, adaptando nuestros servicios a las necesidades específicas de cada cliente.',
      isOpen: false
    },
    {
      question: '¿Qué información necesitan para un presupuesto?',
      answer: 'Para proporcionar un presupuesto preciso, necesitamos conocer los detalles del proyecto, el alcance, los plazos esperados y cualquier requisito técnico específico.',
      isOpen: false
    },
    {
      question: '¿Ofrecen soporte post-lanzamiento?',
      answer: 'Sí, todos nuestros proyectos incluyen soporte post-lanzamiento. Además, ofrecemos planes de mantenimiento personalizados según las necesidades del cliente.',
      isOpen: false
    }
  ];

  serviceTipoPlan = [
    { value: 'web-development', label: 'Desarrollo Web' },
    { value: 'mobile-app', label: 'Aplicación Móvil' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'consulting', label: 'Consultoría' },
    { value: 'maintenance', label: 'Mantenimiento' },
    { value: 'other', label: 'Otro' }
  ];

  presupuestoRangos = [
    { value: 'menos-5k', label: 'Menos de €5,000' },
    { value: '5k-15k', label: '€5,000 - €15,000' },
    { value: '15k-30k', label: '€15,000 - €30,000' },
    { value: '30k-50k', label: '€30,000 - €50,000' },
    { value: 'mas-50k', label: 'Más de €50,000' }
  ];

  constructor(
    private fb: FormBuilder,
    private seoService: SeoService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.seoService.setPageSEO('contacto');
    this.initializeForm();
  }

  private initializeForm(): void {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern(/^[+]?[\d\s\-\(\)]+$/)]],
      empresa: [''],
      tipoServicio: ['', Validators.required],
      presupuesto: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
      privacidad: [false, Validators.requiredTrue],
      newsletter: [false]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = false;
      this.submitSuccess = false;

      // Simular envío del formulario
      setTimeout(() => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.showSuccessMessage = true;
        this.contactForm.reset();
        this.contactForm.get('privacidad')?.setValue(false);
        this.contactForm.get('newsletter')?.setValue(false);
        
        // Mostrar toast de éxito
        this.toastService.showSuccess('¡Mensaje enviado correctamente! Te contactaremos pronto.');
        
        // Ocultar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          this.submitSuccess = false;
          this.showSuccessMessage = false;
        }, 3000);
      }, 2000);
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (field?.hasError('email')) {
      return 'Introduce un email válido';
    }
    if (field?.hasError('minlength')) {
      const minLength = field.getError('minlength')?.requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (field?.hasError('pattern') && fieldName === 'telefono') {
      return 'Introduce un teléfono válido';
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
