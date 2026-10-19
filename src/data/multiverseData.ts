export type SourceBadgeType = 'EPISODE_CANON' | 'OFFICIAL_PODCAST' | 'SCRIPT_CC' | 'FANDOM_WIKI';

export interface FactSource {
  type: SourceBadgeType;
  label: string;
  detail: string;
}

export interface World {
  id: string;
  code: string;
  numberLabel: string;
  name: string;
  shortHook: string;
  officialOrFanName: string;
  season: 1 | 2 | '1 & 2';
  episodes: string[];
  category: 'Root' | 'Apocalyptic' | 'Utopian' | 'Hostile' | 'Sanctuary' | 'Industrial';
  habitability: 'Habitável' | 'Letal / Extremo' | 'Quarentena / Crítico' | 'Refúgio Seguro';
  imageUrl: string;
  themeColor: string;
  atmosphere: string;
  boxLocation: string;
  description: string;
  visitors: string[];
  residents: string[];
  podcastInsight?: string;
  sources: FactSource[];
}

export type BaseCharacterName =
  | 'Jason Dessen'
  | 'Amanda Lucas'
  | 'Ryan Holder'
  | 'Leighton Vance'
  | 'Blair Caplan'
  | 'Daniela & Charlie'
  | 'Laurel & Agentes';

export interface CharacterVariant {
  id: string;
  baseCharacter: BaseCharacterName;
  badgeNumber: string;
  designation: string;
  alias: string;
  shortRole: string;
  actor: string;
  avatarUrl: string;
  accentColor: 'amber' | 'cyan' | 'emerald' | 'violet' | 'rose' | 'blue';
  originWorldId: string;
  currentWorldId: string;
  worldsVisited: string[];
  parentVariantId?: string;
  branchEventLabel?: string;
  status:
    | 'Ativo / Em Jornada'
    | 'Estabelecido em Paz'
    | 'Morto'
    | 'Preso (DARPA)'
    | 'No Santuário';
  seasonIntroduced: 1 | 2;
  visualTraits: string;
  psychologicalProfile: string;
  storyArc: string;
  branchOriginExplanation: string;
  sources: FactSource[];
}

export interface BoxJourney {
  id: string;
  order: number;
  season: 1 | 2;
  episode: string;
  fromWorldId: string;
  toWorldId: string;
  travelers: string[];
  subconsciousTrigger: string;
  ampoulesRemaining?: number;
  outcome: string;
  podcastNote?: string;
}

