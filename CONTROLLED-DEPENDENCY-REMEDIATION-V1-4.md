# DAMTARO V1.4 — Remediación controlada de dependencias

Fecha: 17 de octubre de 2026, America/Guayaquil. Worktree y rama: `feature/licensing-experience-v1-4`. Informe complementario de `TARGETED-DEPENDENCY-SECURITY-V1-4.md`; los informes anteriores se conservan como evidencia histórica.

## Alcance y dictamen

**GO técnico para la remediación y el artefacto V1.4 probado; GO de publicación condicionado a verificar los controles reales del builder Cloudflare descritos abajo.** Todas las comprobaciones locales pasan. La remediación se ha aplicado sin cambiar código del producto, diseño, catálogo, licencias ni pagos. No constituye autorización ni ejecución de despliegue.

Solo se modificaron durante esta tarea `package.json` y `package-lock.json`, y se añadió este informe. La comparación contra las huellas de los 45 archivos candidatos existentes encontró cambios únicamente en esos dos archivos de dependencias. Se conservaron los cambios V1.4 previos; no se tocó la carpeta principal ni V1/V2. El staging está vacío. No se hizo commit, merge, rebase, push ni despliegue.

La evidencia auxiliar nueva está en `artifacts/v1-4/controlled-remediation/`. Incluye snapshots anteriores de dependencias y dist, metadatos e integridad de tarballs, semver, diff del lockfile, auditorías JSON, comparación de artefactos, scripts efectivos y prueba sintética PostCSS. Es material local de auditoría, no parte de dist ni un conjunto para añadir indiscriminadamente a Git. El inventario previo `V1-4-COMMIT-FILES.txt` no se alteró; quien prepare posteriormente el commit deberá decidir expresamente si incluye este informe y el informe dirigido anterior.

## Versiones y justificación

| Dependencia transitiva dev | Original → final | Justificación y cadena mantenida |
| --- | --- | --- |
| postcss | 8.5.17 → **8.5.23** | Dos GHSA; Vite 8.1.4 admite ^8.5.16. Incluye la corrección posterior a 8.5.18 |
| source-map-js | 1.2.1 → **1.2.2** | Un GHSA; compartida por PostCSS y @tailwindcss/node 4.3.2, ambos admiten ^1.2.1 |
| nanoid | 3.3.16 → **3.3.18** | Un GHSA; PostCSS 8.5.23 admite ^3.3.16. Se conserva major 3 |
| brace-expansion | 5.0.7 → **5.0.12** | Cinco GHSA; minimatch 10.2.5 admite ^5.0.5; no basta un parche parcial |
| browserslist | 4.28.6 → **4.28.7** | Dos GHSA; @babel/helper-compilation-targets 7.29.7 admite ^4.24.0 |
| baseline-browser-mapping | 2.10.43 → **2.11.0** | Un GHSA; nuevo Browserslist admite ^2.10.44, incluyendo 2.11.0 |
| caniuse-lite | 1.0.30001805 → **1.0.30001806** | Dataset adicional inevitable: mínimo ^1.0.30001806 exigido por Browserslist 4.28.7 |
| electron-to-chromium | 1.5.389 → **1.5.393** | Dataset adicional inevitable: mínimo ^1.5.393 exigido por Browserslist 4.28.7 |

Los dos datasets se explicaron antes de aplicar cambios; se fijaron los mínimos compatibles para evitar actualizaciones ajenas de datos. Exactamente ocho nodos existentes del lockfile cambiaron; ninguno añadido o eliminado. No hubo actualizaciones mayores ni cambios de padres directos: React/DOM 19.2.7, Vite 8.1.4, Tailwind y plugin 4.3.2, ESLint 10.7.0 y Playwright 1.64.1 permanecen instalados. Las declaraciones originales de dependencies/devDependencies y scripts se conservaron.

Se añadieron overrides exactos y limitados a los padres reales: Vite → PostCSS y sus dos hijos, @tailwindcss/node → source-map-js, minimatch → brace-expansion, y @babel/helper-compilation-targets → Browserslist y sus tres hijos. Esto es necesario para hacer reproducibles las seis correcciones sin subir sus padres ni dejar que rangos amplios retengan hijos vulnerables o actualicen datasets innecesariamente. Las diez relaciones de dependencia/peer pertinentes satisfacen semver. Los ocho objetivos tienen una sola instalación por paquete; `npm ls --all` termina en código 0, sin dependencias inválidas. Los opcionales de otras plataformas y plugins no utilizados ausentes no son errores de instalación.

Antes de instalar se descargaron metadatos y tarballs de `registry.npmjs.org` de las ocho versiones: identidad y SHA-512 contrastados con dist.integrity y posteriormente con el lockfile. Se inspeccionaron package.json de los tarballs sin ejecutarlos. Ninguno de los ocho introduce preinstall/install/postinstall. Los scripts prepare/build/test de desarrollo presentes en algunos tarballs no son hooks de instalación desde el registro. Engines compatibles con Node 24.18.0; brace-expansion exige Node 20 o >=22.

