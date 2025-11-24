import Card from '@/components/Card';

export default function BookGrid({ books, onBookClick }) {
  return (
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
  );
}
