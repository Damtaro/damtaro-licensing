# DAMTARO V1.4 — Release readiness y QA reproducible

Fecha: 17 de octubre de 2026, America/Guayaquil. Este informe actualiza los pendientes de `PUBLICATION-AUDIT-V1-4.md`. La aprobación visual y funcional existente se conserva. No se cambió el diseño, catálogo, precios, contratos ni servicios de pago.

## Dictamen: NO-GO para publicar en el estado actual

Los pendientes de acceso a main remoto y reproducción de la instalación/QA se han cerrado técnicamente. Permanece pendiente la remediación revisada o aceptación explícita del riesgo de **18 avisos high y 3 moderate en herramientas de desarrollo/build**. No se interpreta la aprobación visual como aceptación de ese riesgo de seguridad. No se actualizaron paquetes para forzar cero avisos.

No hubo commit, stage, pull, merge, rebase, push ni despliegue. El único cambio de referencias fue el `git fetch origin` solicitado.

## Comparación contra origin/main

El fetch inicial fue bloqueado por permisos de escritura sobre FETCH_HEAD; la repetición autorizada fuera del sandbox terminó correctamente. Después del fetch:

- Base V1.4, HEAD y origin/main: `1c76d45570718c7d65bc24124239794683fca1e0`.
- `git log HEAD..origin/main`: vacío.
- `git rev-list --left-right --count HEAD...origin/main`: `0 / 0`.
- No hay commits nuevos remotos, divergencias ni conflictos de integración que resolver respecto a esa instantánea. No se realizó ninguna integración. Volver a consultar main antes de una autorización futura, porque esta comprobación no congela el remoto.

## Herramientas QA y cambios acotados

La única herramienta directa utilizada por QA que faltaba en package.json era **@playwright/test**. Se declara exactamente `1.64.1`, la versión ya utilizada en las revisiones previas. El lockfile fija sus transitivas playwright y playwright-core también en `1.64.1` con integridades npm. Comparación automática con el lockfile de main: **cero entradas existentes modificadas**, tres paquetes nuevos, todos de desarrollo. React/ReactDOM y todas las dependencias previas se conservaron.

Git, Node/npm y el navegador son requisitos del entorno, no dependencias npm omitidas. Las demás importaciones de QA son módulos built-in de Node o paquetes ya declarados (React/ReactDOM, Vite y herramientas ESLint).

Cambios de esta tarea:

| Archivo | Cambio |
| --- | --- |
| package.json / package-lock.json | Playwright exacto y dos transitivas; sin actualizaciones de paquetes existentes |
| scripts/approved-integrity-v1-4.json | IDs, rutas y SHA-256 de 18 assets y diez archivos legales/de pago, obtenidos del commit aprobado |
| scripts/validate-catalog.js | Compara los assets versionados con los hashes aprobados y con producción, sin leer originales locales |
| scripts/audit-originals.mjs | Separa la auditoría opcional de procedencia de cuatro MP3 y exclusión de PNG originales; requiere ruta externa explícita |
| tests/preservedContracts.test.mjs | Verifica los mismos diez contratos/precios/servicios mediante hashes normalizados, sin necesitar .git ni un commit histórico disponible |
| playwright.config.js | Herramienta declarada; un worker para estabilidad sin cambiar timeouts o aserciones |
| .gitignore / eslint.config.js | Excluyen únicamente la copia local de comprobación `.qa-clean-checkout/` |
| src/index.css | Fija el escaneo Tailwind a src y fixtures QA; no altera reglas visuales, clases, colores ni espaciados |
| scripts/audit-dependencies.mjs | Ejecuta ambas auditorías actuales con fallos de red acotados y registra resultados reales |
| scripts/summarize-audit.mjs / DEPENDENCY-AUDIT-V1-4.md | Clasificación dinámica, sin cifras hardcodeadas ni afirmación obsoleta de instalación heredada |
| V1-4-COMMIT-FILES.txt | Inventario del release actualizado; excluye la copia de QA y sus artefactos |
| PUBLICATION-AUDIT-V1-4.md | Referencia a este cierre actualizado; conserva la auditoría histórica |
| Este informe | Procedimiento reproducible, resultados y riesgos |

