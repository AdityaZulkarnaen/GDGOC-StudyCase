import { useRouter } from 'next/navigation';

export default function OrderSummary({ selectedCount, total, formatPrice }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-bold text-[#252B42] mb-6">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Selected Items</span>
          <span>{selectedCount} items</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between text-lg font-bold text-[#252B42]">
            <span>Total</span>
            <span className="text-[#007AFF]">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <button
        disabled={selectedCount === 0}
        className="w-full bg-[#007AFF] text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Checkout ({selectedCount})
      </button>

      <button
        onClick={() => router.push('/')}
        className="w-full mt-3 border border-[#007AFF] text-[#007AFF] py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
}
