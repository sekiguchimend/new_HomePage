import Link from 'next/link';
import { NAVIGATION_ITEMS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="text-black text-2xl font-bold">
              Queue
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              © {new Date().getFullYear()} Queue株式会社 All Rights Reserved.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">サイトマップ</h3>
              <ul className="space-y-2">
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">お問い合わせ</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/contact" 
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    お問い合わせ・資料請求
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}