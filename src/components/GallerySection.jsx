import { useEffect, useRef, useState } from 'react'
import {
  ImageOff, X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { revealGroups } from '../lib/reveal'

const GALLERY_ITEMS = [
  {
    name: 'Obelisco',
    src: '/images/copa-obelisco.png',
    alt: 'La Copa Chisperio frente al Obelisco',
  },
  {
    name: 'Perito Moreno',
    src: '/images/copa-perito-moreno.png',
    alt: 'La Copa Chisperio en el glaciar Perito Moreno',
  },
  {
    name: 'Cataratas',
    src: '/images/copa-cataratas.png',
    alt: 'La Copa Chisperio en las Cataratas del Iguazú',
  },
  {
    name: 'Puerto Madero',
    src: '/images/copa-puerto-madero.png',
    alt: 'La Copa Chisperio en Puerto Madero',
  },
  {
    name: 'La Boca',
    src: '/images/copa-la-boca.png',
    alt: 'La Copa Chisperio en La Boca',
  },
  {
    name: 'Purmamarca',
    src: '/images/copa-purmamarca.png',
    alt: 'La Copa Chisperio en Purmamarca',
  },
  {
    name: 'Malvinas',
    src: '/images/copa-malvinas.png',
    alt: 'La Copa Chisperio con homenaje a Malvinas',
    banner: true,
  },
]

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

function GalleryCard({ item, broken, onError, onOpen }) {
  const isInteractive = !broken

  const handleKeyDown = (event) => {
    if (!isInteractive) return
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onOpen()
  }

  return (
    <article
      className={`gallery-card group relative overflow-hidden rounded-[28px] border border-primary/15 bg-[#F8F4EC] shadow-[0_30px_80px_rgba(10,10,10,0.08)] ${
        item.banner ? 'sm:col-span-2 lg:col-span-3' : ''
      } ${isInteractive ? 'cursor-zoom-in' : ''}`}
      onClick={isInteractive ? onOpen : undefined}
      onKeyDown={handleKeyDown}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `Abrir imagen ${item.name}` : undefined}
    >
      {broken ? (
        <div
          className={`flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.22),rgba(248,244,236,0.96)_58%)] px-6 text-center ${
            item.banner ? 'min-h-[240px] sm:min-h-[300px]' : 'min-h-[260px] sm:min-h-[320px]'
          }`}
        >
          <div className="flex max-w-sm flex-col items-center gap-3 text-bg/60">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-white/80 text-primary">
              <ImageOff className="h-6 w-6" />
            </span>
            <span className="text-lg font-semibold text-bg">{item.name}</span>
            <p className="text-sm leading-relaxed">
              Esta foto se mostrará acá automáticamente cuando exista el archivo
              <span className="font-semibold text-primary"> {item.src.split('/').pop()}</span>.
            </p>
          </div>
        </div>
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          onError={onError}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
            item.banner ? 'min-h-[240px] sm:min-h-[300px]' : 'min-h-[260px] sm:min-h-[320px]'
          }`}
          loading="lazy"
        />
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pb-5 pt-14 text-white">
        <span className="font-display text-2xl tracking-wide sm:text-3xl">{item.name}</span>
      </div>
    </article>
  )
}

function GalleryPreview({ items, activeIndex, onClose, onPrev, onNext }) {
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
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === '+' || event.key === '=') setZoom((current) => clamp(current + 0.5, MIN_ZOOM, MAX_ZOOM))
      if (event.key === '-') setZoom((current) => clamp(current - 0.5, MIN_ZOOM, MAX_ZOOM))
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
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

export default function GallerySection() {
  const root = useRef(null)
  const [brokenImages, setBrokenImages] = useState({})
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(
    () =>
      revealGroups(root.current, [
        { sel: '.gallery-head', y: 36 },
        { sel: '.gallery-card', stagger: 0.1, watch: '.gallery-grid', y: 44 },
      ]),
    [],
  )

  useEffect(() => {
    if (activeIndex === null) return undefined

    const scrollY = window.scrollY
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousHtmlHeight = document.documentElement.style.height
    const previousOverflow = document.body.style.overflow
    const previousOverscroll = document.body.style.overscrollBehavior
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
      document.body.style.overflow = previousOverflow
      document.body.style.overscrollBehavior = previousOverscroll
      document.body.style.position = previousBodyPosition
      document.body.style.top = previousBodyTop
      document.body.style.width = previousBodyWidth
      document.body.style.height = previousBodyHeight
      document.body.style.touchAction = previousBodyTouchAction
      window.scrollTo(0, scrollY)
    }
  }, [activeIndex])

  const handleError = (src) => {
    setBrokenImages((current) => (current[src] ? current : { ...current, [src]: true }))
  }

  const openPreview = (index) => {
    setActiveIndex(index)
  }

  const closePreview = () => {
    setActiveIndex(null)
  }

  const showPrev = () => {
    setActiveIndex((current) => (current === null ? current : (current - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length))
  }

  const showNext = () => {
    setActiveIndex((current) => (current === null ? current : (current + 1) % GALLERY_ITEMS.length))
  }

  return (
    <>
      <section
        ref={root}
        className="grain relative overflow-hidden bg-white px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-24 h-[78vmin] w-[78vmin] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: 'rgba(201,168,76,0.12)' }}
        />

        <div className="relative mx-auto max-w-[92rem]">
          <div className="gallery-head mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
              GALERÍA
            </span>
            <h2 className="mt-5 text-5xl leading-[0.95] text-bg sm:text-6xl md:text-7xl">
              La Copa que está dando vueltas por toda Argentina
            </h2>
          </div>

          <div className="gallery-grid mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_ITEMS.map((item, index) => (
              <GalleryCard
                key={item.src}
                item={item}
                broken={Boolean(brokenImages[item.src])}
                onError={() => handleError(item.src)}
                onOpen={() => openPreview(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {activeIndex !== null && (
        <GalleryPreview
          items={GALLERY_ITEMS}
          activeIndex={activeIndex}
          onClose={closePreview}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </>
  )
}
