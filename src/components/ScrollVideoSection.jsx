import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Boxes, Sparkles, CircleDot } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* Desktop: relato completo de 3 etapas */
const CAPTIONS = [
  'El trofeo más codiciado del mundo',
  'Un producto que celebra la gloria',
  'Encendé tu pasión por el fútbol',
]

/* Mobile: menos texto, mensajes cortos */
const CAPTIONS_MOBILE = [
  'El trofeo más codiciado',
  'Encendé la gloria',
]

/* Características — solo en desktop (en mobile aliviana la vista) */
const FEATURES = [
  {
    icon: Boxes,
    title: 'Impreso en 3D',
    desc: 'Cada copa se fabrica capa por capa con impresión 3D de alta precisión.',
  },
  {
    icon: Sparkles,
    title: 'Porta chispas',
    desc: 'Aloja un cartucho de chispa fría: una fuente de destellos segura y sin calor.',
  },
  {
    icon: CircleDot,
    title: 'Un botón y listo',
    desc: 'Se enciende desde un botón en la propia base. Así de sencillo de usar.',
  },
]

/* Umbral de salto: ~1 frame. Por debajo de esto no vale la pena re-buscar. */
const FRAME = 1 / 30

const MOBILE_QUERY = '(max-width: 767px)'

function lastWord(text) {
  const parts = text.split(' ')
  return { head: parts.slice(0, -1).join(' '), tail: parts.slice(-1)[0] }
}

