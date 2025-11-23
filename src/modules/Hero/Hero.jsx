'use client';

import { useState, useEffect } from 'react';
import { CaretRightIcon, ShoppingCartSimpleIcon, EyeIcon, HeartStraightIcon, CaretLeftIcon } from "@phosphor-icons/react";

export default function ProductDetailSection({ selectedBookId, scrolled }) {
  const [currentBookIndex, setCurrentBookIndex] = useState(2);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?page=1');

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        const booksArray = data.books || [];

        setBooks(booksArray);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Update current book index when selectedBookId changes
  useEffect(() => {
    if (selectedBookId && books.length > 0) {
      const index = books.findIndex(book => book._id === selectedBookId);
      if (index !== -1) {
        setCurrentBookIndex(index);
      }
    }
  }, [selectedBookId, books]);

  const book = books[currentBookIndex];

  const handlePrevious = () => {
    if (currentBookIndex > 0) {
      setCurrentBookIndex(currentBookIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentBookIndex < books.length - 1) {
      setCurrentBookIndex(currentBookIndex + 1);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen py-6 font-sans">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center h-96">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen py-6 font-sans">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center h-96">
          <p className="text-gray-500">No book data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-[#FAFAFA] min-h-screen py-6 font-sans pt-24 ${scrolled ? "md:pt-24" : "md:pt-6"}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <a href="#" className="text-[#252B42] font-bold">Home</a>
          <CaretRightIcon className="w-4 h-4 text-[#BDBDBD]" weight='bold' />
          <span className="text-[#BDBDBD] font-bold">Shop</span>
        </div>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Image Gallery */}
          <div className="flex flex-col h-full">
            <div className="relative bg-[#B0B0B0]  overflow-hidden h-full">
              {/* Main Image */}
              <div className="w-full h-full flex items-center justify-center p-8">
                <img
                  src={book.cover_image || '/placeholder.svg'}
                  className="max-h-[350px] w-auto object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevious}
                disabled={currentBookIndex === 0}
                className={`absolute left-4 top-1/2 -translate-y-1/2 bg-transparent rounded-full ${currentBookIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <CaretLeftIcon className="text-6xl text-white" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentBookIndex === books.length - 1}
                className={`absolute right-4 top-1/2 -translate-y-1/2 bg-transparent rounded-full ${currentBookIndex === books.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <CaretRightIcon className="text-6xl text-white" />
              </button>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="flex flex-col">
            {/* Tags */}
            <div className="flex gap-3 mb-8 text-[16px] flex-wrap">
              {book.tags && book.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="px-4 py-2 bg-[#E0E0E0] text-black font-medium rounded-full text-sm">
                  {tag.name}
                </span>
              ))}
            </div>
            <h1 className="text-[32px] font-semibold text-[#252B42] mb-2">{book.title}</h1>

            {/* Price */}
            <div className="text-2xl font-semibold text-[#252B42] mb-2">
              {book.details?.price || 'Price not available'}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#737373] font-semibold">Availability :</span>
              <span className="text-[#23A6F0] font-semibold">In Stock</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8 line-clamp-3">
              {book.summary || 'No description available'}
            </p>

            {/* Product Details */}
            <div className="space-y-3 mb-8">
              <div className="flex gap-2 mb-1">
                <span className="text-gray-600 font-medium">Pages:</span>
                <span className="text-gray-800">{book.details?.total_pages || 'N/A'}</span>
              </div>
              <div className="flex gap-2 mb-1">
                <span className="text-gray-600 font-medium">Publisher:</span>
                <span className="text-gray-800">{book.publisher || 'N/A'}</span>
              </div>
              <div className="flex gap-2 mb-1">
                <span className="text-gray-600 font-medium">ISBN:</span>
                <span className="text-gray-800">{book.details?.isbn || 'N/A'}</span>
              </div>
              <div className="flex gap-2 mb-1">
                <span className="text-gray-600 font-medium">Published:</span>
                <span className="text-gray-800">{book.details?.published_date || 'N/A'}</span>
              </div>
              <div className="flex gap-2 mb-1">
                <span className="text-gray-600 font-medium">Author:</span>
                <span className="text-gray-800">{book.author?.name || 'N/A'}</span>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="bg-[#007AFF] text-white text-[16px] px-3.5 py-2 rounded-xl font-medium hover:bg-blue-600 transition-colors cursor-pointer">
                Buy Now
              </button>
              <button className="border bg-[#DBECFF] p-3 rounded-full transition-colors cursor-pointer">
                <HeartStraightIcon className="text-xl text-black" />
              </button>
              <button className="border bg-[#DBECFF] p-3 rounded-full transition-colors cursor-pointer">
                <ShoppingCartSimpleIcon className="text-xl text-black" />
              </button>
              <button className="border bg-[#DBECFF] p-3 rounded-full transition-colors cursor-pointer">
                <EyeIcon className="text-xl text-black" weight='fill' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
