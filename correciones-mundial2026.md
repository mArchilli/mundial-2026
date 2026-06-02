\# INSTRUCCIONES DE MEJORAS — Landing Page Chisperío Copa Mundial 2026

\# URL: https://chisperio.archillimatias.dev/

\# Documento generado para implementación en IDE



\---



\## CAMBIO 1 — Hero: Mejorar la jerarquía del subtítulo descriptivo



\*\*Sección:\*\* Hero (`region\[ref\_10]`)

\*\*Elemento:\*\* `generic\[ref\_15]` (el párrafo descriptivo debajo del H1)

\*\*Problema:\*\* El texto que explica qué es el producto está en fuente pequeña y pasa desapercibido. Un visitante nuevo que no lo lee no entiende qué está comprando.



\*\*Acción:\*\* Aumentar el tamaño de fuente del párrafo descriptivo del hero para que sea visualmente más prominente. Sugerido: al menos `text-xl` o equivalente. Considerar también separarlo en dos líneas para mejorar la lectura:

\- Línea 1: "Una réplica de la Copa del Mundo que lanza chispas frías con solo apretar un botón."

\- Línea 2: "Impresa en 3D. Sin humo. Sin calor."



\---



\## CAMBIO 2 — Hero: Diferenciar visualmente el CTA primario del secundario



\*\*Sección:\*\* Hero (`region\[ref\_10]`)

\*\*Elementos:\*\* `link\[ref\_18]` (Comprar ahora · US$200) y `link\[ref\_20]` (Ver cómo funciona)

\*\*Problema:\*\* Ambos botones tienen jerarquía visual muy similar (uno relleno dorado, el otro outline dorado con fondo). El botón secundario compite en peso visual con el primario.



\*\*Acción:\*\* Reducir la prominencia del botón secundario "Ver cómo funciona":

\- Quitar el fondo del botón secundario (dejarlo solo como texto con flecha o link subrayado).

\- Reducir su tamaño de fuente o padding para que sea claramente secundario.

\- El botón primario debe ser el único elemento llamativo en esa zona.



\---



\## CAMBIO 3 — Hero / Sección producto: Agregar sección de Prueba Social



\*\*Sección:\*\* Insertar entre `region\[ref\_25]` (scroll animado del producto) y `region\[ref\_41]` (características)

\*\*Problema:\*\* No existe ningún elemento de prueba social en toda la página. Para un producto de US$200 en pre-venta esto es una barrera de conversión crítica.



\*\*Acción:\*\* Crear una nueva sección con alguno de los siguientes elementos (usar los que estén disponibles):

\- 3 a 5 testimonios cortos de clientes o early adopters con nombre y foto.

\- Número de unidades reservadas: \*"Más de X unidades reservadas"\*.

\- Logos de medios o eventos donde Chisperío participó.

\- Fotos o videos de clientes usando el producto en eventos reales.



\*\*Estructura sugerida de la sección:\*\*

```html

<section id="social-proof">

&#x20; <p class="eyebrow">Lo que dicen quienes ya lo tienen</p>

&#x20; <h2>Festejaron con gloria</h2>

&#x20; <div class="testimonials-grid">

&#x20;   <!-- 3 cards con foto, nombre, texto corto -->

&#x20; </div>

&#x20; <!-- O alternativamente: contador de unidades vendidas -->

&#x20; <p class="units-sold">+150 unidades reservadas · Edición limitada</p>

</section>

```



\---



\## CAMBIO 4 — Sección animada del producto: Mejorar claridad del mecanismo "Porta chispas"



\*\*Sección:\*\* `region\[ref\_25]` — scroll animado con los 3 artículos

\*\*Elemento:\*\* `article\[ref\_29]` — "Porta chispas"

\*\*Problema:\*\* No queda claro visualmente que la Copa misma aloja el cartucho internamente. Las imágenes muestran el trofeo con la tapa abierta pero sin indicación visual del mecanismo.



\*\*Acción:\*\*

