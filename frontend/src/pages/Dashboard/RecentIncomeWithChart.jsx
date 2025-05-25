/* components/RecentIncomePieChart.jsx */
import React, { useMemo, useEffect } from 'react';
import CustomPieChart from '../../components/Charts/CustomPieChart';

const COLORS = ["#27AE60", "#FA2C37", "#FF6900", "#4F39F6", "#2D9CDB"];

/**
 * Component to display a pie chart of income breakdown over a specified period.
 *
 * Props:
 * - transactions: array of transactions with {_id, source, icon, date, amount}
 * - days: number of days to include in chart (default 60)
 * - chartEmptyMessage: message when no chart data (default "No income data found for the selected period.")
 */
export default function   RecentIncomePieChart({
  transactions = [],
  days = 60,
  chartEmptyMessage = 'No income data found for the selected period.',
}) {
  // Debug logs to inspect incoming data
  useEffect(() => {
    console.log('RecentIncomePieChart - transactions prop:', transactions);
  }, [transactions]);

  // Aggregate income data for chart within last "days"
  const { chartData, totalIncome } = useMemo(() => {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const map = {};
    let total = 0;

    transactions.forEach(txn => {
      const amt = Number(txn.amount) || 0;
      const ts = new Date(txn.date).getTime();
      if (amt > 0 && ts >= cutoff) {
        const src = txn.source || 'Unknown';
        map[src] = (map[src] || 0) + amt;
        total += amt;
      }
    });

    const aggregated = Object.entries(map).map(([name, amount]) => ({ name, amount }));
    const data = aggregated.length > 0
      ? aggregated
      : total > 0
      ? [{ name: 'Total Pendapatan', amount: total }]
      : [];

    console.log('RecentIncomePieChart - chartData:', data);
    return { chartData: data, totalIncome: total };
  }, [transactions, days]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-1">
        <h5 className="text-lg">Pendapatan {days} Hari Terakhir</h5>
      </div>
      {chartData.length > 0 ? (
        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={`Rp${totalIncome}`}
          colors={COLORS}
          showTextAnchor
        />
      ) : (
        <p className="text-center p-4">
          {chartEmptyMessage}
        </p>
      )}
    </div>
  );
}
