import React, { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, Filter, Clock } from 'lucide-react';
import { RECENT_TRANSACTIONS } from '../../data/mockData';

const ALL_TRANSACTIONS = [
  ...RECENT_TRANSACTIONS,
  { id: 4, type: 'Buy',  asset: 'ADA',  amount: 1000,  price: 0.43,   date: '2024-04-25T11:00:00Z', status: 'Completed' },
  { id: 5, type: 'Sell', asset: 'DOT',  amount: 50,    price: 7.10,   date: '2024-04-22T08:30:00Z', status: 'Completed' },
  { id: 6, type: 'Buy',  asset: 'BTC',  amount: 0.02,  price: 63000,  date: '2024-04-20T17:00:00Z', status: 'Completed' },
  { id: 7, type: 'Sell', asset: 'SOL',  amount: 20,    price: 148,    date: '2024-04-18T13:45:00Z', status: 'Completed' },
];

const coinColors = {
  BTC: 'from-amber-500 to-yellow-400',
  ETH: 'from-blue-500 to-indigo-400',
  SOL: 'from-purple-500 to-violet-400',
  ADA: 'from-teal-500 to-emerald-400',
  DOT: 'from-pink-500 to-rose-400',
};

const SkeletonRow = () => (
  <div className="flex items-center gap-4 px-6 py-4 animate-pulse">
    <div className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-32 bg-white/10 rounded" />
      <div className="h-3 w-20 bg-white/10 rounded" />
    </div>
    <div className="h-4 w-20 bg-white/10 rounded" />
    <div className="h-4 w-24 bg-white/10 rounded hidden sm:block" />
    <div className="h-6 w-14 bg-white/10 rounded-full" />
  </div>
);

const Transactions = () => {
  const [filter, setFilter] = useState('All');
  const [isLoading] = useState(false);

  const filtered = filter === 'All'
    ? ALL_TRANSACTIONS
    : ALL_TRANSACTIONS.filter(t => t.type === filter);

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const totalBuys  = ALL_TRANSACTIONS.filter(t => t.type === 'Buy').length;
  const totalSells = ALL_TRANSACTIONS.filter(t => t.type === 'Sell').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text">Transactions</h2>
          <p className="text-muted text-sm mt-1">Your complete trading history</p>
        </div>
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 bg-black/20 border border-white/5 rounded-xl p-1">
          {['All', 'Buy', 'Sell'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === tab
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-muted hover:text-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 hover:border-white/10 transition-all duration-300">
          <div className="text-xs text-muted mb-1">Total Transactions</div>
          <div className="text-2xl font-bold text-text">{ALL_TRANSACTIONS.length}</div>
        </div>
        <div className="glass rounded-xl p-4 hover:border-success/20 transition-all duration-300">
          <div className="text-xs text-muted mb-1">Buy Orders</div>
          <div className="text-2xl font-bold text-success">{totalBuys}</div>
        </div>
        <div className="glass rounded-xl p-4 hover:border-danger/20 transition-all duration-300">
          <div className="text-xs text-muted mb-1">Sell Orders</div>
          <div className="text-2xl font-bold text-danger">{totalSells}</div>
        </div>
      </div>

      {/* Transactions list */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <Filter size={16} className="text-muted" />
          <span className="text-sm font-semibold text-text">
            {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Table header */}
        <div className="hidden sm:grid grid-cols-5 px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider border-b border-white/5">
          <span className="col-span-2">Asset</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Price</span>
          <span className="text-right">Time</span>
        </div>

        <div className="divide-y divide-white/5">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            : filtered.map(tx => (
                <div
                  key={tx.id}
                  className="group grid grid-cols-1 sm:grid-cols-5 items-center gap-2 sm:gap-0 px-6 py-4 hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
                >
                  {/* Asset + Badge */}
                  <div className="col-span-2 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${coinColors[tx.asset] || 'from-gray-500 to-gray-400'} flex items-center justify-center shrink-0`}>
                      {tx.type === 'Buy'
                        ? <ArrowDownLeft size={18} className="text-white" />
                        : <ArrowUpRight size={18} className="text-white" />
                      }
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-text group-hover:text-primary transition-colors">{tx.asset}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          tx.type === 'Buy'
                            ? 'bg-success/10 text-success border border-success/20'
                            : 'bg-danger/10 text-danger border border-danger/20'
                        }`}>
                          {tx.type}
                        </span>
                      </div>
                      <div className="text-xs text-muted">{tx.status}</div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right font-semibold text-text tabular-nums text-sm">
                    {tx.amount.toLocaleString()} {tx.asset}
                  </div>

                  {/* Price */}
                  <div className="text-right text-muted text-sm tabular-nums">
                    ${tx.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>

                  {/* Date */}
                  <div className="flex items-center justify-end gap-1 text-muted text-xs">
                    <Clock size={12} />
                    {formatDate(tx.date)}
                  </div>
                </div>
              ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted">
            <Filter size={32} className="mx-auto mb-3 opacity-30" />
            <p>No {filter} transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
