'use client';

import { useState, useEffect } from 'react';
import Breadcrumb from './components/Breadcrumb';
import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';
import { fetchAllBooks } from '@/services/bookService';

export default function ProductDetailSection({ selectedBookId, scrolled }) {
  const [currentBookIndex, setCurrentBookIndex] = useState(90);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const booksData = await fetchAllBooks();
        setBooks(booksData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading books:', err);
        setLoading(false);
      }
    };

    loadBooks();
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
        <Breadcrumb />

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ImageGallery
            book={book}
            currentBookIndex={currentBookIndex}
            totalBooks={books.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
          <ProductInfo book={book} />
        </div>
      </div>
    </div>
  );
}
