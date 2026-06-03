import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import ScrollVideoSection from './components/ScrollVideoSection'
import SocialProofSection from './components/SocialProofSection'
import FeaturesSection from './components/FeaturesSection'
import FAQSection from './components/FAQSection'
import PricingSection from './components/PricingSection'
import CTASection from './components/CTASection'
import SecurityPage from './components/SecurityPage'
import GallerySection from './components/GallerySection'
import Footer from './components/Footer'
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton'
import { DEFAULT_PACK_ID } from './lib/pricing'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
  const searchParams = new URLSearchParams(window.location.search)
  const isSecurityPage = pathname === '/security' || searchParams.get('page') === 'security'
  const [selectedPackId, setSelectedPackId] = useState(DEFAULT_PACK_ID)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const lenisRaf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(lenisRaf)
    gsap.ticker.lagSmoothing(0)

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

  if (isSecurityPage) {
    return (
      <>
        <SecurityPage />
        <FloatingWhatsAppButton />
      </>
    )
  }

  return (
    <>
      <main className="bg-white text-bg">
        <NavBar selectedPackId={selectedPackId} />
        <HeroSection selectedPackId={selectedPackId} />
        <ScrollVideoSection />
        <SocialProofSection />
        <FeaturesSection />
        <FAQSection />
        <PricingSection selectedPackId={selectedPackId} onPackChange={setSelectedPackId} />
        <CTASection />
        <GallerySection />
        <Footer />
      </main>
      <FloatingWhatsAppButton />
    </>
  )
}
