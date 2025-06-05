"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Download, MessageCircle } from 'lucide-react';

export default function Hero() {
  const [currentText, setCurrentText] = useState('');
  const fullText = 'AIプロダクト';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setCurrentText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    
    return () => clearInterval(timer);
  }, []);

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

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        delay: 1.2
      }
    }
  };

  return (
    <section className="relative w-full pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden">
      <div className="container relative mx-auto px-4">
        <motion.div 
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 font-medium mb-4"
          >
            Queue株式会社
          </motion.p>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-gray-900"
          >
            世界を熱狂させる、<br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {currentText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-cyan-400"
              >
                |
              </motion.span>
            </span>をつくる。
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm inline-block px-6 py-4 mb-10 rounded-lg border border-gray-200"
          >
            <p className="text-lg md:text-xl font-medium text-gray-700">
              プロンプトの経済圏をつくる
            </p>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl text-sm md:text-base leading-relaxed text-gray-600 mb-8"
          >
            プロンプトマーケット「Prompty」、社内AIチャット「Workmate」。
            Queueは、ビジネスを進化させるAIテクノロジーの力をすべての企業へ届けます。
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8"
            variants={containerVariants}
          >
            {/* <motion.button 
              variants={buttonVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium overflow-hidden transition-all duration-300"
            >
              <Download className="w-5 h-5 text-white" />
              <span className="relative z-10">資料ダウンロード</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button> */}
            
            <motion.a 
              href="/contact"
              variants={buttonVariants}
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(6, 182, 212, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center gap-2 px-8 py-3 border-2 border-blue-400/50 text-gray-700 rounded-lg font-medium backdrop-blur-sm transition-all duration-300 hover:bg-blue-500/10"
            >
              <MessageCircle className="w-5 h-5 text-gray-700" />
              <span className="relative z-10">無料相談する</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl"
        />
        
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 right-32 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-xl"
        />
        
        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-40 left-20 w-12 h-12 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-lg"
        />
      </div>
    </section>
  );
}