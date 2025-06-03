"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { VALUES } from '@/lib/constants';

export default function Values() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-gradient-to-br from-white via-[#f0f8ff] to-[#f5f0ff]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-purple-700">V</span>ALUE
          </h2>
          <p className="text-xl md:text-2xl font-medium">価値観</p>
        </motion.div>
        
        <div className="space-y-16 max-w-5xl">
          {VALUES.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className="group grid grid-cols-1 md:grid-cols-5 gap-6 hover:bg-white/40 rounded-xl p-6 transition-all duration-300"
            >
              <div className="md:col-span-1 flex items-start">
                <span className="text-4xl font-light text-gray-400">{(index + 1).toString().padStart(2, '0')}</span>
              </div>
              
              <div className="md:col-span-4">
                <h3 className="text-2xl md:text-3xl font-medium mb-2 group-hover:translate-x-2 transition-transform duration-300">
                  {value.titleEn}
                </h3>
                <p className="text-lg text-blue-600 mb-4">{value.titleJa}</p>
              <div className="space-y-3">
                  <p className="text-base md:text-lg">{value.description1}</p>
                  {value.description2 && <p className="text-base md:text-lg">{value.description2}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}