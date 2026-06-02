import { Instagram } from 'lucide-react'
import { WHATSAPP_URL } from '../lib/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

const INSTAGRAM_URL = 'https://www.instagram.com/chisperio.argentina/'

export default function Footer() {
  return (
    <footer className="relative flex flex-col items-center gap-4 bg-white px-6 pb-12 pt-8 text-xs uppercase tracking-[0.25em] text-bg/30">
      <img
        src="/images/chisperio-logo.png"
        alt="Chisperio"
        className="h-auto w-[130px] opacity-75"
      />
      <span>Copa Mundial 2026 - Encendé la gloria</span>
      <span className="tracking-[0.15em] text-bg/25">Efectos de chispa fría para eventos</span>
      <div className="mt-2 flex items-center gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-[#F8F4EC] text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-[#F8F4EC] text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
        >
          <Instagram className="h-5 w-5" strokeWidth={2.2} />
        </a>
      </div>
    </footer>
  )
}
