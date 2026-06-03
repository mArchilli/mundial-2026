import { useEffect, useRef } from 'react'
import { Star, Quote } from 'lucide-react'
import { revealGroups } from '../lib/reveal'

const TESTIMONIALS = [
  {
    name: 'Martín Aguirre',
    role: 'Dueño de bar deportivo · Córdoba',
    initials: 'MA',
    text: 'La encendemos en cada gol y el lugar explota. Los clientes filman todo. Mejor inversión del año.',
  },
  {
    name: 'Lucía Fernández',
    role: 'Organizadora de eventos · Buenos Aires',
    initials: 'LF',
    text: 'La usé en un cumpleaños temático y fue el centro de la noche. Sin humo, segura adentro, impecable.',
  },
  {
    name: 'Diego Sosa',
    role: 'Fanático del fútbol · Rosario',
    initials: 'DS',
    text: 'Me la regalaron y no la suelto. La réplica es hermosa y la chispa fría es una locura. Vale cada peso.',
  },
]

export default function SocialProofSection() {
  const root = useRef(null)

  useEffect(
    () =>
      revealGroups(root.current, [
        { sel: '.sp-head', y: 40 },
        { sel: '.sp-card', stagger: 0.12, watch: '.sp-grid' },
        { sel: '.sp-units', y: 32 },
      ]),
    [],
  )

  return (
    <section ref={root} className="grain relative overflow-hidden bg-white px-6 py-28 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'rgba(201,168,76,0.1)' }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center">
        <div className="sp-head mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Lo que dicen quienes ya la tienen
          </span>
          <h2 className="mt-4 text-6xl text-bg sm:text-7xl">
            Quienes encendieron la <span className="text-gradient-gold">gloria</span>
          </h2>
        </div>

        <div className="sp-grid mt-14 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.name}
              className="sp-card relative flex flex-col rounded-2xl border border-bg/8 bg-white p-7 shadow-sm"
            >
              <Quote className="h-7 w-7 text-primary/30" strokeWidth={2.2} />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-bg/70">
                “{testimonial.text}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-gradient font-display text-lg tracking-wide text-white shadow-glow">
                  {testimonial.initials}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-bold text-bg">{testimonial.name}</span>
                  <span className="text-xs text-bg/45">{testimonial.role}</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="sp-units mt-12 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-primary/30 bg-primary/8 px-6 py-3 text-center">
          <span className="font-display text-2xl tracking-wide text-gradient-gold">
            +150 unidades reservadas
          </span>
          <span className="text-xs uppercase tracking-[0.18em] text-bg/50">
            · Edición limitada del Mundial 2026
          </span>
        </div>
      </div>
    </section>
  )
}
