import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_DATA } from '../../data/mockData';

const MainChart = () => {
  const [timeframe, setTimeframe] = useState('1M');
  const data = CHART_DATA[timeframe];

  // Determine if the trend is up or down to change the chart color
  const isTrendUp = data.length > 0 && data[data.length - 1].value >= data[0].value;
  const strokeColor = isTrendUp ? '#10B981' : '#EF4444'; // success or danger
  const fillColor = isTrendUp ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';

  const timeframes = ['1D', '1W', '1M', '1Y'];

  return (
    <div className="glass p-6 rounded-2xl w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">Bitcoin (BTC)</h3>
          <p className="text-muted text-sm">Price Chart</p>
        </div>
        
        {/* Timeframe Filters */}
        <div className="flex space-x-2 bg-black/20 p-1 rounded-lg">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
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

      <div className="flex-1 min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#F8FAFC' }}
              labelStyle={{ color: '#94A3B8', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={strokeColor} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainChart;
