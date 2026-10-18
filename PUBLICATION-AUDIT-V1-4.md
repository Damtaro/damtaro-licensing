# DAMTARO Licensing V1.4 — Auditoría final de publicación

Actualización posterior: consultar `RELEASE-READINESS-V1-4.md` para la verificación remota, instalación limpia y QA reproducible. Este documento conserva el estado histórico de la auditoría inicial; su inventario y pendientes se actualizan en el informe posterior y en V1-4-COMMIT-FILES.txt.

Fecha: 17 de octubre de 2026, America/Guayaquil. La aprobación visual y funcional del propietario se toma como concedida, según esta solicitud. Esta auditoría no ejecuta autorización de publicación.

## Dictamen

**Validación local satisfactoria; autorización técnica de publicación condicionada.** No se ha detectado una regresión funcional o conflicto contra main local. Antes de publicar se deben cerrar dos comprobaciones: actualidad de main remoto y reproducción del build/QA en un entorno limpio. La aceptación del riesgo de dependencias heredadas también debe quedar registrada.

No se hizo commit, stage, merge, fetch, push ni despliegue. No se modificaron archivos de aplicación durante esta auditoría. Se añadieron este informe y el inventario. La evidencia y capturas quedan fuera del commit propuesto.

## 1. Git, origen y aislamiento

- Worktree auditado: `.worktrees/licensing-experience-v1-4`, rama `feature/licensing-experience-v1-4`.
- HEAD, main y referencia local cacheada origin/main: `1c76d45570718c7d65bc24124239794683fca1e0`.
- Reflog V1.4: creada desde main el 17 de octubre de 2026 a las 15:10:07, UTC−05:00.
- Reflog main: último commit local el 13 de octubre de 2026 a las 17:38:12, UTC−05:00; no hay avances locales desde la creación de V1.4.
- Merge-base HEAD/main: el mismo SHA. Diferencia de commits HEAD...main: `0 / 0`.
- Sin entradas de conflicto (`git ls-files -u`), sin archivos staged, sin archivos eliminados.
- Las referencias V1/V2 apuntan al mismo commit base, sin commits propios que se hayan fusionado o cherry-pickeado aquí. Todos los cambios V1.4 siguen sin commit.
- La carpeta principal está asociada a `feature/licensing-ux-v2`. No se inspeccionaron ni modificaron sus cambios de trabajo. No se debe hacer checkout de main allí ni trasladar su contenido al release.
- No hay evidencia en el historial de incorporación de ramas experimentales. El diff de este worktree corresponde a Business stems, Custom Audio, refinamiento comercial, metadata y QA descritos en los informes V1.4. Esto no equivale a comparar cambios sin commit de otros worktrees, que quedan fuera del alcance autorizado.

### Estado remoto no confirmado

`git ls-remote origin refs/heads/main` falló primero con `SEC_E_NO_CREDENTIALS` de Schannel y, al reintentarlo fuera del sandbox, con `Could not resolve host: github.com`. Una consulta alternativa de lectura a la API GitHub tampoco fue accesible. No se actualizó origin/main. **No puede afirmarse que main remoto no tenga commits nuevos.** No hay conflictos locales; las incompatibilidades con posibles cambios remotos están pendientes de comparación. Si main remoto difiere del SHA anterior, volver a auditar la integración antes de autorizarla.

## 2. Revisión del inventario completo

**Commit propuesto: 38 archivos: 16 modificados y 22 nuevos; cero eliminados.** El listado exacto, una ruta por línea, está en `V1-4-COMMIT-FILES.txt`. Incluye ese inventario y este informe. No se debe sustituir por `git add .` o `git add -A`.

Revisión de los 16 archivos modificados:

