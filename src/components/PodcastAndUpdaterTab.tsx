import React, { useState } from 'react';
import { PODCAST_RULES_AND_LORE, World, CharacterVariant } from '../data/multiverseData';
import {
  Radio,
  Plus,
  CheckCircle2,
  Terminal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PodcastAndUpdaterTabProps {
  worlds: World[];
  variants: CharacterVariant[];
  onAddWorld: (newWorld: World) => void;
  onAddVariant: (newVariant: CharacterVariant) => void;
}

export const PodcastAndUpdaterTab: React.FC<PodcastAndUpdaterTabProps> = ({
  worlds,
  variants,
  onAddWorld,
}) => {
  const [showUpdaterForm, setShowUpdaterForm] = useState(false);
  const [episodeInput, setEpisodeInput] = useState('T2:E9');
  const [worldName, setWorldName] = useState('');
  const [worldCode, setWorldCode] = useState('WORLD 34');
  const [worldCategory, setWorldCategory] = useState<World['category']>('Hostile');
  const [worldDescription, setWorldDescription] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleCreateWorld = (e: React.FormEvent) => {
    e.preventDefault();
    if (!worldName.trim() || !worldDescription.trim()) return;

    const newWorld: World = {
      id: `world-custom-${Date.now()}`,
      code: worldCode || 'WORLD 34',
      numberLabel: '34',
      name: worldName,
      shortHook: worldDescription.slice(0, 110) + '...',
      officialOrFanName: worldName,
      season: 2,
      episodes: [episodeInput],
      category: worldCategory,
      habitability: 'Habitável',
      imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/2/21/Dark_Matter_S2E09.jpg/revision/latest?cb=20261016143558',
      themeColor: '#6366f1',
      atmosphere: 'Catalogado via atualizador de episódio.',
      boxLocation: 'Coordenada de Chicago',
      description: worldDescription,
      visitors: ['jason-1'],
      residents: [],
      sources: [
        {
          type: 'EPISODE_CANON',
          label: episodeInput,
          detail: 'Adicionado via Atualizador de Episódio.'
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
      <div className="glass-panel border border-indigo-500/25 rounded-[28px] p-6 sm:p-8 lg:p-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold mb-3">
          <Radio className="w-3.5 h-3.5" />
          Dark Matter: The Official Podcast (Apple TV+)
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Explicações Oficiais de Blake Crouch
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-3xl">
          Respostas diretas do criador da série sobre a numeração das variantes (Jason 13, 24, 30, 34, Amanda 7) e os segredos da Caixa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {PODCAST_RULES_AND_LORE.map((item, idx) => (
            <div
              key={idx}
              className="glass-card border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-indigo-300 block mb-1.5">
                  {item.speaker}
                </span>
                <h3 className="text-lg font-bold text-white mb-2.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.explanation}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Confirmado no Podcast Oficial
                </span>
                <span className="text-slate-500">Apple TV+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collapsible On-Demand Updater */}
      <div className="glass-panel border border-white/[0.08] rounded-[28px] overflow-hidden">
        <button
          onClick={() => setShowUpdaterForm(!showUpdaterForm)}
          className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-white/[0.03] transition"
        >
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
              Atualização Semanal Sob Demanda (1x por Novo Episódio)
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Sincronizar Novo Episódio ({worlds.length} mundos • {variants.length} variantes)
            </h3>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 text-slate-300 border border-white/10">
            {showUpdaterForm ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {showUpdaterForm && (
          <div className="p-6 sm:p-8 border-t border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-indigo-500/25">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 mb-2">
                  <Terminal className="w-4 h-4" />
                  Sincronizador de Episódio (Sem Custo Recorrente)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Conecta na API da Fandom Wiki da Apple TV+ (<code className="text-cyan-300">Special:AllPages</code>) para buscar novas páginas e fotos oficiais:
                </p>
                <code className="block text-xs font-mono bg-slate-900 text-cyan-300 p-3.5 rounded-xl border border-white/10">
                  npm.cmd run sync-episode -- --season=2 --episode=9
                </code>
              </div>
            </div>

            <form onSubmit={handleCreateWorld} className="lg:col-span-7 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={worldCode}
                  onChange={(e) => setWorldCode(e.target.value)}
                  placeholder="WORLD 34"
                  className="rounded-xl px-3.5 py-2.5 text-xs bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-indigo-400"
                />
                <input
                  type="text"
                  value={episodeInput}
                  onChange={(e) => setEpisodeInput(e.target.value)}
                  placeholder="T2:E9"
                  className="rounded-xl px-3.5 py-2.5 text-xs bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-indigo-400"
                />
                <select
                  value={worldCategory}
                  onChange={(e) => setWorldCategory(e.target.value as World['category'])}
                  className="rounded-xl px-3.5 py-2.5 text-xs bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-indigo-400"
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
                className="w-full rounded-xl px-3.5 py-2.5 text-xs bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-indigo-400"
              />
              <textarea
                rows={2}
                required
                value={worldDescription}
                onChange={(e) => setWorldDescription(e.target.value)}
                placeholder="Descrição curta do que aconteceu..."
                className="w-full rounded-xl px-3.5 py-2.5 text-xs bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-indigo-400"
              />
              <div className="flex items-center justify-between">
                {savedNotice ? (
                  <span className="text-xs text-emerald-400 font-bold">✓ Mundo adicionado!</span>
                ) : (
                  <span />
                )}
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-500/25 transition"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Mundo
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
