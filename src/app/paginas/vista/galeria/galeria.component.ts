import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GaleriaMockService } from '../../../core/services/mock/galeria.mock.service';
import { GaleriaItem, GaleriaCategory } from '../../../core/models/galeria-item.interface';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent implements OnInit {
  galeriaItems: GaleriaItem[] = [];
  categories: GaleriaCategory[] = [];
  filteredItems: GaleriaItem[] = [];
  selectedCategory: string = 'all';
  selectedItem: GaleriaItem | null = null;
  isModalOpen: boolean = false;
  isBrowser: boolean = false;
  isLoading: boolean = true;

  constructor(
    private galeriaMockService: GaleriaMockService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.seoService.setPageSEO('galeria');
    this.loadData();
  }

  private loadData(): void {
    // Cargar categorías
    this.galeriaMockService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Error al cargar categorías:', error);
      }
    });

    // Cargar proyectos
    this.galeriaMockService.getAllItems().subscribe({
      next: (items) => {
        this.galeriaItems = items;
        this.filteredItems = items;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar galería:', error);
        this.isLoading = false;
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'all') {
      this.filteredItems = this.galeriaItems;
    } else {
      this.filteredItems = this.galeriaItems.filter(item => item.category === category);
    }
  }

  openModal(item: GaleriaItem): void {
    this.selectedItem = item;
    this.isModalOpen = true;
    
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedItem = null;
    
    if (this.isBrowser) {
      document.body.style.overflow = 'auto';
    }
  }

  getCategoryIcon(categoryName: string): string {
    const category = this.categories.find(cat => cat.name === categoryName);
    return category?.icon || 'folder';
  }

  trackByItem(index: number, item: GaleriaItem): number {
    return item.id;
  }
}
