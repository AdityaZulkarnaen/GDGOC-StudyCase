'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/modules/Hero/Hero';
import ReadingList from '@/modules/ReadingList/ReadingList';
import BooksForYou from '@/modules/BooksForYou/BooksForYou';

export default function Home() {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const handleBookClick = (bookId) => {
    setSelectedBookId(bookId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onScrollChange={setScrolled} />
      <Hero selectedBookId={selectedBookId} scrolled={scrolled} />
      <ReadingList onBookClick={handleBookClick} />
      <BooksForYou onBookClick={handleBookClick} />
    </div>
  );
}
