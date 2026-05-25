import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingFormComponent } from '../../components/training-form/training-form';
import { PageHeaderComponent } from '../../components/page-header/page-header';

@Component({
  selector: 'app-log',
  imports: [TrainingFormComponent, PageHeaderComponent],
  templateUrl: './log.html',
})
export class LogPage {
  constructor(private router: Router) {}

  onSaved() {
    this.router.navigate(['/']);
  }
}