export const WORLDS: World[] = [
  {
    id: 'world-prime-1',
    code: 'REALITY 01',
    numberLabel: '01',
    name: 'Mundo Original (Casa de Jason 1)',
    shortHook: 'Onde Jason escolheu o casamento com Daniela e onde 70+ Jasons convergem no final da T1.',
    officialOrFanName: 'Reality 1 / Jason 1 World (R1)',
    season: '1 & 2',
    episodes: ['T1:E1', 'T1:E2', 'T1:E6', 'T1:E8', 'T1:E9', 'T2:E1'],
    category: 'Root',
    habitability: 'Habitável',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/3/32/Abandoned_warehouse_r1.png/revision/latest?cb=20240820012601',
    themeColor: '#f59e0b',
    atmosphere: 'Chicago contemporânea padrão. Clima temperado.',
    boxLocation: 'Hangar abandonado (Abandoned Warehouse) no sul de Chicago.',
    description:
      'A realidade de origem que acompanhamos no Episódio 1. Aqui, Jason Dessen optou por ficar com Daniela quando ela engravidou dos gêmeos Charlie e Max (embora Max tenha falecido no parto). No final da 1ª temporada, mais de 70 variantes de Jason (ramificações criadas no Corredor) chegam a este mundo tentando recuperar a família.',
    visitors: [
      'jason-2',
      'jason-3',
      'jason-6',
      'jason-7',
      'jason-8',
      'jason-13',
      'jason-24',
      'jason-30',
      'ryan-2'
    ],
    residents: ['jason-1', 'daniela-1', 'charlie-1', 'ryan-1', 'blair-1', 'leighton-1', 'amanda-1', 'mitchel-2'],
    podcastInsight:
      'No Podcast Oficial, Blake Crouch explicou que todas as dezenas de Jasons que invadem este mundo saíram originalmente daqui — todos são ramificações do Jason 1 criadas pelas escolhas dele na Caixa.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E1 & T1:E9', detail: 'Início da jornada e convergência final.' },
      { type: 'FANDOM_WIKI', label: 'Wiki: Reality 1', detail: 'Foto real do hangar abandonado onde a Caixa se materializa.' }
    ]
  },
  {
    id: 'world-velocity-2',
    code: 'REALITY 02',
    numberLabel: '02',
    name: 'Mundo da Velocity Labs (Berço da Caixa)',
    shortHook: 'Onde Jason 2 trocou a família pela ciência, ganhou o Prêmio Pavia e construiu a Caixa.',
    officialOrFanName: 'Reality 2 / Jason 2 World (R2)',
    season: '1 & 2',
    episodes: ['T1:E1', 'T1:E2', 'T1:E3', 'T1:E7'],
    category: 'Industrial',
    habitability: 'Habitável',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/6/6d/Image_2024-08-07_192406104.png/revision/latest?cb=20240808022410',
    themeColor: '#06b6d4',
    atmosphere: 'Chicago hiper-tecnológica dominada pelo complexo corporativo da Velocity Labs.',
    boxLocation: 'Hangar de contenção de alta segurança na sede da Velocity Labs.',
    description:
      'O universo onde Jason 2 decidiu priorizar a pesquisa quântica em vez de casar com Daniela há 15 anos. Com o financiamento bilionário de Leighton 2, ele construiu a Caixa e a droga Lavanda. É o mundo natal de Amanda 2, Leighton 2 e Blair 2.',
    visitors: ['jason-1', 'jason-13', 'jason-24', 'jason-34'],
    residents: ['jason-2', 'amanda-2', 'leighton-2', 'blair-2'],
    podcastInsight:
      'A fotografia deste mundo usa tons frios de aço e ciano para contrastar com o calor familiar do Mundo 1.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E2 "Trip of a Lifetime"', detail: 'Jason 1 acorda na Velocity Labs.' },
      { type: 'FANDOM_WIKI', label: 'Wiki: Velocity Labs', detail: 'Imagem oficial do complexo Velocity Labs.' }
    ]
  },
  {
    id: 'world-ash',
    code: 'WORLD 03',
    numberLabel: '03',
    name: 'Mundo Cinzas ("Falling Apart / Ash World")',
    shortHook: 'Primeira porta aberta em pânico por Jason 1 e Amanda 2: Chicago em ruínas coberta de cinzas.',
    officialOrFanName: 'Falling Apart / Ash World (World 3)',
    season: 1,
    episodes: ['T1:E4'],
    category: 'Apocalyptic',
    habitability: 'Letal / Extremo',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/4/46/Falling_apart_world_3.png/revision/latest?cb=20240813053111',
    themeColor: '#ef4444',
    atmosphere: 'Céu escuro coberto por fuligem tóxica, chuva de cinzas e edifícios de Chicago desmoronando.',
    boxLocation: 'Escombros carbonizados da zona industrial.',
    description:
      'Catalogado na Wiki como "Falling Apart / Ash World" (World 3). É a primeira porta que Jason 1 e Amanda 2 abrem juntos no Corredor (T1:E4). Como estavam fugindo em pânico após o tiroteio na Velocity Labs, o medo subconsciente deles sintonizou um mundo desolado e coberto de cinzas.',
    visitors: ['jason-1', 'amanda-2', 'leighton-2'],
    residents: [],
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E4 "The Corridor"', detail: 'Primeira abertura de porta no Corredor.' },
      { type: 'FANDOM_WIKI', label: 'Wiki: Ash World', detail: 'Frame oficial de "Falling Apart (World 3)".' }
    ]
  },
  {
    id: 'world-didnt-make-it',
    code: 'WORLD 06',
    numberLabel: '06',
    name: 'Velocity Labs R3 ("Didn\'t Make It")',
    shortHook: 'Jason e Amanda abrem a porta e veem outras versões deles mesmos sendo capturadas/mortas.',
    officialOrFanName: "Didn't Make It / Velocity Labs R3",
    season: 1,
    episodes: ['T1:E4'],
    category: 'Industrial',
    habitability: 'Letal / Extremo',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/2/25/Didt_make_it_into_the_box_world_6.png/revision/latest?cb=20240816213754',
    themeColor: '#f97316',
    atmosphere: 'Interior do hangar de outra Velocity Labs durante uma falha de fuga.',
    boxLocation: 'Hangar da Velocity Labs R3.',
    description:
      'Catalogado na Wiki como "Didn\'t Make It (World 6)". No Episódio 4, Jason 1 e Amanda 2 abrem a porta e dão de cara com outro laboratório da Velocity Labs onde as versões locais de Jason e Amanda não conseguiram entrar na Caixa a tempo.',
    visitors: ['jason-1', 'amanda-2'],
    residents: [],
    sources: [
      { type: 'FANDOM_WIKI', label: "Wiki: Didn't Make It", detail: 'Frame oficial do Episódio 4.' }
    ]
  },
  {
    id: 'world-mist-monster',
    code: 'WORLD 10',
    numberLabel: '10',
    name: 'Mundo do Monstro na Névoa ("Mist Monster")',
    shortHook: 'Porta aberta para um pântano enevoado onde uma criatura colossal se move na neblina.',
    officialOrFanName: 'Mist Monster (World 10)',
    season: 1,
    episodes: ['T1:E4'],
    category: 'Hostile',
    habitability: 'Letal / Extremo',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/f/f6/Mist_monster_world_10.png/revision/latest?cb=20240816213752',
    themeColor: '#8b5cf6',
    atmosphere: 'Névoa densa habitada por megafauna/criatura desconhecida.',
    boxLocation: 'Pântano coberto de neblina.',
    description:
      'Durante a montagem de portas abertas no Episódio 4 ("The Corridor"), Jason 1 abre a porta para um mundo coberto de névoa espessa onde a silhueta de um monstro gigante aparece ao fundo.',
    visitors: ['jason-1', 'amanda-2'],
    residents: [],
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Mist Monster (World 10)', detail: 'Frame oficial da criatura na névoa.' }
    ]
  },
  {
    id: 'world-ice-blizzard',
    code: 'WORLD 15',
    numberLabel: '15',
    name: 'Chicago Congelada ("Whiteout Stranded")',
    shortHook: 'Tempestade de gelo e neve onde Amanda quase morre congelada e casas estão soterradas.',
    officialOrFanName: 'Whiteout Stranded (World 15)',
    season: 1,
    episodes: ['T1:E4'],
    category: 'Apocalyptic',
    habitability: 'Letal / Extremo',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/d/d6/World_15-buried_house.png/revision/latest?cb=20241003054945',
    themeColor: '#38bdf8',
    atmosphere: 'Nevasca perpétua em condições de whiteout, casas soterradas até o segundo andar.',
    boxLocation: 'Soterrada na neve; a porta da Caixa congela aberta.',
    description:
      'Catalogado oficialmente na Wiki como "Whiteout Stranded (World 15)". Amanda entra em pânico no Corredor e abre esta porta em meio a uma nevasca mortal. Eles caminham até a casa soterrada de Jason, e Amanda quase morre de hipotermia antes de Jason carregá-la de volta para a Caixa.',
    visitors: ['jason-1', 'amanda-2', 'leighton-2', 'jason-6'],
    residents: [],
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E4 "The Corridor"', detail: 'Sobrevivência na nevasca.' },
      { type: 'FANDOM_WIKI', label: 'Wiki: Whiteout Stranded (World 15)', detail: 'Foto oficial da casa soterrada na neve.' }
    ]
  },
  {
    id: 'world-sand-dunes',
    code: 'WORLD 17',
    numberLabel: '17',
    name: 'Mundo das Dunas de Areia ("Sand Dunes")',
    shortHook: 'Deserto varrido pelo vento aberto por Leighton 2 durante sua caçada no Corredor.',
    officialOrFanName: 'Sand Dunes (World 17)',
    season: 1,
    episodes: ['T1:E4'],
    category: 'Apocalyptic',
    habitability: 'Letal / Extremo',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/8/87/Leighton_vance2_dune_world_17.png/revision/latest?cb=20240816213751',
    themeColor: '#eab308',
    atmosphere: 'Tempestades de areia engolindo a paisagem onde ficava Chicago.',
    boxLocation: 'No meio de dunas de areia.',
    description:
      'Catalogado na Wiki como "Sand Dunes (World 17)". Mostrado quando Leighton 2 tenta navegar pela Caixa sozinho no Episódio 4 e abre uma porta para um deserto escaldante.',
    visitors: ['leighton-2'],
    residents: [],
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Sand Dunes (World 17)', detail: 'Frame oficial de Leighton 2 nas dunas.' }
    ]
  },
  {
    id: 'world-submerged',
    code: 'WORLD 18',
    numberLabel: '18',
    name: 'Mundo Submerso ("Overwhelming Pressure / Water World")',
    shortHook: 'Uma Chicago engolida pelas águas que invade a Caixa e quase afoga Jason 1 e Amanda 2.',
    officialOrFanName: 'Overwhelming Pressure / Water World (World 18)',
    season: 1,
    episodes: ['T1:E4', 'T1:E5'],
    category: 'Hostile',
    habitability: 'Letal / Extremo',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/e/ea/Drowning_water_world_18d.png/revision/latest?cb=20240816213751',
    themeColor: '#3b82f6',
    atmosphere: 'Arranha-céus de Chicago cercados por um oceano profundo e turbulento.',
    boxLocation: 'Debaixo d’água.',
    description:
      'Catalogado na Wiki como "Overwhelming Pressure / Water World (World 18)". No início do Episódio 5 ("Worldless"), Jason 1 abre a porta e a água inunda violentamente a Caixa com os prédios de Chicago visíveis ao fundo sobre as ondas.',
    visitors: ['jason-1', 'amanda-2'],
    residents: [],
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E5 "Worldless"', detail: 'Inundação súbita da Caixa.' },
      { type: 'FANDOM_WIKI', label: 'Wiki: Water World (World 18)', detail: 'Frame oficial de Chicago inundada.' }
    ]
  },
  {
    id: 'world-murder-hornets',
    code: 'WORLD 19 (R4)',
    numberLabel: '19',
    name: 'Mundo das Vespas Gigantes ("Big Wasps / Velocity Labs R4")',
    shortHook: 'Velocity Labs sob luz vermelha infestada por enxames de vespas assassinas onde Blair 2 ficou presa.',
    officialOrFanName: 'Big Wasps / Insect World / Velocity Labs R4',
    season: '1 & 2',
    episodes: ['T1:E5', 'T2:E1', 'T2:E8'],
    category: 'Hostile',
    habitability: 'Letal / Extremo',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/2/2c/Lab_video_exterior_wasps.png/revision/latest?cb=20240820012603',
    themeColor: '#eab308',
    atmosphere: 'Chicago devastada por enxames de vespas mutantes gigantes.',
    boxLocation: 'Hangar abandonado da Velocity Labs R4 iluminado em vermelho.',
    description:
      'Catalogado na Wiki como "Big Wasps / Velocity Labs R4". É o mundo onde Blair 2 ficou presa durante os testes da Velocity Labs após outra versão de Blair trazer vespas gigantes pela Caixa. Jason 1 e Amanda 2 encontram Blair 2 armada aqui no T1:E5. Na 2ª temporada, Blair 2 consegue escapar deste mundo até o Santuário de Laurel.',
    visitors: ['blair-2', 'jason-1', 'amanda-2', 'jason-8'],
    residents: [],
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E5 "Worldless" & T2:E8', detail: 'Encontro com Blair 2 e gravação das câmeras do laboratório.' },
      { type: 'FANDOM_WIKI', label: 'Wiki: Big Wasps', detail: 'Imagem real da câmera externa com as vespas.' }
    ]
  },
  {
    id: 'world-plague-pandemic',
    code: 'WORLD 20',
    numberLabel: '20',
    name: 'Mundo do Vírus Letal ("Fatal Virus")',
    shortHook: 'Realidade colapsada por uma pandemia onde Jason 1 cuida de Daniela morrendo infectada.',
    officialOrFanName: 'Fatal Virus / Pandemic World',
    season: 1,
    episodes: ['T1:E5'],
    category: 'Apocalyptic',
    habitability: 'Quarentena / Crítico',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/9/9a/Infected_daniela.png/revision/latest?cb=20240820012602',
    themeColor: '#f43f5e',
    atmosphere: 'Ruas desertas e silenciosas devastadas por um vírus mortal.',
    boxLocation: 'Zona industrial de Chicago.',
    description:
      'Catalogado na Wiki como "Fatal Virus". Jason 1 e Amanda 2 dirigem até a casa dos Dessen e descobrem que Charlie morreu e Daniela está em estado terminal devido a um vírus pandêmico.',
    visitors: ['jason-1', 'amanda-2', 'jason-4', 'ryan-3'],
    residents: [],
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E5 "Worldless"', detail: 'Despedida dolorosa da Daniela infectada.' },
      { type: 'FANDOM_WIKI', label: 'Wiki: Fatal Virus', detail: 'Frame oficial de Daniela no Episódio 5.' }
    ]
  },
  {
    id: 'world-prison-jason',
    code: 'WORLD 21',
    numberLabel: '21',
    name: 'Mundo do Jason Ex-Presidiário ("Ex-Husband Convict")',
    shortHook: 'Onde o Jason local é um criminoso violento e Daniela expulsa Jason 1 apontando uma arma.',
    officialOrFanName: 'Ex-Husband Convict',
    season: 1,
    episodes: ['T1:E5'],
    category: 'Hostile',
    habitability: 'Habitável',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/a/a9/Get_out.png/revision/latest?cb=20240821210018',
    themeColor: '#f97316',
    atmosphere: 'Chicago urbana.',
    boxLocation: 'Hangar de Chicago.',
    description:
      'Catalogado na Wiki como "Ex-Husband Convict". Quando Jason 1 bate na porta de sua casa, Daniela entra em pânico e aponta um revólver para ele, pois o Jason daquele mundo era abusivo e estava preso.',
    visitors: ['jason-1', 'amanda-2'],
    residents: [],
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Ex-Husband Convict', detail: 'Frame oficial de Daniela apontando a arma ("Get out").' }
    ]
  },
  {
    id: 'world-sealed-concrete',
    code: 'WORLD 22',
    numberLabel: '22',
    name: 'Mundo da Caixa Soterrada / Lacrada ("Buried Box")',
    shortHook: 'Porta bloqueada por terra, tijolos e concreto por fora para impedir viajantes.',
    officialOrFanName: 'Buried Box (World 8)',
    season: 1,
    episodes: ['T1:E4', 'T1:E6'],
    category: 'Hostile',
    habitability: 'Habitável',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/f/f9/Buried_box_world_8.png/revision/latest?cb=20240816213751',
    themeColor: '#71717a',
    atmosphere: 'Subsolo bloqueado.',
    boxLocation: 'Soterrada e murada por fora.',
    description:
      'Mostra que diversas realidades soterraram ou concretaram a abertura da Caixa para bloquear permanentemente a passagem de viajantes.',
    visitors: ['jason-1', 'amanda-2', 'jason-2'],
    residents: [],
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Buried Box (World 8)', detail: 'Frame oficial da porta bloqueada.' }
    ]
  },
  {
    id: 'world-dying-sun',
    code: 'WORLD 25',
    numberLabel: '25',
    name: 'Mundo do Sol Gigante ("Can\'t Breathe / Fires of Dead Stars")',
    shortHook: 'Um sol vermelho colossal paira sobre o prédio John Hancock em uma Terra agonizante.',
    officialOrFanName: "Can't Breathe (World 5) / Red Giant World",
    season: 1,
    episodes: ['T1:E4', 'T1:E7'],
    category: 'Apocalyptic',
    habitability: 'Letal / Extremo',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/f/f8/Cant_breathe_world_5.png/revision/latest?cb=20240816213751',
    themeColor: '#e11d48',
    atmosphere: 'Atmosfera rarefeita e irrespirável sob um sol gigante próximo da Terra.',
    boxLocation: 'Ruínas de Chicago.',
    description:
      'Catalogado na Wiki como "Can\'t Breathe (World 5)". Acima da silhueta do edifício John Hancock em Chicago, brilha uma estrela gigante vermelha muito mais próxima e colossal.',
    visitors: ['jason-1', 'amanda-2'],
    residents: [],
    sources: [
      { type: 'FANDOM_WIKI', label: "Wiki: Can't Breathe (World 5)", detail: 'Frame oficial do sol gigante sobre Chicago.' }
    ]
  },
  {
    id: 'world-aurora-borealis',
    code: 'WORLD 26',
    numberLabel: '26',
    name: 'Utopia da Aurora ("Radical Empathy / World 26 / Íris Negra")',
    shortHook: 'Paraíso onde Amanda 2 e Ryan 1 ficam na T1, mas que sofre quarentena da Praga Íris Negra na T2.',
    officialOrFanName: 'Radical Empathy / World 26 / Utopia World / Forsaken',
    season: '1 & 2',
    episodes: ['T1:E6', 'T1:E7', 'T1:E9', 'T2:E1', 'T2:E4', 'T2:E7'],
    category: 'Utopian',
    habitability: 'Quarentena / Crítico',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/7/78/Kinder_more_progressive_place.png/revision/latest?cb=20240822030731',
    themeColor: '#10b981',
    atmosphere: 'Chicago utópica com auroras boreais verdes; na 2ª temporada, sob quarentena militar do CDC.',
    boxLocation: 'Galpão tranquilo próximo ao lago.',
    description:
      'Catalogado oficialmente na Wiki como **"World 26 / Radical Empathy / Kinder More Progressive Place"**. É onde Jason 2 abandona Ryan 1 (T1:E6) e onde Amanda 2 decide morar (T1:E7). Na 2ª temporada, outra dupla de variantes (Ryan 3 e sua Amanda) contamina este mundo com a **Praga da Íris Negra (Hema Aetho 26)**, fazendo com que Amanda 2 e Ryan 1 sejam detidos pelo CDC até serem resgatados por Leighton 6.',
    visitors: ['jason-2', 'ryan-1', 'amanda-2', 'jason-1', 'ryan-3', 'leighton-6'],
    residents: ['amanda-2', 'ryan-1'],
    podcastInsight:
      'Designado oficialmente nos roteiros e na Wiki como World 26 ("Radical Empathy").',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Radical Empathy (World 26)', detail: 'Frame oficial da Chicago utópica com aurora boreal.' }
    ]
  },
  {
    id: 'world-max-alive',
    code: 'WORLD 27',
    numberLabel: '27',
    name: 'Mundo Onde o Gêmeo Max Vive ("Massive Disappointment")',
    shortHook: 'Onde o irmão gêmeo Maximillian sobreviveu e o Jason 5 dorme em paz com Daniela.',
    officialOrFanName: 'Massive Disappointment / Max Alive World',
    season: '1 & 2',
    episodes: ['T1:E7', 'T2:E7', 'T2:E8'],
    category: 'Root',
    habitability: 'Habitável',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/8/8c/Max_Dessen_in_season_1_episode_7.jpg/revision/latest?cb=20260921232212',
    themeColor: '#10b981',
    atmosphere: 'Chicago quase idêntica ao Mundo 1.',
    boxLocation: 'Hangar de Chicago.',
    description:
      'Catalogado na Wiki como "Massive Disappointment" (T1:E7). Jason 1 chega achando que voltou para casa, mas encontra outro Jason (**Jason 5**) dormindo com Daniela e se choca ao encontrar **Maximillian (Max)** — o irmão gêmeo de Charlie que havia morrido no nascimento no Mundo 1 — vivo e adulto!',
    visitors: ['jason-1', 'amanda-2'],
    residents: ['jason-5'],
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Maximillian Dessen', detail: 'Foto oficial de Max Dessen no Episódio 7.' }
    ]
  },
  {
    id: 'world-tree-branch-accident',
    code: 'WORLD 28',
    numberLabel: '28',
    name: 'Floresta do Acidente do Galho ("Alone in the Woods")',
    shortHook: 'Onde um galho empala Amanda: na linha de Jason 13 ela morre; na de Jason 34 (Amanda 7) ela é salva!',
    officialOrFanName: 'Alone in the Woods / Tree Branch Strike World',
    season: '1 & 2',
    episodes: ['T1:E4', 'T2:E3', 'T2:E8'],
    category: 'Hostile',
    habitability: 'Letal / Extremo',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/6/6c/Alone_woods_world_4.png/revision/latest?cb=20240816213749',
    themeColor: '#a855f7',
    atmosphere: 'Floresta densa onde árvores invadem o perímetro da Caixa.',
    boxLocation: 'No meio de uma mata fechada.',
    description:
      'O grande ponto de bifurcação da 2ª temporada: um galho de árvore atravessa o peito de Amanda. Na ramificação de **Jason 13 (Scar Jason)**, Amanda morre ali mesmo. Na ramificação de **Jason 34**, ele carrega **Amanda 7** até o Santuário de Laurel e salva sua vida.',
    visitors: ['jason-13', 'jason-34', 'amanda-7'],
    residents: [],
    podcastInsight:
      'Citado diretamente no Podcast Oficial T2:E8 para explicar a diferença entre Jason 13 e o casal Jason 34 & Amanda 7.',
    sources: [
      { type: 'OFFICIAL_PODCAST', label: 'Podcast Oficial T2:E8', detail: 'Explicação de Jason 34 e Amanda 7.' }
    ]
  },
  {
    id: 'world-sanctuary-refuge',
    code: 'WORLD 29',
    numberLabel: '29',
    name: 'Refúgio Inicial de 7 Meses ("A Quiet Life")',
    shortHook: 'Para onde a família fugiu no fim da T1, mas que precisou abandonar após Daniela matar um Jason invasor.',
    officialOrFanName: 'A Quiet Life World (S2E01)',
    season: '1 & 2',
    episodes: ['T1:E9', 'T2:E1'],
    category: 'Sanctuary',
    habitability: 'Habitável',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/e/ef/Dark_Matter_S2E01.jpg/revision/latest?cb=20260918144540',
    themeColor: '#06b6d4',
    atmosphere: 'Casa afastada cercada por protocolos de segurança e armas escondidas.',
    boxLocation: 'Acessada pela família na fuga de emergência do T2:E1.',
    description:
      'O mundo para onde Jason 1, Daniela 1 e Charlie 1 fugiram no final da 1ª temporada e viveram escondidos por 7 meses. No T2:E1 ("A Quiet Life"), enquanto Jason 1 está fora trabalhando, uma **variante hostil de Jason** (que mantinha um diário rastreando a família) invade a casa e **Daniela o mata com um tiro** para proteger a família. Quando um policial local aparece investigando o carro abandonado do invasor enquanto Jason 1 tenta enterrar o corpo, a família é obrigada a fugir imediatamente pela Caixa para o **Mundo Low-Tech**.',
    visitors: ['jason-1', 'daniela-1', 'charlie-1', 'jason-8'],
    residents: [],
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E1 "A Quiet Life"', detail: 'Daniela mata o Jason invasor e a família foge da polícia.' },
      { type: 'FANDOM_WIKI', label: 'Wiki: A Quiet Life (S2E01)', detail: 'Imagem oficial do Episódio 1 da 2ª temporada.' }
    ]
  },
  {
    id: 'world-lowtech-analog',
    code: 'WORLD 30 (WORLD X)',
    numberLabel: '30',
    name: 'Mundo Low-Tech & A Pirâmide ("World X")',
    shortHook: 'Chicago sem internet onde a família Dessen se esconde E onde Leighton constrói "A Pirâmide" subterrânea.',
    officialOrFanName: 'World X / Low-Tech Chicago ("A Perfect World" & "The Pyramid")',
    season: 2,
    episodes: ['T2:E2', 'T2:E3', 'T2:E4', 'T2:E6', 'T2:E7'],
    category: 'Root',
    habitability: 'Habitável',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/b/b7/Dark_Matter_S2E07.jpg/revision/latest?cb=20261002143559',
    themeColor: '#6366f1',
    atmosphere: 'Chicago analógica/retrô (sem internet ou celulares), mas com "A Pirâmide" oculta nos túneis subterrâneos.',
    boxLocation: 'Piscina vazia de uma escola abandonada (e "A Pirâmide" nos túneis de carga sob Chicago).',
    description:
      'Conhecido como **"World X" / Mundo Low-Tech**, é o cenário central da 2ª temporada — onde acontecem TANTO o refúgio da família Dessen QUANTO a construção da **Pirâmide**! Neste universo, Nixon venceu JFK em 1960 e cancelou a Corrida Espacial da NASA, impedindo a invenção do microprocessador. **Jason 1, Daniela 1 e Charlie 1** fogem para cá no T2:E2 após Daniela matar o Jason invasor no Mundo 29. Porém, **Leighton Vance** já havia se instalado neste mesmo mundo, introduzindo tecnologia avançada (**Velocity Tech**) que ameaça a corporação local **MacNamara Tech** (de **Sheila e Mitchel MacNamara**) e construindo nos túneis subterrâneos **A Pirâmide** (uma Caixa industrial gigante movida a energia nuclear que já mapeou 74 mundos, com ajuda de **Oluko/Leighton 6** e **Jason 2**). No T2:E7, **Charlie 1** e depois **Daniela 1** entram na Caixa na piscina abandonada, enquanto **Jason 2** aparece na porta da casa de **Jason 1**.',
    visitors: [
      'jason-1',
      'daniela-1',
      'charlie-1',
      'leighton-2',
      'leighton-6',
      'jason-2',
      'blair-2',
      'amanda-2',
      'ryan-1',
      'mitchel-2'
    ],
    residents: ['jason-1', 'leighton-2', 'jason-2', 'mitchel-2'],
    podcastInsight:
      'O Mundo Low-Tech e o Mundo da Pirâmide são a exata mesma realidade ("World X"): Leighton usou a falta de tecnologia digital deste mundo para dominar o mercado com a Velocity Tech e construir a Pirâmide nos túneis de Chicago.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E2, T2:E6 & T2:E7', detail: 'Refúgio dos Dessen, disputa Velocity Tech vs. MacNamara Tech e revelação da Pirâmide.' },
      { type: 'FANDOM_WIKI', label: 'Wiki: S2E02 & S2E07', detail: 'Imagens oficiais do Mundo Low-Tech e da Pirâmide.' }
    ]
  },
  {
    id: 'world-ellie-maria',
    code: 'WORLD 31',
    numberLabel: '31',
    name: 'Mundo da Mãe Ellie & Maria ("Love and Be Loved")',
    shortHook: 'Onde o Jason nativo morreu aos 16 anos, mas a mãe Ellie está viva e acolhe os Jasons 24, 30 e 31.',
    officialOrFanName: "Ellie's World (S2E05 Love and Be Loved)",
    season: 2,
    episodes: ['T2:E5'],
    category: 'Sanctuary',
    habitability: 'Refúgio Seguro',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/3/3e/Dark_Matter_S2E05.jpg/revision/latest?cb=20260918145143',
    themeColor: '#f59e0b',
    atmosphere: 'Chicago serena e acolhedora.',
    boxLocation: 'Hangar de Chicago.',
    description:
      'Cenário do T2:E5 ("Love and Be Loved"). **Jason 24** usa sua última ampola pensando na mãe falecida (**Ellie**). Aqui, Ellie está viva (comunicando-se em língua de sinais), mas perdeu o filho aos 16 anos. Jason 24 reconstrói a vida como marceneiro, acolhe os traumatizados **Jason 30** e **Jason 31** em casa e se apaixona por **Maria**.',
    visitors: ['jason-24', 'jason-30'],
    residents: ['jason-24', 'jason-30'],
    podcastInsight:
      'Mostra como Jason 24, 30 e 31 encontraram cura através da fraternidade e do amor.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Love and Be Loved (S2E05)', detail: 'Imagem oficial de Jason 24 no Episódio 5 da 2ª temporada.' }
    ]
  },
  {
    id: 'world-laurel-sanctuary',
    code: 'WORLD 32',
    numberLabel: '32',
    name: 'Santuário de Laurel ("The Basic Oneness of Everything")',
    shortHook: 'Casa com uma Caixa na biblioteca onde a enfermeira Laurel salvou Amanda 7 e acolhe Charlie 1.',
    officialOrFanName: "Laurel's Sanctuary House (S2E08)",
    season: 2,
    episodes: ['T2:E7', 'T2:E8'],
    category: 'Sanctuary',
    habitability: 'Refúgio Seguro',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/f/f9/Dark_Matter_S2E08.jpg/revision/latest?cb=20261016143155',
    themeColor: '#10b981',
    atmosphere: 'Propriedade arborizada e pacífica.',
    boxLocation: 'Dentro da biblioteca da casa de Laurel.',
    description:
      'Revelado no T2:E8 ("The Basic Oneness of Everything"). Uma Caixa materializou-se na biblioteca da ex-enfermeira **Laurel** (Margo Martindale). De lá saíram **Jason 34** carregando **Amanda 7** empalada por um galho. Laurel salvou Amanda 7 e transformou a casa em santuário para viajantes como Blair 2 e Charlie 1.',
    visitors: ['jason-34', 'amanda-7', 'blair-2', 'charlie-1', 'leighton-6'],
    residents: ['laurel-1', 'amanda-7'],
    podcastInsight:
      'No Podcast Oficial, Blake Crouch confirma as designações de Jason 34 e Amanda 7 como o coração emocional deste santuário.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: The Basic Oneness of Everything (S2E08)', detail: 'Imagem oficial de Jason 34 e Amanda 7 no Episódio 8.' }
    ]
  }
];

