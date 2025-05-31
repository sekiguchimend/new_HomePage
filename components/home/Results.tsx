"use client";

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { RESULTS } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function Results() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section ref={ref} className="relative w-full py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">RESULTS</h2>
          <p className="text-xl md:text-2xl font-medium">実績</p>
        </motion.div>
        
        <div className="space-y-16 max-w-5xl mx-auto">
          {RESULTS.map((result, index) => (
            <motion.div
              key={result.id}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 * (index + 1) } }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={result.imageUrl}
                  alt={result.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">{result.client}</p>
                <h3 className="text-xl md:text-2xl font-medium mb-4">
                  {result.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {result.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
          }}
          className="text-center mt-12"
        >
          <Link
            href="/results"
            className="inline-flex items-center text-lg hover:underline"
          >
            View More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}