export default function ScrollVideoSection() {
  const sectionRef = useRef(null)
  const videoRef   = useRef(null)
  const targetRef  = useRef(0)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches,
  )

  /* Detectar viewport — al cambiar se intercambia el video y el layout */
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  /*
   * Scrubbing. Se reconstruye cuando cambia `isMobile` porque cambia el src
   * del video (animation.mp4 ⇄ animation-mobile.mp4) y la duración/captions.
   */
  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    let killed = false
    let rafId  = null
    let ctx
    let smooth = 0

    /*
     * rAF loop optimizado:
     *  1. video.seeking — un solo seek en vuelo a la vez (evita el backlog).
     *  2. lerp — interpola hacia el target del scroll para un movimiento fluido.
     */
    const rafLoop = () => {
      if (killed) return
      if (video.readyState >= 2 && video.duration) {
        smooth += (targetRef.current - smooth) * 0.18
        if (!video.seeking && Math.abs(video.currentTime - smooth) > FRAME) {
          video.currentTime = smooth
        }
      }
      rafId = requestAnimationFrame(rafLoop)
    }

    const build = () => {
      if (killed || !video.duration) return
      const duration = video.duration
      smooth = targetRef.current

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start:   'top top',
          end:     'bottom bottom',
          scrub:   0,
          onUpdate(self) {
            targetRef.current = self.progress * duration
          },
        })

        if (isMobile) {
          /* Mobile — 2 captions cortas, una por vez */
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start:   'top top',
              end:     'bottom bottom',
              scrub:   0.4,
            },
          })
            .fromTo('.mcap-0', { opacity: 0, y: 20 }, { opacity: 1, y: 0,  duration: 0.1 }, 0.05)
            .to(   '.mcap-0',                          { opacity: 0, y: -20, duration: 0.08 }, 0.46)
            .fromTo('.mcap-1', { opacity: 0, y: 20 }, { opacity: 1, y: 0,  duration: 0.1 }, 0.56)
        } else {
          /* Desktop — captions a la derecha */
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start:   'top top',
              end:     'bottom bottom',
              scrub:   0.4,
            },
          })
            .fromTo('.cap-0', { opacity: 0, y: 24 }, { opacity: 1, y: 0,  duration: 0.09 }, 0.02)
            .to(   '.cap-0',                          { opacity: 0, y: -24, duration: 0.07 }, 0.32)
            .fromTo('.cap-1', { opacity: 0, y: 24 }, { opacity: 1, y: 0,  duration: 0.09 }, 0.42)
            .to(   '.cap-1',                          { opacity: 0, y: -24, duration: 0.07 }, 0.72)
            .fromTo('.cap-2', { opacity: 0, y: 24 }, { opacity: 1, y: 0,  duration: 0.09 }, 0.82)

          /* Desktop — características a la izquierda, se acumulan */
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start:   'top top',
              end:     'bottom bottom',
              scrub:   0.5,
            },
          })
            .fromTo('.feat-side-0', { opacity: 0, x: -48 }, { opacity: 1, x: 0, duration: 0.12 }, 0.06)
            .fromTo('.feat-side-1', { opacity: 0, x: -48 }, { opacity: 1, x: 0, duration: 0.12 }, 0.36)
            .fromTo('.feat-side-2', { opacity: 0, x: -48 }, { opacity: 1, x: 0, duration: 0.12 }, 0.66)
        }
      }, section)

      ScrollTrigger.refresh()
      rafId = requestAnimationFrame(rafLoop)
    }

    video.load()

    if (video.readyState >= 1 && video.duration) {
      build()
    } else {
      video.addEventListener('loadedmetadata', build, { once: true })
    }

    return () => {
      killed = true
      if (rafId) cancelAnimationFrame(rafId)
      video.removeEventListener('loadedmetadata', build)
      if (ctx) ctx.revert()
    }
  }, [isMobile])

  return (
    <section
      id="scroll-video"
      ref={sectionRef}
      className={`relative bg-white ${isMobile ? 'h-[260vh]' : 'h-[340vh]'}`}
    >
      <div className="sticky top-0 flex w-full items-center justify-center overflow-hidden">

        <video
          key={isMobile ? 'mobile' : 'desktop'}
          ref={videoRef}
          src={isMobile ? '/animation-mobile.mp4' : '/animation.mp4'}
          muted
          playsInline
          preload="auto"
          /*
           * Mobile: object-cover llena el viewport completo; solo recorta los
           * bordes laterales del video, que son fondo blanco (recorte invisible).
           * Desktop: h-auto, el elemento toma la altura real del video.
           */
          className={
            isMobile
              ? 'block h-screen w-full object-cover'
              : 'block h-auto w-full'
          }
          style={{
            mixBlendMode: 'multiply',
            willChange:   'transform',
            transform:    'translateZ(0)',
          }}
        />

        {isMobile ? (
          /* ── Overlay mobile: una caption corta, centrada abajo ── */
          CAPTIONS_MOBILE.map((c, i) => {
            const { head, tail } = lastWord(c)
            return (
              <p
                key={i}
                className={`mcap-${i} pointer-events-none absolute inset-x-0 bottom-[11vh] z-20 px-6 text-center font-display text-[2.6rem] uppercase leading-[0.95] tracking-wide text-bg`}
                style={{ opacity: 0 }}
              >
                {head}{head && ' '}
                <span className="text-gradient-gold">{tail}</span>
              </p>
            )
          })
        ) : (
          <>
            {/* ── Panel izquierdo: características del producto ── */}
            <div className="pointer-events-none absolute left-8 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4 lg:left-16">
              {FEATURES.map((f, i) => {
                const Icon = f.icon
                return (
                  <article
                    key={i}
                    className={`feat-side-${i} w-72 max-w-xs rounded-2xl border border-bg/10 bg-white/90 p-5 shadow-lg backdrop-blur-sm`}
                    style={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-gradient shadow-glow">
                        <Icon className="h-5 w-5 text-white" strokeWidth={2.2} />
                      </div>
                      <span className="font-display text-sm tracking-[0.25em] text-primary/70">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-3xl tracking-wide text-bg">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-bg/55">{f.desc}</p>
                  </article>
                )
              })}
            </div>

            {/* ── Captions del lado derecho ── */}
            {CAPTIONS.map((c, i) => {
              const { head, tail } = lastWord(c)
              return (
                <p
                  key={i}
                  className={`cap-${i} pointer-events-none absolute right-12 top-1/2 z-20 w-[38vw] max-w-sm -translate-y-1/2 text-right font-display text-6xl uppercase leading-tight tracking-wide text-bg lg:right-20 lg:max-w-md lg:text-7xl`}
                  style={{ opacity: 0 }}
                >
                  {head}{' '}
                  <span className="text-gradient-gold">{tail}</span>
                </p>
              )
            })}
          </>
        )}

      </div>
    </section>
  )
}
