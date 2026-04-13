import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // THIẾT LẬP TÀI KHOẢN TẠI ĐÂY
    // Bạn có thể đổi 'admin' và '123' tùy ý
    if (username === 'admin' && password === '123') {
      onLogin(username);
    } else {
      alert("Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Hiệu ứng trang trí nền */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

      <div className="bg-white w-full max-w-md rounded-[3.5rem] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative z-10 border border-slate-100">
        <div className="text-center mb-12">
          {/* Logo RentalHub */}
          <div className="inline-block w-20 h-20 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-[2rem] mb-6 flex items-center justify-center shadow-2xl shadow-blue-500/40 rotate-12 transition-transform hover:rotate-0 duration-500">
            <span className="text-white text-4xl font-black">R</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">RentalHub</h1>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-3">Hệ thống quản lý nội bộ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Tài khoản quản trị</label>
            <input 
              type="text" 
              required
              autoFocus
              className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 focus:bg-white transition-all duration-300 placeholder:text-slate-300"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Mật khẩu bảo mật</label>
            <input 
              type="password" 
              required
              className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 focus:bg-white transition-all duration-300 placeholder:text-slate-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white py-5 rounded-[1.8rem] font-black text-sm shadow-xl shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 active:scale-95 mt-4 uppercase tracking-widest"
          >
            Xác nhận đăng nhập
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">© 2026 RentalHub Management System</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;