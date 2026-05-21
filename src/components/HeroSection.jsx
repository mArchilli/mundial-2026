import { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ChevronDown, Sparkles, ShieldCheck, Wind, Boxes } from 'lucide-react'

function GoldParticles() {
  const sparks = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        duration: 10 + Math.random() * 14,
        delay: Math.random() * 14,
      })),
    [],
  )

  const stars = useMemo(
    () =>
      Array.from({ length: 24 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 6,
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          className="twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {sparks.map((s, i) => (
        <span
          key={`spark-${i}`}
          className="spark"
          style={{
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

const TRUST = [
  { icon: Wind,        label: 'Chispa fría · sin calor' },
  { icon: ShieldCheck, label: 'Sin humo ni llama' },
  { icon: Boxes,       label: 'Impresa en 3D' },
]

export default function HeroSection() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-kicker', { y: 24, opacity: 0, duration: 0.7 })
        .from('.hero-title', { y: 60, opacity: 0, duration: 1 }, '-=0.35')
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.8 }, '-=0.55')
        .from('.hero-cta', { y: 24, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-trust', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.4')
        .from('.hero-scroll', { opacity: 0, duration: 0.8 }, '-=0.2')

      gsap.to('.hero-glow', {
        scale: 1.12,
        opacity: 0.7,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={root}
      className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 pb-16 pt-28 text-center"
    >
      {/* Resplandor dorado sutil sobre fondo blanco */}
      <div
        className="hero-glow absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.22) 0%, transparent 68%)' }}
      />
      <GoldParticles />

      <div className="relative z-10 flex flex-col items-center">
        <span className="hero-kicker mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/8 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-primary-dark">
          <Sparkles className="h-3.5 w-3.5" />
          Chisperío presenta · Edición Mundial 2026
        </span>

        <h1 className="hero-title max-w-5xl text-[19vw] leading-[0.82] text-bg sm:text-[15vw] md:text-[11rem]">
          <span className="block">Encendé</span>
          <span className="block text-gradient-gold">la gloria</span>
        </h1>

        <p className="hero-sub mt-7 max-w-2xl text-base text-bg/60 sm:text-lg">
          En <strong className="font-bold text-bg/80">Chisperío</strong> creamos efectos de
          chispa fría para los eventos más memorables. Ahora lo volvemos trofeo: la{' '}
          <strong className="font-bold text-bg/80">Copa Mundial 2026</strong>, una réplica que
          enciende una fuente de chispas con solo apretar un botón.
        </p>

        <div className="hero-cta mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#comprar"
            className="group relative overflow-hidden rounded-full bg-gold-gradient px-9 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:brightness-105"
          >
            <span className="relative z-10">Comprar ahora · US$200</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
          </a>
          <a
            href="#como-funciona"
            className="rounded-full border border-primary/50 px-9 py-4 text-sm font-bold uppercase tracking-wider text-primary-dark transition-colors duration-300 hover:bg-primary/8"
          >
            Ver cómo funciona
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {TRUST.map((t) => {
            const Icon = t.icon
            return (
              <span
                key={t.label}
                className="hero-trust flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-bg/45"
              >
                <Icon className="h-4 w-4 text-primary" strokeWidth={2.2} />
                {t.label}
              </span>
            )
          })}
        </div>
      </div>

      <a
        href="#scroll-video"
        className="hero-scroll absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-primary/60 transition-colors hover:text-primary"
        aria-label="Bajar"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </a>
    </section>
  )
}
