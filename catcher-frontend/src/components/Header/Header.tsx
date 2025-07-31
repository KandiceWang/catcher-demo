import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Temporary icon components with proper TypeScript props
interface IconProps {
  className?: string;
}

const Search: React.FC<IconProps> = ({ className = "" }) => <span className={className}>🔍</span>;
const Menu: React.FC<IconProps> = ({ className = "" }) => <span className={className}>☰</span>;
const X: React.FC<IconProps> = ({ className = "" }) => <span className={className}>✕</span>;
const Globe: React.FC<IconProps> = ({ className = "" }) => <span className={className}>🌐</span>;
const MessageCircle: React.FC<IconProps> = ({ className = "" }) => <span className={className}>💬</span>;
// import MindmapModal from '../Mindmap/MindmapModal';

// Temporary Mindmap Modal component
interface MindmapModalProps {
  onClose: () => void;
}

const MindmapModal: React.FC<MindmapModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
    <div className="bg-white rounded-lg p-6 max-w-2xl" onClick={(e) => e.stopPropagation()}>
      <h2 className="text-2xl font-bold mb-4">Project Mindmap</h2>
      <p className="mb-4">Mindmap feature coming soon...</p>
      <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
    </div>
  </div>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMindmapOpen, setIsMindmapOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    if (searchQuery) {
      navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-fluid">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-500">
                Catcher
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/services" 
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >
                Browse Services
              </Link>
              <Link 
                to="/creators" 
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >
                Find Talent
              </Link>
              <button 
                onClick={() => setIsMindmapOpen(true)}
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >
                Mindmap
              </button>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search services..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <button className="p-2 text-gray-700 hover:text-primary-500 transition-colors">
                <Globe className="h-5 w-5" />
              </button>

              {/* Contact */}
              <Link 
                to="/contact"
                className="p-2 text-gray-700 hover:text-primary-500 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-2">
                <button className="btn-outline text-sm px-4 py-2">
                  Log In
                </button>
                <button className="btn-primary text-sm px-4 py-2">
                  Sign Up
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search services..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <Link 
                to="/services" 
                className="block text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Services
              </Link>
              <Link 
                to="/creators" 
                className="block text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Talent
              </Link>
              <button 
                onClick={() => {
                  setIsMindmapOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block text-gray-700 hover:text-primary-500 transition-colors"
              >
                Mindmap
              </button>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button className="w-full btn-outline text-sm py-2">
                  Log In
                </button>
                <button className="w-full btn-primary text-sm py-2">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mindmap Modal */}
      {isMindmapOpen && (
        <MindmapModal onClose={() => setIsMindmapOpen(false)} />
      )}
    </>
  );
};

export default Header;
