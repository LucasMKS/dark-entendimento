import React, { useState } from 'react';
import { PODCAST_RULES_AND_LORE, World, CharacterVariant } from '../data/multiverseData';
import { RichText } from './RichText';
import { Plus, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [worldCode, setWorldCode] = useState('WORLD 33');
  const [worldCategory, setWorldCategory] = useState<World['category']>('Hostile');
  const [worldDescription, setWorldDescription] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleCreateWorld = (e: React.FormEvent) => {
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
      atmosphere: 'Simulado na sessão atual do navegador.',
      boxLocation: 'Coordenada de Chicago',
      description: worldDescription,
      visitors: ['jason-1'],
      residents: [],
      sources: [
        {
          type: 'EPISODE_CANON',
          label: episodeInput,
          detail: 'Adicionado manualmente na sessão local.'
        }
      ]
    };

    onAddWorld(newWorld);
    setWorldName('');
    setWorldDescription('');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3500);
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
              ARQUIVO CANÔNICO // THE OFFICIAL APPLE TV+ PODCAST & BLAKE CROUCH
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-[0.14em] mt-0.5">
              Leis da Caixa & Regras do Multiverso
            </h2>
          </div>
        </div>

        <div className="px-4 py-2 bg-[#07080c] border border-[#c89d54]/30 text-xs font-mono text-stone-300">
          <span className="text-[#c89d54] font-bold">{worlds.length}</span> Mundos •{' '}
          <span className="text-[#c89d54] font-bold">{variants.length}</span> Variantes Catalogadas
        </div>
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

            <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-stone-400">
              <span>FONTE OFICIAL:</span>
              <span className="text-[#e6c885]">The Official Apple TV+ Podcast</span>
            </div>
          </div>
        ))}
      </div>

      {/* Optional Quick Session Sandbox */}
      <div className="arch-box p-6">
        <button
          onClick={() => setShowUpdaterForm((prev) => !prev)}
          className="w-full flex items-center justify-between text-left"
        >
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c89d54] block">
              SANDBOX DE TESTE RÁPIDO NA SESSÃO
            </span>
            <h3 className="font-display text-lg text-white uppercase tracking-wider mt-0.5">
              Simular Novo Mundo Manualmente (Prévia Visual)
            </h3>
          </div>
          <div className="p-2 border border-[#c89d54]/40 text-[#c89d54]">
            {showUpdaterForm ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showUpdaterForm && (
          <form onSubmit={handleCreateWorld} className="mt-5 pt-5 border-t border-white/10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                  Episódio
                </label>
                <input
                  type="text"
                  value={episodeInput}
                  onChange={(e) => setEpisodeInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#050609] border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-[#c89d54]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                  Código do Mundo
                </label>
                <input
                  type="text"
                  value={worldCode}
                  onChange={(e) => setWorldCode(e.target.value)}
                  className="w-full px-3 py-2 bg-[#050609] border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-[#c89d54]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                  Categoria
                </label>
                <select
                  value={worldCategory}
                  onChange={(e) => setWorldCategory(e.target.value as World['category'])}
                  className="w-full px-3 py-2 bg-[#050609] border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-[#c89d54]"
                >
                  <option value="Hostile">Hostil</option>
                  <option value="Apocalyptic">Apocalíptico</option>
                  <option value="Utopian">Utópico / Avançado</option>
                  <option value="Sanctuary">Santuário</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                Nome da Realidade
              </label>
              <input
                type="text"
                value={worldName}
                onChange={(e) => setWorldName(e.target.value)}
                placeholder="Ex: Mundo da Cúpula de Vidro (World 33)"
                className="w-full px-3 py-2 bg-[#050609] border border-white/15 text-xs text-white focus:outline-none focus:border-[#c89d54]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                Descrição Canônica
              </label>
              <textarea
                rows={3}
                value={worldDescription}
                onChange={(e) => setWorldDescription(e.target.value)}
                placeholder="Descreva o que acontece neste mundo..."
                className="w-full px-3 py-2 bg-[#050609] border border-white/15 text-xs text-white focus:outline-none focus:border-[#c89d54]"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#c89d54] hover:bg-[#e6c885] text-[#030305] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar à Sessão</span>
              </button>

              {savedNotice && (
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Mundo adicionado na sessão!
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
