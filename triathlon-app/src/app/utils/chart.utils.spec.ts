import { sortChartLabels } from './chart.utils';

describe('sortChartLabels', () => {
  it('sorts week labels numerically, not lexicographically', () => {
    const labels = ['W10 2026', 'W2 2026', 'W1 2026', 'W9 2026'];
    expect(sortChartLabels(labels)).toEqual(['W1 2026', 'W2 2026', 'W9 2026', 'W10 2026']);
  });

  it('sorts week labels across year boundary', () => {
    const labels = ['W1 2026', 'W52 2025', 'W2 2026'];
    expect(sortChartLabels(labels)).toEqual(['W52 2025', 'W1 2026', 'W2 2026']);
  });

  it('sorts plain date strings alphabetically when no week prefix', () => {
    const labels = ['1 jun.', '15 jun.', '2 jun.'];
    expect(sortChartLabels(labels)).toEqual(['1 jun.', '2 jun.', '15 jun.']);
  });

  it('returns empty array for empty input', () => {
    expect(sortChartLabels([])).toEqual([]);
  });
});
