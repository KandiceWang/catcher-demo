import React from 'react';
import { Palette, Code, Camera, Megaphone, Video, Music, FileText, Briefcase } from 'lucide-react';

const categories = [
  { id: 'design', name: '平面設計', icon: Palette, color: 'bg-blue-500' },
  { id: 'development', name: '程式開發', icon: Code, color: 'bg-green-500' },
  { id: 'photography', name: '攝影攝像', icon: Camera, color: 'bg-purple-500' },
  { id: 'marketing', name: '數位行銷', icon: Megaphone, color: 'bg-orange-500' },
  { id: 'video', name: '影片編輯', icon: Video, color: 'bg-red-500' },
  { id: 'music', name: '音樂製作', icon: Music, color: 'bg-indigo-500' },
  { id: 'writing', name: '文案寫作', icon: FileText, color: 'bg-yellow-500' },
  { id: 'business', name: '商業諮詢', icon: Briefcase, color: 'bg-gray-500' },
];

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-fluid">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect freelancer for your project across all creative and technical disciplines
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group cursor-pointer p-6 rounded-lg border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all duration-200"
              >
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                  {category.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