| Archivo | Cambio revisado |
| --- | --- |
| `.gitignore` | Excluye resultados y reportes Playwright; conserva exclusión de originales, build y secretos locales |
| `index.html` | Título, descripción, canonical raíz y Open Graph; sin trackers ni rutas ficticias |
| `package.json` | Solo añade comandos de pruebas; no cambia versiones ni dependencias |
| `scripts/validate-catalog.js` | Adapta el chequeo estático al selector en dos pasos; mantiene todas las verificaciones de catálogo/pagos |
| `src/App.jsx` | Custom Audio, retorno desde documentos, navegación Hero y sesión nueva del selector; conserva guardia legal y pago existente |
| `src/components/cart/CartDrawer.jsx` | Programación/cancelación de frames y cierre; sin cambios de precio o checkout |
| `src/components/layout/Navbar.jsx` | Etiquetas Browse Music / Licensing Guide en desktop y móvil; mismos destinos |
| `src/components/licensing/LicenseCard.jsx` | Información Business stems |
| `src/components/licensing/LicenseModal.jsx` | Dos pasos, resumen, consentimiento, foco, Custom secundario y guardia de canción |
| `src/components/music/TrackDetailView.jsx` | Business stems y CTA Custom; preview y licencia conservados |
| `src/components/sections/Contact.jsx` | Extrae el mismo transporte Formspree; endpoint y manejo de respuesta conservados |
| `src/components/sections/Footer.jsx` | Mismas etiquetas comerciales y destinos existentes |
| `src/components/sections/Hero.jsx` | H1/subtítulo/CTA y contraste; conserva fotografía e identidad |
| `src/components/sections/HowToUse.jsx` | Guía de alcance, Free Use, soporte y compra; precios desde fuente existente |
| `src/components/ui/Button.jsx` | Variante de compra negro/naranja; variantes anteriores conservadas |
| `src/data/tracks.js` | Solo metadata editorial de stems y habilitación Custom; nueve registros originales sin cambios de IDs, audio o Smartlinks |

Los 22 nuevos del inventario se revisaron por función:

- Siete archivos de aplicación: BusinessStemInfo, CustomAudioRequest, CustomAudio, contactService, customRequest, licensePresentation y stemMetadata.
- Siete archivos de QA: configuración Playwright, dos suites de navegador, dos fixtures explícitos y dos archivos de pruebas unitarias.
- Dos utilidades de auditoría de dependencias: generan informes; no se ejecutan durante build o publicación. El resumen contiene cifras fijas del informe previo y no debe interpretarse como un análisis actualizado por sí solo.
- Seis archivos de documentación/control: los cuatro informes previos, este informe y el inventario.

Las capturas PNG se consideran evidencia visual ya aprobada por el propietario; no son recursos de la aplicación. Los JSON de auditoría y medidas se inspeccionaron estructuralmente, sin publicar su contenido como assets.

### Exclusiones expresas

No incluir en el commit: todo `artifacts/`, `dist/`, `node_modules/`, `test-results/`, `playwright-report/`, `NEW TRACKS/`, archivos `.env*` privados, temporales, logs, copias de seguridad o scripts transitorios de esta auditoría. Ninguno se ha staged. Las pruebas y utilidades sí pertenecen al código fuente del release, pero no al artefacto web.

`NEW TRACKS` es una junction a los originales de la carpeta principal y está ignorada. No se siguió para borrado o movimiento. Nunca subir la raíz del workspace ni un ZIP del repositorio a Cloudflare.

## 3. Catálogo, negocio y consentimiento

- Nueve canciones preservadas, en orden: TITAN, REGAIN, GRAVITY, CRAZY, CTRL ME, FEEL AGAIN, BLIND, CONTROL y ELEVATION.
- Nueve Smartlinks y 18 rutas Gumroad exactas validadas contra las constantes aprobadas, incluidos los valores codificados de cada opción.
- Creator $17 USD y Business $149 USD. No hay productos, suscripciones, recargos o cambios de entrega nuevos.
- Se compararon contra el commit aprobado los documentos legales, licencias, precios, monedas, pedidos, servicios de pago y Checkout: contenido sin cambios, salvo normalización de fin de línea tolerada por las pruebas.
- Los pedidos y pagos preparados siguen pendientes y no emiten una licencia desde el frontend. No se afirmó confirmación de pago ni registro backend de consentimiento.
- Selección y aceptación están separadas. El checkbox no viene marcado, el checkout exige aceptación y canción, cambiar licencia invalida aceptación y ambas páginas legales permiten volver al resumen.
- Free Use sigue limitado a usos elegibles personales/no comerciales con atribución. Creator no se amplía a clientes/marcas. Business mantiene un proyecto/campaña y las exclusiones Custom.
- Los stems Business conservan la aclaración de disponibilidad de los términos. No se inventaron cantidades ni descargas. La entrega privada efectiva continúa bajo responsabilidad del propietario/proveedor.
- Navegación, Sample Packs, contacto, preview/pausa/seek, descarga MP3, búsqueda/filtros, detalle, carrito, páginas legales y responsive están cubiertos por las comprobaciones existentes.