export const VARIANTS: CharacterVariant[] = [
  // ==================== JASON VARIANTS ====================
  {
    id: 'jason-1',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J1',
    designation: 'Jason 1 (Protagonista / Chat "Jason9")',
    alias: 'O Professor Original',
    shortRole: 'No Mundo Low-Tech (World X), tenta isolar a Caixa com Emaranhamento Quântico e joga MacNamara no Corredor.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/7/71/Jason_Dessen.png/revision/latest?cb=20240530135900',
    accentColor: 'amber',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-lowtech-analog',
    worldsVisited: [
      'world-prime-1',
      'world-velocity-2',
      'world-ash',
      'world-didnt-make-it',
      'world-mist-monster',
      'world-ice-blizzard',
      'world-submerged',
      'world-murder-hornets',
      'world-plague-pandemic',
      'world-prison-jason',
      'world-sealed-concrete',
      'world-dying-sun',
      'world-aurora-borealis',
      'world-max-alive',
      'world-sanctuary-refuge',
      'world-lowtech-analog'
    ],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Aliança de barbante no dedo (depois recupera a original), cicatriz no rosto, colar Polaris dado por Amanda 2.',
    psychologicalProfile: 'Devotado à família, mas no Mundo Low-Tech fica obcecado em desligar a Caixa matematicamente via Emaranhamento Quântico.',
    storyArc:
      'Após Daniela matar um Jason invasor no Mundo 29 (T2:E1), leva a família para o **Mundo Low-Tech ("World X")** no T2:E2. Lá, percebe que destruir a Caixa fisicamente na piscina da escola abandonada não funciona e tenta desconectá-la do multiverso usando Emaranhamento Quântico. Flagra **Mitchel MacNamara** invadindo sua casa, coloca a droga Lavanda na bebida dele e o tranca no Corredor da Caixa. No final do T2:E7 (sem saber que Charlie e Daniela entraram na Caixa), dá de cara com **Jason 2** batendo em sua porta!',
    branchOriginExplanation:
      'A linha-tronco original da série. Cada decisão dele na Caixa gerou as dezenas de outras variantes numeradas.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Jason Dessen', detail: 'Retrato oficial de Joel Edgerton como Jason 1.' },
      { type: 'EPISODE_CANON', label: 'T2:E1–E7', detail: 'Fuga para o Mundo Low-Tech, confronto com MacNamara e reencontro com Jason 2.' }
    ]
  },
  {
    id: 'jason-2',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J2',
    designation: 'Jason 2 (Criador da Caixa & Da Pirâmide)',
    alias: 'Dr. Jason Dessen — Velocity Labs',
    shortRole: 'Criou a Caixa no Mundo 2, ajudou Leighton a projetar A Pirâmide no Mundo Low-Tech e bate à porta de Jason 1 no T2:E7.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/f/fd/Jason_Dessen_2.png/revision/latest?cb=20240817131057',
    accentColor: 'cyan',
    originWorldId: 'world-velocity-2',
    currentWorldId: 'world-lowtech-analog',
    worldsVisited: [
      'world-velocity-2',
      'world-prime-1',
      'world-sealed-concrete',
      'world-aurora-borealis',
      'world-lowtech-analog'
    ],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Cabelo penteado para trás, ternos escuros alinhados; não sabia da alergia de Charlie a nozes.',
    psychologicalProfile: 'Gênio da física quântica vencedor do Prêmio Pavia; busca redenção na 2ª temporada.',
    storyArc:
      'Constrói a Caixa no Mundo 2, sequestra Jason 1 e assume o lugar dele no Mundo 1. No final da 1ª temporada, arrependido, ajuda a família Dessen a fugir. Na 2ª temporada, no **Mundo Low-Tech ("World X")**, ajuda Leighton e Oluko a construir **A Pirâmide** e, nos segundos finais do T2:E7, aparece inesperadamente na porta da casa de **Jason 1**.',
    branchOriginExplanation:
      'Divergiu de Jason 1 há 15 anos quando decidiu não se casar com Daniela.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Jason Dessen 2', detail: 'Retrato oficial de Jason 2.' },
      { type: 'EPISODE_CANON', label: 'T2:E7 "The Pyramid"', detail: 'Participação na Pirâmide e aparição na porta de Jason 1.' }
    ]
  },
  {
    id: 'jason-3',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J3',
    designation: 'Jason 3 (Primeira Ramificação)',
    alias: 'Jason 3',
    shortRole: 'Primeira variante ramificada de Jason 1 no Corredor catalogada nos roteiros da T1.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/9/9d/Dark_Matter_Episode_4.jpeg/revision/latest?cb=20240524110625',
    accentColor: 'amber',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-prime-1',
    worldsVisited: ['world-prime-1', 'world-velocity-2', 'world-ash'],
    parentVariantId: 'jason-1',
    branchEventLabel: 'Primeiros saltos no Corredor (T1:E4)',
    status: 'Morto',
    seasonIntroduced: 1,
    visualTraits: 'Roupas rasgadas e ferimentos das primeiras portas.',
    psychologicalProfile: 'Desesperado para voltar para casa.',
    storyArc:
      'Catalogado nas legendas e roteiros da 1ª temporada como a primeira bifurcação de Jason 1.',
    branchOriginExplanation:
      'Ramificado de Jason 1 nos primeiros saltos do Corredor.',
    sources: [
      { type: 'SCRIPT_CC', label: 'Roteiro T1:E8 & E9', detail: 'Identificado como Jason 3.' }
    ]
  },
  {
    id: 'jason-4',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J4',
    designation: 'Jason 4 (Variante da Pandemia)',
    alias: 'Jason 4',
    shortRole: 'Ramificação surgida durante a passagem pelo Mundo do Vírus Letal (T1:E5).',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/7/7e/Dark_Matter_Episode_5.jpeg/revision/latest?cb=20240530144318',
    accentColor: 'amber',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-prime-1',
    worldsVisited: ['world-prime-1', 'world-velocity-2', 'world-plague-pandemic'],
    parentVariantId: 'jason-1',
    branchEventLabel: 'Salto do Mundo da Pandemia (T1:E5)',
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Aparência abatida e exausta.',
    psychologicalProfile: 'Marcado pelo luto de ver Daniela doente no Mundo 20.',
    storyArc:
      'Variante numerada nos roteiros da 1ª temporada associada às bifurcações do episódio "Worldless".',
    branchOriginExplanation:
      'Ramificação de Jason 1 no Episódio 5.',
    sources: [
      { type: 'SCRIPT_CC', label: 'Roteiro T1', detail: 'Numerado como Jason 4.' }
    ]
  },
  {
    id: 'jason-5',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J5',
    designation: 'Jason 5 (Pai no Mundo Onde Max Vive)',
    alias: 'Jason Nativo do Mundo 27',
    shortRole: 'Vive feliz em um mundo onde o filho gêmeo Maximillian nunca morreu no parto.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/4/40/Maximillian_in_photo.png/revision/latest?cb=20240820053127',
    accentColor: 'emerald',
    originWorldId: 'world-max-alive',
    currentWorldId: 'world-max-alive',
    worldsVisited: ['world-max-alive'],
    status: 'Estabelecido em Paz',
    seasonIntroduced: 1,
    visualTraits: 'Sem cicatrizes de viagem; dorme tranquilo ao lado de Daniela.',
    psychologicalProfile: 'Um Jason em paz que nunca sofreu o trauma da perda de Max nem entrou na Caixa.',
    storyArc:
      'Descoberto por Jason 1 dormindo com Daniela na realidade onde Max está vivo (T1:E7).',
    branchOriginExplanation:
      'Nativo do Mundo 27 (onde Max sobreviveu à cirurgia cardíaca).',
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E7', detail: 'Creditado oficialmente como Jason 5.' }
    ]
  },
  {
    id: 'jason-6',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J6',
    designation: 'Jason 6 (Perseguidor da Loja de Armas)',
    alias: 'Jason do Beco (T1:E8)',
    shortRole: 'Persegue Jason 1 na loja de armas em Chicago e morre na luta corporal no beco.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/4/43/Dark_Matter_Episode_8.jpeg/revision/latest?cb=20240617005549',
    accentColor: 'rose',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-prime-1',
    worldsVisited: ['world-prime-1', 'world-velocity-2', 'world-ice-blizzard'],
    parentVariantId: 'jason-1',
    branchEventLabel: 'Retorno hostil a Chicago (T1:E8)',
    status: 'Morto',
    seasonIntroduced: 1,
    visualTraits: 'Casaco escuro pesado, olhar agressivo.',
    psychologicalProfile: 'Paranoico; tenta matar outros Jasons para ser o único a reivindicar Daniela.',
    storyArc:
      'Segue Jason 1 na loja de autodefesa no T1:E8 ("Jupiter") e o ataca num beco, acabando morto no confronto.',
    branchOriginExplanation:
      'Ramificação de Jason 1 no Corredor.',
    sources: [
      { type: 'SCRIPT_CC', label: 'Legendas T1:E8', detail: 'Identificado como Jason 6.' }
    ]
  },
  {
    id: 'jason-7',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J7',
    designation: 'Jason 7 (Variante do Bar & Sala de Chat)',
    alias: 'Jason do Dedo Enfaixado',
    shortRole: 'Encontra outros Jasons no bar Village Tap e tenta organizar regras no chat room.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/9/95/Village_Tap.png/revision/latest?cb=20240617174008',
    accentColor: 'amber',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-prime-1',
    worldsVisited: ['world-prime-1', 'world-velocity-2'],
    parentVariantId: 'jason-1',
    branchEventLabel: 'Convergência no Mundo 1 (T1:E8)',
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Dedo mindinho quebrado/enfaixado.',
    psychologicalProfile: 'Moderado; busca diálogo com as outras variantes no chat room.',
    storyArc:
      'Uma das variantes que conversam no bar e participam da sala de chat no final da 1ª temporada.',
    branchOriginExplanation:
      'Ramificação de Jason 1.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E8 & E9', detail: 'Cena do bar e chat room.' }
    ]
  },
  {
    id: 'jason-8',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J8',
    designation: 'Jason 8 ("Punisher Jason" / Invasor da Cabana)',
    alias: 'Jason Queimado / Extremista',
    shortRole: 'Variante violenta e armada que invade a cabana da família no final da T1.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/6/6e/Dark_Matter_Episode_9.jpeg/revision/latest?cb=20240627174315',
    accentColor: 'rose',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-prime-1',
    worldsVisited: ['world-prime-1', 'world-velocity-2', 'world-ash', 'world-murder-hornets'],
    parentVariantId: 'jason-1',
    branchEventLabel: 'Mundos extremos (T1:E9)',
    status: 'Morto',
    seasonIntroduced: 1,
    visualTraits: 'Queimaduras e arranhões profundos no rosto, armado com rifle.',
    psychologicalProfile: 'Psicologicamente destruído pelos mundos letais por onde passou.',
    storyArc:
      'Invade a casa de veraneio no T1:E9 ("Entanglement") para tomar Daniela e Charlie à força, sendo morto na luta final.',
    branchOriginExplanation:
      'Ramificação de Jason 1 que perdeu Amanda de forma violenta.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E9 "Entanglement"', detail: 'Invasão à casa de campo.' }
    ]
  },
  {
    id: 'jason-13',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J13',
    designation: 'Jason 13 ("Scar Jason" — Prisioneiro DARPA)',
    alias: 'Jason da Cicatriz na Testa',
    shortRole: 'Sua Amanda morreu empalada pelo galho; cheio de ódio, acaba capturado pela DARPA na T2.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/9/99/Dark_Matter_S2E03.jpg/revision/latest?cb=20260918144957',
    accentColor: 'rose',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-prime-1',
    worldsVisited: ['world-prime-1', 'world-velocity-2', 'world-tree-branch-accident', 'world-sanctuary-refuge'],
    parentVariantId: 'jason-1',
    branchEventLabel: 'Morte de Amanda no Acidente do Galho (oposto de Jason 34)',
    status: 'Preso (DARPA)',
    seasonIntroduced: 2,
    visualTraits: 'Cicatriz profunda na testa ("Scar Jason"), expressão furiosa.',
    psychologicalProfile: 'Consumido pela culpa e raiva após ver sua versão de Amanda morrer empalada por um galho na Caixa.',
    storyArc:
      'Na 2ª temporada, encontra nosso Jason em um bar e mais tarde cai nas mãos da DARPA / Agente Mitchel MacNamara. Sua trajetória é o espelho sombrio de **Jason 34** (que conseguiu salvar Amanda 7 do mesmo acidente).',
    branchOriginExplanation:
      'Bifurcação direta do acidente da árvore (Mundo 28) onde Amanda não sobreviveu.',
    sources: [
      { type: 'OFFICIAL_PODCAST', label: 'Podcast Oficial T2', detail: 'Blake Crouch detalha o trauma de Jason 13 vs. Jason 34.' }
    ]
  },
  {
    id: 'jason-24',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J24',
    designation: 'Jason 24 (O Marceneiro — T2:E5)',
    alias: 'Filho de Ellie & Parceiro de Maria',
    shortRole: 'Desiste do suicídio após a T1, vai para um mundo onde sua mãe Ellie está viva e recomeça a vida.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/3/3e/Dark_Matter_S2E05.jpg/revision/latest?cb=20260918145143',
    accentColor: 'emerald',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-ellie-maria',
    worldsVisited: ['world-prime-1', 'world-velocity-2', 'world-ellie-maria'],
    parentVariantId: 'jason-1',
    branchEventLabel: 'Partida após a despedida na garagem (T2:E5)',
    status: 'Estabelecido em Paz',
    seasonIntroduced: 2,
    visualTraits: 'Mãos de marceneiro, comunica-se em Língua de Sinais (ASL) com a mãe Ellie; tira a aliança antiga.',
    psychologicalProfile: 'Supera a depressão e o alcoolismo através do cuidado com a mãe Ellie e do amor por Maria.',
    storyArc:
      'Protagonista do T2:E5 ("Love and Be Loved"). Usa sua última ampola para encontrar sua mãe **Ellie** viva em um mundo onde o Jason local morreu aos 16 anos. Lá ele constrói cadeiras de madeira, acolhe os Jasons **30** e **31** e se apaixona por **Maria**.',
    branchOriginExplanation:
      'Um dos 70+ Jasons da garagem da 1ª temporada que escolheu seguir em frente.',
    sources: [
      { type: 'OFFICIAL_PODCAST', label: 'Podcast Oficial T2:E5', detail: 'Confirmado nominalmente como Jason 24.' }
    ]
  },
  {
    id: 'jason-30',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J30 & J31',
    designation: 'Jason 30 & Jason 31 (Irmãos na Casa de Ellie)',
    alias: 'Variantes Acolhidas por Jason 24',
    shortRole: 'Duas variantes desamparadas que são acolhidas como irmãos por Jason 24 e Ellie no T2:E5.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/3/3d/Dark_Matter_S2E06.jpg/revision/latest?cb=20260925150129',
    accentColor: 'emerald',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-ellie-maria',
    worldsVisited: ['world-prime-1', 'world-velocity-2', 'world-ellie-maria'],
    parentVariantId: 'jason-24',
    branchEventLabel: 'Chegada ao Mundo de Ellie (T2:E5)',
    status: 'Estabelecido em Paz',
    seasonIntroduced: 2,
    visualTraits: 'Um deles tem barba longa de morador de rua antes de ser acolhido.',
    psychologicalProfile: 'Encontram paz vivendo em comunidade com Jason 24 e Ellie.',
    storyArc:
      'Chegam ao Mundo 30 pelo mesmo desejo de reencontrar a mãe Ellie e passam a morar juntos com Jason 24.',
    branchOriginExplanation:
      'Ramificações de Jason 1 que abriram a porta do mundo de Ellie depois de Jason 24.',
    sources: [
      { type: 'SCRIPT_CC', label: 'Créditos & Podcast T2:E5', detail: 'Identificados como Jason 30 e Jason 31.' }
    ]
  },
  {
    id: 'jason-34',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J34',
    designation: 'Jason 34 (Parceiro de Amanda 7 no Santuário)',
    alias: 'Protagonista de T2:E8 "The Basic Oneness"',
    shortRole: 'Salvou Amanda 7 do galho de árvore levando-a até Laurel; alcançou paz espiritual e guia Charlie 1.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/f/f9/Dark_Matter_S2E08.jpg/revision/latest?cb=20261016143155',
    accentColor: 'amber',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-laurel-sanctuary',
    worldsVisited: [
      'world-prime-1',
      'world-velocity-2',
      'world-tree-branch-accident',
      'world-laurel-sanctuary'
    ],
    parentVariantId: 'jason-1',
    branchEventLabel: 'Salvou Amanda 7 no Acidente do Galho (T2:E8)',
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 2,
    visualTraits: 'Olhar sereno e compassivo, barba bem cuidada, carrega o pingente Polaris.',
    psychologicalProfile: 'Alcançou aceitação plena após dois anos no Santuário de Laurel cuidando de Amanda 7.',
    storyArc:
      'Citado diretamente no Podcast Oficial e protagonista do T2:E8. Dois anos antes, saiu da Caixa na biblioteca de **Laurel** carregando **Amanda 7** empalada por um galho. Após Laurel salvar a vida dela, Jason 34 viveu no santuário, desapegou-se da obsessão por Daniela e aconselhou **Charlie 1** quando o garoto chegou lá.',
    branchOriginExplanation:
      'Ramificação luminosa do acidente da árvore (enquanto Jason 13 perdeu Amanda, Jason 34 salvou Amanda 7).',
    sources: [
      { type: 'OFFICIAL_PODCAST', label: 'Podcast Oficial T2:E8', detail: 'Analisado em detalhes por Blake Crouch como Jason 34.' }
    ]
  },

  // ==================== AMANDA VARIANTS ====================
  {
    id: 'amanda-2',
    baseCharacter: 'Amanda Lucas',
    badgeNumber: 'A2',
    designation: 'Amanda 2 (Parceira de Jason 1 e Ryan 1)',
    alias: 'Psiquiatra da Velocity Labs',
    shortRole: 'Fugiu com Jason 1 na T1, ficou no World 26 e na T2 viaja com Ryan 1 (passando pelo Mundo Low-Tech).',
    actor: 'Alice Braga',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/a/a5/Amanda_Lucas.png/revision/latest?cb=20240418155110',
    accentColor: 'cyan',
    originWorldId: 'world-velocity-2',
    currentWorldId: 'world-aurora-borealis',
    worldsVisited: [
      'world-velocity-2',
      'world-ash',
      'world-didnt-make-it',
      'world-mist-monster',
      'world-ice-blizzard',
      'world-submerged',
      'world-murder-hornets',
      'world-plague-pandemic',
      'world-prison-jason',
      'world-dying-sun',
      'world-aurora-borealis',
      'world-lowtech-analog'
    ],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Deu seu colar da Estrela Polar (Polaris) para Jason 1.',
    psychologicalProfile: 'Empática e corajosa; ensinou Jason 1 a acalmar a mente para controlar as portas.',
    storyArc:
      'Salva Jason 1 na Velocity Labs (T1:E3) e viaja com ele até decidir ficar no Mundo Utópico da Aurora / World 26 (T1:E7). Lá encontra Ryan 1. Na 2ª temporada, viaja com Ryan 1 passando pelo **Mundo Low-Tech** (hospedando-se no mesmo motel Milshire que a família Dessen e sendo vista pelo detetive MacNamara!) e enfrenta a quarentena da Praga da Íris Negra até ser resgatada por Leighton 6.',
    branchOriginExplanation:
      'Nativa do Mundo 2 (Velocity Labs).',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Amanda Lucas', detail: 'Retrato oficial de Alice Braga como Amanda Lucas.' }
    ]
  },
  {
    id: 'amanda-7',
    baseCharacter: 'Amanda Lucas',
    badgeNumber: 'A7',
    designation: 'Amanda 7 (Sobrevivente do Galho — Santuário de Laurel)',
    alias: 'Amanda de Jason 34',
    shortRole: 'Empalada por um galho na Caixa, foi salva pela enfermeira Laurel e vive no Santuário (T2:E8).',
    actor: 'Alice Braga',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/8/8a/Something_different.png/revision/latest?cb=20240820053128',
    accentColor: 'emerald',
    originWorldId: 'world-velocity-2',
    currentWorldId: 'world-laurel-sanctuary',
    worldsVisited: [
      'world-velocity-2',
      'world-tree-branch-accident',
      'world-laurel-sanctuary'
    ],
    parentVariantId: 'amanda-2',
    branchEventLabel: 'Empalamento no Mundo 28 & Resgate por Jason 34',
    status: 'No Santuário',
    seasonIntroduced: 2,
    visualTraits: 'Cicatriz cirúrgica no peito onde o galho de árvore a atingiu.',
    psychologicalProfile: 'Serena e grata pela segunda chance; escolhe morar na casa de Laurel para ajudar outros viajantes.',
    storyArc:
      'Citada nominalmente no Podcast Oficial do T2:E8 ("The Basic Oneness of Everything"). Chegou à beira da morte nos braços de **Jason 34** na biblioteca de **Laurel**, foi operada pela ex-enfermeira e decidiu fazer do Santuário o seu lar definitivo.',
    branchOriginExplanation:
      'Ramificação de Amanda 2 que viajava com Jason 34.',
    sources: [
      { type: 'OFFICIAL_PODCAST', label: 'Podcast Oficial T2:E8', detail: 'Identificada nominalmente como Amanda 7 por Blake Crouch.' }
    ]
  },
  {
    id: 'amanda-1',
    baseCharacter: 'Amanda Lucas',
    badgeNumber: 'A1',
    designation: 'Amanda 1 (Nativa do Mundo Prime)',
    alias: 'Amanda da Reality 1',
    shortRole: 'Vive uma vida normal em Chicago sem saber que a Caixa existe.',
    actor: 'Alice Braga',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/7/71/Platinum_blonde_gallery.png/revision/latest?cb=20240820053128',
    accentColor: 'cyan',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-prime-1',
    worldsVisited: ['world-prime-1'],
    status: 'Estabelecido em Paz',
    seasonIntroduced: 1,
    visualTraits: 'Terapeuta em Chicago.',
    psychologicalProfile: 'Nunca teve contato com a Velocity Labs.',
    storyArc:
      'Vista de longe por Amanda 2 quando passam por Chicago.',
    branchOriginExplanation:
      'Nativa do Mundo 1.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E6 & E7', detail: 'Contraparte local.' }
    ]
  },

  // ==================== RYAN VARIANTS ====================
  {
    id: 'ryan-1',
    baseCharacter: 'Ryan Holder',
    badgeNumber: 'R1',
    designation: 'Ryan 1 (Neuroquímico — Parceiro de Amanda 2)',
    alias: 'Vencedor do Prêmio Pavia na Reality 1',
    shortRole: 'Abandonado por Jason 2 na Utopia da Aurora, viaja com Amanda 2 pelo Mundo Low-Tech na T2.',
    actor: 'Jimmi Simpson',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/4/49/Ryan_Holder_Reality_1.png/revision/latest?cb=20240816204623',
    accentColor: 'blue',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-aurora-borealis',
    worldsVisited: ['world-prime-1', 'world-aurora-borealis', 'world-lowtech-analog'],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Neuroquímico brilhante; aparência tensa e determinada na 2ª temporada.',
    psychologicalProfile: 'Determinado a entender a mecânica neural da Lavanda para voltar para casa.',
    storyArc:
      'Amigo de Jason 1 no Mundo 1. Quando descobre a farsa de Jason 2, é sequestrado e largado no Mundo 26 / Utopia da Aurora (T1:E6). Encontra Amanda 2 no final da T1 e viaja com ela na 2ª temporada (passando pelo **Mundo Low-Tech**, onde quase cruzam com Jason 1 no corredor do motel Milshire!), enfrentando depois a quarentena da Praga da Íris Negra.',
    branchOriginExplanation:
      'Nativo do Mundo 1.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Ryan Holder (Reality 1)', detail: 'Retrato oficial de Jimmi Simpson como Ryan 1.' }
    ]
  },
  {
    id: 'ryan-2',
    baseCharacter: 'Ryan Holder',
    badgeNumber: 'R2',
    designation: 'Ryan 2 (O Ryan Mecânico — Substituto)',
    alias: 'Mecânico trazido por Jason 2',
    shortRole: 'Mecânico de outro mundo trazido por Jason 2 para fingir que era o cientista Ryan 1.',
    actor: 'Jimmi Simpson',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/c/c7/Ryan_mechanic.png/revision/latest?cb=20240821210612',
    accentColor: 'blue',
    originWorldId: 'world-velocity-2',
    currentWorldId: 'world-prime-1',
    worldsVisited: ['world-velocity-2', 'world-prime-1'],
    status: 'Estabelecido em Paz',
    seasonIntroduced: 1,
    visualTraits: 'Boné, mãos calejadas de oficina mecânica.',
    psychologicalProfile: 'Assustado com o comportamento de Jason 2; acaba revelando a verdade para Daniela 1.',
    storyArc:
      'Colocado por Jason 2 no apartamento de Ryan 1 em Chicago no T1:E7, mas Daniela 1 logo percebe que ele não é o amigo neuroquímico.',
    branchOriginExplanation:
      'Variante de um mundo onde Ryan nunca seguiu carreira acadêmica.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Mechanic Ryan', detail: 'Foto oficial do Ryan Mecânico.' }
    ]
  },
  {
    id: 'ryan-3',
    baseCharacter: 'Ryan Holder',
    badgeNumber: 'R3',
    designation: 'Ryan 3 (Vetor da Praga da Íris Negra)',
    alias: 'Ryan do Surto Hema Aetho 26',
    shortRole: 'Variante de Ryan que trouxe acidentalmente a Praga da Íris Negra para o Mundo 26.',
    actor: 'Jimmi Simpson',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/1/1e/Ryan_Holder.png/revision/latest?cb=20240418155114',
    accentColor: 'rose',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-aurora-borealis',
    worldsVisited: ['world-prime-1', 'world-plague-pandemic', 'world-aurora-borealis'],
    parentVariantId: 'ryan-1',
    branchEventLabel: 'Passagem por mundo infectado (T2:E4/E7)',
    status: 'Morto',
    seasonIntroduced: 2,
    visualTraits: 'Infectado pelo patógeno Hema Aetho 26.',
    psychologicalProfile: 'Viajante que causou uma catástrofe biológica sem intenção.',
    storyArc:
      'Na 2ª temporada, Amanda 2 e Ryan 1 são presos pelo CDC porque esta outra variante de Ryan (junto com outra Amanda) espalhou a Praga da Íris Negra no Mundo 26.',
    branchOriginExplanation:
      'Ramificação de Ryan que passou por um mundo pandêmico.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E4 & E7', detail: 'Origem da quarentena militar.' }
    ]
  },

  // ==================== LEIGHTON VARIANTS ====================
  {
    id: 'leighton-2',
    baseCharacter: 'Leighton Vance',
    badgeNumber: 'L2',
    designation: 'Leighton 2 (CEO da Velocity Tech / Construtor da Pirâmide)',
    alias: 'Arquiteto da Pirâmide no Mundo Low-Tech',
    shortRole: 'Instalou-se no Mundo Low-Tech (World X), rivalizou com a MacNamara Tech e construiu A Pirâmide subterrânea.',
    actor: 'Dayo Okeniyi',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/6/62/Leighton_Vance.png/revision/latest?cb=20240418155112',
    accentColor: 'violet',
    originWorldId: 'world-velocity-2',
    currentWorldId: 'world-lowtech-analog',
    worldsVisited: [
      'world-velocity-2',
      'world-ash',
      'world-ice-blizzard',
      'world-sand-dunes',
      'world-lowtech-analog'
    ],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Cicatrizes de batalha do Corredor; líder da Velocity Tech no Mundo Low-Tech.',
    psychologicalProfile: 'Ambicioso; aproveita a ausência de tecnologia digital no Mundo Low-Tech para dominar o mercado e construir A Pirâmide.',
    storyArc:
      'Após perseguir Jason 1 na 1ª temporada, estabelece sua base no **Mundo Low-Tech ("World X")** com a empresa **Velocity Tech**, superando a corporação local **MacNamara Tech**. Nos túneis subterrâneos de carga sob Chicago, constrói **A Pirâmide** (uma versão gigantesca da Caixa movida a energia nuclear que já mapeou 74 mundos para rotas comerciais, mas que só aguenta ficar ligada por 20 minutos).',
    branchOriginExplanation:
      'Nativo do Mundo 2 (Velocity Labs).',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Leighton Vance', detail: 'Retrato oficial de Dayo Okeniyi como Leighton Vance.' },
      { type: 'EPISODE_CANON', label: 'T2:E6 & T2:E7 "The Pyramid"', detail: 'Revelação da Pirâmide nos túneis do Mundo Low-Tech.' }
    ]
  },
  {
    id: 'leighton-1',
    baseCharacter: 'Leighton Vance',
    badgeNumber: 'L1',
    designation: 'Leighton 1 (O Turista Bilionário)',
    alias: 'Leighton da Reality 1',
    shortRole: 'Comprou dezenas de ampolas de Jason 2 por milhões de dólares para viajar por lazer.',
    actor: 'Dayo Okeniyi',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/6/64/Dessen_r2_leighton_r1_2nd_trip_middle_of_freeway.png/revision/latest?cb=20240820012602',
    accentColor: 'violet',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-aurora-borealis',
    worldsVisited: ['world-prime-1', 'world-aurora-borealis'],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Mochila de aventureiro e sorriso empolgado.',
    psychologicalProfile: 'Bilionário em busca de adrenalina no multiverso.',
    storyArc:
      'Treinado por Jason 2 no T1:E5 e entra voluntariamente na Caixa no T1:E6 após financiar a estadia de Jason 2 no Mundo 1.',
    branchOriginExplanation:
      'Nativo do Mundo 1.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Middle of Freeway', detail: 'Foto oficial de Leighton 1 com Jason 2 na Caixa.' }
    ]
  },
  {
    id: 'leighton-6',
    baseCharacter: 'Leighton Vance',
    badgeNumber: 'L6',
    designation: 'Leighton 6 / "Guru Leighton" (Oluko)',
    alias: 'O Navegador Meditativo da Pirâmide',
    shortRole: 'Treina os batedores da Pirâmide no Mundo Low-Tech (World X) e resgata Amanda 2 e Ryan 1.',
    actor: 'Dayo Okeniyi',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/c/cd/Dark_Matter_S2E04.jpg/revision/latest?cb=20260918145057',
    accentColor: 'emerald',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-lowtech-analog',
    worldsVisited: [
      'world-prime-1',
      'world-lowtech-analog',
      'world-aurora-borealis',
      'world-laurel-sanctuary'
    ],
    parentVariantId: 'leighton-1',
    branchEventLabel: 'Domínio meditativo da Caixa (T2:E6/E7)',
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 2,
    visualTraits: 'Roupas leves estilo guru/hippie, calma profunda.',
    psychologicalProfile: 'Mestre na navegação mental do Corredor; treina as equipes de exploração da Pirâmide.',
    storyArc:
      'No **Mundo Low-Tech ("World X")**, atua ao lado de Leighton 2 treinando os "scouts" (batedores) que mapearam 74 realidades através da **Pirâmide**, além de resgatar Amanda 2 e Ryan 1 da quarentena da Praga da Íris Negra no T2:E7.',
    branchOriginExplanation:
      'Ramificação de Leighton que atingiu iluminação espiritual no multiverso.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E6 & E7', detail: 'Atuação na Pirâmide (Mundo Low-Tech) e resgate de Amanda 2 e Ryan 1.' }
    ]
  },

  // ==================== BLAIR, DANIELA, CHARLIE, LAUREL, MITCHEL ====================
  {
    id: 'blair-2',
    baseCharacter: 'Blair Caplan',
    badgeNumber: 'B2',
    designation: 'Blair 2 (Sobrevivente do Mundo das Vespas)',
    alias: 'Blair Caplan (Reality 2)',
    shortRole: 'Escapou do Mundo das Vespas, passou pelo Santuário de Laurel e descobre A Pirâmide no Mundo Low-Tech.',
    actor: 'Amanda Brugel',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/a/a9/Blair_Caplan_Alternate.png/revision/latest?cb=20240531165547',
    accentColor: 'amber',
    originWorldId: 'world-velocity-2',
    currentWorldId: 'world-lowtech-analog',
    worldsVisited: [
      'world-velocity-2',
      'world-murder-hornets',
      'world-laurel-sanctuary',
      'world-sanctuary-refuge',
      'world-lowtech-analog'
    ],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Postura de sobrevivente hipervigilante.',
    psychologicalProfile: 'Conhece na pele o horror do multiverso e alerta Leighton de que A Pirâmide causará uma catástrofe.',
    storyArc:
      'Após ficar presa no Mundo das Vespas na 1ª temporada, consegue escapar passando pela casa de Laurel. No **Mundo Low-Tech ("World X")**, é levada por Leighton aos túneis subterrâneos de Chicago (T2:E6 & E7), onde fica horrorizada ao ver **A Pirâmide**.',
    branchOriginExplanation:
      'Nativa do Mundo 2 (Velocity Labs).',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Blair Caplan (Reality 2)', detail: 'Retrato oficial de Blair 2.' }
    ]
  },
  {
    id: 'blair-1',
    baseCharacter: 'Blair Caplan',
    badgeNumber: 'B1',
    designation: 'Blair 1 (Amiga de Daniela no Mundo Prime)',
    alias: 'Blair Caplan (Reality 1)',
    shortRole: 'Melhor amiga de Daniela no Mundo 1; empresta o carro com rastreador para seguir Jason 2.',
    actor: 'Amanda Brugel',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/e/ee/Blair_Caplan.png/revision/latest?cb=20240531165330',
    accentColor: 'cyan',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-prime-1',
    worldsVisited: ['world-prime-1'],
    status: 'Estabelecido em Paz',
    seasonIntroduced: 1,
    visualTraits: 'Estilo urbano elegante de Chicago.',
    psychologicalProfile: 'Leal a Daniela 1.',
    storyArc:
      'Ajuda Daniela 1 a descobrir onde Jason 2 esconde a Caixa no sul de Chicago.',
    branchOriginExplanation:
      'Nativa do Mundo 1.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Blair Caplan', detail: 'Retrato oficial de Blair 1.' }
    ]
  },
  {
    id: 'daniela-1',
    baseCharacter: 'Daniela & Charlie',
    badgeNumber: 'D1',
    designation: 'Daniela 1 (Esposa de Jason 1)',
    alias: 'Daniela Dessen / Vargas',
    shortRole: 'Matou o Jason invasor no Mundo 29, fugiu para o Mundo Low-Tech e no T2:E7 entrou na Caixa atrás de Charlie!',
    actor: 'Jennifer Connelly',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/f/fb/Daniela_Dessen.png/revision/latest?cb=20240531101339',
    accentColor: 'rose',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-lowtech-analog',
    worldsVisited: ['world-prime-1', 'world-sanctuary-refuge', 'world-lowtech-analog'],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Artista plástica; na 2ª temporada, mantém armas escondidas em casa por precaução.',
    psychologicalProfile: 'Exausta pela paranoia do multiverso, mas capaz de tudo para proteger e resgatar o filho Charlie.',
    storyArc:
      'Após 7 meses no Mundo 29 (T2:E1), uma variante hostil de Jason invade a casa e **Daniela o mata com um tiro**. Foge com Jason 1 e Charlie para o **Mundo Low-Tech ("World X")** no T2:E2. No T2:E6/E7, após passar um tempo na cabana da família e conversar com seu padrasto/pai, ela volta para casa, descobre que **Charlie entrou sozinho na Caixa** atrás de Max, deixa um bilhete para Jason 1 e **entra sozinha na Caixa** para resgatar o filho!',
    branchOriginExplanation:
      'Nativa do Mundo 1.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Daniela Dessen', detail: 'Retrato oficial de Jennifer Connelly como Daniela.' },
      { type: 'EPISODE_CANON', label: 'T2:E1, E2 & E7', detail: 'Mata o Jason invasor, foge para o Mundo Low-Tech e entra na Caixa atrás de Charlie.' }
    ]
  },
  {
    id: 'charlie-1',
    baseCharacter: 'Daniela & Charlie',
    badgeNumber: 'C1',
    designation: 'Charlie 1 (Em Busca do Irmão Gêmeo Max)',
    alias: 'Filho de Jason 1 e Daniela 1',
    shortRole: 'Fugiu do Mundo 29 para o Mundo Low-Tech com os pais e depois entrou na Caixa atrás do irmão Max.',
    actor: 'Oakes Fegley',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/0/0b/Charlie_Dessen.png/revision/latest?cb=20240418155111',
    accentColor: 'amber',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-laurel-sanctuary',
    worldsVisited: [
      'world-prime-1',
      'world-sanctuary-refuge',
      'world-lowtech-analog',
      'world-laurel-sanctuary'
    ],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Adolescente, alérgico a nozes.',
    psychologicalProfile: 'Frustrado por ter que abandonar sua escola novamente após a fuga do Mundo 29; obcecado em encontrar o irmão gêmeo Max.',
    storyArc:
      'Após Daniela matar o Jason invasor no Mundo 29 (T2:E1), Charlie é levado para o **Mundo Low-Tech ("World X")** (T2:E2). No T2:E6/E7, após Jason 1 lhe contar sobre o irmão gêmeo Max, Charlie entra secretamente na Caixa na piscina da escola abandonada e chega ao **Santuário de Laurel** (T2:E8), onde conversa com **Jason 34** e **Amanda 7**.',
    branchOriginExplanation:
      'Nativo do Mundo 1.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Charlie Dessen', detail: 'Retrato oficial de Oakes Fegley como Charlie.' }
    ]
  },
  {
    id: 'laurel-1',
    baseCharacter: 'Laurel & Agentes',
    badgeNumber: 'LAUREL',
    designation: 'Laurel (Guardiã do Santuário — T2:E8)',
    alias: 'A Enfermeira do Multiverso',
    shortRole: 'Ex-enfermeira cuja biblioteca abriga uma Caixa; salvou Amanda 7 e acolhe viajantes feridos.',
    actor: 'Margo Martindale',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/2/21/Dark_Matter_S2E09.jpg/revision/latest?cb=20261016143558',
    accentColor: 'emerald',
    originWorldId: 'world-laurel-sanctuary',
    currentWorldId: 'world-laurel-sanctuary',
    worldsVisited: ['world-laurel-sanctuary'],
    status: 'No Santuário',
    seasonIntroduced: 2,
    visualTraits: 'Acolhedora, prática e maternal.',
    psychologicalProfile: 'Transformou o luto pessoal em compaixão pelos viajantes da Caixa.',
    storyArc:
      'Centro do T2:E8 ("The Basic Oneness of Everything"). Salvou a vida de Amanda 7 quando Jason 34 saiu da Caixa em sua sala há dois anos.',
    branchOriginExplanation:
      'Nativa do Mundo 32.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E7 & E8', detail: 'Guardiã do Santuário.' }
    ]
  },
  {
    id: 'mitchel-2',
    baseCharacter: 'Laurel & Agentes',
    badgeNumber: 'MACNAMARA',
    designation: 'Mitchel MacNamara (MacNamara Tech / Mundo Low-Tech)',
    alias: 'Irmão de Sheila MacNamara & Investigador',
    shortRole: 'Investiga a Velocity Tech e a família Dessen no Mundo Low-Tech até ser dopado por Jason 1 e trancado no Corredor.',
    actor: 'Chris Diamantopoulos',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/d/d8/Dark_Matter_S2E02.jpg/revision/latest?cb=20260918144710',
    accentColor: 'rose',
    originWorldId: 'world-lowtech-analog',
    currentWorldId: 'world-lowtech-analog',
    worldsVisited: ['world-lowtech-analog', 'world-prime-1'],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 2,
    visualTraits: 'Terno de investigador / executivo.',
    psychologicalProfile: 'Astuto e implacável; investiga a relação entre a Caixa (na piscina da escola abandonada), a Velocity Tech de Leighton e os Dessen.',
    storyArc:
      'No **Mundo Low-Tech ("World X")**, sua irmã **Sheila MacNamara** (da *MacNamara Tech*) descobre tecnologia avançada com o logo da **Velocity Tech** ligada à Caixa na piscina de uma escola abandonada. Mitchel investiga os Dessen, flagra Amanda 2 e Ryan 1 entrando na Caixa e invade a casa de Jason 1 — mas Jason 1 o captura, coloca a droga Lavanda em sua bebida e o joga dentro do Corredor da Caixa!',
    branchOriginExplanation:
      'Nativo do Mundo Low-Tech (com contraparte federal na Reality 1 que interroga Jason 13).',
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E1–E8', detail: 'Disputa MacNamara Tech vs. Velocity Tech e captura no Corredor.' }
    ]
  }
];

