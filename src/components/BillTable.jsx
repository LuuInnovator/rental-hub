import React from 'react';

const BillTable = ({ bills, onDelete, onEdit }) => {
  const getStatusColor = (status) => {
    const s = status?.trim();
    switch (s) {
      case 'Đã thanh toán': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Chờ thanh toán': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Quá hạn': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="p-4 md:p-8 border-b border-gray-50 flex justify-between items-center bg-white/50 backdrop-blur-sm">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800">Danh Sách Hóa Đơn</h3>
          <p className="text-[10px] md:text-sm text-gray-400 font-medium">Google Sheets Live Sync</p>
        </div>
        <span className="flex items-center gap-1.5 md:gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[9px] md:text-xs font-black uppercase tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Live
        </span>
      </div>

      <div className="p-2 md:p-4">
        {/* VIEW CHO DESKTOP: Hiện bảng khi màn hình từ md (768px) trở lên */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">
                <th className="pb-4 pl-6">Mã HĐ</th>
                <th className="pb-4">Khách Hàng</th>
                <th className="pb-4 text-center">Ngày Tạo</th>
                <th className="pb-4 text-right">Số Tiền</th>
                <th className="pb-4 text-center">Trạng Thái</th>
                <th className="pb-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill.id} className="group hover:bg-slate-50 transition-all duration-300 shadow-sm">
                  <td className="py-5 pl-6 rounded-l-3xl font-bold text-blue-600 text-sm bg-white group-hover:bg-slate-50 border-y border-l border-transparent group-hover:border-gray-100">
                    <span className="bg-blue-50 px-2 py-1 rounded-lg">#{bill.id}</span>
                  </td>
                  <td className="py-5 font-bold text-gray-800 bg-white group-hover:bg-slate-50 border-y border-transparent group-hover:border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-[10px] font-black uppercase">{bill.customer?.charAt(0)}</div>
                      {bill.customer}
                    </div>
                  </td>
                  <td className="py-5 text-gray-500 text-sm text-center bg-white group-hover:bg-slate-50 border-y border-transparent group-hover:border-gray-100">{bill.date}</td>
                  <td className="py-5 font-black text-gray-900 text-right bg-white group-hover:bg-slate-50 border-y border-transparent group-hover:border-gray-100">{Number(bill.amount).toLocaleString()}đ</td>
                  <td className="py-5 text-center bg-white group-hover:bg-slate-50 border-y border-transparent group-hover:border-gray-100">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black border uppercase ${getStatusColor(bill.status)}`}>{bill.status}</span>
                  </td>
                  <td className="py-5 rounded-r-3xl text-center bg-white group-hover:bg-slate-50 border-y border-r border-transparent group-hover:border-gray-100">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => onEdit(bill)} className="p-2 text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path></svg></button>
                      <button onClick={() => onDelete(bill.id)} className="p-2 text-rose-500 bg-rose-50 rounded-lg hover:bg-rose-600 hover:text-white transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* VIEW CHO MOBILE: Hiện dạng Card khi màn hình dưới 768px */}
        <div className="md:hidden space-y-3">
          {bills.map((bill) => (
            <div key={bill.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-all">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-600 font-black text-[10px] px-2 py-1 rounded-md tracking-tighter">#{bill.id}</span>
                  <div className="font-bold text-gray-800 text-sm truncate max-w-[120px]">{bill.customer}</div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[9px] font-black border uppercase tracking-wider ${getStatusColor(bill.status)}`}>
                  {bill.status}
                </span>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">{bill.date}</div>
                  <div className="text-lg font-black text-slate-900">{Number(bill.amount).toLocaleString()}đ</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(bill)} className="p-3 bg-slate-50 text-blue-600 rounded-xl active:bg-blue-600 active:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path></svg>
                  </button>
                  <button onClick={() => onDelete(bill.id)} className="p-3 bg-rose-50 text-rose-600 rounded-xl active:bg-rose-600 active:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bills.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400 space-y-3">
            <p className="font-bold text-sm md:text-lg italic">"Dữ liệu đang đi vắng..."</p>
            <p className="text-[10px] md:text-sm">Hãy kiểm tra bộ lọc hoặc Google Sheets.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillTable;