import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import FeaturedServices from './components/FeaturedServices';
import TestimonialsSection from './components/TestimonialsSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Featured Services */}
      <FeaturedServices />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 bg-primary-500">
        <div className="container-fluid text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators and clients already using Catcher to bring their projects to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary px-8 py-3">
              Start as a Client
            </button>
            <button className="bg-white text-primary-500 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Join as a Creator
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
