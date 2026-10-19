import React, { useState } from 'react';
import { PODCAST_RULES_AND_LORE, World, CharacterVariant } from '../data/multiverseData';
import { RichText } from './RichText';
import {
  Plus,
  CheckCircle2,
  Database,
  RefreshCw,
  Clock,
  ChevronDown,
  ChevronUp,
  Server
} from 'lucide-react';

export interface SyncLogEntry {
  id: number;
  triggerSource: string;
  timestamp: string;
  pagesChecked: number;
  updatesCount: number;
  storageMode: string;
  summary: string;
  details: string[];
}

interface PodcastAndUpdaterTabProps {
  worlds: World[];
  variants: CharacterVariant[];
  storageMode: 'POSTGRESQL' | 'LOCAL_JSON';
  dbConnected: boolean;
  cronIntervalHours: number;
  lastSyncAt: string | null;
  syncLogs: SyncLogEntry[];
  isSyncing: boolean;
  onTriggerSyncNow: () => Promise<void>;
  onAddWorld: (newWorld: World) => void;
  onAddVariant: (newVariant: CharacterVariant) => void;
}

export const PodcastAndUpdaterTab: React.FC<PodcastAndUpdaterTabProps> = ({
  worlds,
  variants,
  storageMode,
  dbConnected,
  cronIntervalHours,
  lastSyncAt,
  syncLogs,
  isSyncing,
  onTriggerSyncNow,
  onAddWorld,
}) => {
  const [showUpdaterForm, setShowUpdaterForm] = useState(false);
  const [episodeInput, setEpisodeInput] = useState('T2:E9');
  const [worldName, setWorldName] = useState('');
  const [worldCode, setWorldCode] = useState('WORLD 33');
  const [worldCategory, setWorldCategory] = useState<World['category']>('Hostile');
  const [worldDescription, setWorldDescription] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleCreateWorld = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!worldName.trim() || !worldDescription.trim()) return;

    const newWorld: World = {
      id: `world-custom-${Date.now()}`,
      code: worldCode || 'WORLD 33',
      numberLabel: '33',
      name: worldName,
      shortHook: worldDescription.slice(0, 110) + '...',
      officialOrFanName: worldName,
      season: 2,
      episodes: [episodeInput],
      category: worldCategory,
      habitability: 'Habitável',
      imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/2/21/Dark_Matter_S2E09.jpg/revision/latest?cb=20261016143558',
      themeColor: '#c89d54',
      atmosphere: 'Catalogado no banco de dados do servidor.',
      boxLocation: 'Coordenada de Chicago',
      description: worldDescription,
      visitors: ['jason-1'],
      residents: [],
      sources: [
        {
          type: 'EPISODE_CANON',
          label: episodeInput,
          detail: 'Persistido no banco de dados via Painel Web.'
        }
      ]
    };

    onAddWorld(newWorld);
    setWorldName('');
    setWorldDescription('');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#c89d54]/25 pb-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-center justify-center w-12 h-12 border border-[#c89d54]/40 bg-[#07080c] text-[#c89d54] font-display text-sm">
            <span>V</span>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c89d54]">
              ARQUIVO CANÔNICO & AUTOMAÇÃO VPS // POSTGRESQL + CRON JOB
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-[0.14em] mt-0.5">
              Leis da Caixa & Sincronização Automática
            </h2>
          </div>
        </div>

        {/* One-Click Web Sync Trigger (Zero Terminal Needed!) */}
        <button
          onClick={onTriggerSyncNow}
          disabled={isSyncing}
          className="px-5 py-3 bg-[#c89d54] hover:bg-[#e6c885] disabled:opacity-60 text-[#030305] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-[0_0_25px_rgba(200,157,84,0.3)] self-start lg:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>
            {isSyncing
              ? 'Sincronizando com Fandom Wiki...'
              : '⚡ Sincronizar Agora (Sem Terminal)'}
          </span>
        </button>
      </div>

      {/* =====================================================================
          PAINEL DE STATUS DA VPS: POSTGRESQL + CRON JOB AUTOMÁTICO (SEM API KEY)
      ===================================================================== */}
      <div className="arch-box p-6 sm:p-7 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Storage Engine Status */}
          <div className="p-4 bg-[#050609] border border-[#c89d54]/35 flex items-start gap-3.5">
            <Database className="w-5 h-5 text-[#c89d54] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                BANCO DE DADOS ATIVO
              </span>
              <div className="font-display text-sm text-white uppercase mt-0.5">
                {dbConnected
                  ? 'PostgreSQL Conectado (Schema: dark_matter_atlas)'
                  : 'Cache Local JSON (Pronto p/ PostgreSQL na VPS)'}
              </div>
              <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                {dbConnected
                  ? 'Usando schema isolado no seu PostgreSQL sem interferir nos outros sistemas da VPS.'
                  : 'Basta definir DATABASE_URL no docker-compose.yml da VPS para usar seu PostgreSQL existente.'}
              </p>
            </div>
          </div>

          {/* Cron Job Status */}
          <div className="p-4 bg-[#050609] border border-emerald-400/35 flex items-start gap-3.5">
            <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 block">
                CRON JOB AUTOMÁTICO (ZERO API KEY)
              </span>
              <div className="font-display text-sm text-white uppercase mt-0.5">
                Ativo • Varredura a cada {cronIntervalHours}h
              </div>
              <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                O próprio container Node.js consulta a Fandom Wiki API sozinho, traduz novos enredos de episódios (T2:E9/E10) e grava no banco sem precisar rodar comandos manuais.
              </p>
            </div>
          </div>

          {/* Last Sync Timestamp */}
          <div className="p-4 bg-[#050609] border border-sky-400/35 flex items-start gap-3.5">
            <Server className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-300 block">
                ÚLTIMA VERIFICAÇÃO AUTOMÁTICA
              </span>
              <div className="font-mono text-xs font-bold text-white mt-0.5">
                {lastSyncAt
                  ? new Date(lastSyncAt).toLocaleString('pt-BR')
                  : 'Executando verificação inicial...'}
              </div>
              <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                Modo de persistência atual: <code className="text-[#e6c885]">{storageMode}</code> • {worlds.length} Mundos & {variants.length} Variantes.
              </p>
            </div>
          </div>
        </div>

        {/* Live Sync Execution Logs */}
        {syncLogs.length > 0 && (
          <div className="p-4 bg-[#040508] border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e6c885]">
                HISTÓRICO DO CRON JOB & SINCRONIZAÇÕES RECENTES ({syncLogs.length})
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                ● MONITORAMENTO AUTOMÁTICO ATIVO
              </span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {syncLogs.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-[#080a10] border border-white/[0.07] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.2 bg-[#c89d54]/20 text-[#e6c885] border border-[#c89d54]/40 font-mono text-[9px] uppercase">
                        {log.triggerSource}
                      </span>
                      <span className="font-bold text-white">{log.summary}</span>
                    </div>
                    {log.details && log.details.length > 0 && (
                      <div className="text-[11px] text-stone-400 mt-1">
                        {log.details.join(' • ')}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-stone-500 shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Podcast Rules & Lore Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PODCAST_RULES_AND_LORE.map((item, idx) => (
          <div
            key={idx}
            className="arch-box p-6 flex flex-col justify-between transition hover:border-[#c89d54]/70"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c89d54] block mb-2">
                {item.speaker}
              </span>
              <h3 className="font-display text-lg text-white uppercase tracking-wider mb-2.5 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                <RichText text={item.explanation} />
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-emerald-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                CÂNONE VERIFICADO
              </span>
              <span className="text-stone-500">DARK MATTER OFFICIAL PODCAST</span>
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================================
          DOCUMENTAÇÃO OFICIAL: COMO FUNCIONA A ATUALIZAÇÃO AUTOMÁTICA NA VPS
      ===================================================================== */}
      <div className="arch-box p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#c89d54]/25 pb-4">
          <div className="text-[10px] font-mono text-[#c89d54] uppercase tracking-[0.28em]">
            ARQUITETURA HÍBRIDA // CRON AUTOMÁTICO NA VPS + AUDITORIA PROFUNDA
          </div>
          <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-wider mt-1">
            Como Funciona a Atualização de Novos Episódios (Sem Comandos Manuais)
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-1.5 font-light leading-relaxed">
            Agora o sistema possui um <strong>servidor Node.js integrado com PostgreSQL e Cron Job</strong> dentro da própria imagem Docker. Você nunca precisa entrar via SSH na VPS para rodar comandos manuais:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#050609] border border-emerald-400/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 block mb-1">
              1. CRON JOB AUTOMÁTICO (A CADA 6H)
            </span>
            <h4 className="font-display text-sm text-white uppercase mb-1.5">
              Varredura & Tradução Sem API Key
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              O servidor verifica sozinho as páginas da Fandom Wiki para <strong>T2:E9 ("How to Build the Box")</strong> e <strong>T2:E10 ("No Quiet Life")</strong>. Assim que o enredo (`Plot`) sai na Wiki, ele traduz gratuitamente para português, libera o episódio no seletor e atualiza o arco dos personagens citados direto no PostgreSQL!
            </p>
          </div>

          <div className="p-4 bg-[#050609] border border-[#c89d54]/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#c89d54] block mb-1">
              2. BOTÃO WEB & CADASTRO DIRETO NO BANCO
            </span>
            <h4 className="font-display text-sm text-white uppercase mb-1.5">
              1 Clique no Navegador
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              Se você acabou de assistir ao episódio e não quer esperar o ciclo de 6h do Cron, basta clicar no botão dourado <strong>"⚡ Sincronizar Agora"</strong> no topo desta página ou adicionar uma nova porta no formulário abaixo — tudo fica salvo no seu <strong>PostgreSQL</strong> sem precisar recriar a imagem Docker.
            </p>
          </div>

          <div className="p-4 bg-[#050609] border border-sky-400/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-300 block mb-1">
              3. REVISÃO PROFUNDA COMIGO (OPCIONAL)
            </span>
            <h4 className="font-display text-sm text-white uppercase mb-1.5">
              Árvore de Divisões & Podcast
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              Para detalhes interpretativos profundos (como novos ramos complexos na Árvore de Divisões ou entrevistas em áudio do Podcast Oficial de Blake Crouch), você também pode me pedir a qualquer momento para fazer uma varredura completa e atualizar a imagem.
            </p>
          </div>
        </div>
      </div>

      {/* Collapsible On-Demand Database World Creator */}
      <div className="arch-box overflow-hidden">
        <button
          onClick={() => setShowUpdaterForm(!showUpdaterForm)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-white/[0.02] transition"
        >
          <div>
            <div className="text-[10px] font-mono text-[#c89d54] uppercase tracking-[0.25em] mb-1">
              INSERÇÃO MANUAL DIRETO NO BANCO DE DADOS ({storageMode})
            </div>
            <h3 className="font-display text-lg text-white uppercase tracking-wider">
              Adicionar Nova Porta / Realidade via Painel Web ({worlds.length} Mundos • {variants.length} Variantes)
            </h3>
          </div>
          <div className="p-2 bg-[#050609] text-[#e6c885] border border-[#c89d54]/40">
            {showUpdaterForm ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {showUpdaterForm && (
          <div className="p-6 border-t border-white/[0.08]">
            <form onSubmit={handleCreateWorld} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={worldCode}
                  onChange={(e) => setWorldCode(e.target.value)}
                  placeholder="WORLD 33"
                  className="px-3.5 py-2 text-xs font-mono bg-[#050609] border border-white/15 text-white focus:outline-none focus:border-[#c89d54]"
                />
                <input
                  type="text"
                  value={episodeInput}
                  onChange={(e) => setEpisodeInput(e.target.value)}
                  placeholder="T2:E9"
                  className="px-3.5 py-2 text-xs font-mono bg-[#050609] border border-white/15 text-white focus:outline-none focus:border-[#c89d54]"
                />
                <select
                  value={worldCategory}
                  onChange={(e) => setWorldCategory(e.target.value as World['category'])}
                  className="px-3.5 py-2 text-xs bg-[#050609] border border-white/15 text-white focus:outline-none focus:border-[#c89d54]"
                >
                  <option value="Hostile">Hostil</option>
                  <option value="Sanctuary">Santuário</option>
                  <option value="Utopian">Utopia</option>
                  <option value="Apocalyptic">Apocalíptico</option>
                </select>
              </div>
              <input
                type="text"
                required
                value={worldName}
                onChange={(e) => setWorldName(e.target.value)}
                placeholder="Nome do novo mundo..."
                className="w-full px-3.5 py-2 text-xs bg-[#050609] border border-white/15 text-white focus:outline-none focus:border-[#c89d54]"
              />
              <textarea
                rows={2}
                required
                value={worldDescription}
                onChange={(e) => setWorldDescription(e.target.value)}
                placeholder="Descrição do que aconteceu nesta realidade..."
                className="w-full px-3.5 py-2 text-xs bg-[#050609] border border-white/15 text-white focus:outline-none focus:border-[#c89d54]"
              />
              <div className="flex items-center justify-between">
                {savedNotice ? (
                  <span className="text-xs text-emerald-400 font-mono">
                    ✓ REALIDADE SALVA NO BANCO DE DADOS ({storageMode})!
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-stone-400">
                    Salva imediatamente no PostgreSQL (ou cache JSON local) para todos os usuários.
                  </span>
                )}
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#c89d54] hover:bg-[#e6c885] text-[#030305] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" />
                  Salvar no Banco
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
