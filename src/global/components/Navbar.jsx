export default function Navbar() {
  return (
    <div className="w-full bg-white">
      {/* Top Bar */}
      <div className="bg-[#00796B] text-white px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>(225) 555-0118</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✉️</span>
              <span>michelle.rivera@example.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            Follow Us and get a chance to win 80% off
          </div>
          <div className="flex items-center gap-4">
            <span>Follow Us :</span>
            <div className="flex gap-3">
              <a href="#" className="hover:opacity-80">Instagram</a>
              <a href="#" className="hover:opacity-80">YouTube</a>
              <a href="#" className="hover:opacity-80">Facebook</a>
              <a href="#" className="hover:opacity-80">Twitter</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Bookstar</div>
          
          <ul className="hidden md:flex items-center gap-8 text-gray-600">
            <li><a href="#" className="hover:text-gray-900">Home</a></li>
            <li className="relative group">
              <a href="#" className="hover:text-gray-900 flex items-center gap-1">
                Shop
                <span className="text-xs">▼</span>
              </a>
            </li>
            <li><a href="#" className="hover:text-gray-900">About</a></li>
            <li><a href="#" className="hover:text-gray-900">Blog</a></li>
            <li><a href="#" className="hover:text-gray-900">Contact</a></li>
            <li><a href="#" className="hover:text-gray-900">Pages</a></li>
          </ul>

          <div className="flex items-center gap-6">
            <a href="#" className="text-[#00796B] hover:text-[#00695C] flex items-center gap-2">
              <span>👤</span>
              <span className="hidden lg:inline">Login / Register</span>
            </a>
            <button className="text-gray-600 hover:text-gray-900">
              🔍
            </button>
            <button className="text-gray-600 hover:text-gray-900 relative">
              🛒
              <span className="absolute -top-2 -right-2 bg-[#00796B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                1
              </span>
            </button>
            <button className="text-gray-600 hover:text-gray-900 relative">
              ❤️
              <span className="absolute -top-2 -right-2 bg-[#00796B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                1
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
