import React from 'react';

const BillTable = ({ bills, onDelete, onEdit }) => {
  // Hàm xử lý màu sắc trạng thái chuyên nghiệp
  const getStatusColor = (status) => {
    const s = status?.trim();
    switch (s) {
      case 'Đã thanh toán': 
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Chờ thanh toán': 
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Quá hạn': 
        return 'bg-rose-50 text-rose-600 border-rose-100';
      default: 
        return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Table Header Section */}
      <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white/50 backdrop-blur-sm">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Danh Sách Hóa Đơn</h3>
          <p className="text-sm text-gray-400 font-medium">Cập nhật tự động từ Google Sheets</p>
        </div>
        <span className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Live Data
        </span>
      </div>

      <div className="overflow-x-auto p-4">
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
              <tr 
                key={bill.id} 
                className="group hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* ID Hóa Đơn */}
                <td className="py-5 pl-6 rounded-l-3xl font-bold text-blue-600 text-sm bg-white group-hover:bg-slate-50 transition-colors">
                  <span className="bg-blue-50 px-2 py-1 rounded-lg">#{bill.id}</span>
                </td>

                {/* Khách Hàng */}
                <td className="py-5 font-bold text-gray-800 bg-white group-hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-100 to-blue-50 flex items-center justify-center text-blue-500 text-xs font-black">
                      {bill.customer?.charAt(0).toUpperCase()}
                    </div>
                    {bill.customer}
                  </div>
                </td>

                {/* Ngày Tạo */}
                <td className="py-5 text-gray-500 text-sm text-center font-medium bg-white group-hover:bg-slate-50 transition-colors">
                  {bill.date}
                </td>

                {/* Số Tiền */}
                <td className="py-5 font-black text-gray-900 text-right bg-white group-hover:bg-slate-50 transition-colors">
                  {Number(bill.amount).toLocaleString('vi-VN')}đ
                </td>

                {/* Trạng Thái */}
                <td className="py-5 text-center bg-white group-hover:bg-slate-50 transition-colors">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black border uppercase tracking-wider ${getStatusColor(bill.status)}`}>
                    {bill.status}
                  </span>
                </td>

                {/* Hành Động */}
                <td className="py-5 rounded-r-3xl text-center bg-white group-hover:bg-slate-50 transition-colors">
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => onEdit(bill)}
                      title="Sửa"
                      className="p-2.5 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all text-blue-500 hover:scale-110 active:scale-90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path></svg>
                    </button>
                    <button 
                      onClick={() => onDelete(bill.id)}
                      title="Xóa"
                      className="p-2.5 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-xl transition-all text-rose-500 hover:scale-110 active:scale-90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {bills.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center text-gray-400 space-y-4">
            <div className="bg-gray-50 p-6 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#cbd5e1" viewBox="0 0 256 256"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"></path><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm12-88a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm-44,56a52,52,0,0,1,64,0,8,8,0,0,1-10.46,12.1,36,36,0,0,0-43.08,0A8,8,0,0,1,96,184Z"></path></svg>
            </div>
            <p className="font-bold text-lg">Hệ thống trống trơn!</p>
            <p className="text-sm">Hãy kiểm tra file Google Sheets hoặc bộ lọc tìm kiếm của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillTable;