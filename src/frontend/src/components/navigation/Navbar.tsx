import React, { useState } from 'react';

interface NavbarProps {
  isTransparent?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isTransparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navClasses = isTransparent 
    ? "absolute top-0 left-0 right-0 z-50 bg-transparent"
    : "bg-white shadow-sm border-b border-gray-200";

  const textClasses = isTransparent 
    ? "text-white"
    : "text-gray-900";

  const linkClasses = isTransparent
    ? "text-white hover:text-catcher-coral transition-colors"
    : "text-gray-700 hover:text-catcher-coral transition-colors";

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className={`text-2xl font-bold ${textClasses}`}>
            <span className="text-catcher-coral">Catcher</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className={linkClasses}>
              找人才
            </a>
            <a href="#" className={linkClasses}>
              找工作
            </a>
            <a href="#" className={linkClasses}>
              為什麼選擇 Catcher
            </a>
            <a href="#" className={linkClasses}>
              企業方案
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={`${linkClasses} font-medium`}>
              登入
            </button>
            <button className="bg-catcher-coral text-white px-6 py-2 rounded-lg hover:bg-catcher-pink transition-colors font-medium shadow-lg">
              註冊
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`${textClasses} focus:outline-none`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 border-opacity-20">
            <div className="flex flex-col space-y-4">
              <a href="#" className={linkClasses}>
                找人才
              </a>
              <a href="#" className={linkClasses}>
                找工作
              </a>
              <a href="#" className={linkClasses}>
                為什麼選擇 Catcher
              </a>
              <a href="#" className={linkClasses}>
                企業方案
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 border-opacity-20">
                <button className={`${linkClasses} text-left`}>
                  登入
                </button>
                <button className="bg-catcher-coral text-white px-6 py-2 rounded-lg hover:bg-catcher-pink transition-colors font-medium">
                  註冊
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
