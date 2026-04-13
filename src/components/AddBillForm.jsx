import React, { useState, useEffect } from 'react';

const AddBillForm = ({ onSave, onClose, initialData }) => {
  // 1. Khởi tạo state với giá trị mặc định an toàn
  const [formData, setFormData] = useState({
    customer: '',
    amount: '',
    status: 'Chờ thanh toán'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Cập nhật form khi ở chế độ "Sửa" (initialData có dữ liệu)
  useEffect(() => {
    if (initialData) {
      setFormData({
        customer: initialData.customer || '',
        amount: initialData.amount || '',
        status: initialData.status || 'Chờ thanh toán'
      });
    }
  }, [initialData]);

  // 3. Hàm xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ngăn chặn bấm nút nhiều lần khi đang gửi
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Chuẩn hóa dữ liệu trước khi gửi lên Google Sheets
      const finalData = {
        ...formData,
        amount: Number(formData.amount),
        // Nếu là thêm mới, tạo ID ngẫu nhiên; nếu sửa, giữ nguyên ID cũ
        id: initialData?.id || `HD${Math.floor(1000 + Math.random() * 9000)}`,
        date: initialData?.date || new Date().toLocaleDateString('en-CA') // YYYY-MM-DD
      };

      await onSave(finalData);
    } catch (error) {
      console.error("Lỗi khi lưu hóa đơn:", error);
      alert("Không thể lưu dữ liệu. Vui lòng kiểm tra lại kết nối!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 animate-in zoom-in duration-300">
        {/* Header */}
        <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white relative">
          <h3 className="text-2xl font-black">{initialData ? "Chỉnh Sửa Hóa Đơn" : "Tạo Hóa Đơn Mới"}</h3>
          <p className="text-blue-100 text-sm opacity-80">Thông tin sẽ được đồng bộ với Google Sheets</p>
          <button 
            onClick={onClose} 
            type="button"
            className="absolute top-6 right-8 text-3xl hover:scale-125 transition-transform"
          >
            &times;
          </button>
        </div>
        
        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="group">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tên khách hàng</label>
            <input 
              required 
              type="text" 
              placeholder="VD: Nguyễn Văn A"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl p-4 outline-none transition-all mt-1 font-semibold"
              value={formData.customer}
              onChange={(e) => setFormData({...formData, customer: e.target.value})}
            />
          </div>
          
          <div className="group">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Số tiền (VNĐ)</label>
            <input 
              required 
              type="number" 
              placeholder="VD: 1500000"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl p-4 outline-none transition-all mt-1 font-bold text-lg text-blue-600"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
            />
          </div>

          <div className="group">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Trạng thái thanh toán</label>
            <div className="relative">
              <select 
                className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl p-4 outline-none transition-all mt-1 font-semibold appearance-none cursor-pointer"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="Chờ thanh toán">🟡 Chờ thanh toán</option>
                <option value="Đã thanh toán">🟢 Đã thanh toán</option>
                <option value="Quá hạn">🔴 Quá hạn</option>
              </select>
              {/* Icon mũi tên cho select */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={isSubmitting}
              className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`flex-1 py-4 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 flex justify-center items-center ${
                isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang lưu...
                </span>
              ) : (
                initialData ? "Cập Nhật" : "Hoàn Tất"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBillForm;