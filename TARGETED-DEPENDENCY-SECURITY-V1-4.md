# DAMTARO V1.4 — Evaluación dirigida de dependencias

Fecha: 17 de octubre de 2026, America/Guayaquil. Rama: `feature/licensing-experience-v1-4`. Alcance: evaluación, no remediación. Código, package.json y package-lock.json permanecen sin cambios durante esta tarea. No se ejecutaron instalaciones, npm update, audit fix, commit, merge, push o despliegue.

## Dictamen técnico

**GO condicionado a aceptación explícita de los riesgos concretos R1–R5 y verificación de sus controles antes de publicar.** No es una autorización de despliegue ni una declaración de riesgo cero. La opción preferida es probar primero las seis correcciones compatibles descritas abajo, en una fase posterior autorizada.

No se identificó una ruta desde entradas de visitantes de DAMTARO hacia las funciones vulnerables de estas herramientas. Sí se confirmó una lectura de mapa fuera del directorio CSS en PostCSS mediante un archivo sintético. Un build que procese CSS/configuraciones/mapas hostiles puede quedar expuesto. El pipeline real de Cloudflare y sus permisos, variables y reglas de previews no se inspeccionaron; sus controles no se presumen implementados. Si procesa entradas no confiables con secretos o acceso sensible y no puede aislarse, este GO condicionado deja de ser aplicable: **NO-GO hasta corregir o aislar ese camino**.

El NO-GO previo basado en avisos pendientes se precisa aquí mediante análisis de condiciones de explotación. La aprobación visual previa no constituye aceptación de R1–R5. No se ha aceptado ningún riesgo en nombre del propietario.

## Qué significan 18 high y 3 moderate

El informe histórico contiene 21 paquetes afectados, incluidos avisos propagados a padres y peers: **12 GHSA únicos en seis paquetes de origen**. De esos 12 advisories, nueve son high y tres moderate; no son 21 vulnerabilidades independientes.

Una consulta nueva de npm audit, con el mismo lockfile, reportó **seis paquetes de origen: cinco high y uno moderate**. Sus URLs GHSA coinciden exactamente con las 12 históricas. npm audit --omit=dev sigue reportando cero. No se actualizaron dependencias ni se corrigió nada entre ambas lecturas. La discrepancia está en los paquetes propagados y la metadata de salida; no se determinó si proviene del servicio, caché u otra diferencia de cálculo. No es evidencia de una mejora de seguridad. Los `fixAvailable:false` históricos tampoco demuestran que no haya parches: se verificaron versiones corregidas publicadas.

La primera consulta sin CA del sistema falló por certificado. La consulta válida usó Node con `--use-system-ca`, manteniendo validación TLS; no se desactivó SSL. npm audit devuelve código 1 cuando encuentra vulnerabilidades; la consulta al servicio sí terminó correctamente.

Evidencia nueva, conservada separadamente del informe histórico, en `artifacts/v1-4/targeted-security/`:

- `audit-current.json`, `audit-runtime-current.json`: consultas reales de npm.
- `chains.json`: cadenas del lockfile instalado.
- `compatibility.json`: comprobación semver de las seis versiones contra siete relaciones padre/hijo actuales.
- `proposed-versions.json`: versiones publicadas confirmadas mediante npm view; no instaladas ni probadas como remediación.
- `postcss-safe-probe.json`: prueba sintética, sin lectura de archivos reales o privados.
- `lint-reachability.json`: observación acotada de llamadas Browserslist durante lint de src.

## Paquetes instalados, cadenas y etapas

Todos los seis paquetes de origen son **transitivos y dev:true** en el lockfile. Sus padres directos son herramientas declaradas de desarrollo. Las etiquetas prod de un enlace interno de npm explain significan dependencia normal del padre, no dependencia de ejecución del sitio.

