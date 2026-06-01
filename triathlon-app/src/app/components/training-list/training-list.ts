import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../services/training.service';
import { RouterLink } from '@angular/router';
import { Discipline } from '../../models/training.model';
import { parseLocalDate } from '../../utils/date.utils';

@Component({
  selector: 'app-training-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './training-list.html',
})
export class TrainingListComponent {
  readonly disciplineIcons: Record<string, string> = {
    [Discipline.Zwemmen]: '🏊',
    [Discipline.Fietsen]: '🚴',
    [Discipline.Lopen]: '🏃',
    [Discipline.Krachttraining]: '🏋️',
  };

  readonly disciplineAccent: Record<string, string> = {
    [Discipline.Zwemmen]: 'bg-sky-400/15 text-sky-300',
    [Discipline.Fietsen]: 'bg-emerald-400/15 text-emerald-300',
    [Discipline.Lopen]: 'bg-rose-400/15 text-rose-300',
    [Discipline.Krachttraining]: 'bg-amber-400/15 text-amber-300',
  };

  readonly disciplineBorderStyle: Record<string, string> = {
    [Discipline.Zwemmen]:        'border-left: 3px solid #38bdf8',
    [Discipline.Fietsen]:        'border-left: 3px solid #34d399',
    [Discipline.Lopen]:          'border-left: 3px solid #fb7185',
    [Discipline.Krachttraining]: 'border-left: 3px solid #fbbf24',
  };

  trainingToDelete = signal<string | null>(null);

  trainings = computed(() =>
    this.trainingService
      .trainings()()
      .slice()
      .sort((a, b) => parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime()),
  );

  constructor(private trainingService: TrainingService) {}

  formatDate(date: string): string {
    return parseLocalDate(date).toLocaleDateString('nl-BE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }

  delete(id: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.trainingToDelete.set(id);
  }

  async confirmDelete() {
    const id = this.trainingToDelete();
    if (!id) return;
    await this.trainingService.delete(id);
    this.trainingToDelete.set(null);
  }

  cancelDelete() {
    this.trainingToDelete.set(null);
  }
}
