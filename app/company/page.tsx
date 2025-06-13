"use client";

import { motion } from 'framer-motion';
import { COMPANY_INFO, BUSINESS_SERVICES } from '@/lib/constants';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';
import Image from 'next/image';

export default function CompanyPage() {
  const teamMembers = [
    {
      name: "谷口 太一",
      position: "代表取締役CEO",
      age: "23歳",
      description: "6歳のころからプログラミングを始め、圧倒的な技術力を持つ。ニュージーランドの大学の工学部を飛び級卒業。AI分野における豊富な経験を活かし、2024年に当社を創業。"
    },
    {
      name: "渡辺 ジェームス",
      position: "COO（最高執行責任者）",
      age: "24歳",
      description: "ニュージーランドのハーフとして、多言語を操る圧倒的な行動力とグローバルな視点を持つ無敵営業マン。"
    },
    
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Company</h1>
            
            {/* ビジネスの説明セクション */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">ビジネス概要</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">私たちがしていること</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Queue株式会社は、生成AIとオートメーション技術を活用したSaaSプロダクトの開発・運営を行っています。
                    AIの力を誰もが簡単に活用できる社会の実現を目指し、革新的なソリューションを提供しています。
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">解決する問題</h3>
                  <p className="text-gray-600 leading-relaxed">
                    企業の業務効率化、社内情報の属人化、顧客対応の自動化、そしてAI活用のノウハウ不足といった課題を解決します。
                    複雑なAI技術を誰でも使いやすい形で提供し、ビジネスの成長を加速させます。
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">ターゲットオーディエンス</h3>
                  <p className="text-gray-600 leading-relaxed">
                    中小企業から大手企業まで、業務効率化やDXを推進したい企業様。
                    また、個人クリエイターや専門家の方々にも、AIを活用した価値創造の機会を提供しています。
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">事業の変遷と投資状況</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    当初は飲食店向けの混雑状況可視化プロダクトの開発から始まりました。市場ニーズと技術トレンドを深く分析した結果、
                    より大きなインパクトを与えられるAI・オートメーション分野への戦略的ピボットを実行。
                    現在のWorkmate、Workmate-Script、Promptyといった革新的なプロダクト群の開発に注力しています。
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      総額1,500万円の投資を受け入れ、事業成長を加速
                    </p>
                    <p className="text-blue-700 text-sm mt-1 ml-4">
                      投資家からの信頼と支援のもと、AI技術の社会実装に向けた取り組みを強化しています。
                    </p>
                    <a 
                      href="https://prtimes.jp/main/html/rd/p/000000195.000008324.html" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-800 text-sm mt-3 inline-block ml-4"
                    >
                      → 詳細記事はこちら
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* チーム情報セクション */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8"
            >
              
              <div className="mb-8 flex justify-center">
                <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-md border border-gray-200/50">
                  <Image
                    src="/zen.png"
                    alt="Queue チームメンバー"
                    width={800}
                    height={450}
                    className="w-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 mr-3">{member.name}</h3>
                      {member.age && (
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{member.age}</span>
                      )}
                     
                    </div>
                    <h4 className="text-md text-blue-600 font-medium mb-3">{member.position}</h4>
                    <p className="text-gray-600 mb-2">{member.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 製品情報セクション */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">製品・サービス</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BUSINESS_SERVICES.map((service, index) => (
                  <div key={service.id} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-3">
                      <span className="text-blue-600 font-bold text-lg mr-3">{service.id}</span>
                      <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{service.description}</p>
                    <div className="text-xs text-gray-500">
                      {index < 2 ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">リリース済み</span>
                      ) : index === 2 ? (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">ベータ版運用中</span>
                      ) : (
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">受注開発</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 既存の会社情報セクション */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">会社情報</h2>
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
                  <dt className="text-gray-600">電話番号</dt>
                  <dd className="md:col-span-3">{COMPANY_INFO.phone}</dd>
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}