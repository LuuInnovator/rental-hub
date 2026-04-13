import React from 'react';

const CustomersPage = ({ bills }) => {
  // Lấy danh sách khách hàng không trùng lặp
  const uniqueCustomers = Array.from(new Set(bills.map(b => b.customer)))
    .map(name => {
      const customerBills = bills.filter(b => b.customer === name);
      return {
        name,
        totalPaid: customerBills.filter(b => b.status === "Đã thanh toán").reduce((sum, b) => sum + b.amount, 0),
        billCount: customerBills.length
      };
    });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Danh Sách Khách Hàng</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {uniqueCustomers.map((c, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-black text-xl">
                {c.name?.charAt(0)}
              </div>
              <div>
                <h3 className="font-black text-slate-800">{c.name}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{c.billCount} Hóa đơn</p>
              </div>
            </div>
            <div className="pt-4 border-t border-dashed border-gray-100">
              <p className="text-[10px] text-gray-400 font-black uppercase">Tổng chi tiêu</p>
              <p className="text-xl font-black text-emerald-600">{c.totalPaid.toLocaleString()}đ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;