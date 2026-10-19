import React, { useState } from 'react';
import { World, CharacterVariant, BoxJourney } from '../data/multiverseData';
import { ArrowRight, Filter, Compass } from 'lucide-react';

interface MultiverseGraphProps {
  worlds: World[];
  variants: CharacterVariant[];
  journeys: BoxJourney[];
  onSelectWorld: (worldId: string) => void;
  onSelectVariant: (variantId: string) => void;
}

export const MultiverseGraph: React.FC<MultiverseGraphProps> = ({
  worlds,
  variants,
  journeys,
  onSelectWorld,
  onSelectVariant,
}) => {
  const [selectedTravelerId, setSelectedTravelerId] = useState<string>('ALL');
  const [seasonFilter, setSeasonFilter] = useState<'ALL' | 1 | 2>('ALL');

  const getWorld = (id: string) => worlds.find((w) => w.id === id);
  const getVariant = (id: string) => variants.find((v) => v.id === id);

  const filteredJourneys = journeys.filter((j) => {
    const matchesTraveler =
      selectedTravelerId === 'ALL' || j.travelers.includes(selectedTravelerId);
    const matchesSeason = seasonFilter === 'ALL' || j.season === seasonFilter;
    return matchesTraveler && matchesSeason;
  });

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="glass-panel border border-indigo-500/20 rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-1">
            <Compass className="w-3.5 h-3.5" />
            Navegação pelo Corredor Quântico
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Linha do Tempo de Saltos na Caixa
          </h2>
          <p className="text-sm text-slate-300/90 mt-1">
            Veja visualmente de qual mundo para qual mundo cada porta abriu e o estado mental que sintonizou a Caixa.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Filter className="w-3.5 h-3.5 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedTravelerId}
              onChange={(e) => setSelectedTravelerId(e.target.value)}
              className="pl-9 pr-8 py-2 rounded-xl text-xs font-semibold bg-slate-950/90 border border-white/15 text-white focus:outline-none focus:border-indigo-400 transition"
            >
              <option value="ALL">Todos os Viajantes</option>
              {variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.designation}
                </option>
              ))}
            </select>
          </div>

          <div className="inline-flex rounded-xl bg-slate-950/90 p-1 border border-white/10">
            {(['ALL', 1, 2] as const).map((s) => (
              <button
                key={String(s)}
                onClick={() => setSeasonFilter(s)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  seasonFilter === s
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s === 'ALL' ? 'Todas' : `Temp ${s}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Timeline with World Thumbnails & Traveler Avatars */}
      <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-2.5 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-cyan-400 before:to-emerald-400">
        {filteredJourneys.map((journey) => {
          const fromWorld = getWorld(journey.fromWorldId);
          const toWorld = getWorld(journey.toWorldId);

          return (
            <div key={journey.id} className="relative">
              {/* Step Number Badge */}
              <div className="absolute -left-6 sm:-left-10 top-6 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-extrabold text-xs flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-white/20">
                {journey.order}
              </div>

              <div className="glass-card border border-white/[0.08] hover:border-indigo-400/50 rounded-3xl p-5 sm:p-6 transition-all">
                {/* Top Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    {journey.episode}
                  </span>

                  {journey.ampoulesRemaining !== undefined && (
                    <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/15 px-3 py-1 rounded-full border border-cyan-500/30">
                      🧪 {journey.ampoulesRemaining} ampolas restantes
                    </span>
                  )}
                </div>

                {/* Visual World-to-World Cards with Images */}
                <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center mb-4">
                  {/* Origin World */}
                  <div
                    onClick={() => fromWorld && onSelectWorld(fromWorld.id)}
                    className="md:col-span-5 cursor-pointer p-3 rounded-2xl bg-slate-950/85 border border-white/10 hover:border-indigo-400 flex items-center gap-3 transition group"
                  >
                    {fromWorld && (
                      <img
                        src={fromWorld.imageUrl}
                        alt={fromWorld.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-12 rounded-xl object-cover shrink-0 border border-white/10"
                      />
                    )}
                    <div className="truncate">
                      <span className="text-[10px] font-bold uppercase text-indigo-300 block">
                        Saiu de ({fromWorld?.code})
                      </span>
                      <div className="text-sm font-bold text-white group-hover:text-indigo-200 truncate">
                        {fromWorld ? fromWorld.name : journey.fromWorldId}
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="md:col-span-1 flex justify-center">
                    <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Destination World */}
                  <div
                    onClick={() => toWorld && onSelectWorld(toWorld.id)}
                    className="md:col-span-5 cursor-pointer p-3 rounded-2xl bg-slate-950/85 border border-cyan-500/30 hover:border-cyan-400 flex items-center gap-3 transition group"
                  >
                    {toWorld && (
                      <img
                        src={toWorld.imageUrl}
                        alt={toWorld.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-12 rounded-xl object-cover shrink-0 border border-white/10"
                      />
                    )}
                    <div className="truncate">
                      <span className="text-[10px] font-bold uppercase text-cyan-400 block">
                        Abriu Porta em ({toWorld?.code})
                      </span>
                      <div className="text-sm font-bold text-white group-hover:text-cyan-300 truncate">
                        {toWorld ? toWorld.name : journey.toWorldId}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trigger & Outcome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm mb-4">
                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/[0.06]">
                    <span className="text-[11px] font-bold uppercase text-indigo-300 block mb-1">
                      O Que Pensavam ao Abrir a Porta:
                    </span>
                    <p className="text-slate-200 leading-relaxed">
                      {journey.subconsciousTrigger}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/[0.06]">
                    <span className="text-[11px] font-bold uppercase text-emerald-300 block mb-1">
                      O Que Aconteceu:
                    </span>
                    <p className="text-slate-200 leading-relaxed">{journey.outcome}</p>
                  </div>
                </div>

                {/* Travelers Avatars */}
                <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 mr-1">Quem atravessou:</span>
                  {journey.travelers.map((tId) => {
                    const v = getVariant(tId);
                    if (!v) return null;
                    return (
                      <button
                        key={tId}
                        onClick={() => onSelectVariant(tId)}
                        className="pl-1.5 pr-3 py-1 rounded-full bg-slate-950 hover:bg-indigo-500 hover:text-white text-slate-200 border border-white/15 flex items-center gap-2 text-xs font-semibold transition"
                      >
                        <img
                          src={v.avatarUrl}
                          alt={v.designation}
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span>{v.badgeNumber} • {v.designation.split(' (')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
