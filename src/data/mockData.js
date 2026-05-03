// Mock Data for Crypto Dashboard

export const INITIAL_ASSETS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 64230.50, change24h: 2.5, volume: '32B', marketCap: '1.2T' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3450.20, change24h: 1.2, volume: '15B', marketCap: '400B' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', price: 145.80, change24h: -0.5, volume: '4B', marketCap: '65B' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 0.45, change24h: 5.1, volume: '500M', marketCap: '16B' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', price: 7.20, change24h: -1.2, volume: '200M', marketCap: '10B' }
];

export const PORTFOLIO_DATA = {
  totalBalance: 12450.75,
  profit24h: 345.50,
  profitPercentage: 2.8,
  allocation: [
    { name: 'BTC', value: 45 },
    { name: 'ETH', value: 30 },
    { name: 'SOL', value: 15 },
    { name: 'Others', value: 10 }
  ]
};

// Generate historical mock data for charts
const generateChartData = (points = 100, startPrice = 60000, volatility = 500) => {
  let data = [];
  let currentPrice = startPrice;
  let date = new Date();
  date.setDate(date.getDate() - points);

  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * volatility;
    currentPrice += change;
    
    // Candlestick mock data
    const open = currentPrice - (Math.random() * volatility * 0.5);
    const close = currentPrice + (Math.random() * volatility * 0.5);
    const high = Math.max(open, close) + (Math.random() * volatility * 0.2);
    const low = Math.min(open, close) - (Math.random() * volatility * 0.2);

    data.push({
      time: date.toISOString().split('T')[0],
      value: Number(currentPrice.toFixed(2)),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2))
    });
    date.setDate(date.getDate() + 1);
  }
  return data;
};

export const CHART_DATA = {
  '1D': generateChartData(24, 64000, 200), // Hourly for 1 day
  '1W': generateChartData(7, 63000, 1000), // Daily for 1 week
  '1M': generateChartData(30, 58000, 1500), // Daily for 1 month
  '1Y': generateChartData(12, 40000, 5000), // Monthly for 1 year
};

export const RECENT_TRANSACTIONS = [
  { id: 1, type: 'Buy', asset: 'BTC', amount: 0.05, price: 64100, date: '2024-05-02T14:30:00Z', status: 'Completed' },
  { id: 2, type: 'Sell', asset: 'ETH', amount: 2.5, price: 3400, date: '2024-05-01T09:15:00Z', status: 'Completed' },
  { id: 3, type: 'Buy', asset: 'SOL', amount: 50, price: 140, date: '2024-04-28T16:45:00Z', status: 'Completed' }
];

export const NEWS_HIGHLIGHTS = [
  { id: 1, title: 'Bitcoin ETFs see record inflows', source: 'CryptoNews', time: '2h ago' },
  { id: 2, title: 'Ethereum network upgrade successfully deployed', source: 'CoinDesk', time: '5h ago' },
  { id: 3, title: 'Solana hits new all-time high active addresses', source: 'Decrypt', time: '12h ago' }
];
