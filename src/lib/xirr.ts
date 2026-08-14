export interface XirrCashFlow {
  date: Date;
  amount: number; // negative = money in (deposit), positive = money out / valuation
}

interface XirrOptions {
  low?: number;
  high?: number;
  tolerance?: number;
  maxIterations?: number;
}

const MS_PER_YEAR = 365 * 24 * 60 * 60 * 1000;

function npv(rate: number, cashFlows: XirrCashFlow[], t0: number): number {
  return cashFlows.reduce((sum, cf) => {
    const years = (cf.date.getTime() - t0) / MS_PER_YEAR;
    return sum + cf.amount / Math.pow(1 + rate, years);
  }, 0);
}

/**
 * Money-weighted annualized return, solved by bisection.
 * Cash flows are deposits/withdrawals followed by one final positive
 * valuation, so NPV(rate) is strictly monotonic — a single bracketed root.
 */
export function xirr(cashFlows: XirrCashFlow[], options: XirrOptions = {}): number {
  const { low = -0.99, high = 10, tolerance = 1e-6, maxIterations = 100 } = options;
  if (cashFlows.length < 2) return NaN;

  const t0 = Math.min(...cashFlows.map((cf) => cf.date.getTime()));
  let lo = low;
  let hi = high;
  let npvLo = npv(lo, cashFlows, t0);
  const npvHi = npv(hi, cashFlows, t0);
  if (Math.sign(npvLo) === Math.sign(npvHi)) return NaN;

  for (let i = 0; i < maxIterations; i++) {
    const mid = (lo + hi) / 2;
    const npvMid = npv(mid, cashFlows, t0);
    if (Math.abs(npvMid) < tolerance) return mid;
    if (Math.sign(npvMid) === Math.sign(npvLo)) {
      lo = mid;
      npvLo = npvMid;
    } else {
      hi = mid;
    }
  }
  return (lo + hi) / 2;
}
