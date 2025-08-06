import React from 'react';

export const ServiceCategories: React.FC = () => {
  const categories = [
    { 
      icon: '🎨', 
      name: '平面設計', 
      description: 'Logo、海報、名片設計', 
      color: 'from-accent-pink to-secondary-400',
      count: '500+'
    },
    { 
      icon: '💻', 
      name: '網站開發', 
      description: '網頁設計、系統開發', 
      color: 'from-accent-blue to-primary-400',
      count: '300+'
    },
    { 
      icon: '📝', 
      name: '文案撰寫', 
      description: '廣告文案、內容行銷', 
      color: 'from-accent-yellow to-yellow-400',
      count: '400+'
    },
    { 
      icon: '🎬', 
      name: '影音製作', 
      description: '影片剪輯、動畫製作', 
      color: 'from-primary-400 to-green-400',
      count: '250+'
    },
    { 
      icon: '📱', 
      name: '行動應用', 
      description: 'App設計、UI/UX', 
      color: 'from-secondary-400 to-red-400',
      count: '200+'
    },
    { 
      icon: '📊', 
      name: '數據分析', 
      description: '市場研究、數據視覺化', 
      color: 'from-blue-400 to-accent-blue',
      count: '150+'
    },
    { 
      icon: '🎵', 
      name: '音樂創作', 
      description: '作曲、錄音、後製', 
      color: 'from-purple-400 to-accent-pink',
      count: '100+'
    },
    { 
      icon: '📚', 
      name: '內容創作', 
      description: '部落格、社群經營', 
      color: 'from-green-400 to-accent-yellow',
      count: '350+'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* 標題區域 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            探索多元
            <span className="bg-gradient-to-r from-primary-500 to-accent-blue bg-clip-text text-transparent">
              服務類別
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            無論您需要什麼服務，都能在這裡找到專業的台灣創作者
            <br />
            <span className="text-primary-600 font-medium">超過 2000 位創作者，涵蓋 8 大專業領域</span>
          </p>
        </div>

        {/* 服務分類網格 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-transparent overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* 背景漸變 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* 內容 */}
              <div className="relative text-center">
                {/* 圖示 */}
                <div className="text-4xl lg:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {category.icon}
                </div>
                
                {/* 服務名稱 */}
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {category.name}
                </h3>
                
                {/* 描述 */}
                <p className="text-gray-600 text-sm lg:text-base mb-3 leading-relaxed">
                  {category.description}
                </p>
                
                {/* 創作者數量 */}
                <div className="inline-flex items-center px-3 py-1 bg-gray-100 group-hover:bg-primary-100 rounded-full text-xs lg:text-sm font-medium text-gray-600 group-hover:text-primary-700 transition-all duration-300">
                  {category.count} 創作者
                </div>
              </div>

              {/* hover 效果裝飾 */}
              <div className="absolute top-2 right-2 w-8 h-8 bg-primary-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
            </div>
          ))}
        </div>

        {/* 底部行動按鈕 */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 text-lg">
              查看所有服務類別
            </button>
            <button className="border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 text-lg">
              成為創作者
            </button>
          </div>
          
          {/* 額外資訊 */}
          <p className="text-gray-500 mt-6 text-sm">
            平均回應時間 2 小時 • 100% 滿意保證 • 安全付款保護
          </p>
        </div>
      </div>
    </section>
  );
};
