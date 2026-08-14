import type { IndexRegion } from '../types';

export const indexData: IndexRegion[] = [
  {
    region: 'Asia',
    indices: [
      { name: 'Nikkei 225', dailyChangePct: -0.004, ytdChangePct: 0.081 },
      { name: 'Hang Seng', dailyChangePct: 0.012, ytdChangePct: -0.023 },
      { name: 'Shanghai', dailyChangePct: 0.0003, ytdChangePct: 0.015 },
      { name: 'Kospi', dailyChangePct: -0.017, ytdChangePct: 0.042 },
    ],
  },
  {
    region: 'Europe',
    indices: [
      { name: 'STOXX 600', dailyChangePct: 0.003, ytdChangePct: 0.071 },
      { name: 'DAX', dailyChangePct: 0.006, ytdChangePct: 0.095 },
      { name: 'CAC 40', dailyChangePct: -0.002, ytdChangePct: 0.038 },
      { name: 'FTSE 100', dailyChangePct: 0.0002, ytdChangePct: 0.052 },
    ],
  },
  {
    region: 'US',
    indices: [
      { name: 'S&P 500', dailyChangePct: 0.009, ytdChangePct: 0.128 },
      { name: 'Nasdaq', dailyChangePct: 0.014, ytdChangePct: 0.176 },
      { name: 'Dow Jones', dailyChangePct: -0.001, ytdChangePct: 0.062 },
      { name: 'Russell 2000', dailyChangePct: -0.006, ytdChangePct: 0.031 },
    ],
  },
];
