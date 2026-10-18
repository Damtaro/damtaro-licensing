# DAMTARO Licensing V1.4 — Entrega para revisión

Fecha: 17 de octubre de 2026. Estado: desarrollo local, sin commit, push, despliegue, compras reales ni solicitudes reales a Formspree.

## 1. Rama y protección del trabajo existente

Se verificaron Git status, rama y remoto antes de editar. `origin` apunta a `https://github.com/Damtaro/damtaro-licensing.git`. `main` y el HEAD de partida corresponden al commit aprobado `1c76d45570718c7d65bc24124239794683fca1e0`. No se hizo fetch ni se afirmó que el remoto no hubiera cambiado.

El directorio original estaba en `feature/licensing-ux-v2`, con cambios V1/V2 sin commit y documentos/activos sin seguimiento. Se conservaron. V1.4 se desarrolló en un **worktree nuevo desde main**, rama `feature/licensing-experience-v1-4`, ubicado en:

`C:/Users/poite/Documents/DAMTARO PLATAFORM/damtaro-licensing/.worktrees/licensing-experience-v1-4`

V1 no se utilizó como base. La carpeta original sigue en su rama anterior; para revisar o ejecutar V1.4, usar el worktree indicado. No ejecutar `git add .` desde la carpeta original: contiene trabajo anterior y el worktree anidado.

## 2. Arquitectura y alcance

React 19, Vite 8, Tailwind 4 y ESLint 10. `App.jsx` mantiene la navegación por estado; no hay router HTTP. Se conservaron Navbar, menú móvil, footer, vistas anteriores y sus enlaces. La nueva vista interna `custom-audio` usa la misma arquitectura, sin añadir rutas HTTP ni reglas de Cloudflare.

El catálogo tiene nueve registros en `src/data/tracks.js`. SearchSection, FeaturedTracks, MusicCard, TrackDetailView, LicenseModal y DownloadModal se reutilizan. PlayerContext y HTML Audio no se modificaron. Las licencias, pedidos y redirecciones continúan usando los servicios existentes de Gumroad. El checkout local, sus limitaciones previas y el comportamiento comercial del carrito se conservan.

Contact ya enviaba FormData al endpoint `https://formspree.io/f/mdekgzng`, con honeypot `_gotcha`, timeout, bloqueo de duplicados y estados de respuesta. Se extrajo únicamente su transporte a `contactService.js` para reutilizarlo. No se añadió proveedor, CAPTCHA, dependencia, cuenta ni endpoint.

No se incorporaron SEO, navegación nueva, comparación piloto ni eventos de V1/V2: esta entrega parte exclusivamente del main aprobado y del brief V1.4.

## 3. Archivos modificados y nuevos

| Archivo | Cambio |
| --- | --- |
| `src/App.jsx` | Vista de solicitud, contexto de canción y lectura/retorno de privacidad preservando el borrador. |
| `src/data/tracks.js` | Metadata mínima por registro, sin duplicar canciones ni cambiar IDs/orden. |
| `src/components/music/TrackDetailView.jsx` | Información Business y CTA `Request a Custom Adaptation`. |
| `src/components/licensing/LicenseCard.jsx` | Aclaración de stems en Business. |
| `src/components/licensing/LicenseModal.jsx` | Información Business por pista y CTA de adaptación; conserva el contacto general de Custom Licensing. |
| `src/components/licensing/BusinessStemInfo.jsx` | Componente nuevo: texto aprobado y listado solo con metadata confirmada y consistente. |
| `src/utils/stemMetadata.js` | Validación de metadata de presentación con cantidad variable. |
| `src/pages/CustomAudio.jsx` | Página con la estética existente. |
| `src/components/licensing/CustomAudioRequest.jsx` | Formulario reutilizable de adaptaciones. |
| `src/utils/customRequest.js` | URL segura y conversión al esquema existente de Contact. |
| `src/services/contactService.js` | Transporte compartido al endpoint existente. |
| `src/components/sections/Contact.jsx` | Usa el transporte compartido; conserva su comportamiento. |
| `src/components/cart/CartDrawer.jsx` | Corrección pequeña del efecto de animación y cancelación de frames pendientes. |
| `package.json`, `.gitignore` | Comandos de pruebas; ignorar salidas temporales del navegador. Sin cambios de dependencias ni lockfile. |
| `tests/*.test.mjs` | Pruebas nativas de Node: metadata, URLs, payload y preservación de contratos/pagos. |
| `playwright.config.js`, `qa/licensing.spec.js`, `qa/fixtures/*` | QA local con Edge y fixtures explícitos; no se incluyen en el build. |
| `scripts/audit-dependencies.mjs`, `scripts/summarize-audit.mjs` | Auditoría reproducible del lockfile y reporte. |
| `DEPENDENCY-AUDIT-V1-4.md`, `artifacts/v1-4/*` | Detalle de dependencias, evidencia JSON y seis capturas reales. |