## 4. Custom Audio / Formspree / independencia del pago

`contactService.js` envía POST con FormData, Accept application/json y AbortSignal al endpoint existente `https://formspree.io/f/mdekgzng`. Rechaza respuestas HTTP no exitosas. Custom genera únicamente name, email, project, message y honeypot `_gotcha`; no agrega identificadores de compra, datos de pago ni parámetros a Gumroad.

Conserva referencia TITAN ID 9 desde catálogo; Composition permite no elegir canción existente. Los borradores de campos ocultos se preservan, sus controles se deshabilitan y el constructor del mensaje vuelve a excluir instrumento/timecode cuando no corresponden. Conserva validación de URL HTTP(S), campos obligatorios, timeout, antispam, bloqueo de duplicados, datos tras fallo y reintento. El éxito aparece tras la respuesta del servicio.

Las pruebas interceptan Formspree y Gumroad. Se verifican respuestas pendientes, éxito/fallo, spam y duplicados sin envíos reales ni compras. La recepción en el buzón del propietario y los controles antispam del proveedor no están certificados por una simulación. Custom no usa ni modifica los servicios de checkout.

## 5. Seguridad de archivos y artefacto

Escaneo por patrones de claves privadas, claves AWS, tokens GitHub/Stripe y asignaciones de secretos en texto versionado, archivos nuevos y build: sin coincidencias detectadas. No se imprimieron valores de posibles secretos. El ID público Formspree y los identificadores de producto/opción Gumroad son configuración pública de los flujos existentes. El escaneo por patrones no garantiza detectar todo secreto posible.

Build auditado: **33 archivos, 63.577.096 bytes, nueve MP3**. No contiene WAV/FLAC/AIFF, stems privados, ZIP, credenciales detectadas, `.map`, backups, temporales, fuentes JSX, fixtures QA, documentos de auditoría, node_modules ni rutas locales detectadas. Se guardó SHA-256 por archivo en la evidencia local `artifacts/v1-4/final-audit/release-scan.json`.

**Hallazgo heredado:** `src/assets/audio/elevation.wav` ya está versionado en main, sin cambios en V1.4 (34.362.836 bytes; SHA-256 `9df605ffe41a7452c54a17dd5198d1b3cf48019fe4fffb4cffc7b6ae7a76adfc`). No forma parte del diff del commit ni de dist. Por tanto, el artefacto de publicación está libre de WAV, pero **el repositorio completo no lo está**. No se borró ni se reescribió historial durante la auditoría. Si el requisito es eliminarlo del repositorio/historial, debe tratarse como trabajo separado con impacto y autorización propios.

## 6. Pruebas y reproducibilidad

| Comprobación de esta auditoría | Resultado |
| --- | --- |
| `npm.cmd run build` | PASS |
| `npm.cmd run lint` | PASS |
| `node scripts/validate-catalog.js` | PASS |
| `npm.cmd test` | PASS, 6/6 |
| `npm.cmd run test:browser -- --workers=1` | PASS, 22/22; 2,9 minutos |
| `git diff --check` | PASS; advertencia de normalización LF/CRLF, sin errores |

Se usa npm.cmd por la política de PowerShell; no se modificó esa política. QA usa Edge desktop 1440×1000 y móvil táctil 390×844, con servicios externos interceptados y capturas locales.

La primera ejecución con cuatro workers produjo dos timeouts de 30 segundos y se interrumpió. Se repitió la suite completa con un solo worker: 22/22 aprobadas, sin cambiar timeouts, aserciones o código de aplicación. Es una limitación de estabilidad/concurrencia del entorno de QA que debe registrarse al preparar CI.

