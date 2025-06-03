import { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export const metadata: Metadata = {
  title: 'Queueとは',
  description: 'Queue株式会社は、生成AIとオートメーションを軸としたSaaSプロダクトを提供する、東京・銀座発のテックカンパニーです。プロンプトの経済圏をつくることをミッションとしています。',
  keywords: 'Queue株式会社, AI, 生成AI, プロンプト, Workmate, Prompty, DX, オートメーション, 銀座, テックカンパニー',
  openGraph: {
    title: 'Queueとは | Queue株式会社',
    description: 'Queue株式会社は、生成AIとオートメーションを軸としたSaaSプロダクトを提供する、東京・銀座発のテックカンパニーです。',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    description: 'Queue株式会社は、生成AIとオートメーションを軸としたSaaSプロダクトを提供する、東京・銀座発のテックカンパニーです。',
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