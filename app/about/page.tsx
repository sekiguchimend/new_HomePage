"use client";

import { motion } from 'framer-motion';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export default function AboutPage() {
  return (
    <>
      <AnimatedGradientBackground />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8">RECORとは</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl font-medium mb-8">他者を理解する力を新しい強さの形に。</p>
              
              <p className="mb-4">鋭さや正しさばかりが先に評価される場面が多い今。思いやりの心や、他者への深い理解に根ざした力は、しばしば見過ごされてしまいます。</p>
              
              <p className="mb-4">しかし、AIの時代を乗りこなすのは人間を深く知る人です。</p>
              
              <p className="mb-4">人に興味があること。感情に触れてきたこと。悩みながらも、誰かを想ってきた経験。そうした背景を持つ人は、心の動きや、想いの届き方を、感覚として知っています。</p>
              
              <p className="mb-8">その感覚に、論理と思考を丁寧に重ねていくことこそが、価値あるものを届けるための、本質的な力になると考えています。</p>
              
              <p className="mb-4">RECORでは、そんな"人間らしさ"を武器に、人と人、想いと商品をつなぐマーケティングで、ビジネスの成長を支援します。</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}