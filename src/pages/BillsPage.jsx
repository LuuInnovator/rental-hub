import React, { useState } from 'react';
import BillTable from '../components/BillTable';
import AddBillForm from '../components/AddBillForm';

const BillsPage = ({ bills, refresh, searchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const API_URL = "https://sheetdb.io/api/v1/pz1au9f5wo0ba";

  const handleSave = async (data) => {
    try {
      const method = editingBill ? 'PUT' : 'POST';
      const url = editingBill ? `${API_URL}/id/${data.id}` : API_URL;
      const body = editingBill ? { data } : { data: [data] };

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      setIsModalOpen(false);
      refresh();
    } catch (error) {
      alert("Lỗi khi cập nhật dữ liệu!");
    }
  };

  const filteredBills = bills.filter(b => 
    b.customer?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header: Xếp chồng trên mobile, nằm ngang trên desktop */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Hóa Đơn</h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">
            Danh sách chi tiết & Trạng thái thanh toán
          </p>
        </div>
        
        <button 
          onClick={() => { setEditingBill(null); setIsModalOpen(true); }} 
          className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
          </svg>
          THÊM MỚI
        </button>
      </div>

      {/* Table Container: Quan trọng nhất để xem được trên mobile */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]"> {/* Ép bảng có độ rộng tối thiểu để không nát giao diện */}
            <BillTable 
              bills={filteredBills} 
              onEdit={(bill) => { setEditingBill(bill); setIsModalOpen(true); }} 
              onDelete={refresh} 
            />
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <AddBillForm 
          initialData={editingBill} 
          onSave={handleSave} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default BillsPage;