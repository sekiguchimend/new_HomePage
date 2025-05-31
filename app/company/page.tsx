"use client";

import { motion } from 'framer-motion';
import { COMPANY_INFO } from '@/lib/constants';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export default function CompanyPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-8">会社概要</h1>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <dl className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <dt className="text-gray-600">会社名</dt>
                  <dd className="md:col-span-3">{COMPANY_INFO.name}</dd>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <dt className="text-gray-600">所在地</dt>
                  <dd className="md:col-span-3">{COMPANY_INFO.address}</dd>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <dt className="text-gray-600">設立年</dt>
                  <dd className="md:col-span-3">{COMPANY_INFO.established}</dd>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <dt className="text-gray-600">代表</dt>
                  <dd className="md:col-span-3">{COMPANY_INFO.representative}</dd>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <dt className="text-gray-600">事業内容</dt>
                  <dd className="md:col-span-3">
                    <ul className="list-disc list-inside space-y-2">
                      {COMPANY_INFO.business.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}