import React from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { category, amount } = payload[0].payload;
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-green-500 mb-1">{category}</p>
          <p className="text-sm text-gray-600">
            Jumlah: <span className="text-sm font-medium text-gray-900">Rp{amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#27AE50" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#27AE60" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="none" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#27AE60"
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: '#27AE50' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
