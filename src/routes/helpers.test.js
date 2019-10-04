import { formatDate } from './helpers';

describe('formatDate', () => {
  it('formats ISO date strings', () => {
    expect(formatDate('2019-01-01T00:00:00.000Z', 'dd MMMM yyyy')).toEqual(
      '01 January 2019',
    );
  });
});
