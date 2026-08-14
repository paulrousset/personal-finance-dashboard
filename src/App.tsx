import { AllocationDonut } from './components/AllocationDonut';
import { AssetTable } from './components/AssetTable';
import { KeyStats } from './components/KeyStats';
import { PerformanceBoxes } from './components/PerformanceBoxes';
import { indexData } from './data/indexData';
import { portfolioData, portfolioMeta } from './data/portfolioData';
import { portfolioDailyChangePct, portfolioXirr, totalUnrealizedPnl } from './lib/portfolio';

function App() {
  const dailyChangePct = portfolioDailyChangePct(portfolioData);
  const irr = portfolioXirr(portfolioData);

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-6 sm:px-8 sm:py-8">
      <h1 className="text-xl font-semibold text-[var(--text-primary)]">Wealth dashboard</h1>
      <PerformanceBoxes
        regions={indexData}
        portfolioDailyChangePct={dailyChangePct}
        portfolioYtdChangePct={portfolioMeta.ytdChangePct}
      />
      <AllocationDonut lines={portfolioData} ath={portfolioMeta.ath} dailyChangePct={dailyChangePct} />
      <KeyStats
        unrealizedGain={totalUnrealizedPnl(portfolioData)}
        irr={irr}
        passiveIncomeAnnual={portfolioMeta.passiveIncomeAnnual}
      />
      <AssetTable lines={portfolioData} />
    </div>
  );
}

export default App;
