import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface FeatureCard {
  id?: number;
  title: string;
  description: string;
  icon: string;
  image?: string;
  imageError?: boolean;
  link?: string;
  badge?: string;
  features?: string[];
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'indigo';
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'gradient' | 'glass' | 'minimal';
}

@Component({
  selector: 'app-feature-cards',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './feature-cards.component.html',
  styleUrl: './feature-cards.component.css'
})
export class FeatureCardsComponent implements OnInit {
  @Input() cards: FeatureCard[] = [];
  @Input() columns: number = 3; // 1, 2, 3, 4, 6
  @Input() spacing: 'tight' | 'normal' | 'loose' = 'normal';
  @Input() showAnimation: boolean = true;

  ngOnInit(): void {
    // Asegurar que las tarjetas tengan propiedades por defecto
    this.cards = this.cards.map(card => ({
      color: 'blue',
      size: 'medium',
      variant: 'default',
      ...card
    }));
  }

  getGridClasses(): string {
    const baseClasses = 'grid';
    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
    };
    
    const spacingClasses = {
      tight: 'gap-4',
      normal: 'gap-6',
      loose: 'gap-8'
    };

    return `${baseClasses} ${columnClasses[this.columns as keyof typeof columnClasses]} ${spacingClasses[this.spacing]}`;
  }

  getCardClasses(card: FeatureCard): string {
    const sizeClasses = {
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8'
    };

    const colorClasses = {
      blue: 'border-blue-200 hover:border-blue-300 dark:border-blue-800',
      purple: 'border-purple-200 hover:border-purple-300 dark:border-purple-800',
      green: 'border-green-200 hover:border-green-300 dark:border-green-800',
      orange: 'border-orange-200 hover:border-orange-300 dark:border-orange-800',
      pink: 'border-pink-200 hover:border-pink-300 dark:border-pink-800',
      indigo: 'border-indigo-200 hover:border-indigo-300 dark:border-indigo-800'
    };

    const variantClasses = {
      default: 'bg-white dark:bg-gray-800 border shadow-lg hover:shadow-xl',
      gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border shadow-lg hover:shadow-xl',
      glass: 'backdrop-blur-md bg-white/70 dark:bg-gray-800/70 border border-white/20 shadow-lg hover:shadow-xl',
      minimal: 'bg-transparent border-0 shadow-none hover:bg-gray-50 dark:hover:bg-gray-800/50'
    };

    const animationClasses = this.showAnimation ? 'transition-all duration-300 hover:scale-105 hover:-translate-y-1' : '';

    return `
      rounded-2xl 
      ${sizeClasses[card.size!]} 
      ${colorClasses[card.color!]} 
      ${variantClasses[card.variant!]} 
      ${animationClasses}
      cursor-pointer
      group
    `.trim();
  }

  getIconClasses(card: FeatureCard): string {
    const colorClasses = {
      blue: 'text-blue-600 dark:text-blue-400',
      purple: 'text-purple-600 dark:text-purple-400',
      green: 'text-green-600 dark:text-green-400',
      orange: 'text-orange-600 dark:text-orange-400',
      pink: 'text-pink-600 dark:text-pink-400',
      indigo: 'text-indigo-600 dark:text-indigo-400'
    };

    const sizeClasses = {
      small: 'w-8 h-8',
      medium: 'w-10 h-10',
      large: 'w-12 h-12'
    };

    return `${sizeClasses[card.size!]} ${colorClasses[card.color!]} transition-transform duration-300 group-hover:scale-110`;
  }

  getBadgeClasses(card: FeatureCard): string {
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
      indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
    };

    return `inline-flex px-2 py-1 text-xs font-medium rounded-full ${colorClasses[card.color!]}`;
  }

  trackByFn(index: number, item: FeatureCard): any {
    return item.id || index;
  }

  onImageError(card: FeatureCard): void {
    card.imageError = true;
  }
}