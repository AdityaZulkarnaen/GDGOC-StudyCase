export default function NoResults({ searchQuery }) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500">No books found matching "{searchQuery}"</p>
    </div>
  );
}
