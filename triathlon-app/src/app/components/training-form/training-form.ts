import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../services/training.service';
import { Discipline } from '../../models/training.model';

@Component({
  selector: 'app-training-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './training-form.html',
  styleUrl: './training-form.css',
})
export class TrainingFormComponent {
  @ViewChild('trainingForm') trainingForm!: NgForm;

  disciplines = Object.values(Discipline);

  private readonly initialFormData = {
    title: '',
    date: '',
    startTime: '',
    discipline: Discipline.Lopen,
    duration: 0,
    distance: undefined as number | undefined,
    feeling: 5,
    notes: '',
  };

  formData = { ...this.initialFormData };

  constructor(private trainingService: TrainingService) {}

  onSubmit() {
    this.trainingService.add({ ...this.formData });
    this.trainingForm.resetForm({ ...this.initialFormData });
  }
}
