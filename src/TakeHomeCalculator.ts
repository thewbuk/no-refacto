export class TakeHomeCalculator {
  private readonly percent: number;

  constructor(percent: number) {
    this.percent = percent;
  }

  netAmount(
    first: Pair<number, string>,
    ...rest: Pair<number, string>[]
  ): Pair<number, string> {
    let pairs: Pair<number, string>[] = Array.from(rest);

    let total: Pair<number, string> = first;

    for (let next of pairs) {
      if (next.second != total.second) {
        throw new Incalculable();
      }
    }

    for (let next of pairs) {
      total = new Pair<number, string>(total.first + next.first, next.second);
    }

    let amount: number = total.first * (this.percent / 100);
    let tax = new Pair<number, string>(amount, first.second);

    if (total.second == tax.second) {
      return new Pair<number, string>(total.first - tax.first, first.second);
    } else {
      throw new Incalculable();
    }
  }
}

export class Pair<A, B> {
  first: A;
  second: B;

  constructor(first: A, second: B) {
    this.first = first;
    this.second = second;
  }
}

export class Incalculable extends Error {}
