import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { Router, RouterLink } from '@angular/router';
import { RaceSettings } from '../../models/race-settings.model';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  raceName = '';
  raceDate = '';
  countdownEnabled = true;
  trainingStartDate = '';
  opgeslagen = false;

  constructor(
    private settingsService: SettingsService,
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

  async onSubmit() {
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
}
