import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: '林小姐',
    company: '新創公司創辦人',
    content: '透過Catcher找到了完美的設計師，不僅專業水準高，溝通也很順暢。我們的品牌形象因此大大提升！',
    rating: 5,
    avatar: 'https://via.placeholder.com/60x60?text=L'
  },
  {
    id: 2,
    name: '陳先生',
    company: '電商經營者',
    content: '這裡的開發者真的很厲害，幫我們建立的網站不僅美觀，功能也很完整。強烈推薦！',
    rating: 5,
    avatar: 'https://via.placeholder.com/60x60?text=C'
  },
  {
    id: 3,
    name: '王小姐',
    company: '行銷企劃',
    content: '從Logo設計到宣傳影片，所有的創作需求都能在這裡找到合適的人才。品質超乎預期！',
    rating: 5,
    avatar: 'https://via.placeholder.com/60x60?text=W'
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-fluid">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied clients who found their perfect creative partners on Catcher
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card p-6">
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-primary-500 mr-3" />
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
