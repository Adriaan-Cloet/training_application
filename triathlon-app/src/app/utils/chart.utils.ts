const WEEK_LABEL = /^W(\d+)\s+(\d{4})$/;

/**
 * Sorts chart labels correctly for both week-prefixed labels ("W10 2026")
 * and plain date strings. Default string sort mis-orders W1, W10, W2.
 */
export function sortChartLabels(labels: string[]): string[] {
  return [...labels].sort((a, b) => {
    const ma = a.match(WEEK_LABEL);
    const mb = b.match(WEEK_LABEL);
    if (ma && mb) {
      const yearDiff = Number(ma[2]) - Number(mb[2]);
      return yearDiff !== 0 ? yearDiff : Number(ma[1]) - Number(mb[1]);
    }
    return a.localeCompare(b, undefined, { numeric: true });
  });
}
