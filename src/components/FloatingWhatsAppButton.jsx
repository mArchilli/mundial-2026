import { WHATSAPP_URL } from '../lib/whatsapp'
import WhatsAppIcon from './WhatsAppIcon'

export default function FloatingWhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
      className="fixed bottom-5 right-5 z-[70] inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-white shadow-[0_18px_38px_rgba(201,168,76,0.42)] transition-transform duration-300 hover:scale-105 hover:shadow-[0_22px_44px_rgba(201,168,76,0.5)]"
    >
      <WhatsAppIcon className="block h-8 w-8" />
    </a>
  )
}
