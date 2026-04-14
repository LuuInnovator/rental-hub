import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import BillTable from '../components/BillTable';
import AddBillForm from '../components/AddBillForm';

const Dashboard = ({ searchTerm }) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);

  const API_URL = "https://sheetdb.io/api/v1/pz1au9f5wo0ba";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const formattedData = data.map(item => ({
        ...item,
        amount: Number(item.amount) || 0
      }));
      setBills(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAddModal = () => {
    setEditingBill(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (bill) => {
    setEditingBill(bill);
    setIsModalOpen(true);
  };

  const handleSaveBill = async (billData) => {
    try {
      if (editingBill) {
        await fetch(`${API_URL}/id/${billData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: billData })
        });
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [billData] })
        });
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert("Lỗi kết nối máy chủ!");
    }
  };

  const handleDeleteBill = async (id) => {
    if (window.confirm("Xóa hóa đơn này?")) {
      try {
        await fetch(`${API_URL}/id/${id}`, { method: 'DELETE' });
        fetchData();
      } catch (error) {
        alert("Lỗi khi xóa!");
      }
    }
  };

  // Tính toán thống kê
  const totalRevenue = bills
    .filter(b => b.status === "Đã thanh toán")
    .reduce((sum, b) => sum + b.amount, 0);

  const completionRate = bills.length > 0 
    ? Math.round((bills.filter(b => b.status === "Đã thanh toán").length / bills.length) * 100)
    : 0;

  const stats = [
    { id: 1, title: "Doanh Thu", value: totalRevenue.toLocaleString() + "đ", change: `+${completionRate}%`, icon: "💰" },
    { id: 2, title: "Hóa Đơn", value: bills.length.toString(), change: "Tổng số", icon: "📄" },
    { id: 3, title: "Khách", value: [...new Set(bills.map(b => b.customer))].length.toString(), change: "Thực tế", icon: "👤" },
    { id: 4, title: "Quá Hạn", value: bills.filter(b => b.status === "Quá hạn").length.toString(), change: "Cần chú ý", icon: "⚠️" },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 space-y-4">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-black text-blue-600 animate-pulse text-[10px] tracking-widest">ĐANG TẢI...</p>
    </div>
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
      
      {/* Header Section: Chuyển sang cột trên mobile, hàng trên desktop */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter italic">DASHBOARD</h2>
          <p className="text-slate-400 font-bold mt-1 uppercase text-[9px] tracking-[0.2em]">Hệ thống quản lý trực tuyến</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-4 rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
          HÓA ĐƠN MỚI
        </button>
      </div>

      {/* Stats Grid: 2 cột trên mobile, 4 cột trên desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map(s => <StatCard key={s.id} {...s} />)}
      </div>

      {/* Table Section: Bọc overflow để vuốt ngang trên mobile */}
      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
        <div className="overflow-x-auto overflow-y-hidden">
          <BillTable 
            bills={bills.filter(b => 
              b.customer?.toLowerCase().includes(searchTerm?.toLowerCase() || "") || 
              b.id?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
            )} 
            onDelete={handleDeleteBill}
            onEdit={handleOpenEditModal}
          />
        </div>
      </div>

      {isModalOpen && (
        <AddBillForm 
          initialData={editingBill}
          onSave={handleSaveBill} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default Dashboard;