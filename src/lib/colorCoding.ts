export type Sentiment = 'positive' | 'negative' | 'neutral';

const NEUTRAL_THRESHOLD_PCT = 0.0005; // ±0.05%

/** For daily/YTD % deltas — a near-zero change reads as neutral. */
export function sentimentForPct(pct: number): Sentiment {
  if (Math.abs(pct) < NEUTRAL_THRESHOLD_PCT) return 'neutral';
  return pct > 0 ? 'positive' : 'negative';
}

/** For plain gain/loss amounts (currency, IRR) — sign only, no neutral band. */
export function sentimentForSign(value: number): Sentiment {
  if (value === 0) return 'neutral';
  return value > 0 ? 'positive' : 'negative';
}

export function sentimentTextClass(sentiment: Sentiment): string {
  switch (sentiment) {
    case 'positive':
      return 'text-[var(--delta-good)]';
    case 'negative':
      return 'text-[var(--delta-bad)]';
    case 'neutral':
      return 'text-[var(--text-secondary)]';
  }
}

export function sentimentDotClass(sentiment: Sentiment): string {
  switch (sentiment) {
    case 'positive':
      return 'bg-[var(--delta-good)]';
    case 'negative':
      return 'bg-[var(--delta-bad)]';
    case 'neutral':
      return 'bg-[var(--delta-neutral-dot)]';
  }
}