## 4. Metadata de stems

Cada registro incorpora:

```js
officialStems: {
  verificationStatus: 'pending',
  count: null,
  labels: [],
},
customAdaptationRequestsAvailable: true,
```

Los nueve registros permanecen pendientes. No se recibió un inventario autorizado con cantidades y nombres reales; no se inspeccionaron stems ni se certificaron archivos de entrega. `customAdaptationRequestsAvailable` habilita consultas, no promete capacidad de realizar el trabajo.

Cuando DAMTARO confirme el inventario fuera del frontend, podrá introducir la cantidad real, los nombres descriptivos y el estado editorial `verified` en el registro correspondiente. El listado solo se muestra si la cantidad es positiva, coincide con el número de nombres y estos son válidos y distintos. No se presupone cuatro stems: las pruebas cubren cantidades variables.

Estos campos son metadata informativa, **no evidencia jurídica de titularidad ni autorización de entrega**. Los registros de derechos, aprobaciones y archivos deben mantenerse en sistemas autorizados fuera del frontend. No añadir a este modelo archivos, tokens, recibos ni URLs privadas.

El texto público incluye exactamente: “Includes the official stems supplied by DAMTARO for the selected track.” Se acompaña de una referencia a la disponibilidad y alcance de los términos existentes. Si faltan datos, se invita a consultar los detalles; no se afirma que los stems no existan. No hay reproductores de stems, producto adicional, recargo ni cambio en el contenido de Gumroad.

## 5. Custom Audio Request y privacidad

Entradas: detalle de canción y sección Custom Licensing del selector de licencias. Se preserva la pista seleccionada y su ID existente. Tipos: Isolated Sound, Custom Edit, Custom Composition y Other. Se permite indicar otra referencia de activo o una composición original sin pista previa, sin inventar identificadores.

Obligatorios: pista/referencia, tipo, proyecto, uso previsto, nombre y correo. Instrumento/sonido, timecode, territorio/distribución, fecha y URL son opcionales. Hay validación nativa de correo y campos requeridos, rechazo de espacios vacíos, límites de longitud y referencias HTTP/HTTPS sin credenciales. Las URLs se envían como texto; la aplicación no las visita ni carga sus contenidos.

Se reutiliza el esquema de Contact: `name`, `email`, `project`, `message`, `_gotcha`. Las opciones de adaptación se organizan dentro del mensaje; no se añaden campos de pago o identificadores de órdenes. El honeypot existente se conserva y se comprueba antes del envío. El bloqueo de duplicados funciona también mientras se espera la respuesta; timeout de 20 segundos; errores preservan entradas para reintentar. La confirmación se muestra solo después de una respuesta HTTP exitosa y se limpian los campos. La confirmación no promete aceptación, disponibilidad, precio, entrega ni plazo.

**Revisión técnica de Privacy Policy:** las secciones Information You Provide, Contact Form Provider y How Information Is Used describen estas mismas categorías, proveedor y finalidad de responder consultas de proyecto/licencia. No se detectó una nueva categoría de datos, destinatario o finalidad que exija cambiar el documento para este flujo. La política llama a la entrada “Contact”; la nueva experiencia es otra entrada al mismo mecanismo y esquema. Se deja esa coherencia de nomenclatura para revisión editorial del responsable antes de publicar; no se emite una certificación legal de suficiencia. No se modificó ningún documento legal.

