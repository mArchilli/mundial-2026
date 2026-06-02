import { useEffect, useRef, useState } from 'react'
import {
  Sparkles, Check, Award, Truck, BadgeCheck, CircleDot, Info,
  Home, Gift, Beer, PartyPopper, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { revealGroups } from '../lib/reveal'

const PACKS = [
  { id: '2x20', label: '2x20', secs: 20, tag: 'Festejo expres' },
  { id: '2x30', label: '2x30', secs: 30, tag: 'El mas elegido', recommended: true },
  { id: '2x40', label: '2x40', secs: 40, tag: 'Maximo show' },
]

const OCCASIONS = [
  { icon: Home, text: 'Festejo en casa con amigos el dia del partido' },
  { icon: Gift, text: 'Regalo premium para el fanatico del futbol' },
  { icon: Beer, text: 'Bares y restaurantes que quieren hacer el show del gol' },
  { icon: PartyPopper, text: 'Eventos deportivos, cumpleanos y casamientos tematicos' },
]

export default function PricingSection() {
  const root = useRef(null)
  const occasionTouchStartX = useRef(0)
  const occasionTouchEndX = useRef(0)
  const [pack, setPack] = useState('2x30')
  const [ordered, setOrdered] = useState(false)
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

  const includes = [
    { icon: Award, text: 'La Copa Mundial 2026 impresa en 3D, numerada' },
    { icon: Sparkles, text: `2 cartuchos de chispa fria · ${selected.secs} s c/u` },
    { icon: CircleDot, text: 'Boton de activacion integrado en la base' },
    { icon: BadgeCheck, text: 'Certificado de edicion + estuche de coleccionista' },
    { icon: Truck, text: 'Envio incluido a todo el pais' },
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
            Consegui <span className="text-gradient-gold">la tuya</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-bg/55">
            La Copa mas sus cartuchos de chispa fria. Elegi el pack segun cuanto
            quieras que dure el espectaculo. El precio es siempre el mismo.
          </p>
        </div>

        <div className="mt-14 w-full">
          <h3 className="occasion-card text-center font-display text-3xl tracking-wide text-bg sm:text-4xl">
            Para que <span className="text-gradient-gold">ocasion</span>?
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
                aria-label="Ver pagina anterior de ocasiones"
                className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-white/95 text-primary shadow-glow transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
              </button>

              <button
                type="button"
                onClick={showNextOccasionPage}
                aria-label="Ver siguiente pagina de ocasiones"
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
                  aria-label={`Ver pagina ${index + 1} de ocasiones`}
                  aria-pressed={mobileOccasionPage === index}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    mobileOccasionPage === index ? 'w-7 bg-primary' : 'w-2.5 bg-primary/25'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="buy-anim mt-14 grid w-full overflow-hidden rounded-3xl border border-primary/20 bg-white shadow-glow md:grid-cols-2">
          <div className="flex flex-col justify-between gap-8 border-b border-bg/8 bg-bg p-9 text-text md:border-b-0 md:border-r">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
                Chisperio
              </span>
              <h3 className="mt-2 font-display text-5xl leading-none tracking-wide sm:text-6xl">
                Copa Mundial 2026
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-text/55">
                Replica del trofeo con fuente de chispa fria integrada. Impresa en 3D,
                segura, sin humo ni calor. Se enciende con un boton.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Chispa fria', 'Sin humo', 'Impresa en 3D', 'Edicion limitada'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-primary/30 px-3 py-1 text-[11px] uppercase tracking-wider text-primary"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-end gap-3">
              <span className="font-display text-7xl leading-none text-gradient-gold sm:text-8xl">
                AR$250.000
              </span>
              <span className="pb-2 text-xs uppercase tracking-wider text-text/45">
                Pago unico<br />Envio incluido
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-7 p-9">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-bg/45">
                Elegi tu pack de chispas
              </span>
              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {PACKS.map((p) => {
                  const active = p.id === pack
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPack(p.id)}
                      className={`relative flex flex-col items-center rounded-xl border px-2 py-3 transition-all duration-200 ${
                        active
                          ? 'border-primary bg-primary/10 shadow-glow'
                          : 'border-bg/12 bg-white hover:border-primary/40'
                      }`}
                    >
                      {p.recommended && (
                        <span className="absolute -top-2 rounded-full bg-gold-gradient px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
                          Popular
                        </span>
                      )}
                      <span className="font-display text-3xl tracking-wide text-bg">
                        {p.label}
                      </span>
                      <span className="mt-0.5 text-[10px] uppercase tracking-wide text-bg/45">
                        {p.tag}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="mt-2.5 text-xs text-bg/50">
                Pack <strong className="text-bg/70">{selected.label}</strong>: 2 cartuchos de
                chispa fria de {selected.secs} segundos de duracion cada uno.
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
                Que incluye
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

            {ordered ? (
              <div className="flex items-center justify-center gap-2.5 rounded-full border border-primary/40 bg-primary/8 px-6 py-4 text-primary-dark">
                <Check className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Copa {selected.label} reservada. Te escribimos para coordinar el pago.
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOrdered(true)}
                className="group relative overflow-hidden rounded-full bg-gold-gradient px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:brightness-105"
              >
                <span className="relative z-10">
                  Comprar la Copa {selected.label} · AR$250.000
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              </button>
            )}
            <p className="text-center text-[11px] text-bg/40">
              Edicion de lanzamiento - unidades numeradas limitadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
