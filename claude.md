# CLAUDE.md — Contexto del Proyecto: Landing Promocional Mundial 2026

## 🎯 Objetivo del Proyecto

Landing page promocional para un producto lanzado en el contexto del **FIFA World Cup 2026** (Estados Unidos, Canadá y México como sedes). El sitio debe ser visualmente impactante, moderno y 100% temático al mundial de fútbol.

---

## 🎬 Animación Central del Sitio

El video fuente se llama **`animation.mp4`** y se encuentra en la **raíz del proyecto**.

### ¿Qué muestra el video?
El video contiene la animación de una **réplica del trofeo FIFA World Cup** (dorado con base verde) sobre fondo blanco, con la siguiente secuencia:
1. La tapa circular dorada del trofeo se levanta y desaparece hacia arriba
2. Una **bengala de chispa fría** (cold spark fountain) desciende desde arriba e ingresa al hueco del trofeo
3. La bengala se enciende y genera una **fuente de chispas blancas y plateadas** que explotan hacia arriba dramáticamente

### ¿Cómo debe integrarse la animación?
La animación del video debe implementarse como una **experiencia scroll-driven**:
- El video debe reproducirse en función del **progreso del scroll** del usuario (scroll-scrubbing)
- Cada frame del video debe corresponder a una posición del scroll
- El usuario "controla" la animación bajando y subiendo en la página
- La sección de animación debe tener suficiente altura (al menos 300vh) para que el scroll sea gradual y cinematográfico
- El video debe estar fijo en pantalla (position: sticky) mientras el scroll avanza
- Técnica recomendada: `currentTime = (scrollProgress) * video.duration`

---

## 🏗️ Estructura del Sitio

### Sección 1 — Hero Section (viewport completo)
- Título principal del producto/evento
- Subtítulo con referencia al Mundial 2026
- CTA button (ej: "Descubrí el producto")
- Fondo con efectos visuales temáticos (colores del mundial, partículas, gradientes)
- Animación de entrada con stagger en los elementos

### Sección 2 — Animación Scroll-Driven (300vh de altura)
- El video `animation.mp4` se reproduce controlado por el scroll
- El video ocupa el centro de la pantalla con position sticky
- Texto descriptivo que aparece en etapas según el progreso del scroll:
  - ~0%: "El trofeo más codiciado del mundo"
  - ~40%: "Un producto que celebra la gloria"  
  - ~80%: "Encendé tu pasión por el fútbol"
- Fondo oscuro para contrastar con las chispas del video

### Sección 3 — Features / Beneficios del Producto
- Grid de características visuales
- Iconografía relacionada al fútbol y al trofeo
- Animaciones de entrada con Intersection Observer

### Sección 4 — CTA Final
- Call to action para pre-registro o compra
- Countdown hasta el inicio del Mundial (junio 2026)
- Formulario de email o botón de compra

---

## 🎨 Identidad Visual

### Paleta de Colores (CSS Variables)
```css
--color-primary: #C9A84C;      /* Dorado trofeo */
--color-primary-dark: #8B6914; /* Dorado oscuro */
--color-accent: #1A5276;       /* Azul FIFA */
--color-accent-2: #E74C3C;     /* Rojo pasión */
--color-bg: #0A0A0F;           /* Negro profundo */
--color-bg-2: #12121A;         /* Negro suave */
--color-text: #F5F5F0;         /* Blanco cálido */
--color-spark: #FFFFFF;        /* Blanco chispas */
--color-gold-glow: rgba(201, 168, 76, 0.3); /* Resplandor dorado */
```

### Tipografía
- **Display/Títulos**: Fuente bold, condensada, impactante (ej: Bebas Neue, Anton, Barlow Condensed vía Google Fonts)
- **Body**: Fuente limpia y legible (ej: DM Sans, Outfit, Nunito Sans)

### Estética General
- Dark theme dominante con destellos dorados
- Partículas o destellos sutiles en el fondo tipo "confetti/chispas"
- Bordes y acentos en gradiente dorado
- Sombras dramáticas con glow effect en color dorado
- Textura sutil de ruido/grain para profundidad

---

## ⚙️ Stack Tecnológico

- **Framework**: React (sin TypeScript, JavaScript vanilla)
- **Estilos**: Tailwind CSS
- **Animaciones**: CSS animations + Intersection Observer API + scroll event listener
- **Video**: HTML5 `<video>` tag con `currentTime` sincronizado al scroll
- **Sin dependencias de animación externas** (no GSAP, no Framer Motion) — usar Web APIs nativas

---

## 📁 Estructura de Archivos Esperada

```
/
├── claude.md              ← este archivo
├── animation.mp4          ← video de la animación (ya existe)
├── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── components/
│       ├── HeroSection.jsx
│       ├── ScrollVideoSection.jsx
│       ├── FeaturesSection.jsx
│       └── CTASection.jsx
├── package.json
└── vite.config.js
```

---

## 🔧 Implementación Técnica del Scroll-Video

```javascript
// Ejemplo de lógica para scroll-driven video
useEffect(() => {
  const video = videoRef.current;
  const section = sectionRef.current;
  
  const handleScroll = () => {
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));
    
    if (video.duration) {
      video.currentTime = progress * video.duration;
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

El video debe tener:
- `muted` (requerido por browsers para autoplay)
- `playsInline`
- `preload="auto"`
- Control manual de `currentTime` (NO autoplay)

---

## 🌍 Contexto del Mundial 2026

- **Nombre oficial**: FIFA World Cup 2026™
- **Sedes**: 16 ciudades en USA, Canadá y México
- **Inicio**: Junio 2026
- **Formato**: 48 selecciones (primera edición con este formato)
- **Slogan temático sugerido para el producto**: "Encendé la gloria" / "Spark the glory"

---

## ✅ Criterios de Calidad

1. El scroll-scrubbing debe ser suave y sin saltos (throttle o requestAnimationFrame si es necesario)
2. El video debe estar preloaded para evitar lag durante el scroll
3. Responsive: mobile-first, funcionar bien en pantallas desde 375px
4. El Hero debe impactar en los primeros 3 segundos de visualización
5. Performance: evitar re-renders innecesarios en React durante el scroll
6. Todos los textos deben estar en español (Argentina/Latam)
