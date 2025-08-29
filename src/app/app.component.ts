import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { ToastComponent } from './shared/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    ScrollToTopComponent,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'proy_test';
  private themeService = inject(ThemeService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Inicializar sistema de temas
      this.initializeTheme();
    }
  }

  private initializeTheme(): void {
    // El ThemeService ya se inicializa automáticamente
    // Aquí podríamos añadir configuración adicional si fuera necesaria
    
    // Añadir clase CSS para transiciones globales
    document.documentElement.style.setProperty(
      '--theme-transition',
      'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
    );
  }
}
