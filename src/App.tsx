import React, { useState, useMemo, useEffect, useRef } from 'react';
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
import { DragScrollContainer } from './components/DragScrollContainer';
import { RichText } from './components/RichText';
import {
  Search,
  ArrowRight,
  ArrowLeft,
  X,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Radio,
  SlidersHorizontal
} from 'lucide-react';

type ActiveTab = 'CONNECTIONS' | 'WORLDS' | 'VARIANTS' | 'CORRIDOR' | 'PODCAST';

interface DrawerHistoryItem {
  type: 'WORLD' | 'VARIANT';
  id: string;
}

interface EpisodeGuideItem {
  season: number;
  ep: string;
  title: string;
  date: string;
  focus: string;
  released?: boolean;
}

const INITIAL_EPISODE_GUIDE: EpisodeGuideItem[] = [
  { season: 1, ep: 'T1:E1', title: 'Are You Happy in Your Life?', date: '08/05/2024', focus: 'Reality 01 & Sequestro de Jason 1 por Jason 2', released: true },
  { season: 1, ep: 'T1:E2', title: 'Trip of a Lifetime', date: '08/05/2024', focus: 'Reality 02 (Velocity Labs) & Descoberta da Caixa', released: true },
  { season: 1, ep: 'T1:E3', title: 'The Box', date: '15/05/2024', focus: 'Fuga de Jason 1 & Amanda 2 pelo Corredor Quântico', released: true },
  { season: 1, ep: 'T1:E4', title: 'The Corridor', date: '22/05/2024', focus: 'Mundo Cinzas (W03), Velocity R3 (W06) & Nevasca (W15)', released: true },
  { season: 1, ep: 'T1:E5', title: 'Worldless', date: '29/05/2024', focus: 'Mundo Submerso (W18), Vespas (W19) & Pandemia (W20)', released: true },
  { season: 1, ep: 'T1:E6', title: 'Superposition', date: '05/06/2024', focus: 'Ryan 1 deixado na Utopia (W26) & Caixa Lacrada (W22)', released: true },
  { season: 1, ep: 'T1:E7', title: 'In the Fires of Dead Stars', date: '12/06/2024', focus: 'Sol Gigante (W25), Despedida de Amanda 2 (W26) & Max Vivo (W27)', released: true },
  { season: 1, ep: 'T1:E8', title: 'Jupiter', date: '19/06/2024', focus: 'Convergência na Reality 01, Chat "Jason9" & Morte de Jason 6', released: true },
  { season: 1, ep: 'T1:E9', title: 'Entanglement', date: '26/06/2024', focus: 'Cerco à Cabana (Morte de J8) & Fuga dos Dessen para o Mundo 29', released: true },
  { season: 2, ep: 'T2:E1', title: 'A Quiet Life', date: '28/08/2026', focus: 'Daniela mata Jason Invasor (W29); Agente Mitchel MacNamara (R1) interroga J13', released: true },
  { season: 2, ep: 'T2:E2', title: 'A Perfect World', date: '04/09/2026', focus: 'Chegada ao Mundo Low-Tech (W30); Sheila & Mitchel MacNamara (World X)', released: true },
  { season: 2, ep: 'T2:E3', title: 'Everything Beautiful, Everything Terrible', date: '11/09/2026', focus: 'Ryan 1 e Amanda 2 no Motel Milshire (W30); trauma do galho de J13', released: true },
  { season: 2, ep: 'T2:E4', title: 'Stars, Hide Your Fires', date: '18/09/2026', focus: 'Quarentena da Íris Negra (Morte de Ryan 3 em W26); J1 tranca Mitchel 2 na Caixa', released: true },
  { season: 2, ep: 'T2:E5', title: 'Love and Be Loved', date: '25/09/2026', focus: 'Jason 24, 30 e 31 acolhidos pela mãe Ellie e Maria no Mundo 31', released: true },
  { season: 2, ep: 'T2:E6', title: 'What the Universe Is Made Of', date: '02/10/2026', focus: 'Daniela na cabana com Gabriel; Blair 2 e Leighton 2 diante da Pirâmide', released: true },
  { season: 2, ep: 'T2:E7', title: 'The Pyramid', date: '09/10/2026', focus: 'A Pirâmide (74 mundos); Charlie 1 e Daniela 1 entram na Caixa; J2 bate à porta de J1', released: true },
  { season: 2, ep: 'T2:E8', title: 'The Basic Oneness of Everything', date: '16/10/2026 (ÚLTIMO LANÇADO)', focus: 'Santuário de Laurel (W32): como Jason 34 salvou Amanda 7 do galho; chegada de Charlie 1', released: true },
  { season: 2, ep: 'T2:E9', title: 'How to Build the Box (EM BREVE)', date: 'Estreia: 23/10/2026', focus: 'Próximo episódio oficial da 2ª temporada (Apple TV+)', released: false },
  { season: 2, ep: 'T2:E10', title: 'No Quiet Life (SEASON FINALE — EM BREVE)', date: 'Estreia: 30/10/2026', focus: 'Episódio final da 2ª temporada (Apple TV+)', released: false },
];

const DarkAtmosphericCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const motes = Array.from({ length: 55 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.4 + 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.x < 0) m.x = w;
        if (m.x > w) m.x = 0;
        if (m.y < 0) m.y = h;
        if (m.y > h) m.y = 0;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 157, 84, ${m.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-80" />;
};

export function App() {
  const [worlds, setWorlds] = useState<World[]>(INITIAL_WORLDS);
  const [variants, setVariants] = useState<CharacterVariant[]>(INITIAL_VARIANTS);
  const [episodeGuide] = useState<EpisodeGuideItem[]>(INITIAL_EPISODE_GUIDE);
  const [activeTab, setActiveTab] = useState<ActiveTab>('CONNECTIONS');

  // Dark Netflix Episode / Season Selector State
  const [globalSeasonScope, setGlobalSeasonScope] = useState<'ALL' | '1' | '2'>('ALL');
  const [selectedEpisodeCode, setSelectedEpisodeCode] = useState<string>('ALL');
  const [isEpisodeModalOpen, setIsEpisodeModalOpen] = useState(false);

  // Global Quick Search
  const [globalQuery, setGlobalQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filters for Worlds Tab (O Corredor)
  const [worldSearch, setWorldSearch] = useState('');
  const [worldCategoryFilter, setWorldCategoryFilter] = useState<string>('ALL');

  // Filters for Variants Tab
  const [variantSearch, setVariantSearch] = useState('');
  const [baseCharFilter, setBaseCharFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Non-blocking Right-Hand Editorial Dossier Panel (dark.netflix.io style!)
  const [selectedWorldId, setSelectedWorldId] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1280) {
      return null;
    }
    return 'jason-1';
  });
  const [drawerHistory, setDrawerHistory] = useState<DrawerHistoryItem[]>([]);

  // Chronological Episode Ranking (Anti-Spoiler "Onde Você Está?" System like dark.netflix.io)
  const EPISODE_ORDER = [
    'T1:E1', 'T1:E2', 'T1:E3', 'T1:E4', 'T1:E5', 'T1:E6', 'T1:E7', 'T1:E8', 'T1:E9',
    'T2:E1', 'T2:E2', 'T2:E3', 'T2:E4', 'T2:E5', 'T2:E6', 'T2:E7', 'T2:E8', 'T2:E9', 'T2:E10'
  ];

  const getEpisodeRank = (epCode: string): number => {
    const idx = EPISODE_ORDER.indexOf(epCode);
    return idx === -1 ? 999 : idx;
  };

  // Canonical First Appearance & Death Episode per Variant (prevents future spoilers!)
  const VARIANT_PROGRESSION: Record<string, { firstEp: string; deathEp?: string }> = {
    // T1:E1 — Reality 01 & Abduction to Reality 02
    'jason-1': { firstEp: 'T1:E1' },
    'jason-2': { firstEp: 'T1:E1' },
    'daniela-1': { firstEp: 'T1:E1' },
    'charlie-1': { firstEp: 'T1:E1' },
    'ryan-1': { firstEp: 'T1:E1' },
    'amanda-2': { firstEp: 'T1:E1' },
    'leighton-2': { firstEp: 'T1:E1' },
    // T1:E2 — Trip of a Lifetime (Velocity Labs & Reality 01)
    'ryan-2': { firstEp: 'T1:E2' },
    'blair-2': { firstEp: 'T1:E2' },
    'leighton-1': { firstEp: 'T1:E2' },
    // T1:E3 — The Box
    'blair-1': { firstEp: 'T1:E3' },
    // T1:E4 — The Corridor (Snow World 15 & Velocity R3 World 6)
    'jason-3': { firstEp: 'T1:E4', deathEp: 'T1:E4' },
    'ryan-3': { firstEp: 'T1:E4', deathEp: 'T2:E4' }, // Alive in T1:E4..T2:E3, dies in T2:E4!
    'leighton-6': { firstEp: 'T1:E4' },
    // T1:E5 — Worldless (Wasp World 19 & Plague World 20)
    'jason-4': { firstEp: 'T1:E5' },
    'blair-19-dead': { firstEp: 'T1:E5', deathEp: 'T1:E5' },
    // T1:E6 — Superposition
    'jason-5': { firstEp: 'T1:E6' },
    // T1:E7 — In the Fires of Dead Stars
    'amanda-1': { firstEp: 'T1:E7' },
    // T1:E8 — Jupiter (Mass Convergence of Jasons in Reality 01)
    'jason-6': { firstEp: 'T1:E8', deathEp: 'T1:E8' },
    'jason-7': { firstEp: 'T1:E8' },
    // T1:E9 — Entanglement (Season 1 Finale)
    'jason-8': { firstEp: 'T1:E9', deathEp: 'T1:E9' },
    'jason-morgue-r1': { firstEp: 'T1:E9', deathEp: 'T1:E9' },
    // T2:E1 — A Quiet Life (Season 2 Premiere)
    'jason-13': { firstEp: 'T2:E1' },
    'mitchel-1': { firstEp: 'T2:E1' },
    'jason-stalker-29': { firstEp: 'T2:E1', deathEp: 'T2:E1' },
    'amanda-j13': { firstEp: 'T2:E1', deathEp: 'T2:E1' },
    // T2:E2 — A Perfect World (Low-Tech World 30)
    'mitchel-2': { firstEp: 'T2:E2' },
    // T2:E5 — Love and Be Loved (Ellie's House World 31)
    'jason-24': { firstEp: 'T2:E5' },
    'jason-30': { firstEp: 'T2:E5' },
    'jason-nativo-31': { firstEp: 'T2:E5', deathEp: 'T2:E5' },
    // T2:E7 & T2:E8 — The Pyramid & The Basic Oneness of Everything (Laurel's Sanctuary World 32)
    'laurel-1': { firstEp: 'T2:E7' },
    'jason-34': { firstEp: 'T2:E8' },
    'amanda-7': { firstEp: 'T2:E8' },
  };

  // Maximum unlocked episode rank based on user selection
  const maxUnlockedRank = useMemo(() => {
    if (selectedEpisodeCode !== 'ALL') {
      return getEpisodeRank(selectedEpisodeCode);
    }
    if (globalSeasonScope === '1') {
      return getEpisodeRank('T1:E9');
    }
    return 999;
  }, [selectedEpisodeCode, globalSeasonScope]);

  // Visible variant IDs up to the selected episode/season
  const unlockedVariantIds = useMemo(() => {
    const set = new Set<string>();
    variants.forEach((v) => {
      const prog = VARIANT_PROGRESSION[v.id];
      const firstRank = prog ? getEpisodeRank(prog.firstEp) : v.seasonIntroduced === 1 ? 0 : 9;
      if (globalSeasonScope === '2' && selectedEpisodeCode === 'ALL') {
        set.add(v.id);
        return;
      }
      if (firstRank <= maxUnlockedRank) {
        set.add(v.id);
      }
    });
    return set;
  }, [variants, maxUnlockedRank, globalSeasonScope, selectedEpisodeCode]);

  const scopedWorlds = useMemo(() => {
    return worlds
      .filter((w) => {
        if (selectedEpisodeCode !== 'ALL') {
          // Show worlds that have already appeared up to and including the selected episode
          const earliestEpRank = Math.min(...w.episodes.map(getEpisodeRank));
          return earliestEpRank <= maxUnlockedRank;
        }
        if (globalSeasonScope === '1') {
          return w.season === 1 || w.season === '1 & 2';
        }
        if (globalSeasonScope === '2') {
          return w.season === 2 || w.season === '1 & 2';
        }
        return true;
      })
      .map((w) => ({
        ...w,
        // Hide future variants from visitors/residents lists of unlocked worlds
        visitors: w.visitors.filter((id) => unlockedVariantIds.has(id)),
        residents: w.residents.filter((id) => unlockedVariantIds.has(id)),
      }));
  }, [worlds, globalSeasonScope, selectedEpisodeCode, maxUnlockedRank, unlockedVariantIds]);

  const unlockedWorldIds = useMemo(
    () => new Set(scopedWorlds.map((w) => w.id)),
    [scopedWorlds]
  );

  const scopedVariants = useMemo(() => {
    return variants
      .filter((v) => unlockedVariantIds.has(v.id))
      .map((v) => {
        const prog = VARIANT_PROGRESSION[v.id];
        const deathRank = prog?.deathEp ? getEpisodeRank(prog.deathEp) : null;

        // Prevent spoiling future deaths (e.g., ryan-3 is alive in T1:E4..T2:E3 and only dies in T2:E4)
        const dynamicStatus =
          v.status === 'Morto' && deathRank !== null && deathRank > maxUnlockedRank
            ? ('Ativo / Em Jornada' as const)
            : v.status;

        // Filter visited worlds to only worlds unlocked up to the selected episode
        const visitedUpToNow = v.worldsVisited.filter((wId) => unlockedWorldIds.has(wId));
        const safeVisited =
          visitedUpToNow.length > 0 ? visitedUpToNow : [v.originWorldId];
        const dynamicCurrentWorldId = unlockedWorldIds.has(v.currentWorldId)
          ? maxUnlockedRank < 999
            ? safeVisited[safeVisited.length - 1]
            : v.currentWorldId
          : safeVisited[safeVisited.length - 1];

        return {
          ...v,
          status: dynamicStatus,
          worldsVisited: safeVisited,
          currentWorldId: dynamicCurrentWorldId,
        };
      });
  }, [variants, unlockedVariantIds, unlockedWorldIds, maxUnlockedRank]);

  const scopedJourneys = useMemo(() => {
    return JOURNEYS.filter((j) => {
      if (selectedEpisodeCode !== 'ALL') {
        return getEpisodeRank(j.episode) <= maxUnlockedRank;
      }
      if (globalSeasonScope === '1') return j.season === 1;
      if (globalSeasonScope === '2') return j.season === 2;
      return true;
    });
  }, [selectedEpisodeCode, globalSeasonScope, maxUnlockedRank]);

  const getWorldById = (id: string) =>
    scopedWorlds.find((w) => w.id === id) || worlds.find((w) => w.id === id);
  const getVariantById = (id: string) =>
    scopedVariants.find((v) => v.id === id) || variants.find((v) => v.id === id);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsEpisodeModalOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredWorlds = useMemo(() => {
    return scopedWorlds.filter((w) => {
      const matchesSearch =
        w.name.toLowerCase().includes(worldSearch.toLowerCase()) ||
        w.code.toLowerCase().includes(worldSearch.toLowerCase()) ||
        w.shortHook.toLowerCase().includes(worldSearch.toLowerCase()) ||
        w.officialOrFanName.toLowerCase().includes(worldSearch.toLowerCase());
      const matchesCategory =
        worldCategoryFilter === 'ALL' || w.category === worldCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [scopedWorlds, worldSearch, worldCategoryFilter]);

  const filteredVariants = useMemo(() => {
    return scopedVariants.filter((v) => {
      const matchesSearch =
        v.designation.toLowerCase().includes(variantSearch.toLowerCase()) ||
        v.badgeNumber.toLowerCase().includes(variantSearch.toLowerCase()) ||
        v.shortRole.toLowerCase().includes(variantSearch.toLowerCase()) ||
        v.alias.toLowerCase().includes(variantSearch.toLowerCase());
      const matchesBase =
        baseCharFilter === 'ALL' || v.baseCharacter === baseCharFilter;
      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'DECEASED' && v.status === 'Morto') ||
        (statusFilter === 'ACTIVE' && v.status === 'Ativo / Em Jornada') ||
        (statusFilter === 'PEACE' &&
          (v.status === 'Estabelecido em Paz' || v.status === 'No Santuário')) ||
        (statusFilter === 'DARPA' && v.status === 'Preso (DARPA)');
      return matchesSearch && matchesBase && matchesStatus;
    });
  }, [scopedVariants, variantSearch, baseCharFilter, statusFilter]);

  const statusCounts = useMemo(() => {
    return {
      deceased: scopedVariants.filter((v) => v.status === 'Morto').length,
      active: scopedVariants.filter((v) => v.status === 'Ativo / Em Jornada').length,
      peace: scopedVariants.filter(
        (v) => v.status === 'Estabelecido em Paz' || v.status === 'No Santuário'
      ).length,
      darpa: scopedVariants.filter((v) => v.status === 'Preso (DARPA)').length,
    };
  }, [scopedVariants]);

  const baseCharacters = useMemo(() => {
    const counts = new Map<string, number>();
    scopedVariants.forEach((v) => {
      counts.set(v.baseCharacter, (counts.get(v.baseCharacter) || 0) + 1);
    });
    return Array.from(counts.entries());
  }, [scopedVariants]);

  const quickSearchResults = useMemo(() => {
    const q = globalQuery.trim().toLowerCase();
    if (!q) return { matchedWorlds: [], matchedVariants: [] };
    return {
      matchedWorlds: scopedWorlds
        .filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.code.toLowerCase().includes(q) ||
            w.officialOrFanName.toLowerCase().includes(q)
        )
        .slice(0, 5),
      matchedVariants: scopedVariants
        .filter(
          (v) =>
            v.designation.toLowerCase().includes(q) ||
            v.badgeNumber.toLowerCase().includes(q) ||
            v.alias.toLowerCase().includes(q)
        )
        .slice(0, 6),
    };
  }, [globalQuery, scopedWorlds, scopedVariants]);

  const handleOpenWorldDetail = (worldId: string) => {
    if (selectedVariantId) {
      setDrawerHistory((prev) => [...prev, { type: 'VARIANT', id: selectedVariantId }]);
    } else if (selectedWorldId && selectedWorldId !== worldId) {
      setDrawerHistory((prev) => [...prev, { type: 'WORLD', id: selectedWorldId }]);
    }
    setSelectedVariantId(null);
    setSelectedWorldId(worldId);
  };

  const handleOpenVariantDetail = (variantId: string) => {
    if (selectedWorldId) {
      setDrawerHistory((prev) => [...prev, { type: 'WORLD', id: selectedWorldId }]);
    } else if (selectedVariantId && selectedVariantId !== variantId) {
      setDrawerHistory((prev) => [...prev, { type: 'VARIANT', id: selectedVariantId }]);
    }
    setSelectedWorldId(null);
    setSelectedVariantId(variantId);
  };

  const handleDrawerBack = () => {
    const last = drawerHistory[drawerHistory.length - 1];
    if (!last) return;
    setDrawerHistory((prev) => prev.slice(0, -1));
    if (last.type === 'WORLD') {
      setSelectedVariantId(null);
      setSelectedWorldId(last.id);
    } else {
      setSelectedWorldId(null);
      setSelectedVariantId(last.id);
    }
  };

  const handleCloseDrawer = () => {
    setSelectedWorldId(null);
    setSelectedVariantId(null);
    setDrawerHistory([]);
  };

  const selectedWorld = selectedWorldId ? getWorldById(selectedWorldId) : null;
  const selectedVariant = selectedVariantId ? getVariantById(selectedVariantId) : null;
  const isDossierOpen = Boolean(selectedWorld || selectedVariant);

  // Lock body scroll on mobile when modal or dossier is open to prevent background bleed / movement
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1280;
    if ((isMobile && isDossierOpen) || isEpisodeModalOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDossierOpen, isEpisodeModalOpen, isSearchOpen]);

  // Unified active world in Tab II (O Corredor) — independent cycle on mobile so it doesn't hijack the screen
  const [corridorFocusedWorldId, setCorridorFocusedWorldId] = useState<string | null>(null);

  const activeCorridorWorld = useMemo(() => {
    if (corridorFocusedWorldId) {
      const found = getWorldById(corridorFocusedWorldId);
      if (found) return found;
    }
    if (selectedWorldId) {
      const found = getWorldById(selectedWorldId);
      if (found) return found;
    }
    return filteredWorlds[0] || worlds[0];
  }, [corridorFocusedWorldId, selectedWorldId, filteredWorlds, worlds]);

  const handleStepCorridorWorld = (dir: 'PREV' | 'NEXT') => {
    const list = filteredWorlds.length > 0 ? filteredWorlds : worlds;
    if (list.length === 0) return;
    const currentIdx = list.findIndex((w) => w.id === activeCorridorWorld?.id);
    const nextIdx =
      dir === 'NEXT'
        ? (currentIdx + 1) % list.length
        : (currentIdx - 1 + list.length) % list.length;
    const nextWorld = list[nextIdx];
    setCorridorFocusedWorldId(nextWorld.id);
    if (typeof window !== 'undefined' && window.innerWidth >= 1280) {
      handleOpenWorldDetail(nextWorld.id);
    }
  };

  return (
    <div className="min-h-screen bg-dark-vignette bg-architectural-grid text-[#e8e4dc] flex flex-col relative selection:bg-[#c89d54]/30">
      <DarkAtmosphericCanvas />

      {/* =====================================================================
          MINIMALIST ARCHITECTURAL HUD BAR (AUTHENTIC DARK.NETFLIX.IO HEADER)
      ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#030305]/95 backdrop-blur-xl border-b border-[#c89d54]/30">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Minimalist DARK Typographic Wordmark + Episode Filter Trigger */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <button
              onClick={() => setActiveTab('CONNECTIONS')}
              className="text-left group flex items-center gap-2.5 sm:gap-3"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#c89d54] flex items-center justify-center relative shrink-0">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#c89d54] group-hover:scale-125 transition" />
              </div>
              <div>
                <span className="font-display text-sm sm:text-lg tracking-[0.28em] sm:tracking-[0.38em] text-white uppercase block leading-none">
                  DARK MATTER
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] text-[#c89d54] uppercase block mt-0.5 sm:mt-1">
                  GUIA DO MULTIVERSO
                </span>
              </div>
            </button>

            <div className="hidden md:block h-7 w-px bg-[#c89d54]/25" />

            {/* Desktop Episode Filter Trigger */}
            <button
              onClick={() => setIsEpisodeModalOpen(true)}
              className="hidden md:flex items-center gap-2.5 px-3 py-1.5 bg-[#08090e] hover:bg-[#141108] border border-[#c89d54]/40 transition text-left"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#c89d54]" />
              <div>
                <span className="text-[8px] font-mono uppercase tracking-[0.22em] text-stone-400 block">
                  ONDE VOCÊ ESTÁ NA SÉRIE?
                </span>
                <span className="text-[11px] font-mono font-bold text-[#e6c885] uppercase tracking-wider">
                  {selectedEpisodeCode !== 'ALL'
                    ? `FILTRO: ${selectedEpisodeCode}`
                    : globalSeasonScope === 'ALL'
                    ? 'TEMPORADAS 1 & 2 (COMPLETO)'
                    : `TEMPORADA ${globalSeasonScope}`}
                </span>
              </div>
            </button>
          </div>

          {/* Center: Desktop Drag-to-Scroll Roman Numeral Chapters */}
          <div className="hidden md:flex items-center h-full">
            <DragScrollContainer className="flex items-center h-full">
              {[
                { id: 'CONNECTIONS', roman: 'I', label: 'A TEIA QUÂNTICA' },
                { id: 'WORLDS', roman: 'II', label: `O CORREDOR (${scopedWorlds.length})` },
                { id: 'VARIANTS', roman: 'III', label: `AS VARIANTES (${scopedVariants.length})` },
                { id: 'CORRIDOR', roman: 'IV', label: 'CRONOLOGIA DE SALTOS' },
                { id: 'PODCAST', roman: 'V', label: 'LEIS DA CAIXA' },
              ].map((item) => {
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ActiveTab)}
                    className={`h-full px-3 sm:px-5 flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] uppercase whitespace-nowrap border-b-2 transition-all ${
                      active
                        ? 'border-[#c89d54] text-white bg-[#c89d54]/[0.07] font-bold'
                        : 'border-transparent text-stone-400 hover:text-[#e6c885]'
                    }`}
                  >
                    <span className="text-[#c89d54]">{item.roman}.</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </DragScrollContainer>
          </div>

          {/* Right: Search & Mobile Episode Trigger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Mobile Episode Filter Trigger */}
            <button
              onClick={() => setIsEpisodeModalOpen(true)}
              className="flex md:hidden items-center gap-1.5 px-2.5 py-1.5 bg-[#08090e] hover:bg-[#141108] border border-[#c89d54]/40 transition text-left"
              title="Onde você está na série?"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#c89d54]" />
              <span className="text-[10px] font-mono font-bold text-[#e6c885] uppercase tracking-wider">
                {selectedEpisodeCode !== 'ALL'
                  ? selectedEpisodeCode
                  : globalSeasonScope === 'ALL'
                  ? 'T1/T2'
                  : `T${globalSeasonScope}`}
              </span>
            </button>

            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-2.5 sm:px-3 py-1.5 bg-[#08090e] hover:bg-[#141108] border border-[#c89d54]/35 text-xs font-mono text-stone-300 hover:text-[#e6c885] flex items-center gap-2 transition"
              title="Buscar no Multiverso"
            >
              <Search className="w-3.5 h-3.5 text-[#c89d54]" />
              <span className="hidden sm:inline uppercase tracking-wider text-[10px]">
                Buscar
              </span>
              <kbd className="hidden lg:inline text-[9px] px-1 bg-white/5 text-stone-400">
                Ctrl+K
              </kbd>
            </button>
          </div>
        </div>

        {/* Mobile Dedicated Horizontal Tab Strip (MD:HIDDEN) */}
        <div className="md:hidden border-t border-[#c89d54]/30 bg-[#030305] px-2 py-1.5 shadow-md">
          <DragScrollContainer className="flex items-center gap-1.5 overflow-x-auto touch-pan-x">
            {[
              { id: 'CONNECTIONS', roman: 'I', label: 'TEIA' },
              { id: 'WORLDS', roman: 'II', label: `CORREDOR (${scopedWorlds.length})` },
              { id: 'VARIANTS', roman: 'III', label: `VARIANTES (${scopedVariants.length})` },
              { id: 'CORRIDOR', roman: 'IV', label: 'SALTOS' },
              { id: 'PODCAST', roman: 'V', label: 'LEIS' },
            ].map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase whitespace-nowrap border transition-all ${
                    active
                      ? 'bg-[#c89d54] text-[#030305] border-[#c89d54] font-bold shadow-[0_0_12px_rgba(200,157,84,0.3)]'
                      : 'bg-[#07080d] text-stone-400 border-white/10 hover:text-white'
                  }`}
                >
                  <span className={active ? 'text-[#030305] mr-1' : 'text-[#c89d54] mr-1'}>
                    {item.roman}.
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </DragScrollContainer>
        </div>
      </header>

      {/* =====================================================================
          SPLIT-SCREEN SPATIAL WORKSPACE
      ===================================================================== */}
      <div className="flex-1 flex relative z-10 max-w-[1920px] w-full mx-auto">
        {/* LEFT / CENTER STAGE */}
        <main
          className={`flex-1 min-w-0 px-4 sm:px-8 py-6 transition-all duration-300 ${
            isDossierOpen ? 'xl:pr-6' : ''
          }`}
        >
          {/* ==================== CHAPTER I: CONSTELLATION WEB ==================== */}
          {activeTab === 'CONNECTIONS' && (
            <QuantumConnectionsMap
              worlds={scopedWorlds}
              variants={scopedVariants}
              selectedVariantId={selectedVariantId}
              selectedWorldId={selectedWorldId}
              onSelectWorld={handleOpenWorldDetail}
              onSelectVariant={handleOpenVariantDetail}
            />
          )}

          {/* ==================== CHAPTER II: O CORREDOR (UNIFIED, ZERO DUPLICATION!) ==================== */}
          {activeTab === 'WORLDS' && (
            <div className="space-y-8">
              {/* Top Header & Unified Filter Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#c89d54]/25 pb-4">
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex flex-col items-center justify-center w-11 h-11 border border-[#c89d54]/40 bg-[#07080c] text-[#c89d54] font-display text-sm">
                    <span>II</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c89d54]">
                      EXPLORADOR DE PORTAS • TODAS AS REALIDADES CATALOGADAS
                    </div>
                    <h2 className="font-display text-xl sm:text-3xl text-white uppercase tracking-[0.12em] mt-0.5">
                      O Corredor Quântico ({filteredWorlds.length} Mundos)
                    </h2>
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative w-full lg:w-80">
                  <Search className="w-3.5 h-3.5 text-[#c89d54] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={worldSearch}
                    onChange={(e) => setWorldSearch(e.target.value)}
                    placeholder="Buscar mundo (ex: Low-Tech, Laurel, Reality 2)..."
                    className="w-full pl-9 pr-3 py-2 bg-[#050609] border border-[#c89d54]/35 text-xs text-white focus:outline-none focus:border-[#c89d54]"
                  />
                </div>
              </div>

              {/* Drag-to-Scroll Category Filter Strip */}
              <DragScrollContainer className="flex items-center gap-2 pb-1">
                {[
                  { id: 'ALL', label: 'TODAS AS PORTAS' },
                  { id: 'Root', label: 'MUNDOS RAIZ & LOW-TECH' },
                  { id: 'Sanctuary', label: 'SANTUÁRIOS & REFÚGIOS' },
                  { id: 'Utopian', label: 'UTOPIAS' },
                  { id: 'Apocalyptic', label: 'PÓS-APOCALÍPTICOS' },
                  { id: 'Hostile', label: 'HOSTIS' },
                  { id: 'Industrial', label: 'VELOCITY LABS / PIRÂMIDE' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setWorldCategoryFilter(cat.id)}
                    className={`px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.15em] whitespace-nowrap border transition ${
                      worldCategoryFilter === cat.id
                        ? 'bg-[#c89d54] text-[#030305] border-[#c89d54] font-bold'
                        : 'bg-[#06070b] text-stone-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </DragScrollContainer>

              {/* Active Corridor Portal Banner (Synced with the Cards Below!) */}
              {activeCorridorWorld && (
                <div className="arch-box relative min-h-[260px] sm:min-h-[290px] flex flex-col justify-end p-4 sm:p-8 bg-black overflow-hidden">
                  <img
                    src={activeCorridorWorld.imageUrl}
                    alt={activeCorridorWorld.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/70 to-transparent" />
                  <div className="pointer-events-none absolute inset-4 border border-[#c89d54]/25" />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="max-w-3xl space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-[#c89d54] text-[#030305] font-mono text-xs font-bold uppercase">
                          PORTA EM DESTAQUE • {activeCorridorWorld.code}
                        </span>
                        <span className="px-2.5 py-0.5 bg-black/80 text-[#e6c885] border border-[#c89d54]/40 font-mono text-xs">
                          {activeCorridorWorld.habitability}
                        </span>
                        <span className="px-2.5 py-0.5 bg-black/80 text-stone-300 border border-white/15 font-mono text-xs">
                          Episódios: {activeCorridorWorld.episodes.join(', ')}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-[0.08em]">
                        {activeCorridorWorld.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
                        <RichText text={activeCorridorWorld.shortHook} />
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full sm:w-auto">
                      <button
                        onClick={() => handleOpenWorldDetail(activeCorridorWorld.id)}
                        className="px-4 py-2 bg-[#c89d54] text-[#030305] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#e6c885] transition flex items-center justify-center gap-1.5 shadow"
                      >
                        Abrir Dossiê Desta Porta →
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStepCorridorWorld('PREV')}
                          className="flex-1 sm:flex-initial justify-center px-3 py-2 bg-[#080a10]/90 hover:bg-[#c89d54] text-stone-200 hover:text-[#030305] border border-[#c89d54]/40 text-[10px] font-mono uppercase flex items-center gap-1 transition"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" /> Porta Ant.
                        </button>
                        <button
                          onClick={() => handleStepCorridorWorld('NEXT')}
                          className="flex-1 sm:flex-initial justify-center px-3 py-2 bg-[#080a10]/90 hover:bg-[#c89d54] text-stone-200 hover:text-[#030305] border border-[#c89d54]/40 text-[10px] font-mono uppercase flex items-center gap-1 transition"
                        >
                          Próx. Porta <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Single Unified Grid of World Cards (Clicking any card selects it in the Portal & opens its Dossier) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredWorlds.map((world) => {
                  const isSelected = activeCorridorWorld?.id === world.id;
                  const visitorVariants = world.visitors
                    .map((id) => getVariantById(id))
                    .filter(Boolean) as CharacterVariant[];

                  return (
                    <div
                      key={world.id}
                      onClick={() => handleOpenWorldDetail(world.id)}
                      className={`group cursor-pointer arch-box overflow-hidden flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'border-[#c89d54] ring-1 ring-[#c89d54]/50 shadow-[0_0_30px_rgba(200,157,84,0.25)]'
                          : 'hover:border-[#c89d54]/70'
                      }`}
                    >
                      <div>
                        <div className="relative h-44 bg-black overflow-hidden">
                          <img
                            src={world.imageUrl}
                            alt={world.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#06070b] via-transparent to-transparent" />
                          <span
                            className={`absolute top-3 left-3 px-2 py-0.5 font-mono text-[10px] font-bold ${
                              isSelected
                                ? 'bg-[#c89d54] text-[#030305]'
                                : 'bg-black/90 border border-[#c89d54]/50 text-[#e6c885]'
                            }`}
                          >
                            {world.code}
                          </span>
                          <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/85 border border-white/15 text-stone-300 font-mono text-[10px]">
                            {world.habitability}
                          </span>
                        </div>

                        <div className="p-5">
                          <h3 className="font-display text-base text-white uppercase tracking-wider group-hover:text-[#e6c885]">
                            {world.name}
                          </h3>
                          <p className="text-xs text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
                            <RichText text={world.shortHook} />
                          </p>
                        </div>
                      </div>

                      <div className="px-5 py-3 border-t border-white/[0.07] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {visitorVariants.slice(0, 4).map((v) => (
                              <img
                                key={v.id}
                                src={v.avatarUrl}
                                alt={v.designation}
                                title={v.designation}
                                referrerPolicy="no-referrer"
                                className="w-6 h-6 rounded-full object-cover ring-1 ring-[#c89d54]"
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-stone-400">
                            {world.visitors.length} viajantes
                          </span>
                        </div>

                        <span className="text-[10px] font-mono text-[#c89d54] group-hover:translate-x-1 transition font-semibold">
                          {isSelected ? 'PORTA SELECIONADA ✓' : 'ABRIR DOSSIÊ →'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================== CHAPTER III: AS VARIANTES ==================== */}
          {activeTab === 'VARIANTS' && (
            <div className="space-y-6">
              <div className="flex flex-col gap-3 border-b border-[#c89d54]/25 pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <DragScrollContainer className="flex items-center gap-1.5 pb-1">
                    <button
                      onClick={() => setBaseCharFilter('ALL')}
                      className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.15em] whitespace-nowrap border transition ${
                        baseCharFilter === 'ALL'
                          ? 'bg-[#c89d54] text-[#030305] border-[#c89d54] font-bold'
                          : 'bg-[#06070b] text-stone-400 border-white/10 hover:text-white'
                      }`}
                    >
                      TODOS OS PERSONAGENS ({scopedVariants.length})
                    </button>
                    {baseCharacters.map(([charName, count]) => (
                      <button
                        key={charName}
                        onClick={() => setBaseCharFilter(charName)}
                        className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.15em] whitespace-nowrap border transition ${
                          baseCharFilter === charName
                            ? 'bg-[#c89d54] text-[#030305] border-[#c89d54] font-bold'
                            : 'bg-[#06070b] text-stone-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {charName} ({count})
                      </button>
                    ))}
                  </DragScrollContainer>

                  <div className="relative w-full md:w-80 shrink-0">
                    <Search className="w-3.5 h-3.5 text-[#c89d54] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={variantSearch}
                      onChange={(e) => setVariantSearch(e.target.value)}
                      placeholder="Buscar Mitchel, Invasor, J34, Amanda 7..."
                      className="w-full pl-9 pr-3 py-1.5 bg-[#050609] border border-[#c89d54]/35 text-xs text-white focus:outline-none focus:border-[#c89d54]"
                    />
                  </div>
                </div>

                {/* Status Filter Bar (All / Deceased / Active / Peace / DARPA) */}
                <DragScrollContainer className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 shrink-0 mr-1">
                    FILTRAR POR STATUS:
                  </span>
                  {[
                    { id: 'ALL', label: `TODOS (${scopedVariants.length})`, style: 'gold' },
                    {
                      id: 'DECEASED',
                      label: `💀 MORTOS / BAIXAS DO MULTIVERSO (${statusCounts.deceased})`,
                      style: 'rose',
                    },
                    {
                      id: 'ACTIVE',
                      label: `ATIVOS / EM JORNADA (${statusCounts.active})`,
                      style: 'gold',
                    },
                    {
                      id: 'PEACE',
                      label: `EM PAZ / SANTUÁRIO (${statusCounts.peace})`,
                      style: 'emerald',
                    },
                    {
                      id: 'DARPA',
                      label: `PRESOS BLACK-SITE / DARPA (${statusCounts.darpa})`,
                      style: 'rose',
                    },
                  ].map((st) => {
                    const active = statusFilter === st.id;
                    return (
                      <button
                        key={st.id}
                        onClick={() => setStatusFilter(st.id)}
                        className={`px-3 py-1 text-[10px] font-mono uppercase tracking-[0.14em] whitespace-nowrap border transition ${
                          active
                            ? st.style === 'rose'
                              ? 'bg-rose-600 text-white border-rose-400 font-bold'
                              : st.style === 'emerald'
                              ? 'bg-emerald-500 text-[#030305] border-emerald-300 font-bold'
                              : 'bg-[#c89d54] text-[#030305] border-[#c89d54] font-bold'
                            : st.id === 'DECEASED'
                            ? 'bg-rose-950/35 text-rose-300 border-rose-500/40 hover:border-rose-400'
                            : 'bg-[#06070b] text-stone-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {st.label}
                      </button>
                    );
                  })}
                </DragScrollContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVariants.map((variant) => {
                  const orig = getWorldById(variant.originWorldId);
                  const curr = getWorldById(variant.currentWorldId);
                  const isSelected = selectedVariantId === variant.id;
                  const isDead = variant.status === 'Morto';

                  return (
                    <div
                      key={variant.id}
                      onClick={() => handleOpenVariantDetail(variant.id)}
                      className={`group cursor-pointer arch-box p-5 flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'border-[#c89d54] shadow-[0_0_30px_rgba(200,157,84,0.25)]'
                          : isDead
                          ? 'border-rose-500/40 hover:border-rose-400 bg-[#0a0507]/90'
                          : 'hover:border-[#c89d54]/70'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#c89d54]">
                            {variant.baseCharacter} • TEMP {variant.seasonIntroduced}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase border ${
                              isDead
                                ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                                : variant.status === 'Preso (DARPA)'
                                ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                                : variant.status === 'No Santuário' ||
                                  variant.status === 'Estabelecido em Paz'
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                                : 'bg-[#171208] text-[#e6c885] border-[#c89d54]/40'
                            }`}
                          >
                            {isDead ? '💀 MORTO' : variant.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative shrink-0">
                            <img
                              src={variant.avatarUrl}
                              alt={variant.designation}
                              referrerPolicy="no-referrer"
                              className={`w-16 h-16 rounded-full object-cover border-2 ${
                                isDead
                                  ? 'border-rose-500 grayscale-[35%]'
                                  : 'border-[#c89d54]'
                              }`}
                            />
                            <span
                              className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.2 font-mono text-[10px] font-bold whitespace-nowrap ${
                                isDead
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-[#c89d54] text-[#030305]'
                              }`}
                            >
                              {variant.badgeNumber}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-display text-base text-white uppercase tracking-wider group-hover:text-[#e6c885]">
                              {variant.designation}
                            </h3>
                            <span className="text-xs text-stone-400 font-mono block mt-0.5">
                              {variant.alias}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-stone-300 leading-relaxed mb-4">
                          <RichText text={variant.shortRole} />
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono">
                        <div>
                          <span className="text-stone-500 block">ORIGEM:</span>
                          <span className="text-[#e6c885]">{orig?.code}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#c89d54]" />
                        <div className="text-right">
                          <span className="text-stone-500 block">
                            {isDead ? 'LOCAL DA MORTE:' : 'PARADEIRO ATUAL:'}
                          </span>
                          <span className={isDead ? 'text-rose-300' : 'text-emerald-300'}>
                            {curr?.name.split(' (')[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================== CHAPTER IV: CORRIDOR TIMELINE ==================== */}
          {activeTab === 'CORRIDOR' && (
            <MultiverseGraph
              worlds={scopedWorlds}
              variants={scopedVariants}
              journeys={scopedJourneys}
              onSelectWorld={handleOpenWorldDetail}
              onSelectVariant={handleOpenVariantDetail}
            />
          )}

          {/* ==================== CHAPTER V: PODCAST & CANON RULES ==================== */}
          {activeTab === 'PODCAST' && (
            <PodcastAndUpdaterTab
              worlds={worlds}
              variants={variants}
            />
          )}
        </main>

        {/* =====================================================================
            RIGHT-HAND DOCKED EDITORIAL DOSSIER PANEL
        ===================================================================== */}
        {isDossierOpen && (
          <>
            {/* Mobile Backdrop Overlay */}
            <div
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-40 xl:hidden animate-fade-in"
              onClick={handleCloseDrawer}
            />

            <aside className="fixed xl:sticky top-0 sm:top-16 right-0 z-50 xl:z-30 h-full sm:h-[calc(100vh-4rem)] w-full sm:w-[460px] 2xl:w-[480px] bg-[#07080c] border-l border-[#c89d54]/40 overflow-y-auto overscroll-contain shadow-[-20px_0_60px_rgba(0,0,0,0.95)] shrink-0 pb-16 sm:pb-6">
              <div className="sticky top-0 z-30 bg-[#07080c] px-4 sm:px-5 py-3 border-b border-[#c89d54]/30 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2">
                  {drawerHistory.length > 0 && (
                    <button
                      onClick={handleDrawerBack}
                      className="px-2.5 py-1 bg-white/5 hover:bg-[#c89d54] text-[#e6c885] hover:text-[#030305] border border-[#c89d54]/40 text-[10px] font-mono uppercase flex items-center gap-1 transition"
                    >
                      <ArrowLeft className="w-3 h-3" /> Voltar
                    </button>
                  )}
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c89d54] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c89d54] animate-pulse" />
                    {selectedVariant ? 'DOSSIÊ DA VARIANTE' : 'DOSSIÊ DO MUNDO'}
                  </span>
                </div>

                <button
                  onClick={handleCloseDrawer}
                  className="px-3 py-1 text-stone-200 hover:text-white border border-[#c89d54]/40 hover:border-[#c89d54] bg-[#120e07] text-[11px] font-mono uppercase flex items-center gap-1.5 transition font-semibold"
                  title="Fechar Dossiê"
                >
                  <X className="w-3.5 h-3.5 text-[#c89d54]" />
                  <span>Fechar</span>
                </button>
              </div>

            {/* WORLD DOSSIER CONTENT */}
            {selectedWorld && (
              <div>
                <div className="relative h-56 bg-black">
                  <img
                    src={selectedWorld.imageUrl}
                    alt={selectedWorld.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050609] via-[#050609]/40 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 bg-[#c89d54] text-[#030305] font-mono text-[10px] font-bold">
                        {selectedWorld.code}
                      </span>
                      <span className="px-2 py-0.5 bg-black/80 text-stone-200 border border-white/15 font-mono text-[10px]">
                        {selectedWorld.habitability}
                      </span>
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl text-white uppercase tracking-wider leading-snug">
                      {selectedWorld.name}
                    </h2>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-6">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c89d54] mb-2">
                      O QUE ACONTECE NESTA REALIDADE
                    </div>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
                      <RichText text={selectedWorld.description} />
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 p-3.5 bg-[#080a10] border border-[#c89d54]/25 text-xs">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-[#c89d54] block">
                        ATMOSFERA:
                      </span>
                      <span className="text-stone-300">
                        <RichText text={selectedWorld.atmosphere} />
                      </span>
                    </div>
                    <div className="pt-2 border-t border-white/[0.06]">
                      <span className="font-mono text-[10px] uppercase text-sky-300 block">
                        ONDE FICA A CAIXA:
                      </span>
                      <span className="text-stone-300">
                        <RichText text={selectedWorld.boxLocation} />
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#e6c885] mb-3">
                      QUEM ATRAVESSOU / HABITA ESTE MUNDO (
                      {Array.from(new Set([...selectedWorld.visitors, ...selectedWorld.residents])).length})
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {Array.from(new Set([...selectedWorld.visitors, ...selectedWorld.residents])).map((vId) => {
                        const v = getVariantById(vId);
                        if (!v) return null;
                        const isDead = v.status === 'Morto';
                        return (
                          <button
                            key={vId}
                            onClick={() => handleOpenVariantDetail(vId)}
                            className="p-2.5 bg-[#080a10] hover:bg-[#141008] border border-white/10 hover:border-[#c89d54] flex items-center justify-between text-left transition"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={v.avatarUrl}
                                alt={v.designation}
                                referrerPolicy="no-referrer"
                                className={`w-10 h-10 rounded-full object-cover border ${
                                  isDead ? 'border-rose-500 grayscale-[35%]' : 'border-[#c89d54]'
                                }`}
                              />
                              <div>
                                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                  <span className="font-mono text-[#c89d54]">
                                    {v.badgeNumber}
                                  </span>
                                  <span>{v.designation.split(' (')[0]}</span>
                                  {isDead && (
                                    <span className="text-[8px] font-mono px-1 bg-rose-950 text-rose-300 border border-rose-500/40">
                                      MORTO
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-stone-400">{v.alias}</div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#c89d54]" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedWorld.podcastInsight && (
                    <div className="p-4 bg-[#120e07] border border-[#c89d54]/40">
                      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#e6c885] mb-1">
                        <Radio className="w-3.5 h-3.5 text-[#c89d54]" />
                        NOTA OFICIAL DE BLAKE CROUCH
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        <RichText text={selectedWorld.podcastInsight} />
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VARIANT DOSSIER CONTENT */}
            {selectedVariant && (
              <div className="p-5 sm:p-6 space-y-6">
                <div className="flex flex-col items-center text-center pb-5 border-b border-[#c89d54]/25">
                  <div className="relative mb-3">
                    <div className="absolute -inset-2 rounded-full border border-dashed border-[#c89d54]/45 animate-ring-rotate" />
                    <img
                      src={selectedVariant.avatarUrl}
                      alt={selectedVariant.designation}
                      referrerPolicy="no-referrer"
                      className={`w-24 h-24 rounded-full object-cover border-2 shadow-[0_0_30px_rgba(200,157,84,0.35)] ${
                        selectedVariant.status === 'Morto'
                          ? 'border-rose-500 grayscale-[35%]'
                          : 'border-[#c89d54]'
                      }`}
                    />
                    <span
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 font-mono text-xs font-extrabold whitespace-nowrap ${
                        selectedVariant.status === 'Morto'
                          ? 'bg-rose-600 text-white'
                          : 'bg-[#c89d54] text-[#030305]'
                      }`}
                    >
                      {selectedVariant.badgeNumber}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.2em] mt-2 border ${
                      selectedVariant.status === 'Morto'
                        ? 'bg-rose-950/70 text-rose-300 border-rose-500/50 font-bold'
                        : 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    {selectedVariant.status === 'Morto'
                      ? '💀 STATUS: MORTO / BAIXA CONFIRMADA'
                      : selectedVariant.status}
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl text-white uppercase tracking-wider mt-2">
                    {selectedVariant.designation}
                  </h2>
                  <p className="text-xs font-mono text-[#c89d54] mt-0.5">
                    {selectedVariant.alias} • {selectedVariant.actor}
                  </p>
                </div>

                {/* Origin vs Current World */}
                <div className="grid grid-cols-2 gap-2.5">
                  {(() => {
                    const orig = getWorldById(selectedVariant.originWorldId);
                    return (
                      <button
                        onClick={() => orig && handleOpenWorldDetail(orig.id)}
                        className="p-3 bg-[#090b10] border border-[#c89d54]/40 hover:border-[#c89d54] text-left transition"
                      >
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#c89d54] block">
                          1. ORIGEM
                        </span>
                        <div className="text-xs font-bold text-white mt-0.5 line-clamp-2">
                          {orig ? orig.name.split(' (')[0] : selectedVariant.originWorldId}
                        </div>
                      </button>
                    );
                  })()}

                  {(() => {
                    const curr = getWorldById(selectedVariant.currentWorldId);
                    const isDead = selectedVariant.status === 'Morto';
                    return (
                      <button
                        onClick={() => curr && handleOpenWorldDetail(curr.id)}
                        className={`p-3 bg-[#090b10] border text-left transition ${
                          isDead
                            ? 'border-rose-500/40 hover:border-rose-400'
                            : 'border-emerald-500/40 hover:border-emerald-400'
                        }`}
                      >
                        <span
                          className={`text-[9px] font-mono uppercase tracking-wider flex items-center gap-1 ${
                            isDead ? 'text-rose-300' : 'text-emerald-300'
                          }`}
                        >
                          <MapPin className="w-2.5 h-2.5" />{' '}
                          {isDead ? '2. LOCAL DA MORTE' : '2. PARADEIRO ATUAL'}
                        </span>
                        <div className="text-xs font-bold text-white mt-0.5 line-clamp-2">
                          {curr ? curr.name.split(' (')[0] : selectedVariant.currentWorldId}
                        </div>
                      </button>
                    );
                  })()}
                </div>

                {/* Story Arc */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c89d54] mb-1.5">
                    HISTÓRIA COMPLETA DESTA VARIANTE
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
                    <RichText text={selectedVariant.storyArc} />
                  </p>
                </div>

                {/* Visual Traits & Divergence Point */}
                <div className="p-4 bg-[#080a10] border border-white/10 space-y-3 text-xs">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#e6c885] block mb-0.5">
                      COMO RECONHECER VISUALMENTE:
                    </span>
                    <p className="text-stone-300 font-light">
                      <RichText text={selectedVariant.visualTraits} />
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-white/[0.06]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-sky-300 block mb-0.5">
                      EVENTO QUE CRIOU ESTA RAMIFICAÇÃO:
                    </span>
                    <p className="text-stone-300 font-light">
                      <RichText text={selectedVariant.branchOriginExplanation} />
                    </p>
                  </div>
                </div>

                {/* Step-by-Step Worlds Visited */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-stone-400 mb-2.5">
                    ROTA CRONOLÓGICA DE MUNDOS ({selectedVariant.worldsVisited.length})
                  </div>
                  <div className="space-y-1.5">
                    {selectedVariant.worldsVisited.map((wId, idx) => {
                      const w = getWorldById(wId);
                      if (!w) return null;
                      return (
                        <button
                          key={`${wId}-${idx}`}
                          onClick={() => handleOpenWorldDetail(wId)}
                          className="w-full p-2.5 bg-[#080a10] hover:bg-[#141008] border border-white/10 hover:border-[#c89d54] flex items-center justify-between text-left transition"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-[#c89d54] text-[#030305] font-mono font-bold text-[10px] flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <img
                              src={w.imageUrl}
                              alt={w.name}
                              referrerPolicy="no-referrer"
                              className="w-9 h-9 rounded-full object-cover border border-white/20"
                            />
                            <div>
                              <div className="text-xs font-bold text-white">
                                {w.name.split(' (')[0]}
                              </div>
                              <div className="text-[10px] font-mono text-[#c89d54]">
                                {w.code}
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#c89d54]" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Bottom Fixed Close Action Bar */}
            <div className="sticky bottom-0 z-30 p-3 bg-[#07080c] border-t border-[#c89d54]/30 xl:hidden shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
              <button
                onClick={handleCloseDrawer}
                className="w-full py-3 bg-[#171208] hover:bg-[#c89d54] border border-[#c89d54] text-[#e6c885] hover:text-[#030305] font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition shadow-lg active:scale-[0.98]"
              >
                <X className="w-4 h-4 text-[#c89d54]" />
                Fechar Dossiê e Voltar
              </button>
            </div>
          </aside>
          </>
        )}
      </div>

      {/* =====================================================================
          DARK NETFLIX EPISODE / SPOILER SELECTOR MODAL ("ONDE VOCÊ ESTÁ?")
      ===================================================================== */}
      {isEpisodeModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4"
          onClick={() => setIsEpisodeModalOpen(false)}
        >
          <div
            className="w-full max-w-4xl arch-box bg-[#07080c] p-4 sm:p-10 space-y-4 sm:space-y-6 max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#c89d54]/30 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c89d54]">
                  SELETOR DE PROGRESSO // ESTILO DARK NETFLIX
                </span>
                <h3 className="font-display text-2xl text-white uppercase tracking-[0.12em] mt-1">
                  Onde Você Está na Série?
                </h3>
              </div>
              <button
                onClick={() => setIsEpisodeModalOpen(false)}
                className="p-2 border border-white/15 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'ALL', label: 'MOSTRAR TUDO (TEMPORADAS 1 & 2 ATÉ T2:E8)' },
                { id: '1', label: 'APENAS TEMPORADA 1 (SEM SPOILERS DA T2)' },
                { id: '2', label: 'FOCO NA TEMPORADA 2' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setGlobalSeasonScope(s.id as any);
                    setSelectedEpisodeCode('ALL');
                    setIsEpisodeModalOpen(false);
                  }}
                  className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider border transition ${
                    globalSeasonScope === s.id && selectedEpisodeCode === 'ALL'
                      ? 'bg-[#c89d54] text-[#030305] border-[#c89d54] font-bold'
                      : 'bg-[#07080d] text-stone-300 border-white/15 hover:border-[#c89d54]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {episodeGuide.map((item) => {
                const active = selectedEpisodeCode === item.ep;
                const isUpcoming = item.released === false;
                return (
                  <button
                    key={item.ep}
                    onClick={() => {
                      if (isUpcoming) return;
                      setGlobalSeasonScope('ALL');
                      setSelectedEpisodeCode(active ? 'ALL' : item.ep);
                      setIsEpisodeModalOpen(false);
                    }}
                    className={`p-3.5 text-left border transition ${
                      active
                        ? 'bg-[#171208] border-[#c89d54]'
                        : isUpcoming
                        ? 'bg-[#040507] border-white/5 opacity-60 cursor-default'
                        : 'bg-[#07080d] border-white/10 hover:border-[#c89d54]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[#c89d54]">
                        {item.ep} • <span className="text-[10px] text-stone-400">{item.date}</span>
                      </span>
                      <span className="font-display text-xs text-white uppercase tracking-wider text-right">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1">{item.focus}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          GLOBAL SEARCH OVERLAY (CTRL+K)
      ===================================================================== */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-4 sm:pt-20 px-3 sm:px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl arch-box bg-[#07080c] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#c89d54]/30 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#c89d54]" />
              <input
                type="text"
                autoFocus
                value={globalQuery}
                onChange={(e) => setGlobalQuery(e.target.value)}
                placeholder="Buscar variante ou mundo (ex: Jason 34, Amanda 7, Low-Tech, Laurel)..."
                className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-stone-500"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
              {!globalQuery.trim() ? (
                <div className="flex flex-wrap gap-2">
                  {['jason-1', 'jason-2', 'jason-13', 'jason-34', 'amanda-7', 'jason-24'].map(
                    (id) => {
                      const v = getVariantById(id);
                      if (!v) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            handleOpenVariantDetail(id);
                          }}
                          className="px-3 py-1.5 bg-[#080a10] hover:bg-[#c89d54] text-stone-200 hover:text-[#030305] border border-[#c89d54]/40 text-xs font-mono transition"
                        >
                          {v.badgeNumber} • {v.designation.split(' (')[0]}
                        </button>
                      );
                    }
                  )}
                </div>
              ) : (
                <>
                  {quickSearchResults.matchedVariants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        handleOpenVariantDetail(v.id);
                      }}
                      className="w-full p-2.5 bg-[#080a10] hover:bg-[#141008] border border-white/10 hover:border-[#c89d54] flex items-center gap-3 text-left"
                    >
                      <img
                        src={v.avatarUrl}
                        alt={v.designation}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border border-[#c89d54]"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">
                          {v.badgeNumber} — {v.designation}
                        </div>
                        <div className="text-[10px] text-stone-400">{v.alias}</div>
                      </div>
                    </button>
                  ))}
                  {quickSearchResults.matchedWorlds.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        handleOpenWorldDetail(w.id);
                      }}
                      className="w-full p-2.5 bg-[#080a10] hover:bg-[#08121a] border border-white/10 hover:border-sky-400 flex items-center gap-3 text-left"
                    >
                      <img
                        src={w.imageUrl}
                        alt={w.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-9 object-cover border border-white/15"
                      />
                      <div>
                        <div className="text-[10px] font-mono text-[#c89d54]">{w.code}</div>
                        <div className="text-xs font-bold text-white">{w.name}</div>
                      </div>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
