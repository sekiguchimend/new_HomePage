"use client";

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { BUSINESS_SERVICES } from '@/lib/constants';

export default function Business() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section ref={ref} className="relative w-full py-20 md:py-28 bg-gradient-to-br from-[#a8d0f0] via-[#ccd0f0] to-[#e7d0f2]">
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
          <h2 className="text-5xl md:text-6xl font-bold mb-4">BUSINESS</h2>
          <p className="text-xl md:text-2xl font-medium">事業内容</p>
        </motion.div>
        
        <div className="space-y-16 max-w-5xl">
          {BUSINESS_SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 * (index + 1) } }
              }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6"
            >
              <div className="md:col-span-1 flex items-start">
                <span className="text-4xl font-light text-gray-400">{service.id}</span>
              </div>
              
              <div className="md:col-span-4">
                <h3 className="text-2xl md:text-3xl font-medium mb-4">
                  {service.title}
                </h3>
                <p className="text-base md:text-lg">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}