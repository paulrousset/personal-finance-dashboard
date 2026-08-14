import type { IndexRegion } from '../types';
import { sentimentDotClass, sentimentForPct, sentimentTextClass } from '../lib/colorCoding';
import { formatPercent } from '../lib/format';

function Delta({ pct }: { pct: number }) {
  const sentiment = sentimentForPct(pct);
  return (
    <span className="inline-flex items-center gap-1.5">
      {sentiment === 'neutral' && (
        <span className={`h-2 w-2 rounded-full ${sentimentDotClass(sentiment)}`} />
      )}
      <span className={`font-medium ${sentimentTextClass(sentiment)}`}>{formatPercent(pct)}</span>
    </span>
  );
}

function RegionBox({ region }: { region: IndexRegion }) {
  return (
    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-1)] p-4">
      <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">{region.region}</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-[var(--text-muted)]">
            <th className="pb-1 text-left font-normal">Index</th>
            <th className="pb-1 text-right font-normal">Daily</th>
            <th className="pb-1 text-right font-normal">YTD</th>
          </tr>
        </thead>
        <tbody className="tabular-nums">
          {region.indices.map((idx) => (
            <tr key={idx.name}>
              <td className="py-1 text-[var(--text-secondary)]">{idx.name}</td>
              <td className="py-1 text-right">
                <Delta pct={idx.dailyChangePct} />
              </td>
              <td className="py-1 text-right">
                <Delta pct={idx.ytdChangePct} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PortfolioBox({
  dailyChangePct,
  ytdChangePct,
}: {
  dailyChangePct: number;
  ytdChangePct: number;
}) {
  return (
    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-1)] p-4">
      <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Portfolio</h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-[var(--text-muted)]">Daily</span>
          <Delta pct={dailyChangePct} />
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-[var(--text-muted)]">YTD</span>
          <Delta pct={ytdChangePct} />
        </div>
      </div>
    </div>
  );
}

interface PerformanceBoxesProps {
  regions: IndexRegion[];
  portfolioDailyChangePct: number;
  portfolioYtdChangePct: number;
}

export function PerformanceBoxes({
  regions,
  portfolioDailyChangePct,
  portfolioYtdChangePct,
}: PerformanceBoxesProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {regions.map((region) => (
        <RegionBox key={region.region} region={region} />
      ))}
      <PortfolioBox dailyChangePct={portfolioDailyChangePct} ytdChangePct={portfolioYtdChangePct} />
    </div>
  );
}
