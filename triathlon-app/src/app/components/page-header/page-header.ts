import { Component, input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.html',
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>('');

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
