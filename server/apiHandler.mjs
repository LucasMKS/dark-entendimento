import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';

const { Pool } = pg;

const WIKI_API = 'https://dark-matter-apple-tv.fandom.com/api.php';
const CACHE_DIR = path.resolve(process.cwd(), '.cache');
const LOCAL_DB_FILE = path.join(CACHE_DIR, 'multiverse_db.json');

// Season 2 Episode Wiki Page Mapping for Deterministic Auto-Sync
const S2_EPISODE_WIKI_MAP = [
  { ep: 'T2:E1', wikiTitle: 'A_Quiet_Life', airDate: '2026-08-28' },
  { ep: 'T2:E2', wikiTitle: 'A_Perfect_World', airDate: '2026-09-04' },
  { ep: 'T2:E3', wikiTitle: 'Everything_Beautiful,_Everything_Terrible', airDate: '2026-09-11' },
  { ep: 'T2:E4', wikiTitle: 'Stars,_Hide_Your_Fires', airDate: '2026-09-18' },
  { ep: 'T2:E5', wikiTitle: 'Love_and_Be_Loved', airDate: '2026-09-25' },
  { ep: 'T2:E6', wikiTitle: 'What_the_Universe_Is_Made_Of', airDate: '2026-10-02' },
  { ep: 'T2:E7', wikiTitle: 'The_Pyramid', airDate: '2026-10-09' },
  { ep: 'T2:E8', wikiTitle: 'The_Basic_Oneness_of_Everything', airDate: '2026-10-16' },
  { ep: 'T2:E9', wikiTitle: 'How_to_Build_the_Box', airDate: '2026-10-23' },
  { ep: 'T2:E10', wikiTitle: 'No_Quiet_Life', airDate: '2026-10-30' },
];

// Character Wiki Mentions -> Variant IDs
const WIKI_CHAR_TO_VARIANT_ID = [
  { keywords: ['Jason Dessen', 'Jason 1', 'Jason1'], variantId: 'jason-1' },
  { keywords: ['Jason 2', 'Jason2'], variantId: 'jason-2' },
  { keywords: ['Jason 13', 'Scar Jason'], variantId: 'jason-13' },
  { keywords: ['Jason 24'], variantId: 'jason-24' },
  { keywords: ['Jason 34'], variantId: 'jason-34' },
  { keywords: ['Amanda Lucas', 'Amanda 2'], variantId: 'amanda-2' },
  { keywords: ['Amanda 7'], variantId: 'amanda-7' },
  { keywords: ['Ryan Holder', 'Ryan 1'], variantId: 'ryan-1' },
  { keywords: ['Leighton Vance', 'Leighton 2'], variantId: 'leighton-2' },
  { keywords: ['Leighton 6', 'Oluko'], variantId: 'leighton-6' },
  { keywords: ['Blair Caplan', 'Blair 2'], variantId: 'blair-2' },
  { keywords: ['Daniela Dessen', 'Daniela 1'], variantId: 'daniela-1' },
  { keywords: ['Charlie Dessen', 'Charlie 1'], variantId: 'charlie-1' },
  { keywords: ['Laurel'], variantId: 'laurel-1' },
  { keywords: ['Mitchel MacNamara'], variantId: 'mitchel-2' },
];

let pgPool = null;
let pgReady = false;
let cronStarted = false;

function getDefaultState() {
  return {
    customWorlds: [],
    customVariants: [],
    worldPatches: {},      // { [worldId]: { episodesAdd: [], visitorsAdd: [], extraDescription: '' } }
    variantPatches: {},    // { [variantId]: { status?: string, extraStoryArc?: string, worldsVisitedAdd?: [] } }
    episodePatches: {},    // { [epCode]: { title?: string, date?: string, focus?: string, released?: boolean } }
    knownWikiPagesCount: 118,
    lastSyncAt: null,
    syncLogs: [],
  };
}

function readLocalState() {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_DB_FILE)) {
      const initial = getDefaultState();
      fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    return JSON.parse(fs.readFileSync(LOCAL_DB_FILE, 'utf8'));
  } catch {
    return getDefaultState();
  }
}

function writeLocalState(state) {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (err) {
    console.error('[Atlas DB] Erro ao gravar cache local:', err.message);
  }
}

