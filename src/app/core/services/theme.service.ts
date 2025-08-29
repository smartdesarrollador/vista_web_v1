import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'app-theme';
  private _currentTheme = new BehaviorSubject<Theme>('system');
  private _isDarkMode = new BehaviorSubject<boolean>(false);
  private mediaQuery: MediaQueryList | null = null;

  public readonly currentTheme$ = this._currentTheme.asObservable();
  public readonly isDarkMode$ = this._isDarkMode.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }
  }

  private initializeTheme(): void {
    // Obtener tema guardado del localStorage
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme;
    const initialTheme = savedTheme || 'system';

    // Configurar media query para detectar preferencias del sistema
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', (e) => {
      if (this._currentTheme.value === 'system') {
        this.updateDarkMode(e.matches);
      }
    });

    // Aplicar tema inicial
    this.setTheme(initialTheme, false);
  }

  public setTheme(theme: Theme, saveToStorage: boolean = true): void {
    this._currentTheme.next(theme);

    if (saveToStorage && isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }

    let isDark = false;

    switch (theme) {
      case 'dark':
        isDark = true;
        break;
      case 'light':
        isDark = false;
        break;
      case 'system':
        isDark = this.mediaQuery?.matches || false;
        break;
    }

    this.updateDarkMode(isDark);
  }

  private updateDarkMode(isDark: boolean): void {
    this._isDarkMode.next(isDark);

    if (isPlatformBrowser(this.platformId)) {
      const htmlElement = document.documentElement;
      
      if (isDark) {
        htmlElement.classList.add('dark');
        htmlElement.setAttribute('data-theme', 'dark');
      } else {
        htmlElement.classList.remove('dark');
        htmlElement.setAttribute('data-theme', 'light');
      }

      // Actualizar meta theme-color para PWA
      this.updateThemeColor(isDark);
    }
  }

  private updateThemeColor(isDark: boolean): void {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const color = isDark ? '#111827' : '#ffffff';
    
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.head.appendChild(meta);
    }
  }

  public toggleTheme(): void {
    const currentTheme = this._currentTheme.value;
    const nextTheme: Theme = currentTheme === 'light' ? 'dark' : 
                           currentTheme === 'dark' ? 'system' : 'light';
    this.setTheme(nextTheme);
  }

  public getCurrentTheme(): Theme {
    return this._currentTheme.value;
  }

  public isDarkMode(): boolean {
    return this._isDarkMode.value;
  }

  // Método para obtener el color primario basado en el tema actual
  public getPrimaryColor(): string {
    return this.isDarkMode() ? '#3b82f6' : '#1e40af';
  }

  // Método para obtener colores de fondo dinámicos
  public getBackgroundColors(): { primary: string; secondary: string; accent: string } {
    if (this.isDarkMode()) {
      return {
        primary: '#111827',
        secondary: '#1f2937',
        accent: '#374151'
      };
    } else {
      return {
        primary: '#ffffff',
        secondary: '#f9fafb',
        accent: '#f3f4f6'
      };
    }
  }

  // Método para aplicar transiciones suaves al cambiar tema
  public enableTransitions(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.style.setProperty(
        '--theme-transition', 
        'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
      );
    }
  }

  public disableTransitions(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.style.removeProperty('--theme-transition');
    }
  }
}
