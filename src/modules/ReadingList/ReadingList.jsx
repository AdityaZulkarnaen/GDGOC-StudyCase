'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/Card';
import { fetchAllBooks } from '@/services/bookService';

const ReadingList = ({ onBookClick }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                
                const booksData = await fetchAllBooks();

                const mappedBooks = booksData.slice(5, 9).map((book) => ({
                    id: book._id,
                    title: book.title,
                    category: book.category?.name || 'General',
                    price: book.details?.price || '10.0',
                    image: book.cover_image || '/images/placeholder.jpg',
                }));

                setBooks(mappedBooks);
                setLoading(false);
            } catch (err) {
                console.error('Error loading books:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    if (loading) {
        return (
            <section className="py-16 px-4 bg-[#FAFAFA] font-sans">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-[32px] font-semibold text-[#252B42] mb-6 text-start">
                        Your Reading List
                    </h2>
                    <hr className="bg-[#ECECEC] h-0.5 mb-6" />
                    <div className="text-center py-12">
                        <p className="text-gray-500">Loading books...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 px-4 bg-[#FAFAFA] font-sans">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-[32px] font-semibold text-[#252B42] mb-6 text-start">
                        Your Reading List
                    </h2>
                    <hr className="bg-[#ECECEC] h-0.5 mb-6" />
                    <div className="text-center py-12">
                        <p className="text-red-500">Error: {error}</p>
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
                    Your Reading List
                </h2>

                {/* Seperator */}
                <hr className="bg-[#ECECEC] h-0.5 mb-6" />

                {/* Cards Grid */}
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none scrollbar-hide pb-4">
                    {books.map((book) => (
                        <div key={book.id} className="shrink-0 w-[280px] md:w-auto snap-center h-full">
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
        </section>
    );
};

export default ReadingList;
