/* components/RecentIncomeWithChart.jsx */
import React, { useMemo, useEffect } from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../../components/Cards/TransactionInfoCard';

/**
 * Component to display a list of recent income transactions.
 *
 * Props:
 * - transactions: array of transactions with {_id, source, icon, date, amount}
 * - onSeeMore: callback for "See All" button
 * - emptyMessage: message to show when no transactions (default "No recent income transactions.")
 */
export default function RecentIncomeList({
  transactions = [],
  onSeeMore = () => {},
  emptyMessage = 'No recent income transactions.',
}) {
  // Debug logs to inspect incoming data
  useEffect(() => {
    console.log('RecentIncomeList - transactions prop:', transactions);
  }, [transactions]);

  // Sort by date descending, filter positive, take top 5
  const recentTransactions = useMemo(() => {
    return transactions
      .filter(txn => Number(txn.amount) > 0)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Pendapatan</h5>
        <button className="card-btn flex items-center" onClick={onSeeMore}>
          <span className="mr-1">Lihat Semua</span>
          <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {recentTransactions.length > 0 ? (
          recentTransactions.map(item => (
            <TransactionInfoCard
              key={item._id}
              title={item.source}
              icon={item.icon}
              date={moment(item.date).format('Do MMM YYYY')}
              amount={item.amount}
              type="income"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-center text-sm text-gray-500">
            {emptyMessage}
          </p>
        )}
      </div>
    </div>
  );
}
