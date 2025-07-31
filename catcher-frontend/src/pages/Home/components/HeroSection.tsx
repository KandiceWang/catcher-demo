import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'talent' | 'jobs'>('talent');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    if (searchQuery) {
      if (activeTab === 'talent') {
        navigate(`/creators?search=${encodeURIComponent(searchQuery)}`);
      } else {
        navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="container-fluid">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Connecting clients in<br />
            need to freelancers<br />
            who deliver
          </h1>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="inline-flex bg-white rounded-full p-2 shadow-lg mb-6">
              <button
                onClick={() => setActiveTab('talent')}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  activeTab === 'talent'
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Find talent
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  activeTab === 'jobs'
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Browse jobs
              </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex bg-white rounded-full shadow-lg overflow-hidden">
                <input
                  type="text"
                  name="search"
                  placeholder={
                    activeTab === 'talent' 
                      ? "Search by role, or keywords" 
                      : "Search for services"
                  }
                  className="flex-1 px-6 py-4 text-lg border-none outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="bg-secondary-500 text-white px-8 py-4 hover:bg-red-600 transition-colors flex items-center space-x-2"
                >
                  <Search className="h-5 w-5" />
                  <span className="font-medium">search</span>
                </button>
              </div>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">10k+</div>
              <div className="text-gray-600">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">50k+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
