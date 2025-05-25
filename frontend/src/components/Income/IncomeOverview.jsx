import React, { useMemo } from 'react';
import moment from 'moment';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  LabelList,
} from 'recharts';
import { LuPlus } from 'react-icons/lu'; // Pastikan ini diimpor

export default function CustomIncomeBarChart({ transactions = [], onAddIncome }) {
  const chartData = useMemo(
    () =>
      transactions.map((item) => ({
        ...item,
        date: item.date,
        source: item.source ?? 'Unknown', // memastikan 'source' tersedia di tooltip
      })),
    [transactions]
  );

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-lg font-semibold">Gambaran Pendapatan</h5>
          <p className="text-xs text-gray-400 mt-0.5">
          Pantau penghasilan Anda dari waktu ke waktu dan analisis tren pendapatan Anda.
          </p>
        </div>
        <button
          className="add-btn flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg"
          onClick={onAddIncome}
        >
          <LuPlus className="text-lg" />
          Tambahkan Pendapatan
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-80 p-4 bg-white rounded-2xl">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: '0.875rem' }}
              tickFormatter={(isoDate) =>
                moment(isoDate).format('Do MMM').toLowerCase()
              }
            />
            <Tooltip
              formatter={(value, name, props) => [`Rp${value}`, props.payload.source]}
              labelFormatter={() => ''}
            />
            <Bar
              dataKey="amount"
              fill="#27AE50"
              radius={[8, 8, 0, 0]}
              stroke="none"
            >
              <LabelList dataKey="amount" position="top" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
