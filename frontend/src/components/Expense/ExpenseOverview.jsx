import React, {useEffect, useState} from 'react'
import {LuPlus} from "react-icons/lu"
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({transactions, onAddExpense}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Prepare and set the data for the chart whenever transactions change
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
      <div className='card'>
        <div className='flex items-center justify-between'>
            <div>
                <h5 className='text-lg'>Gambaran Pengeluaran</h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                Pantau pengeluaran Anda dari waktu ke waktu dan dapatkan wawasan tentang ke mana uang Anda pergi.
                </p>
            </div>

            <button className='add-btn' onClick={onAddExpense}>
                <LuPlus className='text-lg' />
                Tambahkan Pengeluaran
            </button>
        </div>

        <div className='mt-10'>
            {/* Render the line chart with prepared data */}
            <CustomLineChart data={chartData} />
        </div>
      </div>
    );
}

export default ExpenseOverview;
