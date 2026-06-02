import { useEffect, useRef } from 'react'
import {
  ArrowLeft, ShieldCheck, TriangleAlert, Wind, Baby, Sparkles, Hand,
} from 'lucide-react'
import { revealGroups } from '../lib/reveal'

const MEASURES = [
  {
    icon: TriangleAlert,
    title: 'No apuntar hacia la cara',
    desc: 'Manten siempre la Copa orientada lejos del rostro durante el encendido y uso.',
  },
  {
    icon: Hand,
    title: 'Distancia de un brazo',
    desc: 'Al sostenerla mientras se usa, deja una separacion equivalente al largo de un brazo.',
  },
  {
    icon: Wind,
    title: 'Ambientes abiertos o altos',
    desc: 'Usala en espacios abiertos o en interiores con techos altos.',
  },
  {
    icon: Baby,
    title: 'Lejos de ninos y mascotas',
    desc: 'No la acerques a ninos, bebes ni mascotas mientras este activa o caliente por uso reciente.',
  },
  {
    icon: ShieldCheck,
    title: 'No apuntar a porcelanato',
    desc: 'Evita dirigir las chispas hacia pisos o superficies de porcelanato para prevenir marcas o daos.',
  },
  {
    icon: Sparkles,
    title: 'No dejar cerca de telas',
    desc: 'Manten una distancia prudente respecto de cortinas, manteles, sillones y otras telas.',
  },
]

export default function SecurityPage() {
  const root = useRef(null)

  useEffect(
    () =>
      revealGroups(root.current, [
        { sel: '.security-head', y: 40 },
        { sel: '.security-card', stagger: 0.12, watch: '.security-grid', y: 30 },
        { sel: '.security-note', y: 36 },
      ]),
    [],
  )

  return (
    <main ref={root} className="grain relative min-h-screen overflow-hidden bg-[#F8F4EC] text-bg">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'rgba(201,168,76,0.14)' }}
      />
      <div
        className="pointer-events-none absolute -left-28 top-40 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'rgba(201,168,76,0.1)' }}
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-20 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'rgba(201,168,76,0.1)' }}
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-bg/8 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="./" className="flex items-center">
            <img
              src="/images/chisperio-logo.png"
              alt="Chisperio"
              className="h-auto w-[120px] sm:w-[145px]"
            />
          </a>

          <a
            href="./"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-dark transition-all duration-300 hover:border-primary hover:bg-primary/8 sm:px-5 sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
            Volver al inicio
          </a>
        </nav>
      </header>

      <section className="relative px-6 pb-20 pt-28 sm:pb-28 sm:pt-36">
        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <div className="security-head max-w-3xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Uso responsable
            </span>
            <h1 className="mt-5 text-6xl text-bg sm:text-7xl md:text-8xl">
              Medidas de <span className="text-gradient-gold">seguridad</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-bg/60 sm:text-lg">
              La Copa esta pensada para deslumbrar, pero tambien para usarse con criterio.
              Segui estas recomendaciones antes de encender el efecto de chispa fria.
            </p>
          </div>

          <div className="security-grid mt-14 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MEASURES.map((measure) => {
              const Icon = measure.icon
              return (
                <article
                  key={measure.title}
                  className="security-card relative flex h-full flex-col rounded-3xl border border-bg/8 bg-white p-7 shadow-sm"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient shadow-glow">
                    <Icon className="h-6 w-6 text-white" strokeWidth={2.2} />
                  </div>
                  <h2 className="mt-5 text-3xl text-bg">{measure.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-bg/58">{measure.desc}</p>
                </article>
              )
            })}
          </div>

          <div className="security-note mt-14 w-full max-w-4xl rounded-3xl border border-primary/20 bg-white p-8 text-center shadow-sm sm:p-10">
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
              Importante
            </span>
            <p className="mt-4 text-lg leading-relaxed text-bg/70 sm:text-xl">
              Antes de cada uso, verifica el entorno y asegurate de que haya espacio suficiente
              para sostener la Copa con comodidad, lejos de personas vulnerables y materiales delicados.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
