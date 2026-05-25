import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { RaceSettings } from '../../models/race-settings.model';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  // Doelrace
  raceName = '';
  raceDate = '';
  countdownEnabled = true;
  trainingStartDate = '';
  opgeslagen = false;

  // Wachtwoord
  newPassword = '';
  confirmPassword = '';
  passwordError = '';
  passwordOpgeslagen = false;

  // Account verwijderen
  deleteConfirmText = '';
  readonly DELETE_PHRASE = 'mijn account verwijderen';
  isDeleting = false;

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    private router: Router,
  ) {}

  async ngOnInit() {
    const cached = this.settingsService.settings()();
    if (!cached) {
      await this.settingsService.load();
    }
    const settings = this.settingsService.settings()();
    if (settings) {
      this.raceName = settings.raceName ?? '';
      this.raceDate = settings.raceDate ?? '';
      this.countdownEnabled = settings.countdownEnabled;
      this.trainingStartDate = settings.trainingStartDate ?? '';
    }
  }

  async onSubmitRace() {
    const settings: RaceSettings = {
      raceName: this.raceName,
      raceDate: this.raceDate,
      countdownEnabled: this.countdownEnabled,
      trainingStartDate: this.trainingStartDate,
    };
    await this.settingsService.save(settings);
    this.opgeslagen = true;
    setTimeout(() => (this.opgeslagen = false), 3000);
  }

  async onSubmitPassword() {
    this.passwordError = '';
    this.passwordOpgeslagen = false;

    if (this.newPassword.length < 6) {
      this.passwordError = 'Wachtwoord moet minimaal 6 tekens bevatten.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Wachtwoorden komen niet overeen.';
      return;
    }

    const { error } = await this.authService.updatePassword(this.newPassword);
    if (error) {
      this.passwordError = error.message;
      return;
    }

    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordOpgeslagen = true;
    setTimeout(() => (this.passwordOpgeslagen = false), 3000);
  }

  async onSignOut() {
    await this.authService.signOut();
    this.router.navigate(['/auth']);
  }

  get canDelete(): boolean {
    return this.deleteConfirmText === this.DELETE_PHRASE;
  }

  async onDeleteAccount() {
    if (!this.canDelete) return;
    this.isDeleting = true;
    const { error } = await this.authService.deleteAccount();
    if (error) {
      console.error('Fout bij verwijderen account:', error);
      this.isDeleting = false;
      return;
    }
    await this.authService.signOut();
    this.router.navigate(['/auth']);
  }
}
