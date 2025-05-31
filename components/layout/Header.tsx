"use client";

import Link from 'next/link';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-black text-2xl font-bold">
          Queue
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-black/70 ${
                pathname === item.href ? 'text-black' : 'text-black/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <Link 
            href="/contact" 
            className="px-5 py-2 bg-[#333] text-white rounded-full text-sm font-medium hover:bg-[#555] transition-colors"
          >
            お問い合わせ・資料請求
          </Link>
        </nav>
        
        <button className="md:hidden text-black">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}