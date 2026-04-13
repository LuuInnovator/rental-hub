import React, { useState } from 'react';

const SettingsPage = ({ adminName, setAdminName, onLogout }) => {
  // Sử dụng state tạm thời để lưu giá trị khi đang nhập liệu
  const [tempName, setTempName] = useState(adminName);

  const handleUpdate = () => {
    if (tempName.trim() === "") {
      alert("Tên không được để trống!");
      return;
    }
    setAdminName(tempName); // Cập nhật state tổng tại App.js
    alert("Đã cập nhật tên quản trị viên thành công!");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Cấu Hình Hệ Thống</h2>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">
        {/* API Settings */}
        <div className="p-8 hover:bg-slate-50/50 transition-colors">
          <h3 className="font-black text-slate-800 mb-1 text-lg">Kết nối Google Sheets</h3>
          <p className="text-xs text-slate-400 font-bold uppercase mb-6 tracking-widest">Database Management</p>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">SheetDB API Endpoint</label>
              <div className="flex gap-3 mt-2">
                <input 
                  type="text" 
                  readOnly 
                  value="https://sheetdb.io/api/v1/pz1au9f5wo0ba" 
                  className="flex-1 bg-slate-100/50 border-none rounded-2xl px-5 py-3.5 text-sm font-mono text-slate-400"
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText("https://sheetdb.io/api/v1/pz1au9f5wo0ba");
                    alert("Đã sao chép link API!");
                  }}
                  className="bg-white border border-slate-200 text-slate-600 px-6 rounded-2xl font-black text-xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95"
                >
                  Sao chép
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="p-8">
          <h3 className="font-black text-slate-800 mb-1 text-lg">Quản trị viên</h3>
          <p className="text-xs text-slate-400 font-bold uppercase mb-6 tracking-widest">Account Settings</p>
          
          <div className="space-y-6">
            {/* Input đổi tên */}
            <div className="max-w-md">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Tên quản trị viên</label>
              <div className="flex gap-3 mt-2">
                <input 
                  type="text" 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Nhập tên mới..."
                  className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-400 outline-none transition-all"
                />
                <button 
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-8 rounded-2xl font-black text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                >
                  CẬP NHẬT
                </button>
              </div>
            </div>

            {/* Thông tin thẻ User */}
            <div className="flex items-center gap-5 bg-slate-50/80 border border-slate-100 p-5 rounded-[2rem] mt-4">
              <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-xl shadow-blue-200 uppercase">
                {adminName.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-black text-slate-900 text-lg leading-tight">{adminName}</p>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">Hệ thống đang hoạt động</p>
              </div>
              <button 
                onClick={onLogout}
                className="bg-red-50 text-red-500 px-6 py-2.5 rounded-xl font-black text-xs hover:bg-red-500 hover:text-white transition-all active:scale-95"
              >
                ĐĂNG XUẤT
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] animate-pulse">RentalHub Engine v1.0.0</p>
      </div>
    </div>
  );
};

export default SettingsPage;