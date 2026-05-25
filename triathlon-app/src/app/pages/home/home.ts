import { Component, OnInit } from '@angular/core';
import { TrainingFormComponent } from '../../components/training-form/training-form';
import { TrainingListComponent } from '../../components/training-list/training-list';
import { RaceCountdownComponent } from '../../components/race-countdown/race-countdown';
import { RouterLink } from '@angular/router';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-home',
  imports: [TrainingFormComponent, TrainingListComponent, RaceCountdownComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  constructor(private trainingService: TrainingService) {}

  async ngOnInit() {
    await this.trainingService.loadAll();
  }
}
