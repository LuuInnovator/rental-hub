import React, { useState } from 'react';
import BillTable from '../components/BillTable';
import AddBillForm from '../components/AddBillForm';

const BillsPage = ({ bills, refresh, searchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const API_URL = "https://sheetdb.io/api/v1/pz1au9f5wo0ba";

  const handleSave = async (data) => {
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
  };

  const filteredBills = bills.filter(b => 
    b.customer?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Quản Lý Hóa Đơn</h2>
        <button onClick={() => { setEditingBill(null); setIsModalOpen(true); }} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg">
          + Thêm Hóa Đơn
        </button>
      </div>
      <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100">
        <BillTable 
          bills={filteredBills} 
          onEdit={(bill) => { setEditingBill(bill); setIsModalOpen(true); }} 
          onDelete={refresh} 
        />
      </div>
      {isModalOpen && <AddBillForm initialData={editingBill} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default BillsPage;