export const JOURNEYS: BoxJourney[] = [
  {
    id: 'journey-1',
    order: 1,
    season: 1,
    episode: 'T1:E1 "Are You Happy in Your Life?"',
    fromWorldId: 'world-velocity-2',
    toWorldId: 'world-prime-1',
    travelers: ['jason-2'],
    subconsciousTrigger: 'Inveja e desejo obsessivo de viver a vida familiar ao lado de Daniela.',
    outcome: 'Jason 2 chega à Reality 1, sequestra Jason 1 e toma o lugar dele.'
  },
  {
    id: 'journey-2',
    order: 2,
    season: 1,
    episode: 'T1:E1 & E2',
    fromWorldId: 'world-prime-1',
    toWorldId: 'world-velocity-2',
    travelers: ['jason-1', 'jason-2'],
    subconsciousTrigger: 'Retorno programado de Jason 2 ao laboratório da Velocity Labs.',
    outcome: 'Jason 1 acorda na Reality 2 cercado por Leighton 2 e Amanda 2.'
  },
  {
    id: 'journey-3',
    order: 3,
    season: 1,
    episode: 'T1:E3 & E4 "The Corridor"',
    fromWorldId: 'world-velocity-2',
    toWorldId: 'world-ash',
    travelers: ['jason-1', 'amanda-2'],
    subconsciousTrigger: 'Pânico e medo da morte durante a fuga armada da Velocity Labs.',
    ampoulesRemaining: 48,
    outcome: 'Abrem a porta no World 03 (Ash World / Falling Apart).'
  },
  {
    id: 'journey-4',
    order: 4,
    season: 1,
    episode: 'T1:E4 "The Corridor"',
    fromWorldId: 'world-ash',
    toWorldId: 'world-ice-blizzard',
    travelers: ['jason-1', 'amanda-2'],
    subconsciousTrigger: 'Pânico de Amanda no Corredor tentando fugir da escuridão.',
    ampoulesRemaining: 44,
    outcome: 'Caem no World 15 (Whiteout Stranded); Amanda quase morre congelada.'
  },
  {
    id: 'journey-5',
    order: 5,
    season: 1,
    episode: 'T1:E5 "Worldless"',
    fromWorldId: 'world-ice-blizzard',
    toWorldId: 'world-murder-hornets',
    travelers: ['jason-1', 'amanda-2'],
    subconsciousTrigger: 'Lembrança da Velocity Labs e da colega Blair 2.',
    ampoulesRemaining: 36,
    outcome: 'Encontram Blair 2 isolada no World 19 (Big Wasps / Velocity Labs R4).'
  },
  {
    id: 'journey-6',
    order: 6,
    season: 1,
    episode: 'T1:E7 "In the Fires of Dead Stars"',
    fromWorldId: 'world-dying-sun',
    toWorldId: 'world-aurora-borealis',
    travelers: ['jason-1', 'amanda-2'],
    subconsciousTrigger: 'Desejo de Amanda 2 por uma Chicago acolhedora e empática ("Radical Empathy").',
    ampoulesRemaining: 2,
    outcome: 'Amanda 2 decide ficar no World 26, deixa duas ampolas para Jason 1 e depois conhece Ryan 1.'
  },
  {
    id: 'journey-7',
    order: 7,
    season: 1,
    episode: 'T1:E7 "In the Fires of Dead Stars"',
    fromWorldId: 'world-aurora-borealis',
    toWorldId: 'world-max-alive',
    travelers: ['jason-1'],
    subconsciousTrigger: 'Desejo de voltar para sua casa e família em Chicago.',
    ampoulesRemaining: 1,
    outcome: 'Jason 1 descobre um mundo onde o irmão gêmeo Max está vivo e vê Jason 5 dormindo com Daniela.'
  },
  {
    id: 'journey-8',
    order: 8,
    season: 1,
    episode: 'T1:E8 & E9 "Entanglement"',
    fromWorldId: 'world-max-alive',
    toWorldId: 'world-prime-1',
    travelers: ['jason-1', 'jason-3', 'jason-6', 'jason-7', 'jason-8', 'jason-24', 'jason-30'],
    subconsciousTrigger: 'Aceitação completa da história real (incluindo a perda de Max) com Daniela.',
    ampoulesRemaining: 0,
    outcome: 'Convergência de mais de 70 variantes de Jason na Reality 1.'
  },
  {
    id: 'journey-9',
    order: 9,
    season: 1,
    episode: 'T1:E9 "Entanglement" (Fuga Final da T1)',
    fromWorldId: 'world-prime-1',
    toWorldId: 'world-sanctuary-refuge',
    travelers: ['jason-1', 'daniela-1', 'charlie-1'],
    subconsciousTrigger: 'Desejo de um refúgio tranquilo longe das dezenas de Jasons da Reality 1.',
    outcome: 'A família Dessen vive escondida por 7 meses no Mundo 29 ("A Quiet Life").'
  },
  {
    id: 'journey-10',
    order: 10,
    season: 2,
    episode: 'T2:E1 & T2:E2 ("A Quiet Life" → "A Perfect World")',
    fromWorldId: 'world-sanctuary-refuge',
    toWorldId: 'world-lowtech-analog',
    travelers: ['jason-1', 'daniela-1', 'charlie-1'],
    subconsciousTrigger: 'Desejo de um mundo sem tecnologia digital, câmeras ou internet após Daniela matar um Jason invasor.',
    outcome: 'Fogem da polícia do Mundo 29 e chegam à Chicago Low-Tech (onde Nixon cancelou a Corrida Espacial e não existem computadores).'
  },
  {
    id: 'journey-11',
    order: 11,
    season: 2,
    episode: 'T2:E8 (Flashback de 2 anos antes)',
    fromWorldId: 'world-tree-branch-accident',
    toWorldId: 'world-laurel-sanctuary',
    travelers: ['jason-34', 'amanda-7'],
    subconsciousTrigger: 'Pedido desesperado de socorro após Amanda 7 ser empalada por um galho.',
    outcome: 'Chegam à biblioteca da enfermeira Laurel, que salva Amanda 7 (enquanto na linha de Jason 13 ela morreu).'
  },
  {
    id: 'journey-12',
    order: 12,
    season: 2,
    episode: 'T2:E5 "Love and Be Loved"',
    fromWorldId: 'world-prime-1',
    toWorldId: 'world-ellie-maria',
    travelers: ['jason-24', 'jason-30'],
    subconsciousTrigger: 'Saudade da mãe falecida Ellie após perder Daniela no final da T1.',
    ampoulesRemaining: 0,
    outcome: 'Jason 24 reconstrói a vida com a mãe Ellie, acolhe os Jasons 30 e 31 e conhece Maria.'
  },
  {
    id: 'journey-13',
    order: 13,
    season: 2,
    episode: 'T2:E7 & E8 "The Basic Oneness of Everything"',
    fromWorldId: 'world-lowtech-analog',
    toWorldId: 'world-laurel-sanctuary',
    travelers: ['charlie-1'],
    subconsciousTrigger: 'Busca secreta de Charlie 1 pelo irmão gêmeo Max.',
    outcome: 'Charlie 1 sai do Mundo Low-Tech e chega ao Santuário de Laurel, onde conversa com Jason 34 e Amanda 7.'
  }
];