Las restricciones de stems mostradas resumen las prohibiciones ya presentes en License Terms, sección Stems; no añaden obligaciones contractuales. El formulario no crea pedidos ni toca checkout.

## 6. Problemas técnicos y dependencias

El lint de `main` reprodujo `react-hooks/set-state-in-effect` en `CartDrawer.jsx:20`. Se movieron las actualizaciones de animación a callbacks de requestAnimationFrame y se cancelan ambos frames al cambiar el estado. Se conserva la transición y el cierre diferido existentes. Las pruebas cubren apertura, cierre, reapertura, eliminación, carrito vacío y callback de checkout.

**URLs y validaciones legales:** no se reprodujo un fallo en la validación existente de esta base. `scripts/validate-catalog.js` pasó sin modificar sus asserts, con 18 comparaciones exactas de URLs por pista/tipo y consentimiento para ambas licencias. El script `legal-v1-check.mjs` de la carpeta original era un archivo local ajeno a main y no se copió a esta entrega. No se debilitaron verificaciones para hacerlas pasar.

`npm audit` del lockfile aprobado identifica **21 paquetes afectados: 18 high y 3 moderate**. `npm audit --omit=dev` identifica **0**. Son dependencias de desarrollo/build, con riesgos de denegación de servicio, procesamiento de entradas y mapas de fuentes; su exposición detallada y las rutas están en [DEPENDENCY-AUDIT-V1-4.md](DEPENDENCY-AUDIT-V1-4.md). Los totales no son los de la rama V1, cuyo lockfile había cambiado al instalar QA.

No se ejecutó audit fix, --force, instalación ni actualización. Los parches compatibles deben revisarse en otra rama con su diff de lockfile y pruebas. No exponer Vite en producción ni procesar insumos de build no confiables. La ausencia de avisos de runtime no garantiza ausencia de fallos desconocidos o de riesgos en servicios externos.

## 7. Analítica futura, sin implementación

La base aprobada no tiene un sistema real de analytics. V1.4 no instala ni emite eventos, no añade almacenamiento analítico y no envía datos a terceros para medición.

| Evento futuro | Momento propuesto | Parámetros permitidos |
| --- | --- | --- |
| view_stem_options | Presentar la información de stems de una pista. | track_id existente; estado editorial enumerado. |
| select_business_license | Seleccionar Business con consentimiento válido. | track_id existente. |
| request_custom_quote | Abrir el formulario de adaptación. | track_id existente, si lo hay. |
| custom_quote_submitted | Respuesta exitosa de Formspree. | track_id existente, si lo hay; tipo de solicitud enumerado. |
| business_checkout_started | Crear una redirección válida al checkout Business. | track_id existente; license_type=business. |

No incluir nombres, correos, URLs, referencias de activos libres, descripciones, timecodes, textos de búsqueda, identificadores de pago ni otros datos personales. No transmitir nada hasta revisar destino, privacidad, configuración y consentimiento aplicable. Ninguno de estos eventos acredita pago.

