import React from 'react';

const ReportsPage = ({ bills }) => {
  // 1. Tính toán doanh thu theo trạng thái
  const paidAmount = bills
    .filter(b => b.status === "Đã thanh toán")
    .reduce((sum, b) => sum + b.amount, 0);
  
  const pendingAmount = bills
    .filter(b => b.status === "Chờ thanh toán")
    .reduce((sum, b) => sum + b.amount, 0);

  const overdueAmount = bills
    .filter(b => b.status === "Quá hạn")
    .reduce((sum, b) => sum + b.amount, 0);

  // 2. Tính tỷ lệ tăng trưởng giả định hoặc dựa trên số lượng hóa đơn
  const totalBills = bills.length;
  const successRate = totalBills > 0 ? Math.round((bills.filter(b => b.status === "Đã thanh toán").length / totalBills) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Báo Cáo Doanh Thu</h2>

      {/* Biểu đồ thanh ngang đơn giản */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h3 className="font-black text-slate-800 mb-6 uppercase text-sm tracking-widest">Phân bổ dòng tiền</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-bold text-emerald-600">Đã thu hồi</span>
              <span className="text-sm font-black">{paidAmount.toLocaleString()}đ</span>
            </div>
            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${successRate}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-bold text-amber-500">Tiền đang treo (Chờ/Quá hạn)</span>
              <span className="text-sm font-black">{(pendingAmount + overdueAmount).toLocaleString()}đ</span>
            </div>
            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full transition-all duration-1000" style={{ width: `${100 - successRate}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Chỉ số sức khỏe</p>
          <h4 className="text-4xl font-black mt-2">{successRate}%</h4>
          <p className="text-xs font-bold mt-2">Tỷ lệ thanh toán đúng hạn trên tổng hệ thống.</p>
        </div>
        
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white text-center flex flex-col justify-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Tổng hóa đơn xử lý</p>
          <h4 className="text-4xl font-black mt-2 text-blue-400">{totalBills}</h4>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;