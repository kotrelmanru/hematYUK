import React, {useEffect, useState} from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from "../../hooks/useUserAuth" 
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import InfoCard from '../../components/Cards/InfoCard';
import { IoMdCard } from 'react-icons/io';
import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu';
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from './ExpenseTransactions';
import Last30DaysExpense from './Last30DaysExpense';
import RecentIncomePieChart from './RecentIncomeWithChart';
import RecentIncomeList from '../../components/Dashboard/RecentIncome';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong, Please try again.", error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu = "Dashboard">
    <div className='my-5 mx-auto'>
       <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <InfoCard
        icon={<IoMdCard />}
        label="Total Tabungan"
        value={`Rp${addThousandsSeparator(dashboardData?.totalBalance || 0)}`}
        color="bg-purple-500"
        />
        <InfoCard
        icon={<LuWalletMinimal />}
        label="Total Pendapatan"
        value={`Rp${addThousandsSeparator(dashboardData?.totalIncome || 0)}`}
        color="bg-green-500"
        />
        <InfoCard
        icon={<LuHandCoins />}
        label="Total Pengeluaran"
        value={`Rp${addThousandsSeparator(dashboardData?.totalExpense || 0)}`}
        color="bg-red-500"
        />
        </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onSeeMore={() => navigate("/dashboard")} />

          <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0} />

      <ExpenseTransactions
      transactions = {dashboardData?.last30DaysExpense?.transactions || []}
      onSeeMore = {() => navigate("/expense")}
      />

      <Last30DaysExpense
      transactions = {dashboardData?.last30DaysExpense?.transactions || []}
      /> 

      <RecentIncomePieChart
      transactions={dashboardData?.last60DaysIncome?.transactions || []}
      totalIncome={dashboardData?.totalIncome || 0}
      />

      <RecentIncomeList
      transactions={dashboardData?.last60DaysIncome?.transactions || []}
      onSeeMore={() => navigate("/income")}
      />
      </div>
      </div>
    </DashboardLayout> 
  )
}

export default Home
