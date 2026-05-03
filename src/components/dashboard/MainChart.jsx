import React, { useState } from 'react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import { CHART_DATA } from '../../data/mockData';

const MainChart = () => {
  const [timeframe, setTimeframe] = useState('1M');
  const [chartType, setChartType] = useState('Area');
  
  const data = CHART_DATA[timeframe];
  const timeframes = ['1D', '1W', '1M', '1Y'];
  const chartTypes = ['Area', 'Line', 'Bar', 'Candle'];

  // Trend detection for Recharts colors
  const isTrendUp = data.length > 0 && data[data.length - 1].value >= data[0].value;
  const strokeColor = isTrendUp ? '#10B981' : '#EF4444'; 
  const fillColor = isTrendUp ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';

  // AnyChart configuration for Candlestick
  let anyChartInstance = null;
  if (chartType === 'Candle') {
    const candleData = data.map(item => [item.time, item.open, item.high, item.low, item.close]);
    anyChartInstance = anychart.candlestick();
    anyChartInstance.data(candleData);
    
    // Dark mode styling
    anyChartInstance.background().fill("transparent");
    anyChartInstance.xAxis().labels().fontColor("#94A3B8");
    anyChartInstance.yAxis().labels().fontColor("#94A3B8");
    anyChartInstance.xAxis().stroke("rgba(255,255,255,0.1)");
    anyChartInstance.yAxis().stroke("rgba(255,255,255,0.1)");
    
    // Candle colors
    const series = anyChartInstance.getSeries(0);
    series.fallingFill("#EF4444", 1);
    series.fallingStroke("#EF4444", 1);
    series.risingFill("#10B981", 1);
    series.risingStroke("#10B981", 1);
  }

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
          <h3 className="text-xl font-bold">Bitcoin (BTC)</h3>
          <p className="text-muted text-sm">Price Chart</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Chart Type Toggle */}
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

          {/* Timeframe Filters */}
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
              <Area type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" animationDuration={1000} />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {chartType === 'Line' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={rechartsMargin}>
              {RechartsGrid}{RechartsXAxis}{RechartsYAxis}{RechartsTooltip}
              <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={3} dot={false} animationDuration={1000} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartType === 'Bar' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={rechartsMargin}>
              {RechartsGrid}{RechartsXAxis}{RechartsYAxis}{RechartsTooltip}
              <Bar dataKey="value" fill={strokeColor} radius={[4, 4, 0, 0]} animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === 'Candle' && anyChartInstance && (
          <div className="w-full h-full" style={{ minHeight: '350px' }}>
            <AnyChart instance={anyChartInstance} width="100%" height="100%" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainChart;
