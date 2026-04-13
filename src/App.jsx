import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import BillsPage from './pages/BillsPage';
import CustomersPage from './pages/CustomersPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

function App() {
  // 1. Quản lý trạng thái Đăng nhập & Người dùng
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState("Tú Đẹp Trai"); // Tên mặc định
  
  // 2. Quản lý dữ liệu Hóa đơn
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const API_URL = "https://sheetdb.io/api/v1/pz1au9f5wo0ba";

  // Kiểm tra phiên đăng nhập cũ từ LocalStorage khi khởi chạy
  useEffect(() => {
    const savedUser = localStorage.getItem('rental_hub_user');
    const savedName = localStorage.getItem('admin_display_name');
    
    if (savedUser) {
      setIsLoggedIn(true);
      if (savedName) setAdminName(savedName);
    }
    fetchData();
  }, []);

  // Hàm lấy dữ liệu từ Google Sheets
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const formattedData = data.map(item => ({
        ...item,
        amount: Number(item.amount) || 0 // Bảo vệ dữ liệu nếu amount không phải số
      }));
      setBills(formattedData);
    } catch (error) {
      console.error("Lỗi kết nối database:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý Đăng nhập
  const handleLogin = (username) => {
    localStorage.setItem('rental_hub_user', username);
    setIsLoggedIn(true);
  };

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('rental_hub_user');
    setIsLoggedIn(false);
  };

  // Hàm cập nhật tên hiển thị Admin
  const updateAdminName = (newName) => {
    setAdminName(newName);
    localStorage.setItem('admin_display_name', newName);
  };

  // Giao diện chờ khi đang tải dữ liệu
  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-blue-400 font-black tracking-widest animate-pulse uppercase text-xs">Đang đồng bộ dữ liệu...</p>
    </div>
  );

  // 3. Điều hướng: Nếu chưa đăng nhập thì buộc phải ở trang Login
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Sidebar nhận hàm logout để thoát ứng dụng */}
        <Sidebar onLogout={handleLogout} />
        
        <div className="flex-1 ml-64 min-w-0">
          {/* Header hiển thị tên Admin động */}
          <Header 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            adminName={adminName} 
          />
          
          <main className="pt-24 pb-10 px-8">
            <Routes>
              {/* Trang chủ - Dashboard */}
              <Route path="/" element={
                <Dashboard bills={bills} refresh={fetchData} searchTerm={searchTerm} />
              } />
              
              {/* Trang quản lý hóa đơn */}
              <Route path="/hoadon" element={
                <BillsPage bills={bills} refresh={fetchData} searchTerm={searchTerm} />
              } />
              
              {/* Trang danh sách khách hàng */}
              <Route path="/khachhang" element={
                <CustomersPage bills={bills} />
              } />
              
              {/* Trang báo cáo doanh thu */}
              <Route path="/baocao" element={
                <ReportsPage bills={bills} />
              } />
              
              {/* Trang cài đặt hệ thống */}
              <Route path="/caidat" element={
                <SettingsPage 
                  adminName={adminName} 
                  setAdminName={updateAdminName} 
                  onLogout={handleLogout} 
                />
              } />

              {/* Tự động chuyển về Dashboard nếu đường dẫn sai */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;