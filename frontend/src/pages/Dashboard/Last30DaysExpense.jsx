import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList
} from 'recharts';

/**
 * CustomBarChart Component
 * Renders a responsive bar chart of recent expenses using Recharts.
 *
 * @param {Object[]} transactions - Array of transaction objects: { _id, category, icon, date, amount }
 */
export default function CustomBarChart({ transactions }) {
  // Prepare top 5 expenses sorted by date descending
  const chartData = useMemo(() => {
    if (!transactions) return [];
    return transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map(({ _id, category, date, amount }) => ({
        id: _id,
        name: category,
        value: amount,
        date: moment(date).format('Do MMM'),
      }));
  }, [transactions]);

  console.log('chartData:', chartData);

  return (
    <div className="card">
      <h5 className="text-lg">Pengeluaran 30 Hari Terakhir</h5>
      <div className="w-full h-80 p-4 bg-white rounded-2xl">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            {/* XAxis hanya dengan date, tanpa garis */}
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: '0.875rem' }}
            />
            {/* Sembunyikan YAxis */}
            {/* <YAxis axisLine={false} tickLine={false} tick={{ fontSize: '0.875rem' }} /> */}
            {/* Tooltip menampilkan amount dan nama kategori */}
            <Tooltip
  formatter={(value, _name, props) => {
    const category = props.payload.name;
    return [`Rp${value}`, category];
  }}
  labelFormatter={() => ''}
/>
            <Bar
              dataKey="value"
              fill="#22C55E"
              radius={[8, 8, 0, 0]}
              stroke="none"
            >
              <LabelList dataKey="value" position="top" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}