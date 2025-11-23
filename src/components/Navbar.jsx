"use client";
import React, { useEffect, useRef, useState } from "react";
import { EnvelopeIcon, PhoneIcon, UserIcon, MagnifyingGlassIcon, ShoppingCartSimpleIcon, HeartIcon, CaretDownIcon, ListIcon, XIcon } from "@phosphor-icons/react";

export default function Navbar({ onScrollChange }) {
  const topbarRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const topbarEl = topbarRef.current;
    const topbarHeight = topbarEl ? topbarEl.offsetHeight : 0;

    function onScroll() {
      const isScrolled = window.scrollY > topbarHeight;
      setScrolled(isScrolled);
      if (onScrollChange) {
        onScrollChange(isScrolled);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScrollChange]);

  return (
    <div className="w-full bg-white font-sans font-semibold">
      {/* Top Bar */}
      <div
        ref={topbarRef}
        className={`hidden md:block bg-[#00796B] text-white px-6 py-3 transition-transform duration-300 ease-in-out ${scrolled ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-8">
            <div className="flex items-center font-light gap-2">
              <PhoneIcon className="w-5 h-5" />
              <span>(225) 555-0118</span>
            </div>
            <div className="flex items-center justify-center font-light gap-2">
              <EnvelopeIcon className="w-5 h-5" />
              <span>michelle.rivera@example.com</span>
            </div>
          </div>
          <div className="hidden font-semibold md:block">Follow Us and get a chance to win 80% off</div>
          <div className="flex font-light items-center gap-4">
            <span>Follow Us :</span>
            <div className="flex gap-3 items-center justify-center">
              <a href="#" className="hover:opacity-80">
                <img src="/instagram.svg" alt="Instagram" className="w-8 h-8" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src="/youtube.svg" alt="YouTube" className="w-6 h-6" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src="/facebook.svg" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src="/twitter.svg" alt="Twitter" className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`bg-white border-b px-6 py-4 font-sans top-0 z-999 fixed md:relative w-full ${scrolled ? "md:fixed lg:fixed" : ""}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-[24px] font-bold text-[#252B42]">Bookstar</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 text-[#737373] text-sm">
            <li>
              <a href="#" className="hover:text-gray-900">
                Home
              </a>
            </li>
            <li className="relative group">
              <a href="#" className="hover:text-gray-900 flex items-center gap-1 text-black font-semibold">
                Shop
                <CaretDownIcon className="w-3 h-3" weight="bold" />
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Pages
              </a>
            </li>
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center justify-center gap-6">
            <a href="#" className="text-[#23A6F0] hover:text-[#23A6F0] flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-[#23A6F0]" />
              <span className="hidden font-semibold lg:inline">Login / Register</span>
            </a>
            <button className="text-gray-600 hover:text-gray-900">
              <MagnifyingGlassIcon className="w-5 h-5 text-[#23A6F0]" />
            </button>
            <button className="text-gray-600 hover:text-gray-900 flex w-fit flex-row relative">
              <ShoppingCartSimpleIcon className="w-5 h-5 text-[#23A6F0]" />
              <p className="ml-1 text-[#23A6F0]">1</p>
            </button>
            <button className="text-gray-600 hover:text-gray-900 flex w-fit flex-row relative">
              <HeartIcon className="w-5 h-5 text-[#23A6F0]" />
              <p className="ml-1 text-[#23A6F0]">1</p>
            </button>
          </div>

          {/* Mobile Burger Menu*/}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          > {mobileMenuOpen ?
            <XIcon className="w-6 h-6" weight="bold" />
          : 
            <ListIcon className="w-6 h-6" weight="bold" />
          }
          </button>
        </div>

        <div
          className={`md:hidden fixed left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "top-[68px] opacity-100" : "-top-full opacity-0"
          } ${scrolled ? "fixed" : "fixed"}`}
        >
          <div className="flex flex-col items-center py-8 gap-6">
            <ul className="flex flex-col items-center gap-6 text-[#737373] text-lg">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 flex items-center gap-1 text-black font-semibold">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Pages
                </a>
              </li>
            </ul>

            <div className="flex flex-col items-center gap-6 pt-4 w-full">
              <a href="#" className="text-[#23A6F0] hover:text-[#23A6F0] flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-[#23A6F0]" />
                <span className="font-semibold">Login / Register</span>
              </a>
              <div className="flex flex-col items-center gap-6">
                <button className="text-gray-600 hover:text-gray-900">
                  <MagnifyingGlassIcon className="w-6 h-6 text-[#23A6F0]" />
                </button>
                <button className="text-gray-600 hover:text-gray-900 flex flex-row relative">
                  <ShoppingCartSimpleIcon className="w-6 h-6 text-[#23A6F0]" />
                  <p className="ml-1 text-[#23A6F0]">1</p>
                </button>
                <button className="text-gray-600 hover:text-gray-900 flex flex-row relative">
                  <HeartIcon className="w-6 h-6 text-[#23A6F0]" />
                  <p className="ml-1 text-[#23A6F0]">1</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
