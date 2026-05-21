import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import ScrollVideoSection from './components/ScrollVideoSection'
import FeaturesSection from './components/FeaturesSection'
import PricingSection from './components/PricingSection'
import CTASection from './components/CTASection'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,          // suavidad del scroll (0 = sin suavizado, 1 = máximo)
      smoothWheel: true,
    })

    // Conectar Lenis con ScrollTrigger: cada frame de Lenis actualiza ST
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    // Lenis corre dentro del ticker de GSAP para estar sincronizados
    const lenisRaf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(lenisRaf)
    gsap.ticker.lagSmoothing(0)

    /*
     * Las fuentes de Google (Bebas Neue es enorme) cargan async y reescalan
     * el layout DESPUÉS de crearse los ScrollTrigger. Sin recalcular, los
     * reveals quedan con posiciones viejas y nunca disparan → contenido
     * atascado en opacity:0. Refrescamos al terminar de cargar fuentes/assets.
     */
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(lenisRaf)
      window.removeEventListener('load', refresh)
      lenis.destroy()
    }
  }, [])

  return (
    <main className="bg-white text-bg">
      <NavBar />
      <HeroSection />
      <ScrollVideoSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </main>
  )
}
