import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _isDark = signal(localStorage.getItem('theme') !== 'light');
  readonly isDark = this._isDark.asReadonly();

  apply(): void {
    document.documentElement.classList.toggle('light', !this._isDark());
  }

  toggle(): void {
    this._isDark.update(v => !v);
    localStorage.setItem('theme', this._isDark() ? 'dark' : 'light');
    this.apply();
  }
}