Entorno observado: Node 24.18.0; React/ReactDOM 19.2.7; Vite 8.1.4; ESLint 10.7.0; Playwright 1.64.1. Estos paquetes se resuelven desde node_modules del directorio ancestro; se leen como herramientas instaladas, sin editar esa carpeta. `package-lock.json` sigue intacto. **No se ejecutó npm ci limpio**; no se puede equiparar este resultado a CI reproducible.

`test:browser` y playwright.config.js dependen de `@playwright/test`, que no está declarado en este package.json/lockfile. En una instalación aislada de este paquete no está garantizado que el comando pueda resolverlo. Antes de la integración, declarar y fijar la herramienta y actualizar el lockfile mediante una corrección acotada, o aprobar/documentar un aprovisionamiento de QA aislado que resuelva los imports. Después, repetir instalación limpia y checks. No se instaló ni actualizó nada aquí.

El informe previo de dependencias registra 21 paquetes afectados (18 high, 3 moderate) en desarrollo y cero avisos omitendo dev. Esa es evidencia previa, no una consulta actual al registro. No se ejecutó audit fix ni se modificaron dependencias. Revalidar advisories en el entorno limpio y registrar remediación o aceptación explícita del riesgo antes de publicar. Los riesgos de build/CI no desaparecen por no incluir esas herramientas en dist.

## 7. Procedimiento seguro de integración — preparado, no ejecutado

1. Cerrar las condiciones del dictamen. Con conectividad restaurada consultar main remoto y, con autorización para esa etapa, actualizar las referencias mediante fetch. Registrar el SHA remoto y su relación con `1c76d45`. Si avanzó, revisar commits, diffs y posibles incompatibilidades; no asumir que la ausencia de conflictos de texto demuestra compatibilidad funcional.
2. Conservar una copia privada de los archivos/diff V1.4 y de la evidencia; verificar que no haya cambios nuevos desde este inventario. No guardar ni trasladar los cambios sin commit del worktree V2. El diff rastreado por sí solo no guarda archivos nuevos: preservar también los 22 nuevos del inventario.
3. Una vez autorizado el commit V1.4, usar exclusivamente `git add --pathspec-from-file=V1-4-COMMIT-FILES.txt` desde este worktree. Comparar `git diff --cached --name-only` con el inventario y revisar `git diff --cached --check`. Si hay una ruta extra o falta alguna, detenerse. Crear el commit solo después de la revisión; guardar su SHA.
4. Crear un worktree limpio independiente de integración, en una rama nueva basada en origin/main actualizado; no cambiar de rama en la carpeta principal ocupada por V2. Integrar únicamente el commit V1.4, nunca la rama/carpeta experimental V1/V2. Se puede usar merge con `--no-ff --no-commit` para revisar el resultado antes de confirmar; ante conflictos, detener y resolver de forma explícita o abortar esa integración.
5. Ejecutar npm ci y todos los checks sobre el resultado integrado, con QA aprovisionado reproduciblemente, y revisar nuevamente secretos/assets y el diff contra el main remoto vigente. El validador actual también lee originales locales NEW TRACKS para ciertos checks: no copiar esa junction al release ni subir originales; preparar una comprobación controlada con esos originales autorizados o una adaptación de CI revisada antes de depender de ese script en un clon limpio.
6. Preparar PR desde la rama de integración hacia main con inventario, SHA base, SHA V1.4, resultados y plan de rollback. Revalidar main si cambia durante la revisión. No forzar push ni usar reset/clean para resolver divergencias.
7. Comprobar antes del primer push qué ramas activan previews o producción en Cloudflare. La autorización de un push no debe ignorar un despliegue automático asociado. Obtener autorización de esa etapa antes de push, merge o publicación. La aprobación visual ya recibida no elimina las prohibiciones operativas de esta solicitud.

## 8. Procedimiento Cloudflare — preparado, no ejecutado

