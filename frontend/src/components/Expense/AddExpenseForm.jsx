import React, {useState} from 'react'
import Input from '../inputs/input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({onAddExpense}) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => setExpense({...expense, [key]:value})
  return (
    <div>
      <EmojiPickerPopup
      icon={expense.icon}
      onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
      value={expense.category}
      onChange={({ target }) => handleChange("category", target.value)}
      label="Kategori"
      placeholder="Belanja, Cicilan Rumah, dll"
      type="text"
      />
    <Input
    value={expense.amount}
    onChange={({ target }) => handleChange("amount", target.value)}
    label="Jumlah"
    placeholder="masukkan total pengeluaran"
    type="number"
    />
      <Input
    value={expense.date}
    onChange={({ target }) => handleChange("date", target.value)}
    label="Tanggal"
    placeholder=""
    type="date"
    />
    <div className='flex justify-end mt-6'>
    <button
     type="button"
     className='add-btn add-btn-fill'
     onClick={() => onAddExpense(expense)}
     >
     Tambahkan
     </button>
    </div>

    </div>
  )
}

export default AddExpenseForm