\- Agregar una flecha o indicador visual animado apuntando al compartimento del cartucho en la imagen del trofeo cuando se llega al paso "Porta chispas".

\- Opcionalmente, ampliar el texto descriptivo del card: \*"Aloja un cartucho de chispa fría en su interior. Se encastra solo desde arriba, sin herramientas."\*



\---



\## CAMBIO 5 — Ficha técnica: Agregar datos de duración y costo de recarga



\*\*Sección:\*\* `region\[ref\_41]` — Ficha técnica

\*\*Elementos:\*\* `generic\[ref\_78]` (Cartuchos) y `generic\[ref\_79]` (Reemplazables)

\*\*Problema:\*\* Dice "Reemplazables" pero no indica cuántos usos dura cada cartucho ni cuánto cuestan los repuestos. Es una duda de compra frecuente en productos de este tipo.



\*\*Acción:\*\* Agregar dos nuevas filas a la ficha técnica:

\- \*\*Duración por cartucho:\*\* 30 segundos c/u (ya está en el pack pero no en la ficha)

\- \*\*Cartuchos de repuesto:\*\* Disponibles en \[link a tienda o "próximamente"]



También agregar en el texto del item `generic\[ref\_79]` algo como: \*"Reemplazables · 30 s por cartucho"\*



\---



\## CAMBIO 6 — Sección de compra: Explicar la lógica del precio único entre packs



\*\*Sección:\*\* `region\[ref\_82]` — "Conseguí la tuya"

\*\*Elemento:\*\* `generic\[ref\_86]` (subtítulo de la sección de compra)

\*\*Problema:\*\* "El precio es siempre el mismo" es contraintuitivo. El usuario espera pagar más por más cartuchos. Sin explicación, genera desconfianza.



\*\*Acción:\*\* Agregar un micro-texto debajo del selector de packs (`generic\[ref\_96]`) que explique la lógica. Ejemplo:

> \*"La Copa tiene precio fijo. Los cartuchos son parte del pack de bienvenida, no un costo adicional."\*



O agregar un tooltip/ícono de info `ⓘ` al lado del precio que al hover muestre esa explicación.



\---



\## CAMBIO 7 — Sección de compra: Agregar sección de "Para quién es este producto"



\*\*Sección:\*\* Insertar antes o dentro de `region\[ref\_82]` (sección de compra)

\*\*Problema:\*\* La página no dice explícitamente para qué contextos sirve el producto, asumiendo que el visitante lo infiere. Esto limita el universo de compradores.



\*\*Acción:\*\* Agregar una sección corta con casos de uso / buyer personas. Puede ser un simple bloque de íconos + texto. Ejemplos:



```html

<section id="para-quien">

&#x20; <h3>¿Para qué ocasión?</h3>

&#x20; <ul>

&#x20;   <li>🏠 Festejo en casa con amigos el día del partido</li>

&#x20;   <li>🎁 Regalo premium para el fanático del fútbol</li>

&#x20;   <li>🍺 Bares y restaurantes que quieren hacer el show del gol</li>

&#x20;   <li>🎉 Eventos deportivos, cumpleaños, casamientos temáticos</li>

&#x20; </ul>

</section>

```



\---



\## CAMBIO 8 — Sección countdown: Vincular la urgencia con CTA de compra



\*\*Sección:\*\* `region\[ref\_124]` — Countdown "El mundo entero lo estará viendo"

\*\*Problema:\*\* La sección de máxima urgencia (19 días para el Mundial) termina con un formulario de email (`form\[ref\_133]`), no con un botón de compra. Esto desaprovecha el pico emocional.



\*\*Acción — Opción A (recomendada):\*\* Reemplazar el formulario de email por un botón directo de compra:

```html

<a href="#comprar" class="btn-primary">Comprar ahora · US$200</a>

```



\*\*Acción — Opción B:\*\* Mantener el formulario de email (lista de espera para stock futuro) pero:

