import type { AssetLine, PortfolioMeta } from '../types';

export const portfolioData: AssetLine[] = [
  {
    id: 're-1',
    name: 'Appartement Lyon',
    category: 'real-estate',
    currentValue: 320000,
    dailyChangePct: 0,
    cashFlows: [{ date: '2019-06-01', amount: 280000, type: 'deposit' }],
  },
  {
    id: 'av-1',
    name: 'Fonds euros — Assurance Vie',
    category: 'life-insurance',
    currentValue: 45000,
    dailyChangePct: 0.0005,
    cashFlows: [
      { date: '2021-01-15', amount: 30000, type: 'deposit' },
      { date: '2022-06-01', amount: 5000, type: 'deposit' },
    ],
  },
  {
    id: 'pea-1',
    name: 'CW8 (MSCI World)',
    category: 'pea',
    currentValue: 18500,
    dailyChangePct: -0.008,
    cashFlows: [
      { date: '2020-03-01', amount: 12000, type: 'deposit' },
      { date: '2023-01-10', amount: 3000, type: 'deposit' },
    ],
  },
  {
    id: 'cto-1',
    name: 'S&P 500 UCITS ETF',
    category: 'cto',
    currentValue: 9800,
    dailyChangePct: 0.011,
    cashFlows: [{ date: '2022-09-01', amount: 8000, type: 'deposit' }],
  },
  {
    id: 'sav-1',
    name: 'Livret A',
    category: 'savings',
    currentValue: 22950,
    dailyChangePct: 0,
    cashFlows: [{ date: '2018-01-01', amount: 22950, type: 'deposit' }],
  },
  {
    id: 'crypto-1',
    name: 'Bitcoin',
    category: 'crypto',
    currentValue: 6200,
    dailyChangePct: 0.021,
    cashFlows: [{ date: '2021-11-01', amount: 4000, type: 'deposit' }],
  },
];

export const portfolioMeta: PortfolioMeta = {
  ath: 480000,
  ytdChangePct: 0.062,
  passiveIncomeAnnual: 9600,
};
