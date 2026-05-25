import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../services/training.service';
import { RouterLink } from '@angular/router';
import { Discipline } from '../../models/training.model';

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

  trainings = computed(() =>
    this.trainingService
      .trainings()()
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  );

  constructor(private trainingService: TrainingService) {}

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('nl-BE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }

  async delete(id: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!confirm('Deze training verwijderen?')) return;
    await this.trainingService.delete(id);
  }
}
