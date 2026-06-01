import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light');
  });

  it('defaults to dark mode when no preference is stored', () => {
    const service = new ThemeService();
    expect(service.isDark()).toBe(true);
  });

  it('reads light preference from localStorage', () => {
    localStorage.setItem('theme', 'light');
    const service = new ThemeService();
    expect(service.isDark()).toBe(false);
  });

  it('treats stored dark value as dark mode', () => {
    localStorage.setItem('theme', 'dark');
    const service = new ThemeService();
    expect(service.isDark()).toBe(true);
  });

  it('toggle switches from dark to light', () => {
    const service = new ThemeService();
    service.toggle();
    expect(service.isDark()).toBe(false);
  });

  it('toggle switches from light to dark', () => {
    localStorage.setItem('theme', 'light');
    const service = new ThemeService();
    service.toggle();
    expect(service.isDark()).toBe(true);
  });

  it('toggle persists light preference to localStorage', () => {
    const service = new ThemeService();
    service.toggle();
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('toggle persists dark preference to localStorage', () => {
    localStorage.setItem('theme', 'light');
    const service = new ThemeService();
    service.toggle();
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('apply adds light class to html element in light mode', () => {
    localStorage.setItem('theme', 'light');
    const service = new ThemeService();
    service.apply();
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('apply removes light class from html element in dark mode', () => {
    document.documentElement.classList.add('light');
    const service = new ThemeService();
    service.apply();
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('toggle also applies the class immediately', () => {
    const service = new ThemeService();
    service.toggle();
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });
});
