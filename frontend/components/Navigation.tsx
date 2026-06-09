import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl">⚽</span>
          <h1 className="text-xl font-bold text-primary">World Cup 2026</h1>
        </Link>
        <div className="flex items-center gap-6">
          <a href="#" className="text-foreground hover:text-primary transition">Teams</a>
          <a href="#" className="text-foreground hover:text-primary transition">Schedule</a>
          <a href="#" className="text-foreground hover:text-primary transition">Stats</a>
        </div>
      </div>
    </nav>
  )
}