No hay configuración de Cloudflare/Wrangler o workflow de despliegue versionado que certifique aquí el proyecto, rama de producción o deployment activo. No se accedió al dashboard ni se modificaron dominio, DNS o hosting. Confirmar primero el mecanismo real del proyecto; los pasos siguientes aplican si usa Cloudflare Pages.

1. Registrar proyecto, rama de producción, método de despliegue, deployment ID actual estable, SHA correspondiente y ajustes de build. Confirmar que es la V1.3 indicada por el propietario; no inferirlo solo por el nombre de rama.
2. Mantener el dominio y configuración existente. Verificar que el build produce `dist` y que el directorio publicado sea exclusivamente `dist`. Fijar un Node compatible y comprobar la instalación limpia antes de producción; no cambiar variables de entorno sin revisión.
3. Preparar un preview aislado del commit autorizado si la configuración actual lo permite. Revisar dominio/HTTPS, navegación, assets, nueve temas, preview/descarga, términos, consentimiento, selector y Custom Audio. Mantener mocks para las pruebas de solicitudes/compras. Un preview no sustituye una autorización para publicar producción.
4. Verificar el manifiesto y los hashes del artefacto generado por ese build; sus nombres/hashes pueden variar por entorno y deben registrarse de nuevo. Nunca subir el árbol de trabajo, originales, informes, secretos ni fixtures.
5. Con autorización de publicación, integrar/publicar mediante el mecanismo existente. Si main dispara producción automáticamente, esa autorización debe preceder al merge/push que lo activa. Registrar SHA integrado, deployment ID, hora y evidencia. No migrar de Pages a Workers ni alterar el dominio como parte de este release.
6. Hacer smoke test en producción sin compras/envíos reales y confirmar que lo servido corresponde al deployment registrado. Verificar errores de assets/console, enlaces comerciales, canonical raíz, páginas legales y responsive. La aceptación y la redirección no acreditan una compra completada.

Referencias oficiales: [configuración de build Pages](https://developers.cloudflare.com/pages/configuration/build-configuration/), [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/).

## 9. Rollback — preparado, no ejecutado

- Antes de publicar, identificar una producción estable anterior y guardar deployment ID/SHA, ajustes relevantes y artefacto o mecanismo de reconstrucción. No asumir que una referencia Git es el deployment efectivo.
- Si aparecen fallos graves en checkout, consentimiento, catálogo, assets o formularios, detener nuevos despliegues y, con autorización, restaurar desde el proyecto Pages el deployment de producción estable previamente identificado. Cloudflare permite rollback a producciones construidas correctamente; los previews no son destinos válidos de ese rollback. [Documentación oficial de rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/).
- Confirmar la recuperación con los mismos smoke tests y registrar incidente y versión activa. Evitar que un despliegue automático posterior vuelva a publicar el fallo antes de corregirlo.
- Reconciliar después Git mediante una rama de rollback y un revert revisado: revertir el commit V1.4 si la topología lo permite, o el merge de integración con `git revert -m 1 <merge-sha>` únicamente tras comprobar padres y alcance. Preservar cambios posteriores de main y repetir los checks. No usar reset --hard, git clean, force push ni reescritura del historial como rollback.
- No hay migraciones de base de datos o contratos nuevos que revertir. No cambiar productos, archivos Gumroad, pagos o Formspree para revertir este frontend.

## 10. Autorización pendiente y límites del dictamen

La aprobación visual/funcional está recibida. Quedan como puertas previas a publicación: comprobar main remoto vigente; preparar instalación/build/QA reproducibles (Playwright y dependencia de originales del validador); registrar tratamiento de avisos de dependencias; confirmar configuración/deployment de Cloudflare y destino real de rollback. Si hay cambios remotos o correcciones de herramientas, repetir las comprobaciones afectadas y actualizar este inventario.

El WAV heredado no sale en dist ni se añade al commit; una política de ausencia total de WAV en repositorio exigiría trabajo adicional separado. Recepción real Formspree, entrega privada Gumroad, advisories actuales e indexación/headers de producción no quedan certificados por esta auditoría local.

Detenerse aquí. Este informe prepara una decisión del propietario; no ejecuta commit, merge, push ni despliegue.