export const PODCAST_RULES_AND_LORE = [
  {
    title: 'Por que existem números como Jason 13, Jason 24, Jason 30, Jason 34 e Amanda 7?',
    speaker: 'Blake Crouch & Jacquelyn Ben-Zekry — Dark Matter: The Official Podcast',
    explanation:
      'No podcast oficial, Blake Crouch explicou que números como Jason 13, 24, 30, 31, 34 e Amanda 7 NÃO significam que eles vieram do "Mundo 34". Todos esses Jasons nasceram na Reality 1! O número é a identificação oficial dos roteiros para rastrear cada ramificação surgida dentro do Corredor. Exemplo clássico: quando o galho de árvore atinge Amanda, o caminho se divide entre a linha de Jason 13 (onde Amanda morre e ele fica preso na DARPA) e a linha de Jason 34 (onde ele salva a vida da Amanda 7 levando-a para a casa de Laurel).'
  },
  {
    title: 'A Sala de Chat dos Jasons (Onde Jason 1 vira "Jason9")',
    speaker: 'Blake Crouch — Podcast Oficial T1:E8 & E9',
    explanation:
      'No Episódio 8 da 1ª temporada, Jason 1 entra em um chat que ele mesmo programou na faculdade. Quando faz login achando que seria o único, descobre que "Jason1" a "Jason8" já estavam ocupados por variantes que chegaram antes dele — obrigando nosso protagonista a usar o nick "Jason9".'
  },
  {
    title: 'O Destino dos Outros Jasons: Jason 24, 30 e 31 (T2:E5)',
    speaker: 'Podcast Oficial T2:E5 "Love and Be Loved"',
    explanation:
      'O Episódio 5 da 2ª temporada responde o que aconteceu com os Jasons que ficaram para trás no final da T1: acompanhamos o Jason 24, que usa sua última ampola pensando na mãe falecida (Ellie) e vai para um mundo onde ela está viva. Lá ele também acolhe os traumatizados Jason 30 e Jason 31.'
  },
  {
    title: 'Da Utopia da Aurora (World 26) à Praga da Íris Negra (Hema Aetho 26)',
    speaker: 'Lore Oficial T1:E6/E7 & T2:E4/E7',
    explanation:
      'O World 26 ("Radical Empathy" / Utopia da Aurora Boreal) onde Amanda 2 e Ryan 1 ficaram no fim da T1 entra em colapso na T2 porque outra dupla de variantes (Ryan 3 e sua Amanda) trouxe acidentalmente o vírus letal Hema Aetho 26 de outro mundo.'
  }
];
