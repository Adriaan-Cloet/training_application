import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Training } from '../../models/training.model';
import { TrainingService } from '../../services/training.service';
import { FlattenPipe } from '../../pipes/flatten-pipe';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, FlattenPipe],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class CalendarComponent implements OnInit {
  today = new Date();
  currentYear = this.today.getFullYear();
  currentMonth = this.today.getMonth();

  selectedDay: number | null = null;
  trainingsOnSelectedDay: Training[] = [];

  weeks: (number | null)[][] = [];
  trainingsPerDay: Map<number, Training[]> = new Map();

  monthNames = [
    'Januari',
    'Februari',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  dayNames = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

  disciplineColors: Record<string, string> = {
    zwemmen: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
    lopen: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
    fietsen: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    krachttraining: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  };

  disciplineIcons: Record<string, string> = {
    zwemmen: '🏊',
    lopen: '🏃',
    fietsen: '🚴',
    krachttraining: '🏋️',
  };

  constructor(
    private trainingService: TrainingService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    await this.trainingService.loadAll();
    this.buildCalendar();
    this.cdr.detectChanges();
  }

  buildCalendar() {
    this.trainingsPerDay = new Map();

    const allTrainings = this.trainingService.trainings()();
    allTrainings.forEach((t: Training) => {
      const date = new Date(t.date);
      if (date.getFullYear() === this.currentYear && date.getMonth() === this.currentMonth) {
        const day = date.getDate();
        if (!this.trainingsPerDay.has(day)) this.trainingsPerDay.set(day, []);
        this.trainingsPerDay.get(day)!.push(t);
      }
    });

    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    let startDow = firstDay.getDay() - 1;
    if (startDow < 0) startDow = 6;

    this.weeks = [];
    let week: (number | null)[] = Array(startDow).fill(null);

    for (let d = 1; d <= lastDay.getDate(); d++) {
      week.push(d);
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      this.weeks.push(week);
    }

    if (
      this.currentYear === this.today.getFullYear() &&
      this.currentMonth === this.today.getMonth()
    ) {
      this.selectDay(this.today.getDate());
    } else {
      this.selectedDay = null;
      this.trainingsOnSelectedDay = [];
    }
  }

  selectDay(day: number | null) {
    if (!day) return;
    this.selectedDay = day;
    this.trainingsOnSelectedDay = this.trainingsPerDay.get(day) ?? [];
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.buildCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.buildCalendar();
  }

  goToTraining(id: string) {
    this.router.navigate(['/training/' + id]);
  }
}
