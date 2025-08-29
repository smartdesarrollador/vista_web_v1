import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../core/services/theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  currentTheme: Theme = 'system';
  isDarkMode = false;
  isAnimating = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Suscribirse a cambios de tema
    this.themeService.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.currentTheme = theme;
      });

    // Suscribirse a cambios de modo oscuro
    this.themeService.isDarkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => {
        this.isDarkMode = isDark;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleTheme(): void {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.themeService.enableTransitions();
    this.themeService.toggleTheme();
    
    // Reset animation flag after transition
    setTimeout(() => {
      this.isAnimating = false;
      this.themeService.disableTransitions();
    }, 300);
  }

  getThemeIcon(): string {
    switch (this.currentTheme) {
      case 'light':
        return 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z';
      case 'dark':
        return 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z';
      case 'system':
      default:
        return 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM7 8h10m-5 5h5m-5 0V8m0 5v4';
    }
  }

  getThemeLabel(): string {
    switch (this.currentTheme) {
      case 'light':
        return 'Modo Claro';
      case 'dark':
        return 'Modo Oscuro';
      case 'system':
      default:
        return 'Automático';
    }
  }

  getNextThemeLabel(): string {
    switch (this.currentTheme) {
      case 'light':
        return 'Cambiar a modo oscuro';
      case 'dark':
        return 'Cambiar a automático';
      case 'system':
      default:
        return 'Cambiar a modo claro';
    }
  }
}
