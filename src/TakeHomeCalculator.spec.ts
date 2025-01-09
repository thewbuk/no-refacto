import { CurrencyMismatchError, type AmountAndCurrency, TakeHomeCalculator } from './TakeHomeCalculator';

describe('TakeHomeCalculator', () => {
  it('can calculate tax', () => {
    const calculator = new TakeHomeCalculator(10);
    const result = calculator.netAmount(
      { amount: 40, currency: 'GBP' },
      { amount: 50, currency: 'GBP' },
      { amount: 60, currency: 'GBP' }
    ).amount;
    
    expect(result).toEqual(135);
  });

  it('cannot sum different currencies', () => {
    const calculator = new TakeHomeCalculator(10);
    
    expect(() =>
      calculator.netAmount(
        { amount: 40, currency: 'GBP' },
        { amount: 50, currency: 'USD' }
      )
    ).toThrow(CurrencyMismatchError);
  });
});