Para una futura compra verificada, el backend debería contrastar una notificación de venta con una consulta autenticada al proveedor, comprobar producto/versión, moneda, importe y estado, excluir pruebas, reembolsos y disputas, y deduplicar internamente por venta. Credenciales y comprobantes permanecen del lado servidor. Solo esa confirmación podría alimentar una conversión; no un clic, URL de retorno, estado React ni booleano frontend. Es una propuesta de diseño, sin implementación en esta fase. Referencia: [API oficial de Gumroad](https://gumroad.com/api).

## 8. Resultados reales y reproducción

| Comprobación | Resultado |
| --- | --- |
| Build | PASS: 91 módulos; JS aproximadamente 309 kB, 91 kB gzip. |
| Lint global inicial de main | FAIL reproducido en CartDrawer:20. |
| Lint global final | PASS. |
| Lint explícito de archivos JS/JSX modificados y nuevos | PASS. |
| git diff --check | PASS. |
| npm test | PASS: 5/5 pruebas nativas de Node. |
| QA de navegador | PASS: 16/16 casos, Edge, desktop 1440×1000 y mobile 390×844. |
| Reprueba del fixture después de su ajuste de lint | PASS: 2/2 desktop/mobile. |
| scripts/validate-catalog.js | PASS completo, asserts originales sin cambios. |
| npm audit | Exit 1 por 21 paquetes afectados; runtime-only sin avisos. No es un PASS de seguridad. |

La prueba de preservación compara contratos, precios, monedas, checkout y todos los servicios de pago contra el commit aprobado, normalizando únicamente CRLF/LF. El catálogo valida nueve canciones/IDs, orden cronológico, nueve Smartlinks, búsquedas/filtros, 18 URLs Gumroad exactas, USD 17/149, estados pendientes, rechazo de pagos inválidos y activos de producción. El build no añade WAV, stems ni ZIP.

Las pruebas de navegador ejercitan navegación anterior y menú móvil, vistas legales, reproducción/pausa/seek, descarga MP3 real local, consentimiento y selección Creator/Business con checkout interceptado, detalles de stems pendientes y metadata variable en fixtures explícitos, contexto de canción, lectura/retorno de privacidad, formulario inválido, URL insegura, error del servicio, retry, éxito, honeypot y bloqueo de duplicados. Los fixtures no declaran stems reales de ninguna canción ni contienen audio.

Gumroad y Formspree se interceptaron en QA: **no hubo compras ni envíos reales**. No se verificó recepción real de correos, spam del proveedor, entrega de archivos ni la cuenta de Gumroad. Las pruebas HTTP simuladas no acreditan esas integraciones de extremo a extremo.

Comandos desde el worktree, en Windows:

```text
npm.cmd run build
npm.cmd run lint
npm.cmd test
git diff --check
node scripts/validate-catalog.js
node scripts/audit-dependencies.mjs
node scripts/summarize-audit.mjs
```

El worktree reutilizó las herramientas existentes del directorio ancestro; no se instaló Playwright ni ninguna dependencia en V1.4. Playwright ya estaba disponible en esa sesión, con Edge instalado. Para QA visual, iniciar en una terminal separada:

```text
npm.cmd run dev -- --host 127.0.0.1 --port 5184 --strictPort
```

En otra terminal ejecutar `npm.cmd run test:browser` y detener el servidor al terminar. El servidor se mantiene separado porque el cierre automático del árbol de procesos dejó el runner pendiente en Windows; con arranque separado la suite final terminó con exit 0. Si Playwright no está disponible en otro entorno, usar la checklist manual; no hay descarga automática en los scripts de esta entrega. Un release reproducible debe validarse además con instalación limpia desde el lockfile aprobado, en un entorno autorizado.

El validador original requiere la carpeta ignorada `NEW TRACKS`. Se creó únicamente una junction local, también ignorada, hacia la carpeta original, para leer y comparar los MP3 y portadas; no se copiaron a public ni se modificaron originales. Si se ejecuta en otro equipo sin esos archivos, el script informa ENOENT y necesita ese material autorizado. No omitir sus comparaciones para conseguir un PASS.

Capturas reales, revisadas visualmente, en `artifacts/v1-4/`: desktop/mobile de `track-detail`, `stem-options` y `custom-request`. En móvil el detalle conserva scroll interno y la captura stem-options muestra su parte inferior. El formulario no presentó desbordamiento horizontal.

## 9. Checklist documental de Gumroad y audio

No se modificaron productos, versiones, precios, archivos ni entrega. No se afirma que los siguientes puntos estén verificados:

- [ ] Confirmar registros autorizados de derechos y permisos de la pista y de sus stems fuera del frontend.
- [ ] Identificar el MP3 y WAV correctos de la canción seleccionada; no asumir su contenido por el nombre.
- [ ] Inventariar la cantidad real de stems oficiales y sus nombres descriptivos; no presuponer cuatro.
- [ ] Comprobar alineación temporal, mismo origen y final intencional, silencio inicial y colas de efectos.
- [ ] Comparar duración, sample rate, bit depth, canales y compatibilidad técnica de los archivos efectivamente entregados; no declarar un formato que no se haya inspeccionado.
- [ ] Registrar checksums de archivos y comprobar integridad del paquete y nombres; mantener ese inventario privado.
- [ ] Contrastar pista/ID con su opción de producto existente: Creator `cxmwf`, Business `mzitdy`, y las 18 URLs fijadas en la validación del catálogo.
- [ ] Comprobar que Creator y Business entregan exclusivamente lo correspondiente a su licencia y que Business mantiene sus stems oficiales existentes, sin recargo.
- [ ] Revisar archivos compartidos y contenido específico de versión, sin editar ni crear versiones. Gumroad permite contenido distinto por versión: [documentación oficial](https://gumroad.com/help/article/126-setting-up-versions-on-a-digital-product).
- [ ] Con acceso autorizado de la cuenta, seguir el mecanismo oficial de compra de prueba, confirmar que aparece Test card y revisar recibo/descarga. No usar una tarjeta real, crear descuentos ni cambiar productos para probar. No se realizó aquí. [Guía oficial de compra de prueba](https://gumroad.com/help/article/62-testing-a-purchase).

## 10. Checklist de publicación y revisión manual

- [ ] Revisar este worktree y su diff contra el commit aprobado, sin incorporar cambios de V1/V2.
- [ ] Confirmar o mantener pendiente la metadata de stems; autorización documental previa a publicar un listado real.
- [ ] Revisar texto Business y coherencia de Privacy Policy con el responsable. No hay propuesta de cambio contractual incluida.
- [ ] Decidir la remediación de dependencias y validar una instalación limpia sin upgrades mayores automáticos.
- [ ] Repetir build, ambos lints, pruebas y catálogo en el entorno de release.
- [ ] En desktop y móvil: Music, nueve pistas, búsqueda/filtros, preview/seek/pausa, descarga MP3, detalle, selector, documentos legales, carrito y Custom Request.
- [ ] Comprobar requeridos, correo inválido, referencia insegura, Other, composición sin pista, referencia externa y opcionales vacíos.
- [ ] Con autorización explícita separada, realizar una solicitud controlada real de Formspree y comprobar recepción/antispam. No se hizo aquí.
- [ ] Verificar manualmente Gumroad y la entrega mediante su mecanismo oficial de prueba, sin compras reales ni cambios de productos.
- [ ] Revisar que el artefacto de Cloudflare sea únicamente `dist`, sin qa, originales, .worktrees, documentos privados, stems ni secretos. No cambiar la rama de producción ni su configuración durante esta revisión.
- [ ] Obtener autorización antes de commit, push o despliegue. Ninguno se ejecutó en esta entrega.

Riesgos pendientes: el formulario público sigue dependiendo del filtrado y límites de Formspree; validación frontend no sustituye controles del servicio. Los datos escritos se transmiten al proveedor existente; no adjuntar material confidencial. Los registros de aceptación siguen siendo temporales, como en main. No se implementó autenticación, entrega privada ni confirmación backend de pagos. La política de moneda nominal existente tampoco cambia.

## 11. Rollback

Ahora no hace falta rollback de producción: no se desplegó nada ni se cambió Gumroad. Basta con no integrar este worktree mientras se revisa; la carpeta original y main conservan su estado anterior.

Para descartar V1.4 después de revisión, guardar primero una copia del diff y de todos sus archivos nuevos. Restaurar exclusivamente los nueve archivos rastreados enumerados en esta entrega desde `1c76d45570718c7d65bc24124239794683fca1e0`, dentro del worktree V1.4, y retirar únicamente sus archivos nuevos una vez archivados. No ejecutar reset --hard, git clean ni borrados desde la raíz original; no seguir la junction NEW TRACKS para eliminar originales.

Si en el futuro se autoriza un commit exclusivo de V1.4 y llega a publicarse, revertir ese commit mediante `git revert <commit-v1.4>`, repetir las verificaciones y publicar el artefacto anterior solo mediante el proceso autorizado. No hay migraciones, nuevos pagos ni cambios de contratos que revertir.

Trabajo detenido para revisión y autorización.
