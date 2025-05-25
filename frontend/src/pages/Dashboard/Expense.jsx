import React, {useState, useEffect} from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import Modal from '../../components/Modal'
import toast from "react-hot-toast";
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert'

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    //Get All Expense Details
    const fetchExpenseDetails= async () => {
      if (loading) return;
  
      setLoading(true);
  
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
        );
  
        if (response.data) {
          setExpenseData(response.data);
        }
      } catch (error) {
        console.log("Terjadi kesalahan, silakan coba kembali.", error)
      } finally {
        setLoading(false);
      }
    };
  
    //Handle Add Expense
    const handleAddExpense = async (expense) => {
      const { category, amount, date, icon} = expense;
  
      //validation checks
      if (!category.trim()) {
        toast.error("Kategori wajib diisi.");
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
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
          category,
          amount,
          date,
          icon,
        })
  
        setOpenAddExpenseModal(false);
        toast.success("Berhasil menambahkan pengeluaran");
        fetchExpenseDetails();
      } catch (error) {
        console.error(
          "Error menambahkan pengeluaran:",
          error.response?.data?.message || error.message
        );
      }
    };

  //Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({show: false, data: null});
      toast.success("Detail pengeluaran berhasil dihapus");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error menghapus pengeluaran:",
        error.response?.data?.message || error.message
      )
    }
  };

  //handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error melakukan pengunduhan data pengeluaran:", error);
      toast.error("Gagal melakukan pengunduhan data pengeluaran, Silahkan coba kembali.")
    }
  };

    useEffect(() => {
      fetchExpenseDetails();
  
      return ( )=> {};
    }, []);
  return (
    <DashboardLayout activeMenu="Expense">
    <div className='my-5 mx-auto'>
      <div className='grid grid-cols-1 gap-6'>
        <div className=''>
          <ExpenseOverview
          transactions={expenseData}
          onAddExpense={() => setOpenAddExpenseModal(true)}
          />
        </div>

        <ExpenseList
        transactions={expenseData}
        onDelete={(id)=> {
          setOpenDeleteAlert({ show: true, data:id})
        }}
        onDownload={handleDownloadExpenseDetails}
        />
      </div>

      <Modal
      isOpen={openAddExpenseModal}
      onClose={() => setOpenAddExpenseModal(false)}
      title="Tambahkan Pengeluaran"
      >
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>
      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({show: false, data: null})}
        title="Hapus Pengeluaran"
        >
          <DeleteAlert
          content="Apakah Anda yakin ingin menghapus detail pengeluaran ini?"
          onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
    </div>
    </DashboardLayout>
  )
}

export default Expense
