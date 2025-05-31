import { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export const metadata: Metadata = {
  title: 'Queueとは | Queue株式会社 - 世界を熱狂させる、AIプロダクトをつくる。',
  description: 'Queue株式会社は、生成AIとオートメーションを軸としたSaaSプロダクトとAI受託開発を提供する、東京・銀座発のテックカンパニーです。プロンプトの経済圏をつくることをミッションとしています。',
  keywords: 'Queue株式会社, AI, 生成AI, プロンプト, Workmate, Prompty, AI受託開発, DX, オートメーション, 銀座, テックカンパニー',
  openGraph: {
    title: 'Queueとは | Queue株式会社 - 世界を熱狂させる、AIプロダクトをつくる。',
    description: 'Queue株式会社は、生成AIとオートメーションを軸としたSaaSプロダクトとAI受託開発を提供する、東京・銀座発のテックカンパニーです。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Queueとは | Queue株式会社 - 世界を熱狂させる、AIプロダクトをつくる。',
    description: 'Queue株式会社は、生成AIとオートメーションを軸としたSaaSプロダクトとAI受託開発を提供する、東京・銀座発のテックカンパニーです。',
  },
};

export default function AboutPage() {
  return (
    <>
      <AnimatedGradientBackground />
      <AboutContent />
    </>
  );
}