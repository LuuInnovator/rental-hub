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

  // 1. Lấy dữ liệu (READ)
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
      console.error("Lỗi lấy dữ liệu từ SheetDB:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Điều khiển Modal
  const handleOpenAddModal = () => {
    setEditingBill(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (bill) => {
    setEditingBill(bill);
    setIsModalOpen(true);
  };

  // 3. Lưu dữ liệu (CREATE & UPDATE)
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
      alert("Lỗi khi kết nối với máy chủ Google Sheets!");
    }
  };

  // 4. Xóa dữ liệu (DELETE)
  const handleDeleteBill = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa hóa đơn này khỏi Google Sheets?")) {
      try {
        await fetch(`${API_URL}/id/${id}`, {
          method: 'DELETE'
        });
        fetchData();
      } catch (error) {
        alert("Lỗi khi xóa dữ liệu!");
      }
    }
  };

  // --- LOGIC TÍNH TOÁN THỐNG KÊ THỰC TẾ ---
  const totalRevenue = bills
    .filter(b => b.status === "Đã thanh toán")
    .reduce((sum, b) => sum + b.amount, 0);

  // Tính tỷ lệ hoàn thành hóa đơn (%)
  const completionRate = bills.length > 0 
    ? Math.round((bills.filter(b => b.status === "Đã thanh toán").length / bills.length) * 100)
    : 0;

  const stats = [
    { 
      id: 1, 
      title: "Tổng Doanh Thu", 
      value: totalRevenue.toLocaleString() + "đ", 
      change: `+${completionRate}%`, // Biến động dựa trên tỷ lệ thanh toán
      icon: "💰" 
    },
    { 
      id: 2, 
      title: "Hóa Đơn", 
      value: bills.length.toString(), 
      change: "Hiện có", 
      icon: "📄" 
    },
    { 
      id: 3, 
      title: "Khách Hàng", 
      value: [...new Set(bills.map(b => b.customer))].length.toString(), 
      change: "Thực tế", 
      icon: "👤" 
    },
    { 
      id: 4, 
      title: "Quá Hạn", 
      value: bills.filter(b => b.status === "Quá hạn").length.toString(), 
      change: bills.filter(b => b.status === "Quá hạn").length > 0 ? "- Cần xử lý" : "Ổn định", 
      icon: "⚠️" 
    },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-black text-blue-600 animate-pulse uppercase tracking-widest text-xs">
        Đang đồng bộ dữ liệu trực tuyến...
      </p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">RENTAL HUB</h2>
          <p className="text-slate-400 font-bold mt-1 uppercase text-[10px] tracking-[0.2em]">
            Google Sheets DB / Connected via SheetDB
          </p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
          Tạo Hóa Đơn
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(s => <StatCard key={s.id} {...s} />)}
      </div>

      <div className="bg-white rounded-[2.5rem] p-2 shadow-sm border border-gray-100">
        <BillTable 
          bills={bills.filter(b => 
            b.customer?.toLowerCase().includes(searchTerm?.toLowerCase() || "") || 
            b.id?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
          )} 
          onDelete={handleDeleteBill}
          onEdit={handleOpenEditModal}
        />
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