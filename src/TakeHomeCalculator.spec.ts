import { Incalculable, Pair, TakeHomeCalculator } from './TakeHomeCalculator';

describe('TakeHomeCalculator', function () {
  it('can calculate tax', () => {
    let first = new TakeHomeCalculator(10).netAmount(
      new Pair<number, string>(40, 'GBP'),
      new Pair<number, string>(50, 'GBP'),
      new Pair<number, string>(60, 'GBP')
    ).first;
    expect(first).toEqual(135);
  });

  it('cannot sum different currencies', () => {
    expect(() =>
      new TakeHomeCalculator(10).netAmount(
        new Pair<number, string>(40, 'GBP'),
        new Pair<number, string>(50, 'USD')
      )
    ).toThrow(Incalculable);
  });
});