Una primera resolución con overrides hermanos no produjo el conjunto exacto: mantuvo Nano ID antiguo y seleccionó datasets posteriores. Una instalación de ese intento llegó a terminar antes de detectar la discrepancia; no se usó para build, pruebas ni dictamen. Se rechazó esa resolución, restauró únicamente el snapshot previo del lockfile, corrigió el anidamiento de overrides, verificaron las ocho versiones/integridades y se repitió npm ci. `initial-resolution-rejected.json` conserva el incidente. Solo la segunda instalación validada cuenta como resultado.

## Instalación y QA reproducible

Entorno: Windows, Node 24.18.0, npm 11.16.0; Edge instalado como requisito externo de Playwright. TLS validado con `NODE_OPTIONS=--use-system-ca`; no se deshabilitó SSL. La instalación válida fue `npm ci --no-audit --no-fund --fetch-retries=0 --fetch-timeout=20000`: **148 paquetes, código 0**, desde el lockfile final verificado, reemplazando node_modules. No se usaron paquetes globales para las herramientas QA.

| Comprobación | Resultado |
| --- | --- |
| npm ci | PASS, 148 paquetes |
| npm run build | PASS, Vite 8.1.4, 92 módulos |
| npm run lint | PASS, sin errores |
| node scripts/validate-catalog.js | PASS |
| npm test | PASS, seis de seis |
| npm run test:browser | PASS, 22 de 22, desktop y mobile; 2,1 minutos |
| npm ls --all | PASS, código 0 |
| git diff --check | PASS; advertencia preexistente LF/CRLF en LicenseModal.jsx |
| npm audit --json | PASS, código 0, cero de todas las severidades |
| npm audit --omit=dev --json | PASS, código 0, cero de todas las severidades |
| Prueba sintética PostCSS 8.5.23 | PASS, mapa externo no cargado tanto con from como sin from |

Para navegador se inicia Vite por separado con `npm run dev -- --host 127.0.0.1 --port 5184 --strictPort`, y se ejecuta `npm run test:browser`: 22 casos, un worker, desktop y mobile, canal msedge. Se conserva la configuración y los timeouts aprobados. El navegador y sus dependencias del sistema no se instalan mediante npm ci: otro agente/CI debe disponer de Edge o preparar explícitamente el navegador apropiado. Los tests interceptan Formspree y Gumroad; comprueban esquema, validaciones, error/reintento, consentimiento y rutas sin enviar consultas ni realizar pagos reales. No certifican la disponibilidad de los proveedores externos.

## Advisories corregidos y pendientes

| Paquete corregido | GHSA del informe dirigido, ahora fuera del rango afectado |
| --- | --- |
| postcss 8.5.23 | GHSA-r28c-9q8g-f849; GHSA-fxqj-rqcc-2cmp |
| source-map-js 1.2.2 | GHSA-68fv-2mgg-jv7q |
| nanoid 3.3.18 | GHSA-2v37-7h3g-55p8 |
| brace-expansion 5.0.12 | GHSA-mh99-v99m-4gvg; GHSA-rgw5-rvv9-x895; GHSA-q2hr-2g5m-vwhr; GHSA-qhr7-859c-m2p7; GHSA-6j4f-fj2g-mc7p |
| browserslist 4.28.7 | GHSA-c83g-rgw3-j3cx; GHSA-73wf-gq98-2v4g |
| baseline-browser-mapping 2.11.0 | GHSA-w5vr-8v7q-w6rv |

Son **12 GHSA únicos: nueve high y tres moderate**, todos de herramientas transitivas de desarrollo/build. Los 18 high y tres moderate históricos eran 21 paquetes señalados, incluyendo propagación, no 21 vulnerabilidades independientes. La consulta inmediatamente anterior de la evaluación dirigida señalaba seis paquetes de origen con los mismos 12 GHSA. Ahora las versiones cambian realmente y ambas consultas posteriores devuelven cero. No quedan advisories conocidos pendientes en esas consultas; no se solicita aceptar temporalmente las versiones vulnerables R1–R5 anteriores.

La conclusión se apoya también en rangos, contenido de paquetes, árbol instalado, pruebas y artefactos: cero audit no sustituye análisis de explotabilidad. La prueba PostCSS previa cargaba un mapa sintético fuera del subdirectorio CSS en 8.5.17; 8.5.23 no lo carga, con y sin from. No se ejecutaron cargas OOM/CPU masivas de otros advisories ni se afirma una certificación de todos los caminos posibles. Referencias GHSA y condiciones concretas completas: `TARGETED-DEPENDENCY-SECURITY-V1-4.md`.

## Comparación de artefactos y garantías del producto

Antes y después: **33 archivos, 63.577.096 bytes; cero archivos añadidos, retirados o con SHA-256 diferente**. Incluye HTML, JS `index-BjJdzEW1.js`, CSS `index-CSFxvGUl.css`, imágenes y nueve MP3. No hubo cambio inesperado, ni siquiera en archivos generados. `artifact-comparison.json` documenta la comparación contra el snapshot anterior.

