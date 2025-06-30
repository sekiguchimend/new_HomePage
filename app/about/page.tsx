import { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export const metadata: Metadata = {
  title: 'Queueとは',
  description: '世界を動かすプロダクトを生み出すテックカンパニー',
  keywords: 'Queue株式会社, AI, 生成AI, プロンプト, Workmate, Prompty, DX, オートメーション, 銀座, テックカンパニー',
  openGraph: {
    title: 'Queueとは | Queue株式会社',
    description: '世界を動かすプロダクトを生み出すテックカンパニー',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    description: '世界を動かすプロダクトを生み出すテックカンパニー',
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