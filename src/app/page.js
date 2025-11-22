import Navbar from '@/global/components/Navbar';
import Hero from '@/modules/Hero/Hero';
import ReadingList from '@/modules/ReadingList/ReadingList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <ReadingList />
    </div>
  );
}
