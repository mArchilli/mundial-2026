import { Sparkles } from 'lucide-react'

const LINKS = [
  { href: '#features',      label: 'El producto' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#comprar',       label: 'Comprar' },
]

export default function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-bg/8 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">

        {/* Marca Chisperío */}
        <a href="#top" className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient shadow-glow">
            <Sparkles className="h-5 w-5 text-white" strokeWidth={2.4} />
          </span>
          <span className="font-display text-2xl tracking-[0.12em] text-bg">
            CHISPER<span className="text-gradient-gold">Í</span>O
          </span>
        </a>

        {/* Links */}
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-bg/60 transition-colors hover:text-primary-dark"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#comprar"
          className="rounded-full bg-gold-gradient px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:brightness-105 sm:px-6 sm:text-sm"
        >
          Comprar · US$200
        </a>

      </nav>
    </header>
  )
}
