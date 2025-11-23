'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/modules/Hero/Hero';
import ReadingList from '@/modules/ReadingList/ReadingList';
import BooksForYou from '@/modules/BooksForYou/BooksForYou';

export default function Home() {
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleBookClick = (bookId) => {
    setSelectedBookId(bookId);
    // Scroll to hero section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero selectedBookId={selectedBookId} />
      <ReadingList onBookClick={handleBookClick} />
      <BooksForYou onBookClick={handleBookClick} />
    </div>
  );
}
