export default function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-primary/20 to-transparent py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="text-6xl md:text-7xl mb-6">⚽</div>
        <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4 text-foreground">
          FIFA World Cup 2026
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Track live fixtures, team standings, and fan predictions for the world&apos;s greatest tournament hosted in USA, Canada & Mexico
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition">
            View Schedule
          </button>
          <button className="border border-accent bg-transparent hover:bg-accent/10 text-accent px-8 py-3 rounded-lg font-semibold transition">
            Make Predictions
          </button>
        </div>
      </div>
    </div>
  )
}
