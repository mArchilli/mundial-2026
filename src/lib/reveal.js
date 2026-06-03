import { gsap } from 'gsap'

/**
 * Revela grupos de elementos al entrar en viewport con IntersectionObserver.
 *
 * A diferencia de ScrollTrigger no depende de medir el scroll ni de refrescos:
 * observa directamente la visibilidad del elemento, así que no se rompe por
 * reflows, carga de fuentes ni por el scroll suavizado de Lenis. Si el JS no
 * corre, el contenido queda visible por defecto (nunca se atasca en opacity:0).
 *
 * @param {HTMLElement|null} rootEl  Contenedor donde buscar los selectores.
 * @param {Array<{sel:string, stagger?:number, watch?:string, y?:number}>} groups
 *   - sel:     selector de los elementos a animar
 *   - stagger: retardo entre elementos del grupo
 *   - watch:   selector del elemento que dispara el grupo (por defecto, el 1°)
 *   - y:       desplazamiento inicial en px
 * @returns {Function} cleanup
 */
export function revealGroups(rootEl, groups) {
  if (!rootEl) return () => {}
  const observers = []

  const isVisibleTarget = (el) => {
    if (!el) return false

    const style = window.getComputedStyle(el)
    return style.display !== 'none' && style.visibility !== 'hidden' && el.getClientRects().length > 0
  }

  groups.forEach(({ sel, stagger = 0, watch, y = 48 }) => {
    const els = gsap.utils.toArray(rootEl.querySelectorAll(sel))
    if (!els.length) return

    gsap.set(els, { opacity: 0, y })

    const fallbackTarget = els.find((el) => isVisibleTarget(el)) ?? els[0]
    const watchedTarget = watch ? rootEl.querySelector(watch) : null
    const target = isVisibleTarget(watchedTarget) ? watchedTarget : fallbackTarget
    const show = () =>
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger,
      })

    if (!target) {
      show()
      return
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries.some((e) => e.isIntersecting)) return
        show()
        obs.disconnect()
      },
      { threshold: 0, rootMargin: '0px 0px -100px 0px' },
    )
    io.observe(target)
    observers.push(io)
  })

  return () => observers.forEach((o) => o.disconnect())
}
