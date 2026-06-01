import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav';
import { ThemeService } from './services/theme.service';

function shouldShowBottomNav(url: string): boolean {
  return (
    !url.startsWith('/auth') && !url.startsWith('/training/') && url !== '/log'
  );
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BottomNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);

  protected readonly showBottomNav = signal(shouldShowBottomNav(this.router.url));

  constructor() {
    inject(ThemeService).apply();

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = (e as NavigationEnd).urlAfterRedirects;
        this.showBottomNav.set(shouldShowBottomNav(url));
      });
  }
}
