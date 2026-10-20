import React, { useState } from 'react';
import { World, CharacterVariant, BoxJourney } from '../data/multiverseData';
import { RichText } from './RichText';
import { ArrowRight, Filter, Sparkles } from 'lucide-react';

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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-[#c89d54]/25 pb-5">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-center justify-center w-12 h-12 border border-[#c89d54]/40 bg-[#07080c] text-[#c89d54] font-display text-sm">
            <span>IV</span>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c89d54]">
              CRONOLOGIA DE SUPERPOSIÇÃO • AS PORTAS DO CORREDOR
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-[0.14em] mt-0.5">
              Linha do Tempo de Saltos na Caixa
            </h2>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-[#c89d54] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedTravelerId}
              onChange={(e) => setSelectedTravelerId(e.target.value)}
              className="w-full sm:w-auto pl-9 pr-8 py-2 text-xs font-mono bg-[#050609] border border-[#c89d54]/35 text-stone-100 focus:outline-none focus:border-[#c89d54]"
            >
              <option value="ALL">TODOS OS VIAJANTES</option>
              {variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.badgeNumber} — {v.designation}
                </option>
              ))}
            </select>
          </div>

          <div className="inline-flex bg-[#050609] p-1 border border-[#c89d54]/30 self-start sm:self-auto">
            {(['ALL', 1, 2] as const).map((s) => (
              <button
                key={String(s)}
                onClick={() => setSeasonFilter(s)}
                className={`px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider transition ${
                  seasonFilter === s
                    ? 'bg-[#c89d54] text-[#030305] font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {s === 'ALL' ? 'TODAS' : `TEMP ${s}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Architectural Golden Thread Timeline */}
      <div className="relative pl-8 sm:pl-12 space-y-6 before:absolute before:left-3.5 sm:before:left-5 before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-[#c89d54] before:via-sky-400/60 before:to-emerald-400/70">
        {filteredJourneys.map((journey) => {
          const fromWorld = getWorld(journey.fromWorldId);
          const toWorld = getWorld(journey.toWorldId);

          return (
            <div key={journey.id} className="relative">
              <div className="absolute -left-8 sm:-left-12 top-6 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#050609] border border-[#c89d54] text-[#e6c885] font-mono font-bold text-xs flex items-center justify-center shadow-[0_0_15px_rgba(200,157,84,0.35)]">
                {journey.order}
              </div>

              <div className="arch-box p-4 sm:p-6 transition-all hover:border-[#c89d54]/70">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 bg-[#c89d54] text-[#030305]">
                      SALTO #{String(journey.order).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 bg-white/[0.04] text-stone-300 border border-white/10">
                      {journey.episode}
                    </span>
                  </div>

                  {journey.ampoulesRemaining !== undefined && (
                    <span className="text-[10px] font-mono text-sky-300 bg-sky-500/10 px-2.5 py-0.5 border border-sky-400/30">
                      AMPOLAS RESTANTES: {journey.ampoulesRemaining}
                    </span>
                  )}
                </div>

                {/* Origin -> Destination Portal Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center mb-4">
                  <div
                    onClick={() => fromWorld && onSelectWorld(fromWorld.id)}
                    className="md:col-span-5 cursor-pointer p-3 bg-[#050609] border border-white/10 hover:border-[#c89d54] flex items-center gap-3.5 transition group"
                  >
                    {fromWorld && (
                      <img
                        src={fromWorld.imageUrl}
                        alt={fromWorld.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#c89d54]"
                      />
                    )}
                    <div className="truncate">
                      <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#c89d54] block">
                        ORIGEM DO SALTO ({fromWorld?.code})
                      </span>
                      <div className="font-display text-sm text-white uppercase tracking-wider group-hover:text-[#e6c885] truncate">
                        {fromWorld ? fromWorld.name : journey.fromWorldId}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-1 flex justify-center py-1 md:py-0">
                    <div className="w-8 h-8 rounded-full bg-[#141008] border border-[#c89d54]/60 text-[#e6c885] flex items-center justify-center rotate-90 md:rotate-0 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div
                    onClick={() => toWorld && onSelectWorld(toWorld.id)}
                    className="md:col-span-5 cursor-pointer p-3 bg-[#050609] border border-sky-500/30 hover:border-sky-400 flex items-center gap-3.5 transition group"
                  >
                    {toWorld && (
                      <img
                        src={toWorld.imageUrl}
                        alt={toWorld.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover shrink-0 border border-sky-400"
                      />
                    )}
                    <div className="truncate">
                      <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-sky-300 block">
                        PORTA ABERTA EM ({toWorld?.code})
                      </span>
                      <div className="font-display text-sm text-white uppercase tracking-wider group-hover:text-sky-300 truncate">
                        {toWorld ? toWorld.name : journey.toWorldId}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trigger & Outcome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-4">
                  <div className="p-3.5 bg-[#050609] border border-[#c89d54]/20">
                    <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#e6c885] block mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#c89d54]" />
                      SINTONIA MENTAL / SUBCONSCIENTE:
                    </span>
                    <p className="text-stone-300 leading-relaxed font-light">
                      <RichText text={journey.subconsciousTrigger} />
                    </p>
                  </div>
                  <div className="p-3.5 bg-[#050609] border border-emerald-500/20">
                    <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-emerald-300 block mb-1">
                      DESFECHO NA REALIDADE:
                    </span>
                    <p className="text-stone-300 leading-relaxed font-light">
                      <RichText text={journey.outcome} />
                    </p>
                  </div>
                </div>

                {/* Travelers */}
                <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mr-1">
                    VIAJANTES:
                  </span>
                  {journey.travelers.map((tId) => {
                    const v = getVariant(tId);
                    if (!v) return null;
                    return (
                      <button
                        key={tId}
                        onClick={() => onSelectVariant(tId)}
                        className="pl-1.5 pr-3 py-1 bg-[#050609] hover:bg-[#c89d54] hover:text-[#030305] text-stone-200 border border-[#c89d54]/40 flex items-center gap-2 text-xs font-mono transition"
                      >
                        <img
                          src={v.avatarUrl}
                          alt={v.designation}
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-bold">{v.badgeNumber}</span>
                        <span>• {v.designation.split(' (')[0]}</span>
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
