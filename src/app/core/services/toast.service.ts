import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toasts.asObservable();
  private nextId = 1;

  constructor() { }

  // Métodos básicos para mostrar toasts
  showSuccess(message: string) {
    this.addToast(message, 'success');
  }

  showError(message: string) {
    this.addToast(message, 'error');
  }

  showInfo(message: string) {
    this.addToast(message, 'info');
  }

  showWarning(message: string) {
    this.addToast(message, 'warning');
  }

  // Añadir toast
  private addToast(message: string, type: Toast['type']) {
    const toast: Toast = {
      id: this.nextId++,
      message,
      type
    };

    const currentToasts = this.toasts.value;
    this.toasts.next([...currentToasts, toast]);

    // Auto-remover después de 4 segundos
    setTimeout(() => {
      this.removeToast(toast.id);
    }, 4000);
  }

  // Remover toast
  removeToast(id: number) {
    const currentToasts = this.toasts.value;
    const filteredToasts = currentToasts.filter(toast => toast.id !== id);
    this.toasts.next(filteredToasts);
  }
}
