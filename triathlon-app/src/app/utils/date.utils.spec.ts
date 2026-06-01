import { parseLocalDate } from './date.utils';

describe('parseLocalDate', () => {
  it('returns year, month, day matching the ISO string regardless of timezone', () => {
    const d = parseLocalDate('2026-06-01');
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(5); // June = index 5
    expect(d.getDate()).toBe(1);
  });

  it('does not shift to previous day for UTC-offset timezones', () => {
    const d = parseLocalDate('2026-01-10');
    expect(d.getDate()).toBe(10);
  });

  it('does not shift to next day for UTC+offset timezones', () => {
    const d = parseLocalDate('2026-12-31');
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(11);
    expect(d.getDate()).toBe(31);
  });
});
