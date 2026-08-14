import type { AssetCategory, AssetLine } from '../types';
import { CATEGORY_COLOR_VAR, CATEGORY_LABELS, CATEGORY_ORDER } from '../lib/categories';
import { sentimentForSign, sentimentTextClass } from '../lib/colorCoding';
import { formatCurrency, formatPercent } from '../lib/format';
import { categoryTotal, dailyPnl, netInvested, netWorth, unrealizedPnl } from '../lib/portfolio';

function PnlCell({ value }: { value: number }) {
  return <span className={sentimentTextClass(sentimentForSign(value))}>{formatCurrency(value)}</span>;
}

function CategorySection({
  category,
  lines,
  worth,
}: {
  category: AssetCategory;
  lines: AssetLine[];
  worth: number;
}) {
  const categoryLines = lines.filter((l) => l.category === category);
  if (categoryLines.length === 0) return null;
  const total = categoryTotal(lines, category);
  const totalDaily = categoryLines.reduce((sum, l) => sum + dailyPnl(l), 0);
  const totalUnrealized = categoryLines.reduce((sum, l) => sum + unrealizedPnl(l), 0);

  return (
    <>
      <tr>
        <td colSpan={5} className="pb-1 pt-4 text-xs font-semibold text-[var(--text-primary)]">
          <span className="inline-flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: `var(${CATEGORY_COLOR_VAR[category]})` }}
            />
            {CATEGORY_LABELS[category]}
          </span>
        </td>
      </tr>
      {categoryLines.map((line) => (
        <tr key={line.id} className="border-t border-[var(--border-hairline)] tabular-nums">
          <td className="py-2 pl-4 text-[var(--text-secondary)]">{line.name}</td>
          <td className="py-2 text-right text-[var(--text-primary)]">
            {formatCurrency(line.currentValue)} / {formatCurrency(netInvested(line))}
          </td>
          <td className="py-2 text-right">
            <PnlCell value={dailyPnl(line)} />
          </td>
          <td className="py-2 text-right">
            <PnlCell value={unrealizedPnl(line)} />
          </td>
          <td className="py-2 text-right text-[var(--text-secondary)]">
            {formatPercent(worth === 0 ? 0 : line.currentValue / worth)}
          </td>
        </tr>
      ))}
      <tr className="border-t border-[var(--border-hairline)] font-medium tabular-nums">
        <td className="py-2 pl-4 text-[var(--text-primary)]">Subtotal</td>
        <td className="py-2 text-right text-[var(--text-primary)]">{formatCurrency(total)}</td>
        <td className="py-2 text-right">
          <PnlCell value={totalDaily} />
        </td>
        <td className="py-2 text-right">
          <PnlCell value={totalUnrealized} />
        </td>
        <td className="py-2 text-right text-[var(--text-secondary)]">
          {formatPercent(worth === 0 ? 0 : total / worth)}
        </td>
      </tr>
    </>
  );
}

export function AssetTable({ lines }: { lines: AssetLine[] }) {
  const worth = netWorth(lines);
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-1)] p-4">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="text-xs text-[var(--text-muted)]">
            <th className="pb-2 text-left font-normal">Name</th>
            <th className="pb-2 text-right font-normal">Value / invested</th>
            <th className="pb-2 text-right font-normal">Daily P&amp;L</th>
            <th className="pb-2 text-right font-normal">Unrealized P&amp;L</th>
            <th className="pb-2 text-right font-normal">Allocation</th>
          </tr>
        </thead>
        <tbody>
          {CATEGORY_ORDER.map((category) => (
            <CategorySection key={category} category={category} lines={lines} worth={worth} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
