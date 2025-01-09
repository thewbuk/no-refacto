export class TakeHomeCalculator {
  private readonly taxRate: number;

  constructor(percent: number) {
    this.taxRate = percent;
  }

  

  netAmount(
    first: amountAndCurrency,
    ...moneyValues: amountAndCurrency[]
  ): amountAndCurrency {

    let total = first.amount;
    const currency = first.currency;
    //40, GBP

    for (let next of moneyValues) {
      if (next.currency != currency) {
        throw new currencyIsNotEqual();
      }
      total = (total + next.amount);

    }

    let taxAmount: number = total * (this.taxRate / 100);
    return new amountAndCurrency(total - taxAmount, first.currency);
  }
}

export class amountAndCurrency {


  constructor(public amount: number, public currency: string) {
  }
}

export class currencyIsNotEqual extends Error {}
