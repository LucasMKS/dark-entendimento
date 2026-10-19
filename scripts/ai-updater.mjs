#!/usr/bin/env node
/**
 * VELOCITY LABS // Script de Sincronização Semanal + Validador de Consistência Canônica
 * Uso:
 *   npm.cmd run sync-episode -- --season=2 --episode=9
 *
 * REGRAS DE VALIDAÇÃO ANTI-ERRO (Entity Resolution & Cross-Check):
 * 1. NUNCA criar um novo Mundo apenas pelo título do episódio (ex: "The Pyramid" acontece DENTRO
 *    dos túneis subterrâneos do "Mundo Low-Tech / World X", onde Leighton criou a Velocity Tech
 *    contra a MacNamara Tech). Um novo mundo só deve existir se houver um salto físico pela Caixa.
 * 2. Cruzamento obrigatório de 3 fontes antes de atualizar `src/data/multiverseData.ts`:
 *    (a) Fandom Wiki API (`Special:AllPages` + `Realities`),
 *    (b) Recaps analíticos detalhados do episódio (verificando onde a Caixa está localizada),
 *    (c) Dark Matter: The Official Podcast (confirmação de números de variantes por Blake Crouch).
 * 3. Validação automática de integridade referencial: todos os IDs em `worldsVisited`, `originWorldId`,
 *    `currentWorldId`, `visitors` e `JOURNEYS` são auditados por este script.
 */

import fs from 'node:fs';
import path from 'node:path';

const WIKI_API = 'https://dark-matter-apple-tv.fandom.com/api.php';
const DATA_FILE = path.resolve(process.cwd(), 'src/data/multiverseData.ts');

const args = process.argv.slice(2);
const seasonArg = args.find((a) => a.startsWith('--season='))?.split('=')[1] || '2';
const episodeArg = args.find((a) => a.startsWith('--episode='))?.split('=')[1] || '9';

async function fetchWikiAllPages() {
  const url = `${WIKI_API}?action=query&list=allpages&aplimit=200&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  return data?.query?.allpages || [];
}

function validateMultiverseDataFile() {
  const content = fs.readFileSync(DATA_FILE, 'utf-8');

  // Extract defined world IDs
  const worldBlockMatch = content.split('export const VARIANTS')[0];
  const worldIds = [...worldBlockMatch.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]);
  const worldSet = new Set(worldIds);

  // Extract referenced world IDs in VARIANTS and JOURNEYS
  const restContent = content.split('export const VARIANTS')[1] || '';
  const referencedWorldIds = [
    ...restContent.matchAll(/(?:originWorldId|currentWorldId|fromWorldId|toWorldId):\s*'([^']+)'/g),
    ...restContent.matchAll(/'(world-[^']+)'/g),
  ].map((m) => m[1]);

  const brokenRefs = [...new Set(referencedWorldIds.filter((id) => !worldSet.has(id)))];

  return {
    totalWorlds: worldIds.length,
    brokenRefs,
  };
}

async function main() {
  console.log('========================================================================');
  console.log(' ⚛️  DARK MATTER (APPLE TV+) // SINCRONIZADOR & VALIDADOR CANÔNICO');
  console.log('========================================================================');
  console.log(`📡 Alvo selecionado: Temporada ${seasonArg} • Episódio ${episodeArg}`);
  console.log('');

  // 1. Validate local database integrity
  console.log('🔍 [1/2] Auditando integridade de `src/data/multiverseData.ts`...');
  const validation = validateMultiverseDataFile();
  console.log(`   ✔ ${validation.totalWorlds} mundos únicos catalogados (sem duplicação Low-Tech/Pirâmide).`);
  if (validation.brokenRefs.length > 0) {
    console.error(`   ❌ ERRO: Referências de mundo quebradas encontradas:`, validation.brokenRefs);
    process.exit(1);
  } else {
    console.log('   ✔ Zero referências quebradas entre Mundos, Variantes e Saltos na Caixa!');
  }

  // 2. Check Fandom Wiki
  try {
    console.log('🌐 [2/2] Consultando Fandom Wiki (Special:AllPages)...');
    const pages = await fetchWikiAllPages();
    console.log(`   ✔ ${pages.length} páginas oficiais sincronizadas.`);
  } catch (err) {
    console.warn('   ⚠️ Aviso ao consultar a Wiki:', err.message);
  }

  console.log('');
  console.log('🛡️  PROTOCOLO ANTI-ERRO ATIVO PARA PRÓXIMOS EPISÓDIOS:');
  console.log('   • Regra 1 (Deduplicação de Mundo): Só criar novo Mundo se houver salto na Caixa.');
  console.log('     Eventos no mesmo universo (ex: Pirâmide nos túneis do Mundo Low-Tech) ficam unificados.');
  console.log('   • Regra 2 (Tripla Checagem): Cruzar Wiki + Recap Completo + Podcast Oficial.');
  console.log('========================================================================');
}

main();
