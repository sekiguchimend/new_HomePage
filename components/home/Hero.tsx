export default function Hero() {
  return (
    <section className="relative w-full pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#a8d0f0] via-[#ccd0f0] to-[#e7d0f2] opacity-80"></div>
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl">
          <p className="mb-4 text-lg md:text-xl">Queue株式会社</p>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            世界を熱狂させる、<br />AIプロダクトをつくる。
          </h1>
          
          <div className="bg-white/80 backdrop-blur-sm inline-block px-6 py-4 mb-10">
            <p className="text-lg md:text-xl font-medium">
              プロンプトの経済圏をつくる
            </p>
          </div>
          
          <p className="max-w-2xl text-sm md:text-base leading-relaxed text-gray-700">
            プロンプトマーケット「Prompty」、社内AIチャット「Workmate」、そして圧倒的スピードの受託AI開発。
            Queueは、ビジネスを進化させるAIテクノロジーの力をすべての企業へ届けます。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              資料ダウンロード
            </button>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              無料相談する
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}