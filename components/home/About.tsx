"use client";

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

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
            <h2 className="text-6xl font-bold mb-4">ABOUT</h2>
            <p className="text-2xl font-medium mb-10">RECORとは</p>
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
            <h3 className="text-2xl md:text-3xl font-medium">他者を理解する力を新しい強さの形に。</h3>
            
            <div className="space-y-4">
              <p>鋭さや正しさばかりが先に評価される場面が多い今。</p>
              <p>思いやりの心や、他者への深い理解に根ざした力は、しばしば見過ごされてしまいます。</p>
              
              <p>しかし、AIの時代を乗りこなすのは人間を深く知る人です。</p>
              
              <p>人に興味があること。感情に触れてきたこと。</p>
              <p>悩みながらも、誰かを想ってきた経験。</p>
              <p>そうした背景を持つ人は、心の動きや、想いの届き方を、感覚として知っています。</p>
              
              <p>その感覚に、論理と思考を丁寧に重ねていくことこそが、</p>
              <p>価値あるものを届けるための、本質的な力になると考えています。</p>
              
              <p>RECORでは、そんな"人間らしさ"を武器に、</p>
              <p>人と人、想いと商品をつなぐマーケティングで</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}