## Integridad y auditoría opcional de originales

La validación obligatoria mantiene nueve IDs/títulos, nueve Smartlinks, orden, filtros, controles habilitados, consentimiento, 18 rutas Gumroad exactas, precios USD, pedidos pendientes, ausencia de licencia emitida y rechazo de checkout inválido. Además comprueba cada ruta/hash de MP3 y portada contra el baseline aprobado y que sus bytes se encuentren referenciados en dist. No se rebajaron los chequeos de permisos o pagos.

El control que comparaba archivos de `NEW TRACKS` con sus copias se separó. El chequeo obligatorio de no publicar originales PNG para las cuatro pistas mantiene comprobación de nombres, hash aprobado de la portada JPG y exclusión de WAV/FLAC/AIFF/ZIP en assets. La comparación exacta con bytes de originales PNG no versionados solo es posible mediante la auditoría opcional:

```powershell
node scripts/audit-originals.mjs "<directorio-autorizado-de-originales>"
```

Debe ejecutarse después del build y únicamente cuando se dispone de esos originales autorizados. No copia ni publica archivos privados, no es parte de build/tests y no se necesita para validar un checkout limpio. No se ejecutó durante esta tarea porque el objetivo era demostrar independencia de los originales.

Los hashes no amplían derechos ni verifican titularidad. Su fuente es el commit aprobado, no un recálculo aceptado automáticamente desde archivos alterados. No actualizar este baseline para hacer pasar una regresión sin revisión.

## Instalación y ejecución limpia

Se ejecutó npm ci en el worktree: **148 paquetes instalados**, sin reutilizar los módulos del ancestro. El intento inicial con sandbox falló por permisos de caché; la repetición autorizada terminó correctamente. Se ejecutó otra instalación del mismo lockfile en `.qa-clean-checkout/`, copia de fuentes dentro del worktree **sin .git, NEW TRACKS, node_modules heredado ni artifacts**. Instaló los mismos 148 paquetes. Se verificó que React, ReactDOM, Vite, ESLint y Playwright se resuelven desde su propio node_modules.

