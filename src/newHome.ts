export type Money = Pair<number, string>;

export class TakeHomeCalculator {
  private readonly taxRate: number;

  constructor(taxRate: number) {
    this.taxRate = taxRate;
  }

  netAmount(first: Money, ...rest: Money[]): Money {
    const total = this.calculateTotal(first, rest);
    const tax = this.calculateTax(total);
    return this.subtractTax(total, tax);
  }

  private calculateTotal(first: Money, rest: Money[]): Money {
    this.validateCurrencies([first, ...rest]);
    
    const totalAmount = [first, ...rest].reduce(
      (sum, current) => sum + current.first,
      0
    );
    
    return new Pair(totalAmount, first.second);
  }

  private calculateTax(amount: Money): Money {
    const taxAmount = amount.first * (this.taxRate / 100);
    return new Pair(taxAmount, amount.second);
  }

  private subtractTax(total: Money, tax: Money): Money {
    if (total.second !== tax.second) {
      throw new Incalculable('Currency mismatch between total and tax');
    }
    return new Pair(total.first - tax.first, total.second);
  }

  private validateCurrencies(amounts: Money[]): void {
    const currency = amounts[0].second;
    const hasInvalidCurrency = amounts.some(amount => amount.second !== currency);
    
    if (hasInvalidCurrency) {
      throw new Incalculable('All amounts must be in the same currency');
    }
  }
}

export class Pair<A, B> {
  constructor(
    public readonly first: A,
    public readonly second: B
  ) {}
}

export class Incalculable extends Error {
  constructor(message: string = 'Calculation not possible') {
    super(message);
    this.name = 'Incalculable';
  }
}
