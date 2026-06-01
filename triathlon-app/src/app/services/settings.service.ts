import { Injectable, signal } from '@angular/core';
import { RaceSettings } from '../models/race-settings.model';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly settingsState = signal<RaceSettings | null>(null);

  constructor(private supabaseService: SupabaseService) {}

  settings() {
    return this.settingsState.asReadonly();
  }

  private async getCurrentUserId(): Promise<string> {
    const { data } = await this.supabaseService.supabase.auth.getUser();
    if (!data.user) throw new Error('Niet ingelogd');
    return data.user.id;
  }

  async load(): Promise<void> {
    const userId = await this.getCurrentUserId();
    const { data, error } = await this.supabaseService.supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Fout bij het laden van instellingen:', error);
      return;
    }

    if(data) {
      this.settingsState.set(this.toSettings(data));
    }
  }

  async save(settings: RaceSettings): Promise<void> {
    const userId = await this.getCurrentUserId();
    const { data, error } = await this.supabaseService.supabase
      .from('user_settings')
      .upsert({...this.toRow(settings), user_id: userId });

    if (error) {
      console.error('Fout bij het opslaan van instellingen:', error);
      return;
    }

    this.settingsState.set(settings);
  }

  private toRow(settings: RaceSettings): any {
    return {
      race_name: settings.raceName,
      race_date: settings.raceDate,
      countdown_enabled: settings.countdownEnabled,
      training_start_date: settings.trainingStartDate,
    };
  }

  private toSettings(row: any): RaceSettings {
    return {
      raceName: row.race_name,
      raceDate: row.race_date,
      countdownEnabled: row.countdown_enabled,
      trainingStartDate: row.training_start_date,
    };
  }
}
