import React from 'react';

const Header = ({ searchTerm, setSearchTerm, adminName }) => {
  // Lấy chữ cái đầu tiên của tên để làm Avatar
  const avatarLetter = adminName ? adminName.charAt(0).toUpperCase() : "A";

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm h-20 flex items-center justify-between px-10 fixed top-0 left-64 right-0 z-40 border-b border-gray-100/50">
      
      {/* Search Bar Group */}
      <div className="relative w-96 group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm mã hóa đơn, tên khách..."
          className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-blue-50 focus:border-blue-400 focus:bg-white outline-none transition-all font-medium text-sm text-gray-700"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          >
            &times;
          </button>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative text-gray-500 hover:text-blue-600 p-2.5 rounded-xl hover:bg-blue-50 transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,224a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,224Zm80-40H48s0-2.4,0-2.82c0-26.75,8.19-53.8,15.11-70.21a64,64,0,1,1,129.78,0c6.92,16.41,15.11,43.46,15.11,70.21,0,0.42,0,2.82,0,2.82Z"></path>
          </svg>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white group-hover:animate-bounce"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-4 border-l border-gray-100 pl-6 h-10">
          <div className="text-right hidden sm:block">
            {/* HIỂN THỊ TÊN ĐỘNG TỪ APP.JS TẠI ĐÂY */}
            <div className="font-bold text-sm text-gray-900 leading-tight">{adminName}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-blue-500">Administrator</div>
          </div>
          <div className="relative group cursor-pointer">
            <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform uppercase">
              {avatarLetter}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;