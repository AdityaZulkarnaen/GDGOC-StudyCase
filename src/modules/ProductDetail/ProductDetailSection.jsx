'use client';

import { useState } from 'react';

export default function ProductDetailSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/book-image.jpg', // Placeholder - replace with actual image
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <a href="#" className="hover:text-gray-900">Home</a>
          <span>&gt;</span>
          <span className="text-gray-400">Shop</span>
        </div>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-lg p-8">
          {/* Left Side - Image Gallery */}
          <div className="flex flex-col">
            <div className="relative bg-gray-200 rounded-lg overflow-hidden mb-4" style={{ height: '500px' }}>
              {/* Main Image */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-64 h-96 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-900 rounded-lg shadow-2xl flex items-center justify-center relative">
                  <div className="absolute top-4 left-4 text-white text-sm transform -rotate-90 origin-top-left">
                    <div className="text-xs mb-2">BEYOND</div>
                    <div className="text-xs">THE STARS</div>
                  </div>
                  <div className="text-white text-center">
                    <div className="text-sm mb-2">Book Cover</div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-xs">🌙</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50"
              >
                <span className="text-2xl">&lt;</span>
              </button>
              <button 
                onClick={() => setCurrentImageIndex(Math.min(images.length - 1, currentImageIndex + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50"
              >
                <span className="text-2xl">&gt;</span>
              </button>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Beyond the Stars</h1>
            
            {/* Price */}
            <div className="text-3xl font-bold text-gray-900 mb-4">
              $1,139.33
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-gray-600">Availability :</span>
              <span className="text-[#00796B] font-medium">In Stock</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. 
              RELIT official consequent door ENIM RELIT Mollie. Excitation venial 
              consequent sent nostrum met. Author-Marcus pson
            </p>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-8"></div>

            {/* Product Details */}
            <div className="space-y-3 mb-8">
              <div className="flex gap-2">
                <span className="text-gray-600 font-medium">Pages:</span>
                <span className="text-gray-800">328</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-600 font-medium">Publisher:</span>
                <span className="text-gray-800">Noir House Books</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-600 font-medium">ISBN:</span>
                <span className="text-gray-800">978-1-234567-90-6</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-600 font-medium">Published:</span>
                <span className="text-gray-800">January 20, 2024</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-3 mb-8">
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                Self Improvement
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                Technology
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="bg-[#00796B] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#00695C] transition-colors">
                Buy Now
              </button>
              <button className="border border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-xl">❤️</span>
              </button>
              <button className="border border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-xl">🛒</span>
              </button>
              <button className="border border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-xl">👁️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
