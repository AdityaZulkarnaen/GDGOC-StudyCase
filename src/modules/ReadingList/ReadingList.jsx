'use client';

import React, { useState, useEffect } from 'react';
import { getWishlist, toggleWishlist } from '@/utils/wishlist';
import EmptyReadingList from './components/EmptyReadingList';
import SectionHeader from './components/SectionHeader';
import NoResults from './components/NoResults';
import BookCarousel from './components/BookCarousel';

const ReadingList = ({ onBookClick, searchQuery }) => {
    const [books, setBooks] = useState([]);
    const [wishlistState, setWishlistState] = useState({});

    useEffect(() => {
        const loadWishlist = () => {
            const wishlistBooks = getWishlist();
            setBooks(wishlistBooks);
            
            const state = {};
            wishlistBooks.forEach(book => {
                state[book.id] = true;
            });
            setWishlistState(state);
        };

        loadWishlist();

        const handleStorageChange = (e) => {
            if (e.key === 'bookstar_wishlist') {
                loadWishlist();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        
        const handleWishlistUpdate = () => {
            loadWishlist();
        };
        
        window.addEventListener('wishlistUpdated', handleWishlistUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
        };
    }, []);

    const handleToggleWishlist = (book) => {
        toggleWishlist(book);
       
        setWishlistState(prev => ({
            ...prev,
            [book.id]: !prev[book.id]
        }));
        
        const updatedWishlist = getWishlist();
        setBooks(updatedWishlist);
        
        window.dispatchEvent(new Event('wishlistUpdated'));
    };

    // Filter books based on search query
    const filteredBooks = searchQuery 
        ? books.filter(book => 
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : books;

    // Empty state
    if (filteredBooks.length === 0 && !searchQuery) {
        return <EmptyReadingList />;
    }

    // Main render
    return (
        <section className="py-16 px-4 bg-[#FAFAFA] font-sans">
            <div className="max-w-7xl mx-auto">
                <SectionHeader 
                    searchQuery={searchQuery} 
                    resultsCount={filteredBooks.length} 
                />

                {filteredBooks.length === 0 && searchQuery ? (
                    <NoResults searchQuery={searchQuery} />
                ) : (
                    <BookCarousel books={filteredBooks} onBookClick={onBookClick} />
                )}
            </div>
        </section>
    );
};

export default ReadingList;
