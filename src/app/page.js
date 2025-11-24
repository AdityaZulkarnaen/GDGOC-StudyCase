'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/modules/Hero/Hero';
import ReadingList from '@/modules/ReadingList/ReadingList';
import BooksForYou from '@/modules/BooksForYou/BooksForYou';

export default function Home() {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleBookClick = (bookId) => {
    setSelectedBookId(bookId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onScrollChange={setScrolled} onSearch={handleSearch} />
      <Hero selectedBookId={selectedBookId} scrolled={scrolled} />
      <ReadingList onBookClick={handleBookClick} searchQuery={searchQuery} />
      <BooksForYou onBookClick={handleBookClick} searchQuery={searchQuery} />
    </div>
  );
}
