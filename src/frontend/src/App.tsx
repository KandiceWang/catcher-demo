import React from 'react';
import './styles/catcher-design-system.css';
import { HeroSection } from './components/home/HeroSection';
import { ServiceCategories } from './components/home/ServiceCategories';

function App() {
  const handleSearch = (query: string) => {
    console.log('搜尋:', query);
    // TODO: 實作搜尋功能
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 新的組件 */}
      <HeroSection onSearch={handleSearch} />
      <ServiceCategories />
      
      {/* 保留的功能區塊 - 使用新的配色系統 */}
      
      {/* How It Works Section */}
      <div className="py-20 bg-catcher-neutral-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              如何開始
            </h2>
            <p className="text-xl text-gray-600">
              簡單三步驟，讓您的專案快速啟動
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-catcher-coral text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                發布專案
              </h3>
              <p className="text-gray-600 text-lg">
                告訴我們您的需求，獲得專家的免費報價
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-catcher-mint text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                選擇人才
              </h3>
              <p className="text-gray-600 text-lg">
                比較個人資料、評價和提案，面試頂尖候選人
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-catcher-sky text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                完成工作
              </h3>
              <p className="text-gray-600 text-lg">
                使用我們的平台聊天、分享檔案，協作直到完成
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-catcher-coral to-catcher-pink">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            準備開始您的專案？
          </h2>
          <p className="text-xl text-white/80 mb-8">
            加入數百萬企業和自由工作者的信賴平台
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-catcher-coral px-8 py-4 rounded-lg font-semibold hover:bg-catcher-neutral-light transition-colors shadow-lg">
              發布專案
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-catcher-coral transition-colors">
              尋找工作機會
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-catcher-coral">Catcher</h3>
              <p className="text-gray-400">
                連接專業人才與企業需求的最佳平台
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">服務</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-catcher-coral transition-colors">尋找人才</a></li>
                <li><a href="#" className="hover:text-catcher-coral transition-colors">瀏覽工作</a></li>
                <li><a href="#" className="hover:text-catcher-coral transition-colors">企業方案</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">支援</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-catcher-coral transition-colors">幫助中心</a></li>
                <li><a href="#" className="hover:text-catcher-coral transition-colors">聯絡我們</a></li>
                <li><a href="#" className="hover:text-catcher-coral transition-colors">安全中心</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">關於</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-catcher-coral transition-colors">關於我們</a></li>
                <li><a href="#" className="hover:text-catcher-coral transition-colors">職涯機會</a></li>
                <li><a href="#" className="hover:text-catcher-coral transition-colors">投資人關係</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Catcher. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
