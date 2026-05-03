import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ArrowUpDown, Search } from 'lucide-react';

const TrendSparkline = ({ isUp }) => {
  const color = isUp ? '#10B981' : '#EF4444';
  const points = isUp
    ? '0,20 10,15 20,12 30,8 40,10 50,5 60,2'
    : '0,2 10,5 20,8 30,10 40,12 50,15 60,20';
  return (
    <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="opacity-80">
      <polyline points={points} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {Array.from({ length: 6 }).map((_, i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 bg-white/10 rounded w-full" />
      </td>
    ))}
  </tr>
);

const coinColors = [
  'from-amber-500 to-yellow-400',
  'from-blue-500 to-indigo-400',
  'from-purple-500 to-violet-400',
  'from-teal-500 to-emerald-400',
  'from-pink-500 to-rose-400',
];

const Markets = ({ assets }) => {
  const [search, setSearch] = useState('');
  const isLoading = !assets || assets.length === 0;

  const filtered = assets?.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text">Markets</h2>
          <p className="text-muted text-sm mt-1">Live market data &amp; trends</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search coins..."
            className="w-full bg-black/20 border border-white/5 rounded-full py-2.5 pl-9 pr-4 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          />
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                  <span className="flex items-center gap-1">Coin <ArrowUpDown size={12} /></span>
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted uppercase tracking-wider">24h Change</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted uppercase tracking-wider hidden md:table-cell">Volume</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted uppercase tracking-wider hidden lg:table-cell">Mkt Cap</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted uppercase tracking-wider hidden sm:table-cell">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                : (filtered || []).map((asset, i) => (
                    <tr key={asset.id} className="group hover:bg-white/[0.04] transition-all duration-200 cursor-pointer">
                      <td className="px-6 py-4 text-muted text-sm">{i + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${coinColors[i % coinColors.length]} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                            {asset.symbol[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-text group-hover:text-primary transition-colors text-sm">{asset.name}</div>
                            <div className="text-xs text-muted">{asset.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-text tabular-nums text-sm">
                        ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          asset.change24h >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                        }`}>
                          {asset.change24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                          {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-muted text-sm hidden md:table-cell">${asset.volume}</td>
                      <td className="px-6 py-4 text-right text-muted text-sm hidden lg:table-cell">${asset.marketCap}</td>
                      <td className="px-6 py-4 text-right hidden sm:table-cell">
                        <div className="flex justify-end">
                          <TrendSparkline isUp={asset.change24h >= 0} />
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        {!isLoading && filtered?.length === 0 && (
          <div className="py-16 text-center text-muted">
            <Search size={32} className="mx-auto mb-3 opacity-30" />
            <p>No coins found for &quot;{search}&quot;</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {['Global Market Cap', '24h Volume', 'BTC Dominance', 'Active Coins'].map((label, i) => {
          const values = ['$2.4T', '$89B', '52.4%', '12,847'];
          return (
            <div key={label} className="glass rounded-xl p-4 hover:border-primary/20 transition-all duration-300">
              <div className="text-xs text-muted mb-1">{label}</div>
              <div className="text-lg font-bold text-text">{values[i]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Markets;
