import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Simple components for testing
const Header: React.FC = () => (
  <header className="bg-white shadow-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="text-2xl font-bold text-blue-600">Catcher</div>
        <nav className="space-x-8">
          <a href="/services" className="text-gray-700 hover:text-blue-600">Services</a>
          <a href="/creators" className="text-gray-700 hover:text-blue-600">Creators</a>
        </nav>
      </div>
    </div>
  </header>
);

const Home: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
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
            <button className="bg-red-500 text-white px-8 py-4 hover:bg-red-600">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const Services: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold">Services</h1>
    <p>Services page coming soon...</p>
  </div>
);

const Creators: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold">Creators</h1>
    <p>Creators page coming soon...</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/creators" element={<Creators />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
