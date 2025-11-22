'use client';

import { useState } from 'react';
import { CaretRightIcon, ShoppingCartSimpleIcon, EyeIcon, HeartStraightIcon } from "@phosphor-icons/react";

export default function ProductDetailSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/book-image.jpg', 
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-6 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <a href="#" className="text-[#252B42] font-bold">Home</a>
            <CaretRightIcon className="w-4 h-4 text-[#BDBDBD]" weight='bold'/>
          <span className="text-[#BDBDBD] font-bold">Shop</span>
        </div>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Image Gallery */}
          <div className="flex flex-col h-full">
            <div className="relative bg-gray-200  overflow-hidden h-full">
              {/* Main Image */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-64 h-96 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-900 rounded-lg shadow-2xl flex items-center justify-center relative">
                  <div className="text-white text-center">
                    <div className="text-sm mb-2">Book Cover</div>
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
            {/* Tags */}
            <div className="flex gap-3 mb-8 text-[16px]">
              <span className="px-4 py-2 bg-[#E0E0E0] text-black font-medium rounded-full text-sm">
                Self Improvement
              </span>
              <span className="px-4 py-2 bg-[#E0E0E0] text-black font-medium rounded-full text-sm">
                Technology
              </span>
            </div>
            <h1 className="text-[32px] font-semibold text-[#252B42] mb-2">Beyond the Stars</h1>
            
            {/* Price */}
            <div className="text-2xl font-semibold text-[#252B42] mb-2">
              $1,139.33
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#737373] font-semibold">Availability :</span>
              <span className="text-[#23A6F0] font-semibold">In Stock</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. 
              RELIT official consequent door ENIM RELIT Mollie. Excitation venial 
              consequent sent nostrum met. Author-Marcus pson
            </p>

            {/* Product Details */}
            <div className="space-y-3 mb-8">
              <div className="flex gap-2 mb-1">
                <span className="text-gray-600 font-medium">Pages:</span>
                <span className="text-gray-800">328</span>
              </div>
              <div className="flex gap-2 mb-1">
                <span className="text-gray-600 font-medium">Publisher:</span>
                <span className="text-gray-800">Noir House Books</span>
              </div>
              <div className="flex gap-2 mb-1">
                <span className="text-gray-600 font-medium">ISBN:</span>
                <span className="text-gray-800">978-1-234567-90-6</span>
              </div>
              <div className="flex gap-2 mb-1">
                <span className="text-gray-600 font-medium">Published:</span>
                <span className="text-gray-800">January 20, 2024</span>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="bg-[#007AFF] text-white text-[16px] px-3.5 py-2 rounded-xl font-medium hover:bg-[#00695C] transition-colors">
                Buy Now
              </button>
              <button className="border bg-[#DBECFF] p-3 rounded-full transition-colors">
                <HeartStraightIcon className="text-xl text-black" />
              </button>
              <button className="border bg-[#DBECFF] p-3 rounded-full transition-colors">
                <ShoppingCartSimpleIcon className="text-xl text-black" />
              </button>
              <button className="border bg-[#DBECFF] p-3 rounded-full transition-colors">
                <EyeIcon className="text-xl text-black" weight='fill'/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
