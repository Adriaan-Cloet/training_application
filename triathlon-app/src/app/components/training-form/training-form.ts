import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrainingService } from '../../services/training.service';
import { Discipline } from '../../models/training.model';

@Component({
  selector: 'app-training-form',
  imports: [FormsModule],
  templateUrl: './training-form.html',
  styleUrl: './training-form.css',
})
export class TrainingForm {
  disciplines = Object.values(Discipline);

  formData = {
    title: '',
    date: '',
    discipline: Discipline.Lopen,
    duration: 0,
    distance: undefined as number | undefined,
    feeling: 5,
    notes: '',
  };

  constructor(private trainingService: TrainingService) {}

  onSubmit() {
    this.trainingService.add({
      ...this.formData,
    });
    this.resetForm();
  }

  private resetForm() {
    this.formData = {
      title: '',
      date: '',
      discipline: Discipline.Lopen,
      duration: 0,
      distance: undefined,
      feeling: 5,
      notes: '',
    };
  }
}
