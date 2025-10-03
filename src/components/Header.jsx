import { Rabbit, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full border-b border-zinc-800/60 bg-zinc-950/40 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-amber-400/15 ring-1 ring-amber-300/30 flex items-center justify-center">
            <Rabbit className="text-amber-300" size={22} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Spaghetti Rabbit Generator</h1>
            <p className="text-sm text-zinc-400">A realistic rabbit silhouette, woven from pasta strands</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-amber-300/90">
          <Sparkles size={18} />
          <span className="text-sm">Procedural art</span>
        </div>
      </div>
    </header>
  )
}
