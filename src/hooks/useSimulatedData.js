import { useState, useEffect } from 'react';
import { INITIAL_ASSETS, PORTFOLIO_DATA, CHART_DATA } from '../data/mockData';

export const useSimulatedData = () => {
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [portfolio, setPortfolio] = useState(PORTFOLIO_DATA);
  const [chartData, setChartData] = useState(CHART_DATA);
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setAssets(prevAssets => {
        return prevAssets.map(asset => {
          // Random price movement between -0.2% and +0.2%
          const changeFactor = 1 + (Math.random() * 0.004 - 0.002);
          const newPrice = Number((asset.price * changeFactor).toFixed(2));
          const priceDiff = newPrice - asset.price;
          const newChange24h = Number((asset.change24h + (priceDiff / asset.price) * 100).toFixed(2));
          
          return {
            ...asset,
            price: newPrice,
            change24h: newChange24h,
            isUp: priceDiff >= 0, // Flag for UI animation
            lastPrice: asset.price
          };
        });
      });

      // Simulate portfolio updates slightly
      setPortfolio(prev => {
        const changeFactor = 1 + (Math.random() * 0.001 - 0.0005);
        const newBalance = Number((prev.totalBalance * changeFactor).toFixed(2));
        return {
          ...prev,
          totalBalance: newBalance,
          profit24h: Number((prev.profit24h + (newBalance - prev.totalBalance)).toFixed(2))
        };
      });

    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isSimulating]);

  return { assets, portfolio, chartData, isSimulating, setIsSimulating };
};
