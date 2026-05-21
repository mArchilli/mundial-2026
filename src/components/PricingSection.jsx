import { useEffect, useRef, useState } from 'react'
import { Sparkles, Check, Award, Truck, BadgeCheck, CircleDot } from 'lucide-react'
import { revealGroups } from '../lib/reveal'

const PACKS = [
  { id: '2x20', label: '2×20', secs: 20, tag: 'Festejo exprés' },
  { id: '2x30', label: '2×30', secs: 30, tag: 'El más elegido', recommended: true },
  { id: '2x40', label: '2×40', secs: 40, tag: 'Máximo show' },
]

export default function PricingSection() {
  const root = useRef(null)
  const [pack, setPack] = useState('2x30')
  const [ordered, setOrdered] = useState(false)

  const selected = PACKS.find((p) => p.id === pack)

  useEffect(
    () => revealGroups(root.current, [{ sel: '.buy-anim', stagger: 0.14, y: 44 }]),
    [],
  )

  const includes = [
    { icon: Award,      text: 'La Copa Mundial 2026 impresa en 3D, numerada' },
    { icon: Sparkles,   text: `2 cartuchos de chispa fría · ${selected.secs} s c/u` },
    { icon: CircleDot,  text: 'Botón de activación integrado en la base' },
    { icon: BadgeCheck, text: 'Certificado de edición + estuche de coleccionista' },
    { icon: Truck,      text: 'Envío incluido a todo el país' },
  ]

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

        {/* Encabezado */}
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
            quieras que dure el espectáculo — el precio es siempre el mismo.
          </p>
        </div>

        {/* Tarjeta de compra */}
        <div className="buy-anim mt-14 grid w-full overflow-hidden rounded-3xl border border-primary/20 bg-white shadow-glow md:grid-cols-2">

          {/* Lado izquierdo — producto */}
          <div className="flex flex-col justify-between gap-8 border-b border-bg/8 bg-bg p-9 text-text md:border-b-0 md:border-r">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
                Chisperío
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

            <div className="flex items-end gap-3">
              <span className="font-display text-7xl leading-none text-gradient-gold sm:text-8xl">
                US$200
              </span>
              <span className="pb-2 text-xs uppercase tracking-wider text-text/45">
                Pago único<br />Envío incluido
              </span>
            </div>
          </div>

          {/* Lado derecho — selección y compra */}
          <div className="flex flex-col gap-7 p-9">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-bg/45">
                Elegí tu pack de chispas
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
                chispa fría de {selected.secs} segundos de duración cada uno.
              </p>
            </div>

            {/* Qué incluye */}
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

            {/* Acción */}
            {ordered ? (
              <div className="flex items-center justify-center gap-2.5 rounded-full border border-primary/40 bg-primary/8 px-6 py-4 text-primary-dark">
                <Check className="h-5 w-5" />
                <span className="text-sm font-medium">
                  ¡Copa {selected.label} reservada! Te escribimos para coordinar el pago.
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOrdered(true)}
                className="group relative overflow-hidden rounded-full bg-gold-gradient px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:brightness-105"
              >
                <span className="relative z-10">
                  Comprar la Copa {selected.label} · US$200
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              </button>
            )}
            <p className="text-center text-[11px] text-bg/40">
              Edición de lanzamiento — unidades numeradas limitadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
