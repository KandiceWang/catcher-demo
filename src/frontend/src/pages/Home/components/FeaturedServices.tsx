import React from 'react';
import { Star, Clock, ArrowRight } from 'lucide-react';

const mockServices = [
  {
    id: 1,
    title: '專業Logo設計',
    creator: '設計師小明',
    price: 1500,
    rating: 4.8,
    reviewCount: 127,
    image: 'https://via.placeholder.com/300x200?text=Logo+Design',
    category: '平面設計'
  },
  {
    id: 2,
    title: '插畫繪製服務',
    creator: '插畫家小美',
    price: 2000,
    rating: 4.9,
    reviewCount: 89,
    image: 'https://via.placeholder.com/300x200?text=Illustration',
    category: '插畫設計'
  },
  {
    id: 3,
    title: '網站UI/UX設計',
    creator: 'UX設計師小王',
    price: 8000,
    rating: 4.7,
    reviewCount: 156,
    image: 'https://via.placeholder.com/300x200?text=UI+UX+Design',
    category: 'UI/UX設計'
  },
  {
    id: 4,
    title: '影片剪輯制作',
    creator: '影片製作人小李',
    price: 3500,
    rating: 4.9,
    reviewCount: 203,
    image: 'https://via.placeholder.com/300x200?text=Video+Editing',
    category: '影片製作'
  }
];

const FeaturedServices: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-fluid">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Services
            </h2>
            <p className="text-gray-600">
              Discover high-quality services from top-rated creators
            </p>
          </div>
          <button className="btn-outline flex items-center space-x-2">
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockServices.map((service) => (
            <div key={service.id} className="card overflow-hidden hover:scale-105 transition-transform duration-200">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="card-body">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="badge badge-secondary text-xs">
                    {service.category}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  by {service.creator}
                </p>
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">
                    {service.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({service.reviewCount})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary-500">
                    NT$ {service.price.toLocaleString()}
                  </span>
                  <button className="btn-primary text-sm px-4 py-2">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
