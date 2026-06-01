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

  function getNavLinks() {
    const navLinks = (fixture.nativeElement as HTMLElement).querySelectorAll('a');
    const homeLink = navLinks[0] as HTMLAnchorElement;
    const calendarLink = navLinks[1] as HTMLAnchorElement;
    const statsLink = navLinks[2] as HTMLAnchorElement;
    const settingsLink = navLinks[3] as HTMLAnchorElement;
    return { homeLink, calendarLink, statsLink, settingsLink };
  }

  it('should render svg icons instead of text emoji in each nav link', () => {
    fixture.detectChanges();
    const svgs = (fixture.nativeElement as HTMLElement).querySelectorAll('nav a svg');
    expect(svgs.length).toBe(4);
    const emojiSpans = (fixture.nativeElement as HTMLElement).querySelectorAll('nav a span.text-xl');
    expect(emojiSpans.length).toBe(0);
  });

  it('should only show the active indicator on the current route', async () => {
    await navigateAndDetect('/');
    const homeState = getNavLinks();
    expect(homeState.homeLink.classList.contains('bg-gray-900/80')).toBeTruthy();
    expect(homeState.calendarLink.classList.contains('bg-gray-900/80')).toBeFalsy();
    expect(homeState.statsLink.classList.contains('bg-gray-900/80')).toBeFalsy();
    expect(homeState.settingsLink.classList.contains('bg-gray-900/80')).toBeFalsy();

    await navigateAndDetect('/calendar');
    const calendarState = getNavLinks();
    expect(calendarState.homeLink.classList.contains('bg-gray-900/80')).toBeFalsy();
    expect(calendarState.calendarLink.classList.contains('bg-gray-900/80')).toBeTruthy();
    expect(calendarState.statsLink.classList.contains('bg-gray-900/80')).toBeFalsy();
    expect(calendarState.settingsLink.classList.contains('bg-gray-900/80')).toBeFalsy();

    await navigateAndDetect('/stats');
    const statsState = getNavLinks();
    expect(statsState.homeLink.classList.contains('bg-gray-900/80')).toBeFalsy();
    expect(statsState.calendarLink.classList.contains('bg-gray-900/80')).toBeFalsy();
    expect(statsState.statsLink.classList.contains('bg-gray-900/80')).toBeTruthy();
    expect(statsState.settingsLink.classList.contains('bg-gray-900/80')).toBeFalsy();

    await navigateAndDetect('/instellingen');
    const settingsState = getNavLinks();
    expect(settingsState.homeLink.classList.contains('bg-gray-900/80')).toBeFalsy();
    expect(settingsState.calendarLink.classList.contains('bg-gray-900/80')).toBeFalsy();
    expect(settingsState.statsLink.classList.contains('bg-gray-900/80')).toBeFalsy();
    expect(settingsState.settingsLink.classList.contains('bg-gray-900/80')).toBeTruthy();
  });
});
