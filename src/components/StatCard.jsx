import React from 'react';

const StatCard = ({ title, value, change, icon }) => {
  const isPositive = change?.toString().startsWith('+');
  const isNegative = change?.toString().startsWith('-');
  const isNeutral = !isPositive && !isNegative;

  return (
    // Sửa p-6 thành p-4 trên mobile, flex-row thành flex-col trên mobile cực nhỏ
    <div className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-gray-100 flex flex-row items-center gap-3 md:gap-5 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 group">
      
      {/* Icon Container: Thu nhỏ từ w-16 xuống w-10 trên mobile */}
      <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-slate-50 to-gray-50 text-xl md:text-3xl rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-inner border border-white shrink-0">
        <span className="filter drop-shadow-sm select-none">{icon}</span>
      </div>

      <div className="flex-1 min-w-0">
        {/* Tiêu đề thẻ: Giảm cỡ chữ trên mobile */}
        <div className="text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-[0.1em] md:tracking-[0.2em] mb-0.5 md:mb-1 truncate">
          {title}
        </div>
        
        {/* Giá trị chính: Giảm từ text-2xl xuống text-lg trên mobile */}
        <div className="text-base md:text-2xl font-black text-gray-900 tracking-tight truncate">
          {value || '0'}
        </div>
        
        {/* Phần hiển thị biến động: Ẩn bớt chữ "Thực tế" trên mobile để tránh tràn dòng */}
        <div className="flex items-center gap-1 mt-1 md:mt-2">
          <div className={`flex items-center gap-0.5 md:gap-1 px-1.5 py-0.5 rounded-md md:rounded-lg text-[8px] md:text-[10px] font-black uppercase tracking-wider transition-colors ${
            isPositive ? 'bg-emerald-50 text-emerald-600' : 
            isNegative ? 'bg-rose-50 text-rose-600' : 
            'bg-blue-50 text-blue-600'
          }`}>
            {isPositive && (
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" className="md:w-3 md:h-3" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"></path></svg>
            )}
            {isNegative && (
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" className="md:w-3 md:h-3" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
            )}
            
            <span className="truncate">{change || 'N/A'}</span>
          </div>
          
          <span className="text-[8px] text-gray-300 font-bold uppercase hidden sm:inline-block">Thực tế</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;