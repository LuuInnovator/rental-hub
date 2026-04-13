import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // Thêm 'path' vào menuItems để định hướng chính xác
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg> },
    { name: 'Hóa Đơn', path: '/hoadon', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96H72a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16Zm0,48H72a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16Z"></path></svg> },
    { name: 'Khách Hàng', path: '/khachhang', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Z"></path></svg> },
    { name: 'Báo Cáo', path: '/baocao', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256"><path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16H224A8,8,0,0,1,232,208ZM88,176a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16H80A8,8,0,0,1,88,176Zm48-40a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16H128A8,8,0,0,1,136,136Zm48-40a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16H176A8,8,0,0,1,184,96Z"></path></svg> },
    { name: 'Cài Đặt', path: '/caidat', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path></svg> },
  ];

  return (
    <div className="w-64 bg-slate-900 h-screen flex flex-col fixed left-0 top-0 z-50 shadow-2xl overflow-hidden">
      {/* Logo Section */}
      <div className="p-8 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform rotate-12 transition-transform group-hover:rotate-0">
            <span className="text-white text-xl font-black">R</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-tighter">
            Rental<span className="text-blue-400">Hub</span>
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`}>
                  {item.icon}
                </div>
                <span className="font-bold text-sm tracking-wide">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Upgrade / Help Box */}
      <div className="p-4 mx-4 mb-6 bg-slate-800/50 rounded-3xl border border-slate-700/50">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 text-center">Tình trạng máy chủ</p>
        <div className="flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-300">Ổn định</span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-800 text-center">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
};

export default Sidebar;