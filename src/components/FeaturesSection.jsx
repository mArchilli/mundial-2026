import { useEffect, useRef } from 'react'
import {
  Boxes, Sparkles, CircleDot, Award,
  Ruler, Thermometer, Package, Hand, Clock, RefreshCw,
} from 'lucide-react'
import { revealGroups } from '../lib/reveal'

const FEATURES = [
  {
    icon: Boxes,
    title: 'Impresa en 3D',
    desc: 'Cada Copa se fabrica capa por capa con impresion 3D de alta precision: una replica fiel del trofeo, liviana y resistente.',
  },
  {
    icon: Sparkles,
    title: 'Chispa fria integrada',
    desc: 'Aloja un cartucho de cold spark: una fuente de destellos plateados, fria al tacto, sin humo ni llama.',
  },
  {
    icon: CircleDot,
    title: 'Boton en la base',
    desc: 'Nuestro sistema "puli" un unico boton en la propia Copa la enciende. Sin cables ni tecnicos: la activas vos en segundos.',
  },
  {
    icon: Award,
    title: 'Edicion de lanzamiento',
    desc: 'Produccion numerada por el Mundial 2026. Cada unidad llega con su certificado y estuche de coleccionista.',
  },
]

const STEPS = [
  {
    n: '01',
    icon: Package,
    title: 'Inserta el cartucho',
    desc: 'Coloca el cartucho de chispa fria en el alojamiento interno de la Copa. Encastra solo.',
  },
  {
    n: '02',
    icon: Hand,
    title: 'Apreta el boton',
    desc: 'Presiona el boton de la base. La Copa hace el resto - sin riesgos, sin preparacion.',
  },
  {
    n: '03',
    icon: Sparkles,
    title: 'Encende la gloria',
    desc: 'Una fuente de chispas plateadas brota del trofeo. El momento del festejo es tuyo.',
  },
]

const SPECS = [
  { icon: Ruler, label: 'Altura de chispa', value: 'Hasta 2 metros' },
  { icon: Thermometer, label: 'Temperatura', value: 'Fria al tacto' },
  { icon: Boxes, label: 'Material', value: 'Polimero de alta resistencia' },
  { icon: Award, label: 'Altura de la Copa', value: '27 cm' },
  { icon: Clock, label: 'Duracion por cartucho', value: '30 s c/u' },
  { icon: RefreshCw, label: 'Cartuchos', value: 'Reemplazables · 30 s' },
  { icon: Package, label: 'Cartuchos de repuesto', value: 'Proximamente' },
  { icon: CircleDot, label: 'Activacion', value: 'Boton en la base' },
  { icon: Package, label: 'Peso aproximado', value: '400 g (incluyendo bateria)' },
]

export default function FeaturesSection() {
  const root = useRef(null)

  useEffect(
    () =>
      revealGroups(root.current, [
        { sel: '.feat-head', y: 40 },
        { sel: '.feat-card', stagger: 0.12, watch: '.feat-grid' },
        { sel: '.step-head', y: 36 },
        { sel: '.step-card', stagger: 0.15, watch: '.step-grid' },
        { sel: '.spec-panel', y: 44 },
      ]),
    [],
  )

  return (
    <section
      id="features"
      ref={root}
      className="grain relative overflow-hidden bg-[#F8F4EC] px-6 py-28 sm:py-36"
    >
      <div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full blur-3xl"
        style={{ background: 'rgba(201,168,76,0.12)' }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full blur-3xl"
        style={{ background: 'rgba(201,168,76,0.08)' }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center">
        <div className="feat-head mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            El producto Chisperio
          </span>
          <h2 className="mt-4 text-6xl text-bg sm:text-7xl md:text-8xl">
            Disenada para{' '}
            <span className="text-gradient-gold">brillar</span>
          </h2>
          <p className="mt-5 text-bg/55">
            La Copa Mundial 2026 reune lo que Chisperio sabe hacer mejor: el espectaculo
            de la chispa fria, ahora en tus manos y en forma del trofeo mas codiciado del futbol.
          </p>
        </div>

        <div className="feat-grid mt-16 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <article
                key={i}
                className="feat-card group relative flex flex-col items-center overflow-hidden rounded-2xl border border-bg/8 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-glow"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gold-gradient shadow-glow">
                  <Icon className="h-7 w-7 text-white" strokeWidth={2.2} />
                </div>
                <h3 className="text-3xl text-bg">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bg/55">{f.desc}</p>
              </article>
            )
          })}
        </div>

        <div id="como-funciona" className="mt-32 flex w-full scroll-mt-24 flex-col items-center">
          <div className="step-head mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Como funciona
            </span>
            <h2 className="mt-4 text-5xl text-bg sm:text-6xl md:text-7xl">
              Tres pasos. <span className="text-gradient-gold">Cero complicaciones.</span>
            </h2>
            <p className="mt-5 text-bg/55">
              No necesitas tecnicos ni instalacion. La Copa fue pensada para que cualquiera
              encienda el espectaculo en menos de un minuto.
            </p>
          </div>

          <div className="step-grid mt-14 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            {STEPS.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.n}
                  className="step-card relative flex flex-col items-center rounded-2xl border border-bg/8 bg-white p-7 text-center shadow-sm"
                >
                  <span className="font-display text-5xl tracking-wide text-primary/25">
                    {s.n}
                  </span>
                  <div className="-mt-3 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient shadow-glow">
                    <Icon className="h-6 w-6 text-white" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-2xl text-bg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bg/55">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="spec-panel mt-24 w-full max-w-4xl rounded-3xl border border-primary/20 bg-white p-8 shadow-sm sm:p-12">
          <div className="text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Ficha tecnica
            </span>
            <h3 className="mt-3 text-4xl text-bg sm:text-5xl">Cada detalle, medido</h3>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
            {SPECS.map((sp) => {
              const Icon = sp.icon
              return (
                <div key={sp.label} className="flex flex-col items-center text-center">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={2} />
                  <span className="mt-2 text-[11px] uppercase tracking-[0.16em] text-bg/40">
                    {sp.label}
                  </span>
                  <span className="mt-0.5 font-display text-2xl tracking-wide text-bg">
                    {sp.value}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
