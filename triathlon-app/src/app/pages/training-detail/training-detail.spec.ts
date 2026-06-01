import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TrainingDetailComponent as TrainingDetail } from './training-detail';

describe('TrainingDetail', () => {
  let component: TrainingDetail;
  let fixture: ComponentFixture<TrainingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose feelingOptions as [1..10]', () => {
    expect(component.feelingOptions).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('should update editData.feeling when setFeeling is called', () => {
    component.editData = {
      title: 'Test',
      date: '2026-06-01',
      startTime: '08:00',
      discipline: 'lopen' as any,
      duration: 30,
      feeling: 5,
      notes: '',
    };
    component.setFeeling(9);
    expect(component.editData.feeling).toBe(9);
  });
});
