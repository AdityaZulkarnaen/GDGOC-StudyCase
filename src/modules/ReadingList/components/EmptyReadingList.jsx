export default function EmptyReadingList() {
  return (
    <section className="py-16 px-4 bg-[#FAFAFA] font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[32px] font-semibold text-[#252B42] mb-6 text-start">
          Your Reading List
        </h2>
        <hr className="bg-[#ECECEC] h-0.5 mb-6" />
        <div className="text-center py-12">
          <p className="text-gray-500">
            No books in your reading list. Click the heart icon on any book to add it here!
          </p>
        </div>
      </div>
    </section>
  );
}
