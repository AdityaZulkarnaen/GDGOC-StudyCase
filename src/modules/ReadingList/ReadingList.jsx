'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/Card';
import { getWishlist, isInWishlist as checkIsInWishlist, toggleWishlist } from '@/utils/wishlist';

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

    if (filteredBooks.length === 0 && !searchQuery) {
        return (
            <section className="py-16 px-4 bg-[#FAFAFA] font-sans">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-[32px] font-semibold text-[#252B42] mb-6 text-start">
                        Your Reading List
                    </h2>
                    <hr className="bg-[#ECECEC] h-0.5 mb-6" />
                    <div className="text-center py-12">
                        <p className="text-gray-500">No books in your reading list. Click the heart icon on any book to add it here!</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 px-4 bg-[#FAFAFA] font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <h2 className="text-[32px] font-semibold text-[#252B42] mb-6 text-start">
                    Your Reading List {searchQuery && `(${filteredBooks.length} results)`}
                </h2>

                {/* Seperator */}
                <hr className="bg-[#ECECEC] h-0.5 mb-6" />

                {/* No Results Message */}
                {filteredBooks.length === 0 && searchQuery && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No books found matching "{searchQuery}"</p>
                    </div>
                )}

                {/* Cards Grid */}
                {filteredBooks.length > 0 && (
                    <div className="relative">
                        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 scroll-smooth">
                            {filteredBooks.map((book) => (
                                <div key={book.id} className="shrink-0 w-[280px] snap-center h-full">
                                    <Card
                                        title={book.title}
                                        category={book.category}
                                        price={book.price}
                                        image={book.image}
                                        onClick={() => onBookClick(book.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ReadingList;
