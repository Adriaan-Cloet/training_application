import { Component, OnInit } from '@angular/core';
import { TrainingListComponent } from '../../components/training-list/training-list';
import { RaceCountdownComponent } from '../../components/race-countdown/race-countdown';
import { RouterLink } from '@angular/router';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-home',
  imports: [TrainingListComponent, RaceCountdownComponent, RouterLink],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  constructor(private trainingService: TrainingService) {}

  async ngOnInit() {
    await this.trainingService.loadAll();
  }
}
