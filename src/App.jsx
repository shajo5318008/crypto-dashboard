import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import MainChart from './components/dashboard/MainChart';
import Portfolio from './components/pages/Portfolio';
import Markets from './components/pages/Markets';
import Transactions from './components/pages/Transactions';
import News from './components/pages/News';
import Settings from './components/pages/Settings';
import Login from './components/pages/Login';
import { useSimulatedData } from './hooks/useSimulatedData';
import { RECENT_TRANSACTIONS, NEWS_HIGHLIGHTS } from './data/mockData';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

// ─── Dashboard sub-components ────────────────────────────────────────────────

const PortfolioSummary = ({ portfolio }) => (
  <div className="glass p-6 rounded-2xl group hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
    <h2 className="text-muted text-sm font-medium mb-1">Total Balance</h2>
    <div className="text-3xl font-bold text-text tracking-tight">
      ${portfolio.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </div>
    <div className={`text-sm mt-2 flex items-center gap-1 font-medium ${portfolio.profit24h >= 0 ? 'text-success' : 'text-danger'}`}>
      {portfolio.profit24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
      {portfolio.profit24h >= 0 ? '+' : ''}{portfolio.profitPercentage}%
      <span className="text-muted font-normal ml-1">24h</span>
    </div>
    <div className="mt-4 h-px bg-white/5" />
    <div className="mt-4 grid grid-cols-2 gap-3">
      {portfolio.allocation?.slice(0, 2).map((item, i) => (
        <div key={item.name} className="rounded-xl bg-black/20 px-3 py-2">
          <div className="text-xs text-muted">{item.name}</div>
          <div className="text-sm font-bold text-text mt-0.5">{item.value}%</div>
        </div>
      ))}
    </div>
  </div>
);

const AssetsList = ({ assets, selectedAsset, onSelectAsset }) => (
  <div className="glass p-6 rounded-2xl col-span-1 md:col-span-2">
    <h3 className="text-lg font-bold mb-4">Your Assets</h3>
    <div className="space-y-2">
      {assets.map((asset, i) => {
        const colors = ['from-amber-500 to-yellow-400','from-blue-500 to-indigo-400','from-purple-500 to-violet-400','from-teal-500 to-emerald-400','from-pink-500 to-rose-400'];
        const isSelected = selectedAsset?.id === asset.id;
        return (
          <div 
            key={asset.id} 
            onClick={() => onSelectAsset(asset)}
            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 cursor-pointer group ${
              isSelected 
                ? 'bg-white/10 border border-primary/50' 
                : 'bg-black/20 hover:bg-black/40 border border-transparent'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center font-bold text-white text-sm`}>
                {asset.symbol[0]}
              </div>
              <div>
                <div className="font-semibold text-sm group-hover:text-primary transition-colors">{asset.name}</div>
                <div className="text-xs text-muted">{asset.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-sm tabular-nums">
                ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`text-xs font-medium ${asset.change24h >= 0 ? 'text-success' : 'text-danger'}`}>
                {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const RecentTransactions = ({ transactions }) => (
  <div className="glass p-6 rounded-2xl h-full">
    <h3 className="text-base font-bold mb-4">Recent Transactions</h3>
    <div className="space-y-3">
      {transactions.map(tx => (
        <div key={tx.id} className="flex items-center gap-3 p-3 rounded-xl bg-black/20 hover:bg-black/40 transition-colors cursor-pointer group">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'Buy' ? 'bg-success/10' : 'bg-danger/10'}`}>
            {tx.type === 'Buy'
              ? <ArrowDownLeft size={15} className="text-success" />
              : <ArrowUpRight size={15} className="text-danger" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-text group-hover:text-primary transition-colors">{tx.asset}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${tx.type === 'Buy' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                {tx.type}
              </span>
            </div>
            <div className="text-xs text-muted truncate">
              {tx.amount} {tx.asset} @ ${tx.price.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted text-xs shrink-0">
            <Clock size={10} />
            {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const NewsHighlights = ({ news }) => (
  <div className="glass p-6 rounded-2xl h-full">
    <h3 className="text-base font-bold mb-4">News Highlights</h3>
    <div className="space-y-3">
      {news.map(item => (
        <div key={item.id} className="p-3 rounded-xl bg-black/20 hover:bg-black/40 transition-all duration-200 cursor-pointer group hover:scale-[1.01]">
          <div className="font-semibold text-sm text-text group-hover:text-primary transition-colors leading-snug mb-1">
            {item.title}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">{item.source}</span>
            <span className="text-xs text-muted">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Mobile bottom nav ────────────────────────────────────────────────────────

const mobileNavItems = [
  { id: 'dashboard',    label: 'Home' },
  { id: 'portfolio',    label: 'Portfolio' },
  { id: 'markets',      label: 'Markets' },
  { id: 'transactions', label: 'Trades' },
  { id: 'news',         label: 'News' },
  { id: 'settings',     label: 'Settings' },
];

// ─── Page title map ───────────────────────────────────────────────────────────

const PAGE_TITLES = {
  dashboard:    'Dashboard',
  portfolio:    'Portfolio',
  markets:      'Markets',
  transactions: 'Transactions',
  news:         'News',
  settings:     'Settings',
};

import { Toaster } from 'react-hot-toast';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [user, setUser]             = useState(null);
  const { assets, portfolio }       = useSimulatedData();
  const [selectedAssetId, setSelectedAssetId] = useState('bitcoin');

  const selectedAsset = assets.find(a => a.id === selectedAssetId) || assets[0];

  // ── Restore all persisted state on mount ─────────────────────────────────
  useEffect(() => {
    // User session
    try {
      const saved = localStorage.getItem('user');
      if (saved) setUser(JSON.parse(saved));
    } catch {
      localStorage.removeItem('user');
    }

    // Dark mode
    try {
      const darkPref = localStorage.getItem('theme_dark');
      const isDark = darkPref === null ? true : JSON.parse(darkPref);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch { /* ignore */ }
  }, []);

  // ── Auth handlers ─────────────────────────────────────────────────────────
  const handleLogin = (userData) => {
    setUser(userData);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setActivePage('dashboard');
  };

  // ── Guard: show Login if not authenticated ────────────────────────────────
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }


  const renderPage = () => {
    switch (activePage) {
      case 'portfolio':
        return <Portfolio assets={assets} portfolio={portfolio} />;
      case 'markets':
        return <Markets assets={assets} />;
      case 'transactions':
        return <Transactions />;
      case 'news':
        return <News />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="space-y-6">
            {/* Top row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PortfolioSummary portfolio={portfolio} />
              <div className="lg:col-span-2">
                <MainChart selectedAsset={selectedAsset} />
              </div>
            </div>
            {/* Bottom row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AssetsList 
                assets={assets} 
                selectedAsset={selectedAsset} 
                onSelectAsset={(asset) => setSelectedAssetId(asset.id)} 
              />
              <div className="space-y-6">
                <RecentTransactions transactions={RECENT_TRANSACTIONS} />
                <NewsHighlights news={NEWS_HIGHLIGHTS} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }} 
      />
      
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Topbar pageTitle={PAGE_TITLES[activePage]} user={user} onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-surface/90 backdrop-blur-xl border-t border-white/10 flex z-50">
        {mobileNavItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
              activePage === item.id ? 'text-primary' : 'text-muted'
            }`}
          >
            {activePage === item.id && (
              <span className="w-1 h-1 rounded-full bg-primary mb-0.5" />
            )}
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
