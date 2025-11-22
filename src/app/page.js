import Navbar from '@/components/Navbar';
import Hero from '@/modules/Hero/Hero';
import ReadingList from '@/modules/ReadingList/ReadingList';
import BooksForYou from '@/modules/BooksForYou/BooksForYou';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <ReadingList />
      <BooksForYou />
    </div>
  );
}
