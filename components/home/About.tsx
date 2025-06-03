"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: 0.8
      }
    }
  };

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#a8d0f0] via-[#ccd0f0] to-[#e7d0f2]">
      <div ref={ref} className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <h2 className="text-6xl font-bold mb-4">
              <span className="text-purple-700">A</span>BOUT
            </h2>
            <p className="text-2xl font-medium mb-10">私たちについて</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
            }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-medium">すべての人にAIの力を届ける</h3>
            
            <div className="space-y-4">
              <p>Queue株式会社は、生成AIとオートメーションを軸としたSaaSプロダクトを提供する、東京・銀座発のテックカンパニーです。</p>
              
              <p>「プロンプトの経済圏をつくる」ことをミッションに、すべての人にAIの力を届けるためのプロダクトを創り続けています。</p>
              
              <p>最新の生成AI技術を活用し、プロンプトマーケットプレイス「Prompty」、社内AIチャットボット「Workmate」により、</p>
              
              <p>ビジネスの効率化から新しい価値創造まで、包括的にサポートします。</p>
              
              <p>AIエンジニア・デザイナーなど精鋭10名のチームで、最短1週間でのAI導入を実現し、あらゆる企業のDXを加速させています。</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}