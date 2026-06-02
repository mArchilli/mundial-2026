import { useEffect, useRef, useState } from 'react'
import { ImageOff } from 'lucide-react'
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
    alt: 'La Copa Chisperio en las Cataratas del Iguazu',
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

function GalleryCard({ item, broken, onError }) {
  return (
    <article
      className={`gallery-card group relative overflow-hidden rounded-[28px] border border-primary/15 bg-[#F8F4EC] shadow-[0_30px_80px_rgba(10,10,10,0.08)] ${
        item.banner ? 'sm:col-span-2 lg:col-span-3' : ''
      }`}
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

export default function GallerySection() {
  const root = useRef(null)
  const [brokenImages, setBrokenImages] = useState({})

  useEffect(
    () =>
      revealGroups(root.current, [
        { sel: '.gallery-head', y: 36 },
        { sel: '.gallery-card', stagger: 0.1, watch: '.gallery-grid', y: 44 },
      ]),
    [],
  )

  const handleError = (src) => {
    setBrokenImages((current) => (current[src] ? current : { ...current, [src]: true }))
  }

  return (
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
          {GALLERY_ITEMS.map((item) => (
            <GalleryCard
              key={item.src}
              item={item}
              broken={Boolean(brokenImages[item.src])}
              onError={() => handleError(item.src)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
