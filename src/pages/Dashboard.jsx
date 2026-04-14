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

  // --- LOGIC LỌC VÀ SẮP XẾP QUAN TRỌNG ---
  const displayBills = bills
    .filter(bill => {
      // 1. Chỉ hiện những người CHƯA TRẢ (Chờ thanh toán hoặc Quá hạn)
      const isUnpaid = bill.status !== "Đã thanh toán";
      
      // 2. Kết hợp với ô tìm kiếm
      const matchesSearch = 
        bill.customer?.toLowerCase().includes(searchTerm?.toLowerCase() || "") || 
        bill.id?.toLowerCase().includes(searchTerm?.toLowerCase() || "");
        
      return isUnpaid && matchesSearch;
    })
    .sort((a, b) => {
      // 3. Đẩy người "Quá hạn" lên đầu danh sách
      if (a.status === "Quá hạn" && b.status !== "Quá hạn") return -1;
      if (a.status !== "Quá hạn" && b.status === "Quá hạn") return 1;
      return 0;
    });
  // --------------------------------------

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

  // Thống kê vẫn dựa trên toàn bộ 'bills' để tính tổng doanh thu
  const totalPaid = bills
    .filter(b => b.status === "Đã thanh toán")
    .reduce((sum, b) => sum + b.amount, 0);

  const pendingAmount = bills
    .filter(b => b.status === "Chờ thanh toán" || b.status === "Quá hạn")
    .reduce((sum, b) => sum + b.amount, 0);

  const stats = [
    { id: 1, title: "Đã Thu", value: totalPaid.toLocaleString() + "đ", change: "Thực tế", icon: "💰" },
    { id: 2, title: "Tiền Nợ", value: pendingAmount.toLocaleString() + "đ", change: "Cần thu", icon: "⏳" },
    { id: 3, title: "Việc Cần Làm", value: displayBills.length.toString(), change: "HĐ chưa trả", icon: "📋" },
    { id: 4, title: "Quá Hạn", value: bills.filter(b => b.status === "Quá hạn").length.toString(), change: "Khẩn cấp", icon: "⚠️" },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 space-y-4">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-black text-blue-600 animate-pulse text-[10px] tracking-widest">ĐANG TẢI...</p>
    </div>
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Quản Lý Nợ</h2>
          <p className="text-slate-400 font-bold mt-1 uppercase text-[9px] tracking-[0.2em]">Ưu tiên xử lý các hóa đơn quá hạn</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-4 rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
          HÓA ĐƠN MỚI
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map(s => <StatCard key={s.id} {...s} />)}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
          DANH SÁCH CHƯA TRẢ 
          <span className="bg-rose-100 text-rose-600 text-xs px-2 py-0.5 rounded-lg">{displayBills.length}</span>
        </h3>
        
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
          <BillTable 
            bills={displayBills} 
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