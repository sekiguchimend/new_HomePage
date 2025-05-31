"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const NEWS_ITEMS = [
  {
    id: '1',
    date: '2025.05.12',
    title: 'コーポレートサイト公開のお知らせ',
    link: '/news/corporate-site-release'
  }
];

export default function News() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="border-b border-gray-200 pb-4">
          {NEWS_ITEMS.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-8"
            >
              <span className="text-sm font-medium text-gray-600">
                {item.date}
              </span>
              <span className="hidden md:block text-gray-300">|</span>
              <Link 
                href={item.link}
                className="text-base hover:underline"
              >
                {item.title}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}