import React, { useState, useMemo } from 'react';
import { World, CharacterVariant } from '../data/multiverseData';
import { DragScrollContainer } from './DragScrollContainer';
import { RichText } from './RichText';
import {
  GitBranch,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Network,
  Hand
} from 'lucide-react';

interface QuantumConnectionsMapProps {
  worlds: World[];
  variants: CharacterVariant[];
  selectedVariantId: string | null;
  selectedWorldId: string | null;
  onSelectWorld: (worldId: string) => void;
  onSelectVariant: (variantId: string) => void;
}

export const QuantumConnectionsMap: React.FC<QuantumConnectionsMapProps> = ({
  worlds,
  variants,
  selectedVariantId,
  onSelectWorld,
  onSelectVariant,
}) => {
  const [stageMode, setStageMode] = useState<'WEB' | 'TREE'>('WEB');

  // Orbital Hub State: either a Variant is at the center of the wheel, or a World is at the center
  const [centerMode, setCenterMode] = useState<'VARIANT' | 'WORLD'>('VARIANT');
  const [focusedVariantId, setFocusedVariantId] = useState<string>(selectedVariantId || 'jason-1');
  const [focusedWorldId, setFocusedWorldId] = useState<string>('world-prime-1');
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [lineageFilter, setLineageFilter] = useState<string>('ALL');

  // Mobile Web tab & door drawer states
  const [mobileWebTab, setMobileWebTab] = useState<'JOURNEY' | 'WHEEL'>('JOURNEY');
  const [showAllWorldsMobile, setShowAllWorldsMobile] = useState<boolean>(false);

  // Genealogical Tree Family Selector
  const [treeFamily, setTreeFamily] = useState<'JASON' | 'AMANDA' | 'RYAN' | 'LEIGHTON' | 'BLAIR' | 'MACNAMARA'>('JASON');

  const getWorld = (id: string) => worlds.find((w) => w.id === id);
  const getVariant = (id: string) => variants.find((v) => v.id === id);

  const activeVariant = getVariant(focusedVariantId) || variants[0];
  const activeCenterWorld = getWorld(focusedWorldId) || worlds[0];

  const deceasedCount = useMemo(
    () => variants.filter((v) => v.status === 'Morto').length,
    [variants]
  );

  const displayedVariants = useMemo(() => {
    if (lineageFilter === 'ALL') return variants;
    if (lineageFilter === 'DECEASED') return variants.filter((v) => v.status === 'Morto');
    return variants.filter((v) => v.baseCharacter === lineageFilter);
  }, [variants, lineageFilter]);

  const handleSelectCharacter = (vId: string) => {
    setCenterMode('VARIANT');
    setFocusedVariantId(vId);
    setActiveStepIndex(null);
    if (typeof window !== 'undefined' && window.innerWidth >= 1280) {
      onSelectVariant(vId);
    }
  };

  const handleCycleVariant = (direction: 'PREV' | 'NEXT') => {
    const list = displayedVariants.length > 0 ? displayedVariants : variants;
    const currentIdx = list.findIndex((v) => v.id === activeVariant?.id);
    const nextIdx =
      direction === 'NEXT'
        ? (currentIdx + 1) % list.length
        : (currentIdx - 1 + list.length) % list.length;
    handleSelectCharacter(list[nextIdx].id);
  };

  const handleSelectWorldOnWheel = (wId: string) => {
    onSelectWorld(wId);
  };

  const handleCenterOnWorld = (wId: string) => {
    setCenterMode('WORLD');
    setFocusedWorldId(wId);
    if (typeof window !== 'undefined' && window.innerWidth >= 1280) {
      onSelectWorld(wId);
    }
  };

  const handleStepNavigation = (direction: 'PREV' | 'NEXT') => {
    if (!activeVariant) return;
    const total = activeVariant.worldsVisited.length;
    if (total === 0) return;

    let nextIdx = 0;
    if (activeStepIndex === null) {
      nextIdx = direction === 'NEXT' ? 0 : total - 1;
    } else {
      nextIdx =
        direction === 'NEXT'
          ? (activeStepIndex + 1) % total
          : (activeStepIndex - 1 + total) % total;
    }
    setActiveStepIndex(nextIdx);
    const targetWorldId = activeVariant.worldsVisited[nextIdx];
    if (targetWorldId) {
      onSelectWorld(targetWorldId);
    }
  };

  // Compute deterministic radial coordinates in percentage (0..100) for the Orbital Wheel
  const orbitalWorlds = useMemo(() => {
    const count = worlds.length;
    return worlds.map((w, i) => {
      const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
      const rx = 41.5;
      const ry = 39.5;
      const x = 50 + rx * Math.cos(angle);
      const y = 50 + ry * Math.sin(angle);
      return { world: w, x, y, angle };
    });
  }, [worlds]);

  const orbitalWorldVisitors = useMemo(() => {
    if (!activeCenterWorld) return [];
    const connectedIds = Array.from(
      new Set([...activeCenterWorld.visitors, ...activeCenterWorld.residents])
    );
    const list = connectedIds.map((id) => getVariant(id)).filter(Boolean) as CharacterVariant[];
    const count = Math.max(list.length, 1);
    return list.map((v, i) => {
      const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
      const rx = 39;
      const ry = 37;
      const x = 50 + rx * Math.cos(angle);
      const y = 50 + ry * Math.sin(angle);
      return { variant: v, x, y };
    });
  }, [activeCenterWorld, variants]);

  return (
    <div className="space-y-6">
      {/* =====================================================================
          TOP SUB-MODE BAR: 1. CONSTELAÇÃO ORBITAL vs 2. ÁRVORE GENEALÓGICA
      ===================================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#c89d54]/25 pb-4">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-center justify-center w-11 h-11 border border-[#c89d54]/40 bg-[#07080c] text-[#c89d54] font-display text-sm">
            <span>I</span>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c89d54]">
              {stageMode === 'WEB'
                ? 'RODA DE DESTINOS • ZERO FIOS SOBREPOSTOS'
                : 'GENEALOGIA QUÂNTICA • QUEM SE DIVIDIU EM QUEM'}
            </div>
            <h2 className="font-display text-xl sm:text-3xl font-normal tracking-[0.12em] text-white uppercase mt-0.5">
              {stageMode === 'WEB'
                ? 'Constelação Orbital do Multiverso'
                : 'Árvore de Ramificações das Variantes'}
            </h2>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="inline-flex w-full sm:w-auto bg-[#06070a] border border-[#c89d54]/40 p-1 self-start lg:self-auto">
          <button
            onClick={() => setStageMode('WEB')}
            className={`flex-1 sm:flex-initial justify-center px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] flex items-center gap-2 transition-all ${
              stageMode === 'WEB'
                ? 'bg-[#c89d54] text-[#030305] font-bold shadow-[0_0_20px_rgba(200,157,84,0.3)]'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>1. Teia de Conexões</span>
          </button>
          <button
            onClick={() => setStageMode('TREE')}
            className={`flex-1 sm:flex-initial justify-center px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] flex items-center gap-2 transition-all ${
              stageMode === 'TREE'
                ? 'bg-[#c89d54] text-[#030305] font-bold shadow-[0_0_20px_rgba(200,157,84,0.3)]'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>2. Árvore de Divisões</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          MODE 1: ORBITAL CONSTELLATION WHEEL (ZERO CARD OVERLAP!)
      ===================================================================== */}
      {stageMode === 'WEB' && (
        <div className="space-y-5">
          {/* STEP 1: DRAG-TO-SCROLL CHARACTER SELECTOR DOCK */}
          <div className="arch-box p-4 sm:p-5 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.07] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c89d54]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#e6c885]">
                  SELECIONE QUEM COLOCAR NO CENTRO:
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-stone-400 bg-white/5 px-2 py-0.5 border border-white/10">
                  <Hand className="w-3 h-3 text-[#c89d54]" /> Segure e arraste
                </span>
                <span className="sm:hidden text-[10px] font-mono text-stone-400">
                  (deslize para escolher)
                </span>
              </div>

              <DragScrollContainer className="flex items-center gap-1 pb-0.5 max-w-full">
                {[
                  { id: 'ALL', label: `TODOS (${variants.length})` },
                  { id: 'DECEASED', label: `💀 MORTOS / BAIXAS (${deceasedCount})` },
                  { id: 'Jason Dessen', label: 'JASONS' },
                  { id: 'Amanda Lucas', label: 'AMANDAS' },
                  { id: 'Ryan Holder', label: 'RYANS' },
                  { id: 'Leighton Vance', label: 'LEIGHTONS' },
                  { id: 'Blair Caplan', label: 'BLAIRS' },
                  { id: 'Daniela & Charlie', label: 'FAMÍLIA DESSEN' },
                  { id: 'Laurel & Agentes', label: 'MACNAMARA & SANTUÁRIO' },
                ].map((grp) => (
                  <button
                    key={grp.id}
                    onClick={() => setLineageFilter(grp.id)}
                    className={`px-2.5 py-1 text-[10px] font-mono tracking-[0.12em] uppercase whitespace-nowrap transition ${
                      lineageFilter === grp.id
                        ? grp.id === 'DECEASED'
                          ? 'bg-rose-600 text-white font-bold'
                          : 'bg-[#c89d54] text-[#030305] font-bold'
                        : grp.id === 'DECEASED'
                        ? 'bg-rose-950/40 text-rose-300 hover:text-white border border-rose-500/40'
                        : 'bg-[#07080c] text-stone-400 hover:text-white border border-white/[0.07]'
                    }`}
                  >
                    {grp.label}
                  </button>
                ))}
              </DragScrollContainer>
            </div>

            {/* Drag-to-Scroll Horizontal Carousel of Characters */}
            <DragScrollContainer className="flex items-center gap-2.5 pb-2">
              {displayedVariants.map((v) => {
                const isSelected = centerMode === 'VARIANT' && activeVariant?.id === v.id;
                const isDead = v.status === 'Morto';
                return (
                  <button
                    key={v.id}
                    onClick={() => handleSelectCharacter(v.id)}
                    className={`group shrink-0 flex items-center gap-2.5 px-3 py-2 border transition-all ${
                      isSelected
                        ? 'bg-[#171208] border-[#c89d54] shadow-[0_0_20px_rgba(200,157,84,0.3)]'
                        : isDead
                        ? 'bg-[#0c0608] border-rose-500/35 opacity-85 hover:opacity-100 hover:border-rose-400'
                        : 'bg-[#06070b] border-white/10 opacity-75 hover:opacity-100 hover:border-[#c89d54]/50'
                    }`}
                  >
                    <img
                      src={v.avatarUrl}
                      alt={v.designation}
                      draggable={false}
                      referrerPolicy="no-referrer"
                      className={`w-9 h-9 rounded-full object-cover border pointer-events-none ${
                        isSelected
                          ? 'border-[#c89d54]'
                          : isDead
                          ? 'border-rose-500 grayscale-[35%]'
                          : 'border-stone-600'
                      }`}
                    />
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.1 ${
                            isSelected
                              ? 'bg-[#c89d54] text-[#030305]'
                              : isDead
                              ? 'bg-rose-600 text-white'
                              : 'bg-white/10 text-stone-300'
                          }`}
                        >
                          {v.badgeNumber}
                        </span>
                        <span className="text-xs font-display text-white uppercase tracking-wider">
                          {v.designation.split(' (')[0]}
                        </span>
                        {isDead && (
                          <span className="text-[8px] font-mono uppercase px-1 bg-rose-950 text-rose-300 border border-rose-500/40">
                            MORTO
                          </span>
                        )}
                      </div>
                      <div className="text-[9px] font-mono text-stone-400 truncate max-w-[150px]">
                        {v.alias}
                      </div>
                    </div>
                  </button>
                );
              })}
            </DragScrollContainer>
          </div>

          {/* =====================================================================
              MOBILE CONSTELATION VIEW (BLOCK LG:HIDDEN)
              100% Touch-Friendly, Clear & Responsive!
          ===================================================================== */}
          <div className="block lg:hidden space-y-4">
            {/* Mobile View Toggle: 1. Jornada & Conexões (Default) vs 2. Roda Orbital */}
            <div className="flex items-center justify-between gap-2 p-1 bg-[#06070a] border border-[#c89d54]/30">
              <button
                onClick={() => setMobileWebTab('JOURNEY')}
                className={`flex-1 py-2 text-[11px] font-mono uppercase tracking-wider transition ${
                  mobileWebTab === 'JOURNEY'
                    ? 'bg-[#c89d54] text-[#030305] font-bold shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                ⚡ Conexões & Rota ({centerMode === 'VARIANT' ? activeVariant?.worldsVisited.length : orbitalWorldVisitors.length})
              </button>
              <button
                onClick={() => setMobileWebTab('WHEEL')}
                className={`flex-1 py-2 text-[11px] font-mono uppercase tracking-wider transition ${
                  mobileWebTab === 'WHEEL'
                    ? 'bg-[#c89d54] text-[#030305] font-bold shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                🪐 Roda Orbital
              </button>
            </div>

            {/* TAB A: MOBILE JOURNEY & CONNECTIONS */}
            {mobileWebTab === 'JOURNEY' && (
              <div className="space-y-4">
                {/* 1. HERO ACTIVE NODE CARD (VARIANT OR WORLD) */}
                <div className="arch-box p-4 border-[#c89d54]/50">
                  {centerMode === 'VARIANT' && activeVariant ? (
                    <div>
                      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c89d54] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#c89d54] animate-pulse" />
                          CENTRO DA CONSTELAÇÃO
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleCycleVariant('PREV')}
                            className="px-2 py-1 bg-white/5 border border-white/10 text-stone-300 hover:text-[#c89d54] text-[10px] font-mono uppercase flex items-center gap-0.5"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" /> Ant.
                          </button>
                          <button
                            onClick={() => handleCycleVariant('NEXT')}
                            className="px-2 py-1 bg-white/5 border border-white/10 text-stone-300 hover:text-[#c89d54] text-[10px] font-mono uppercase flex items-center gap-0.5"
                          >
                            Próx. <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div className="relative shrink-0">
                          <img
                            src={activeVariant.avatarUrl}
                            alt={activeVariant.designation}
                            className={`w-16 h-16 rounded-full object-cover border-2 ${
                              activeVariant.status === 'Morto'
                                ? 'border-rose-500 grayscale-[35%]'
                                : 'border-[#c89d54]'
                            }`}
                          />
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.2 bg-[#c89d54] text-[#030305] font-mono text-[10px] font-bold whitespace-nowrap">
                            {activeVariant.badgeNumber}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            <span
                              className={`px-1.5 py-0.2 text-[9px] font-mono uppercase border ${
                                activeVariant.status === 'Morto'
                                  ? 'bg-rose-950/70 text-rose-300 border-rose-500/50'
                                  : 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40'
                              }`}
                            >
                              {activeVariant.status === 'Morto' ? '💀 MORTO' : activeVariant.status}
                            </span>
                            <span className="text-[9px] font-mono text-[#c89d54]">
                              {activeVariant.baseCharacter}
                            </span>
                          </div>
                          <h3 className="font-display text-base text-white uppercase tracking-wider truncate">
                            {activeVariant.designation}
                          </h3>
                          <p className="text-xs text-stone-300 font-mono mt-0.5 truncate">
                            {activeVariant.alias}
                          </p>
                        </div>
                      </div>

                      {/* Quick Origin / Current World Row */}
                      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/[0.08]">
                        {(() => {
                          const orig = getWorld(activeVariant.originWorldId);
                          return (
                            <button
                              onClick={() => orig && onSelectWorld(orig.id)}
                              className="p-2 bg-[#050609] border border-[#c89d54]/30 text-left hover:border-[#c89d54]"
                            >
                              <span className="text-[8px] font-mono uppercase text-[#c89d54] block">
                                1º ORIGEM
                              </span>
                              <span className="text-xs text-stone-200 font-semibold truncate block">
                                {orig?.code} • {orig?.name.split(' (')[0]}
                              </span>
                            </button>
                          );
                        })()}

                        {(() => {
                          const curr = getWorld(activeVariant.currentWorldId);
                          const isDead = activeVariant.status === 'Morto';
                          return (
                            <button
                              onClick={() => curr && onSelectWorld(curr.id)}
                              className={`p-2 bg-[#050609] border text-left ${
                                isDead
                                  ? 'border-rose-500/30 hover:border-rose-400'
                                  : 'border-emerald-500/30 hover:border-emerald-400'
                              }`}
                            >
                              <span
                                className={`text-[8px] font-mono uppercase block ${
                                  isDead ? 'text-rose-400' : 'text-emerald-400'
                                }`}
                              >
                                {isDead ? 'LOCAL DA MORTE' : 'PARADEIRO ATUAL'}
                              </span>
                              <span className="text-xs text-stone-200 font-semibold truncate block">
                                {curr?.code} • {curr?.name.split(' (')[0]}
                              </span>
                            </button>
                          );
                        })()}
                      </div>

                      <button
                        onClick={() => onSelectVariant(activeVariant.id)}
                        className="w-full mt-3 py-2 bg-[#141108] hover:bg-[#c89d54] text-[#e6c885] hover:text-[#030305] border border-[#c89d54]/50 font-mono text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-1.5"
                      >
                        Abrir Dossiê Completo desta Variante →
                      </button>
                    </div>
                  ) : (
                    /* When a World is in the center */
                    activeCenterWorld && (
                      <div>
                        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-sky-400 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                            MUNDO EM FOCO NO CENTRO
                          </span>
                          <button
                            onClick={() => setCenterMode('VARIANT')}
                            className="px-2.5 py-1 bg-[#c89d54] text-[#030305] font-mono text-[10px] font-bold uppercase flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" /> Voltar Personagem
                          </button>
                        </div>

                        <div className="flex items-start gap-3.5">
                          <img
                            src={activeCenterWorld.imageUrl}
                            alt={activeCenterWorld.name}
                            className="w-16 h-16 rounded object-cover border-2 border-sky-400 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.2 bg-sky-400 text-[#030305] font-mono text-[10px] font-bold">
                                {activeCenterWorld.code}
                              </span>
                              <span className="text-[9px] font-mono text-stone-400 border border-white/10 px-1.5 py-0.2">
                                {activeCenterWorld.habitability}
                              </span>
                            </div>
                            <h3 className="font-display text-base text-white uppercase tracking-wider truncate">
                              {activeCenterWorld.name}
                            </h3>
                            <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                              <RichText text={activeCenterWorld.shortHook} />
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => onSelectWorld(activeCenterWorld.id)}
                          className="w-full mt-3 py-2 bg-[#06121a] hover:bg-sky-400 text-sky-200 hover:text-[#030305] border border-sky-400/50 font-mono text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-1.5"
                        >
                          Abrir Dossiê deste Mundo →
                        </button>
                      </div>
                    )
                  )}
                </div>

                {/* 2. CHRONOLOGICAL JUMP CARDS (WHEN VARIANT IS IN CENTER) */}
                {centerMode === 'VARIANT' && activeVariant && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c89d54] font-bold">
                        ROTA DE SALTOS DO PERSONAGEM ({activeVariant.worldsVisited.length} MUNDOS)
                      </span>
                      <span className="text-[9px] font-mono text-stone-400">
                        Toque para abrir
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {activeVariant.worldsVisited.map((wId, idx) => {
                        const w = getWorld(wId);
                        if (!w) return null;
                        const isOrigin = idx === 0;
                        const isCurrent = activeVariant.currentWorldId === wId;

                        const badgeColor = isCurrent
                          ? 'bg-emerald-400 text-[#030305]'
                          : isOrigin
                          ? 'bg-[#c89d54] text-[#030305]'
                          : 'bg-sky-400 text-[#030305]';

                        const borderStyle = isCurrent
                          ? 'border-emerald-500/60 shadow-[0_0_15px_rgba(52,211,153,0.15)]'
                          : isOrigin
                          ? 'border-[#c89d54]/60 shadow-[0_0_15px_rgba(200,157,84,0.15)]'
                          : 'border-white/10 hover:border-sky-400/50';

                        return (
                          <div key={`mob-step-${wId}-${idx}`} className="space-y-2">
                            <div className={`arch-box p-3 ${borderStyle} transition-all`}>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className={`px-2 py-0.5 text-[9px] font-mono font-extrabold uppercase ${badgeColor}`}>
                                  {isOrigin && idx === 0
                                    ? '1º MUNDO DE ORIGEM'
                                    : isCurrent
                                    ? `${idx + 1}º PARADEIRO ATUAL`
                                    : `${idx + 1}º SALTO NO CORREDOR`}
                                </span>
                                <span className="text-[9px] font-mono text-stone-400">
                                  {w.code} • {w.habitability}
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <img
                                  src={w.imageUrl}
                                  alt={w.name}
                                  className="w-14 h-14 rounded object-cover border border-white/20 shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="font-display text-sm text-white uppercase tracking-wider truncate">
                                    {w.name}
                                  </div>
                                  <p className="text-[11px] text-stone-300 mt-0.5 line-clamp-1">
                                    <RichText text={w.shortHook} />
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-white/[0.06]">
                                <button
                                  onClick={() => onSelectWorld(w.id)}
                                  className="py-2 px-2 bg-[#120e07] hover:bg-[#c89d54] text-[#e6c885] hover:text-[#030305] border border-[#c89d54]/50 text-[10px] font-mono uppercase tracking-wider text-center transition font-semibold"
                                >
                                  Abrir Dossiê →
                                </button>
                                <button
                                  onClick={() => handleCenterOnWorld(w.id)}
                                  className="py-2 px-2 bg-white/5 hover:bg-sky-400 text-stone-300 hover:text-[#030305] border border-white/15 text-[10px] font-mono uppercase tracking-wider text-center transition"
                                >
                                  Focar no Centro 🪐
                                </button>
                              </div>
                            </div>

                            {idx < activeVariant.worldsVisited.length - 1 && (
                              <div className="flex flex-col items-center justify-center my-0.5">
                                <div className="w-0.5 h-2.5 bg-[#c89d54]/60" />
                                <div className="w-4 h-4 rounded-full bg-[#120e07] border border-[#c89d54]/50 flex items-center justify-center text-[9px] text-[#c89d54]">
                                  ↓
                                </div>
                                <div className="w-0.5 h-2.5 bg-[#c89d54]/60" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. CONNECTED TRAVELERS CARDS (WHEN WORLD IS IN CENTER) */}
                {centerMode === 'WORLD' && activeCenterWorld && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-sky-400 font-bold">
                        VIAJANTES CONECTADOS A ESTA PORTA ({orbitalWorldVisitors.length})
                      </span>
                    </div>

                    <div className="space-y-2">
                      {orbitalWorldVisitors.map(({ variant: v }) => {
                        const isCurrent = v.currentWorldId === activeCenterWorld.id;
                        const isOrigin = v.originWorldId === activeCenterWorld.id;
                        const isDead = v.status === 'Morto';

                        return (
                          <div
                            key={`mob-v-${v.id}`}
                            className="arch-box p-3 border-white/15 hover:border-sky-400/60 transition"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={`px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase ${
                                  isCurrent
                                    ? 'bg-emerald-400 text-[#030305]'
                                    : isOrigin
                                    ? 'bg-[#c89d54] text-[#030305]'
                                    : 'bg-sky-400 text-[#030305]'
                                }`}
                              >
                                {isOrigin ? 'NATIVO / ORIGEM' : isCurrent ? 'PARADEIRO ATUAL' : 'ATRAVESSOU A PORTA'}
                              </span>
                              <span className="text-[9px] font-mono text-stone-400">
                                {isDead ? '💀 MORTO' : v.status}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <img
                                src={v.avatarUrl}
                                alt={v.designation}
                                className="w-12 h-12 rounded-full object-cover border border-[#c89d54] shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-display text-sm text-white uppercase truncate">
                                  <span className="font-mono text-[#c89d54] mr-1.5">{v.badgeNumber}</span>
                                  {v.designation.split(' (')[0]}
                                </div>
                                <div className="text-[11px] text-stone-400 truncate mt-0.5">
                                  {v.alias}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-white/[0.06]">
                              <button
                                onClick={() => onSelectVariant(v.id)}
                                className="py-2 px-2 bg-[#120e07] hover:bg-[#c89d54] text-[#e6c885] hover:text-[#030305] border border-[#c89d54]/50 text-[10px] font-mono uppercase tracking-wider text-center transition font-semibold"
                              >
                                Abrir Dossiê →
                              </button>
                              <button
                                onClick={() => handleSelectCharacter(v.id)}
                                className="py-2 px-2 bg-white/5 hover:bg-sky-400 text-stone-300 hover:text-[#030305] border border-white/15 text-[10px] font-mono uppercase tracking-wider text-center transition"
                              >
                                Focar no Centro 🎯
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. EXPANDABLE MULTIVERSE PORTALS ACCORDION FOR MOBILE */}
                <div className="arch-box p-3 border-[#c89d54]/30">
                  <button
                    onClick={() => setShowAllWorldsMobile(!showAllWorldsMobile)}
                    className="w-full flex items-center justify-between text-left py-1 text-xs font-mono uppercase tracking-wider text-[#e6c885]"
                  >
                    <span>{showAllWorldsMobile ? '▲ Ocultar Catálogo de Portas' : `▼ Explorar Todas as ${worlds.length} Portas do Corredor`}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10">
                      {worlds.length} Portas
                    </span>
                  </button>

                  {showAllWorldsMobile && (
                    <div className="pt-3 mt-3 border-t border-white/[0.08] space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        {worlds.map((w) => {
                          const isVisited = activeVariant?.worldsVisited.includes(w.id);
                          return (
                            <button
                              key={`mob-all-w-${w.id}`}
                              onClick={() => onSelectWorld(w.id)}
                              className={`p-2 text-left border flex items-center gap-2 transition ${
                                isVisited
                                  ? 'bg-[#120e07] border-[#c89d54]/70'
                                  : 'bg-[#06070a] border-white/10 hover:border-white/30'
                              }`}
                            >
                              <img
                                src={w.imageUrl}
                                alt={w.name}
                                className="w-8 h-8 rounded object-cover shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="text-[9px] font-mono text-[#c89d54] uppercase">
                                  {w.code}
                                </div>
                                <div className="text-[11px] text-white truncate font-medium">
                                  {w.name.split(' (')[0]}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB B: MOBILE SCROLLABLE ORBITAL WHEEL */}
            {mobileWebTab === 'WHEEL' && (
              <div className="space-y-2">
                <div className="px-3 py-1.5 bg-[#120e07] border border-[#c89d54]/40 text-[10px] font-mono text-[#e6c885] flex items-center justify-between">
                  <span>↔ Arraste horizontalmente para navegar na roda</span>
                  <button
                    onClick={() => setMobileWebTab('JOURNEY')}
                    className="underline text-[#c89d54] uppercase"
                  >
                    Voltar à Lista
                  </button>
                </div>

                <div className="arch-box overflow-x-auto touch-pan-x">
                  <div className="min-w-[680px]">
                    <div className="relative w-full h-[620px] select-none overflow-hidden">
                      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 w-full h-full z-10">
                        <ellipse cx="500" cy="500" rx="415" ry="395" fill="none" stroke="rgba(200, 157, 84, 0.16)" strokeWidth="1" strokeDasharray="4 6" />
                        <ellipse cx="500" cy="500" rx="260" ry="245" fill="none" stroke="rgba(200, 157, 84, 0.1)" strokeWidth="1" />
                        <circle cx="500" cy="500" r="95" fill="none" stroke="rgba(200, 157, 84, 0.28)" strokeWidth="1" />

                        {centerMode === 'VARIANT' && activeVariant && orbitalWorlds.map(({ world, x, y }) => {
                          const visitIndex = activeVariant.worldsVisited.indexOf(world.id);
                          const isVisited = visitIndex !== -1;
                          const isOrigin = activeVariant.originWorldId === world.id;
                          const isCurrent = activeVariant.currentWorldId === world.id;
                          const tx = x * 10;
                          const ty = y * 10;
                          if (!isVisited) return null;
                          const color = isCurrent ? '#34d399' : isOrigin ? '#c89d54' : '#38bdf8';
                          return (
                            <line key={`spoke-mob-${world.id}`} x1="500" y1="500" x2={tx} y2={ty} stroke={color} strokeWidth="2" strokeOpacity="0.5" />
                          );
                        })}
                      </svg>

                      {/* Center Node */}
                      <div style={{ left: '50%', top: '50%' }} className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center text-center">
                        {centerMode === 'VARIANT' && activeVariant && (
                          <div onClick={() => onSelectVariant(activeVariant.id)} className="cursor-pointer group flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#c89d54] bg-[#040508] relative">
                              <img src={activeVariant.avatarUrl} alt={activeVariant.designation} className="w-full h-full object-cover" />
                            </div>
                            <span className="mt-1 px-2 py-0.5 bg-[#c89d54] text-[#030305] font-mono text-[10px] font-extrabold">
                              {activeVariant.badgeNumber}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Perimeter nodes */}
                      {centerMode === 'VARIANT' && activeVariant && orbitalWorlds.map(({ world: w, x, y }) => {
                        const visitIndex = activeVariant.worldsVisited.indexOf(w.id);
                        const isVisited = visitIndex !== -1;
                        return (
                          <div
                            key={`wheel-mob-node-${w.id}`}
                            style={{ left: `${x}%`, top: `${y}%` }}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-center ${
                              isVisited ? 'scale-100 opacity-100' : 'scale-75 opacity-40'
                            }`}
                          >
                            <button onClick={() => onSelectWorld(w.id)} className="flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${
                                isVisited ? 'border-[#c89d54]' : 'border-stone-700'
                              }`}>
                                <img src={w.imageUrl} alt={w.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-[8px] font-mono text-[#c89d54]">{w.code}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =====================================================================
              STEP 2: THE SACRED ORBITAL WHEEL (DESKTOP VERSION — 100% PRESERVED!)
          ===================================================================== */}
          <div className="hidden lg:block arch-box relative overflow-hidden">
            {/* Top Legend inside Canvas */}
            <div className="relative z-20 px-5 pt-4 pb-2 flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] bg-[#040508]/80">
              <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-stone-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c89d54]" /> 1º Mundo de Origem
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Saltos no Corredor
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Paradeiro Atual
                </span>
              </div>

              <div className="flex items-center gap-2">
                {centerMode === 'WORLD' ? (
                  <button
                    onClick={() => setCenterMode('VARIANT')}
                    className="px-3 py-1 bg-[#c89d54] text-[#030305] font-mono text-[10px] font-bold uppercase flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Voltar Personagem ao Centro
                  </button>
                ) : (
                  <span className="text-[10px] font-mono text-stone-400">
                    Clique em um mundo no anel para abrir seu arquivo • Duplo clique para focar o mundo no centro
                  </span>
                )}
              </div>
            </div>

            {/* RADIAL ORBITAL CANVAS */}
            <div className="relative w-full h-[680px] sm:h-[740px] select-none overflow-hidden">
              <svg
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 w-full h-full z-10"
              >
                <defs>
                  <filter id="orbitalGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Concentric Sacred Rings */}
                <ellipse
                  cx="500"
                  cy="500"
                  rx="415"
                  ry="395"
                  fill="none"
                  stroke="rgba(200, 157, 84, 0.16)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <ellipse
                  cx="500"
                  cy="500"
                  rx="260"
                  ry="245"
                  fill="none"
                  stroke="rgba(200, 157, 84, 0.1)"
                  strokeWidth="1"
                />
                <circle
                  cx="500"
                  cy="500"
                  r="95"
                  fill="none"
                  stroke="rgba(200, 157, 84, 0.28)"
                  strokeWidth="1"
                />

                {/* Spokes when Variant is in Center */}
                {centerMode === 'VARIANT' &&
                  orbitalWorlds.map(({ world, x, y }) => {
                    const visitIndex = activeVariant.worldsVisited.indexOf(world.id);
                    const isVisited = visitIndex !== -1;
                    const isOrigin = activeVariant.originWorldId === world.id;
                    const isCurrent = activeVariant.currentWorldId === world.id;
                    const isHighlighted =
                      activeStepIndex === null || activeStepIndex === visitIndex;

                    const tx = x * 10;
                    const ty = y * 10;

                    if (!isVisited) {
                      return (
                        <line
                          key={`faint-${world.id}`}
                          x1="500"
                          y1="500"
                          x2={tx}
                          y2={ty}
                          stroke="rgba(255,255,255,0.035)"
                          strokeWidth="1"
                        />
                      );
                    }

                    const color = isCurrent
                      ? '#34d399'
                      : isOrigin
                      ? '#c89d54'
                      : '#38bdf8';

                    const bx = 500 + (tx - 500) * 0.56;
                    const by = 500 + (ty - 500) * 0.56;

                    return (
                      <g
                        key={`spoke-${world.id}`}
                        style={{ opacity: isHighlighted ? 1 : 0.2 }}
                      >
                        <line
                          x1="500"
                          y1="500"
                          x2={tx}
                          y2={ty}
                          stroke={color}
                          strokeWidth={isCurrent || isOrigin ? 3.5 : 2.2}
                          strokeOpacity="0.35"
                          filter="url(#orbitalGlow)"
                        />
                        <line
                          x1="500"
                          y1="500"
                          x2={tx}
                          y2={ty}
                          stroke={color}
                          strokeWidth={isCurrent || isOrigin ? 2.4 : 1.6}
                          className="animate-thread-flow"
                        />
                        <g transform={`translate(${bx}, ${by})`}>
                          <circle
                            r="13"
                            fill="#040508"
                            stroke={color}
                            strokeWidth="1.8"
                          />
                          <text
                            textAnchor="middle"
                            dy="4"
                            fill={color}
                            fontSize="11"
                            fontFamily="JetBrains Mono, monospace"
                            fontWeight="bold"
                          >
                            {visitIndex + 1}º
                          </text>
                        </g>
                      </g>
                    );
                  })}

                {/* Spokes when a World is in Center */}
                {centerMode === 'WORLD' &&
                  orbitalWorldVisitors.map(({ variant, x, y }) => {
                    const tx = x * 10;
                    const ty = y * 10;
                    const isCurrent = variant.currentWorldId === activeCenterWorld.id;
                    const isOrigin = variant.originWorldId === activeCenterWorld.id;
                    const color = isCurrent
                      ? '#34d399'
                      : isOrigin
                      ? '#c89d54'
                      : '#38bdf8';

                    return (
                      <g key={`wspoke-${variant.id}`}>
                        <line
                          x1="500"
                          y1="500"
                          x2={tx}
                          y2={ty}
                          stroke={color}
                          strokeWidth="2.2"
                          strokeOpacity="0.4"
                          filter="url(#orbitalGlow)"
                        />
                        <line
                          x1="500"
                          y1="500"
                          x2={tx}
                          y2={ty}
                          stroke={color}
                          strokeWidth="1.6"
                          className="animate-thread-flow"
                        />
                      </g>
                    );
                  })}
              </svg>

              {/* CENTER HUB MEDALLION (EXACT 50%, 50%) */}
              <div
                style={{ left: '50%', top: '50%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center text-center"
              >
                {centerMode === 'VARIANT' && activeVariant ? (
                  <div
                    onClick={() => onSelectVariant(activeVariant.id)}
                    className="cursor-pointer group flex flex-col items-center"
                  >
                    <div className="relative">
                      <div className="absolute -inset-3 rounded-full border border-dashed border-[#c89d54]/60 animate-ring-rotate" />
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#c89d54] shadow-[0_0_45px_rgba(200,157,84,0.45)] bg-[#040508]">
                        <img
                          src={activeVariant.avatarUrl}
                          alt={activeVariant.designation}
                          draggable={false}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#c89d54] text-[#030305] font-mono text-xs font-extrabold shadow-lg">
                        {activeVariant.badgeNumber}
                      </span>
                    </div>

                    <div className="mt-3 px-3 py-1 bg-[#050609]/95 border border-[#c89d54]/40 shadow-xl">
                      <div className="font-display text-xs sm:text-sm text-white uppercase tracking-wider">
                        {activeVariant.designation.split(' (')[0]}
                      </div>
                      <div className="text-[9px] font-mono text-[#c89d54]">
                        {activeVariant.worldsVisited.length} MUNDOS CONECTADOS
                      </div>
                    </div>
                  </div>
                ) : (
                  activeCenterWorld && (
                    <div
                      onClick={() => onSelectWorld(activeCenterWorld.id)}
                      className="cursor-pointer group flex flex-col items-center"
                    >
                      <div className="relative">
                        <div className="absolute -inset-3 rounded-full border border-dashed border-sky-400/60 animate-ring-rotate" />
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-sky-400 shadow-[0_0_45px_rgba(56,189,248,0.4)] bg-[#040508]">
                          <img
                            src={activeCenterWorld.imageUrl}
                            alt={activeCenterWorld.name}
                            draggable={false}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-sky-400 text-[#030305] font-mono text-[10px] font-extrabold">
                          {activeCenterWorld.code}
                        </span>
                      </div>
                      <div className="mt-3 px-3 py-1 bg-[#050609]/95 border border-sky-400/40 max-w-[180px]">
                        <div className="font-display text-xs text-white uppercase tracking-wider truncate">
                          {activeCenterWorld.name.split(' (')[0]}
                        </div>
                        <div className="text-[9px] font-mono text-sky-300">
                          {orbitalWorldVisitors.length} VIAJANTES CONECTADOS
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* PERIMETER RING NODES: 14 WORLDS */}
              {centerMode === 'VARIANT' &&
                orbitalWorlds.map(({ world: w, x, y }) => {
                  const visitIndex = activeVariant.worldsVisited.indexOf(w.id);
                  const isVisited = visitIndex !== -1;
                  const isOrigin = activeVariant.originWorldId === w.id;
                  const isCurrent = activeVariant.currentWorldId === w.id;

                  return (
                    <div
                      key={w.id}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-center transition-all duration-300 ${
                        isVisited
                          ? 'scale-100 opacity-100'
                          : 'scale-90 opacity-35 hover:opacity-100 hover:scale-100'
                      }`}
                    >
                      <button
                        onClick={() => handleSelectWorldOnWheel(w.id)}
                        onDoubleClick={() => handleCenterOnWorld(w.id)}
                        className="group flex flex-col items-center focus:outline-none"
                      >
                        <div className="relative">
                          {isVisited && (
                            <span
                              className={`absolute -top-2.5 left-1/2 -translate-x-1/2 px-1.5 py-0.2 text-[8px] font-mono font-extrabold uppercase tracking-wider whitespace-nowrap z-20 shadow ${
                                isCurrent
                                  ? 'bg-emerald-400 text-[#030305]'
                                  : isOrigin
                                  ? 'bg-[#c89d54] text-[#030305]'
                                  : 'bg-sky-400 text-[#030305]'
                              }`}
                            >
                              {isOrigin && visitIndex === 0
                                ? '1º ORIGEM'
                                : isCurrent
                                ? `${visitIndex + 1}º ATUAL`
                                : `${visitIndex + 1}º SALTO`}
                            </span>
                          )}

                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 bg-[#040508] transition-all ${
                              isVisited
                                ? isCurrent
                                  ? 'border-emerald-400 shadow-[0_0_22px_rgba(52,211,153,0.45)]'
                                  : isOrigin
                                  ? 'border-[#c89d54] shadow-[0_0_22px_rgba(200,157,84,0.45)]'
                                  : 'border-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.4)]'
                                : 'border-stone-700 group-hover:border-[#c89d54]'
                            }`}
                          >
                            <img
                              src={w.imageUrl}
                              alt={w.name}
                              draggable={false}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                        </div>

                        <div className="mt-1 px-2 py-0.5 bg-[#040508]/90 border border-white/[0.08] max-w-[115px] sm:max-w-[130px]">
                          <div className="text-[8px] font-mono text-[#c89d54] uppercase leading-none">
                            {w.code}
                          </div>
                          <div className="text-[10px] font-display text-stone-100 truncate mt-0.5 group-hover:text-[#e6c885]">
                            {w.name.split(' (')[0]}
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}

              {/* PERIMETER RING NODES: VISITORS (WHEN WORLD IS IN CENTER) */}
              {centerMode === 'WORLD' &&
                orbitalWorldVisitors.map(({ variant: v, x, y }) => {
                  const isCurrent = v.currentWorldId === activeCenterWorld.id;
                  const isOrigin = v.originWorldId === activeCenterWorld.id;
                  return (
                    <div
                      key={v.id}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-center"
                    >
                      <button
                        onClick={() => handleSelectCharacter(v.id)}
                        className="group flex flex-col items-center"
                      >
                        <div
                          className={`w-14 h-14 rounded-full overflow-hidden border-2 bg-[#040508] ${
                            isCurrent
                              ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                              : isOrigin
                              ? 'border-[#c89d54] shadow-[0_0_20px_rgba(200,157,84,0.4)]'
                              : 'border-sky-400'
                          }`}
                        >
                          <img
                            src={v.avatarUrl}
                            alt={v.designation}
                            draggable={false}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-1 px-2 py-0.5 bg-[#040508]/95 border border-white/15">
                          <span className="text-[9px] font-mono font-bold text-[#c89d54] mr-1">
                            {v.badgeNumber}
                          </span>
                          <span className="text-[10px] font-display text-white">
                            {v.designation.split(' (')[0]}
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}
            </div>

            {/* BOTTOM DRAG-TO-SCROLL STEP-BY-STEP TRAJECTORY RIBBON */}
            {centerMode === 'VARIANT' && activeVariant && (
              <div className="relative z-20 bg-[#050609]/95 border-t border-[#c89d54]/30 px-5 py-3.5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <DragScrollContainer className="flex items-center gap-2 py-1 flex-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#c89d54] shrink-0 mr-1">
                    ORDEM DOS SALTOS:
                  </span>
                  {activeVariant.worldsVisited.map((wId, idx) => {
                    const w = getWorld(wId);
                    if (!w) return null;
                    const isOrigin = idx === 0;
                    const isCurrent = activeVariant.currentWorldId === wId;
                    const isFocusedStep = activeStepIndex === idx;

                    return (
                      <React.Fragment key={`${wId}-${idx}`}>
                        <button
                          onClick={() => {
                            setActiveStepIndex(activeStepIndex === idx ? null : idx);
                            onSelectWorld(w.id);
                          }}
                          className={`px-2.5 py-1 border text-left transition shrink-0 flex items-center gap-2 ${
                            isFocusedStep
                              ? 'bg-[#c89d54] text-[#030305] border-[#e6c885] font-bold'
                              : isCurrent
                              ? 'bg-emerald-950/40 text-emerald-200 border-emerald-400/60'
                              : isOrigin
                              ? 'bg-[#171208] text-[#e6c885] border-[#c89d54]/60'
                              : 'bg-[#080a10] text-stone-200 border-white/15'
                          }`}
                        >
                          <span className="font-mono text-[10px] font-bold">{idx + 1}º</span>
                          <span className="text-[11px] font-medium truncate max-w-[120px]">
                            {w.name.split(' (')[0]}
                          </span>
                        </button>
                        {idx < activeVariant.worldsVisited.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-[#c89d54]/60 shrink-0" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </DragScrollContainer>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleStepNavigation('PREV')}
                    className="p-1.5 bg-[#090b10] hover:bg-[#c89d54] text-stone-300 hover:text-[#030305] border border-white/15 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleStepNavigation('NEXT')}
                    className="px-3 py-1.5 bg-[#090b10] hover:bg-[#c89d54] text-stone-200 hover:text-[#030305] border border-white/15 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition"
                  >
                    <span>Passo a Passo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODE 2: TRUE HIERARCHICAL FAMILY / QUANTUM BRANCHING TREE
          No internal scroll containers so vertical mouse-wheel scrolling is 100% smooth!
      ===================================================================== */}
      {stageMode === 'TREE' && (
        <div className="arch-box p-5 sm:p-8 space-y-8">
          {/* Family Selector Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#c89d54]/25 pb-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c89d54] block">
                DIAGRAMA DE ÁRVORE HIERÁRQUICA (PAI ➔ DECISÃO ➔ RAMIFICAÇÕES)
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-[0.1em] mt-1">
                Escolha a Linhagem para Ver a Árvore de Divisões:
              </h3>
            </div>

            <DragScrollContainer className="flex items-center gap-1.5 bg-[#050609] p-1 border border-[#c89d54]/35 max-w-full">
              {[
                {
                  id: 'JASON',
                  label: `ÁRVORE DE JASON DESSEN (${
                    variants.filter((v) => v.baseCharacter === 'Jason Dessen').length
                  })`,
                },
                {
                  id: 'AMANDA',
                  label: `AMANDA LUCAS (${
                    variants.filter((v) => v.baseCharacter === 'Amanda Lucas').length
                  })`,
                },
                {
                  id: 'RYAN',
                  label: `RYAN HOLDER (${
                    variants.filter((v) => v.baseCharacter === 'Ryan Holder').length
                  })`,
                },
                {
                  id: 'LEIGHTON',
                  label: `LEIGHTON VANCE (${
                    variants.filter((v) => v.baseCharacter === 'Leighton Vance').length
                  })`,
                },
                {
                  id: 'BLAIR',
                  label: `BLAIR CAPLAN (${
                    variants.filter((v) => v.baseCharacter === 'Blair Caplan').length
                  })`,
                },
                {
                  id: 'MACNAMARA',
                  label: `MACNAMARA & FAMÍLIA (${
                    variants.filter(
                      (v) =>
                        v.baseCharacter === 'Laurel & Agentes' ||
                        v.baseCharacter === 'Daniela & Charlie'
                    ).length
                  })`,
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTreeFamily(item.id as any)}
                  className={`px-3 py-2 text-[10px] font-mono uppercase tracking-[0.14em] whitespace-nowrap transition ${
                    treeFamily === item.id
                      ? 'bg-[#c89d54] text-[#030305] font-bold'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </DragScrollContainer>
          </div>

          {/* ===============================================================
              1. TRUE VISUAL TREE FOR JASON DESSEN (100% RESPONSIVE, NO INNER SCROLL)
          =============================================================== */}
          {treeFamily === 'JASON' && (
            <div className="w-full flex flex-col items-center py-2">
              {/* LEVEL 0: THE ROOT NODE (YOUNG JASON 15 YEARS AGO) */}
              <div className="flex flex-col items-center">
                <div className="px-5 py-3 bg-[#141008] border-2 border-[#c89d54] text-center shadow-[0_0_30px_rgba(200,157,84,0.25)] max-w-md">
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#c89d54] block">
                    RAIZ DA ÁRVORE • HÁ 15 ANOS EM CHICAGO
                  </span>
                  <div className="font-display text-base text-white uppercase tracking-wider mt-0.5">
                    JASON DESSEN (ANTES DA DIVISÃO)
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    Daniela descobre que está grávida (ponto de divergência entre Reality 01 e Reality 02).
                  </div>
                </div>

                {/* Vertical Trunk Line Down */}
                <div className="w-0.5 h-7 bg-[#c89d54]" />
              </div>

              {/* HORIZONTAL TREE BRACKET SPLITTING INTO 3 REALITIES (15 YEARS AGO) */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0 relative">
                {/* Horizontal connector bar across the middle of column 1 to column 3 */}
                <div className="hidden lg:block absolute top-0 left-[16.666%] right-[16.666%] h-0.5 bg-[#c89d54]" />

                {/* LEFT BRANCH: JASON 2 (SCIENCE / REALITY 02) */}
                <div className="flex flex-col items-center px-2 order-2 lg:order-1">
                  <div className="hidden lg:block w-0.5 h-6 bg-[#c89d54]" />
                  <div className="px-2.5 py-1 bg-[#07111a] border border-sky-400/50 text-[9px] font-mono text-sky-300 uppercase tracking-wider mb-2 text-center">
                    RAMO A: Escolheu a Ciência (Sem Casamento)
                  </div>
                  <div className="w-0.5 h-4 bg-sky-400/60" />

                  {(() => {
                    const v = getVariant('jason-2');
                    if (!v) return null;
                    return (
                      <button
                        onClick={() => onSelectVariant(v.id)}
                        className="group w-full max-w-[260px] p-4 bg-[#07090f] border border-sky-400/60 hover:border-sky-300 flex flex-col items-center text-center transition"
                      >
                        <div className="relative mb-2">
                          <img
                            src={v.avatarUrl}
                            alt={v.designation}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-full object-cover border-2 border-sky-400"
                          />
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.2 bg-sky-400 text-[#030305] font-mono text-[10px] font-bold">
                            {v.badgeNumber}
                          </span>
                        </div>
                        <div className="font-display text-sm text-white uppercase group-hover:text-sky-300">
                          {v.designation}
                        </div>
                        <div className="text-[10px] font-mono text-sky-300 mt-0.5">
                          REALITY 02 • CRIOU A CAIXA
                        </div>
                        <p className="text-[11px] text-stone-400 mt-1.5 leading-snug">
                          Construiu a Caixa na Velocity Labs e sequestrou Jason 1 em Chicago.
                        </p>
                      </button>
                    );
                  })()}
                </div>

                {/* CENTER BRANCH: JASON 1 (MARRIED DANIELA / REALITY 01 -> THE TRUNK CONTINUES!) */}
                <div className="flex flex-col items-center px-2 order-1 lg:order-2">
                  <div className="hidden lg:block w-0.5 h-6 bg-[#c89d54]" />
                  <div className="px-2.5 py-1 bg-[#171208] border border-[#c89d54] text-[9px] font-mono text-[#e6c885] uppercase tracking-wider mb-2 text-center">
                    RAMO B: Casou com Daniela (Reality 01)
                  </div>
                  <div className="w-0.5 h-4 bg-[#c89d54]" />

                  {(() => {
                    const v = getVariant('jason-1');
                    if (!v) return null;
                    return (
                      <button
                        onClick={() => onSelectVariant(v.id)}
                        className="group w-full max-w-[270px] p-4 bg-[#141008] border-2 border-[#c89d54] shadow-[0_0_30px_rgba(200,157,84,0.3)] flex flex-col items-center text-center transition"
                      >
                        <div className="relative mb-2">
                          <img
                            src={v.avatarUrl}
                            alt={v.designation}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-full object-cover border-2 border-[#c89d54]"
                          />
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#c89d54] text-[#030305] font-mono text-[10px] font-bold whitespace-nowrap">
                            {v.badgeNumber} (TRONCO)
                          </span>
                        </div>
                        <div className="font-display text-sm text-white uppercase group-hover:text-[#e6c885]">
                          {v.designation}
                        </div>
                        <div className="text-[10px] font-mono text-[#c89d54] mt-0.5">
                          REALITY 01 • PROTAGONISTA
                        </div>
                        <p className="text-[11px] text-stone-300 mt-1.5 leading-snug">
                          Sequestrado por J2 e jogado na Caixa. <strong className="text-[#e6c885]">Todas as variantes abaixo nasceram dele!</strong>
                        </p>
                      </button>
                    );
                  })()}

                  {/* TRUNK CONTINUES DOWN ONLY FROM JASON 1! */}
                  <div className="w-0.5 h-8 bg-[#c89d54]" />
                  <div className="px-3 py-1.5 bg-[#c89d54] text-[#030305] font-mono text-[10px] font-extrabold uppercase tracking-wider text-center shadow-lg">
                    ▼ ENTRA NA CAIXA (T1:E3) E SE DIVIDE EM CÓPIAS ▼
                  </div>
                  <div className="w-0.5 h-8 bg-[#c89d54]" />
                </div>

                {/* RIGHT BRANCH: JASON 5 (TWIN MAX SURVIVED / WORLD 27) & NATIVE JASON OF WORLD 31 */}
                <div className="flex flex-col items-center px-2 order-3">
                  <div className="hidden lg:block w-0.5 h-6 bg-[#c89d54]" />
                  <div className="px-2.5 py-1 bg-[#071510] border border-emerald-400/50 text-[9px] font-mono text-emerald-300 uppercase tracking-wider mb-2 text-center">
                    RAMO C: Outros Jasons Nativos (Sem Caixa)
                  </div>
                  <div className="w-0.5 h-4 bg-emerald-400/60" />

                  {!getVariant('jason-5') && !getVariant('jason-nativo-31') ? (
                    <div className="p-4 bg-[#06080c] border border-white/10 text-center max-w-[260px]">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block">
                        🔒 PROTEÇÃO ANTI-SPOILER
                      </span>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Jasons nativos de outros mundos são revelados a partir do Episódio T1:E6.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-[330px]">
                      {['jason-5', 'jason-nativo-31'].map((id) => {
                        const v = getVariant(id);
                        if (!v) return null;
                        const isDead = v.status === 'Morto';
                        return (
                          <button
                            key={id}
                            onClick={() => onSelectVariant(v.id)}
                            className={`group p-3 bg-[#070d0b] border flex flex-col items-center text-center transition ${
                              isDead
                                ? 'border-rose-500/50 hover:border-rose-400'
                                : 'border-emerald-400/50 hover:border-emerald-300'
                            }`}
                          >
                            <div className="relative mb-2">
                              <img
                                src={v.avatarUrl}
                                alt={v.designation}
                                referrerPolicy="no-referrer"
                                className={`w-12 h-12 rounded-full object-cover border-2 ${
                                  isDead ? 'border-rose-500 grayscale-[35%]' : 'border-emerald-400'
                                }`}
                              />
                              <span
                                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.2 font-mono text-[9px] font-bold whitespace-nowrap ${
                                  isDead ? 'bg-rose-600 text-white' : 'bg-emerald-400 text-[#030305]'
                                }`}
                              >
                                {v.badgeNumber}
                              </span>
                            </div>
                            <div className="font-display text-xs text-white uppercase">
                              {v.designation.split(' (')[0]}
                            </div>
                            <div
                              className={`text-[9px] font-mono mt-0.5 ${
                                isDead ? 'text-rose-300' : 'text-emerald-300'
                              }`}
                            >
                              {isDead ? '💀 MORTO AOS 16 ANOS (W31)' : 'EM PAZ COM MAX (W27)'}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* LEVEL 2: CHILDREN OF JASON 1 */}
              {!getVariant('jason-3') &&
              !getVariant('jason-4') &&
              !getVariant('jason-6') &&
              !getVariant('jason-13') ? (
                <div className="px-6 py-4 bg-[#07090f] border border-[#c89d54]/40 text-center max-w-lg">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c89d54] block">
                    🔒 PROTEÇÃO ANTI-SPOILER ATIVA
                  </span>
                  <p className="text-xs text-stone-300 mt-1">
                    Até este episódio, <strong className="text-white">Jason 1</strong> ainda não gerou ramificações visíveis no Corredor Quântico (as cópias começam a aparecer a partir de <strong className="text-[#e6c885]">T1:E4</strong>).
                  </p>
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-0 relative">
                  {/* Horizontal Tree Bar connecting the 4 child branches on xl */}
                  <div className="hidden xl:block absolute top-0 left-[12.5%] right-[12.5%] h-0.5 bg-[#c89d54]" />

                {/* CHILD BRANCH 1: JASON 1 SURVIVOR & JASON 4 / JASON 7 */}
                <div className="flex flex-col items-center px-2">
                  <div className="hidden xl:block w-0.5 h-6 bg-[#c89d54]" />
                  <div className="px-2 py-1 bg-[#141008] border border-[#c89d54]/60 text-[9px] font-mono text-[#e6c885] text-center uppercase mb-2">
                    1. Protagonista & Sobreviventes
                  </div>
                  <div className="w-0.5 h-4 bg-[#c89d54]" />
                  <div className="space-y-2 w-full max-w-[230px]">
                    <button
                      onClick={() => onSelectVariant('jason-1')}
                      className="w-full p-3 bg-[#090b10] border border-[#c89d54] text-center hover:bg-[#141008] transition"
                    >
                      <span className="px-2 py-0.5 bg-[#c89d54] text-[#030305] font-mono text-[10px] font-bold">
                        J1 (PROTAGONISTA)
                      </span>
                      <div className="font-display text-xs text-white uppercase mt-1.5">
                        Jason 1 no Mundo Low-Tech
                      </div>
                      <p className="text-[10px] text-stone-400 mt-1">
                        Dopa MacNamara X (T2:E4) e reencontra Jason 2 (T2:E7).
                      </p>
                    </button>

                    <div className="grid grid-cols-2 gap-1.5">
                      {['jason-4', 'jason-7'].map((id) => {
                        const v = getVariant(id);
                        if (!v) return null;
                        return (
                          <button
                            key={id}
                            onClick={() => onSelectVariant(v.id)}
                            className="p-2 bg-[#090b10] border border-amber-500/40 hover:border-amber-400 flex flex-col items-center text-center transition"
                          >
                            <span className="px-1.5 py-0.1 bg-amber-500 text-[#030305] font-mono text-[9px] font-bold">
                              {v.badgeNumber}
                            </span>
                            <div className="text-[10px] font-bold text-white mt-1 truncate w-full">
                              {v.alias}
                            </div>
                            <div className="text-[8px] font-mono text-amber-300">
                              Sobrevivente T1
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* CHILD BRANCH 2: THE TREE BRANCH ACCIDENT IN THE BOX (J13 vs J34) */}
                <div className="flex flex-col items-center px-2">
                  <div className="hidden xl:block w-0.5 h-6 bg-[#c89d54]" />
                  <div className="px-2 py-1 bg-[#1a0f0a] border border-amber-400/70 text-[9px] font-mono text-amber-300 text-center uppercase">
                    2. Acidente do Galho (Mundo 28 — T2:E8)
                  </div>
                  <div className="w-0.5 h-4 bg-amber-400" />

                  <div className="w-full grid grid-cols-2 relative pt-0">
                    <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-amber-400" />

                    {/* J13 */}
                    <div className="flex flex-col items-center pr-1">
                      <div className="w-0.5 h-4 bg-rose-400" />
                      {(() => {
                        const v = getVariant('jason-13');
                        if (!v) return null;
                        return (
                          <button
                            onClick={() => onSelectVariant(v.id)}
                            className="w-full p-2.5 bg-[#090b10] border border-rose-500/60 hover:border-rose-400 flex flex-col items-center text-center transition"
                          >
                            <img
                              src={v.avatarUrl}
                              alt={v.designation}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-full object-cover border border-rose-400 mb-1"
                            />
                            <span className="px-1.5 py-0.1 bg-rose-500 text-white font-mono text-[9px] font-bold">
                              J13 (PRESO R1)
                            </span>
                            <div className="text-[10px] font-bold text-white mt-1">
                              Sua Amanda Morre
                            </div>
                            <div className="text-[9px] text-stone-400 mt-0.5">
                              Interrogado por Mitchel 1
                            </div>
                          </button>
                        );
                      })()}
                    </div>

                    {/* J34 */}
                    <div className="flex flex-col items-center pl-1">
                      <div className="w-0.5 h-4 bg-emerald-400" />
                      {(() => {
                        const v = getVariant('jason-34');
                        if (!v) return null;
                        return (
                          <button
                            onClick={() => onSelectVariant(v.id)}
                            className="w-full p-2.5 bg-[#090b10] border border-emerald-400/70 hover:border-emerald-300 flex flex-col items-center text-center transition"
                          >
                            <img
                              src={v.avatarUrl}
                              alt={v.designation}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-full object-cover border border-emerald-400 mb-1"
                            />
                            <span className="px-1.5 py-0.1 bg-emerald-400 text-[#030305] font-mono text-[9px] font-bold">
                              J34 (SANTUÁRIO)
                            </span>
                            <div className="text-[10px] font-bold text-white mt-1">
                              Amanda 7 Salva!
                            </div>
                            <div className="text-[9px] text-stone-400 mt-0.5">
                              Socorrida por Laurel (W32)
                            </div>
                          </button>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* CHILD BRANCH 3: PEACE AT MOTHER ELLIE'S HOUSE (J24 & J30/31) */}
                <div className="flex flex-col items-center px-2">
                  <div className="hidden xl:block w-0.5 h-6 bg-[#c89d54]" />
                  <div className="px-2 py-1 bg-[#071510] border border-emerald-400/60 text-[9px] font-mono text-emerald-300 text-center uppercase">
                    3. Casa da Mãe Ellie (Mundo 31 — T2:E5)
                  </div>
                  <div className="w-0.5 h-4 bg-emerald-400" />

                  <div className="w-full grid grid-cols-2 relative">
                    <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-emerald-400" />

                    {['jason-24', 'jason-30'].map((id) => {
                      const v = getVariant(id);
                      if (!v) return null;
                      return (
                        <div key={id} className="flex flex-col items-center px-1">
                          <div className="w-0.5 h-4 bg-emerald-400" />
                          <button
                            onClick={() => onSelectVariant(v.id)}
                            className="w-full p-2.5 bg-[#090b10] border border-emerald-500/50 hover:border-emerald-300 flex flex-col items-center text-center transition"
                          >
                            <img
                              src={v.avatarUrl}
                              alt={v.designation}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-full object-cover border border-emerald-400 mb-1"
                            />
                            <span className="px-1.5 py-0.1 bg-emerald-400 text-[#030305] font-mono text-[9px] font-bold">
                              {v.badgeNumber}
                            </span>
                            <div className="text-[10px] font-bold text-white mt-1 truncate w-full">
                              {v.alias}
                            </div>
                            <div className="text-[9px] text-stone-400 mt-0.5">
                              Vive com Ellie (W31)
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CHILD BRANCH 4: DECEASED & INVADING JASONS (T1:E8–E9 & T2:E1) */}
                <div className="flex flex-col items-center px-2">
                  <div className="hidden xl:block w-0.5 h-6 bg-[#c89d54]" />
                  <div className="px-2 py-1 bg-[#1a090d] border border-rose-500/70 text-[9px] font-mono text-rose-300 text-center uppercase">
                    4. 💀 Jasons Mortos (T1:E8–E9 & T2:E1)
                  </div>
                  <div className="w-0.5 h-4 bg-rose-500" />

                  <div className="grid grid-cols-2 gap-1.5 w-full">
                    {[
                      'jason-stalker-29',
                      'jason-morgue-r1',
                      'jason-3',
                      'jason-6',
                      'jason-8',
                    ].map((id) => {
                      const v = getVariant(id);
                      if (!v) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => onSelectVariant(v.id)}
                          className={`p-2 bg-[#0c0608] border border-rose-500/50 hover:border-rose-400 flex flex-col items-center text-center transition ${
                            id === 'jason-stalker-29' ? 'col-span-2' : ''
                          }`}
                        >
                          <span className="px-1.5 py-0.1 bg-rose-600 text-white font-mono text-[9px] font-bold">
                            💀 {v.badgeNumber}
                          </span>
                          <div className="text-[10px] font-bold text-white mt-1 truncate w-full">
                            {v.designation.split(' (')[0]}
                          </div>
                          <div className="text-[8px] font-mono text-rose-300 truncate w-full">
                            {v.alias}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              )}
            </div>
          )}

          {/* ===============================================================
              2. TRUE VISUAL TREE FOR AMANDA, RYAN, LEIGHTON, BLAIR, OR MACNAMARA
          =============================================================== */}
          {treeFamily !== 'JASON' && (
            <div className="w-full flex flex-col items-center py-4">
              {/* Root Node */}
              <div className="px-6 py-3 bg-[#141008] border-2 border-[#c89d54] text-center max-w-xl">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#c89d54] block">
                  RAIZ DA LINHAGEM & CONTRAPARTES NO MULTIVERSO
                </span>
                <div className="font-display text-lg text-white uppercase tracking-wider mt-0.5">
                  {treeFamily === 'AMANDA'
                    ? 'AMANDA LUCAS (4 VARIANTES — INCLUINDO A MORTA NO GALHO)'
                    : treeFamily === 'RYAN'
                    ? 'RYAN HOLDER (3 VARIANTES — INCLUINDO RYAN 3 MORTO NA PRAGA)'
                    : treeFamily === 'LEIGHTON'
                    ? 'LEIGHTON VANCE (3 VARIANTES)'
                    : treeFamily === 'BLAIR'
                    ? 'BLAIR CAPLAN (3 VARIANTES — INCLUINDO A MORTA PELAS VESPAS)'
                    : 'MITCHEL MACNAMARA (R1 vs. WORLD X), DANIELA, CHARLIE & LAUREL'}
                </div>
              </div>

              <div className="w-0.5 h-8 bg-[#c89d54]" />

              {(() => {
                const familyList = variants.filter((v) => {
                  if (treeFamily === 'AMANDA') return v.baseCharacter === 'Amanda Lucas';
                  if (treeFamily === 'RYAN') return v.baseCharacter === 'Ryan Holder';
                  if (treeFamily === 'LEIGHTON') return v.baseCharacter === 'Leighton Vance';
                  if (treeFamily === 'BLAIR') return v.baseCharacter === 'Blair Caplan';
                  return (
                    v.baseCharacter === 'Laurel & Agentes' ||
                    v.baseCharacter === 'Daniela & Charlie'
                  );
                });

                const gridCols =
                  familyList.length >= 5
                    ? 'md:grid-cols-3 xl:grid-cols-5'
                    : familyList.length === 4
                    ? 'md:grid-cols-2 xl:grid-cols-4'
                    : 'md:grid-cols-3';

                return (
                  <div className={`w-full grid grid-cols-1 ${gridCols} gap-5 md:gap-3 relative`}>
                    <div className="hidden md:block absolute top-0 left-[10%] right-[10%] h-0.5 bg-[#c89d54]" />

                    {familyList.map((v) => {
                      const isDead = v.status === 'Morto';
                      const orig = getWorld(v.originWorldId);
                      return (
                        <div key={v.id} className="flex flex-col items-center px-2">
                          <div
                            className={`hidden md:block w-0.5 h-8 ${
                              isDead ? 'bg-rose-500' : 'bg-[#c89d54]'
                            }`}
                          />
                          <button
                            onClick={() => onSelectVariant(v.id)}
                            className={`w-full max-w-[280px] p-4 bg-[#07090f] border flex flex-col items-center text-center transition ${
                              isDead
                                ? 'border-rose-500/60 hover:border-rose-400 bg-[#0d0608]'
                                : 'border-[#c89d54]/60 hover:border-[#c89d54]'
                            }`}
                          >
                            <div className="relative mb-3">
                              <img
                                src={v.avatarUrl}
                                alt={v.designation}
                                referrerPolicy="no-referrer"
                                className={`w-16 h-16 rounded-full object-cover border-2 ${
                                  isDead
                                    ? 'border-rose-500 grayscale-[35%]'
                                    : 'border-[#c89d54]'
                                }`}
                              />
                              <span
                                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 font-mono text-[10px] font-bold whitespace-nowrap ${
                                  isDead
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-[#c89d54] text-[#030305]'
                                }`}
                              >
                                {isDead ? `💀 ${v.badgeNumber}` : v.badgeNumber}
                              </span>
                            </div>

                            <span
                              className={`text-[9px] font-mono uppercase px-2 py-0.5 mb-1.5 border ${
                                isDead
                                  ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                                  : 'bg-white/5 text-[#e6c885] border-[#c89d54]/30'
                              }`}
                            >
                              {v.status} • ORIGEM: {orig?.code}
                            </span>

                            <div className="font-display text-sm text-white uppercase">
                              {v.designation}
                            </div>
                            <div className="text-[10px] font-mono text-[#c89d54] mt-0.5 mb-2">
                              {v.alias}
                            </div>
                            <p className="text-xs text-stone-300 leading-relaxed">
                              <RichText text={v.shortRole} />
                            </p>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
