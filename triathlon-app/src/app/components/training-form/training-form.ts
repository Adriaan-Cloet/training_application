import { Component, output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../services/training.service';
import { Discipline } from '../../models/training.model';

@Component({
  selector: 'app-training-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './training-form.html',
})
export class TrainingFormComponent {
  @ViewChild('trainingForm') trainingForm!: NgForm;

  saved = output<void>();

  disciplines = Object.values(Discipline);

  disciplineMeta: Record<
    Discipline,
    { icon: string; label: string; activeClass: string }
  > = {
    [Discipline.Zwemmen]: {
      icon: '🏊',
      label: 'Zwemmen',
      activeClass: 'border-sky-400 bg-sky-400/15 text-sky-300',
    },
    [Discipline.Fietsen]: {
      icon: '🚴',
      label: 'Fietsen',
      activeClass: 'border-emerald-400 bg-emerald-400/15 text-emerald-300',
    },
    [Discipline.Lopen]: {
      icon: '🏃',
      label: 'Lopen',
      activeClass: 'border-rose-400 bg-rose-400/15 text-rose-300',
    },
    [Discipline.Krachttraining]: {
      icon: '🏋️',
      label: 'Kracht',
      activeClass: 'border-amber-400 bg-amber-400/15 text-amber-300',
    },
  };

  private readonly initialFormData = {
    title: '',
    date: new Date().toISOString().slice(0, 10),
    startTime: '',
    discipline: Discipline.Lopen,
    duration: 0,
    distance: undefined as number | undefined,
    feeling: 5,
    notes: '',
  };

  formData = { ...this.initialFormData };

  constructor(private trainingService: TrainingService) {}

  selectDiscipline(d: Discipline) {
    this.formData.discipline = d;
  }

  async onSubmit() {
    if (this.trainingForm.invalid) return;
    const result = await this.trainingService.add({ ...this.formData });
    if (!result) return;

    this.trainingForm.resetForm({ ...this.initialFormData });
    this.formData = { ...this.initialFormData };
    this.saved.emit();
  }
}
