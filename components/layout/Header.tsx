"use client";

import Link from 'next/link';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // モバイルメニューを閉じる
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-black text-2xl font-bold">
            Queue
          </Link>
          
          {/* デスクトップナビゲーション */}
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
          
          {/* ハンバーガーメニューボタン */}
          <button 
            className="md:hidden text-black z-60 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニューを開く"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span 
                className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
                }`}
              />
              <span 
                className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* モバイルメニューオーバーレイ */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* モバイルナビゲーションメニュー */}
      <nav 
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* モバイルメニューヘッダー */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link href="/" className="text-black text-2xl font-bold" onClick={closeMobileMenu}>
              Queue
            </Link>
            <button 
              onClick={closeMobileMenu}
              className="text-gray-500 hover:text-black"
              aria-label="メニューを閉じる"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* モバイルメニュー項目 */}
          <div className="flex-1 py-6">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-6 py-4 text-lg font-medium transition-colors hover:bg-gray-50 ${
                  pathname === item.href ? 'text-black bg-gray-50 border-r-4 border-black' : 'text-gray-700'
                }`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* モバイルメニューフッター */}
          <div className="p-6 border-t border-gray-200">
            <Link 
              href="/contact" 
              className="block w-full py-3 px-6 bg-[#333] text-white text-center rounded-lg font-medium hover:bg-[#555] transition-colors"
              onClick={closeMobileMenu}
            >
              お問い合わせ・資料請求
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}