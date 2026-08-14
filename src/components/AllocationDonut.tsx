import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import type { AssetLine } from '../types';
import { CATEGORY_COLOR_VAR, CATEGORY_LABELS, CATEGORY_ORDER } from '../lib/categories';
import { sentimentForPct, sentimentTextClass } from '../lib/colorCoding';
import { formatCurrency, formatPercent } from '../lib/format';
import { categoryTotal, netWorth } from '../lib/portfolio';

const SIZE = 240;
const INNER_RADIUS = 78;
const OUTER_RADIUS = 110;

interface AllocationDonutProps {
  lines: AssetLine[];
  ath: number;
  dailyChangePct: number;
}

export function AllocationDonut({ lines, ath, dailyChangePct }: AllocationDonutProps) {
  const worth = netWorth(lines);
  const data = CATEGORY_ORDER.map((category) => ({
    category,
    value: categoryTotal(lines, category),
  })).filter((d) => d.value > 0);
  const dailySentiment = sentimentForPct(dailyChangePct);

  return (
    <div className="flex flex-col items-center gap-6 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-1)] p-6 sm:flex-row">
      <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
        <ResponsiveContainer width={SIZE} height={SIZE}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              innerRadius={INNER_RADIUS}
              outerRadius={OUTER_RADIUS}
              stroke="var(--surface-1)"
              strokeWidth={2}
              isAnimationActive={false}
            >
              {data.map((d) => (
                <Cell key={d.category} fill={`var(${CATEGORY_COLOR_VAR[d.category]})`} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-[var(--text-muted)]">Net worth</span>
          <span className="text-xl font-semibold text-[var(--text-primary)]">
            {formatCurrency(worth)}
          </span>
          <span className={`mt-1 text-xs font-medium ${sentimentTextClass(dailySentiment)}`}>
            {formatPercent(dailyChangePct)} today
          </span>
          <span className="mt-1 text-xs text-[var(--text-muted)]">ATH {formatCurrency(ath)}</span>
        </div>
      </div>
      <ul className="flex w-full flex-col gap-2">
        {data.map((d) => (
          <li key={d.category} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-[var(--text-secondary)]">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: `var(${CATEGORY_COLOR_VAR[d.category]})` }}
              />
              {CATEGORY_LABELS[d.category]}
            </span>
            <span className="tabular-nums text-[var(--text-primary)]">
              {formatCurrency(d.value)} · {formatPercent(worth === 0 ? 0 : d.value / worth)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
