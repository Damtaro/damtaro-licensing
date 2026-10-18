# DAMTARO V1.4 — Conversion & Sales Optimization

Fecha: 17 de octubre de 2026. Rama: `feature/licensing-experience-v1-4`.
Trabajo exclusivo en este worktree. Los cambios V1.4 previos se conservaron. No se hizo commit, push, despliegue, compra ni envío real de Formspree.

## A. Selector de licencias

- Encabezado “License [TRACK]” y “Choose how you'll use this track.”
- Dos tarjetas breves, con cinco beneficios por licencia, compra única, precio desde los datos existentes y botones Choose Creator / Choose Business.
- Segundo paso con canción, licencia, precio, uso principal, límite esencial, archivos, enlaces a ambos documentos y aceptación obligatoria sin marcar.
- Continue to Secure Checkout usa el mismo callback, pedido y destino Gumroad existentes. Está deshabilitado sin consentimiento o sin canción.
- Change license borra la aceptación. Una nueva apertura inicia una selección nueva. Regresar desde los documentos conserva la licencia elegida y requiere aceptación nuevamente.
- Custom Licensing y Custom Audio son enlaces secundarios separados, con descripciones distintas.
- Se preserva BusinessStemInfo; su versión compacta muestra la metadata verificada existente cuando la hay, sin inventar cantidad o nombres ni exponer descargas.
- Creator conserva alcance propio y exclusión de clientes/marcas. Business mantiene un proyecto/campaña y exclusiones de film, TV, radio, broadcast, juegos, apps, software, grandes campañas y exclusividad.
- El encabezado y cierre permanecen visibles fuera del único contenedor desplazable. Los CTA usan texto negro sobre naranja; foco visible, Tab/Shift+Tab, Escape y retorno al disparador probados.

La frase solicitada “Official stems included” mantiene al lado una aclaración visible de disponibilidad bajo License Terms. Los contratos aprobados dicen que no están garantizados para todas las pistas; no se eliminó esa condición ni se modificó el contrato. Una promesa incondicional queda pendiente del propietario.

## B. Navegación, homepage y SEO

Navegación desktop, móvil y footer: Home, Browse Music, Licensing Guide, Sample Packs, Contact. Se mantienen los identificadores internos y destinos existentes. Custom Audio sigue accesible desde ficha/selector; no se añade otra opción al menú móvil.

La homepage conserva la fotografía, logo, géneros e identidad del artista. H1, subtítulo y CTA solicitados aplicados. Se reforzó el oscurecimiento detrás del texto para facilitar su lectura. La guía añade una comparación breve, requisitos de Free Use, ruta de compra en Gumroad, contacto para soporte Content ID y separación de Custom Licensing / Audio.

Auditoría del código antes del cambio:

| Elemento | Estado inicial | Resultado |
| --- | --- | --- |
| Title | `damtaro-licensing` | Título comercial solicitado |
| Description | Ausente | Descripción solicitada |
| Canonical | Ausente | Únicamente `https://damtaro.com/` |
| Open Graph | Ausente | Tipo, nombre, título, descripción y URL coherentes con raíz |
| H1 Home | “premium music for your next project” | “Music for Your Next Project.”; uno en la vista |
| Home real | `src/components/sections/Hero.jsx`, montado por App | CTA conectados a vistas existentes |
| `src/pages/Landing.jsx` | Archivo vacío, sin uso en App | Sin cambios |
| robots.txt / sitemap.xml | No existen en public | No se crearon archivos ni URLs especulativas |
| Enrutamiento | `activeView` en memoria; botones, sin History API ni URLs por vista | Se preserva |
| HTML inicial | Contenedor React vacío antes de ejecutar JS | Se preserva; sin prerendering |
| Structured data | No instalado | No se añadieron afirmaciones comerciales |

El título y canonical describen el documento raíz compartido: no se inventa metadata para rutas internas inexistentes. Music, canciones, guía y formularios no son páginas directamente enlazables/indexables con URL propia. Recargar devuelve a Home. Esto limita descubrimiento orgánico y enlaces compartidos por pista.

