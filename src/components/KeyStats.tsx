import { sentimentForSign, sentimentTextClass, type Sentiment } from '../lib/colorCoding';
import { formatCurrency, formatPercent } from '../lib/format';

function StatTile({
  label,
  value,
  sentiment,
}: {
  label: string;
  value: string;
  sentiment?: Sentiment;
}) {
  return (
    <div className="flex-1 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-1)] px-4 py-3">
      <div className="text-xs text-[var(--text-muted)]">{label}</div>
      <div
        className={`mt-1 text-lg font-semibold ${sentiment ? sentimentTextClass(sentiment) : 'text-[var(--text-primary)]'}`}
      >
        {value}
      </div>
    </div>
  );
}

interface KeyStatsProps {
  unrealizedGain: number;
  irr: number;
  passiveIncomeAnnual: number;
}

export function KeyStats({ unrealizedGain, irr, passiveIncomeAnnual }: KeyStatsProps) {
  const hasIrr = !Number.isNaN(irr);
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <StatTile
        label="Unrealized gain"
        value={formatCurrency(unrealizedGain)}
        sentiment={sentimentForSign(unrealizedGain)}
      />
      <StatTile
        label="IRR (money-weighted)"
        value={hasIrr ? formatPercent(irr) : '—'}
        sentiment={hasIrr ? sentimentForSign(irr) : undefined}
      />
      <StatTile label="Passive income / year" value={formatCurrency(passiveIncomeAnnual)} />
    </div>
  );
}
