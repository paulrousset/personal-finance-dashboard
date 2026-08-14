export type AssetCategory =
  | 'real-estate'
  | 'life-insurance'
  | 'pea'
  | 'cto'
  | 'savings'
  | 'crypto';

export interface CashFlow {
  date: string; // ISO date
  amount: number; // always positive; sign derived from `type`
  type: 'deposit' | 'withdrawal';
}

export interface AssetLine {
  id: string;
  name: string;
  category: AssetCategory;
  currentValue: number;
  dailyChangePct: number; // 0 for illiquid lines (real estate, savings)
  cashFlows: CashFlow[]; // source of truth for "invested" and for XIRR
}

export interface IndexQuote {
  name: string;
  dailyChangePct: number;
  ytdChangePct: number;
}

export interface IndexRegion {
  region: 'Asia' | 'Europe' | 'US';
  indices: IndexQuote[];
}

export interface PortfolioMeta {
  ath: number;
  ytdChangePct: number;
  passiveIncomeAnnual: number;
}
