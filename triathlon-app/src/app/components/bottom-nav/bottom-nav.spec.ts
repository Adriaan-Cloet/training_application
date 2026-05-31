import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { BottomNavComponent } from './bottom-nav';

@Component({
  template: '',
  standalone: true,
})
class DummyPageComponent {}

describe('BottomNavComponent', () => {
  let fixture: ComponentFixture<BottomNavComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNavComponent],
      providers: [
        provideRouter([
          { path: '', component: DummyPageComponent },
          { path: 'calendar', component: DummyPageComponent },
          { path: 'stats', component: DummyPageComponent },
          { path: 'instellingen', component: DummyPageComponent },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(BottomNavComponent);
  });

  async function navigateAndDetect(url: string) {
    await router.navigateByUrl(url);
    fixture.detectChanges();
  }

  it('should only show the active indicator on the current route', async () => {
    await navigateAndDetect('/');
    let navLinks = fixture.nativeElement.querySelectorAll('a');
    expect(navLinks[0].classList.contains('bg-gray-900/80')).toBeTruthy();
    expect(navLinks[1].classList.contains('bg-gray-900/80')).toBeFalsy();
    expect(navLinks[2].classList.contains('bg-gray-900/80')).toBeFalsy();
    expect(navLinks[3].classList.contains('bg-gray-900/80')).toBeFalsy();

    await navigateAndDetect('/calendar');
    navLinks = fixture.nativeElement.querySelectorAll('a');
    expect(navLinks[0].classList.contains('bg-gray-900/80')).toBeFalsy();
    expect(navLinks[1].classList.contains('bg-gray-900/80')).toBeTruthy();
    expect(navLinks[2].classList.contains('bg-gray-900/80')).toBeFalsy();
    expect(navLinks[3].classList.contains('bg-gray-900/80')).toBeFalsy();
  });
});
