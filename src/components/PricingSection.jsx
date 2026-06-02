import { useEffect, useRef, useState } from 'react'
import {
  Sparkles, Award, Truck, BadgeCheck, CircleDot, Info,
  Home, Gift, Beer, PartyPopper, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { revealGroups } from '../lib/reveal'
import { WHATSAPP_URL } from '../lib/whatsapp'

const PACKS = [
  { id: '3x30', label: '3x30', tag: 'Próximamente', disabled: true },
  { id: '2x20', label: '2x20', tag: 'Disponible ahora', recommended: true },
  { id: '4x30', label: '4x30', tag: 'Próximamente', disabled: true },
]

const OCCASIONS = [
  { icon: Home, text: 'Festejo en casa con amigos el día del partido' },
  { icon: Gift, text: 'Regalo premium para el fanático del fútbol' },
  { icon: Beer, text: 'Bares y restaurantes que quieren hacer el show del gol' },
  { icon: PartyPopper, text: 'Eventos deportivos, cumpleaños y casamientos temáticos' },
]

export default function PricingSection() {
  const root = useRef(null)
  const occasionTouchStartX = useRef(0)
  const occasionTouchEndX = useRef(0)
  const [pack, setPack] = useState('2x20')
  const [mobileOccasionPage, setMobileOccasionPage] = useState(0)

  const selected = PACKS.find((p) => p.id === pack)
  const occasionPages = [OCCASIONS.slice(0, 2), OCCASIONS.slice(2, 4)]

  useEffect(
    () =>
      revealGroups(root.current, [
        { sel: '.buy-anim', stagger: 0.14, y: 44 },
        { sel: '.occasion-card', stagger: 0.1, y: 32 },
      ]),
    [],
  )

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setMobileOccasionPage((current) => (current + 1) % occasionPages.length)
    }, 3000)

    return () => window.clearTimeout(timeoutId)
  }, [mobileOccasionPage, occasionPages.length])

  const includes = [
    { icon: Award, text: 'La Copa Mundial 2026 impresa en 3D, limitada' },
    { icon: Sparkles, text: '3 cartuchos de chispa fría · 2x20' },
    { icon: CircleDot, text: 'Botón de activación integrado en la base' },
    { icon: BadgeCheck, text: 'Estuche premium' },
    { icon: Truck, text: 'Envío incluido a todo el país' },
  ]

  const showPrevOccasionPage = () => {
    setMobileOccasionPage((current) => (current - 1 + occasionPages.length) % occasionPages.length)
  }

  const showNextOccasionPage = () => {
    setMobileOccasionPage((current) => (current + 1) % occasionPages.length)
  }

  const handleOccasionTouchStart = (event) => {
    const { clientX } = event.touches[0]
    occasionTouchStartX.current = clientX
    occasionTouchEndX.current = clientX
  }

  const handleOccasionTouchMove = (event) => {
    occasionTouchEndX.current = event.touches[0].clientX
  }

  const handleOccasionTouchEnd = () => {
    const swipeDistance = occasionTouchStartX.current - occasionTouchEndX.current

    if (Math.abs(swipeDistance) < 50) return

    if (swipeDistance > 0) {
      showNextOccasionPage()
      return
    }

    showPrevOccasionPage()
  }

  return (
    <section
      id="comprar"
      ref={root}
      className="grain relative overflow-hidden scroll-mt-20 bg-[#F8F4EC] px-6 py-28 sm:py-36"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[90vmin] w-[90vmin] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'rgba(201,168,76,0.12)' }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center">
        <div className="buy-anim text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/8 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-dark">
            <Sparkles className="h-3.5 w-3.5" />
            Lanzamiento Mundial 2026 · Pre-venta abierta
          </span>
          <h2 className="mt-5 text-6xl text-bg sm:text-7xl md:text-8xl">
            Conseguí <span className="text-gradient-gold">la tuya</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-bg/55">
            La Copa más sus cartuchos de chispa fría. Elegí el pack según cuánto
            quieras que dure el espectáculo. El precio es siempre el mismo.
          </p>
        </div>

        <div className="mt-14 w-full">
          <h3 className="occasion-card text-center font-display text-3xl tracking-wide text-bg sm:text-4xl">
            ¿Para qué ocasión<span className="text-gradient-gold">?</span>
          </h3>

          <div className="mt-7 hidden grid-cols-1 gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {OCCASIONS.map((o) => {
              const Icon = o.icon
              return (
                <div
                  key={o.text}
                  className="occasion-card flex flex-col items-center gap-3 rounded-2xl border border-bg/8 bg-white p-5 text-center shadow-sm"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-gradient shadow-glow">
                    <Icon className="h-5 w-5 text-white" strokeWidth={2.2} />
                  </span>
                  <span className="text-sm leading-relaxed text-bg/65">{o.text}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-7 sm:hidden">
            <div className="relative">
              <button
                type="button"
                onClick={showPrevOccasionPage}
                aria-label="Ver página anterior de ocasiones"
                className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-white/95 text-primary shadow-glow transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
              </button>

              <button
                type="button"
                onClick={showNextOccasionPage}
                aria-label="Ver siguiente página de ocasiones"
                className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-white/95 text-primary shadow-glow transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
              </button>

              <div
                className="overflow-hidden px-10"
                onTouchStart={handleOccasionTouchStart}
                onTouchMove={handleOccasionTouchMove}
                onTouchEnd={handleOccasionTouchEnd}
                style={{ touchAction: 'pan-y' }}
              >
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${mobileOccasionPage * 100}%)` }}
                >
                  {occasionPages.map((page, pageIndex) => (
                    <div key={`occasion-page-${pageIndex}`} className="w-full shrink-0 px-1">
                      <div className="grid grid-cols-1 gap-3">
                        {page.map((o) => {
                          const Icon = o.icon
                          return (
                            <div
                              key={o.text}
                              className="occasion-card flex min-h-[168px] flex-col items-center gap-3 rounded-2xl border border-bg/8 bg-white p-5 text-center shadow-sm"
                            >
                              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-gradient shadow-glow">
                                <Icon className="h-5 w-5 text-white" strokeWidth={2.2} />
                              </span>
                              <span className="text-sm leading-relaxed text-bg/65">{o.text}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {occasionPages.map((_, index) => (
                <button
                  key={`occasion-dot-${index}`}
                  type="button"
                  onClick={() => setMobileOccasionPage(index)}
                  aria-label={`Ver página ${index + 1} de ocasiones`}
                  aria-pressed={mobileOccasionPage === index}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    mobileOccasionPage === index ? 'w-7 bg-primary' : 'w-2.5 bg-primary/25'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="buy-anim mt-14 grid w-full rounded-3xl border border-primary/20 bg-white shadow-glow md:grid-cols-2">
          <div className="flex flex-col justify-between gap-8 border-b border-bg/8 bg-bg p-6 text-text md:border-b-0 md:border-r md:p-9">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
                Chisperio
              </span>
              <h3 className="mt-2 font-display text-5xl leading-none tracking-wide sm:text-6xl">
                Copa Mundial 2026
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-text/55">
                Réplica del trofeo con fuente de chispa fría integrada. Impresa en 3D,
                segura, sin humo ni calor. Se enciende con un botón.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Chispa fría', 'Sin humo', 'Impresa en 3D', 'Edición limitada'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-primary/30 px-3 py-1 text-[11px] uppercase tracking-wider text-primary"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-end sm:gap-3">
              <span className="font-display text-5xl leading-none text-gradient-gold sm:text-8xl">
                AR$250.000
              </span>
              <span className="text-xs uppercase tracking-wider text-text/45 sm:pb-2">
                Pago único<br />Envío incluido
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-7 p-6 md:p-9">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-bg/45">
                Elegí tu pack de chispas
              </span>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {PACKS.map((p) => {
                  const active = p.id === pack
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        if (!p.disabled) setPack(p.id)
                      }}
                      disabled={p.disabled}
                      className={`relative flex min-h-[92px] flex-col items-center justify-center rounded-xl border px-1.5 py-3 text-center transition-all duration-200 ${
                        active
                          ? 'border-primary bg-primary/10 shadow-glow'
                          : p.disabled
                            ? 'cursor-not-allowed border-bg/10 bg-[#F8F4EC] opacity-75'
                            : 'border-bg/12 bg-white hover:border-primary/40'
                      }`}
                    >
                      {p.recommended && (
                        <span className="absolute -top-2 rounded-full bg-gold-gradient px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
                          Popular
                        </span>
                      )}
                      {p.disabled && (
                        <span className="absolute -top-2 rounded-full border border-primary/20 bg-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-primary-dark">
                          Próximamente
                        </span>
                      )}
                      <span className="font-display text-[1.65rem] leading-none tracking-wide text-bg sm:text-3xl">
                        {p.label}
                      </span>
                      <span className={`mt-1 text-[9px] uppercase leading-tight tracking-wide ${
                        p.disabled ? 'text-bg/35' : 'text-bg/45'
                      }`}>
                        {p.tag}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-bg/50">
                Pack <strong className="text-bg/70">{selected.label}</strong>: incluye 3 cartuchos
                de chispa fría 2x20.
              </p>
              <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-primary/8 px-3 py-2 text-xs text-bg/55">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-dark" strokeWidth={2.2} />
                <span>
                  La Copa tiene precio fijo. Los cartuchos son parte del pack de bienvenida,
                  no un costo adicional.
                </span>
              </p>
            </div>

            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-bg/45">
                Qué incluye
              </span>
              <ul className="mt-3 flex flex-col gap-2.5">
                {includes.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.text} className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12">
                        <Icon className="h-3 w-3 text-primary-dark" strokeWidth={2.4} />
                      </span>
                      <span className="text-sm text-bg/65">{item.text}</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-full bg-gold-gradient px-5 py-4 text-center text-sm font-bold uppercase tracking-wider text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:brightness-105 sm:px-7"
            >
              <span className="relative z-10">
                Comprar la Copa {selected.label} · AR$250.000
              </span>
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            </a>
            <p className="text-center text-[11px] text-bg/40">
              Edición de lanzamiento - unidades limitadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
