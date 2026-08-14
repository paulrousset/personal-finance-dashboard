import type { AssetCategory, AssetLine } from '../types';
import { xirr, type XirrCashFlow } from './xirr';

export function netInvested(line: AssetLine): number {
  return line.cashFlows.reduce(
    (sum, cf) => sum + (cf.type === 'deposit' ? cf.amount : -cf.amount),
    0,
  );
}

export function unrealizedPnl(line: AssetLine): number {
  return line.currentValue - netInvested(line);
}

export function dailyPnl(line: AssetLine): number {
  return line.currentValue * line.dailyChangePct;
}

export function netWorth(lines: AssetLine[]): number {
  return lines.reduce((sum, l) => sum + l.currentValue, 0);
}

export function totalUnrealizedPnl(lines: AssetLine[]): number {
  return lines.reduce((sum, l) => sum + unrealizedPnl(l), 0);
}

export function totalDailyPnl(lines: AssetLine[]): number {
  return lines.reduce((sum, l) => sum + dailyPnl(l), 0);
}

export function portfolioDailyChangePct(lines: AssetLine[]): number {
  const worth = netWorth(lines);
  return worth === 0 ? 0 : totalDailyPnl(lines) / worth;
}

export function categoryTotal(lines: AssetLine[], category: AssetCategory): number {
  return lines
    .filter((l) => l.category === category)
    .reduce((sum, l) => sum + l.currentValue, 0);
}

function lineCashFlowsForXirr(line: AssetLine, asOf: Date): XirrCashFlow[] {
  const flows: XirrCashFlow[] = line.cashFlows.map((cf) => ({
    date: new Date(cf.date),
    amount: cf.type === 'deposit' ? -cf.amount : cf.amount,
  }));
  flows.push({ date: asOf, amount: line.currentValue });
  return flows;
}

export function portfolioXirr(lines: AssetLine[], asOf: Date = new Date()): number {
  const flows = lines.flatMap((l) => lineCashFlowsForXirr(l, asOf));
  return xirr(flows);
}
