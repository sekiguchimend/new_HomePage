"use client";

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { VALUES } from '@/lib/constants';

export default function Values() {
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
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">VALUE</h2>
          <p className="text-xl md:text-2xl font-medium">RECORの4つの行動指針</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {VALUES.map((value, index) => (
            <motion.div
              key={value.id}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 * (index + 1) } }
              }}
              className="border border-gray-100 p-8 rounded-lg bg-white"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{value.titleEn}</h3>
              <p className="text-xl mb-6">{value.titleJa}</p>
              
              <div className="space-y-3">
                <p>{value.description1}</p>
                {value.description2 && <p>{value.description2}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}