import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async onSignOut() {
    await this.authService.signOut();
    this.router.navigate(['/auth']);
  }
}