Se probó con Node 24.18.0 y npm del entorno. Para reproducir:

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run lint
node scripts/validate-catalog.js
npm.cmd test
```

En sistemas donde npm no se bloquea por PowerShell, se puede usar `npm` en lugar de `npm.cmd`. Las instalaciones de comprobación usaron también `--no-audit --no-fund --fetch-retries=0 --fetch-timeout=20000`; no cambian la resolución del lockfile. Las auditorías se ejecutaron después por separado.

La primera copia sin .git generaba CSS adicional por el escaneo automático de Tailwind. Se fijaron las fuentes explícitamente. Tras el ajuste, **los 33 archivos de dist son idénticos byte por byte entre el worktree y la copia limpia**. Los nombres/hashes de CSS y JS coinciden además con los del artefacto visualmente aprobado. La configuración sigue el mecanismo documentado por [Tailwind para registrar fuentes explícitas](https://tailwindcss.com/docs/detecting-classes-in-source-files).

Resultados:

| Comprobación | Worktree | Copia limpia sin .git/originales |
| --- | --- | --- |
| npm ci | PASS, 148 paquetes | PASS, 148 paquetes |
| Build | PASS | PASS |
| Lint | PASS | PASS |
| Catálogo | PASS | PASS |
| Unitarias | 6/6 PASS | 6/6 PASS |
| Navegador | Ejecutado desde copia limpia | 22/22 PASS, 2,3 minutos |
| Comparación de dist | 33/33 archivos idénticos | 33/33 archivos idénticos |

## Playwright y requisitos externos

Playwright npm está fijado y se instala con npm ci. La configuración actual usa **Microsoft Edge instalado** (`channel: msedge`) y un worker; el binario del navegador y sus dependencias del sistema son requisitos externos. npm ci no instala Edge. En CI hay que aprovisionar esa imagen/navegador antes de ejecutar; no se descargaron navegadores ni paquetes de sistema automáticamente. Este equipo ya dispone de Edge.

Ejecutar en una terminal:

```powershell
npm.cmd run dev -- --host 127.0.0.1 --port 5184 --strictPort
```

Y, desde el mismo checkout, en otra terminal:

```powershell
npm.cmd run test:browser
```

Iniciar el servidor por separado conserva la solución existente al bloqueo de cierre del árbol de procesos de Windows. La automatización CI debe iniciar/parar ese proceso como servicio del job. No reutilizar un servidor de otro checkout: strictPort debe fallar si el puerto ya está ocupado. No se cambiaron los timeouts o las verificaciones para obtener un PASS. Formspree y Gumroad siguen interceptados, sin compras o envíos reales.

Las capturas y resultados generados están en la copia local ignorada. No forman parte del commit ni de dist.

## npm audit actual

Se ejecutaron npm audit y npm audit --omit=dev contra el lockfile actualizado, con salida JSON y consulta exitosa al servicio. El primero devuelve código 1 porque reporta vulnerabilidades; eso no es un fallo de ejecución de la consulta.

| Exposición | Critical | High | Moderate | Low / Info | Total |
| --- | --- | --- | --- | --- | --- |
| Completa | 0 | 18 | 3 | 0 | 21 |
| Sin dev | 0 | 0 | 0 | 0 | 0 |

Origen: cadenas existentes de ESLint/Babel/Browserslist/minimatch y Tailwind/Vite/PostCSS/source-map-js. Hay avisos directos y transitivos; algunos paquetes heredan el aviso por su dependencia. No son 21 explotaciones independientes confirmadas. La clasificación por paquete, ruta, severidad, exposición y propuesta de npm está en `DEPENDENCY-AUDIT-V1-4.md`, generado desde los JSON actuales.

Exposición: desarrollo y CI que procesan entradas y herramientas de build; no hay paquetes afectados en el resultado runtime omitendo dev. El dev server se restringió a localhost y no se publica como servidor de producción. Los avisos de desarrollo siguen requiriendo revisión, especialmente las entradas no confiables y posibles denegaciones de servicio o lecturas de archivos en las herramientas. Cero avisos runtime no garantiza seguridad absoluta ni cubre terceros.

No se ejecutó audit fix, --force, upgrades mayores o cambios de producción. No se aplicó siquiera un parche compatible sin analizar su aviso, impacto y validación. **Pendiente:** remediar los avisos aplicables con cambios revisados y repetir checks, o registrar aceptación explícita y fundamentada del riesgo residual para el pipeline concreto. Sin esa decisión, NO-GO para publicar.

## Seguridad y estado final

El inventario exacto actualizado está en V1-4-COMMIT-FILES.txt. No incluye .qa-clean-checkout, node_modules, dist, artifacts, originales, temporales o copias de seguridad. Los scripts transitorios de preparación se retiraron. El WAV heredado `src/assets/audio/elevation.wav` sigue sin cambios y fuera de dist; no se añade al diff del release. No se alteraron productos, URLs ni configuración comercial.

Inventario final: 44 archivos candidatos (19 modificados y 25 nuevos), cero eliminados y staging vacío. git diff --check aprobado; la advertencia LF/CRLF no representa un error de whitespace. El escaneo de los 44 candidatos y del texto de dist no detectó patrones de secretos; dist tiene 33 archivos, nueve MP3 y ningún WAV/FLAC/AIFF/ZIP, mapa de código, clave, backup o temporal. Sus 33 hashes también coinciden con el artefacto aprobado en la auditoría anterior: no cambió el resultado web aprobado. Los informes previos conservan contexto histórico; sus pendientes de remoto/instalación quedan sustituidos por los resultados de esta tarea. Un escaneo por patrones no garantiza detectar todo secreto posible.

La aprobación del diseño se conserva; la autorización operativa para commit/integración/push/despliegue no se ejecuta ni se infiere. Detenerse después del reporte.
