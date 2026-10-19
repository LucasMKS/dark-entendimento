import React, { useState, useMemo } from 'react';
import { World, CharacterVariant } from '../data/multiverseData';
import {
  GitBranch,
  Sparkles,
  Users,
  Globe2,
  Eye,
  ArrowRight,
  MapPin,
  Compass,
  Filter
} from 'lucide-react';

interface QuantumConnectionsMapProps {
  worlds: World[];
  variants: CharacterVariant[];
  onSelectWorld: (worldId: string) => void;
  onSelectVariant: (variantId: string) => void;
}

export const QuantumConnectionsMap: React.FC<QuantumConnectionsMapProps> = ({
  worlds,
  variants,
  onSelectWorld,
  onSelectVariant,
}) => {
  const [focusedVariantId, setFocusedVariantId] = useState<string>('jason-1');
  const [focusedWorldId, setFocusedWorldId] = useState<string | null>(null);
  const [charGroupFilter, setCharGroupFilter] = useState<string>('ALL');

  const getWorld = (id: string) => worlds.find((w) => w.id === id);
  const getVariant = (id: string) => variants.find((v) => v.id === id);

  const activeVariant = getVariant(focusedVariantId);
  const activeWorld = focusedWorldId ? getWorld(focusedWorldId) : null;

  const filteredVariants = useMemo(() => {
    if (charGroupFilter === 'ALL') return variants;
    return variants.filter((v) => v.baseCharacter === charGroupFilter);
  }, [variants, charGroupFilter]);

  const handleFocusVariant = (vId: string) => {
    setFocusedWorldId(null);
    setFocusedVariantId(vId);
  };

  const getStatusDotColor = (status: CharacterVariant['status']) => {
    switch (status) {
      case 'Estabelecido em Paz':
      case 'No Santuário':
        return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]';
      case 'Morto':
        return 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]';
      case 'Preso (DARPA)':
        return 'bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.8)]';
      default:
        return 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]';
    }
  };

  return (
    <div className="space-y-10">
      {/* SECTION 1: MODERN QUANTUM NEXUS (INTERACTIVE CONNECTION MATRIX) */}
      <div className="rounded-[28px] glass-panel border border-indigo-500/20 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
        {/* Soft Indigo & Cyan Ambient Glows */}
        <div className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-indigo-600/15 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-24 w-[420px] h-[420px] rounded-full bg-cyan-500/12 blur-[110px]" />

        <div className="relative z-10 space-y-8">
          {/* Top Header & Quick Character Group Filter */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-white/[0.08] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-[11px] font-semibold uppercase tracking-widest mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Mapeamento Quântico Interativo • Apple TV+
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Quem Foi Para Onde no Multiverso?
              </h2>
              <p className="text-sm text-slate-300/90 mt-1.5 max-w-3xl">
                Selecione qualquer <strong>Personagem / Variante</strong> para visualizar sua rota cronológica passo a passo e acender todos os mundos conectados.
              </p>
            </div>

            {/* Group Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-2xl border border-white/[0.08]">
              <Filter className="w-3.5 h-3.5 text-indigo-400 ml-2 mr-1 hidden sm:block" />
              {[
                { id: 'ALL', label: 'Todos (21)' },
                { id: 'Jason Dessen', label: 'Jasons' },
                { id: 'Amanda Lucas', label: 'Amandas' },
                { id: 'Ryan Holder', label: 'Ryans' },
                { id: 'Leighton Vance', label: 'Leightons' },
                { id: 'Daniela & Charlie', label: 'Família Dessen' },
                { id: 'Laurel & Agentes', label: 'Santuário & Detetive' }
              ].map((grp) => (
                <button
                  key={grp.id}
                  onClick={() => setCharGroupFilter(grp.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    charGroupFilter === grp.id
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {grp.label}
                </button>
              ))}
            </div>
          </div>

          {/* ROW 1: CHARACTER PORTRAIT SELECTOR */}
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>1. Selecione um Viajante ou Variante ({filteredVariants.length} exibidos)</span>
              </div>
              {focusedWorldId && (
                <button
                  onClick={() => setFocusedWorldId(null)}
                  className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 text-xs font-semibold hover:bg-indigo-500/30 transition"
                >
                  Limpar filtro de mundo
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-7 gap-2.5">
              {filteredVariants.map((v) => {
                const isSelected = !focusedWorldId && focusedVariantId === v.id;
                const isVisitorOfFocusedWorld =
                  focusedWorldId &&
                  (activeWorld?.visitors.includes(v.id) ||
                    activeWorld?.residents.includes(v.id));

                const highlight = isSelected || isVisitorOfFocusedWorld;
                const currentW = getWorld(v.currentWorldId);

                return (
                  <button
                    key={v.id}
                    onClick={() => handleFocusVariant(v.id)}
                    className={`group relative flex items-center gap-3 p-2.5 rounded-2xl border text-left transition-all duration-200 ${
                      highlight
                        ? 'bg-gradient-to-br from-indigo-500/25 via-violet-500/15 to-cyan-500/10 border-indigo-400/80 shadow-lg shadow-indigo-500/15 scale-[1.02]'
                        : focusedWorldId
                        ? 'bg-slate-950/40 border-white/5 opacity-30 hover:opacity-80'
                        : 'bg-slate-950/60 border-white/[0.07] hover:border-indigo-400/40 hover:bg-slate-900/80 opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={v.avatarUrl}
                        alt={v.designation}
                        referrerPolicy="no-referrer"
                        className={`w-12 h-12 rounded-xl object-cover border transition ${
                          highlight
                            ? 'border-indigo-300 ring-2 ring-indigo-500/30'
                            : 'border-white/15 group-hover:border-white/30'
                        }`}
                      />
                      <span
                        className={`absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md text-[9px] font-extrabold tracking-tight shadow ${
                          highlight
                            ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950'
                            : 'bg-slate-900 text-slate-200 border border-white/20'
                        }`}
                      >
                        {v.badgeNumber}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full absolute -top-0.5 -left-0.5 ${getStatusDotColor(
                          v.status
                        )}`}
                        title={v.status}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate group-hover:text-indigo-200 transition">
                        {v.designation.split(' (')[0]}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {v.alias}
                      </div>
                      <div className="text-[10px] text-cyan-300/90 font-medium truncate mt-0.5 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 shrink-0 text-cyan-400" />
                        <span>{currentW ? currentW.code : v.currentWorldId}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE CHARACTER SPOTLIGHT + STEP-BY-STEP CHRONOLOGICAL ROUTE */}
          {!focusedWorldId && activeVariant && (
            <div className="rounded-3xl bg-gradient-to-br from-[#0e1528] via-[#0b1120] to-[#0e172a] border border-indigo-500/30 p-5 sm:p-7 shadow-2xl space-y-6">
              {/* Top Character Bio Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                  <div className="relative shrink-0">
                    <img
                      src={activeVariant.avatarUrl}
                      alt={activeVariant.designation}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-400 shadow-lg shadow-indigo-500/20"
                    />
                    <span className="absolute -bottom-1.5 -right-1.5 px-2.5 py-0.5 rounded-lg text-xs font-extrabold bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 shadow">
                      {activeVariant.badgeNumber}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        {activeVariant.designation}
                      </h3>
                      <span className="text-xs px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 font-semibold">
                        {activeVariant.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-200/95 max-w-3xl leading-relaxed">
                      {activeVariant.shortRole}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1.5 bg-slate-950/70 px-3 py-1 rounded-lg border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-indigo-400" />
                        <strong className="text-indigo-300">Origem:</strong>{' '}
                        <span className="text-white font-medium">
                          {getWorld(activeVariant.originWorldId)?.name}
                        </span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 bg-slate-950/70 px-3 py-1 rounded-lg border border-cyan-500/25">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <strong className="text-cyan-300">Onde está agora:</strong>{' '}
                        <span className="text-white font-semibold">
                          {getWorld(activeVariant.currentWorldId)?.name}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectVariant(activeVariant.id)}
                  className="shrink-0 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold text-xs transition-all flex items-center gap-2 self-start lg:self-center shadow-lg shadow-indigo-500/25"
                >
                  <Eye className="w-4 h-4" />
                  Abrir História Completa de {activeVariant.badgeNumber}
                </button>
              </div>

              {/* Chronological Step-by-Step Journey Ribbon */}
              <div className="pt-4 border-t border-white/[0.08]">
                <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  Rota Cronológica de {activeVariant.designation.split(' (')[0]} ({activeVariant.worldsVisited.length} mundos visitados em ordem):
                </div>

                <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
                  {activeVariant.worldsVisited.map((wId, idx) => {
                    const worldObj = getWorld(wId);
                    if (!worldObj) return null;
                    const isFirst = idx === 0;
                    const isLast = idx === activeVariant.worldsVisited.length - 1;
                    const isCurrentLoc = activeVariant.currentWorldId === wId;

                    return (
                      <React.Fragment key={`${wId}-${idx}`}>
                        <div
                          onClick={() => onSelectWorld(worldObj.id)}
                          className={`group cursor-pointer shrink-0 w-48 rounded-2xl p-2.5 border transition-all flex items-center gap-2.5 ${
                            isCurrentLoc
                              ? 'bg-emerald-950/40 border-emerald-400/60 hover:border-emerald-300 shadow-md shadow-emerald-500/10'
                              : isFirst
                              ? 'bg-indigo-950/40 border-indigo-400/50 hover:border-indigo-300'
                              : 'bg-slate-950/80 border-white/10 hover:border-cyan-400/50'
                          }`}
                        >
                          <img
                            src={worldObj.imageUrl}
                            alt={worldObj.name}
                            referrerPolicy="no-referrer"
                            className="w-11 h-11 rounded-xl object-cover shrink-0 border border-white/15"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1">
                              <span
                                className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                                  isCurrentLoc
                                    ? 'bg-emerald-400 text-slate-950'
                                    : isFirst
                                    ? 'bg-indigo-400 text-slate-950'
                                    : 'bg-white/10 text-cyan-300'
                                }`}
                              >
                                {isFirst ? '1º Origem' : isCurrentLoc ? `${idx + 1}º Atual` : `${idx + 1}º`}
                              </span>
                            </div>
                            <div className="text-xs font-bold text-white truncate mt-0.5 group-hover:text-cyan-300 transition">
                              {worldObj.name.split(' (')[0]}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {worldObj.code}
                            </div>
                          </div>
                        </div>

                        {!isLast && (
                          <ArrowRight className="w-4 h-4 text-indigo-400/60 shrink-0" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ROW 2: ALL WORLDS OVERVIEW GRID */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-cyan-400" />
                <span>2. Todos os {worlds.length} Mundos no Mapa (Os mundos iluminados fazem parte da jornada de {activeVariant?.designation.split(' (')[0]})</span>
              </span>
              <span className="text-[11px] text-indigo-300 font-medium">
                Clique em qualquer mundo para abrir o dossiê completo
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3.5">
              {worlds.map((w) => {
                const visitIndex = activeVariant
                  ? activeVariant.worldsVisited.indexOf(w.id)
                  : -1;
                const isOrigin = activeVariant?.originWorldId === w.id;
                const isCurrent = activeVariant?.currentWorldId === w.id;
                const isVisitedBySelectedVariant =
                  !focusedWorldId && visitIndex !== -1;
                const isFocusedWorld = focusedWorldId === w.id;

                const isLit = isVisitedBySelectedVariant || isFocusedWorld;

                return (
                  <div
                    key={w.id}
                    onClick={() => onSelectWorld(w.id)}
                    className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between relative ${
                      isLit
                        ? isCurrent
                          ? 'bg-slate-900/95 border-emerald-400/80 shadow-lg shadow-emerald-500/15 scale-[1.02]'
                          : 'bg-slate-900/95 border-indigo-400/80 shadow-lg shadow-indigo-500/15 scale-[1.02]'
                        : 'bg-slate-950/50 border-white/[0.06] opacity-40 hover:opacity-95 hover:border-white/20'
                    }`}
                  >
                    {/* World Cover Image */}
                    <div className="relative h-28 w-full overflow-hidden bg-slate-950">
                      <img
                        src={w.imageUrl}
                        alt={w.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />

                      {/* World Number Badge */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-950/85 text-slate-100 backdrop-blur-md border border-white/15">
                        {w.code}
                      </span>

                      {/* Step Order Badge when Variant is Selected */}
                      {isVisitedBySelectedVariant && (
                        <span
                          className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow ${
                            isCurrent
                              ? 'bg-emerald-400 text-slate-950'
                              : isOrigin
                              ? 'bg-indigo-400 text-slate-950'
                              : 'bg-cyan-400 text-slate-950'
                          }`}
                        >
                          {isOrigin && visitIndex === 0
                            ? '1º Origem'
                            : isCurrent
                            ? `${visitIndex + 1}º Atual`
                            : `${visitIndex + 1}º Passo`}
                        </span>
                      )}
                    </div>

                    {/* World Title */}
                    <div className="p-3">
                      <div className="text-xs font-bold text-white leading-snug line-clamp-2 group-hover:text-indigo-300 transition">
                        {w.name}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1.5 flex items-center justify-between">
                        <span>{w.visitors.length} viajantes</span>
                        <span className="text-indigo-400 group-hover:text-cyan-300 font-semibold transition">
                          Dossiê →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: AUTO-EXPLANATORY VISUAL BRANCHING TREE */}
      <div className="rounded-[28px] glass-panel border border-white/[0.08] p-6 sm:p-8 lg:p-10 space-y-6">
        <div className="border-b border-white/[0.08] pb-4">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-1">
            <GitBranch className="w-4 h-4" />
            Guia Rápido de Bifurcações
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Árvore de Divisões (De Onde Surgiu Cada Variante?)
          </h3>
          <p className="text-sm text-slate-300/90 mt-1">
            Entenda visualmente os 3 eventos-chave que criaram as ramificações de Jason, Amanda e da família Dessen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* BRANCH 1 */}
          <div className="glass-card border border-indigo-500/25 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                1. A Divisão Há 15 Anos (Antes da Caixa)
              </span>
              <h4 className="text-lg font-bold text-white mt-3 mb-2">
                Reality 1 vs. Reality 2
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Quando Daniela engravidou há 15 anos, a decisão de Jason criou os dois mundos principais da série:
              </p>

              <div className="space-y-3">
                <div
                  onClick={() => onSelectVariant('jason-1')}
                  className="cursor-pointer p-3.5 rounded-xl bg-slate-950/85 border border-indigo-500/35 hover:border-indigo-400 flex items-center gap-3 transition"
                >
                  <img
                    src={getVariant('jason-1')?.avatarUrl}
                    alt="Jason 1"
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-indigo-400 shrink-0"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Jason 1 (Reality 01 → Mundo Low-Tech)</div>
                    <div className="text-[11px] text-slate-400">
                      Casou com Daniela, recuperou a família e hoje vive no Mundo Low-Tech (World 30).
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => onSelectVariant('jason-2')}
                  className="cursor-pointer p-3.5 rounded-xl bg-slate-950/85 border border-cyan-500/35 hover:border-cyan-400 flex items-center gap-3 transition"
                >
                  <img
                    src={getVariant('jason-2')?.avatarUrl}
                    alt="Jason 2"
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-cyan-400 shrink-0"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Jason 2 (Reality 02 → A Pirâmide)</div>
                    <div className="text-[11px] text-slate-400">
                      Criou a Caixa na Velocity Labs, sequestrou o J1 e na T2 atua na Pirâmide.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.08] text-[11px] text-slate-400">
              💡 Já no Mundo 27, o gêmeo Max sobreviveu ao parto (lar do <strong>Jason 5</strong>).
            </div>
          </div>

          {/* BRANCH 2 */}
          <div className="glass-card border border-violet-500/25 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-violet-500/20 text-violet-300 border border-violet-400/30">
                2. O Acidente do Galho (T2:E8 & Podcast)
              </span>
              <h4 className="text-lg font-bold text-white mt-3 mb-2">
                Jason 13 vs. Jason 34 & Amanda 7
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Quando um galho de árvore empala Amanda dentro da Caixa, o destino se divide em dois caminhos opostos:
              </p>

              <div className="space-y-3">
                <div
                  onClick={() => onSelectVariant('jason-13')}
                  className="cursor-pointer p-3.5 rounded-xl bg-slate-950/85 border border-rose-500/35 hover:border-rose-400 flex items-center gap-3 transition"
                >
                  <span className="w-11 h-11 rounded-full bg-rose-500/25 border border-rose-400 text-rose-200 font-bold text-xs flex items-center justify-center shrink-0">
                    J13
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">
                      Caminho A: Jason 13 ("Scar Jason")
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Amanda morre no acidente. Consumido pelo ódio, ele é preso pela DARPA.
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => onSelectVariant('jason-34')}
                  className="cursor-pointer p-3.5 rounded-xl bg-slate-950/85 border border-emerald-500/35 hover:border-emerald-400 flex items-center gap-3 transition"
                >
                  <span className="w-11 h-11 rounded-full bg-emerald-500/25 border border-emerald-400 text-emerald-200 font-bold text-xs flex items-center justify-center shrink-0">
                    J34
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">
                      Caminho B: Jason 34 + Amanda 7
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Ele leva <strong>Amanda 7</strong> até a enfermeira <strong>Laurel</strong>, que salva sua vida!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.08] text-[11px] text-emerald-300">
              ✓ Confirmado por Blake Crouch no Podcast Oficial do Episódio 8.
            </div>
          </div>

          {/* BRANCH 3 */}
          <div className="glass-card border border-cyan-500/25 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                3. Fuga da Família & Outros Jasons (T2:E1–E5)
              </span>
              <h4 className="text-lg font-bold text-white mt-3 mb-2">
                Fuga para o Low-Tech & Casa de Ellie
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                No T2:E1, Daniela mata um Jason invasor no Mundo 29 e a família foge para o <strong>Mundo Low-Tech</strong>. Enquanto isso, outros Jasons encontram paz:
              </p>

              <div className="space-y-3">
                <div
                  onClick={() => onSelectVariant('jason-24')}
                  className="cursor-pointer p-3.5 rounded-xl bg-slate-950/85 border border-indigo-500/35 hover:border-indigo-400 flex items-center gap-3 transition"
                >
                  <span className="w-11 h-11 rounded-full bg-indigo-500/25 border border-indigo-400 text-indigo-200 font-bold text-xs flex items-center justify-center shrink-0">
                    J24
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">
                      Jason 24 (O Marceneiro — T2:E5)
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Vai para o Mundo 31 onde sua mãe <strong>Ellie</strong> está viva e conhece <strong>Maria</strong>.
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => onSelectVariant('jason-30')}
                  className="cursor-pointer p-3.5 rounded-xl bg-slate-950/85 border border-emerald-500/35 hover:border-emerald-400 flex items-center gap-3 transition"
                >
                  <span className="w-11 h-11 rounded-full bg-emerald-500/25 border border-emerald-400 text-emerald-200 font-bold text-[10px] flex items-center justify-center shrink-0">
                    J30/31
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">
                      Jason 30 & Jason 31
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Acolhidos como irmãos por Jason 24 e Ellie no Mundo 31.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.08] text-[11px] text-slate-400">
              💡 Já <strong>Charlie 1</strong> saiu do Mundo Low-Tech pela Caixa e chegou ao Santuário de Laurel (World 33).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
