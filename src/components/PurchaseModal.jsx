import { useEffect } from 'react'
import { ArrowRight, MapPin, X } from 'lucide-react'
import { getBranchWhatsAppLinks } from '../lib/whatsapp'

export default function PurchaseModal({ isOpen, onClose, selectedPack }) {
  const branchLinks = getBranchWhatsAppLinks(selectedPack)

  useEffect(() => {
    if (!isOpen) return undefined

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    const previousBodyOverscroll = document.body.style.overscrollBehavior

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'contain'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      document.body.style.overscrollBehavior = previousBodyOverscroll
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/60 px-4 py-4 backdrop-blur-md sm:px-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="purchase-modal-title"
      aria-describedby="purchase-modal-description"
    >
      <div
        className="grain relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-primary/20 bg-[#F8F4EC] shadow-[0_32px_80px_rgba(10,10,15,0.34)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="pointer-events-none absolute -left-10 top-0 h-36 w-36 rounded-full blur-3xl"
          style={{ background: 'rgba(201,168,76,0.16)' }}
        />
        <div
          className="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full blur-3xl"
          style={{ background: 'rgba(201,168,76,0.12)' }}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar modal de compra"
          className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-white/80 text-primary-dark transition-colors duration-300 hover:bg-primary hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative px-5 pb-6 pt-14 sm:px-8 sm:pb-8 sm:pt-16">
          <img
            src="/images/chisperio-logo.png"
            alt="Chisperio"
            className="mx-auto mb-6 h-auto w-[150px] sm:mb-7 sm:w-[180px]"
          />

          <h2
            id="purchase-modal-title"
            className="max-w-md text-4xl leading-[0.92] text-bg sm:text-5xl"
          >
            Contamos con dos sucursales de Chisperio.
          </h2>

          <p
            id="purchase-modal-description"
            className="mt-4 max-w-lg text-sm leading-relaxed text-bg/60 sm:text-base"
          >
            Elegí la que te quede más cómoda para encender la gloria de una vez por todas.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {branchLinks.map((branch) => (
              <a
                key={branch.id}
                href={branch.url}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="group flex min-h-[168px] flex-col justify-between rounded-[1.6rem] border border-primary/20 bg-white/92 p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow"
              >
                <div>
                  <p className="flex items-center gap-3 text-[1.35rem] font-bold leading-tight text-bg sm:text-xl">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-white shadow-glow">
                      <MapPin className="h-5 w-5" strokeWidth={2.2} />
                    </span>
                    <span>
                      {branch.buttonLabel.replace(branch.city, '').trim()}{' '}
                      <span className="text-gradient-gold">{branch.city}</span>
                    </span>
                  </p>
                </div>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark transition-transform duration-300 group-hover:translate-x-1">
                  Continuar asesoramiento por WhatsApp
                  <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                </span>
              </a>
            ))}
          </div>

          {selectedPack && (
            <p className="mt-5 text-center text-sm leading-relaxed text-bg/60">
              Vas a consultar por la Copa Mundial Chisperio 2026:{' '}
              <span className="font-semibold text-bg">
                {selectedPack.label} - {selectedPack.priceText}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
