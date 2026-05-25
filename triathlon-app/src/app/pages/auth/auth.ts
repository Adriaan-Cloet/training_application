import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
})
export class Auth {
  email = '';
  password = '';
  isLogin = true;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }

  async onSubmit() {
    this.errorMessage = '';
    if (this.isLogin) {
      const { error } = await this.authService.signIn(this.email, this.password);
      console.log('signin error:', error);
      if (error) {
        this.errorMessage = error.message;
      } else {
        this.router.navigate(['/']);
      }
    } else {
      const result = await this.authService.signUp(this.email, this.password);
      console.log('signup result:', result);
      const { error } = result;
      if (error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Controleer je e-mail om je account te bevestigen.';
      }
    }
  }
}
