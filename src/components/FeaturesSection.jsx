import { useEffect, useRef, useState } from 'react'
import {
  Boxes,
  Sparkles,
  CircleDot,
  Award,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Ruler,
  Thermometer,
  Package,
  Clock,
  RefreshCw,
} from 'lucide-react'
import { revealGroups } from '../lib/reveal'

const FEATURES = [
  {
    icon: Boxes,
    title: 'Impresa en 3D',
    desc: 'Cada Copa se fabrica capa por capa con impresión 3D de alta precisión: una réplica fiel del trofeo, liviana y resistente.',
  },
  {
    icon: Sparkles,
    title: 'Chispa fría integrada',
    desc: 'Aloja un cartucho de cold spark: una fuente de destellos plateados, fría al tacto, sin humo ni llama.',
  },
  {
    icon: CircleDot,
    title: 'Botón en la base',
    desc: 'Nuestro sistema PULY®: un único botón en la propia Copa la enciende. Sin cables ni técnicos, la activás vos en segundos.',
  },
  {
    icon: Award,
    title: 'Edición de lanzamiento',
    desc: 'Producción limitada por el Mundial 2026. Cada unidad llega con su estuche premium.',
  },
]

const PULY_IMAGES = [
  { src: '/images/puly-1.png', alt: 'Vista 1 del sistema PULY de la Copa' },
  { src: '/images/puly-2.png', alt: 'Vista 2 del sistema PULY de la Copa' },
  { src: '/images/puly-3.png', alt: 'Vista 3 del sistema PULY de la Copa' },
  { src: '/images/puly-4.png', alt: 'Vista 4 del sistema PULY de la Copa' },
]

const ESTUCHE_IMAGES = [
  { name: 'Estuche 1', src: '/images/estuche-1.png', alt: 'Vista 1 del estuche premium de la Copa' },
  { name: 'Estuche 2', src: '/images/estuche-2.png', alt: 'Vista 2 del estuche premium de la Copa' },
]

const SPECS = [
  { icon: Ruler, label: 'Altura de chispa', value: 'Desde 2 metros' },
  { icon: Thermometer, label: 'Temperatura', value: 'Fría al tacto' },
  { icon: Boxes, label: 'Material', value: 'PLA alta resistencia' },
  { icon: Award, label: 'Altura de la Copa', value: '27 cm' },
  { icon: Clock, label: 'Duración por cartucho', value: 'Desde 20 seg c/u' },
  { icon: RefreshCw, label: 'Cartuchos', value: 'Reemplazables' },
  { icon: Package, label: 'Sistema', value: 'Portátil e inalámbrico a batería' },
  { icon: CircleDot, label: 'Activación', value: 'Botón en la base' },
  { icon: Package, label: 'Peso aproximado', value: '400 g (incluyendo batería)' },
]

const MOBILE_QUERY = '(max-width: 639px)'
const MIN_ZOOM = 1
const MAX_ZOOM = 4

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getOffsetBounds(stageRect, zoom) {
  if (!stageRect || zoom <= 1) return { x: 0, y: 0 }

  return {
    x: ((zoom - 1) * stageRect.width) / 2,
    y: ((zoom - 1) * stageRect.height) / 2,
  }
}

