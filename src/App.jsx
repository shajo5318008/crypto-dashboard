import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import { useSimulatedData } from './hooks/useSimulatedData';
import MainChart from './components/dashboard/MainChart';

// Placeholder components - Devs will replace these
const PortfolioSummary = ({ portfolio }) => (
  <div className="glass p-6 rounded-2xl">
    <h2 className="text-muted text-sm font-medium mb-1">Total Balance</h2>
    <div className="text-3xl font-bold text-text">${portfolio.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
    <div className={`text-sm mt-2 flex items-center ${portfolio.profit24h >= 0 ? 'text-success' : 'text-danger'}`}>
      {portfolio.profit24h >= 0 ? '+' : ''}{portfolio.profitPercentage}% (${Math.abs(portfolio.profit24h).toLocaleString()}) 24h
    </div>
  </div>
);

const AssetsList = ({ assets }) => (
  <div className="glass p-6 rounded-2xl col-span-1 md:col-span-2">
    <h3 className="text-lg font-bold mb-4">Your Assets</h3>
    <div className="space-y-4">
      {assets.map(asset => (
        <div key={asset.id} className="flex items-center justify-between p-4 rounded-xl bg-black/20 hover:bg-black/40 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
              {asset.symbol[0]}
            </div>
            <div>
              <div className="font-bold">{asset.name}</div>
              <div className="text-sm text-muted">{asset.symbol}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold">${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className={`text-sm ${asset.change24h >= 0 ? 'text-success' : 'text-danger'} transition-colors duration-500`}>
              {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

function App() {
  const { assets, portfolio } = useSimulatedData();

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Top Grid: Portfolio & Main Chart Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PortfolioSummary portfolio={portfolio} />
              
              <div className="lg:col-span-2">
                <MainChart />
              </div>
            </div>

            {/* Bottom Grid: Assets & Side Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AssetsList assets={assets} />
              
              <div className="space-y-6">
                <div className="glass p-6 rounded-2xl min-h-[200px] flex items-center justify-center">
                  <p className="text-muted">Dev B: Recent Transactions</p>
                </div>
                <div className="glass p-6 rounded-2xl min-h-[200px] flex items-center justify-center">
                  <p className="text-muted">Dev B: News Highlights</p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
