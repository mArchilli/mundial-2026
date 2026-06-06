import { ChevronDown, ShieldCheck, Wind, Boxes } from 'lucide-react'
import { getPackById } from '../lib/pricing'

const TRUST = [
  { icon: Wind, label: 'Chispa fría - sin calor' },
  { icon: ShieldCheck, label: 'Sin humo ni llama' },
  { icon: Boxes, label: 'Impresa en 3D' },
]

export default function HeroSection({ selectedPackId, onOpenPurchaseModal }) {
  const selectedPack = getPackById(selectedPackId)

  return (
    <section
      id="top"
      className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 pb-16 pt-28 text-center"
    >
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center gap-3">
          <img
            src="/images/chisperio-logo.png"
            alt="Chisperio"
            className="h-auto w-[200px] sm:w-[245px]"
          />
          <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/8 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-primary-dark">
            Edición Mundial 2026
          </span>
        </div>

        <h1 className="max-w-5xl text-[19vw] leading-[0.82] text-bg sm:text-[15vw] md:text-[11rem]">
          <span className="block">Encendé</span>
          <span className="block text-gradient-gold">la gloria</span>
        </h1>

        <div className="mt-7 max-w-2xl">
          <p className="text-xl font-medium leading-snug text-bg/80 sm:text-2xl">
            Una réplica inspirada en la máxima gloria, la{' '}
            <strong className="font-bold text-bg">Copa Mundial 2026</strong> que lanza chispas
            frías con solo apretar un botón.
          </p>
        </div>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <button
            type="button"
            onClick={onOpenPurchaseModal}
            className="rounded-full bg-gold-gradient px-9 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-glow"
          >
            Comprar ahora - {selectedPack.priceText}
          </button>
          <a
            href="#como-funciona"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/50 px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary shadow-glow"
          >
            Ver cómo funciona
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {TRUST.map((item) => {
            const Icon = item.icon
            return (
              <span
                key={item.label}
                className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-bg/45"
              >
                <Icon className="h-4 w-4 text-primary" strokeWidth={2.2} />
                {item.label}
              </span>
            )
          })}
        </div>
      </div>

      <a
        href="#scroll-video"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-primary/60 hover:text-primary"
        aria-label="Bajar"
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </section>
  )
}
