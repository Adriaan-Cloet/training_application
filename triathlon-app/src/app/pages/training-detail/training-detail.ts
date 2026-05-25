import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../services/training.service';
import { Discipline, Training } from '../../models/training.model';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../components/page-header/page-header';

@Component({
  selector: 'app-training-detail',
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './training-detail.html',
})
export class TrainingDetailComponent implements OnInit {
  training: Training | null = null;
  isEditing = false;
  editData!: Omit<Training, 'id'>;
  disciplines = Object.values(Discipline);

  disciplineMeta: Record<Discipline, { icon: string; accent: string }> = {
    [Discipline.Zwemmen]: { icon: '🏊', accent: 'text-sky-300' },
    [Discipline.Fietsen]: { icon: '🚴', accent: 'text-emerald-300' },
    [Discipline.Lopen]: { icon: '🏃', accent: 'text-rose-300' },
    [Discipline.Krachttraining]: { icon: '🏋️', accent: 'text-amber-300' },
  };

  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.trainingService.loadAll();
      const all = this.trainingService.trainings()();
      const found = all.find((t) => t.id === id);
      this.training = found ?? null;
      this.cdr.detectChanges();
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('nl-BE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  selectDiscipline(d: Discipline) {
    if (this.editData) this.editData.discipline = d;
  }

  startEdit() {
    if (!this.training) return;
    const { id, ...rest } = this.training;
    this.editData = { ...rest };
    this.isEditing = true;
  }

  async saveEdit() {
    if (!this.training) return;
    const updated = await this.trainingService.update(this.training.id, this.editData);
    if (updated) this.training = updated;
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
