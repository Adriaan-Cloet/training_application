import { Component, OnInit, computed } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-race-countdown',
  imports: [RouterLink],
  templateUrl: './race-countdown.html',
  styleUrl: './race-countdown.css',
})
export class RaceCountdownComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  async ngOnInit() {
    await this.settingsService.load();
  }

  get settings() {
    return this.settingsService.settings()();
  }

  get countdown() {
    if (!this.settings?.raceDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const race = new Date(this.settings.raceDate);
    race.setHours(0, 0, 0, 0);

    const diffMs = race.getTime() - today.getTime();
    if (diffMs < 0) return null;

    const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;

    return { weeks, days, totalDays };
  }

  get progressPercent(): number {
    if (!this.settings?.trainingStartDate || !this.settings?.raceDate) return 0;

    const start = new Date(this.settings.trainingStartDate);
    const race = new Date(this.settings.raceDate);
    const today = new Date();

    const totalMs = race.getTime() - start.getTime();
    const elapsedMs = today.getTime() - start.getTime();

    if (totalMs <= 0) return 0;
    return Math.min(100, Math.max(0, Math.round((elapsedMs / totalMs) * 100)));
  }
}
