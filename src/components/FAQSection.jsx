import { useEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { revealGroups } from '../lib/reveal'
import { WHATSAPP_URL } from '../lib/whatsapp'

const FAQS = [
  {
    q: '¿Es seguro usarla en interiores?',
    a: 'Sí. La chispa fría no emite calor, humo ni llama. Funciona perfectamente en espacios cerrados y es segura cerca de personas.',
  },
  {
    q: '¿Cuánto dura cada cartucho?',
    a: 'Depende del cartucho que elijas. Por defecto vienen con 3 cartuchos de 2 metros de chispa por 20 segundos. También está la opción de cartuchos de 3 metros por 30 segundos y 4 metros por 30 segundos.',
  },
  {
    q: '¿Dónde consigo más cartuchos?',
    a: (
      <>
        Los cartuchos de repuesto se conseguirán directamente en nuestra tienda:{' '}
        <a
          href="https://chisperio.com.ar"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-primary-dark underline decoration-primary/50 underline-offset-4"
        >
          chisperio.com.ar
        </a>{' '}
        o escribinos a{' '}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-primary-dark underline decoration-primary/50 underline-offset-4"
        >
          WhatsApp
        </a>{' '}
        para adquirir más.
      </>
    ),
  },
  {
    q: '¿Tiene garantía?',
    a: 'Sí, la Copa incluye 3 meses de garantía solo por defectos de fabricación.',
  },
  {
    q: '¿En cuánto tiempo recibo el pedido?',
    a: 'Los envíos de la edición de lanzamiento comienzan en junio de 2026. El tiempo estimado de entrega varía según la zona del país.',
  },
]

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className="faq-item overflow-hidden rounded-2xl border border-bg/8 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-lg font-bold text-bg">{q}</span>
        <Plus
          className={`h-5 w-5 shrink-0 text-primary-dark transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
          strokeWidth={2.4}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-bg/60">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const root = useRef(null)
  const [openIdx, setOpenIdx] = useState(0)

  useEffect(
    () =>
      revealGroups(root.current, [
        { sel: '.faq-head', y: 40 },
        { sel: '.faq-item', stagger: 0.1, watch: '.faq-list', y: 28 },
      ]),
    [],
  )

  return (
    <section
      id="faq"
      ref={root}
      className="grain relative overflow-hidden bg-white px-6 py-28 sm:py-32"
    >
      <div className="relative mx-auto flex max-w-3xl flex-col">
        <div className="faq-head mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Antes de comprar
          </span>
          <h2 className="mt-4 text-6xl text-bg sm:text-7xl">
            Preguntas <span className="text-gradient-gold">frecuentes</span>
          </h2>
        </div>

        <div className="faq-list mt-12 flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
