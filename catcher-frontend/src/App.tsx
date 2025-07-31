import React from 'react';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-blue-600">Catcher</div>
            <nav className="space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Creators</a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Connecting clients in<br />
              need to freelancers<br />
              who deliver
            </h1>
            <div className="max-w-2xl mx-auto">
              <div className="flex bg-white rounded-full shadow-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Search by role, or keywords"
                  className="flex-1 px-6 py-4 text-lg border-none outline-none"
                />
                <button className="bg-red-500 text-white px-8 py-4 hover:bg-red-600 transition-colors">
                  Search
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10k+</div>
                <div className="text-gray-600">Active Creators</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50k+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['平面設計', '程式開發', '攝影攝像', '數位行銷', '影片編輯', '音樂製作', '文案寫作', '商業諮詢'].map((category, index) => (
                <div key={index} className="p-6 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white text-xl">📱</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{category}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