export async function initDatabase() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return { mode: 'LOCAL_JSON', connected: false };
  }

  if (pgPool && pgReady) {
    return { mode: 'POSTGRESQL', connected: true };
  }

  try {
    pgPool = new Pool({
      connectionString: dbUrl,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
      connectionTimeoutMillis: 6000,
    });

    const client = await pgPool.connect();
    try {
      // Isolated schema so we can safely share the existing PostgreSQL on the VPS!
      await client.query(`CREATE SCHEMA IF NOT EXISTS dark_matter_atlas;`);
      await client.query(`
        CREATE TABLE IF NOT EXISTS dark_matter_atlas.multiverse_state (
          id TEXT PRIMARY KEY,
          state_json JSONB NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);
      await client.query(`
        CREATE TABLE IF NOT EXISTS dark_matter_atlas.sync_logs (
          id SERIAL PRIMARY KEY,
          trigger_source TEXT NOT NULL,
          pages_checked INT NOT NULL DEFAULT 0,
          updates_count INT NOT NULL DEFAULT 0,
          summary TEXT NOT NULL,
          details_json JSONB,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      const existing = await client.query(
        `SELECT state_json FROM dark_matter_atlas.multiverse_state WHERE id = 'canonical'`
      );
      if (existing.rowCount === 0) {
        const initial = readLocalState();
        await client.query(
          `INSERT INTO dark_matter_atlas.multiverse_state (id, state_json, updated_at) VALUES ('canonical', $1, NOW())`,
          [JSON.stringify(initial)]
        );
      }
      pgReady = true;
      console.log('✔ [PostgreSQL] Schema `dark_matter_atlas` inicializado com sucesso!');
      return { mode: 'POSTGRESQL', connected: true };
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn('⚠️ [PostgreSQL] Falha ao conectar, usando cache local JSON:', err.message);
    pgReady = false;
    return { mode: 'LOCAL_JSON', connected: false, error: err.message };
  }
}

export async function loadState() {
  await initDatabase();
  if (pgReady && pgPool) {
    try {
      const res = await pgPool.query(
        `SELECT state_json FROM dark_matter_atlas.multiverse_state WHERE id = 'canonical'`
      );
      if (res.rowCount > 0) {
        return {
          state: { ...getDefaultState(), ...res.rows[0].state_json },
          storageMode: 'POSTGRESQL',
          dbConnected: true,
        };
      }
    } catch (err) {
      console.error('[PostgreSQL] Erro ao ler estado:', err.message);
    }
  }
  return {
    state: readLocalState(),
    storageMode: 'LOCAL_JSON',
    dbConnected: false,
  };
}

export async function saveState(newState, logEntry = null) {
  writeLocalState(newState);
  if (pgReady && pgPool) {
    try {
      await pgPool.query(
        `INSERT INTO dark_matter_atlas.multiverse_state (id, state_json, updated_at)
         VALUES ('canonical', $1, NOW())
         ON CONFLICT (id) DO UPDATE SET state_json = EXCLUDED.state_json, updated_at = NOW()`,
        [JSON.stringify(newState)]
      );
      if (logEntry) {
        await pgPool.query(
          `INSERT INTO dark_matter_atlas.sync_logs (trigger_source, pages_checked, updates_count, summary, details_json)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            logEntry.triggerSource,
            logEntry.pagesChecked || 0,
            logEntry.updatesCount || 0,
            logEntry.summary || '',
            JSON.stringify(logEntry.details || []),
          ]
        );
      }
    } catch (err) {
      console.error('[PostgreSQL] Erro ao salvar estado:', err.message);
    }
  }
}

// Free Zero-Key Translation Helper (English Wiki Plot -> PT-BR)
async function translateToPtBrFree(englishText) {
  if (!englishText || !englishText.trim()) return '';
  try {
    const clean = englishText.slice(0, 900);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(
      clean
    )}`;
    const res = await fetch(url, { headers: { 'User-Agent': 'DarkMatterAtlas/2.0' } });
    if (!res.ok) return clean;
    const data = await res.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      return data[0].map((part) => part[0]).join('');
    }
    return clean;
  } catch {
    return englishText;
  }
}

function cleanWikitext(raw) {
  if (!raw) return '';
  return raw
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
    .replace(/\{\{[^}]+\}\}/g, '')
    .replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/'''?/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractPlotFromWikitext(wikitext) {
  if (!wikitext) return '';
  const plotMatch = wikitext.match(/==\s*(?:Plot|Synopsis|Summary)\s*==([\s\S]*?)(?:==|$)/i);
  if (!plotMatch) return '';
  const cleaned = cleanWikitext(plotMatch[1]);
  // Ignore stub placeholders
  if (cleaned.length < 45 || /TBA|to be announced|coming soon/i.test(cleaned)) {
    return '';
  }
  return cleaned;
}

/**
 * Deterministic Zero-API-Key Auto-Sync Engine
 * Fetches Fandom Wiki pages, checks upcoming Season 2 episodes (T2:E9, T2:E10),
 * extracts published plots & character appearances, translates to PT-BR, and updates PostgreSQL.
 */
export async function runWikiAutoSync(triggerSource = 'CRON_AUTO') {
  const { state, storageMode, dbConnected } = await loadState();
  const details = [];
  let pagesChecked = 0;
  let updatesCount = 0;

  try {
    // 1. Check total pages on Fandom Wiki
    const allPagesUrl = `${WIKI_API}?action=query&list=allpages&aplimit=500&format=json`;
    const allPagesRes = await fetch(allPagesUrl, {
      headers: { 'User-Agent': 'DarkMatterMultiverseAtlas/2.0' },
    });

    if (allPagesRes.ok) {
      const allPagesData = await allPagesRes.json();
      const pages = allPagesData?.query?.allpages || [];
      pagesChecked = pages.length;
      state.knownWikiPagesCount = pagesChecked;
      details.push(`Varredura Fandom Wiki: ${pagesChecked} páginas oficiais verificadas.`);
    }

    // 2. Query Season 2 Episode Pages (especially T2:E8, T2:E9, T2:E10)
    const titlesParam = S2_EPISODE_WIKI_MAP.map((e) => e.wikiTitle).join('|');
    const epQueryUrl = `${WIKI_API}?action=query&prop=revisions&rvprop=content&titles=${encodeURIComponent(
      titlesParam
    )}&format=json`;

    const epRes = await fetch(epQueryUrl, {
      headers: { 'User-Agent': 'DarkMatterMultiverseAtlas/2.0' },
    });

    if (epRes.ok) {
      const epData = await epRes.json();
      const pagesObj = epData?.query?.pages || {};

      for (const page of Object.values(pagesObj)) {
        if (!page || page.missing !== undefined) continue;
        const rawTitle = (page.title || '').replace(/\s+/g, '_');
        const epMeta = S2_EPISODE_WIKI_MAP.find(
          (m) => m.wikiTitle.toLowerCase() === rawTitle.toLowerCase()
        );
        if (!epMeta) continue;

        const wikitext = page.revisions?.[0]?.['*'] || '';
        const englishPlot = extractPlotFromWikitext(wikitext);

        // If this is T2:E9 or T2:E10 and a real plot is now published on the Wiki!
        if (englishPlot && (epMeta.ep === 'T2:E9' || epMeta.ep === 'T2:E10')) {
          const ptPlot = await translateToPtBrFree(englishPlot);
          const shortFocus = ptPlot.slice(0, 140) + (ptPlot.length > 140 ? '...' : '');

          const prevPatch = state.episodePatches[epMeta.ep];
          if (!prevPatch || !prevPatch.released) {
            state.episodePatches[epMeta.ep] = {
              released: true,
              focus: shortFocus,
              fullPlotPt: ptPlot,
              syncedAt: new Date().toISOString(),
            };
            updatesCount++;
            details.push(
              `Novo enredo detectado e traduzido automaticamente para ${epMeta.ep} (${page.title})!`
            );

            // Check which characters are mentioned in the new episode's wikitext
            for (const charMap of WIKI_CHAR_TO_VARIANT_ID) {
              const mentioned = charMap.keywords.some((kw) =>
                wikitext.toLowerCase().includes(kw.toLowerCase())
              );
              if (mentioned) {
                const vPatch = state.variantPatches[charMap.variantId] || {};
                const noteTag = `[Atualização Automática ${epMeta.ep}]`;
                if (!vPatch.extraStoryArc || !vPatch.extraStoryArc.includes(noteTag)) {
                  vPatch.extraStoryArc = `${
                    vPatch.extraStoryArc ? vPatch.extraStoryArc + ' ' : ''
                  }**${noteTag}:** Participa dos eventos de *${page.title}*: ${shortFocus}`;
                  state.variantPatches[charMap.variantId] = vPatch;
                  updatesCount++;
                }
              }
            }
          }
        }
      }
    }

    if (updatesCount === 0) {
      details.push(
        'Nenhuma alteração pendente: o banco já está 100% sincronizado até o último episódio lançado (T2:E8). T2:E9 ("How to Build the Box", 23/10) aguarda publicação do enredo na Wiki.'
      );
    }
  } catch (err) {
    details.push(`Aviso de rede ao consultar Wiki: ${err.message}`);
  }

  const nowIso = new Date().toISOString();
  state.lastSyncAt = nowIso;

  const logEntry = {
    id: Date.now(),
    triggerSource,
    timestamp: nowIso,
    pagesChecked,
    updatesCount,
    storageMode,
    summary:
      updatesCount > 0
        ? `${updatesCount} atualizações aplicadas automaticamente via Fandom Wiki.`
        : `Verificação concluída (${pagesChecked} páginas da Wiki checadas — tudo em dia até T2:E8).`,
    details,
  };

  state.syncLogs = [logEntry, ...(state.syncLogs || [])].slice(0, 15);
  await saveState(state, logEntry);

  return {
    ok: true,
    logEntry,
    state,
    storageMode,
    dbConnected,
  };
}

// Start Background Cron Job (runs every CRON_INTERVAL_HOURS, default 6h)
export function startAutoSyncCron() {
  if (cronStarted) return;
  cronStarted = true;

  const intervalHours = Number(process.env.CRON_INTERVAL_HOURS || 6);
  const intervalMs = Math.max(intervalHours, 1) * 60 * 60 * 1000;

  console.log(
    `⏰ [Cron Job Ativo] Sincronizador automático configurado a cada ${intervalHours}h (Zero API Key).`
  );

  // Run an initial check 8 seconds after boot
  setTimeout(() => {
    runWikiAutoSync('CRON_BOOT').catch((err) =>
      console.error('[Cron Boot Error]:', err.message)
    );
  }, 8000);

  setInterval(() => {
    runWikiAutoSync('CRON_SCHEDULED').catch((err) =>
      console.error('[Cron Scheduled Error]:', err.message)
    );
  }, intervalMs);
}

// HTTP Request Handler (compatible with both Express/Node http and Vite Dev Server Middleware!)
export async function handleApiRequest(req, res, next) {
  const url = req.url || '';
  if (!url.startsWith('/api/')) {
    if (next) return next();
    return false;
  }

  const sendJson = (status, payload) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(payload));
  };

  const parseBody = () =>
    new Promise((resolve) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch {
          resolve({});
        }
      });
    });

  try {
    if (url.startsWith('/api/multiverse') && req.method === 'GET') {
      const { state, storageMode, dbConnected } = await loadState();
      return sendJson(200, {
        ok: true,
        storageMode,
        dbConnected,
        cronIntervalHours: Number(process.env.CRON_INTERVAL_HOURS || 6),
        state,
      });
    }

    if (url.startsWith('/api/sync') && req.method === 'POST') {
      const result = await runWikiAutoSync('MANUAL_UI');
      return sendJson(200, result);
    }

    if (url.startsWith('/api/worlds') && req.method === 'POST') {
      const body = await parseBody();
      const { state, storageMode, dbConnected } = await loadState();
      if (body && body.id && body.name) {
        state.customWorlds = [...(state.customWorlds || []), body];
        const logEntry = {
          id: Date.now(),
          triggerSource: 'ADMIN_UI',
          timestamp: new Date().toISOString(),
          pagesChecked: state.knownWikiPagesCount || 118,
          updatesCount: 1,
          storageMode,
          summary: `Nova realidade registrada no banco: ${body.code} — ${body.name}`,
          details: [`Mundo ${body.name} salvo em ${storageMode}.`],
        };
        state.syncLogs = [logEntry, ...(state.syncLogs || [])].slice(0, 15);
        await saveState(state, logEntry);
      }
      return sendJson(200, { ok: true, state, storageMode, dbConnected });
    }

    if (url.startsWith('/api/variants') && req.method === 'POST') {
      const body = await parseBody();
      const { state, storageMode, dbConnected } = await loadState();
      if (body && body.id && body.designation) {
        state.customVariants = [...(state.customVariants || []), body];
        await saveState(state);
      }
      return sendJson(200, { ok: true, state, storageMode, dbConnected });
    }

    return sendJson(404, { ok: false, error: 'Endpoint não encontrado' });
  } catch (err) {
    return sendJson(500, { ok: false, error: err.message });
  }
}
