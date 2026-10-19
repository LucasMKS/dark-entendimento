import React, { useState, useMemo } from 'react';
import {
  WORLDS as INITIAL_WORLDS,
  VARIANTS as INITIAL_VARIANTS,
  JOURNEYS,
  World,
  CharacterVariant
} from './data/multiverseData';
import { QuantumConnectionsMap } from './components/QuantumConnectionsMap';
import { MultiverseGraph } from './components/MultiverseGraph';
import { PodcastAndUpdaterTab } from './components/PodcastAndUpdaterTab';
import {
  Globe2,
  Users,
  Compass,
  Radio,
  Search,
  ArrowRight,
  X,
  ChevronRight,
  Network,
  Box,
  MapPin
} from 'lucide-react';

type ActiveTab = 'CONNECTIONS' | 'WORLDS' | 'VARIANTS' | 'CORRIDOR' | 'PODCAST';

export function App() {
  const [worlds, setWorlds] = useState<World[]>(INITIAL_WORLDS);
  const [variants, setVariants] = useState<CharacterVariant[]>(INITIAL_VARIANTS);
  const [activeTab, setActiveTab] = useState<ActiveTab>('CONNECTIONS');

  // Filters for Worlds
  const [worldSearch, setWorldSearch] = useState('');
  const [worldCategoryFilter, setWorldCategoryFilter] = useState<string>('ALL');
  const [worldSeasonFilter, setWorldSeasonFilter] = useState<string>('ALL');

  // Filters for Variants
  const [variantSearch, setVariantSearch] = useState('');
  const [baseCharFilter, setBaseCharFilter] = useState<string>('ALL');

  // Slide-over Drawer state
  const [selectedWorldId, setSelectedWorldId] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  const getWorldById = (id: string) => worlds.find((w) => w.id === id);
  const getVariantById = (id: string) => variants.find((v) => v.id === id);

  const filteredWorlds = useMemo(() => {
    return worlds.filter((w) => {
      const matchesSearch =
        w.name.toLowerCase().includes(worldSearch.toLowerCase()) ||
        w.code.toLowerCase().includes(worldSearch.toLowerCase()) ||
        w.shortHook.toLowerCase().includes(worldSearch.toLowerCase()) ||
        w.officialOrFanName.toLowerCase().includes(worldSearch.toLowerCase());

      const matchesCategory =
        worldCategoryFilter === 'ALL' || w.category === worldCategoryFilter;

      const matchesSeason =
        worldSeasonFilter === 'ALL' ||
        (worldSeasonFilter === '1' && (w.season === 1 || w.season === '1 & 2')) ||
        (worldSeasonFilter === '2' && (w.season === 2 || w.season === '1 & 2'));

      return matchesSearch && matchesCategory && matchesSeason;
    });
  }, [worlds, worldSearch, worldCategoryFilter, worldSeasonFilter]);

  const filteredVariants = useMemo(() => {
    return variants.filter((v) => {
      const matchesSearch =
        v.designation.toLowerCase().includes(variantSearch.toLowerCase()) ||
        v.badgeNumber.toLowerCase().includes(variantSearch.toLowerCase()) ||
        v.shortRole.toLowerCase().includes(variantSearch.toLowerCase()) ||
        v.alias.toLowerCase().includes(variantSearch.toLowerCase());

      const matchesBase =
        baseCharFilter === 'ALL' || v.baseCharacter === baseCharFilter;

      return matchesSearch && matchesBase;
    });
  }, [variants, variantSearch, baseCharFilter]);

  const baseCharacters = useMemo(() => {
    const counts = new Map<string, number>();
    variants.forEach((v) => {
      counts.set(v.baseCharacter, (counts.get(v.baseCharacter) || 0) + 1);
    });
    return Array.from(counts.entries());
  }, [variants]);

  const handleOpenWorldDetail = (worldId: string) => {
    setSelectedVariantId(null);
    setSelectedWorldId(worldId);
  };

  const handleOpenVariantDetail = (variantId: string) => {
    setSelectedWorldId(null);
    setSelectedVariantId(variantId);
  };

  const selectedWorld = selectedWorldId ? getWorldById(selectedWorldId) : null;
  const selectedVariant = selectedVariantId ? getVariantById(selectedVariantId) : null;

  const getHabitabilityBadge = (hab: World['habitability']) => {
    switch (hab) {
      case 'Refúgio Seguro':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';
      case 'Habitável':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40';
      case 'Quarentena / Crítico':
        return 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/40';
      default:
        return 'bg-rose-500/20 text-rose-300 border-rose-400/40';
    }
  };

  const getStatusBadge = (status: CharacterVariant['status']) => {
    switch (status) {
      case 'Estabelecido em Paz':
      case 'No Santuário':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Morto':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Preso (DARPA)':
        return 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30';
      default:
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30';
    }
  };

  const getAccentBadge = (color: CharacterVariant['accentColor']) => {
    switch (color) {
      case 'amber':
        return 'border-indigo-400 bg-gradient-to-r from-indigo-500 to-violet-600 text-white';
      case 'cyan':
        return 'border-cyan-400 bg-cyan-400 text-slate-950';
      case 'emerald':
        return 'border-emerald-400 bg-emerald-400 text-slate-950';
      case 'violet':
        return 'border-violet-400 bg-violet-500 text-white';
      case 'rose':
        return 'border-rose-400 bg-rose-500 text-white';
      default:
        return 'border-sky-400 bg-sky-400 text-slate-950';
    }
  };

  return (
    <div className="min-h-screen bg-[#05070e] bg-quantum-grid text-slate-100 flex flex-col relative selection:bg-indigo-500/30">
      {/* Subtle Ambient Quantum Auras (Indigo, Violet & Cyan — Zero Yellow) */}
      <div className="pointer-events-none fixed -top-24 left-1/4 w-[650px] h-[450px] bg-indigo-600/10 rounded-full blur-[150px]" />
      <div className="pointer-events-none fixed top-1/3 right-1/4 w-[550px] h-[400px] bg-violet-600/8 rounded-full blur-[150px]" />
      <div className="pointer-events-none fixed bottom-0 right-1/3 w-[600px] h-[420px] bg-cyan-500/8 rounded-full blur-[150px]" />

      {/* Top Navigation Bar — Sleek Glassmorphic Widescreen */}
      <header className="sticky top-0 z-30 backdrop-blur-2xl bg-[#05070e]/80 border-b border-white/[0.08]">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/25 border border-white/20">
              <Box className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-indigo-100 to-cyan-200 bg-clip-text text-transparent">
                  MATÉRIA ESCURA
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  Atlas Quântico • Apple TV+
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Mundos, Variantes (Jason 1 a 34, Amanda 7...) e Conexões Oficiais da Série
              </p>
            </div>
          </div>

          {/* Navigation Pills */}
          <nav className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-white/[0.08] shadow-inner">
            {[
              { id: 'CONNECTIONS', label: 'Mapa de Ligações', icon: Network },
              { id: 'WORLDS', label: 'Mundos', count: worlds.length, icon: Globe2 },
              { id: 'VARIANTS', label: 'Personagens & Variantes', count: variants.length, icon: Users },
              { id: 'CORRIDOR', label: 'Linha do Tempo', icon: Compass },
              { id: 'PODCAST', label: 'Podcast & Sincronização', icon: Radio }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 border border-white/15'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content — Widescreen max-w-[1720px] */}
      <main className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 flex-1 relative z-10">
        {/* ==================== TAB 0: VISUAL CONNECTIONS MAP ==================== */}
        {activeTab === 'CONNECTIONS' && (
          <QuantumConnectionsMap
            worlds={worlds}
            variants={variants}
            onSelectWorld={handleOpenWorldDetail}
            onSelectVariant={handleOpenVariantDetail}
          />
        )}

        {/* ==================== TAB 1: WORLDS GALLERY (4 COLUMNS WIDESCREEN) ==================== */}
        {activeTab === 'WORLDS' && (
          <div className="space-y-8">
            <div className="glass-panel border border-indigo-500/20 rounded-[28px] p-6 lg:p-8 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Galeria Oficial de Mundos ({filteredWorlds.length})
                  </h2>
                  <p className="text-sm text-slate-300/90 mt-1">
                    Frames reais capturados dos episódios da Apple TV+ (via Fandom Wiki). Clique em qualquer mundo para abrir o dossiê.
                  </p>
                </div>

                {/* Search & Season */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 sm:w-72">
                    <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={worldSearch}
                      onChange={(e) => setWorldSearch(e.target.value)}
                      placeholder="Buscar mundo (ex: Low-Tech, Laurel, World 26)..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-slate-950/90 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 transition"
                    />
                  </div>

                  <div className="inline-flex rounded-xl bg-slate-950/90 p-1 border border-white/10">
                    {[
                      { id: 'ALL', label: 'Todas' },
                      { id: '1', label: 'Temp 1' },
                      { id: '2', label: 'Temp 2' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setWorldSeasonFilter(s.id)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                          worldSeasonFilter === s.id
                            ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'ALL', label: 'Todos os Mundos' },
                  { id: 'Root', label: 'Mundos Principais / Low-Tech' },
                  { id: 'Sanctuary', label: 'Santuários & Refúgios' },
                  { id: 'Utopian', label: 'Utopias' },
                  { id: 'Apocalyptic', label: 'Pós-Apocalípticos' },
                  { id: 'Hostile', label: 'Hostis' },
                  { id: 'Industrial', label: 'Industriais (Velocity / Pirâmide)' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setWorldCategoryFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                      worldCategoryFilter === cat.id
                        ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                        : 'bg-slate-950/80 text-slate-300 border border-white/10 hover:border-indigo-400/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Widescreen 4-Column Worlds Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWorlds.map((world) => {
                const visitorVariants = world.visitors
                  .map((id) => getVariantById(id))
                  .filter(Boolean) as CharacterVariant[];

                return (
                  <div
                    key={world.id}
                    onClick={() => handleOpenWorldDetail(world.id)}
                    className="group cursor-pointer rounded-3xl glass-card border border-white/[0.08] hover:border-indigo-400/60 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/15 hover:-translate-y-1"
                  >
                    <div>
                      {/* Official Series Screenshot */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                        <img
                          src={world.imageUrl}
                          alt={world.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/25 to-transparent" />

                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-950/85 text-indigo-300 backdrop-blur-md border border-indigo-400/30">
                            {world.code}
                          </span>
                          <span className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-slate-950/80 text-slate-200 backdrop-blur-md border border-white/10">
                            {world.episodes[0]}
                          </span>
                        </div>

                        <span
                          className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md ${getHabitabilityBadge(
                            world.habitability
                          )}`}
                        >
                          {world.habitability}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 pt-3.5">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug mb-1.5">
                          {world.name}
                        </h3>
                        <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-2">
                          {world.shortHook}
                        </p>
                      </div>
                    </div>

                    {/* Stacked Visitor Avatars */}
                    <div className="px-5 pb-5 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {visitorVariants.slice(0, 4).map((v) => (
                            <div
                              key={v.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenVariantDetail(v.id);
                              }}
                              title={v.designation}
                              className="relative inline-block hover:z-20 hover:scale-110 transition"
                            >
                              <img
                                src={v.avatarUrl}
                                alt={v.designation}
                                referrerPolicy="no-referrer"
                                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#0b1120]"
                              />
                              <span className="absolute -bottom-1 -right-1 px-1 rounded text-[8px] font-bold bg-indigo-500 text-white">
                                {v.badgeNumber}
                              </span>
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-slate-400 font-medium pl-1">
                          {world.visitors.length} viajantes
                        </span>
                      </div>

                      <span className="text-xs font-semibold text-indigo-300 group-hover:text-cyan-300 group-hover:translate-x-1 transition flex items-center gap-1">
                        Explorar <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== TAB 2: CHARACTERS & VARIANTS (4 COLUMNS WIDESCREEN) ==================== */}
        {activeTab === 'VARIANTS' && (
          <div className="space-y-8">
            <div className="glass-panel border border-indigo-500/20 rounded-[28px] p-6 lg:p-8 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Personagens & Variantes Numeradas ({filteredVariants.length})
                  </h2>
                  <p className="text-sm text-slate-300/90 mt-1">
                    Retratos oficiais da série. Identifique cada variante (Jason 1 a 34, Amanda 1, 2 e 7, Ryan 1 a 3, Leighton 1, 2 e 6).
                  </p>
                </div>

                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={variantSearch}
                    onChange={(e) => setVariantSearch(e.target.value)}
                    placeholder="Buscar J34, Amanda 7, Low-Tech..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-slate-950/90 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setBaseCharFilter('ALL')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                    baseCharFilter === 'ALL'
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                      : 'bg-slate-950/80 text-slate-300 border border-white/10 hover:border-indigo-400/50'
                  }`}
                >
                  <span>Todas as Variantes</span>
                  <span className="opacity-75">({variants.length})</span>
                </button>
                {baseCharacters.map(([charName, count]) => (
                  <button
                    key={charName}
                    onClick={() => setBaseCharFilter(charName)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                      baseCharFilter === charName
                        ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                        : 'bg-slate-950/80 text-slate-300 border border-white/10 hover:border-indigo-400/50'
                    }`}
                  >
                    <span>{charName}</span>
                    <span className="opacity-75">({count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Widescreen 4-Column Variant Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVariants.map((variant) => {
                const originWorld = getWorldById(variant.originWorldId);
                const currentWorld = getWorldById(variant.currentWorldId);

                return (
                  <div
                    key={variant.id}
                    onClick={() => handleOpenVariantDetail(variant.id)}
                    className="group cursor-pointer rounded-3xl glass-card border border-white/[0.08] hover:border-indigo-400/60 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/15 hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3.5">
                          <div className="relative shrink-0">
                            <img
                              src={variant.avatarUrl}
                              alt={variant.designation}
                              referrerPolicy="no-referrer"
                              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 group-hover:border-indigo-400 transition"
                            />
                            <span
                              className={`absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-lg text-xs font-extrabold shadow ${getAccentBadge(
                                variant.accentColor
                              )}`}
                            >
                              {variant.badgeNumber}
                            </span>
                          </div>

                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300 block">
                              {variant.baseCharacter} • Temp {variant.seasonIntroduced}
                            </span>
                            <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition leading-snug">
                              {variant.designation}
                            </h3>
                            <p className="text-xs text-slate-400">{variant.alias}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span
                          className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border mb-2.5 ${getStatusBadge(
                            variant.status
                          )}`}
                        >
                          {variant.status}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-200/95 leading-relaxed">
                          {variant.shortRole}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/[0.08]">
                      <div className="bg-slate-950/80 border border-white/[0.08] rounded-2xl p-3 flex items-center justify-between gap-2 text-xs">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (originWorld) handleOpenWorldDetail(originWorld.id);
                          }}
                          className="truncate flex-1 hover:opacity-80"
                        >
                          <span className="text-[10px] text-slate-400 block">Nasceu em:</span>
                          <span className="font-semibold text-indigo-300 truncate block">
                            {originWorld ? originWorld.code : variant.originWorldId}
                          </span>
                        </div>

                        <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />

                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (currentWorld) handleOpenWorldDetail(currentWorld.id);
                          }}
                          className="truncate flex-1 text-right hover:opacity-80"
                        >
                          <span className="text-[10px] text-slate-400 block">Está agora em:</span>
                          <span className="font-semibold text-cyan-300 truncate block">
                            {currentWorld ? currentWorld.name.split(' (')[0] : variant.currentWorldId}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">
                          Passou por <strong className="text-white">{variant.worldsVisited.length} mundos</strong>
                        </span>
                        <span className="font-semibold text-indigo-300 group-hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition">
                          Ver Jornada <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: CORRIDOR ==================== */}
        {activeTab === 'CORRIDOR' && (
          <MultiverseGraph
            worlds={worlds}
            variants={variants}
            journeys={JOURNEYS}
            onSelectWorld={handleOpenWorldDetail}
            onSelectVariant={handleOpenVariantDetail}
          />
        )}

        {/* ==================== TAB 4: PODCAST ==================== */}
        {activeTab === 'PODCAST' && (
          <PodcastAndUpdaterTab
            worlds={worlds}
            variants={variants}
            onAddWorld={(newWorld) => setWorlds((prev) => [...prev, newWorld])}
            onAddVariant={(newVar) => setVariants((prev) => [...prev, newVar])}
          />
        )}
      </main>

      {/* ==================== SLIDE-OVER DRAWER: WORLD DETAIL ==================== */}
      {selectedWorld && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-end transition-opacity"
          onClick={() => setSelectedWorldId(null)}
        >
          <div
            className="bg-[#0b101d] border-l border-white/15 w-full max-w-2xl h-full overflow-y-auto shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="relative h-64 w-full bg-slate-950">
                <img
                  src={selectedWorld.imageUrl}
                  alt={selectedWorld.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b101d] via-[#0b101d]/40 to-transparent" />

                <button
                  onClick={() => setSelectedWorldId(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-indigo-500 transition backdrop-blur-md border border-white/15"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-500 text-white">
                      {selectedWorld.code}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getHabitabilityBadge(
                        selectedWorld.habitability
                      )}`}
                    >
                      {selectedWorld.habitability}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white leading-tight">
                    {selectedWorld.name}
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Nome na Fandom Wiki: {selectedWorld.officialOrFanName}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3">
                    Quem Visitou Este Mundo ({selectedWorld.visitors.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedWorld.visitors.map((vId) => {
                      const v = getVariantById(vId);
                      if (!v) return null;
                      return (
                        <button
                          key={vId}
                          onClick={() => handleOpenVariantDetail(vId)}
                          className="p-2.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-white/10 hover:border-indigo-400/50 flex items-center gap-3 text-left transition"
                        >
                          <div className="relative shrink-0">
                            <img
                              src={v.avatarUrl}
                              alt={v.designation}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="absolute -bottom-1 -right-1 px-1.5 rounded text-[9px] font-bold bg-indigo-500 text-white">
                              {v.badgeNumber}
                            </span>
                          </div>
                          <div className="truncate">
                            <div className="text-xs font-bold text-white truncate">
                              {v.designation.split(' (')[0]}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {v.alias}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    O Que Acontece Neste Mundo
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {selectedWorld.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-xs">
                  <div>
                    <span className="text-indigo-300 font-semibold block mb-1">
                      Atmosfera & Clima:
                    </span>
                    <span className="text-slate-200">{selectedWorld.atmosphere}</span>
                  </div>
                  <div>
                    <span className="text-cyan-300 font-semibold block mb-1">
                      Onde fica a Caixa:
                    </span>
                    <span className="text-slate-200">{selectedWorld.boxLocation}</span>
                  </div>
                </div>

                {selectedWorld.podcastInsight && (
                  <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-400/30">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 mb-1">
                      <Radio className="w-4 h-4" />
                      Explicação no Podcast Oficial / Wiki
                    </div>
                    <p className="text-xs text-indigo-100/90 leading-relaxed">
                      {selectedWorld.podcastInsight}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SLIDE-OVER DRAWER: VARIANT DETAIL ==================== */}
      {selectedVariant && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-end transition-opacity"
          onClick={() => setSelectedVariantId(null)}
        >
          <div
            className="bg-[#0b101d] border-l border-white/15 w-full max-w-2xl h-full overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={selectedVariant.avatarUrl}
                    alt={selectedVariant.designation}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-400 shadow-lg"
                  />
                  <span
                    className={`absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-lg text-xs font-extrabold shadow ${getAccentBadge(
                      selectedVariant.accentColor
                    )}`}
                  >
                    {selectedVariant.badgeNumber}
                  </span>
                </div>
                <div>
                  <span
                    className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border mb-1.5 ${getStatusBadge(
                      selectedVariant.status
                    )}`}
                  >
                    {selectedVariant.status}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    {selectedVariant.designation}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedVariant.alias} • Intérprete: {selectedVariant.actor}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedVariantId(null)}
                className="p-2 rounded-full bg-slate-950 text-slate-300 hover:bg-indigo-500 hover:text-white transition border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(() => {
                const orig = getWorldById(selectedVariant.originWorldId);
                return (
                  <div
                    onClick={() => orig && handleOpenWorldDetail(orig.id)}
                    className="cursor-pointer p-3.5 rounded-2xl bg-slate-950/90 border border-indigo-500/35 hover:border-indigo-400 transition"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block mb-1">
                      1. Mundo de Origem
                    </span>
                    <div className="text-sm font-bold text-white">
                      {orig ? orig.name : selectedVariant.originWorldId}
                    </div>
                  </div>
                );
              })()}

              {(() => {
                const curr = getWorldById(selectedVariant.currentWorldId);
                return (
                  <div
                    onClick={() => curr && handleOpenWorldDetail(curr.id)}
                    className="cursor-pointer p-3.5 rounded-2xl bg-slate-950/90 border border-cyan-500/35 hover:border-cyan-400 transition"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 block mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      2. Localização Atual
                    </span>
                    <div className="text-sm font-bold text-white">
                      {curr ? curr.name : selectedVariant.currentWorldId}
                    </div>
                  </div>
                );
              })()}
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
                História Completa desta Variante
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedVariant.storyArc}
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-xs">
              <div>
                <span className="font-bold text-indigo-300 block mb-0.5">
                  Como Diferenciar Visualmente:
                </span>
                <p className="text-slate-300">{selectedVariant.visualTraits}</p>
              </div>
              <div>
                <span className="font-bold text-cyan-300 block mb-0.5">
                  De Onde Surgiu Esta Ramificação:
                </span>
                <p className="text-slate-300">{selectedVariant.branchOriginExplanation}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Rota de Mundos Visitados ({selectedVariant.worldsVisited.length})
              </h4>
              <div className="space-y-2">
                {selectedVariant.worldsVisited.map((wId, idx) => {
                  const w = getWorldById(wId);
                  if (!w) return null;
                  return (
                    <button
                      key={`${wId}-${idx}`}
                      onClick={() => handleOpenWorldDetail(wId)}
                      className="w-full p-2.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-white/10 hover:border-indigo-400/50 flex items-center justify-between text-left transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <img
                          src={w.imageUrl}
                          alt={w.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{w.name}</div>
                          <div className="text-[10px] text-slate-400">{w.code}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
