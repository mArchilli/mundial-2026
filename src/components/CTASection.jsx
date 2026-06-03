import { useEffect, useRef, useState } from 'react'
import { Mail, Check } from 'lucide-react'
import { revealGroups } from '../lib/reveal'
import { WHATSAPP_URL } from '../lib/whatsapp'

const KICKOFF = new Date('2026-06-11T00:00:00')

function getRemaining() {
  const diff = Math.max(0, KICKOFF - new Date())
  return {
    dias: Math.floor(diff / 86400000),
    horas: Math.floor((diff / 3600000) % 24),
    minutos: Math.floor((diff / 60000) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function CTASection() {
  const root = useRef(null)
  const [time, setTime] = useState(getRemaining)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(
    () => revealGroups(root.current, [{ sel: '.cta-anim', stagger: 0.1, y: 44 }]),
    [],
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setStatus('error')
      return
    }
    setStatus('done')
  }

  const units = [
    ['Días', time.dias],
    ['Horas', time.horas],
    ['Min', time.minutos],
    ['Seg', time.segundos],
  ]

  return (
    <section
      id="cta"
      ref={root}
      className="grain relative overflow-hidden bg-white px-6 py-32 text-center"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(201,168,76,0.14) 0%, rgba(255,255,255,0) 65%)',
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        <span className="cta-anim text-xs font-medium uppercase tracking-[0.3em] text-primary">
          Falta cada vez menos
        </span>

        <h2 className="cta-anim mt-5 text-6xl leading-[0.9] text-bg sm:text-7xl md:text-8xl">
          El mundo entero lo estará viendo.{' '}
          <span className="text-gradient-gold">ENCENDÉ LA GLORIA</span>
        </h2>

        <div className="cta-anim mt-12 flex justify-center gap-3 sm:gap-5">
          {units.map(([label, value]) => (
            <div
              key={label}
              className="flex min-w-[68px] flex-col items-center rounded-xl border border-primary/25 bg-[#F8F4EC] px-3 py-4 sm:min-w-[96px] sm:px-5"
            >
              <span className="font-display text-5xl tabular-nums text-gradient-gold sm:text-7xl">
                {String(value).padStart(2, '0')}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-bg/45 sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="cta-anim mt-6 text-sm text-bg/45">
          Hasta el inicio del FIFA World Cup 2026 - 11 de junio de 2026
        </p>

        <div className="cta-anim mt-10 flex flex-col items-center">
          <div className="mb-5 flex flex-col items-center gap-2 rounded-3xl border border-primary/30 bg-[#F8F4EC] px-6 py-4 text-center shadow-sm sm:px-8">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.26em] text-primary-dark sm:text-[13px]">
              <span className="inline-flex h-3 w-3 rounded-full bg-primary shadow-glow" />
              Edición limitada de unidades
            </span>
            <span className="scarcity-pulse font-display text-4xl leading-none tracking-wide text-gradient-gold sm:text-5xl">
              40/150 vendidas
            </span>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-full bg-gold-gradient px-12 py-5 text-base font-bold uppercase tracking-wider text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:brightness-105"
          >
            <span className="relative z-10">COMPRAR AHORA</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
          </a>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-bg/40">
            Pre-venta abierta - Envío incluido
          </p>
        </div>

        <div className="cta-anim mx-auto mt-12 max-w-md border-t border-primary/15 pt-8">
          <p className="text-sm text-bg/55">
            ¿Se te fue la fecha o se agotó el stock? Dejá tu mail y te avisamos si
            liberamos más unidades.
          </p>
          {status === 'done' ? (
            <div className="mx-auto mt-5 flex items-center justify-center gap-3 rounded-full border border-primary/40 bg-primary/8 px-6 py-3.5 text-primary-dark">
              <Check className="h-5 w-5" />
              <span className="font-medium">¡Listo! Te avisaremos si hay stock.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-5 flex w-full flex-col gap-3 sm:flex-row"
              noValidate
            >
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  placeholder="tu@email.com"
                  aria-label="Correo electrónico"
                  className={`w-full rounded-full border bg-[#F8F4EC] py-3.5 pl-12 pr-4 text-bg placeholder:text-bg/30 outline-none transition-colors ${
                    status === 'error'
                      ? 'border-red-400'
                      : 'border-primary/25 focus:border-primary'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="rounded-full border border-primary/50 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-dark transition-colors duration-300 hover:bg-primary/8"
              >
                Avisarme si se agota
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-sm text-red-500">
              Ingresá un correo electrónico válido.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
