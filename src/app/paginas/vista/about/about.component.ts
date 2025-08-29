import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TeamMockService } from '../../../core/services/mock/team.mock.service';
import { TeamMember } from '../../../core/models/team-member.interface';
import { SeoService } from '../../../core/services/seo.service';

interface ValorEmpresa {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  isBrowser: boolean = false;

  valoresEmpresa: ValorEmpresa[] = [
    {
      title: 'Innovación',
      description: 'Buscamos constantemente nuevas formas de resolver problemas y mejorar procesos mediante la adopción de tecnologías emergentes.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>'
    },
    {
      title: 'Calidad',
      description: 'Nos comprometemos a entregar productos y servicios de la más alta calidad, superando las expectativas de nuestros clientes.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>'
    },
    {
      title: 'Colaboración',
      description: 'Creemos en el poder del trabajo en equipo y la colaboración cercana con nuestros clientes para lograr objetivos comunes.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>'
    },
    {
      title: 'Integridad',
      description: 'Operamos con transparencia, honestidad y ética en todas nuestras relaciones comerciales y decisiones empresariales.',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>'
    }
  ];

  constructor(
    private teamMockService: TeamMockService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.seoService.setPageSEO('about');
    this.cargarEquipo();
  }

  private cargarEquipo(): void {
    this.teamMockService.getAllMembers().subscribe({
      next: (members: TeamMember[]) => {
        // Tomar los primeros 6 miembros del equipo
        this.teamMembers = members.slice(0, 6);
      },
      error: (error: any) => {
        console.error('Error al cargar equipo:', error);
      }
    });
  }
}
