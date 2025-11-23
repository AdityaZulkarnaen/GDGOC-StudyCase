'use client';

import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Dummy from '../../../public/placeholder.svg';

const BooksForYou = ({ onBookClick }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?page=1');

                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }

                const data = await response.json();

                // Ambil 8 buku dari response untuk ditampilkan dalam 2 baris
                const booksArray = data.books || [];
                const booksData = booksArray.slice(0, 8).map((book) => ({
                    id: book._id,
                    title: book.title,
                    category: book.category?.name || 'General',
                    price: book.details?.price || 'Rp 160,000',
                    image: book.cover_image || Dummy,
                }));

                setBooks(booksData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching books:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return (
            <section className="py-16 px-4 bg-[#FAFAFA] font-sans">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-[32px] font-semibold text-[#252B42] mb-6 text-start">
                        Books For You
                    </h2>

                    {/* Seperator */}
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
                        Books For You
                    </h2>
                    {/* Seperator */}
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
                    Books For You
                </h2>
                {/* Seperator */}
                <hr className="bg-[#ECECEC] h-0.5 mb-6" />

                {/* Cards Grid - 2 rows of 4 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <Card
                            key={book.id}
                            title={book.title}
                            category={book.category}
                            price={book.price}
                            image={book.image}
                            onClick={() => onBookClick(book.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BooksForYou;
