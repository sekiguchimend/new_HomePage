"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AboutContent() {
  const products = [
    {
      title: "Workmate",
      description: "社内の「わからない」をゼロにする、AIチャットボット。SlackやWebに即導入。マニュアル・PDF・議事録など、社内の情報を学習し、あらゆる質問に24時間対応。サポート業務やナレッジ共有を自動化し、業務効率を飛躍的に向上させます。",
    },
    {
      title: "Workmate-Script",
      description: "一行でWebサイトに埋め込める、AIチャットウィジェット。スクリプトタグを貼るだけで、あなたのサイトが「話せるように」なる。FAQ対応、資料案内、商品説明など、Web接客やLPOに最適です。",
    },
    {
      title: "Prompty",
      description: "プロンプトが売れる、買える。生成AIテンプレートのマーケットプレイス。ChatGPTやGeminiで使える「再現性の高いプロンプト」を売買・共有できる国内初のプラットフォーム。高品質な指示文を使うだけで、LP作成・営業リスト作成・社内文書の生成が一瞬で可能に。",
    }
  ];

  const features = [
    "精鋭10名のエンジニア・デザイナーチーム",
    "最短1週間でのAI導入実現",
    "PoCから本番導入まで一貫サポート",
    "構想段階から運用まで伴走"
  ];

  return (
    <div className="relative pt-32 pb-20">
      {/* 暗いオーバーレイを追加 */}
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* ヘッダー */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="text-purple-700">A</span>bout
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-full border border-cyan-500/30 backdrop-blur-sm"
            >
              <p className="text-xl font-medium text-cyan-300">プロンプトの経済圏をつくる</p>
            </motion.div>
          </div>
          
          {/* 企業概要 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 space-y-6"
          >
            <p className="text-lg text-gray-200 leading-relaxed">
              Queue株式会社は、生成AIとオートメーションを軸としたSaaSプロダクトを提供する、東京・銀座発のテックカンパニーです。
            </p>
            
            <p className="text-lg text-gray-200 leading-relaxed">
              「プロンプトの経済圏をつくる」ことをミッションに、すべての人にAIの力を届けるためのプロダクトを創り続けています。
            </p>
          </motion.div>
          
          {/* プロダクト */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              私たちのプロダクト
            </h2>
            
            <div className="grid gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="group bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-bold text-cyan-300">{product.title}</h3>
                        <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      <p className="text-gray-200 leading-relaxed">{product.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* 特徴・強み */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-xl p-8 border border-slate-600/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              私たちの強み
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                  className="flex items-center gap-3 text-gray-200"
                >
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
            
            <p className="text-gray-200 leading-relaxed">
              あらゆる企業のDXを加速させ、構想段階から導入・運用まで、一貫して伴走いたします。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 