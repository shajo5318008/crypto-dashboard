import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import anychart from 'anychart';
import { CHART_DATA } from '../../data/mockData';

const AnyChartCandlestick = ({ data }) => {
  const chartContainer = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartContainer.current) return;
    
    // Transform data for AnyChart Candlestick
    const candleData = data.map(item => [item.time, item.open, item.high, item.low, item.close]);
    
    if (!chartRef.current) {
      // Create chart instance only once
      const chart = anychart.candlestick();
      chartRef.current = chart;
      
      chart.background().fill("transparent");
      chart.xAxis().labels().fontColor("#94A3B8");
      chart.yAxis().labels().fontColor("#94A3B8");
      chart.xAxis().stroke("rgba(255,255,255,0.1)");
      chart.yAxis().stroke("rgba(255,255,255,0.1)");
      
      const series = chart.getSeries(0);
      series.fallingFill("#EF4444", 1);
      series.fallingStroke("#EF4444", 1);
      series.risingFill("#10B981", 1);
      series.risingStroke("#10B981", 1);

      chart.container(chartContainer.current);
      chart.draw();
    }
    
    // Update data without destroying chart
    chartRef.current.data(candleData);

    return () => {
      // We don't dispose on every data change, only on unmount
    };
  }, [data]);

  // Clean up exactly once on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
      }
    };
  }, []);

  return <div ref={chartContainer} style={{ width: '100%', height: '100%', minHeight: '350px' }} />;
};

const MainChart = ({ selectedAsset }) => {
  const [timeframe, setTimeframe] = useState('1M');
  const [chartType, setChartType] = useState('Area');
  
  // Local state to hold the live-animating data
  const [data, setData] = useState([]);

  const timeframes = ['1D', '1W', '1M', '1Y'];
  const chartTypes = ['Area', 'Line', 'Bar', 'Candle'];

  // 1. Reset data when timeframe or selected asset changes
  useEffect(() => {
    if (selectedAsset && CHART_DATA[selectedAsset.id]) {
      setData([...CHART_DATA[selectedAsset.id][timeframe]]);
    }
  }, [selectedAsset?.id, timeframe]);

  // 2. Listen to live price changes on the selected asset and animate!
  useEffect(() => {
    if (!selectedAsset) return;

    setData(prevData => {
      if (prevData.length === 0) return prevData;

      // We only append if the price actually changed to avoid unnecessary renders
      const currentPrice = selectedAsset.price;
      const lastPoint = prevData[prevData.length - 1];
      
      if (lastPoint.value === currentPrice) return prevData;

      const newData = [...prevData];
      
      // Create a new "live" data point
      const now = new Date();
      const timeStr = timeframe === '1D' 
        ? now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        : now.toISOString().split('T')[0];

      // Shift data (remove oldest, add newest)
      newData.shift();
      newData.push({
        time: timeStr,
        value: currentPrice,
        open: lastPoint.close,
        high: Math.max(lastPoint.close, currentPrice) + (currentPrice * 0.001),
        low: Math.min(lastPoint.close, currentPrice) - (currentPrice * 0.001),
        close: currentPrice
      });

      return newData;
    });
  }, [selectedAsset?.price, timeframe]);

  if (!selectedAsset) return null;

  // Trend detection for Recharts colors
  const isTrendUp = data.length > 0 && data[data.length - 1].value >= data[0].value;
  const strokeColor = isTrendUp ? '#10B981' : '#EF4444'; 
  const fillColor = isTrendUp ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';

  // Common Recharts props
  const rechartsMargin = { top: 10, right: 0, left: 0, bottom: 0 };
  const RechartsXAxis = <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />;
  const RechartsYAxis = <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={(value) => `$${value.toLocaleString()}`} dx={-10} />;
  const RechartsTooltip = <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} itemStyle={{ color: '#F8FAFC' }} labelStyle={{ color: '#94A3B8', marginBottom: '4px' }} />;
  const RechartsGrid = <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />;

  return (
    <div className="glass p-6 rounded-2xl w-full h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold">{selectedAsset.name} ({selectedAsset.symbol})</h3>
          <p className="text-muted text-sm">Live Price Chart</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex space-x-1 bg-black/20 p-1 rounded-lg">
            {chartTypes.map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  chartType === type 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-muted hover:text-text hover:bg-white/5'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex space-x-1 bg-black/20 p-1 rounded-lg">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  timeframe === tf 
                    ? 'bg-surface text-text shadow-sm' 
                    : 'text-muted hover:text-text hover:bg-white/5'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[350px] w-full">
        {chartType === 'Area' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={rechartsMargin}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              {RechartsGrid}{RechartsXAxis}{RechartsYAxis}{RechartsTooltip}
              <Area type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" animationDuration={300} />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {chartType === 'Line' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={rechartsMargin}>
              {RechartsGrid}{RechartsXAxis}{RechartsYAxis}{RechartsTooltip}
              <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={3} dot={false} animationDuration={300} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartType === 'Bar' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={rechartsMargin}>
              {RechartsGrid}{RechartsXAxis}{RechartsYAxis}{RechartsTooltip}
              <Bar dataKey="value" fill={strokeColor} radius={[4, 4, 0, 0]} animationDuration={300} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === 'Candle' && (
          <AnyChartCandlestick data={data} />
        )}
      </div>
    </div>
  );
};

export default MainChart;
