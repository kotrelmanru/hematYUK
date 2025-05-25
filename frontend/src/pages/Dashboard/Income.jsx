import React, {useState, useEffect} from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import IncomeOverview from '../../components/Income/IncomeOverview';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from "react-hot-toast";
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  //Get All Income Details
  const fetchIncomeDetails= async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Terjadi kesalahan, silakan coba kembali.", error)
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon} = income;

    //validation checks
    if (!source.trim()) {
      toast.error("Sumber pendapatan wajib diisi.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Jumlah harus berupa angka valid yang lebih besar dari 0")
      return;
    }

    if(!date) {
      toast.error("Tanggal wajib diisi");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      })

      setOpenAddIncomeModal(false);
      toast.success("Berhasil menambahkan pendapatan");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error menambahkan pendapatan:",
        error.response?.data?.message || error.message
      );
    }
  };

  //Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({show: false, data: null});
      toast.success("Detail pendapatan berhasil dihapus");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error menghapus pendapatan:",
        error.response?.data?.message || error.message
      )
    }
  };

  //handle download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error melakukan pengunduhan data pendapatan:", error);
      toast.error("Gagal melakukan pengunduhan data pendapatan, Silahkan coba kembali.")
    }
  };

  useEffect(() => {
    fetchIncomeDetails();

    return ( )=> {};
  }, []);
  return (
    <DashboardLayout activeMenu = "Income">
    <div className='my-5 mx-auto'>
      <div className='grid grid-cols-1 gap-6'>
        <div className=''>
          <IncomeOverview
          transactions={incomeData}
          onAddIncome={() => setOpenAddIncomeModal(true)}
          />
        </div>
        <IncomeList
          transactions={incomeData}
          onDelete={(id) => {
            setOpenDeleteAlert({ show:true, data:id});
          }}
          onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Tambahkan Pendapatan"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({show: false, data: null})}
        title="Hapus Pendapatan"
        >
          <DeleteAlert
          content="Apakah Anda yakin ingin menghapus detail pendapatan ini?"
          onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
    </div>
    </DashboardLayout>
  )
}

export default Income
