import type { AssetCategory } from '../types';

export const CATEGORY_ORDER: AssetCategory[] = [
  'real-estate',
  'life-insurance',
  'pea',
  'cto',
  'savings',
  'crypto',
];

export const CATEGORY_LABELS: Record<AssetCategory, string> = {
  'real-estate': 'Real estate',
  'life-insurance': 'Life insurance',
  pea: 'PEA',
  cto: 'CTO',
  savings: 'Savings',
  crypto: 'Crypto',
};

// Fixed categorical slot order from the validated default palette — never reassign.
export const CATEGORY_COLOR_VAR: Record<AssetCategory, string> = {
  'real-estate': '--series-1',
  'life-insurance': '--series-2',
  pea: '--series-3',
  cto: '--series-4',
  savings: '--series-5',
  crypto: '--series-6',
};