| Paquete instalado | Cadena real principal | Etapas de DAMTARO en las que puede cargarse | Ejecución del sitio publicado |
| --- | --- | --- | --- |
| baseline-browser-mapping 2.10.43 | eslint-plugin-react-hooks 7.1.1 → @babel/core 7.29.7 → @babel/helper-compilation-targets 7.29.7 → browserslist 4.28.6 | Lint/desarrollo/QA, si Babel resuelve targets y usa consultas baseline | No hay importación en src ni servidor Node de estas herramientas publicado |
| browserslist 4.28.6 | La misma cadena, sin el último salto | Lint/QA potencial. Cero llamadas observadas en lint actual de src | Igual |
| brace-expansion 5.0.7 | eslint 10.7.0 → minimatch 10.2.5; también vía @eslint/config-array 0.23.5 | Lint y descubrimiento de archivos por patrones | Igual |
| postcss 8.5.17 | vite 8.1.4 → postcss | Compilación CSS, dev server y QA que usa Vite | Igual |
| nanoid 3.3.16 | vite 8.1.4 → postcss 8.5.17 → nanoid | Identificadores internos de PostCSS durante build/dev/QA | Igual |
| source-map-js 1.2.1 | @tailwindcss/vite 4.3.2 → @tailwindcss/node 4.3.2 → source-map-js; y vite → postcss → source-map-js | Mapas CSS en build/dev/QA | Igual |

Los otros 15 paquetes históricos heredan avisos: @babel/core, @babel/helper-compilation-targets, @babel/helper-module-transforms, @eslint-community/eslint-utils, @eslint/config-array, @eslint/js, @tailwindcss/node, @tailwindcss/vite, @vitejs/plugin-react, eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh, minimatch, update-browserslist-db y vite. Peers y ciclos de metadatos no crean advisories nuevos.

## Observaciones de explotabilidad específicas

1. **Entradas públicas:** la aplicación React envía consultas a Formspree y redirige a Gumroad. No recibe CSS, globs, estadísticas Browserslist ni mapas para compilarlos en un backend DAMTARO. Búsqueda, formularios y parámetros de visitantes no alimentan estas herramientas. No se auditó aquí el software interno de esos terceros.
2. **PostCSS:** `node_modules/postcss/lib/previous-map.js:87` acepta una referencia `.map` sin confinamiento de directorio en 8.5.17. `input.js:69` construye PreviousMap incluso sin pedir un mapa de salida, salvo `map:false`. Vite proporciona `from: source` en `dist/node/chunks/node.js:22602`; esto no evita el primer traversal. La variante específica sin `from` no aparece en esa llamada principal de Vite. No hay anotaciones sourceMappingURL en las fuentes propias inspeccionadas. Las dependencias o futuros archivos sí podrían introducirlas.
3. **Prueba sintética:** PostCSS cargó `../marker.map` desde un directorio CSS artificial dentro de artifacts. El contenido era únicamente `DAMTARO_SYNTHETIC_MARKER`. Con `map:false` no se cargó. Se confirma el comportamiento de lectura de la biblioteca, no una exfiltración end-to-end desde DAMTARO ni un exploit del build de producción. No se leyeron mapas reales, secretos o rutas ajenas al worktree.
4. **Source maps:** el advisory de source-map-js requiere offsets hostiles y una ruta de consumo que recorra líneas, señalada en `lib/source-node.js:115`. Tailwind importa SourceMapGenerator en su bundle; PostCSS usa Consumer/Generator. No se encontraron llamadas a SourceNode.fromStringWithSourceMap en las rutas PostCSS/Tailwind/Vite inspeccionadas. No debe equipararse una importación Generator con la llamada vulnerable. Esto reduce la evidencia de alcance actual, sin garantizar todos los plugins o rutas futuras.
5. **Nano ID:** PostCSS llama al generador normal no seguro con tamaño fijo seis (`lib/input.js:80`). No se hallaron llamadas propias a customAlphabet/customRandom. El tamaño cero controlado por atacante no existe en la ruta inspeccionada. El nanoid 5.1.16 embebido en el module runner de Vite es distinto del 3.3.16 transitivo que reporta npm.
6. **Globs:** los patrones están en configuración/código de herramientas, por ejemplo `**/*.{js,jsx}` en ESLint. Los visitantes no controlan esos patrones; un nombre de archivo hostil no equivale por sí solo a un patrón hostil. Los cinco avisos de brace-expansion necesitan que una cadena elaborada llegue como patrón a expand, directamente o mediante minimatch. No se ejecutaron cargas OOM, de recursión masiva o que bloqueen el equipo.
7. **Browserslist:** no se encontraron archivos de configuración/stats en el checkout propio ni consultas variables aportadas por visitantes. Un wrapper de proceso, retirado al terminar, observó cero llamadas Browserslist durante lint real de src (cero errores/avisos ESLint). Esto prueba ese recorrido concreto, no inalcanzabilidad universal. Babel puede consultar BROWSERSLIST/BROWSERSLIST_CONFIG; la búsqueda de stats también puede subir directorios. La configuración de ancestros y del entorno Cloudflare no está certificada por este análisis.