function MobileCarousel({ items, activeIndex, onChange, renderItem, labelPrefix }) {
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const showPrev = () => {
    onChange((activeIndex - 1 + items.length) % items.length)
  }

  const showNext = () => {
    onChange((activeIndex + 1) % items.length)
  }

  const handleTouchStart = (event) => {
    const { clientX } = event.touches[0]
    touchStartX.current = clientX
    touchEndX.current = clientX
  }

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current

    if (Math.abs(swipeDistance) < 50) return

    if (swipeDistance > 0) {
      showNext()
      return
    }

    showPrev()
  }

  return (
    <div className="w-full sm:hidden">
      <div className="relative">
        <button
          type="button"
          onClick={showPrev}
          aria-label="Ver anterior"
          className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-white/95 text-primary shadow-glow transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>

        <button
          type="button"
          onClick={showNext}
          aria-label="Ver siguiente"
          className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-white/95 text-primary shadow-glow transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>

        <div
          className="overflow-hidden px-10"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              width: `${items.length * 100}%`,
              transform: `translateX(-${(activeIndex * 100) / items.length}%)`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={item.title ?? item.label ?? item.src ?? index}
                className="shrink-0 px-1"
                style={{ width: `${100 / items.length}%` }}
              >
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.title ?? item.label ?? item.src ?? index}
            type="button"
            onClick={() => onChange(index)}
            aria-label={`${labelPrefix} ${index + 1}`}
            aria-pressed={activeIndex === index}
            className={`h-3.5 w-3.5 rounded-full border border-primary transition-all duration-300 ${
              activeIndex === index ? 'bg-primary shadow-glow' : 'bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function ImageCarousel({
  items,
  activeIndex,
  onChange,
  labelPrefix,
  imageClassName = 'aspect-square w-full object-cover',
  onImageClick,
}) {
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const showPrev = () => {
    onChange((activeIndex - 1 + items.length) % items.length)
  }

  const showNext = () => {
    onChange((activeIndex + 1) % items.length)
  }

  const handleTouchStart = (event) => {
    const { clientX } = event.touches[0]
    touchStartX.current = clientX
    touchEndX.current = clientX
  }

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current

    if (Math.abs(swipeDistance) < 50) return

    if (swipeDistance > 0) {
      showNext()
      return
    }

    showPrev()
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-bg/8 bg-white shadow-sm">
      <button
        type="button"
        onClick={showPrev}
        aria-label={`Ver anterior de ${labelPrefix.toLowerCase()}`}
        className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-white/92 text-primary shadow-glow transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
      </button>

      <button
        type="button"
        onClick={showNext}
        aria-label={`Ver siguiente de ${labelPrefix.toLowerCase()}`}
        className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-white/92 text-primary shadow-glow transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
      </button>

      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            width: `${items.length * 100}%`,
            transform: `translateX(-${(activeIndex * 100) / items.length}%)`,
          }}
        >
          {items.map((item, index) => {
            const content = (
              <img
                src={item.src}
                alt={item.alt}
                className={imageClassName}
              />
            )

            return (
              <div
                key={item.src ?? item.alt ?? index}
                className="shrink-0"
                style={{ width: `${100 / items.length}%` }}
              >
                {onImageClick ? (
                  <button
                    type="button"
                    onClick={() => onImageClick(index)}
                    className="block w-full"
                    aria-label={`Abrir ${item.name ?? `${labelPrefix} ${index + 1}`}`}
                  >
                    {content}
                  </button>
                ) : (
                  content
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.src ?? item.alt ?? index}
            type="button"
            onClick={() => onChange(index)}
            aria-label={`${labelPrefix} ${index + 1}`}
            aria-pressed={activeIndex === index}
            className={`h-3.5 w-3.5 rounded-full border border-primary transition-all duration-300 ${
              activeIndex === index ? 'bg-primary shadow-glow' : 'bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function FeatureImagePreview({ items, activeIndex, onClose, onPrev, onNext }) {
  const item = items[activeIndex]
  const stageRef = useRef(null)
  const dragRef = useRef(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }, [activeIndex])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === '+' || event.key === '=') {
        setZoom((current) => clamp(current + 0.5, MIN_ZOOM, MAX_ZOOM))
      }
      if (event.key === '-') {
        setZoom((current) => clamp(current - 0.5, MIN_ZOOM, MAX_ZOOM))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrev])

  useEffect(() => {
    const preventScroll = (event) => event.preventDefault()
    const preventScrollKeys = (event) => {
      const blockedKeys = [' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown']
      if (blockedKeys.includes(event.key)) event.preventDefault()
    }

    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })
    window.addEventListener('keydown', preventScrollKeys, { passive: false })

    return () => {
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
      window.removeEventListener('keydown', preventScrollKeys)
    }
  }, [])

  const updateZoom = (nextZoom) => {
    const stageRect = stageRef.current?.getBoundingClientRect()
    const clampedZoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM)
    const bounds = getOffsetBounds(stageRect, clampedZoom)

    setZoom(clampedZoom)
    setOffset((current) => ({
      x: clamp(current.x, -bounds.x, bounds.x),
      y: clamp(current.y, -bounds.y, bounds.y),
    }))
  }

  const handleWheel = (event) => {
    event.preventDefault()
    updateZoom(zoom + (event.deltaY < 0 ? 0.35 : -0.35))
  }

  const handlePointerDown = (event) => {
    if (zoom <= 1) return

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    }

    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return

    const stageRect = stageRef.current?.getBoundingClientRect()
    const bounds = getOffsetBounds(stageRect, zoom)
    const nextX = dragRef.current.offsetX + (event.clientX - dragRef.current.startX)
    const nextY = dragRef.current.offsetY + (event.clientY - dragRef.current.startY)

    setOffset({
      x: clamp(nextX, -bounds.x, bounds.x),
      y: clamp(nextY, -bounds.y, bounds.y),
    })
  }

  const handlePointerUp = (event) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return
    dragRef.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const handleDoubleClick = () => {
    if (zoom > 1) {
      setZoom(1)
      setOffset({ x: 0, y: 0 })
      return
    }

    setZoom(2.2)
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-black/70 px-3 py-4 backdrop-blur-md sm:px-6"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      style={{ overscrollBehavior: 'contain' }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
        aria-label="Cerrar previsualización"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onPrev()
        }}
        className="absolute left-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:inline-flex"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onNext()
        }}
        className="absolute right-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:inline-flex"
        aria-label="Imagen siguiente"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div
        className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center gap-4 overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          ref={stageRef}
          className="relative flex h-full max-h-[72vh] w-full items-center justify-center overflow-hidden rounded-[28px] bg-[#0d0d11]"
          onWheel={handleWheel}
          onDoubleClick={handleDoubleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: zoom > 1 ? 'none' : 'manipulation' }}
        >
          <img
            src={item.src}
            alt={item.alt}
            className={`max-h-full max-w-full object-contain select-none ${
              zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
            }`}
            draggable="false"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              transition: dragRef.current ? 'none' : 'transform 180ms ease-out',
            }}
          />
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-2 text-white backdrop-blur">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              updateZoom(zoom - 0.5)
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            aria-label="Alejar imagen"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setZoom(1)
              setOffset({ x: 0, y: 0 })
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            aria-label="Restablecer zoom"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              updateZoom(zoom + 0.5)
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            aria-label="Acercar imagen"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <span className="min-w-[3.5rem] text-center text-sm font-medium">{zoom.toFixed(1)}x</span>
        </div>

        <div className="flex items-center gap-3 text-center text-white">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 sm:hidden"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div>
            <p className="font-display text-3xl tracking-wide sm:text-4xl">{item.name}</p>
            <p className="mt-1 text-sm text-white/70">
              Tocá o hacé doble click para alternar el zoom. Arrastrá la imagen cuando esté ampliada.
            </p>
          </div>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 sm:hidden"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FeaturesSection() {
  const root = useRef(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const [activeEstucheImage, setActiveEstucheImage] = useState(0)
  const [activeEstuchePreviewIndex, setActiveEstuchePreviewIndex] = useState(null)
  const [activePulyImage, setActivePulyImage] = useState(0)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches,
  )

  useEffect(
    () =>
      revealGroups(root.current, [
        { sel: '.feat-head', y: 40 },
        { sel: '.feat-card', stagger: 0.12, watch: '.feat-grid' },
        { sel: '.feat-gallery', y: 36 },
        { sel: '.step-head', y: 36 },
        { sel: '.step-image', y: 36 },
        { sel: '.spec-panel', y: 44 },
      ]),
    [],
  )

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (event) => setIsMobile(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!isMobile) return undefined

    const timeoutId = window.setTimeout(() => {
      setActiveFeature((current) => (current + 1) % FEATURES.length)
    }, 3000)

    return () => window.clearTimeout(timeoutId)
  }, [activeFeature, isMobile])

  useEffect(() => {
    if (!isMobile) return undefined

    const timeoutId = window.setTimeout(() => {
      setActiveEstucheImage((current) => (current + 1) % ESTUCHE_IMAGES.length)
    }, 3200)

    return () => window.clearTimeout(timeoutId)
  }, [activeEstucheImage, isMobile])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActivePulyImage((current) => (current + 1) % PULY_IMAGES.length)
    }, 3200)

    return () => window.clearTimeout(timeoutId)
  }, [activePulyImage])

  useEffect(() => {
    if (activeEstuchePreviewIndex === null) return undefined

    const scrollY = window.scrollY
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousHtmlHeight = document.documentElement.style.height
    const previousBodyOverflow = document.body.style.overflow
    const previousBodyOverscroll = document.body.style.overscrollBehavior
    const previousBodyPosition = document.body.style.position
    const previousBodyTop = document.body.style.top
    const previousBodyWidth = document.body.style.width
    const previousBodyHeight = document.body.style.height
    const previousHtmlTouchAction = document.documentElement.style.touchAction
    const previousBodyTouchAction = document.body.style.touchAction

    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.height = '100%'
    document.documentElement.style.touchAction = 'none'
    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'contain'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    document.body.style.touchAction = 'none'

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.documentElement.style.height = previousHtmlHeight
      document.documentElement.style.touchAction = previousHtmlTouchAction
      document.body.style.overflow = previousBodyOverflow
      document.body.style.overscrollBehavior = previousBodyOverscroll
      document.body.style.position = previousBodyPosition
      document.body.style.top = previousBodyTop
      document.body.style.width = previousBodyWidth
      document.body.style.height = previousBodyHeight
      document.body.style.touchAction = previousBodyTouchAction
      window.scrollTo(0, scrollY)
    }
  }, [activeEstuchePreviewIndex])

  const openEstuchePreview = (index) => {
    setActiveEstuchePreviewIndex(index)
  }

  const closeEstuchePreview = () => {
    setActiveEstuchePreviewIndex(null)
  }

  const showPrevEstuchePreview = () => {
    setActiveEstuchePreviewIndex((current) =>
      current === null ? current : (current - 1 + ESTUCHE_IMAGES.length) % ESTUCHE_IMAGES.length,
    )
  }

  const showNextEstuchePreview = () => {
    setActiveEstuchePreviewIndex((current) =>
      current === null ? current : (current + 1) % ESTUCHE_IMAGES.length,
    )
  }

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
          <h2 className="mt-4 text-6xl text-bg sm:text-7xl md:text-8xl">
            Diseñada para <span className="text-gradient-gold">brillar</span>
          </h2>
          <p className="mt-5 text-bg/55">
            La Copa Mundial 2026 reúne lo que Chisperio sabe hacer mejor: el espectáculo
            de la chispa fría, ahora en tus manos y en forma del trofeo más codiciado del fútbol.
          </p>
        </div>

        <div className="feat-grid mt-16 hidden w-full grid-cols-2 gap-6 sm:grid lg:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <article
                key={index}
                className="feat-card group relative flex flex-col items-center overflow-hidden rounded-2xl border border-bg/8 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-glow"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center text-primary">
                  <Icon className="h-7 w-7 text-primary" strokeWidth={2.2} />
                </div>
                <h3 className="text-3xl text-bg">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bg/55">{feature.desc}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-16 w-full sm:hidden">
          <MobileCarousel
            items={FEATURES}
            activeIndex={activeFeature}
            onChange={setActiveFeature}
            labelPrefix="Ver característica"
            renderItem={(feature) => {
              const Icon = feature.icon
              return (
                <article className="group flex min-h-[248px] flex-col items-center overflow-hidden rounded-2xl border border-bg/8 bg-white p-7 text-center shadow-sm">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center text-primary">
                    <Icon className="h-7 w-7 text-primary" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-3xl text-bg">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bg/55">{feature.desc}</p>
                </article>
              )
            }}
          />
        </div>

        <div className="feat-gallery mt-10 w-full">
          <div className="mx-auto hidden max-w-4xl gap-5 sm:grid sm:grid-cols-2">
            {ESTUCHE_IMAGES.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => openEstuchePreview(index)}
                className="group overflow-hidden rounded-[2rem] border border-bg/8 bg-white shadow-sm"
                aria-label={`Abrir ${image.name}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>

          <div className="mx-auto w-full max-w-[24rem] sm:hidden">
            <ImageCarousel
              items={ESTUCHE_IMAGES}
              activeIndex={activeEstucheImage}
              onChange={setActiveEstucheImage}
              labelPrefix="Ver imagen del estuche"
              onImageClick={openEstuchePreview}
            />
          </div>

          <p className="mt-4 text-center text-sm text-bg/55">
            Estuche Premium incluido en tu compra.
          </p>
        </div>

        <div id="como-funciona" className="mt-32 flex w-full scroll-mt-24 flex-col items-center">
          <div className="step-head mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Cómo funciona
            </span>
            <h2 className="mt-4 text-5xl text-bg sm:text-6xl md:text-7xl">
              Tres pasos. <span className="text-gradient-gold">Cero complicaciones.</span>
            </h2>
            <p className="mt-5 text-bg/55">
              No necesitás técnicos ni instalación. La Copa fue pensada para que cualquiera
              encienda el espectáculo en segundos.
            </p>
          </div>

          <div className="step-image mt-14 w-full max-w-[24rem] sm:max-w-[34rem]">
            <ImageCarousel
              items={PULY_IMAGES}
              activeIndex={activePulyImage}
              onChange={setActivePulyImage}
              labelPrefix="Ver imagen del sistema PULY"
            />
            <p className="mt-4 text-center text-sm text-bg/55">
              Nuestro sistema PULY® se activa únicamente con un botón.
            </p>
          </div>
        </div>

        <div className="spec-panel mt-24 w-full max-w-4xl rounded-3xl border border-primary/20 bg-white p-8 shadow-sm sm:p-12">
          <div className="text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Ficha técnica
            </span>
            <h3 className="mt-3 text-4xl text-bg sm:text-5xl">Cada detalle, medido</h3>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
            {SPECS.map((spec, index) => {
              const Icon = spec.icon
              return (
                <div
                  key={spec.label}
                  className={`flex flex-col items-center text-center ${
                    index === SPECS.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  <Icon className="h-6 w-6 text-primary" strokeWidth={2} />
                  <span className="mt-2 text-[11px] uppercase tracking-[0.16em] text-bg/40">
                    {spec.label}
                  </span>
                  <span className="mt-0.5 font-display text-2xl tracking-wide text-bg">
                    {spec.value}
                  </span>
                </div>
              )
            })}
          </div>
          <p className="mt-10 text-center text-sm text-bg/55">
            Conocé también las medidas de{' '}
            <a
              href="./?page=security"
              className="font-semibold text-primary-dark underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary"
            >
              seguridad
            </a>
            .
          </p>
        </div>
      </div>

      {activeEstuchePreviewIndex !== null && (
        <FeatureImagePreview
          items={ESTUCHE_IMAGES}
          activeIndex={activeEstuchePreviewIndex}
          onClose={closeEstuchePreview}
          onPrev={showPrevEstuchePreview}
          onNext={showNextEstuchePreview}
        />
      )}
    </section>
  )
}
