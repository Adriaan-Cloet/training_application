import { Injectable, signal } from '@angular/core';
import { Training } from '../models/training.model';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private readonly trainingsState = signal<Training[]>([]);

  constructor(private supabaseService: SupabaseService) {}

  trainings() {
    return this.trainingsState.asReadonly();
  }

  private async getCurrentUserId(): Promise<string> {
    const { data } = await this.supabaseService.supabase.auth.getUser();
    if (!data.user) throw new Error('Niet ingelogd');
    return data.user.id;
  }

  async loadAll(): Promise<void> {
    const userId = await this.getCurrentUserId();
    const { data, error } = await this.supabaseService.supabase
      .from('trainingen')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Fout bij het laden van trainingen:', error);
      return;
    }

    this.trainingsState.set((data as any[]).map((row) => this.toTraining(row)));
  }

  async add(training: Omit<Training, 'id'>): Promise<Training | null> {
    const userId = await this.getCurrentUserId();
    const { data, error } = await this.supabaseService.supabase
      .from('trainingen')
      .insert([this.toRow(training, userId)])
      .select()
      .single();

    if (error) {
      console.error('Fout bij het toevoegen van training:', error);
      return null;
    }

    await this.loadAll();
    return this.toTraining(data);
  }

  async delete(id: string): Promise<void> {
    const userId = await this.getCurrentUserId();
    const { error } = await this.supabaseService.supabase
      .from('trainingen')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.error('Fout bij het verwijderen van training:', error);
      return;
    }

    await this.loadAll();
  }

  async update(id: string, updated: Omit<Training, 'id'>): Promise<Training | null> {
    const userId = await this.getCurrentUserId();
    const { data, error } = await this.supabaseService.supabase
      .from('trainingen')
      .update(this.toRow(updated, userId))
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Fout bij het bijwerken van training:', error);
      return null;
    }

    await this.loadAll();
    return this.toTraining(data);
  }

  private toRow(training: Omit<Training, 'id'>, userId: string): any {
    const { startTime, ...rest } = training;
    return { ...rest, start_time: startTime, user_id: userId };
  }

  private toTraining(row: any): Training {
    const { start_time, ...rest } = row;
    return { ...rest, startTime: start_time };
  }
}
