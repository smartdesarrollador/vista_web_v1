import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService, ScrollPosition } from '../../core/services/animation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css'
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isVisible = false;
  scrollPercent = 0;

  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {
    this.animationService.scrollPosition$
      .pipe(takeUntil(this.destroy$))
      .subscribe((position: ScrollPosition) => {
        this.isVisible = position.scrollY > 300; // Mostrar después de 300px
        this.scrollPercent = position.scrollPercent;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  scrollToTop(): void {
    this.animationService.scrollToTop();
  }
}
