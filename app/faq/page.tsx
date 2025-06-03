"use client";

import { motion } from 'framer-motion';
import { FAQ_ITEMS } from '@/lib/constants';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export default function FAQPage() {
  return (
    <>
      <AnimatedGradientBackground />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8">FAQ</h1>
            
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm"
                >
                  <h2 className="text-lg font-medium mb-3">
                    {item.question}
                  </h2>
                  <p className="text-gray-600">
                    {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}