\- Cambiar el label del botón `button\[ref\_135]` de "Quiero ser el primero" a algo que deje claro que es una lista de espera: \*"Avisarme si se agota"\* o \*"Reservar mi lugar"\*.

\- Agregar debajo del formulario el botón de compra directa de igual o mayor tamaño.



\---



\## CAMBIO 9 — Aclarar el formulario de email: lista de espera vs. compra



\*\*Sección:\*\* `region\[ref\_124]` — form `\[ref\_133]`

\*\*Problema:\*\* El formulario de email coexiste con un botón de compra activo en el navbar. No queda claro si quien completa el mail está "comprando" o simplemente recibiendo un aviso. Genera confusión sobre el estado del producto (¿ya a la venta o en lista de espera?).



\*\*Acción:\*\*

\- Si la venta ya está abierta: eliminar el formulario de email o moverlo a una sección separada de "novedades/updates".

\- Si el formulario es para stock agotado futuro: agregar un texto explicativo antes del input, por ejemplo: \*"¿Se te fue la fecha? Dejá tu mail y te avisamos si liberamos más unidades."\*



\---



\## CAMBIO 10 — Agregar sección de Preguntas Frecuentes (FAQ)



\*\*Sección:\*\* Insertar entre la ficha técnica (`region\[ref\_41]`) y la sección de compra (`region\[ref\_82]`)

\*\*Problema:\*\* No hay manejo de objeciones. A US$200 los compradores tienen preguntas concretas que, sin respuesta, los llevan a abandonar la página.



\*\*Acción:\*\* Crear una sección FAQ con acordeones (expandibles). Preguntas sugeridas:



```html

<section id="faq">

&#x20; <h2>Preguntas frecuentes</h2>



&#x20; <details>

&#x20;   <summary>¿Es seguro usar en interiores?</summary>

&#x20;   <p>Sí. La chispa fría no emite calor, humo ni llama. Funciona perfectamente en espacios cerrados y es segura cerca de personas.</p>

&#x20; </details>



&#x20; <details>

&#x20;   <summary>¿Cuánto dura cada cartucho?</summary>

&#x20;   <p>Cada cartucho dura 30 segundos de espectáculo continuo. El pack incluye 2 cartuchos.</p>

&#x20; </details>



&#x20; <details>

&#x20;   <summary>¿Dónde consigo más cartuchos?</summary>

&#x20;   <p>Los cartuchos de repuesto se consiguen directamente en nuestra tienda. \[Link]</p>

&#x20; </details>



&#x20; <details>

&#x20;   <summary>¿Tiene garantía?</summary>

&#x20;   <p>Sí, 6 meses de garantía por defectos de fabricación.</p>

&#x20; </details>



&#x20; <details>

&#x20;   <summary>¿En cuánto tiempo recibo el pedido?</summary>

&#x20;   <p>Los envíos se realizan a partir del \[fecha]. El tiempo estimado de entrega es de X días hábiles según la zona.</p>

&#x20; </details>

</section>

```



\---



\## RESUMEN DE PRIORIDADES DE IMPLEMENTACIÓN



| # | Cambio | Impacto en conversión | Dificultad |

|---|--------|----------------------|------------|

| 3 | Agregar prueba social | 🔴 Crítico | Media |

| 8 | Countdown → CTA de compra | 🔴 Crítico | Baja |

| 1 | Jerarquía del subtítulo en Hero | 🟠 Alto | Baja |

| 10 | Sección FAQ | 🟠 Alto | Baja |

| 9 | Clarificar formulario de email | 🟠 Alto | Baja |

| 2 | Diferenciación visual de CTAs | 🟡 Medio | Baja |

| 5 | Datos de recarga en ficha técnica | 🟡 Medio | Baja |

| 6 | Explicar lógica de precio único | 🟡 Medio | Baja |

| 7 | Sección "Para quién es" | 🟡 Medio | Media |

| 4 | Indicador visual mecanismo cartucho | 🟢 Bajo | Media |

