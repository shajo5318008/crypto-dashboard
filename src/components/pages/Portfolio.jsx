import React from 'react';
import { TrendingUp, TrendingDown, Wallet, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const SkeletonRow = () => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 animate-pulse">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 rounded-full bg-white/10" />
      <div className="space-y-2">
        <div className="h-4 w-24 bg-white/10 rounded" />
        <div className="h-3 w-12 bg-white/10 rounded" />
      </div>
    </div>
    <div className="space-y-2 text-right">
      <div className="h-4 w-20 bg-white/10 rounded ml-auto" />
      <div className="h-3 w-14 bg-white/10 rounded ml-auto" />
    </div>
  </div>
);

const Portfolio = ({ assets, portfolio }) => {
  const isLoading = !assets || assets.length === 0;

  const allocationColors = [
    'from-blue-500 to-blue-400',
    'from-purple-500 to-purple-400',
    'from-emerald-500 to-emerald-400',
    'from-amber-500 to-amber-400',
    'from-pink-500 to-pink-400',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-text">Portfolio</h2>
        <p className="text-muted text-sm mt-1">Live overview of your holdings</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Balance */}
        <div className="glass rounded-2xl p-6 col-span-1 sm:col-span-1 group hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted text-sm font-medium">Total Balance</span>
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Wallet size={18} className="text-primary" />
            </div>
          </div>
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-8 w-36 bg-white/10 rounded" />
              <div className="h-4 w-24 bg-white/10 rounded" />
            </div>
          ) : (
            <>
              <div className="text-3xl font-bold text-text tracking-tight">
                ${portfolio.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`flex items-center gap-1 text-sm mt-2 font-medium ${portfolio.profit24h >= 0 ? 'text-success' : 'text-danger'}`}>
                {portfolio.profit24h >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {portfolio.profit24h >= 0 ? '+' : ''}${Math.abs(portfolio.profit24h).toLocaleString()} (24h)
              </div>
            </>
          )}
        </div>

        {/* 24h Profit/Loss */}
        <div className="glass rounded-2xl p-6 group hover:border-success/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted text-sm font-medium">24h Change</span>
            <div className="w-9 h-9 rounded-xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
              <TrendingUp size={18} className="text-success" />
            </div>
          </div>
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-8 w-24 bg-white/10 rounded" />
              <div className="h-4 w-16 bg-white/10 rounded" />
            </div>
          ) : (
            <>
              <div className={`text-3xl font-bold tracking-tight ${portfolio.profit24h >= 0 ? 'text-success' : 'text-danger'}`}>
                {portfolio.profitPercentage}%
              </div>
              <div className="text-muted text-sm mt-2">
                {portfolio.profit24h >= 0 ? 'Profit' : 'Loss'} today
              </div>
            </>
          )}
        </div>

        {/* Allocation Breakdown */}
        <div className="glass rounded-2xl p-6 group hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted text-sm font-medium">Allocation</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <PieChart size={18} className="text-purple-400" />
            </div>
          </div>
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-3 w-full bg-white/10 rounded-full" />
              <div className="h-3 w-full bg-white/10 rounded-full" />
            </div>
          ) : (
            <div className="space-y-2 mt-1">
              {portfolio.allocation?.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className={`h-1.5 rounded-full bg-gradient-to-r ${allocationColors[i % allocationColors.length]}`}
                    style={{ width: `${item.value}%` }} />
                  <span className="text-xs text-muted whitespace-nowrap">{item.name} {item.value}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Assets Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-bold text-text">Your Assets</h3>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider border-b border-white/5">
          <span>Coin</span>
          <span className="text-right">Price</span>
          <span className="text-right">24h Change</span>
          <span className="text-right hidden sm:block">Holdings</span>
        </div>

        <div className="divide-y divide-white/5">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-6 py-4">
                  <SkeletonRow />
                </div>
              ))
            : assets.map((asset, i) => (
                <div
                  key={asset.id}
                  className="grid grid-cols-4 items-center px-6 py-4 hover:bg-white/5 transition-all duration-200 cursor-pointer group"
                >
                  {/* Coin */}
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${allocationColors[i % allocationColors.length]} flex items-center justify-center font-bold text-white text-sm shadow-lg`}>
                      {asset.symbol[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-text group-hover:text-primary transition-colors">{asset.name}</div>
                      <div className="text-xs text-muted">{asset.symbol}</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right font-semibold text-text tabular-nums">
                    ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>

                  {/* 24h Change */}
                  <div className={`text-right font-medium flex items-center justify-end gap-1 ${asset.change24h >= 0 ? 'text-success' : 'text-danger'}`}>
                    {asset.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                  </div>

                  {/* Volume */}
                  <div className="text-right text-muted text-sm hidden sm:block">
                    Vol: {asset.volume}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
