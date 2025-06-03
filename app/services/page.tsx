"use client";

import { motion } from 'framer-motion';
import { BUSINESS_SERVICES } from '@/lib/constants';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export default function ServicesPage() {
  return (
    <>
      <AnimatedGradientBackground />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Services</h1>
            
            <div className="space-y-20">
              {BUSINESS_SERVICES.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    <span className="text-4xl font-light text-gray-400">{service.id}</span>
                    <h2 className="text-2xl md:text-3xl font-medium">{service.title}</h2>
                  </div>
                  
                  <p className="text-base md:text-lg leading-relaxed">
                    {service.description}
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