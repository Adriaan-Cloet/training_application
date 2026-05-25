import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { TrainingService } from '../../services/training.service';
import { Training, Discipline } from '../../models/training.model';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
);
type Periode = 'week' | 'maand' | '3maanden' | 'jaar' | 'totaal';
type Eenheid = 'minuten' | 'kilometers';

@Component({
  selector: 'app-stats',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class StatsComponent implements OnInit {
  periode: Periode = 'maand';
  eenheid: Eenheid = 'minuten';
  krachttrainingIncluded = true;

  periodes: { label: string; value: Periode }[] = [
    { label: 'Week', value: 'week' },
    { label: 'Maand', value: 'maand' },
    { label: '3 Maanden', value: '3maanden' },
    { label: 'Jaar', value: 'jaar' },
    { label: 'Totaal', value: 'totaal' },
  ];

  disciplines = [
    Discipline.Zwemmen,
    Discipline.Fietsen,
    Discipline.Lopen,
    Discipline.Krachttraining,
  ];

  disciplineColors: Record<string, string> = {
    zwemmen: 'rgba(56, 189, 248, 0.8)',
    fietsen: 'rgba(74, 222, 128, 0.8)',
    lopen: 'rgba(248, 113, 113, 0.8)',
    krachttraining: 'rgba(250, 204, 21, 0.8)',
  };

  chartData: ChartData<'bar'> = { labels: [], datasets: [] };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { stacked: false },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Minuten' },
      },
    },
  };

  constructor(private trainingService: TrainingService) {}

  async ngOnInit() {
    await this.trainingService.loadAll();
    this.buildChart();
  }

  setPeriode(p: Periode) {
    this.periode = p;
    this.buildChart();
  }

  setEenheid(e: Eenheid) {
    this.eenheid = e;
    this.buildChart();
  }

  toggleKracht() {
    this.krachttrainingIncluded = !this.krachttrainingIncluded;
    this.buildChart();
  }

  private getFilteredTrainings(): Training[] {
    const all = this.trainingService.trainings()();
    const now = new Date();
    let from: Date;

    switch (this.periode) {
      case 'week':
        from = new Date(now);
        from.setDate(now.getDate() - 7);
        break;
      case 'maand':
        from = new Date(now);
        from.setMonth(now.getMonth() - 1);
        break;
      case '3maanden':
        from = new Date(now);
        from.setMonth(now.getMonth() - 3);
        break;
      case 'jaar':
        from = new Date(now);
        from.setFullYear(now.getFullYear() - 1);
        break;
      case 'totaal':
        return all;
    }

    return all.filter((t: Training) => new Date(t.date) >= from);
  }

  private buildChart() {
    const trainings = this.getFilteredTrainings();
    const labels = this.getLabels();
    const activeDisciplines = this.krachttrainingIncluded
      ? this.disciplines
      : this.disciplines.filter((d) => d !== Discipline.Krachttraining);

    const datasets = activeDisciplines.map((discipline) => {
      const data = labels.map((label) => {
        const matches = trainings.filter(
          (t) => t.discipline === discipline && this.getLabelForTraining(t) === label,
        );
        if (this.eenheid === 'minuten') {
          return matches.reduce((sum, t) => sum + t.duration, 0);
        } else {
          return matches.reduce((sum, t) => sum + (t.distance ?? 0), 0);
        }
      });

      return {
        label: discipline.charAt(0).toUpperCase() + discipline.slice(1),
        data,
        backgroundColor: this.disciplineColors[discipline],
      };
    });

    this.chartData = { labels, datasets };
    (this.chartOptions.scales!['y'] as any).title.text =
      this.eenheid === 'minuten' ? 'Minuten' : 'Kilometers';
  }

  private getLabels(): string[] {
    const trainings = this.getFilteredTrainings();
    const labelSet = new Set(trainings.map((t) => this.getLabelForTraining(t)));
    return Array.from(labelSet).sort();
  }

  private getLabelForTraining(t: Training): string {
    const date = new Date(t.date);
    switch (this.periode) {
      case 'week':
        return date.toLocaleDateString('nl-BE', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        });
      case 'maand':
        return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' });
      case '3maanden':
      case 'jaar': {
        const week = this.getWeekNumber(date);
        return `W${week} ${date.getFullYear()}`;
      }
      case 'totaal':
        return date.toLocaleDateString('nl-BE', { month: 'short', year: 'numeric' });
    }
  }

  private getWeekNumber(date: Date): number {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  goBack() {
    history.back();
  }
}
