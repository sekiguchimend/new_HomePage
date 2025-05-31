import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Values from '@/components/home/Values';
import Business from '@/components/home/Business';
import Results from '@/components/home/Results';
import News from '@/components/home/News';
import AnimatedGradientBackground from '@/components/shared/AnimatedGradientBackground';

export default function Home() {
  return (
    <>
      <AnimatedGradientBackground />
      <Hero />
      <News />
      <About />
      <Values />
      <Business />
      <Results />
    </>
  );
}