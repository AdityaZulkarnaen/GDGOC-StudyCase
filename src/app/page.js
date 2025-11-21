import Navbar from '@/global/components/Navbar';
import ProductDetailSection from '@/modules/ProductDetail/ProductDetailSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProductDetailSection />
    </div>
  );
}
