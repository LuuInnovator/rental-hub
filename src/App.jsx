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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState("Tú Đẹp Trai"); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const API_URL = "https://sheetdb.io/api/v1/pz1au9f5wo0ba";

  useEffect(() => {
    const savedUser = localStorage.getItem('rental_hub_user');
    const savedName = localStorage.getItem('admin_display_name');
    
    if (savedUser) {
      setIsLoggedIn(true);
      if (savedName) setAdminName(savedName);
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const formattedData = data.map(item => ({
        ...item,
        amount: Number(item.amount) || 0 
      }));
      setBills(formattedData);
    } catch (error) {
      console.error("Lỗi kết nối database:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (username) => {
    localStorage.setItem('rental_hub_user', username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('rental_hub_user');
    setIsLoggedIn(false);
  };

  const updateAdminName = (newName) => {
    setAdminName(newName);
    localStorage.setItem('admin_display_name', newName);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-blue-400 font-black tracking-widest animate-pulse uppercase text-xs">Đang đồng bộ dữ liệu...</p>
    </div>
  );

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex relative overflow-x-hidden">
        
        {/* 1. SIDEBAR: Thêm logic để ẩn/hiện mượt mà trên Mobile */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          onLogout={handleLogout} 
        />
        
        {/* 2. OVERLAY: Lớp phủ đen khi mở Sidebar trên Mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* 3. MAIN CONTENT: Quan trọng nhất là ml-0 và md:ml-64 */}
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 w-full md:ml-64">
          
          <Header 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            adminName={adminName}
            toggleSidebar={toggleSidebar}
          />
          
          <main className="pt-24 pb-10 px-4 md:px-8 w-full max-w-[100vw]">
            <Routes>
              <Route path="/" element={<Dashboard bills={bills} refresh={fetchData} searchTerm={searchTerm} />} />
              <Route path="/hoadon" element={<BillsPage bills={bills} refresh={fetchData} searchTerm={searchTerm} />} />
              <Route path="/khachhang" element={<CustomersPage bills={bills} />} />
              <Route path="/baocao" element={<ReportsPage bills={bills} />} />
              <Route path="/caidat" element={<SettingsPage adminName={adminName} setAdminName={updateAdminName} onLogout={handleLogout} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;