import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async signUp(email: string, password: string) {
    return this.supabaseService.supabase.auth.signUp({ email, password });
  }

  async signIn(email: string, password: string) {
    return this.supabaseService.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return this.supabaseService.supabase.auth.signOut();
  }

  async getSession() {
    return this.supabaseService.supabase.auth.getSession();
  }

  getCurrentUser() {
    return this.supabaseService.supabase.auth.getUser();
  }

  async updatePassword(newPassword: string) {
    return this.supabaseService.supabase.auth.updateUser({ password: newPassword });
  }

  async deleteAccount() {
    return this.supabaseService.supabase.rpc('delete_user_account');
  }
}
