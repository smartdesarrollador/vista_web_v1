import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TeamMember, TeamDepartment } from '../../models/team-member.interface';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class TeamMockService {

  private departments: TeamDepartment[] = [
    { id: 1, name: 'Desarrollo', description: 'Equipo de desarrollo frontend y backend' },
    { id: 2, name: 'Diseño', description: 'Especialistas en UX/UI y diseño gráfico' },
    { id: 3, name: 'Marketing', description: 'Expertos en marketing digital y SEO' },
    { id: 4, name: 'Dirección', description: 'Liderazgo y gestión estratégica' }
  ];

  private teamMembers: TeamMember[] = [];

  constructor(private mockData: MockDataService) {
    this.initializeTeamMembers();
  }

  private initializeTeamMembers(): void {
    this.teamMembers = [
      {
        id: 1,
        name: 'Alex Rivera',
        position: 'CEO & Fundador',
        bio: 'Con más de 15 años de experiencia en desarrollo de software y liderazgo empresarial, Alex fundó la empresa con la visión de crear soluciones digitales innovadoras que transformen negocios.',
        image: this.mockData.getAvatarPlaceholder('alex-rivera'),
        socialLinks: {
          linkedin: 'https://linkedin.com/in/alex-rivera',
          twitter: 'https://twitter.com/alex_rivera',
          github: 'https://github.com/alexrivera'
        },
        skills: ['Liderazgo', 'Estrategia Digital', 'Desarrollo Full-Stack', 'Gestión de Proyectos'],
        email: 'alex@company.com',
        isActive: true,
        order: 1
      },
      {
        id: 2,
        name: 'María González',
        position: 'CTO & Lead Developer',
        bio: 'María es una desarrolladora senior especializada en arquitecturas escalables y tecnologías modernas. Lidera el equipo técnico y define los estándares de calidad del código.',
        image: this.mockData.getAvatarPlaceholder('maria-gonzalez'),
        socialLinks: {
          linkedin: 'https://linkedin.com/in/maria-gonzalez',
          github: 'https://github.com/mariagonzalez',
          twitter: 'https://twitter.com/maria_dev'
        },
        skills: ['React', 'Node.js', 'AWS', 'Docker', 'Microservicios'],
        email: 'maria@company.com',
        isActive: true,
        order: 2
      },
      {
        id: 3,
        name: 'Carlos Mendoza',
        position: 'Senior Frontend Developer',
        bio: 'Especialista en desarrollo frontend con pasión por crear interfaces de usuario excepcionales. Carlos combina técnica avanzada con un ojo artístico para el diseño.',
        image: this.mockData.getAvatarPlaceholder('carlos-mendoza'),
        socialLinks: {
          linkedin: 'https://linkedin.com/in/carlos-mendoza',
          github: 'https://github.com/carlosmendoza',
          website: 'https://carlosmendoza.dev'
        },
        skills: ['Angular', 'TypeScript', 'SCSS', 'Jest', 'Figma'],
        email: 'carlos@company.com',
        isActive: true,
        order: 3
      },
      {
        id: 4,
        name: 'Ana López',
        position: 'UX/UI Designer',
        bio: 'Ana es una diseñadora creativa con experiencia en investigación de usuarios y diseño centrado en el usuario. Su enfoque metodológico asegura experiencias digitales memorables.',
        image: this.mockData.getAvatarPlaceholder('ana-lopez'),
        socialLinks: {
          linkedin: 'https://linkedin.com/in/ana-lopez',
          instagram: 'https://instagram.com/ana_designs',
          website: 'https://analopez.design'
        },
        skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Design Systems'],
        email: 'ana@company.com',
        isActive: true,
        order: 4
      },
      {
        id: 5,
        name: 'Diego Herrera',
        position: 'Backend Developer',
        bio: 'Diego es un desarrollador backend enfocado en crear APIs robustas y sistemas escalables. Su experiencia incluye arquitecturas cloud y bases de datos de alto rendimiento.',
        image: this.mockData.getAvatarPlaceholder('diego-herrera'),
        socialLinks: {
          linkedin: 'https://linkedin.com/in/diego-herrera',
          github: 'https://github.com/diegoherrera'
        },
        skills: ['Laravel', 'Python', 'PostgreSQL', 'Redis', 'Kubernetes'],
        email: 'diego@company.com',
        isActive: true,
        order: 5
      },
      {
        id: 6,
        name: 'Sofia Martín',
        position: 'Digital Marketing Specialist',
        bio: 'Sofia combina creatividad con análisis de datos para crear campañas de marketing digital efectivas. Especialista en SEO, SEM y estrategias de contenido.',
        image: this.mockData.getAvatarPlaceholder('sofia-martin'),
        socialLinks: {
          linkedin: 'https://linkedin.com/in/sofia-martin',
          twitter: 'https://twitter.com/sofia_marketing',
          instagram: 'https://instagram.com/sofia_digital'
        },
        skills: ['SEO', 'Google Ads', 'Content Strategy', 'Analytics', 'Social Media'],
        email: 'sofia@company.com',
        isActive: true,
        order: 6
      }
    ];
  }

  getAllMembers(): Observable<TeamMember[]> {
    return of(this.teamMembers.filter(m => m.isActive).sort((a, b) => (a.order || 0) - (b.order || 0)));
  }

  getMemberById(id: number): Observable<TeamMember | undefined> {
    const member = this.teamMembers.find(m => m.id === id);
    return of(member);
  }

  getMembersByDepartment(departmentName: string): Observable<TeamMember[]> {
    // Para simplificar, asignaremos miembros a departamentos basado en su posición
    const departmentMapping: { [key: string]: string[] } = {
      'Desarrollo': ['CTO & Lead Developer', 'Senior Frontend Developer', 'Backend Developer'],
      'Diseño': ['UX/UI Designer'],
      'Marketing': ['Digital Marketing Specialist'],
      'Dirección': ['CEO & Fundador']
    };

    const positions = departmentMapping[departmentName] || [];
    const members = this.teamMembers.filter(m => 
      m.isActive && positions.some(pos => m.position.includes(pos))
    );
    
    return of(members);
  }

  getDepartments(): Observable<TeamDepartment[]> {
    return of(this.departments);
  }

  getFeaturedMembers(limit: number = 4): Observable<TeamMember[]> {
    const featured = this.teamMembers
      .filter(m => m.isActive)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .slice(0, limit);
    return of(featured);
  }
}