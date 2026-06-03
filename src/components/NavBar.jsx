import { WHATSAPP_URL } from '../lib/whatsapp'
import { getPackById } from '../lib/pricing'

const LINKS = [
  { href: '#features', label: 'El producto' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#comprar', label: 'Comprar' },
]

export default function NavBar({ selectedPackId }) {
  const selectedPack = getPackById(selectedPackId)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-bg/8 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center">
          <img
            src="/images/chisperio-logo.png"
            alt="Chisperio"
            className="h-auto w-[120px] sm:w-[145px]"
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-bg/60 transition-colors hover:text-primary-dark"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-gold-gradient px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:brightness-105 sm:px-6 sm:text-sm"
        >
          Comprar · {selectedPack.priceText}
        </a>
      </nav>
    </header>
  )
}