## Tabla final por advisory

La severidad indicada es la del advisory, no una calificación automática del proyecto. Todos los paquetes de esta tabla son transitivos. “Bajo condicionado” significa que se mantienen entradas y pipeline confiables; no significa que la biblioteca esté corregida.

| Advisory | Dependencia | Exposición real | Corrección disponible | Riesgo residual | Acción recomendada |
| --- | --- | --- | --- | --- | --- |
| [GHSA-w5vr-8v7q-w6rv](https://github.com/advisories/GHSA-w5vr-8v7q-w6rv) · CVE-2026-45819 · Moderate | baseline-browser-mapping 2.10.43; rango afectado 2.x <2.11.0 | process.exit por opciones inválidas/conflictivas. Solo tooling vía Browserslist; no llamada directa desde DAMTARO, ni entrada pública; no activación observada en lint | 2.11.0, misma major y dentro de ^2.10.42 | Bajo condicionado: terminación del job si cambia el origen de las opciones | Probar 2.11.0 junto con Browserslist; aceptación temporal R4 |
| [GHSA-mh99-v99m-4gvg](https://github.com/advisories/GHSA-mh99-v99m-4gvg) · CVE-2026-14257 · High | brace-expansion 5.0.7; afectado <5.0.8 en esta línea | Grupos encadenados que acumulan cadenas largas hasta agotar heap. Patrón hostil necesario; globs actuales de lint son fijos | Primer parche 5.0.8; **objetivo 5.0.12** para cubrir también los otros cuatro | Bajo con patrones confiables; alto impacto de disponibilidad si se permite control del patrón | Probar 5.0.12 vía minimatch; no detenerse en 5.0.8. R3 |
| [GHSA-rgw5-rvv9-x895](https://github.com/advisories/GHSA-rgw5-rvv9-x895) · CVE-2026-69152 · High | brace-expansion 5.0.7; afectado <5.0.9 | Arrays intermedios/secuencias eluden el límite del primer parche; requiere patrón elaborado en expand | Primer parche 5.0.9; objetivo 5.0.12 | Mismo canal de lint; try/catch no resuelve un OOM fatal | Misma remediación 5.0.12; no contar como otra cadena de aplicación. R3 |
| [GHSA-q2hr-2g5m-vwhr](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr) · CVE-2026-102277 · Moderate | brace-expansion 5.0.7; afectado <5.0.12 | Reescritura cuadrática de patrones con llaves/cierre/comas; causa bloqueo CPU. Límites de cantidad de resultados no bastan | 5.0.12, patch dentro de ^5.0.5 | Bajo condicionado; interrupción de lint/CI si un patrón no confiable alcanza la API | Probar 5.0.12, límite de tiempo/recursos del job. R3 |
| [GHSA-qhr7-859c-m2p7](https://github.com/advisories/GHSA-qhr7-859c-m2p7) · CVE-2026-102278 · High | brace-expansion 5.0.7; afectado <5.0.11 | Anidamiento de grupos agota stack en expand_; el límite de longitud de salida no controla profundidad. No se observa entrada hostil actual | Primer parche 5.0.11; objetivo 5.0.12 | Disponibilidad del proceso; no implica RCE ni exposición de datos | Probar 5.0.12 y no aceptar globs de visitantes/servicios. R3 |
| [GHSA-6j4f-fj2g-mc7p](https://github.com/advisories/GHSA-6j4f-fj2g-mc7p) · CVE-2026-102276 · High | brace-expansion 5.0.7; afectado <5.0.10 | Recursión/arrays de parseCommaParts causan stack overflow. Diferente función de la anterior; la cota de minimatch no basta | Primer parche 5.0.10; objetivo 5.0.12 | Bajo condicionado; sigue siendo una falla propia aunque comparte paquete/canal | Probar 5.0.12; no confiar solo en el límite de minimatch. R3 |
| [GHSA-c83g-rgw3-j3cx](https://github.com/advisories/GHSA-c83g-rgw3-j3cx) · CVE-2026-73089 · High | browserslist 4.28.6; afectado <=4.28.6 | Proceso duradero y muchas consultas distintas controlables acumulan caché sin expulsión. No hay servicio de consultas de DAMTARO; cero llamadas en lint observado | 4.28.7, patch dentro de ^4.24.0 | Bajo en jobs finitos/consultas fijas; cambia con daemon o queries externas | Probar 4.28.7; proceso efímero, sin servicio de consultas. R4 |
| [GHSA-73wf-gq98-2v4g](https://github.com/advisories/GHSA-73wf-gq98-2v4g) · CVE-2026-73088 · High | browserslist 4.28.6; afectado <=4.28.6 | Stats JSON hostiles descubiertos en disco o pasados por opciones/env pueden causar crash/escritura de prototipo del objeto normalizado. No se observaron stats propios; ancestros/Cloudflare sin verificar | 4.28.7 | Bajo local observado; condicional en CI por descubrimiento/env. No se atribuye RCE ni contaminación global no demostradas | Probar 4.28.7; impedir stats/config externos no revisados. R4 |
| [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8) · CVE-2026-67213 · High | nanoid 3.3.16; afectado <3.3.18 en esta línea | customAlphabet/customRandom con tamaño cero causan bucle infinito. PostCSS usa nanoid no seguro con tamaño seis; condición no presente en esa ruta | 3.3.18, patch dentro de ^3.3.12; no saltar a major 5 | Bajo/no alcance demostrado de la función vulnerable actual | Probar 3.3.18 como higiene compatible, no una migración ESM/major. R5 |
| [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp) · CVE-2026-69153 · Moderate | postcss 8.5.17; afectado <=8.5.22 | CSS hostil con sourceMappingURL y llamada sin from permite leer .map externo. Vite define from en su llamada principal; no se halló esa variante en src | 8.5.23, patch dentro de ^8.5.16 | Bajo para variante sin from observada, pero otros consumidores/futuros plugins deben revisarse | Probar **8.5.23**, no solo 8.5.18; entradas confiables. R1 |
| [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849) · CVE-2026-73646 · High | postcss 8.5.17; afectado <=8.5.17 | CSS controlado referencia .map fuera del directorio; lectura confirmada con archivo sintético aun con from. Exfiltración requiere que el resultado/mapa sea accesible al atacante. No hay CSS público procesado, pero build/previews hostiles pueden alcanzarlo | Primer parche 8.5.18; objetivo 8.5.23 cubre la variante posterior | Prioridad mayor por posible confidencialidad del builder; controles Cloudflare pendientes | Probar 8.5.23; no build de CSS no revisado con secretos. R1 |
| [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) · CVE-2026-93749 · High | source-map-js 1.2.1; afectado >=1.0.0 <1.2.2 | Mapa indexado con offset de línea enorme y consumo que recorre ese offset puede bloquear CPU. No hay mapa externo propio ni llamada SourceNode encontrada en las rutas inspeccionadas; Generator de Tailwind no demuestra alcance | 1.2.2, patch dentro de ^1.2.1 en ambos padres | Bajo condicionado en rutas vistas; no se garantiza otro consumidor o dependencia futura | Probar 1.2.2 compartido entre PostCSS y Tailwind. R2 |

## Impacto posible en Cloudflare Pages

Con el comando actual `npm run build`, Vite y Tailwind se ejecutan dentro del builder; sus transitivas no quedan exentas por ser devDependencies. PostCSS y mapas constituyen el riesgo más relevante de las cadenas activas de compilación. ESLint/Browserslist/brace-expansion se añaden a la exposición del job si el pipeline ejecuta lint/QA; no forman parte automática del comando build mostrado en package.json.

Un build del commit aprobado, con assets/configuración revisados, no recibe los formularios de visitantes como CSS/globs. Un preview o job que acepte cambios no revisados puede recibir esos archivos. No se inspeccionaron las reglas ni secretos de Cloudflare: se exige comprobarlos antes de aceptar R1–R4. Un PR con capacidad de alterar vite.config.js también puede ejecutar código de build legítimamente; por eso la separación de confianza del builder es necesaria incluso después de parchear estas bibliotecas.

Cloudflare documenta previews asociados a ramas/PR y su configuración de build; no se debe confundir acceso al preview publicado con permiso para ejecutar un build confiable. Los controles de acceso de visualización no sustituyen revisión/aislamiento del job. [Previews Pages](https://developers.cloudflare.com/pages/configuration/preview-deployments/), [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/).

No activar source maps de salida no demuestra que PostCSS deje de leer mapas previos. La prueba confirmó que map:false sí evita la lectura en la llamada comprobada; no se aplicó esa opción ni se asegura que un ajuste genérico del bundler se propague automáticamente a todos los consumidores.

## Correcciones compatibles de menor impacto para probar después

Se confirmó existencia de estas versiones con npm view. Todas satisfacen los rangos padre/hijo instalados y mantienen la major; eso demuestra compatibilidad declarada, no ausencia de regresiones.

| Objetivo exacto | Padre que se mantiene | Rango que ya lo admite | Observación |
| --- | --- | --- | --- |
| postcss 8.5.23 | vite 8.1.4 | ^8.5.16 | Corrige ambos GHSA PostCSS; no basta 8.5.18 |
| source-map-js 1.2.2 | postcss 8.5.17/8.5.23 y @tailwindcss/node 4.3.2 | ^1.2.1 | Una actualización transitiva compartida cubre ambas cadenas |
| nanoid 3.3.18 | postcss | ^3.3.12 actual; ^3.3.16 en 8.5.23 | No migrar a 5.x; evita ampliar alcance |
| brace-expansion 5.0.12 | minimatch 10.2.5, mantenido por eslint 10.7.0 | ^5.0.5 | Cubre los cinco avisos; engine 20 o >=22 es compatible con Node 24.18.0 del proyecto |
| browserslist 4.28.7 | @babel/helper-compilation-targets 7.29.7 | ^4.24.0 | Actualiza mínimos de algunos datasets de navegadores; revisar el diff completo |
| baseline-browser-mapping 2.11.0 | browserslist | ^2.10.42 actual; ^2.10.44 en 4.28.7 | La corrección es minor de 2.x, no major |

Metadatos de referencia: [PostCSS 8.5.23](https://registry.npmjs.org/postcss/8.5.23), [source-map-js 1.2.2](https://registry.npmjs.org/source-map-js/1.2.2), [Nano ID 3.3.18](https://registry.npmjs.org/nanoid/3.3.18), [brace-expansion 5.0.12](https://registry.npmjs.org/brace-expansion/5.0.12), [Browserslist 4.28.7](https://registry.npmjs.org/browserslist/4.28.7), [baseline-browser-mapping 2.11.0](https://registry.npmjs.org/baseline-browser-mapping/2.11.0).

**No se propone subir los padres directos solo para eliminar avisos heredados.** Mantener inicialmente Vite 8.1.4, @tailwindcss/vite y tailwindcss 4.3.2, ESLint 10.7.0, @eslint/js 10.0.1, react-hooks 7.1.1, react-refresh 0.5.3 y plugin-react 6.0.3. Los rangos actuales permiten las seis correcciones. Si una prueba obliga a cambiar un padre, investigar y proponer una versión exacta por separado, no escoger latest automáticamente.

Plan posterior, por exposición real:

1. **P0, antes de cualquier publicación:** verificar build/preview de Cloudflare, código que puede ejecutarse, variables disponibles y acceso a outputs/logs. Si hay jobs no confiables con secretos, aislarlos o detener su ejecución; no basta con aceptar un número de npm audit.
2. **P1, cadena activa de CSS:** probar PostCSS 8.5.23 + source-map-js 1.2.2 y Nano ID 3.3.18, manteniendo los padres anteriores. Resolver las transitivas explícitamente en una revisión acotada del lockfile; no suponer que subir PostCSS fuerza los dos parches, porque sus rangos aún admiten versiones vulnerables.
3. **P2, lint:** probar brace-expansion 5.0.12, sin cambiar inicialmente minimatch/ESLint. No publicar una corrección parcial 5.0.8–5.0.11 como cierre de todos los avisos.
4. **P3, targets de Babel:** probar Browserslist 4.28.7 + baseline-browser-mapping 2.11.0. Revisar también las versiones de datasets que requiera el nuevo Browserslist; no ocultar cambios extra del lockfile.
5. En esa fase autorizada, una resolución selectiva del lockfile o overrides documentados de las seis transitivas puede ser más acotada que actualizar varios padres. No se añadió ningún override aquí. Revisar todas las resoluciones/nodos; evitar versiones duplicadas vulnerables. Semver compatible no basta: ejecutar npm ci limpio, audit completo/runtime, build, lint, catálogo, seis unitarias y 22 de navegador, además de comparar comportamiento/estilos aprobados y comprobar ausencia de mapas o recursos privados publicados. Probar las garantías de los parches con fixtures pequeños/limitados en proceso aislado; no ejecutar cargas OOM en el equipo compartido.
6. Emitir un nuevo dictamen con el resultado real de esas pruebas. Este informe no promete cero advisories ni un GO tras cambios que todavía no se han probado.

## Aceptación temporal concreta — requiere firma, no está concedida

Vigencia máxima propuesta: **hasta el 24 de octubre de 2026, America/Guayaquil**, o hasta el siguiente cambio de código de build, dependencia, configuración/variables de CI o fuente de assets, lo que ocurra primero. Revisar también inmediatamente ante un advisory nuevo relevante, evidencia de explotación o fallo de los controles. El responsable debe registrar persona, fecha, SHA/lockfile aceptado y controles verificados; no basta un “acepto los 21”.

| Riesgo | Justificación acotada | Condiciones de aceptación y mitigaciones propuestas | Disparador de revisión |
| --- | --- | --- | --- |
| R1: PostCSS, dos GHSA | Sin endpoint público de CSS; fuentes actuales revisadas sin sourceMappingURL; vulnerabilidad de biblioteca confirmada | Solo build del commit aprobado y dependencias bloqueadas; ninguna entrada/PR no confiable con secretos; builder efímero de privilegio mínimo, no mapas sensibles montados, revisar CSS y outputs. Registrar configuración real Cloudflare. Si se propone map:false, verificar su efecto en cada llamada antes de contarlo como control | 24/10/2026 o cualquier CSS/mapa/plugin/preview nuevo. Si no se pueden verificar controles de confianza, NO-GO para esa ruta |
| R2: source-map-js | No ruta SourceNode encontrada; Tailwind usa Generator; no mapas externos en fuentes propias | Prohibir mapas indexados no revisados, revisar dependencias/assets nuevos y limitar recursos/tiempo del builder. No presentar Generator como prueba de parche. Aplicar 1.2.2 en fase P1 | Misma fecha o nuevo consumidor de SourceNode/mapa externo |
| R3: cinco GHSA brace-expansion | Globs fijos en tooling; ausencia de servicio que acepte patrones | No globs procedentes de visitantes, APIs o variables no confiables; revisión de config ESLint y argumentos CI; jobs finitos con límite de recursos. No confiar en try/catch de OOM ni en una cota de minimatch como corrección suficiente | Misma fecha o argumentos/patrones/CLI nuevos |
| R4: Browserslist y baseline, tres GHSA | Cero llamadas en recorrido de lint observado; sin stats/query externas en checkout | No stats no revisados en proyecto/ancestros ni BROWSERSLIST/BROWSERSLIST_CONFIG/BROWSERSLIST_STATS controlados por terceros; jobs efímeros y consultas estables. BROWSERSLIST_DISABLE_CACHE=1 puede mitigar solo la caché si se verifica y aprueba; no corrige stats ni process.exit. No se configuró aquí | Misma fecha o daemon, targets, stats, variables o datos externos nuevos |
| R5: Nano ID | Ruta observada usa generador normal y tamaño seis, no API personalizada con cero | Mantener esa ruta y revisar cualquier nuevo uso de customAlphabet/customRandom; no tamaños de usuario. Parchar a 3.3.18 en P1 sin migración mayor | Misma fecha o uso/tamaño/API nuevos |

Los límites de CPU/memoria/tiempo contienen impacto del job pero no corrigen el paquete. Aislar y no montar secretos reduce impacto de lecturas, pero no autoriza procesar arbitrariamente contenido hostil. Las mitigaciones de esta tabla son condiciones propuestas, no cambios aplicados o controles del dashboard ya verificados.

## Verificación de no modificación y límites

La comparación final de huellas de los 44 archivos del inventario existente encontró **cero modificaciones**, incluidos package.json y package-lock.json. Las seis versiones instaladas siguen siendo las vulnerables indicadas; ninguna propuesta se instaló. La evidencia está en `artifacts/v1-4/targeted-security/files-unchanged.json`. Staging vacío y git diff --check aprobado, con la advertencia previa LF/CRLF. Solo se añade este informe y evidencia local bajo artifacts; no se cambia el inventario del release ni los informes previos para convertir una evaluación en una remediación. El informe nuevo deberá incorporarse al inventario si el propietario decide versionarlo.

No se ejecutó una actualización, instalación ni reconstrucción del producto. La única ejecución funcional adicional fue lint de src sin fix y una prueba PostCSS con un mapa sintético confinado a artifacts. No se certifica el dashboard Cloudflare, proveedores externos, herramientas futuras o ramas no auditadas. La evaluación usa avisos públicos y código local; no sustituye una prueba de exploit end-to-end del pipeline ni una aceptación explícita del propietario.
