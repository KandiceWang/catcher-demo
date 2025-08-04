import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'talent' | 'jobs'>('talent');

  const services = [
    {
      title: 'Development & IT',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      description: 'Web & mobile development, DevOps, QA'
    },
    {
      title: 'Design & Creative',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      description: 'Graphic design, UI/UX, branding'
    },
    {
      title: 'AI Services',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Machine learning, AI development'
    },
    {
      title: 'Sales & Marketing',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Digital marketing, lead generation'
    },
    {
      title: 'Writing & Translation',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      description: 'Content writing, translation'
    },
    {
      title: 'Admin & Support',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Virtual assistance, customer support'
    },
    {
      title: 'Finance & Accounting',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      description: 'Financial planning, bookkeeping'
    },
    {
      title: 'Engineering & Architecture',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: 'CAD design, structural engineering'
    }
  ];

  const howItWorksSteps = [
    {
      step: '1',
      title: 'Post your job',
      description: 'Tell us what you need done and get free quotes from experts',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      step: '2',
      title: 'Choose freelancers',
      description: 'Compare profiles, reviews, and proposals then interview top candidates',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      step: '3',
      title: 'Get work done',
      description: 'Use our platform to chat, share files, and collaborate until the job is done',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')`
        }}
      >
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-transparent">
          <div className="text-2xl font-bold text-white">
            Catcher
          </div>
          <div className="hidden md:flex space-x-8 text-white">
            <a href="#" className="hover:text-green-400 transition-colors">找人才</a>
            <a href="#" className="hover:text-green-400 transition-colors">找工作</a>
            <a href="#" className="hover:text-green-400 transition-colors">企業方案</a>
          </div>
          <div className="flex space-x-4">
            <button className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors">
              登入
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
              註冊
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              尋找專業人才
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              連接全球頂尖自由工作者，完成您的專案
            </p>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-1 flex">
                <button
                  onClick={() => setActiveTab('talent')}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === 'talent'
                      ? 'bg-white text-gray-900 shadow-lg'
                      : 'text-white hover:bg-white hover:bg-opacity-20'
                  }`}
                >
                  尋找人才
                </button>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === 'jobs'
                      ? 'bg-white text-gray-900 shadow-lg'
                      : 'text-white hover:bg-white hover:bg-opacity-20'
                  }`}
                >
                  瀏覽工作
                </button>
              </div>
            </div>

            {/* Search Interface */}
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={activeTab === 'talent' ? '搜尋技能或職位' : '搜尋工作機會'}
                    className="w-full px-4 py-3 rounded-lg border-0 bg-white bg-opacity-90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                  搜尋
                </button>
              </div>
              
              {activeTab === 'talent' && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {['網頁開發', 'UI/UX設計', '數據分析', '內容寫作', '數位行銷'].map((skill) => (
                    <span
                      key={skill}
                      className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm hover:bg-opacity-30 cursor-pointer transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              熱門服務類別
            </h2>
            <p className="text-xl text-gray-600">
              探索各種專業服務，找到最適合您專案的人才
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <div className="text-green-600 mb-4 group-hover:text-green-700 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
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
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.gradient} text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6`}>
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            準備開始您的專案？
          </h2>
          <p className="text-xl text-green-100 mb-8">
            加入數百萬企業和自由工作者的信賴平台
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              發布專案
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
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
              <h3 className="text-2xl font-bold mb-4">Catcher</h3>
              <p className="text-gray-400">
                連接專業人才與企業需求的最佳平台
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">服務</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">尋找人才</a></li>
                <li><a href="#" className="hover:text-white">瀏覽工作</a></li>
                <li><a href="#" className="hover:text-white">企業方案</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">支援</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">幫助中心</a></li>
                <li><a href="#" className="hover:text-white">聯絡我們</a></li>
                <li><a href="#" className="hover:text-white">安全中心</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">關於</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">關於我們</a></li>
                <li><a href="#" className="hover:text-white">職涯機會</a></li>
                <li><a href="#" className="hover:text-white">投資人關係</a></li>
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
