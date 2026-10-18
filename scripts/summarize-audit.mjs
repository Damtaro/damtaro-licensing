import { readFile, writeFile } from 'node:fs/promises';
const report = JSON.parse(await readFile('artifacts/v1-4/npm-audit.json', 'utf8'));
const runtime = JSON.parse(await readFile('artifacts/v1-4/npm-audit-runtime.json', 'utf8'));
const graph = JSON.parse(await readFile('artifacts/v1-4/dependency-paths.json', 'utf8'));
if (report.error || runtime.error) throw new Error('Audit failed; refusing to report stale or incomplete results.');
const paths = new Map();
function visit(dependencies, chain = []) {
  for (const [name, node] of Object.entries(dependencies || {})) {
    const next = [...chain, `${name}@${node.version || '?'}`];
    if (!paths.has(name) || next.length < paths.get(name).length) paths.set(name, next);
    visit(node.dependencies, next);
  }
}
visit(graph.dependencies);
const rows = Object.entries(report.vulnerabilities).map(([name, item]) => {
  const directIssues = item.via.filter(issue => typeof issue === 'object');
  const issues = directIssues.length ? directIssues.map(issue => `[${issue.title.replaceAll('|', '/')} ](${issue.url})`).join('; ') : `Aviso heredado de ${item.via.join(', ')}`;
  const fix = typeof item.fixAvailable === 'object' ? `${item.fixAvailable.name}@${item.fixAvailable.version}${item.fixAvailable.isSemVerMajor ? ' (cambio mayor; requiere revisión)' : ' (evaluar cambio acotado)'}` : item.fixAvailable ? 'Existe corrección; revisar compatibilidad' : 'Sin corrección automática indicada';
  const exposure = runtime.vulnerabilities[name] ? 'Dependencia presente también sin dev' : 'Herramientas de desarrollo/build';
  return `| ${name} | ${item.severity} | ${item.isDirect ? 'Directa' : 'Transitiva'} | ${paths.get(name)?.join(' → ') || item.nodes.join(', ')} | ${exposure} | ${issues} | ${fix} |`;
});
const counts = report.metadata.vulnerabilities;
const text = `# Auditoría de dependencias V1.4 — actualizada

Resultado real de npm audit sobre el lockfile instalado con npm ci: **${counts.total} paquetes afectados**. Distribución: ${counts.critical} critical, ${counts.high} high, ${counts.moderate} moderate, ${counts.low} low, ${counts.info} info. npm audit --omit=dev: **${runtime.metadata.vulnerabilities.total} paquetes afectados**. Los códigos de salida por vulnerabilidades no se confunden con un fallo de red o del servicio.

Playwright 1.64.1 es la única herramienta QA directa añadida; playwright y playwright-core 1.64.1 son sus dependencias transitivas. El lockfile no actualiza las dependencias existentes. La instalación ahora es local, sin reutilizar node_modules del ancestro.

| Dependencia | Severidad | Origen | Ruta mínima | Exposición | Aviso / causa | Remediación propuesta por npm |
| --- | --- | --- | --- | --- | --- | --- |
${rows.join('\n')}

Los avisos de desarrollo pueden afectar máquinas de desarrollo y CI al procesar entradas no confiables; no desaparecen por quedar fuera de dist. Vite se utiliza únicamente en localhost para QA. No se ejecutó npm audit fix, --force ni actualizaciones para forzar cero avisos. Las remediaciones deben revisarse por aviso, compatibilidad y exposición antes de aplicarlas. Sin aceptación explícita del riesgo o remediación verificada, el dictamen de publicación es NO-GO. Cero avisos runtime no garantiza ausencia de vulnerabilidades desconocidas ni seguridad de proveedores externos.

Evidencia local excluida del commit: artifacts/v1-4/npm-audit.json, npm-audit-runtime.json y dependency-paths.json. Este documento se genera de esos datos; no contiene cifras hardcodeadas.
`;
await writeFile('DEPENDENCY-AUDIT-V1-4.md', text);
console.log(rows.length, 'affected packages documented');
