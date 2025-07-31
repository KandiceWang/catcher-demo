import React from 'react';
import { X } from 'lucide-react';

interface MindmapModalProps {
  onClose: () => void;
}

const MindmapModal: React.FC<MindmapModalProps> = ({ onClose }) => {
  return (
    <div className="mindmap-overlay" onClick={onClose}>
      <div className="mindmap-container" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Project Architecture</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="relative bg-gray-50 rounded-lg p-8 min-h-[500px]">
          {/* Central Node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold text-center">
              Catcher Platform
            </div>
          </div>

          {/* Frontend Node */}
          <div className="absolute top-20 left-20">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
              React Frontend
            </div>
          </div>

          {/* Backend Node */}
          <div className="absolute top-20 right-20">
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">
              Firebase Backend
            </div>
          </div>

          {/* Database Node */}
          <div className="absolute bottom-20 left-20">
            <div className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm">
              Firestore DB
            </div>
          </div>

          {/* Auth Node */}
          <div className="absolute bottom-20 right-20">
            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm">
              Authentication
            </div>
          </div>

          {/* Features */}
          <div className="absolute top-1/2 left-10 transform -translate-y-1/2">
            <div className="bg-gray-200 px-3 py-2 rounded text-sm">
              Service Marketplace
            </div>
          </div>

          <div className="absolute top-1/2 right-10 transform -translate-y-1/2">
            <div className="bg-gray-200 px-3 py-2 rounded text-sm">
              Creator Profiles
            </div>
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#6b7280" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#6b7280" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#6b7280" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#6b7280" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="20%" y2="50%" stroke="#6b7280" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="#6b7280" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MindmapModal;
