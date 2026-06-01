/**
 * Parses an ISO date string (YYYY-MM-DD) as a local date, avoiding UTC
 * midnight shifting that new Date('YYYY-MM-DD') applies.
 */
export function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}