Google procesa JavaScript, pero recomienda enlaces rastreables y contempla renderizado previo para mejorar disponibilidad del contenido. Referencia técnica: [Google Search Central: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics). No se implementó una migración de rutas ni prerendering. El acceso de la herramienta web a producción no estuvo disponible, por lo que no se verificaron headers, robots, HTML servido por Cloudflare ni indexación real. V1.3 publicada es el contexto aportado por el propietario; este trabajo sigue local.

## C. Problemas de conversión detectados y diagnóstico

1. Aceptación antes de elegir y tarjetas extensas: ahora hay comparación primero y consentimiento contextual después.
2. Custom competía con compras: ahora ocupa una zona secundaria diferenciada.
3. Inicio sin un siguiente paso claro: dos CTA llevan a catálogo y guía.
4. Información de alcance dispersa: guía y resumen concentran precio, uso, límite y archivos.
5. Ausencia de medición: no puede atribuirse un aumento de ventas a estos cambios.
6. La selección de moneda existente muestra valores nominales, mientras el proveedor procesa USD. Se preservó este comportamiento previo; sigue siendo una posible fuente de confusión, pendiente de decisión separada.
7. La disponibilidad real de stems y los paquetes MP3/WAV de Gumroad requieren comprobación del propietario; no se inspeccionaron ni modificaron archivos privados.

No hay integración de analítica en `index.html` o `src`; esto no descarta inyección externa por hosting ni seguimiento del proveedor. No se instalaron SDK, cookies, trackers, listeners de medición ni envíos de datos.

Embudo propuesto para una implementación futura autorizada:

| Paso | Evento | Disparador válido | Datos mínimos |
| --- | --- | --- | --- |
| 1 | Music page viewed | Vista Music realmente montada/visible; una vez por entrada | Fuente de entrada, dispositivo en categoría amplia |
| 2 | Track selected | Apertura de ficha de una pista | ID de catálogo |
| 3 | License modal opened | Selector visible | ID de pista, origen del selector |
| 4 | License type selected | Choose Creator / Business | ID de pista, tipo de licencia |
| 5 | Checkout started | Pedido preparado y entrega al destino de pago | Tipo, pista, moneda real USD, importe del pedido |
| 6 | Purchase confirmed by payment provider | Confirmación auténtica del proveedor validada en servidor o reporte conciliado | Referencia de operación deduplicada y estado de pago verificado |

Los pasos 2 y 3 pueden ser rutas alternativas: una tarjeta permite abrir License sin abrir ficha. Segmentar ese acceso directo evita interpretar su ausencia en el paso 2 como abandono. Un clic, retorno o redirección jamás constituye el paso 6. Tampoco se marcará un pedido pendiente como pagado.

Para diagnosticar pérdidas hacen falta: entradas únicas y repetidas por paso, denominadores definidos, transición y tiempo entre pasos, distribución Creator/Business, origen ficha/tarjeta, dispositivo, fechas y cantidad de compras reales conciliadas. Comparar periodos con volumen suficiente y mezcla de tráfico comparable; reportar incertidumbre y cambios de adquisición. Medir abandono del resumen y salida a Terms por separado. Un cambio de elección no es otra compra.

No enviar nombre, correo, país específico, mensajes, descripción de proyecto, URLs aportadas ni datos de pago a analítica. Cualquier identificación de sesión, retención o vinculación con proveedor necesita diseño de privacidad y aprobación antes de implementarse. No se añadió un identificador de seguimiento.

## D. Archivos modificados por esta solicitud

