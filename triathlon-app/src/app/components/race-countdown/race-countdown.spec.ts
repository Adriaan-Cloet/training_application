import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceCountdown } from './race-countdown';

describe('RaceCountdown', () => {
  let component: RaceCountdown;
  let fixture: ComponentFixture<RaceCountdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceCountdown],
    }).compileComponents();

    fixture = TestBed.createComponent(RaceCountdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
