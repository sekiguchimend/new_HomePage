export default function Hero() {
  return (
    <section className="relative w-full pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#a8d0f0] via-[#ccd0f0] to-[#e7d0f2] opacity-80"></div>
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl">
          <p className="mb-4 text-lg md:text-xl">株式会社RECOR</p>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            CREATE VALUE WITH<br /> EMPATHY
          </h1>
          
          <div className="bg-white/80 backdrop-blur-sm inline-block px-6 py-4 mb-10">
            <p className="text-lg md:text-xl font-medium">
              まじめな想いを、まじめに届ける。
            </p>
          </div>
          
          <p className="max-w-2xl text-sm md:text-base leading-relaxed text-gray-700">
            Our mission is to build a world where sincere efforts and empathy are truly valued. By deeply
            understanding others, embracing authenticity, and taking resilient steps forward, we transform
            genuine value into reality through thoughtful action and innovation.
          </p>
        </div>
      </div>
    </section>
  );
}