El validador confirma nueve IDs/canciones y Smartlinks aprobados, 18 rutas Gumroad exactas, Creator USD 17, Business USD 149, consentimiento obligatorio, estado de pago pendiente y rechazo de checkout inválido; también 18 hashes de assets aprobados. Las seis pruebas unitarias incluyen contratos legales/precios/pagos inalterados. El código Custom Audio y su endpoint Formspree permanecen intactos. Los archivos legales, pagos, catálogo y todos los demás archivos candidatos existentes mantienen sus huellas anteriores.

No hay WAV, stems, mapas, backups, ZIP ni archivos temporales en dist; contiene nueve MP3 públicos aprobados. El WAV heredado en src no fue añadido por esta tarea ni se copia a dist. No se incluyeron originales de la unión local NEW TRACKS. El escaneo de patrones comunes de credenciales en los 45 candidatos y textos de dist no produjo hallazgos; no es una garantía universal para cualquier formato de secreto. El identificador público de Formspree es parte del contrato existente, no una credencial privada. El frontend no confirma pagos.

## Builder Cloudflare: observado y pendiente

**Observado localmente:** el comando build es Vite; vite.config.js carga únicamente React y Tailwind. Procesa CSS del checkout (`src/index.css` y CSS importado del paquete Tailwind) y módulos de dependencias bloqueadas. No hay un endpoint que compile CSS, globs, mapas o consultas Browserslist enviados por visitantes. No hay sourceMappingURL en src ni configuración PostCSS/Browserslist propia encontrada. La importación Google Fonts es una URL CSS que permanece en el CSS final idéntico, para el navegador; no se comprobó como una descarga de CSS remoto por PostCSS. El inventario es estático, sin un runtime Node propio publicado.

No se encontraron referencias propias import.meta.env/process.env en el código de producto inspeccionado ni archivos .env locales en la raíz; no se leyeron ni publicaron valores de secretos. Esto no demuestra que el builder remoto carezca de variables. Vite/config/plugins y las dependencias sí ejecutan código durante el build: si se admite un checkout hostil, puede ejecutar código aun con estas vulnerabilidades corregidas.

**Scripts de instalación:** los ocho paquetes cambiados no tienen hooks de instalación. El único nodo marcado hasInstallScript del lockfile completo es fsevents 2.3.3, opcional de macOS e idéntico al anterior; no está instalado en Windows. La inspección de los package.json efectivamente instalados encontró cero preinstall/install/postinstall. Los bindings nativos de Tailwind/LightningCSS/Rolldown se mantienen en sus versiones anteriores; Linux Cloudflare no fue ejecutado aquí y debe resolver sus opcionales mediante el mismo lockfile.

**Comprobación manual pendiente antes de publicar:** no existe configuración Cloudflare versionada suficiente ni se accedió al dashboard. Confirmar proyecto/rama y raíz correctos; instalación que respete el lockfile (npm ci), Node/npm compatibles con el entorno probado, build `npm run build`, salida exclusivamente `dist`, y que no se omiten las devDependencies necesarias para compilar. Registrar SHA y huella del lockfile. Confirmar permisos de ramas/previews, revisión de código/config/dependencias, separación de variables entre producción y previews, ausencia de secretos innecesarios en jobs no confiables, y acceso mínimo a logs/outputs. No usar variables VITE_* para secretos. Verificar que no entran mapas/stats/configuraciones de ancestros o variables BROWSERSLIST_* no revisadas. Ningún control remoto se presume satisfecho.

La documentación oficial distingue comando/directorio/variables de build y previews por ramas/PR: [configuración de build](https://developers.cloudflare.com/pages/configuration/build-configuration/), [previews](https://developers.cloudflare.com/pages/configuration/preview-deployments/). Esa documentación no prueba la configuración de este proyecto. No se modificó Cloudflare, DNS ni variables.

Riesgos residuales: cadena de suministro y ejecución legítima de configuración/plugins, diferencias Windows/Linux y variables/permisos remotos sin verificar. Son independientes de los 12 GHSA corregidos. Revisar antes del siguiente build publicado y ante cualquier cambio de lockfile, CSS/mapas, plugins, comandos, permisos o variables del builder; repetir audit y QA pertinentes ante cambios. Si un builder permite código no revisado con secretos, **NO-GO para ese pipeline hasta aislarlo**, aunque npm audit siga en cero.

## Cierre de verificación

Las **22 pruebas de navegador terminaron correctamente**, código 0, en 2,1 minutos. Build, lint, catálogo, seis unitarias, instalación limpia, árbol instalado, prueba PostCSS y ambos audits pasan. La revisión final confirma staging vacío y git diff --check aprobado, salvo la advertencia de normalización de saltos de línea ya indicada. Se conservan los demás cambios V1.4 preexistentes. No se detectaron modificaciones inesperadas del producto o de dist.

No quedan vulnerabilidades conocidas de npm pendientes de aceptación en este árbol. **GO técnico tras la remediación aplicada y probada. Para publicar: GO condicionado a registrar la verificación operativa Cloudflare; si no se verifica la separación de código no confiable y secretos, no publicar desde ese pipeline.** No se afirma haber probado Linux/Cloudflare ni la recepción real de Formspree o el procesamiento real de Gumroad. Se detiene el trabajo con este informe, sin commit, merge, push ni despliegue.
