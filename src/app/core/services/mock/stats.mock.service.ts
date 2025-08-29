import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StatItem, CompanyStats } from '../../models/stat-item.interface';

@Injectable({
  providedIn: 'root'
})
export class StatsMockService {

  private statItems: StatItem[] = [
    {
      id: 1,
      title: 'Proyectos Completados',
      value: 150,
      suffix: '+',
      icon: 'check-circle',
      description: 'Proyectos exitosos entregados a nuestros clientes',
      color: 'blue',
      isAnimated: true,
      order: 1
    },
    {
      id: 2,
      title: 'Clientes Satisfechos',
      value: 98,
      suffix: '%',
      icon: 'heart',
      description: 'Índice de satisfacción de nuestros clientes',
      color: 'green',
      isAnimated: true,
      order: 2
    },
    {
      id: 3,
      title: 'Años de Experiencia',
      value: 8,
      suffix: '+',
      icon: 'calendar',
      description: 'Años brindando soluciones digitales',
      color: 'purple',
      isAnimated: true,
      order: 3
    },
    {
      id: 4,
      title: 'Especialistas',
      value: 25,
      suffix: '+',
      icon: 'users',
      description: 'Profesionales especializados en nuestro equipo',
      color: 'orange',
      isAnimated: true,
      order: 4
    },
    {
      id: 5,
      title: 'Líneas de Código',
      value: 500000,
      suffix: '+',
      icon: 'code',
      description: 'Líneas de código escritas en proyectos',
      color: 'indigo',
      isAnimated: true,
      order: 5
    },
    {
      id: 6,
      title: 'Premios Ganados',
      value: 12,
      icon: 'award',
      description: 'Reconocimientos por excelencia en desarrollo',
      color: 'yellow',
      isAnimated: true,
      order: 6
    },
    {
      id: 7,
      title: 'Países Atendidos',
      value: 15,
      suffix: '+',
      icon: 'globe',
      description: 'Países donde hemos desarrollado proyectos',
      color: 'teal',
      isAnimated: true,
      order: 7
    },
    {
      id: 8,
      title: 'Uptime del Sistema',
      value: 99.9,
      suffix: '%',
      icon: 'server',
      description: 'Disponibilidad promedio de nuestros sistemas',
      color: 'red',
      isAnimated: true,
      order: 8
    }
  ];

  private companyStats: CompanyStats = {
    yearsInBusiness: 8,
    projectsCompleted: 150,
    happyClients: 120,
    teamMembers: 25,
    awards: 12,
    countriesServed: 15
  };

  constructor() { }

  getAllStats(): Observable<StatItem[]> {
    return of(this.statItems.sort((a, b) => (a.order || 0) - (b.order || 0)));
  }

  getStatById(id: number): Observable<StatItem | undefined> {
    const stat = this.statItems.find(s => s.id === id);
    return of(stat);
  }

  getFeaturedStats(limit: number = 4): Observable<StatItem[]> {
    const featured = this.statItems
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .slice(0, limit);
    return of(featured);
  }

  getCompanyStats(): Observable<CompanyStats> {
    return of(this.companyStats);
  }

  getStatsByColor(color: string): Observable<StatItem[]> {
    const filtered = this.statItems.filter(s => s.color === color);
    return of(filtered);
  }

  getAnimatedStats(): Observable<StatItem[]> {
    const animated = this.statItems.filter(s => s.isAnimated);
    return of(animated);
  }
}