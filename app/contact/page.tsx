"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    inquiryType: 'general', // 'general' or 'materials'
    name: '',
    company: '',
    department: '',
    position: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // フォームをリセット
        setFormData({
          inquiryType: 'general',
          name: '',
          company: '',
          department: '',
          position: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 資料請求かどうかで必須項目を判定
  const isResourceRequest = formData.inquiryType === 'materials';
  
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
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Contact</h1>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* お問い合わせの種類 */}
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">
                    お問い合わせの種類 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    required
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="general">一般的なお問い合わせ</option>
                    <option value="materials">資料請求</option>
                  </select>
                </div>

                {/* お名前 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="山田 太郎"
                  />
                </div>
                
                {/* 会社名 */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    会社名 
                    {isResourceRequest && <span className="text-red-500">*</span>}
                    {!isResourceRequest && <span className="text-gray-400 text-xs ml-1">(任意)</span>}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required={isResourceRequest}
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="株式会社サンプル"
                  />
                </div>

                {/* 部署名（資料請求の場合のみ表示） */}
                {isResourceRequest && (
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                      部署名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      required={isResourceRequest}
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="マーケティング部"
                    />
                  </div>
                )}

                {/* 役職・担当者名（資料請求の場合のみ表示） */}
                {isResourceRequest && (
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                      役職・担当者名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      required={isResourceRequest}
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="マネージャー"
                    />
                  </div>
                )}
                
                {/* メールアドレス */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="example@company.com"
                  />
                </div>
                
                {/* 電話番号 */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    電話番号
                    {isResourceRequest && <span className="text-red-500">*</span>}
                    {!isResourceRequest && <span className="text-gray-400 text-xs ml-1">(任意)</span>}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required={isResourceRequest}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="03-5324-2678"
                  />
                </div>
                
                {/* お問い合わせ内容 */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {isResourceRequest ? '資料請求の詳細・ご質問' : 'お問い合わせ内容'} 
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      isResourceRequest 
                        ? "ご希望の資料や、特にお聞きしたい内容があれば詳しくお聞かせください。"
                        : "お問い合わせ内容を詳しくお聞かせください。"
                    }
                  />
                </div>

                {/* 資料請求の場合の注意事項 */}
                {isResourceRequest && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">📋 資料請求について</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• ご入力いただいた情報は資料送付の目的のみに使用いたします</li>
                      <li>• 通常、営業日2-3日以内にメールにて資料をお送りいたします</li>
                      <li>• ご不明な点がございましたら、担当者からご連絡させていただく場合があります</li>
                    </ul>
                  </div>
                )}

                {/* 成功・エラーメッセージ */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="text-green-600 mr-3">✅</div>
                      <div>
                        <h3 className="text-sm font-semibold text-green-800">送信完了</h3>
                        <p className="text-sm text-green-700">
                          {isResourceRequest 
                            ? 'お問い合わせを受け付けました。営業日2-3日以内にご連絡いたします。' 
                            : 'お問い合わせを受け付けました。担当者からご連絡いたします。'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="text-red-600 mr-3">❌</div>
                      <div>
                        <h3 className="text-sm font-semibold text-red-800">送信エラー</h3>
                        <p className="text-sm text-red-700">
                          申し訳ございませんが、送信に失敗しました。もう一度お試しいただくか、直接お電話でお問い合わせください。
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        送信中...
                      </div>
                    ) : (
                      isResourceRequest ? '資料請求する' : '送信する'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}