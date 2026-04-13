import React from 'react';

const StatCard = ({ title, value, change, icon }) => {
  // 1. Kiểm tra trạng thái dựa trên ký tự đầu tiên của chuỗi 'change'
  const isPositive = change?.toString().startsWith('+');
  const isNegative = change?.toString().startsWith('-');
  
  // Trạng thái trung tính (không có dấu + hoặc -)
  const isNeutral = !isPositive && !isNegative;

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 group">
      
      {/* Icon Container: Hiệu ứng Gradient và Hover chuyển động */}
      <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-gray-50 text-3xl rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner border border-white">
        <span className="filter drop-shadow-sm select-none">{icon}</span>
      </div>

      <div className="flex-1 overflow-hidden">
        {/* Tiêu đề thẻ */}
        <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1 truncate">
          {title}
        </div>
        
        {/* Giá trị chính */}
        <div className="text-2xl font-black text-gray-900 tracking-tight truncate">
          {value || '0'}
        </div>
        
        {/* Phần hiển thị biến động (Badge Change) */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors ${
            isPositive ? 'bg-emerald-50 text-emerald-600' : 
            isNegative ? 'bg-rose-50 text-rose-600' : 
            'bg-blue-50 text-blue-600'
          }`}>
            {/* Render Icon tương ứng với trạng thái */}
            {isPositive && (
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"></path></svg>
            )}
            {isNegative && (
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
            )}
            {isNeutral && (
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256"><path d="M208,128a8,8,0,0,1-8,8H56a8,8,0,0,1,0-16H200A8,8,0,0,1,208,128Z"></path></svg>
            )}
            
            <span>{change || 'N/A'}</span>
          </div>
          
          <span className="text-[9px] text-gray-300 font-bold uppercase tracking-tighter">Thực tế</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;