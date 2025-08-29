import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogMockService } from '../../../core/services/mock/blog.mock.service';
import { BlogPost, BlogCategory } from '../../../core/models/blog-post.interface';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  categories: BlogCategory[] = [];
  filteredPosts: BlogPost[] = [];
  featuredPosts: BlogPost[] = [];
  selectedCategory: string = 'all';
  searchQuery: string = '';
  isLoading: boolean = true;
  isBrowser: boolean = false;

  constructor(
    private blogMockService: BlogMockService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.seoService.setPageSEO('blog');
    this.loadData();
  }

  private loadData(): void {
    this.blogMockService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Error al cargar categorías del blog:', error);
      }
    });

    this.blogMockService.getAllPosts().subscribe({
      next: (posts) => {
        this.blogPosts = posts;
        this.filteredPosts = posts;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar posts del blog:', error);
        this.isLoading = false;
      }
    });

    this.blogMockService.getFeaturedPosts(3).subscribe({
      next: (featured) => {
        this.featuredPosts = featured;
      },
      error: (error: any) => {
        console.error('Error al cargar posts destacados:', error);
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.blogPosts;

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    this.filteredPosts = filtered;
  }

  getCategoryColor(categoryName: string): string {
    const category = this.categories.find(cat => cat.name === categoryName);
    return category?.color || 'gray';
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  getReadTimeText(minutes: number): string {
    return `${minutes} min de lectura`;
  }

  onImageError(event: any): void {
    if (this.isBrowser) {
      event.target.style.display = 'none';
      const parent = event.target.parentElement;
      if (parent) {
        parent.classList.add('no-image');
      }
    }
  }
}
