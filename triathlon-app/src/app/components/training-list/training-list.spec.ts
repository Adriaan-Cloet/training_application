import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TrainingListComponent } from './training-list';
import { TrainingService } from '../../services/training.service';
import { Discipline } from '../../models/training.model';

const mockTrainingService = {
  trainings: () => signal([]),
  delete: vi.fn().mockResolvedValue(undefined),
};

describe('TrainingListComponent', () => {
  let component: TrainingListComponent;
  let fixture: ComponentFixture<TrainingListComponent>;

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [TrainingListComponent],
      providers: [
        provideRouter([]),
        { provide: TrainingService, useValue: mockTrainingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should map each discipline to the correct border-left style', () => {
    expect(component.disciplineBorderStyle[Discipline.Zwemmen]).toBe('border-left: 3px solid #38bdf8');
    expect(component.disciplineBorderStyle[Discipline.Fietsen]).toBe('border-left: 3px solid #34d399');
    expect(component.disciplineBorderStyle[Discipline.Lopen]).toBe('border-left: 3px solid #fb7185');
    expect(component.disciplineBorderStyle[Discipline.Krachttraining]).toBe('border-left: 3px solid #fbbf24');
  });

  describe('delete confirmation', () => {
    it('should set trainingToDelete when delete is called, not delete immediately', () => {
      const event = new MouseEvent('click');
      component.delete('abc-123', event);
      expect(component.trainingToDelete()).toBe('abc-123');
      expect(mockTrainingService.delete).not.toHaveBeenCalled();
    });

    it('should call trainingService.delete and clear trainingToDelete on confirmDelete', async () => {
      component.trainingToDelete.set('abc-123');
      await component.confirmDelete();
      expect(mockTrainingService.delete).toHaveBeenCalledWith('abc-123');
      expect(component.trainingToDelete()).toBeNull();
    });

    it('should clear trainingToDelete on cancelDelete without calling service', () => {
      component.trainingToDelete.set('abc-123');
      component.cancelDelete();
      expect(component.trainingToDelete()).toBeNull();
      expect(mockTrainingService.delete).not.toHaveBeenCalled();
    });
  });
});
