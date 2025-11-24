import { useRouter } from 'next/navigation';

export default function EmptyCart() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#252B42] mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-[#007AFF] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
