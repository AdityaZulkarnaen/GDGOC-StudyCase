import Card from '@/components/Card';

export default function BookCarousel({ books, onBookClick }) {
  return (
    <div className="relative">
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 scroll-smooth">
        {books.map((book) => (
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
  );
}
