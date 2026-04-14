import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Thư viện xuất Excel
import BillTable from '../components/BillTable';
import AddBillForm from '../components/AddBillForm';

const BillsPage = ({ bills, refresh, searchTerm }) => {
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);

  const API_URL = "https://sheetdb.io/api/v1/pz1au9f5wo0ba";

  // --- 1. LOGIC LỌC VÀ NHÓM THEO THÁNG ---
  const filtered = bills.filter(bill => {
    const matchesSearch = 
      bill.customer?.toLowerCase().includes(searchTerm?.toLowerCase() || "") || 
      bill.id?.toLowerCase().includes(searchTerm?.toLowerCase() || "");
    const matchesStatus = filterStatus === "Tất cả" || bill.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const groupBillsByMonth = (data) => {
    const groups = {};
    data.forEach(bill => {
      if (!bill.date) return;
      const dateParts = bill.date.split('/'); // Giả sử định dạng DD/MM/YYYY
      const monthYear = dateParts.length === 3 
        ? `Tháng ${dateParts[1]}/${dateParts[2]}`
        : "Khác";
      
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(bill);
    });

    // Sắp xếp tháng mới nhất lên đầu
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  };

  const groupedBills = groupBillsByMonth(filtered);

  // --- 2. HÀM XUẤT EXCEL ---
  const exportToExcel = () => {
    const dataToExport = filtered.map(bill => ({
      "Mã HĐ": bill.id,
      "Khách Hàng": bill.customer,
      "Ngày": bill.date,
      "Số Tiền": bill.amount,
      "Trạng Thái": bill.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "HoaDon");
    
    // Xuất file với tên theo ngày hiện tại
    const fileName = `Doi_Soat_Hoa_Don_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const handleOpenEdit = (bill) => {
    setEditingBill(bill);
    setIsModalOpen(true);
  };

  const handleSaveBill = async (billData) => {
    try {
      const method = editingBill ? 'PUT' : 'POST';
      const url = editingBill ? `${API_URL}/id/${billData.id}` : API_URL;
      await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: editingBill ? billData : [billData] })
      });
      setIsModalOpen(false);
      refresh();
    } catch (error) {
      alert("Lỗi cập nhật!");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-10">
      {/* Header & Tools */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 italic">LỊCH SỬ GIAO DỊCH</h2>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Quản lý dòng tiền theo tháng</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={exportToExcel}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 px-5 py-3 rounded-2xl font-black text-xs hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M216,40V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V40A16,16,0,0,1,56,24H200A16,16,0,0,1,216,40Z" opacity="0.2"></path><path d="M152,120v40a8,8,0,0,1-16,0V139.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L124.69,128,106.34,109.66a8,8,0,0,1,11.32-11.32L136,116.69V80a8,8,0,0,1,16,0v40ZM224,56V200a24,24,0,0,1-24,24H56a24,24,0,0,1-24-24V56A24,24,0,0,1,56,32H200A24,24,0,0,1,224,56Zm-16,0a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H200a8,8,0,0,0,8-8Z"></path></svg>
              XUẤT EXCEL
            </button>
            <button 
              onClick={() => { setEditingBill(null); setIsModalOpen(true); }}
              className="flex-1 md:flex-none bg-blue-600 text-white px-5 py-3 rounded-2xl font-black text-xs hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
            >
              + THÊM MỚI
            </button>
          </div>
        </div>

        {/* Bộ lọc trạng thái */}
        <div className="flex flex-wrap gap-2 p-1 bg-slate-50 rounded-2xl w-fit">
          {["Tất cả", "Đã thanh toán", "Chờ thanh toán", "Quá hạn"].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                filterStatus === status ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Hiển thị danh sách theo từng tháng */}
      <div className="space-y-12">
        {groupedBills.map(([month, monthBills]) => (
          <div key={month} className="space-y-4">
            <div className="flex items-center gap-4 px-2">
              <span className="bg-slate-900 text-white px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase">
                {month}
              </span>
              <div className="h-[1px] flex-1 bg-gray-100"></div>
              <span className="text-[10px] font-bold text-gray-400 italic">
                {monthBills.length} Giao dịch
              </span>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
              <BillTable 
                bills={monthBills} 
                onDelete={refresh} 
                onEdit={handleOpenEdit} 
              />
            </div>

            <div className="flex justify-end px-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                Tổng tiền tháng: 
                <span className="ml-2 text-sm text-slate-900 font-black">
                  {monthBills.reduce((sum, b) => sum + Number(b.amount || 0), 0).toLocaleString()}đ
                </span>
              </p>
            </div>
          </div>
        ))}

        {groupedBills.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Không có dữ liệu phù hợp</p>
          </div>
        )}
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

export default BillsPage;