- `index.html`: title, description, canonical y Open Graph.
- `src/App.jsx`: navegación del Hero y sesión nueva del selector, conservando retorno legal.
- `src/components/licensing/LicenseModal.jsx`: presentación en dos pasos y manejo de foco.
- `src/utils/licensePresentation.js`: textos breves de presentación, separados de contratos/precios.
- `src/components/licensing/BusinessStemInfo.jsx`: variante compacta, conservando su versión previa por defecto.
- `src/components/ui/Button.jsx`: variante de compra con contraste negro/naranja, usada por el selector.
- `src/components/layout/Navbar.jsx`, `src/components/sections/Footer.jsx`: etiquetas comerciales.
- `src/components/sections/Hero.jsx`: textos, CTA y contraste.
- `src/components/sections/HowToUse.jsx`: orientación para elegir, compra, Free Use y soporte.
- `scripts/validate-catalog.js`: verifica que la selección precede al consentimiento; mantiene las verificaciones de nueve pistas, nueve Smartlinks, dieciocho destinos y pedidos pendientes. La aceptación interactiva se prueba en navegador.
- `qa/licensing.spec.js`: etiquetas nuevas, segundo paso, bloqueo de checkout y regreso desde ambos documentos.
- `qa/conversion.spec.js`: homepage/SEO, navegación, medidas responsive, teclado y reinicio de aceptación.
- `artifacts/v1-4/*`: capturas y medidas locales de QA; no se incluyen en dist.
- Este informe. Los demás cambios visibles en Git pertenecen al V1.4 previo y no se descartaron.

## E. Resultados de pruebas

- `npm.cmd run build`: aprobado.
- `npm.cmd run lint`: aprobado.
- `npm.cmd test`: 6/6 aprobadas, incluida comparación de contratos, precios y servicios de pago con el commit aprobado.
- `node scripts/validate-catalog.js`: aprobado, nueve pistas/Smartlinks, dieciocho rutas exactas, precios USD, pedidos pendientes, assets y rechazo de checkout inválido.
- `npm.cmd run test:browser`: 22/22 aprobadas en Edge, escritorio 1440×1000 y móvil táctil 390×844.
- Pruebas de conversión repetidas tras ajustes visuales finales; ver capturas y medidas en artifacts/v1-4.
- La captura inicial de medidas JSON dentro del árbol observado por Vite provocó recargas durante otras pruebas. La prueba guarda ahora sus medidas en el directorio temporal del sistema; se copian a artifacts después de terminar la suite.
- `git diff --check`: aprobado; Git puede advertir de normalización LF/CRLF, sin errores de whitespace.

Se usa `npm.cmd` porque la política de PowerShell bloquea `npm.ps1`; no se cambió esa política. No se instalaron dependencias. Las rutas Formspree y Gumroad se interceptan en QA, sin contacto comercial ni compra real.

Capturas para revisión: `desktop-license-selector.png`, `mobile-license-selector.png`, `mobile-license-selector-cta.png`, `desktop-business-summary.png`, `mobile-business-summary.png`, `mobile-business-summary-cta.png`, `desktop-conversion-home.png`, `mobile-conversion-home.png`. Las medidas finales se guardan en `desktop-selector-metrics.json` y `mobile-selector-metrics.json`. Hay un solo scroll de contenido dentro del modal y no hay desbordamiento horizontal en las dimensiones probadas.

## F. Riesgos pendientes

- Sin datos analíticos ni baseline no se demuestra mejora de conversión o ingresos.
- Consentimiento y pedidos siguen en memoria; no se creó registro backend ni verificación frontend de pagos.
- Falta una prueba de recepción real de Formspree y de entrega privada de Gumroad; no se realizaron por instrucción.
- La indexación y configuración efectiva de producción requieren inspección posterior con acceso autorizado; SEO local no equivale a indexación confirmada.
- Business mantiene la condición contractual de disponibilidad de stems; resolver comercialmente antes de anunciar disponibilidad incondicional.
- La revisión visual humana sigue pendiente. QA cubre Edge y dos tamaños; no sustituye una auditoría completa con lectores de pantalla o todos los navegadores.

## G. Cambios que requieren autorización adicional

No se implementaron: rutas públicas por pista/vista, History API, prerendering/SSR, redirecciones, sitemap con nuevas páginas, ajustes de dominio o Cloudflare, analítica o cookies, integración de confirmación de pagos/webhooks, persistencia legal/backend, modificación del criterio de moneda ni cambios contractuales de stems. Cada parte requiere diseño y autorización independiente. Ninguna bloquea la revisión de los cambios locales entregados.

Trabajo listo para revisión visual del propietario. Sin commit, push ni despliegue.
