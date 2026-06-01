import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingFormComponent as TrainingForm } from './training-form';

describe('TrainingForm', () => {
  let component: TrainingForm;
  let fixture: ComponentFixture<TrainingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose feelingOptions as [1..10]', () => {
    expect(component.feelingOptions).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('should update formData.feeling when setFeeling is called', () => {
    component.setFeeling(8);
    expect(component.formData.feeling).toBe(8);
    component.setFeeling(2);
    expect(component.formData.feeling).toBe(2);
  });
});
