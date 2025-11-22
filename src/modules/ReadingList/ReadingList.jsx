import React from 'react';
import Card from './Card';

const ReadingList = () => {
  const books = [
    {
      id: 1,
      title: 'Graphic Design',
      category: 'Business',
      oldPrice: '16.4',
      newPrice: '6.4',
      image: '/images/book1.jpg',
    },
    {
      id: 2,
      title: 'User Experience',
      category: 'Engineering',
      oldPrice: '16.4',
      newPrice: '6.4',
      image: '/images/book2.jpg',
    },
    {
      id: 3,
      title: 'My Little Star',
      category: 'Fantasy',
      oldPrice: '16.4',
      newPrice: '6.4',
      image: '/images/book3.jpg',
    },
    {
      id: 4,
      title: 'Think Different',
      category: 'Self Improvement',
      oldPrice: '16.4',
      newPrice: '6.8',
      image: '/images/book4.jpg',
    }
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Card
              key={book.id}
              title={book.title}
              category={book.category}
              oldPrice={book.oldPrice}
              newPrice={book.newPrice}
              image={book.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReadingList;
