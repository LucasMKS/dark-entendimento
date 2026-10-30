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
    shortHook: 'Onde Jason escolheu o casamento com Daniela, 70+ Jasons convergem na T1 e o Agente Mitchel MacNamara investiga o necrotério na T2.',
    officialOrFanName: 'Reality 1 / Jason 1 World (R1)',
    season: '1 & 2',
    episodes: ['T1:E1', 'T1:E2', 'T1:E6', 'T1:E8', 'T1:E9', 'T2:E1', 'T2:E3', 'T2:E9'],
    category: 'Root',
    habitability: 'Habitável',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/3/32/Abandoned_warehouse_r1.png/revision/latest?cb=20240820012601',
    themeColor: '#f59e0b',
    atmosphere: 'Chicago contemporânea padrão. Sob investigação federal secreta devido aos corpos de Jasons e black-site da DARPA.',
    boxLocation: 'Hangar abandonado (Abandoned Warehouse) no sul de Chicago.',
    description:
      'A realidade de origem que acompanhamos no Episódio 1. Aqui, Jason Dessen optou por ficar com Daniela quando ela engravidou dos gêmeos Charlie e Max (embora Max tenha falecido no parto). No final da 1ª temporada, mais de 70 variantes de Jason convergem neste mundo. Na abertura da 2ª temporada (**T2:E1 "A Quiet Life"**), dezenas de corpos idênticos de Jasons mortos acumulam-se no necrotério de Chicago, levando o agente federal **Mitchel MacNamara (Reality 1)** a prender **Jason 13 ("Scar Jason")** em uma cela DARPA. No **T2:E9 ("How to Build the Box")**, **Daniela 1** retorna em busca de Charlie, é capturada na mesma cela e, unindo forças com Jason 13, atrai MacNamara para a Caixa, dopando-o e eliminando-o em um mundo condenado.',
    visitors: [
      'jason-2',
      'jason-3',
      'jason-4',
      'jason-6',
      'jason-7',
      'jason-8',
      'jason-13',
      'jason-24',
      'jason-30',
      'jason-morgue-r1',
      'ryan-2',
      'daniela-1'
    ],
    residents: ['jason-1', 'daniela-1', 'charlie-1', 'ryan-1', 'blair-1', 'leighton-1', 'amanda-1', 'mitchel-1'],
    podcastInsight:
      'No Podcast Oficial, Blake Crouch explicou que todas as dezenas de Jasons que invadem este mundo saíram originalmente daqui — todos são ramificações do Jason 1 criadas pelas escolhas dele na Caixa.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E1, T1:E9 & T2:E1 "A Quiet Life"', detail: 'Convergência dos 70+ Jasons e investigação de Mitchel MacNamara (R1) sobre os corpos em Chicago.' },
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
    episodes: ['T1:E1', 'T1:E2', 'T1:E3', 'T1:E7', 'T2:E9', 'T2:E10'],
    category: 'Industrial',
    habitability: 'Habitável',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/6/6d/Image_2024-08-07_192406104.png/revision/latest?cb=20240808022410',
    themeColor: '#06b6d4',
    atmosphere: 'Chicago hiper-tecnológica dominada pelo complexo corporativo da Velocity Labs.',
    boxLocation: 'Hangar de contenção de alta segurança na sede da Velocity Labs.',
    description:
      'O universo onde Jason 2 decidiu priorizar a pesquisa quântica em vez de casar com Daniela há 15 anos. Com o financiamento bilionário de Leighton 2, ele construiu a Caixa e a droga Lavanda. É o mundo natal de Amanda 2, Leighton 2 e Blair 2. No **T2:E9 ("How to Build the Box")**, os flashbacks revelam a obsessão cega de sua construção original, enquanto Blair 2 conclui que a Caixa da Velocity Labs é o nodo-mestre onde deve ser injetado o "Kill Switch" para selar todo o multiverso. No **T2:E10 ("No Quiet Life")**, Jason 1 e Blair retornam a este hangar após vencerem Sandra em gravidade zero; Jason 1 conecta o Kill Switch na Caixa Matriz com um detonador de 10 minutos. Em seguida, Jason e Blair saltam de volta pela Caixa rumo ao Mundo Low-Tech antes da detonação, que aniquila a superposição quântica e sela todas as portas do Corredor para sempre.',
    visitors: ['jason-1', 'jason-3', 'jason-4', 'jason-6', 'jason-7', 'jason-8', 'jason-13', 'jason-24', 'jason-30', 'jason-34', 'jason-stalker-29', 'jason-morgue-r1', 'ryan-2', 'blair-2'],
    residents: ['jason-2', 'amanda-2', 'amanda-7', 'amanda-j13', 'leighton-2', 'blair-2', 'blair-19-dead'],
    podcastInsight:
      'A fotografia deste mundo usa tons frios de aço e ciano para contrastar com o calor familiar do Mundo 1.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E2 "Trip of a Lifetime"', detail: 'Jason 1 acorda na Velocity Labs.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Instalação do Kill Switch na Caixa Matriz e destruição definitiva da superposição.' },
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
    visitors: ['jason-1', 'amanda-2', 'leighton-2', 'jason-3', 'jason-8', 'jason-morgue-r1', 'amanda-j13'],
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
    visitors: ['jason-1', 'amanda-2', 'leighton-2', 'jason-6', 'jason-morgue-r1'],
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
      'Catalogado na Wiki como "Big Wasps / Velocity Labs R4". É o mundo onde Blair 2 ficou presa durante os testes da Velocity Labs após outra versão de Blair (**Blair Viajante**) abrir a porta e ser devorada viva por enxames de vespas gigantes dentro do hangar. Jason 1 e Amanda 2 encontram Blair 2 armada aqui no T1:E5. Na 2ª temporada, Blair 2 consegue escapar deste mundo até o Santuário de Laurel.',
    visitors: ['blair-2', 'blair-19-dead', 'jason-1', 'amanda-2', 'jason-8'],
    residents: [],
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E5 "Worldless" & T2:E8', detail: 'Encontro com Blair 2 e gravação das câmeras do laboratório mostrando a morte da outra Blair.' },
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
    episodes: ['T1:E6', 'T1:E7', 'T1:E9', 'T2:E1', 'T2:E4', 'T2:E7', 'T2:E10'],
    category: 'Utopian',
    habitability: 'Quarentena / Crítico',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/7/78/Kinder_more_progressive_place.png/revision/latest?cb=20240822030731',
    themeColor: '#10b981',
    atmosphere: 'Chicago utópica com auroras boreais verdes; na 2ª temporada, sob quarentena militar do CDC até a chegada do antídoto de Oluko no T2:E10.',
    boxLocation: 'Galpão tranquilo próximo ao lago.',
    description:
      'Catalogado oficialmente na Wiki como **"World 26 / Radical Empathy / Kinder More Progressive Place"**. É onde Jason 2 abandona Ryan 1 (T1:E6) e onde Amanda 2 decide morar (T1:E7). Na 2ª temporada, outra dupla de variantes (**Ryan 3** e sua Amanda falecida) contamina este mundo com a **Praga da Íris Negra (Hema Aetho 26)**, fazendo com que Amanda 2 e Ryan 1 sejam detidos pelo CDC em **T2:E4 ("Stars, Hide Your Fires")** até serem resgatados por Leighton 6 em **T2:E7 ("The Pyramid")**. No **T2:E10 ("No Quiet Life")**, Amanda 2 e Ryan 1 retornam com urgência trazendo o antídoto sintetizado por Oluko, curando os infectados e salvando a população antes de retornarem pela Caixa no limite do prazo de uma hora.',
    visitors: ['jason-2', 'ryan-1', 'amanda-2', 'jason-1', 'ryan-3', 'leighton-1', 'leighton-6'],
    residents: ['amanda-2', 'ryan-1'],
    podcastInsight:
      'Designado oficialmente nos roteiros e na Wiki como World 26 ("Radical Empathy").',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Radical Empathy (World 26)', detail: 'Frame oficial da Chicago utópica com aurora boreal.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Entrega do antídoto de Oluko por Amanda 2 e Ryan 1 salvando a cidade da Praga da Íris Negra.' }
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
    episodes: ['T1:E7', 'T2:E7', 'T2:E8', 'T2:E9', 'T2:E10'],
    category: 'Root',
    habitability: 'Habitável',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/8/8c/Max_Dessen_in_season_1_episode_7.jpg/revision/latest?cb=20260921232212',
    themeColor: '#10b981',
    atmosphere: 'Chicago quase idêntica ao Mundo 1, onde a família Dessen vive em perfeita estabilidade familiar.',
    boxLocation: 'Hangar de Chicago.',
    description:
      'Catalogado na Wiki como "Massive Disappointment" (T1:E7). Jason 1 chega achando que voltou para casa, mas encontra outro Jason (**Jason 5**) dormindo com Daniela e se choca ao encontrar **Maximillian (Max)** — o irmão gêmeo de Charlie que havia morrido no nascimento no Mundo 1 — vivo e saudável! No **T2:E9 ("How to Build the Box")**, **Charlie 1** chega a este mundo através da Caixa, reencontrando o irmão Max. No **T2:E10 ("No Quiet Life")**, **Daniela 1** é guiada até aqui por **Jason 13** ancorando suas memórias afetivas, proporcionando o reencontro comovente entre Daniela, Charlie e o jovem Max vivo. Jason 13 se despede com nobreza e recusa atravessar para não quebrar a paz familiar, enquanto Daniela e Charlie partem novamente pela Caixa em busca de um lar definitivo.',
    visitors: ['jason-1', 'charlie-1', 'daniela-1', 'jason-13'],
    residents: ['jason-5'],
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Maximillian Dessen', detail: 'Foto oficial de Max Dessen no Episódio 7.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Reencontro de Daniela 1 com Charlie e Max, guiada com integridade por Jason 13.' }
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
      'O grande ponto de bifurcação da 2ª temporada: um galho de árvore atravessa o peito de Amanda dentro da Caixa. Na ramificação de **Jason 13 ("Scar Jason")**, sua **Amanda morre em seus braços**. Na ramificação de **Jason 34**, ele carrega **Amanda 7** até o Santuário de Laurel e salva sua vida.',
    visitors: ['jason-13', 'amanda-j13', 'jason-34', 'amanda-7'],
    residents: [],
    podcastInsight:
      'Citado diretamente no Podcast Oficial T2:E8 para explicar a diferença entre Jason 13 e o casal Jason 34 & Amanda 7.',
    sources: [
      { type: 'OFFICIAL_PODCAST', label: 'Podcast Oficial T2:E8', detail: 'Explicação de Jason 34 e Amanda 7 vs. Jason 13.' }
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
      'O mundo para onde Jason 1, Daniela 1 e Charlie 1 fugiram no final da 1ª temporada e viveram escondidos por 7 meses. No **T2:E1 ("A Quiet Life")**, enquanto Jason 1 está fora trabalhando, o **Jason Invasor do Mundo 29** (uma variante hostil que mantinha um diário rastreando a rotina da família) invade a casa e **Daniela o mata com um tiro** para proteger a família. Quando o policial local Jay Stringer aparece investigando o carro abandonado do invasor enquanto Jason 1 tenta enterrar o corpo, a família é obrigada a fugir imediatamente pela Caixa para o **Mundo Low-Tech**.',
    visitors: ['jason-1', 'daniela-1', 'charlie-1', 'jason-stalker-29', 'jason-13', 'blair-2'],
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
    episodes: ['T2:E2', 'T2:E3', 'T2:E4', 'T2:E6', 'T2:E7', 'T2:E9', 'T2:E10'],
    category: 'Root',
    habitability: 'Habitável',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/b/b7/Dark_Matter_S2E07.jpg/revision/latest?cb=20261002143559',
    themeColor: '#6366f1',
    atmosphere: 'Chicago analógica/retrô (sem internet ou celulares), mas com "A Pirâmide" oculta nos túneis subterrâneos.',
    boxLocation: 'Piscina vazia de uma escola abandonada (e "A Pirâmide" nos túneis de carga sob Chicago).',
    description:
      'Conhecido como **"World X" / Mundo Low-Tech**, é o cenário central da 2ª temporada — onde acontecem TANTO o refúgio da família Dessen QUANTO a construção da **Pirâmide**! Neste universo, Nixon venceu JFK em 1960 e cancelou a Corrida Espacial da NASA, impedindo a invenção do microprocessador. **Jason 1, Daniela 1 e Charlie 1** fogem para cá no T2:E2 após Daniela matar o Jason invasor no Mundo 29. Porém, **Leighton Vance** já havia se instalado neste mesmo mundo com a **Velocity Tech** e construído nos túneis subterrâneos **A Pirâmide** (com ajuda de **Oluko/Leighton 6** e **Jason 2**). No T2:E7, **Charlie 1** e **Daniela 1** entram na Caixa, enquanto **Jason 2** bate à porta de **Jason 1**. No **T2:E9 ("How to Build the Box")**, Leighton testemunha o horror e colapso causados pelas portas da Pirâmide, enquanto **Blair 2** arquiteta o plano do Kill Switch mestre para neutralizar todas as Caixas. No **T2:E10 ("No Quiet Life")**, Jason 2 e Leighton 2 decidem abandonar A Pirâmide para abrir um bar em Kokomo; contudo, Oluko descobre a intenção de desmonte, assassina Leighton 2 por estrangulamento e ativa a Pirâmide, fugindo pelo multiverso. No clímax da temporada, o bar de bairro **Village Tap** neste mundo serve como o ponto de reencontro combinado entre **Jason 1, Blair 2, Amanda 2 e Ryan 1**. Amanda e Ryan retornam do Mundo 26 e preparam os copos no balcão (Diet Cokes e uísque). Jason 1 e Blair retornam após acionarem o Kill Switch na Velocity Labs momentos antes da detonação. Os quatro sobreviventes se reúnem com alívio no Village Tap após selarem a Caixa, mas o momento se torna desolador quando Jason 1 constata que Daniela e Charlie nunca chegaram ao bar — ejetados no Mundo 36 durante o colapso quântico.',
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
      'mitchel-2',
      'leighton-oluko',
      'sandra-1'
    ],
    residents: ['jason-1', 'blair-2', 'amanda-2', 'ryan-1', 'leighton-2', 'jason-2', 'mitchel-2', 'leighton-oluko'],
    podcastInsight:
      'O Mundo Low-Tech e o Mundo da Pirâmide são a exata mesma realidade ("World X"): Leighton usou a falta de tecnologia digital deste mundo para dominar o mercado com a Velocity Tech e construir a Pirâmide nos túneis de Chicago.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E2, T2:E4, T2:E6 & T2:E7', detail: 'Refúgio dos Dessen, disputa Velocity Tech vs. MacNamara Tech e revelação da Pirâmide.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Assassinato de Leighton 2 por Oluko na Pirâmide e fuga de Oluko.' },
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
      'Cenário do T2:E5 ("Love and Be Loved"). **Jason 24** usa sua última ampola pensando na mãe falecida (**Ellie**). Aqui, Ellie está viva (comunicando-se em língua de sinais), mas o **Jason Nativo deste mundo morreu aos 16 anos**. Jason 24 reconstrói a vida como marceneiro, acolhe os traumatizados **Jason 30** e **Jason 31** em casa e se apaixona por **Maria**.',
    visitors: ['jason-24', 'jason-30'],
    residents: ['jason-24', 'jason-30', 'jason-nativo-31'],
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
    shortHook: 'Propriedade isolada após uma bomba suja em Chicago onde a enfermeira Laurel salvou Amanda 7 e acolhe Charlie 1.',
    officialOrFanName: "Laurel's Sanctuary House (S2E08)",
    season: 2,
    episodes: ['T2:E7', 'T2:E8'],
    category: 'Sanctuary',
    habitability: 'Refúgio Seguro',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/f/f9/Dark_Matter_S2E08.jpg/revision/latest?cb=20261016143155',
    themeColor: '#10b981',
    atmosphere: 'Propriedade rural arborizada e autossuficiente (após o centro de Chicago ter sido atingido por uma bomba suja anos antes).',
    boxLocation: 'Dentro da biblioteca da casa de Laurel.',
    description:
      'Revelado no **T2:E8 ("The Basic Oneness of Everything")**. Neste mundo, uma bomba suja radioativa atingiu Chicago anos antes, e uma Caixa materializou-se dentro da biblioteca da ex-enfermeira militar **Laurel** (Margo Martindale). De lá saíram **Jason 34** carregando **Amanda 7** empalada por um galho. Laurel salvou Amanda 7 e transformou a casa em santuário para viajantes como **Blair 2** e **Charlie 1**.',
    visitors: ['jason-34', 'amanda-7', 'blair-2', 'charlie-1', 'leighton-6'],
    residents: ['laurel-1', 'amanda-7', 'jason-34'],
    podcastInsight:
      'No Podcast Oficial, Blake Crouch confirma as designações de Jason 34 e Amanda 7 como o coração emocional deste santuário.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: The Basic Oneness of Everything (S2E08)', detail: 'Imagem oficial de Jason 34 e Amanda 7 no Episódio 8.' }
    ]
  },
  {
    id: 'world-meteor-apocalypse',
    code: 'WORLD 33',
    numberLabel: '33',
    name: 'Mundo do Impacto de Meteoro ("How to Build the Box")',
    shortHook: 'Realidade condenada à beira de um impacto celestial onde Jason 13 e Daniela 1 trancam e eliminam o Agente Mitchel MacNamara.',
    officialOrFanName: 'Meteor Impact World / MacNamara Downfall (S2E09 How to Build the Box)',
    season: 2,
    episodes: ['T2:E9'],
    category: 'Hostile',
    habitability: 'Letal / Extremo',
    imageUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/a/a2/Dark_Matter_S2E09.jpg/revision/latest?cb=20261023145520',
    themeColor: '#ef4444',
    atmosphere: 'Céu incandescente com meteoro em trajetória de colisão iminente contra Chicago; sirenes de emergência e caos pré-apocalíptico.',
    boxLocation: 'Hangar industrial com visão aberta para o céu em chamas e a baía de Chicago.',
    description:
      'Cenário clímax do **T2:E9 ("How to Build the Box")**. O Agente Federal **Mitchel MacNamara (Reality 01)** acreditava ter dominado a física da Caixa e decifrado seu entrelaçamento quântico após interrogar **Jason 13** em sua cela DARPA por dois anos. Quando **Daniela 1** é capturada ao regressar à Reality 01 procurando por Charlie, ela e Jason 13 armam uma cilada para MacNamara: prometem entregar as instruções operacionais secretas e o atraem para dentro da Caixa. Lá dentro, Jason 13 e Daniela o imobilizam, injetam-lhe à força a substância psicotrópica (*Lilac Wings* / Lavanda) e o empurram para fora da porta deste mundo condenado — segundos antes de um meteoro colossal devastar a superfície de Chicago. A porta da Caixa é imediatamente trancada por Jason 13 e Daniela, sentenciando MacNamara à morte definitiva e permitindo a fuga da dupla pelo Corredor.',
    visitors: ['mitchel-1', 'jason-13', 'daniela-1'],
    residents: [],
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E9 "How to Build the Box"', detail: 'Armadilha na Caixa, expulsão e morte do Agente MacNamara no mundo sob impacto de meteoro.' },
      { type: 'FANDOM_WIKI', label: 'Wiki: How to Build the Box (S2E09)', detail: 'Queda de MacNamara e fuga de Jason 13 e Daniela 1.' }
    ]
  },
  {
    id: 'world-zero-gravity',
    code: 'WORLD 34',
    numberLabel: '34',
    name: 'Mundo Gravidade Zero ("No Quiet Life")',
    shortHook: 'Chicago onde as constantes gravitacionais foram anuladas; palco do combate físico em gravidade zero onde Sandra é morta.',
    officialOrFanName: 'Zero-Gravity Reality / Sandra Battleground (S2E10 Finale)',
    season: 2,
    episodes: ['T2:E10'],
    category: 'Hostile',
    habitability: 'Letal / Extremo',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#06b6d4',
    atmosphere: 'Ausência total de gravidade; escombros urbanos, vidros e móveis flutuando em suspensão eterna sob o céu de Chicago.',
    boxLocation: 'A Caixa flutua suspensa no vácuo de um armazém industrial abandonado.',
    description:
      'No clímax de **T2:E10 ("No Quiet Life")**, Jason 1 e Blair Caplan 2 são perseguidos através do Corredor pela assassina Sandra (enviada por Oluko). Eles colidem nesta realidade bizarra onde as leis da física foram invertidas e a gravidade é nula. Em um confronto corpo a corpo acrobático e brutal flutuando sem peso, Sandra danifica o dispositivo do Kill Switch, mas é dominada e morta por Jason 1 e Blair. Com o tempo se esgotando, Blair repara os circuitos avariados da máquina antes que saltem para a Caixa Matriz na Reality 02.',
    visitors: ['jason-1', 'blair-2', 'sandra-1'],
    residents: [],
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Confronto em gravidade zero, morte da operativa Sandra e reparo emergencial do Kill Switch.' }
    ]
  },
  {
    id: 'world-warzone-chicago',
    code: 'WORLD 35',
    numberLabel: '35',
    name: 'Mundo Chicago em Guerra ("No Quiet Life")',
    shortHook: 'Chicago arrasada por conflito militar bélico e bombardeios pesados; rota de fuga no Corredor sob perseguição armada.',
    officialOrFanName: 'Warzone Chicago / Sandra Pursuit Reality',
    season: 2,
    episodes: ['T2:E10'],
    category: 'Apocalyptic',
    habitability: 'Letal / Extremo',
    imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#f97316',
    atmosphere: 'Sirenes de ataque aéreo, colunas de fumaça preta, bombardeios de artilharia e barricadas militares.',
    boxLocation: 'Cercada por escombros de concreto e trincheiras militares improvisadas.',
    description:
      'Uma das realidades perigosas pelas quais Jason 1 e Blair Caplan 2 passam em fuga frenética no **T2:E10 ("No Quiet Life")**. Perseguidos a tiros por Sandra através do Corredor, a dupla emerge brevemente nesta Chicago em plena zona de guerra ativa, escapando por milagre de estilhaços e fogo cruzado militar antes de mergulharem na porta seguinte.',
    visitors: ['jason-1', 'blair-2', 'sandra-1'],
    residents: [],
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Perseguição armada através de Chicago em guerra civil.' }
    ]
  },
  {
    id: 'world-stranded-cliffhanger',
    code: 'WORLD 36',
    numberLabel: '36',
    name: 'Mundo do Exílio ("No Quiet Life — Cliffhanger T2")',
    shortHook: 'Realidade desconhecida onde Daniela 1 e Charlie 1 emergem após o Kill Switch colapsar o Corredor; gancho para a 3ª temporada.',
    officialOrFanName: 'The Stranded Reality / S2 Cliffhanger World',
    season: 2,
    episodes: ['T2:E10'],
    category: 'Root',
    habitability: 'Habitável',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#a855f7',
    atmosphere: 'Chicago com céu sereno e silencioso ao entardecer; atmosfera misteriosa e desprovida de sinais familiares.',
    boxLocation: 'A Caixa tem suas portas seladas de fora a fora, tornando-se um bloco de metal inerte e impassível.',
    description:
      'O cenário do devastador desfecho da 2ª temporada (**T2:E10 "No Quiet Life"**). Daniela 1 e Charlie 1 viajavam juntos pelo Corredor tentando retornar para um lar definitivo após se despedirem de Max no Mundo 27. No instante crucial do trânsito quântico, Jason 1 detona o Kill Switch na Reality 02, desfazendo a superposição e destruindo a rede interdimensional. O Corredor se extingue abruptamente e a porta cospe Daniela e Charlie nesta Chicago desconhecida. As portas da Caixa se fecham de vez, transformando-a em ferro maciço. Daniela e Charlie olham estarrecidos para as ruas desertas, percebendo que estão encalhados para sempre em um universo alternativo — separados eternamente de Jason 1 no cruel cliffhanger que prepara o terreno para a 3ª temporada.',
    visitors: ['daniela-1', 'charlie-1'],
    residents: [],
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Fechamento definitivo das portas da Caixa e exílio de Daniela e Charlie no season finale.' }
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
    shortRole: 'No Season Finale (T2:E10), enfrenta Sandra em gravidade zero, instala o Kill Switch na Caixa da Reality 02 e retorna a tempo ao Mundo Low-Tech, reunindo-se no bar Village Tap.',
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
      'world-lowtech-analog',
      'world-warzone-chicago',
      'world-zero-gravity',
      'world-velocity-2',
      'world-lowtech-analog'
    ],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Aliança de barbante no dedo (depois recupera a original), cicatriz no rosto, colar Polaris dado por Amanda 2.',
    psychologicalProfile: 'Devotado à família; no desfecho da T2 arrisca a vida para selar a tecnologia da Caixa, culminando em uma amarga e trágica vitória.',
    storyArc:
      'Após Daniela matar um Jason invasor no Mundo 29 (T2:E1), leva a família para o **Mundo Low-Tech ("World X")** no T2:E2. Lá, percebe que destruir a Caixa fisicamente na piscina da escola abandonada não funciona e tenta desconectá-la do multiverso usando Emaranhamento Quântico. Flagra **Mitchel MacNamara** invadindo sua casa, dopa-o com Lavanda e o tranca no Corredor. No final do T2:E7, reencontra **Jason 2**. No season finale (**T2:E10 "No Quiet Life"**), une forças com Blair Caplan 2 para executar o Kill Switch definitivo. Sob perseguição armada de Sandra através de Chicago em Guerra, enfrenta a assassina em gravidade zero e instala o detonador de 10 minutos na Caixa Matriz da Velocity Labs (Reality 02). Em seguida, salta pela Caixa de volta ao Mundo Low-Tech antes da detonação, que aniquila a superposição quântica. Ele se reúne com Blair 2, Amanda 2 e Ryan 1 no **Village Tap** comemorando o fim da ameaça, mas descobre com desespero que seu ato colapsou o Corredor enquanto Daniela e Charlie estavam em trânsito — deixando-os ejetados no Mundo 36 e selando a separação de sua família.',
    branchOriginExplanation:
      'A linha-tronco original da série. Cada decisão dele na Caixa gerou as dezenas de outras variantes numeradas.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Jason Dessen', detail: 'Retrato oficial de Joel Edgerton como Jason 1.' },
      { type: 'EPISODE_CANON', label: 'T2:E1–E9', detail: 'Fuga para o Mundo Low-Tech, confronto com MacNamara e aliança com Blair 2.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Combate em gravidade zero, ativação do Kill Switch na Caixa Matriz e separação definitiva da família.' }
    ]
  },
  {
    id: 'jason-2',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J2',
    designation: 'Jason 2 (Criador da Caixa & Da Pirâmide)',
    alias: 'Dr. Jason Dessen — Velocity Labs',
    shortRole: 'Criou a Caixa no Mundo 2, projetou A Pirâmide no Mundo Low-Tech, perde Leighton 2 e testemunha a ruína do multiverso no T2:E10.',
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
    psychologicalProfile: 'Gênio da física quântica vencedor do Prêmio Pavia; busca redenção, mas é confrontado com a morte brutal do parceiro Leighton 2.',
    storyArc:
      'Constrói a Caixa no Mundo 2, sequestra Jason 1 e assume o lugar dele no Mundo 1. No final da 1ª temporada, arrependido, ajuda a família Dessen a fugir. Na 2ª temporada, no **Mundo Low-Tech ("World X")**, ajuda Leighton e Oluko a construir **A Pirâmide** e bate à porta de Jason 1. No **T2:E9 ("How to Build the Box")**, Jason 2 revisita a dura gênese da Caixa original, confessando os custos humanos devastadores. No episódio final (**T2:E10 "No Quiet Life"**), decide abandonar a ambição e propõe a Leighton 2 abrirem um bar em Kokomo. Quando Oluko descobre a intenção de desligar A Pirâmide, estrangula Leighton 2 até a morte. Desolado, Jason 2 crema o corpo de Leighton na beira do rio, tenta impedir a fuga de Oluko com a Pirâmide e termina em luto solitário perante o colapso da tecnologia.',
    branchOriginExplanation:
      'Divergiu de Jason 1 há 15 anos quando decidiu não se casar com Daniela.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Jason Dessen 2', detail: 'Retrato oficial de Jason 2.' },
      { type: 'EPISODE_CANON', label: 'T2:E7 & T2:E9 "How to Build the Box"', detail: 'Participação na Pirâmide e revelação da gênese da Caixa original.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Proposta do bar em Kokomo, cremação de Leighton 2 assassinado por Oluko e confronto final.' }
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
    designation: 'Jason 13 ("Scar Jason" — Liberto com Daniela)',
    alias: 'Jason da Cicatriz na Testa',
    shortRole: 'Sua Amanda morreu no galho; preso pela DARPA, foge com Daniela 1 no T2:E9, ajuda-a a reencontrar Charlie e Max no T2:E10 e vaga livre pelo Corredor.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/9/99/Dark_Matter_S2E03.jpg/revision/latest?cb=20260918144957',
    accentColor: 'rose',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-prime-1',
    worldsVisited: [
      'world-prime-1',
      'world-velocity-2',
      'world-tree-branch-accident',
      'world-sanctuary-refuge',
      'world-meteor-apocalypse',
      'world-max-alive'
    ],
    parentVariantId: 'jason-1',
    branchEventLabel: 'Morte de Amanda no Acidente do Galho (oposto de Jason 34)',
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 2,
    visualTraits: 'Cicatriz profunda na testa ("Scar Jason"), olhar obstinado de sobrevivência e compaixão no desfecho.',
    psychologicalProfile: 'Consumido pela culpa e raiva após ver sua Amanda morrer, encontrou propósito em libertar Daniela e devolvê-la aos filhos Charlie e Max.',
    storyArc:
      'Na 2ª temporada, é mantido em uma cela transparente na DARPA pelo Agente Mitchel MacNamara (Reality 01). No **T2:E9 ("How to Build the Box")**, quando **Daniela 1** é capturada ao regressar à Reality 01 procurando por Charlie, eles se unem: fingem aceitar as exigências de MacNamara, atraem-no para a Caixa, dopam-no e o banem para o Mundo Meteoro (Mundo 33). No finale (**T2:E10 "No Quiet Life"**), viaja com Daniela pelo Corredor. Compreendendo o abismo do luto pela perda da família, orienta Daniela a focar na memória de Charlie e Max brincando na infância. Ele localiza e abre a porta do Mundo 27, possibilitando o abraço de Daniela com Charlie e Max vivo. Em um momento de comovente nobreza, Jason 13 decide não cruzar o limiar para não romper a harmonia daquela família, despedindo-se com carinho e voltando a caminhar pelas infinitas portas do Corredor.',
    branchOriginExplanation:
      'Bifurcação direta do acidente da árvore (Mundo 28) onde Amanda não sobreviveu.',
    sources: [
      { type: 'OFFICIAL_PODCAST', label: 'Podcast Oficial T2', detail: 'Blake Crouch detalha o trauma de Jason 13 vs. Jason 34.' },
      { type: 'EPISODE_CANON', label: 'T2:E9 "How to Build the Box"', detail: 'Fuga da cela DARPA com Daniela e eliminação do Agente MacNamara na Caixa.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Abre a porta do Mundo 27 para Daniela reencontrar os filhos e despede-se no Corredor.' }
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
  {
    id: 'jason-stalker-29',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J-INVASOR',
    designation: 'Jason Invasor do Mundo 29 (Morto por Daniela — T2:E1)',
    alias: 'O Perseguidor do Diário ("A Quiet Life")',
    shortRole: 'Rastreou a família Dessen até o Mundo 29 após 7 meses e foi morto a tiros por Daniela 1 dentro de casa.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/e/ef/Dark_Matter_S2E01.jpg/revision/latest?cb=20260918144540',
    accentColor: 'rose',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-sanctuary-refuge',
    worldsVisited: ['world-prime-1', 'world-velocity-2', 'world-sanctuary-refuge'],
    parentVariantId: 'jason-1',
    branchEventLabel: 'Perseguição obsessiva pós-T1 até o Mundo 29 (T2:E1)',
    status: 'Morto',
    seasonIntroduced: 2,
    visualTraits: 'Roupas escuras de vigilância, carregava um caderno detalhando toda a rotina de Daniela, Charlie e Jason 1.',
    psychologicalProfile: 'Obsessivo e predatório; recusou-se a aceitar a escolha de Daniela no final da 1ª temporada e seguiu o rastro da família pelo Corredor.',
    storyArc:
      'No **T2:E1 ("A Quiet Life")**, sete meses após a fuga da família Dessen para o **Mundo 29**, esta variante consegue encontrar a mesma realidade. Ele vigia a casa, anota os horários de trabalho de Jason 1 em um diário e invade a residência quando Daniela 1 está sozinha. Durante a luta, **Daniela 1 pega a arma escondida e o mata com um tiro**. Enquanto Jason 1 tenta enterrar o corpo dele na mata, o policial local Jay Stringer encontra o carro abandonado do invasor, forçando a família a fugir para o **Mundo Low-Tech ("World X")**.',
    branchOriginExplanation:
      'Uma das 70+ variantes de Jason 1 da Reality 1 que não aceitou a despedida na garagem e perseguiu a família pelo Corredor.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E1 "A Quiet Life"', detail: 'Invasão à casa do Mundo 29, morte pelas mãos de Daniela 1 e gatilho da fuga.' }
    ]
  },
  {
    id: 'jason-morgue-r1',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J-BAIXAS R1',
    designation: 'Dezenas de Jasons Mortos em Chicago (Necrotério Reality 1)',
    alias: 'Os Corpos da Convergência (T1:E9 & T2:E1)',
    shortRole: 'Dezenas de variantes mortas nos confrontos da T1 cujos corpos idênticos lotam o necrotério de Chicago em T2:E1.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/3/32/Abandoned_warehouse_r1.png/revision/latest?cb=20240820012601',
    accentColor: 'rose',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-prime-1',
    worldsVisited: ['world-prime-1', 'world-velocity-2', 'world-ash', 'world-ice-blizzard'],
    parentVariantId: 'jason-1',
    branchEventLabel: 'Massacre e baixas da Convergência em Chicago (T1:E8–E9 / T2:E1)',
    status: 'Morto',
    seasonIntroduced: 1,
    visualTraits: 'Dezenas de corpos com as mesmas impressões digitais e DNA de Jason Dessen, mas com diferentes cicatrizes, queimaduras e ferimentos de bala.',
    psychologicalProfile: 'Variantes que sucumbiram à paranoia, lutaram entre si até a morte pela família ou tiraram a própria vida após perderem Daniela.',
    storyArc:
      'Durante os episódios finais da 1ª temporada (**T1:E8 e T1:E9**), dezenas de variantes de Jason se matam em becos, na porta da casa dos Dessen e no cerco à cabana. Na abertura do **T2:E1 ("A Quiet Life")**, a polícia de Chicago (Detetive **Jamie Mason**) e o agente federal **Mitchel MacNamara (Reality 1)** deparam-se com um necrotério lotado de cadáveres geneticamente idênticos de Jason Dessen — levando o governo a suspeitar de uma operação secreta de clonagem humana e a interrogar **Jason 13**.',
    branchOriginExplanation:
      'Múltiplas ramificações de Jason 1 geradas no Corredor que morreram na Reality 1.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E8, T1:E9 & T2:E1 "A Quiet Life"', detail: 'Corpos acumulados no necrotério de Chicago investigados por Mitchel MacNamara (R1).' }
    ]
  },
  {
    id: 'jason-nativo-31',
    baseCharacter: 'Jason Dessen',
    badgeNumber: 'J-NATIVO 31',
    designation: 'Jason Nativo do Mundo 31 (Falecido aos 16 Anos)',
    alias: 'Filho Original de Ellie no Mundo 31',
    shortRole: 'Morreu aos 16 anos neste universo, enquanto sua mãe Ellie sobreviveu — permitindo que Ellie acolhesse Jason 24, 30 e 31.',
    actor: 'Joel Edgerton',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/3/3e/Dark_Matter_S2E05.jpg/revision/latest?cb=20260918145143',
    accentColor: 'rose',
    originWorldId: 'world-ellie-maria',
    currentWorldId: 'world-ellie-maria',
    worldsVisited: ['world-ellie-maria'],
    status: 'Morto',
    seasonIntroduced: 2,
    visualTraits: 'Visto apenas em memórias/fotos antigas na casa da mãe Ellie.',
    psychologicalProfile: 'Jovem nativo do Mundo 31 que nunca chegou à vida adulta.',
    storyArc:
      'Revelado no **T2:E5 ("Love and Be Loved")**. Enquanto na Reality 1 a mãe de Jason (**Ellie**) morreu e o filho sobreviveu, no **Mundo 31** aconteceu o inverso: o Jason nativo faleceu aos 16 anos e Ellie continuou viva. É graças à ausência dele que **Jason 24** (e depois **Jason 30 e 31**) podem ocupar o lugar de filhos na vida de Ellie sem tomar a vida de outro Jason vivo.',
    branchOriginExplanation:
      'Nativo do Mundo 31 (divergência histórica onde morreu na adolescência).',
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E5 "Love and Be Loved"', detail: 'História de Ellie e do filho falecido aos 16 anos.' }
    ]
  },

  // ==================== AMANDA VARIANTS ====================
  {
    id: 'amanda-2',
    baseCharacter: 'Amanda Lucas',
    badgeNumber: 'A2',
    designation: 'Amanda 2 (Parceira de Jason 1 e Ryan 1)',
    alias: 'Psiquiatra da Velocity Labs',
    shortRole: 'No T2:E10, entrega a cura da Praga no Mundo 26 em corrida de 1 hora com Ryan 1 e retorna pela Caixa ao Mundo Low-Tech para o reencontro no bar Village Tap.',
    actor: 'Alice Braga',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/a/a5/Amanda_Lucas.png/revision/latest?cb=20240418155110',
    accentColor: 'cyan',
    originWorldId: 'world-velocity-2',
    currentWorldId: 'world-lowtech-analog',
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
      'world-sealed-concrete',
      'world-dying-sun',
      'world-aurora-borealis',
      'world-lowtech-analog',
      'world-aurora-borealis',
      'world-lowtech-analog'
    ],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Deu seu colar da Estrela Polar (Polaris) para Jason 1.',
    psychologicalProfile: 'Empática e corajosa; dedicou-se à missão de salvação humanitária no desfecho da T2.',
    storyArc:
      'Salva Jason 1 na Velocity Labs (T1:E3) e viaja com ele até decidir ficar no Mundo Utópico da Aurora / World 26 (T1:E7, onde se despede de Jason 1 antes que ele parta sozinho para o mundo onde Max vive). Lá reencontra Ryan 1. Na 2ª temporada, viaja com Ryan 1 passando pelo **Mundo Low-Tech** e enfrenta a quarentena da Praga da Íris Negra (T2:E4). No season finale (**T2:E10 "No Quiet Life"**), parte com Ryan em uma missão com prazo improrrogável de uma hora para obter o antídoto da Praga com Oluko e administrá-lo no Mundo 26. Após salvar a população com a cura, Amanda e Ryan saltam pela Caixa de volta ao Mundo Low-Tech antes do prazo final, indo diretamente ao bar **Village Tap** para gelar as Diet Cokes e o uísque aguardando Jason 1 e Blair 2.',
    branchOriginExplanation:
      'Nativa do Mundo 2 (Velocity Labs).',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Amanda Lucas', detail: 'Retrato oficial de Alice Braga como Amanda Lucas.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Entrega da cura da Praga no Mundo 26 sob contagem regressiva de uma hora.' }
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
    id: 'amanda-j13',
    baseCharacter: 'Amanda Lucas',
    badgeNumber: 'A-J13',
    designation: 'Amanda de Jason 13 (Morta no Acidente do Galho)',
    alias: 'Variante Fatal do Mundo 28',
    shortRole: 'Empalada pelo galho de árvore no Mundo 28, morreu nos braços de Jason 13 dentro da Caixa.',
    actor: 'Alice Braga',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/6/6c/Alone_woods_world_4.png/revision/latest?cb=20240816213749',
    accentColor: 'rose',
    originWorldId: 'world-velocity-2',
    currentWorldId: 'world-tree-branch-accident',
    worldsVisited: ['world-velocity-2', 'world-ash', 'world-tree-branch-accident'],
    parentVariantId: 'amanda-2',
    branchEventLabel: 'Morte por empalamento no Mundo 28 (oposto de Amanda 7)',
    status: 'Morto',
    seasonIntroduced: 2,
    visualTraits: 'Ferimento fatal no tórax causado pelo galho da floresta no Mundo 28.',
    psychologicalProfile: 'Tentou ajudar Jason 13 a navegar pelo Corredor, mas teve a vida interrompida tragicamente ao abrir a porta da floresta.',
    storyArc:
      'Representa a bifurcação trágica do **Mundo 28 ("Alone in the Woods")**, explicada em **T2:E3** e **T2:E8**: quando a porta da Caixa se abriu em meio a uma mata densa, um galho atravessou seu peito. Enquanto na linha de **Jason 34** ele encontrou o Santuário de Laurel a tempo de salvar **Amanda 7**, na linha de **Jason 13 ("Scar Jason")** não houve socorro e ela morreu em seus braços — desencadeando a fúria autodestrutiva de Jason 13.',
    branchOriginExplanation:
      'Ramificação de Amanda 2 que viajava com Jason 13 quando abriram a porta do Mundo 28.',
    sources: [
      { type: 'OFFICIAL_PODCAST', label: 'Podcast Oficial T2:E8', detail: 'Contraste direto entre a morte da Amanda de Jason 13 e a sobrevivência de Amanda 7.' }
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
    shortRole: 'No T2:E10, entrega o antídoto da Praga no Mundo 26 com Amanda 2 e regressa pela Caixa ao Mundo Low-Tech, reunindo-se no bar Village Tap.',
    actor: 'Jimmi Simpson',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/4/49/Ryan_Holder_Reality_1.png/revision/latest?cb=20240816204623',
    accentColor: 'blue',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-lowtech-analog',
    worldsVisited: ['world-prime-1', 'world-aurora-borealis', 'world-lowtech-analog', 'world-aurora-borealis', 'world-lowtech-analog'],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Neuroquímico brilhante; aparência tensa e focada na 2ª temporada.',
    psychologicalProfile: 'Determinado a reparar os danos causados por variantes descontroladas como Ryan 3.',
    storyArc:
      'Amigo de Jason 1 no Mundo 1. Quando descobre a farsa de Jason 2, é sequestrado e largado no Mundo 26 / Utopia da Aurora (T1:E6). Encontra Amanda 2 no final da T1 e viaja com ela na 2ª temporada passando pelo **Mundo Low-Tech**, enfrentando depois a quarentena da Praga da Íris Negra (T2:E4). No final da 2ª temporada (**T2:E10 "No Quiet Life"**), atua ao lado de Amanda na missão de reparação humanitária, obtendo a fórmula do antídoto com Oluko e curando os cidadãos infectados no Mundo 26. Cumprida a missão dentro do prazo de uma hora, ele e Amanda saltam pela Caixa de volta ao Mundo Low-Tech, dirigindo-se ao bar **Village Tap** onde se reúnem com Jason 1 e Blair 2 após a Caixa ser selada para sempre.',
    branchOriginExplanation:
      'Nativo do Mundo 1.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Ryan Holder (Reality 1)', detail: 'Retrato oficial de Jimmi Simpson como Ryan 1.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Administração da cura da Praga no Mundo 26 sob contagem de uma hora.' }
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
    designation: 'Ryan 3 & Sua Amanda (Mortos pela Praga da Íris Negra)',
    alias: 'Vetores do Surto Hema Aetho 26 no Mundo 26',
    shortRole: 'Variante de Ryan (e sua Amanda) que trouxeram acidentalmente a Praga da Íris Negra para o Mundo 26 e morreram na quarentena.',
    actor: 'Jimmi Simpson',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/1/1e/Ryan_Holder.png/revision/latest?cb=20240418155114',
    accentColor: 'rose',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-aurora-borealis',
    worldsVisited: ['world-prime-1', 'world-plague-pandemic', 'world-aurora-borealis'],
    parentVariantId: 'ryan-1',
    branchEventLabel: 'Contaminação fatal por Hema Aetho 26 (T2:E4)',
    status: 'Morto',
    seasonIntroduced: 2,
    visualTraits: 'Hemorragia ocular característica da Praga da Íris Negra (Hema Aetho 26).',
    psychologicalProfile: 'Viajante que buscava refúgio com sua versão de Amanda, mas carregava um patógeno letal de outro mundo.',
    storyArc:
      'Revelado em **T2:E4 ("Stars, Hide Your Fires")**: antes de Ryan 1 e Amanda 2 retornarem ao **Mundo 26 ("Radical Empathy")**, esta outra dupla de variantes (Ryan 3 e sua Amanda) chegou infectada pelo vírus **Hema Aetho 26 (Praga da Íris Negra)**. Ambos morreram na instalação médica, desencadeando o lockdown militar do CDC que prendeu Ryan 1 e Amanda 2.',
    branchOriginExplanation:
      'Ramificação de Ryan 1 e Amanda 2 que passou por um mundo pandêmico antes de entrar no Mundo 26.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E4 "Stars, Hide Your Fires" & T2:E7', detail: 'Morte de Ryan 3 e sua Amanda na quarentena do CDC.' }
    ]
  },

  // ==================== LEIGHTON VARIANTS ====================
  {
    id: 'leighton-2',
    baseCharacter: 'Leighton Vance',
    badgeNumber: 'L2',
    designation: 'Leighton 2 (CEO da Velocity Tech — Morto no T2:E10)',
    alias: 'Arquiteto da Pirâmide no Mundo Low-Tech',
    shortRole: 'Construiu A Pirâmide no Mundo Low-Tech; no T2:E10 decide abandonar o multiverso, mas é estrangulado até a morte por Oluko.',
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
    status: 'Morto',
    seasonIntroduced: 1,
    visualTraits: 'Cicatrizes de batalha do Corredor; líder da Velocity Tech no Mundo Low-Tech.',
    psychologicalProfile: 'Ambicioso, mas no desfecho da T2 é tomado pelo remorso e busca uma vida simples fora do multiverso.',
    storyArc:
      'Após perseguir Jason 1 na 1ª temporada, estabelece sua base no **Mundo Low-Tech ("World X")** com a empresa **Velocity Tech**, superando a corporação local **MacNamara Tech**. Nos túneis subterrâneos de carga sob Chicago, constrói **A Pirâmide** (uma versão gigantesca da Caixa movida a energia nuclear que mapeou 74 mundos para exploração). No **T2:E9 ("How to Build the Box")**, seu complexo de deus desmorona perante o colapso multiversal. No season finale (**T2:E10 "No Quiet Life"**), concorda em desmantelar A Pirâmide junto a Jason 2 e sonha em abrir um bar em Kokomo. Ao descobrir a intenção de desativação, seu parceiro Oluko (Leighton 6) entra em fúria homicida e estrangula Leighton 2 até a morte. Seu corpo é encontrado e cremado às margens do rio por um desolado Jason 2.',
    branchOriginExplanation:
      'Nativo do Mundo 2 (Velocity Labs).',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Leighton Vance', detail: 'Retrato oficial de Dayo Okeniyi como Leighton Vance.' },
      { type: 'EPISODE_CANON', label: 'T2:E6, T2:E7 & T2:E9 "How to Build the Box"', detail: 'Construção da Pirâmide e crise moral diante do colapso multiversal.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Estrangulado até a morte por Oluko após decidir desmantelar A Pirâmide.' }
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
    alias: 'O Navegador Meditativo & Protetor da Pirâmide',
    shortRole: 'Forneceu a cura da Praga a Amanda e Ryan; ao saber do desmonte da Pirâmide, estrangula Leighton 2 e foge pelo multiverso no T2:E10.',
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
    visualTraits: 'Roupas leves estilo guru/hippie, calma profunda que esconde fanatismo impiedoso.',
    psychologicalProfile: 'Mestre na navegação mental do Corredor; obcecado em preservar o propósito divino da superposição quântica.',
    storyArc:
      'No **Mundo Low-Tech ("World X")**, atua ao lado de Leighton 2 treinando os batedores que mapearam 74 realidades através da **Pirâmide** e resgata Amanda 2 e Ryan 1 da quarentena da Praga da Íris Negra no T2:E7. No season finale (**T2:E10 "No Quiet Life"**), sintetiza e entrega o antídoto da Praga para Amanda e Ryan. No entanto, desconfiado de sabotagem, envia a operativa armada Sandra para caçar Jason 1 e Blair. Ao descobrir que Leighton 2 e Jason 2 planejavam desmontar A Pirâmide, entra em fúria psicopata, estrangula Leighton 2 até a morte e ativa a Pirâmide, fugindo pelo multiverso instantes antes do Kill Switch selar as portas interdimensionais.',
    branchOriginExplanation:
      'Ramificação de Leighton que atingiu iluminação espiritual no multiverso, convertendo-a em fanatismo desmedido.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E6 & E7', detail: 'Atuação na Pirâmide (Mundo Low-Tech) e resgate de Amanda 2 e Ryan 1.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Sintetização da cura, envio de Sandra, assassinato de Leighton 2 e fuga pela Pirâmide.' }
    ]
  },

  // ==================== BLAIR, DANIELA, CHARLIE, LAUREL, MITCHEL ====================
  {
    id: 'blair-2',
    baseCharacter: 'Blair Caplan',
    badgeNumber: 'B2',
    designation: 'Blair 2 (Sobrevivente do Mundo das Vespas)',
    alias: 'Blair Caplan (Reality 2)',
    shortRole: 'Conserta o Kill Switch em gravidade zero, viabiliza o desligamento na Reality 02 e retorna ao Mundo Low-Tech com Jason 1, reunindo-se no bar Village Tap.',
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
      'world-lowtech-analog',
      'world-warzone-chicago',
      'world-zero-gravity',
      'world-velocity-2',
      'world-lowtech-analog'
    ],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Postura de sobrevivente hipervigilante.',
    psychologicalProfile: 'Conhece na pele o horror do multiverso e traça uma estratégia científica implacável para desligar a rede de Caixas.',
    storyArc:
      'Após ficar presa no Mundo das Vespas na 1ª temporada, consegue escapar passando pela casa de Laurel. No **Mundo Low-Tech ("World X")**, é levada por Leighton aos túneis subterrâneos de Chicago (T2:E6 & E7), onde fica horrorizada ao ver **A Pirâmide**. No **T2:E9 ("How to Build the Box")**, Blair descobre que todas as Caixas do multiverso continuam entrelaçadas à Caixa original da Velocity Labs (Reality 02). Ela arquiteta então o plano de invadir a Caixa matriz e inserir um código de desligamento ("Kill Switch"). No season finale (**T2:E10 "No Quiet Life"**), atua lado a lado com Jason 1: fogem sob fogo cruzado de Sandra por Chicago em Guerra, enfrentam a atiradora no Mundo Gravidade Zero, e após a morte de Sandra, Blair faz o reparo de emergência no Kill Switch danificado. Após acoplarem o dispositivo na Velocity Labs com temporizador de 10 minutos, Blair e Jason 1 saltam de volta ao Mundo Low-Tech momentos antes da implosão, reunindo-se com Amanda 2 e Ryan 1 no bar **Village Tap** após a Caixa ser neutralizada para sempre.',
    branchOriginExplanation:
      'Nativa do Mundo 2 (Velocity Labs).',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Blair Caplan (Reality 2)', detail: 'Retrato oficial de Blair 2.' },
      { type: 'EPISODE_CANON', label: 'T2:E6, T2:E7 & T2:E9 "How to Build the Box"', detail: 'Descoberta do entrelaçamento mestre e plano do Kill Switch.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Batalha em gravidade zero contra Sandra, conserto do Kill Switch e detonação na Caixa Matriz.' }
    ]
  },
  {
    id: 'blair-19-dead',
    baseCharacter: 'Blair Caplan',
    badgeNumber: 'B-VESPAS',
    designation: 'Blair Viajante (Morta pelo Enxame no Mundo 19)',
    alias: 'Cobaia da Velocity Labs no Vídeo de Segurança',
    shortRole: 'Abriu a porta para o Mundo das Vespas Gigantes (World 19) e foi devorada viva pelo enxame dentro do hangar.',
    actor: 'Amanda Brugel',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/2/2c/Lab_video_exterior_wasps.png/revision/latest?cb=20240820012603',
    accentColor: 'rose',
    originWorldId: 'world-velocity-2',
    currentWorldId: 'world-murder-hornets',
    worldsVisited: ['world-velocity-2', 'world-murder-hornets'],
    parentVariantId: 'blair-2',
    branchEventLabel: 'Abertura fatal da porta no Mundo 19 (T1:E5)',
    status: 'Morto',
    seasonIntroduced: 1,
    visualTraits: 'Traje de expedição da Velocity Labs; vista nas gravações de câmera do hangar iluminado em vermelho.',
    psychologicalProfile: 'entrou em pânico ao deparar-se com o enxame de vespas mutantes.',
    storyArc:
      'No **T1:E5 ("Worldless")**, Jason 1 e Amanda 2 assistem num tablet às gravações de segurança da Velocity Labs R4: esta variante de Blair abriu a porta da Caixa para o **Mundo 19 ("Big Wasps")**, permitindo que enxames de vespas gigantes invadissem o laboratório e a matassem diante das câmeras — razão pela qual **Blair 2** se recusou a voltar para a Caixa naquele momento.',
    branchOriginExplanation:
      'Ramificação de Blair 2 durante os testes iniciais de exploração da Velocity Labs.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T1:E5 "Worldless"', detail: 'Gravação das câmeras de segurança no hangar das vespas.' }
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
    shortRole: 'Reencontra Charlie e Max no Mundo 27 com ajuda de Jason 13; no T2:E10, fica exilada com Charlie em um mundo desconhecido.',
    actor: 'Jennifer Connelly',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/f/fb/Daniela_Dessen.png/revision/latest?cb=20240531101339',
    accentColor: 'rose',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-stranded-cliffhanger',
    worldsVisited: [
      'world-prime-1',
      'world-sanctuary-refuge',
      'world-lowtech-analog',
      'world-meteor-apocalypse',
      'world-max-alive',
      'world-stranded-cliffhanger'
    ],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Artista plástica; olhar marcado pela dor do exílio cósmico no desfecho da temporada.',
    psychologicalProfile: 'Exausta pela paranoia do multiverso, mas de bravura inabalável na proteção de Charlie.',
    storyArc:
      'Após matar o invasor no Mundo 29 e passar pelo Mundo Low-Tech, entra na Caixa atrás de Charlie e chega à Reality 01 (T2:E9), onde é presa na cela da DARPA com Jason 13. Juntos, eliminam o Agente MacNamara no Mundo Meteoro (Mundo 33). No finale (**T2:E10 "No Quiet Life"**), Jason 13 a guia pelo Corredor ancorando a lembrança dos filhos, abrindo a porta do Mundo 27. Daniela chora de alegria ao abraçar Charlie e ver Max vivo. Despedindo-se de Jason 13, entra na Caixa com Charlie buscando uma nova vida. Porém, no meio da travessia, o Kill Switch de Jason 1 desfaz a superposição e lacra o Corredor: Daniela e Charlie são cuspidos no Mundo 36, isolados para sempre de Jason 1.',
    branchOriginExplanation:
      'Nativa do Mundo 1.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Daniela Dessen', detail: 'Retrato oficial de Jennifer Connelly como Daniela.' },
      { type: 'EPISODE_CANON', label: 'T2:E1, E2, E6, E7 & T2:E9 "How to Build the Box"', detail: 'Mata o invasor, liberta Jason 13 e elimina MacNamara.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Reencontro com Charlie e Max no Mundo 27 e exílio no mundo desconhecido.' }
    ]
  },
  {
    id: 'charlie-1',
    baseCharacter: 'Daniela & Charlie',
    badgeNumber: 'C1',
    designation: 'Charlie 1 (Em Busca do Irmão Gêmeo Max)',
    alias: 'Filho de Jason 1 e Daniela 1',
    shortRole: 'Reencontra o irmão Max e a mãe Daniela no Mundo 27; no T2:E10, fica preso com Daniela em um mundo alternativo desconhecido.',
    actor: 'Oakes Fegley',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/0/0b/Charlie_Dessen.png/revision/latest?cb=20240418155111',
    accentColor: 'amber',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-stranded-cliffhanger',
    worldsVisited: [
      'world-prime-1',
      'world-sanctuary-refuge',
      'world-lowtech-analog',
      'world-laurel-sanctuary',
      'world-max-alive',
      'world-stranded-cliffhanger'
    ],
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 1,
    visualTraits: 'Adolescente, alérgico a nozes; carrega a bússola Polaris.',
    psychologicalProfile: 'Corajoso e sensível; viveu a alegria máxima de rever o irmão gêmeo Max antes da separação trágica do pai.',
    storyArc:
      'Após fugir para o Mundo Low-Tech, entra na Caixa ao saber de Max e chega ao Santuário de Laurel (T2:E8). No T2:E9, viaja até o Mundo 27 e reencontra seu irmão gêmeo Max vivo. No **T2:E10 ("No Quiet Life")**, vive o reencontro perfeito com a mãe Daniela no Mundo 27. Partindo com ela pela Caixa para reconstruírem o lar, o desligamento repentino da rede corta o trânsito e o joga com Daniela em uma realidade desconhecida, deixando-o eternamente incomunicável com seu pai Jason 1.',
    branchOriginExplanation:
      'Nativo do Mundo 1.',
    sources: [
      { type: 'FANDOM_WIKI', label: 'Wiki: Charlie Dessen', detail: 'Retrato oficial de Oakes Fegley como Charlie.' },
      { type: 'EPISODE_CANON', label: 'T2:E7, T2:E8 & T2:E9 "How to Build the Box"', detail: 'Chegada ao Santuário de Laurel e reencontro com Max no Mundo 27.' },
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Reencontro com Daniela 1 e confinamento no mundo alternativo após o colapso da Caixa.' }
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
    id: 'mitchel-1',
    baseCharacter: 'Laurel & Agentes',
    badgeNumber: 'MACNAMARA R1',
    designation: 'Agente Mitchel MacNamara (Reality 1 — Morto no T2:E9)',
    alias: 'Agente Federal do Mundo Original (Eliminado em T2:E9)',
    shortRole: 'Obcecado pela física da Caixa, interroga Jason 13 na DARPA; é enganado por Daniela 1 e Jason 13 no T2:E9 e morre no Mundo Meteoro.',
    actor: 'Chris Diamantopoulos',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/e/ef/Dark_Matter_S2E01.jpg/revision/latest?cb=20260918144540',
    accentColor: 'cyan',
    originWorldId: 'world-prime-1',
    currentWorldId: 'world-meteor-apocalypse',
    worldsVisited: ['world-prime-1', 'world-meteor-apocalypse'],
    status: 'Morto',
    seasonIntroduced: 2,
    visualTraits: 'Terno escuro de agente federal, postura fria e calculista em salas de interrogatório.',
    psychologicalProfile: 'Cético e implacável; sua obsessão arrogante em decifrar a Caixa o levou a cair na armadilha fatal de Daniela e Jason 13.',
    storyArc:
      'Apresentado no **T2:E1 ("A Quiet Life")** no **Mundo Original (Reality 1)**. Quando dezenas de corpos de Jason aparecem em Chicago, assume o caso suspeitando de clonagem humana e encarcera **Jason 13 ("Scar Jason")** em um black-site da DARPA. Obcecado durante anos em desvendar a física da Caixa e sua fonte de energia por entrelaçamento quântico, MacNamara acredita estar prestes a dominar a tecnologia. No **T2:E9 ("How to Build the Box")**, quando **Daniela 1** é capturada ao entrar na cela, os dois prisioneiros se unem e armam uma cilada para o agente: fingem concordar em revelar o segredo operacional em troca da liberdade e o fazem entrar na Caixa. Lá dentro, Jason 13 e Daniela o subjugam, injetam-lhe Lilac Wings e o jogam para fora no **Mundo 33**, instantes antes da colisão de um meteoro devastador. A porta é batida e lacrada, aniquilando MacNamara e libertando a dupla.',
    branchOriginExplanation:
      'Nativo da Reality 1 (Mundo Original de Jason 1) — contraparte distinta do Mitchel MacNamara executivo do Mundo Low-Tech.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E1 "A Quiet Life" & T2:E3', detail: 'Investigação dos corpos no necrotério de Chicago e interrogatório de Jason 13 na Reality 1.' },
      { type: 'EPISODE_CANON', label: 'T2:E9 "How to Build the Box"', detail: 'Drogado na Caixa e morto no mundo apocalíptico do meteoro.' }
    ]
  },
  {
    id: 'mitchel-2',
    baseCharacter: 'Laurel & Agentes',
    badgeNumber: 'MACNAMARA X',
    designation: 'Mitchel MacNamara (MacNamara Tech — Mundo Low-Tech)',
    alias: 'Irmão de Sheila MacNamara no World X (T2:E2–E4)',
    shortRole: 'Investiga a Velocity Tech e os Dessen no Mundo Low-Tech até ser dopado com Lavanda por Jason 1 e trancado no Corredor.',
    actor: 'Chris Diamantopoulos',
    avatarUrl: 'https://static.wikia.nocookie.net/dark-matter-apple-tv/images/d/d8/Dark_Matter_S2E02.jpg/revision/latest?cb=20260918144710',
    accentColor: 'rose',
    originWorldId: 'world-lowtech-analog',
    currentWorldId: 'world-lowtech-analog',
    worldsVisited: ['world-lowtech-analog'],
    parentVariantId: 'mitchel-1',
    branchEventLabel: 'Contraparte corporativa no Mundo Low-Tech (T2:E2–E4)',
    status: 'Ativo / Em Jornada',
    seasonIntroduced: 2,
    visualTraits: 'Terno retrô dos anos 70/80 típico da Chicago analógica do Mundo Low-Tech.',
    psychologicalProfile: 'Protetor dos negócios da irmã Sheila na MacNamara Tech; obcecado em descobrir de onde vêm os dispositivos impossíveis da Velocity Tech.',
    storyArc:
      'Apresentado em **T2:E2 ("A Perfect World")** no **Mundo Low-Tech ("World X")**. Irmão de **Sheila MacNamara** (Rebecca Spence), diretora da *MacNamara Tech*, que está sendo levada à falência pela misteriosa **Velocity Tech** de Leighton 2. Mitchel descobre componentes avançados perto da Caixa na piscina da escola abandonada, vê Amanda 2 e Ryan 1 no motel Milshire (T2:E3) e rastreia Jason 1. Em **T2:E4 ("Stars, Hide Your Fires")**, invade a casa dos Dessen, mas **Jason 1 o rende, despeja uma ampola de Lavanda na bebida dele e o tranca inconsciente dentro do Corredor da Caixa**!',
    branchOriginExplanation:
      'Nativo do Mundo 30 ("World X" / Mundo Low-Tech) — contraparte do Agente Federal Mitchel MacNamara da Reality 1.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E2, T2:E3 & T2:E4 "Stars, Hide Your Fires"', detail: 'Disputa MacNamara Tech vs. Velocity Tech e captura por Jason 1 no Corredor.' }
    ]
  },
  {
    id: 'sandra-1',
    baseCharacter: 'Laurel & Agentes',
    badgeNumber: 'SANDRA',
    designation: 'Sandra (Operativa da Pirâmide — Morta no T2:E10)',
    alias: 'A Caçadora Enviada por Oluko',
    shortRole: 'Enviada por Oluko para interceptar Jason 1 e Blair; persegue-os em Chicago em Guerra e é morta no Mundo Gravidade Zero no T2:E10.',
    actor: 'Adrienne Lewis',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    accentColor: 'rose',
    originWorldId: 'world-lowtech-analog',
    currentWorldId: 'world-zero-gravity',
    worldsVisited: ['world-lowtech-analog', 'world-warzone-chicago', 'world-zero-gravity'],
    status: 'Morto',
    seasonIntroduced: 2,
    visualTraits: 'Indumentária tática militar, armamento pesado e rastreamento implacável pelo Corredor.',
    psychologicalProfile: 'Lealdade fanática a Oluko; não hesita em atirar para matar qualquer viajante que ameace a tecnologia multiversal.',
    storyArc:
      'Apresentada no season finale (**T2:E10 "No Quiet Life"**). Operativa armada enviada por Oluko quando este desconfia do plano de neutralização da Caixa. Ela persegue Jason 1 e Blair Caplan 2 em alta velocidade através de realidades hostis, disparando contra eles em Chicago em Guerra (Mundo 35) e confrontando-os no Mundo Gravidade Zero (Mundo 34). No combate aéreo sem gravidade, Sandra avaria o Kill Switch, mas é dominada e morta pela dupla.',
    branchOriginExplanation:
      'Nativa do complexo operacional de Oluko no Mundo Low-Tech.',
    sources: [
      { type: 'EPISODE_CANON', label: 'T2:E10 "No Quiet Life"', detail: 'Perseguição através do Corredor e morte em combate corporal no Mundo Gravidade Zero.' }
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
    episode: 'T1:E1 & E2 "Trip of a Lifetime"',
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
    outcome: 'Encontram Blair 2 isolada no World 19 (Big Wasps / Velocity Labs R4) e veem o vídeo da morte da outra Blair.'
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
    episode: 'T1:E8 "Jupiter" & E9 "Entanglement"',
    fromWorldId: 'world-max-alive',
    toWorldId: 'world-prime-1',
    travelers: ['jason-1', 'jason-3', 'jason-6', 'jason-7', 'jason-8', 'jason-13', 'jason-24', 'jason-30', 'jason-morgue-r1'],
    subconsciousTrigger: 'Aceitação completa da história real (incluindo a perda de Max) com Daniela.',
    ampoulesRemaining: 0,
    outcome: 'Convergência de mais de 70 variantes de Jason na Reality 1; dezenas morrem nos confrontos e lotam o necrotério de Chicago.'
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
    episode: 'T2:E1 "A Quiet Life" & T2:E2 "A Perfect World"',
    fromWorldId: 'world-sanctuary-refuge',
    toWorldId: 'world-lowtech-analog',
    travelers: ['jason-1', 'daniela-1', 'charlie-1'],
    subconsciousTrigger: 'Desejo de um mundo sem tecnologia digital, câmeras ou internet após Daniela matar o Jason Invasor do Mundo 29.',
    outcome: 'Fogem da polícia do Mundo 29 e chegam à Chicago Low-Tech ("World X", onde Nixon cancelou a Corrida Espacial).'
  },
  {
    id: 'journey-11',
    order: 11,
    season: 2,
    episode: 'T2:E3 "Everything Beautiful, Everything Terrible" & T2:E4 "Stars, Hide Your Fires"',
    fromWorldId: 'world-lowtech-analog',
    toWorldId: 'world-aurora-borealis',
    travelers: ['amanda-2', 'ryan-1', 'mitchel-2'],
    subconsciousTrigger: 'Retorno de Amanda 2 e Ryan 1 ao Mundo 26; Jason 1 dopa Mitchel MacNamara (World X) com Lavanda e o tranca no Corredor.',
    outcome: 'Amanda 2 e Ryan 1 são detidos pela quarentena da Praga da Íris Negra (causada por Ryan 3); Mitchel 2 fica perdido no Corredor.'
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
    outcome: 'Jason 24 reconstrói a vida com a mãe Ellie (cujo Jason nativo morreu aos 16 anos), acolhe os Jasons 30 e 31 e conhece Maria.'
  },
  {
    id: 'journey-13',
    order: 13,
    season: 2,
    episode: 'T2:E7 "The Pyramid" & T2:E8 "The Basic Oneness of Everything"',
    fromWorldId: 'world-lowtech-analog',
    toWorldId: 'world-laurel-sanctuary',
    travelers: ['charlie-1', 'daniela-1'],
    subconsciousTrigger: 'Busca secreta de Charlie 1 pelo irmão gêmeo Max, seguida pela entrada desesperada de Daniela 1 para resgatar o filho.',
    outcome: 'Charlie 1 chega ao Santuário de Laurel e conversa com Jason 34 e Amanda 7; Daniela 1 entra no Corredor atrás dele.'
  },
  {
    id: 'journey-14',
    order: 14,
    season: 2,
    episode: 'T2:E8 "The Basic Oneness of Everything" (Flashback de 2 anos antes)',
    fromWorldId: 'world-tree-branch-accident',
    toWorldId: 'world-laurel-sanctuary',
    travelers: ['jason-34', 'amanda-7'],
    subconsciousTrigger: 'Pedido desesperado de socorro após Amanda 7 ser empalada pelo galho no Mundo 28.',
    outcome: 'Chegam à biblioteca da enfermeira Laurel, que salva Amanda 7 (enquanto na ramificação de Jason 13 sua Amanda morreu).'
  },
  {
    id: 'journey-15',
    order: 15,
    season: 2,
    episode: 'T2:E9 "How to Build the Box"',
    fromWorldId: 'world-laurel-sanctuary',
    toWorldId: 'world-max-alive',
    travelers: ['charlie-1'],
    subconsciousTrigger: 'Desejo puro e urgente de Charlie de reencontrar e abraçar o irmão gêmeo Max.',
    outcome: 'Charlie 1 deixa o Santuário de Laurel e viaja até o Mundo 27, vivenciando o emocionante reencontro com seu irmão gêmeo Maximillian vivo.'
  },
  {
    id: 'journey-16',
    order: 16,
    season: 2,
    episode: 'T2:E9 "How to Build the Box"',
    fromWorldId: 'world-prime-1',
    toWorldId: 'world-meteor-apocalypse',
    travelers: ['mitchel-1', 'jason-13', 'daniela-1'],
    subconsciousTrigger: 'Armadilha orquestrada por Daniela 1 e Jason 13 dentro da Caixa sob falsa capitulação, manifestando uma realidade terminal sob choque cósmico de meteoro.',
    outcome: 'O Agente Mitchel MacNamara é injetado com Lilac Wings e jogado em Chicago segundos antes da colisão do meteoro; Jason 13 e Daniela trancam a Caixa por dentro, eliminando MacNamara e fugindo livres pelo Corredor.'
  },
  {
    id: 'journey-17',
    order: 17,
    season: 2,
    episode: 'T2:E10 "No Quiet Life"',
    fromWorldId: 'world-meteor-apocalypse',
    toWorldId: 'world-max-alive',
    travelers: ['daniela-1', 'jason-13'],
    subconsciousTrigger: 'Conexão mental guiada por Jason 13 através da memória afetuosa dos filhos Charlie e Max na infância.',
    outcome: 'A porta se abre e Daniela 1 reencontra Charlie 1 e o gêmeo Max vivo. Jason 13 despede-se com nobreza e recusa cruzar o limiar, voltando a vagar pelo Corredor.'
  },
  {
    id: 'journey-18',
    order: 18,
    season: 2,
    episode: 'T2:E10 "No Quiet Life"',
    fromWorldId: 'world-lowtech-analog',
    toWorldId: 'world-aurora-borealis',
    travelers: ['amanda-2', 'ryan-1'],
    subconsciousTrigger: 'Missão humanitária com prazo limite de 1 hora para entregar o antídoto de Oluko e salvar os infectados da Praga da Íris Negra.',
    outcome: 'A cura é administrada com sucesso e erradica a praga no Mundo 26; Amanda e Ryan concluem a distribuição antes do encerramento do prazo de uma hora.'
  },
  {
    id: 'journey-19',
    order: 19,
    season: 2,
    episode: 'T2:E10 "No Quiet Life"',
    fromWorldId: 'world-aurora-borealis',
    toWorldId: 'world-lowtech-analog',
    travelers: ['amanda-2', 'ryan-1'],
    subconsciousTrigger: 'Foco no ponto de reencontro combinado no bar Village Tap no Mundo Low-Tech antes da destruição da Caixa.',
    outcome: 'Amanda 2 e Ryan 1 retornam com sucesso pela Caixa ao Mundo Low-Tech, dirigem-se ao Village Tap e preparam as bebidas no balcão aguardando Jason 1 e Blair 2.'
  },
  {
    id: 'journey-20',
    order: 20,
    season: 2,
    episode: 'T2:E10 "No Quiet Life"',
    fromWorldId: 'world-lowtech-analog',
    toWorldId: 'world-zero-gravity',
    travelers: ['jason-1', 'blair-2', 'sandra-1'],
    subconsciousTrigger: 'Fuga tática desesperada pelo Corredor sob disparos da assassina Sandra, cruzando Chicago em Guerra até o vácuo de gravidade zero.',
    outcome: 'Combate corpo a corpo em gravidade zero: Sandra é neutralizada e morta. Blair repara a fiação danificada do Kill Switch e seguem para a Velocity Labs.'
  },
  {
    id: 'journey-21',
    order: 21,
    season: 2,
    episode: 'T2:E10 "No Quiet Life"',
    fromWorldId: 'world-zero-gravity',
    toWorldId: 'world-velocity-2',
    travelers: ['jason-1', 'blair-2'],
    subconsciousTrigger: 'Foco total em acoplar o Kill Switch na Caixa Matriz original e iniciar a contagem regressiva de destruição do multiverso.',
    outcome: 'Jason 1 instala o Kill Switch na Caixa Matriz da Velocity Labs com temporizador de 10 minutos para dar janela de evacuação.'
  },
  {
    id: 'journey-22',
    order: 22,
    season: 2,
    episode: 'T2:E10 "No Quiet Life"',
    fromWorldId: 'world-velocity-2',
    toWorldId: 'world-lowtech-analog',
    travelers: ['jason-1', 'blair-2'],
    subconsciousTrigger: 'Salto de fuga emergencial de volta ao Mundo Low-Tech antes que o temporizador de 10 minutos detone o Kill Switch.',
    outcome: 'Jason 1 e Blair 2 saltam de volta à Chicago Low-Tech momentos antes da aniquilação quântica e encontram Amanda 2 e Ryan 1 no bar Village Tap.'
  },
  {
    id: 'journey-23',
    order: 23,
    season: 2,
    episode: 'T2:E10 "No Quiet Life"',
    fromWorldId: 'world-max-alive',
    toWorldId: 'world-stranded-cliffhanger',
    travelers: ['daniela-1', 'charlie-1'],
    subconsciousTrigger: 'Desejo sincero de mãe e filho de encontrar um novo lar definitivo e viver em paz.',
    outcome: 'Durante a travessia pelo Corredor, o Kill Switch de Jason 1 implode a superposição; o caminho é truncado e Daniela e Charlie são ejetados no Mundo 36, isolados para sempre de Jason 1 no season finale.'
  }
];

export const PODCAST_RULES_AND_LORE = [
  {
    title: 'Por que existem dois Mitchel MacNamara diferentes na 2ª Temporada (Reality 1 vs. Mundo Low-Tech)?',
    speaker: 'Cânone Oficial T2:E1 "A Quiet Life" & T2:E2–E4',
    explanation:
      'Chris Diamantopoulos interpreta duas variantes distintas de Mitchel MacNamara na 2ª temporada: (1) No Mundo Original (Reality 1, T2:E1), ele é o Agente Federal Mitchel MacNamara (MACNAMARA R1), que assume a investigação das dezenas de corpos de Jason Dessen no necrotério de Chicago achando que são clones e interroga Jason 13 ("Scar Jason") em um black-site; (2) No Mundo Low-Tech ("World X", T2:E2–E4), ele é o executivo e investigador Mitchel MacNamara (MACNAMARA X), irmão de Sheila MacNamara da MacNamara Tech, que investiga a Velocity Tech e acaba dopado com Lavanda por Jason 1 e jogado dentro do Corredor da Caixa.'
  },
  {
    title: 'Por que existem números como Jason 13, Jason 24, Jason 30, Jason 34 e Amanda 7?',
    speaker: 'Blake Crouch & Jacquelyn Ben-Zekry — Dark Matter: The Official Podcast',
    explanation:
      'No podcast oficial, Blake Crouch explicou que números como Jason 13, 24, 30, 31, 34 e Amanda 7 NÃO significam que eles vieram do "Mundo 34". Todos esses Jasons nasceram na Reality 1! O número é a identificação oficial dos roteiros para rastrear cada ramificação surgida dentro do Corredor. Exemplo clássico: quando o galho de árvore atinge Amanda no Mundo 28, o caminho se divide entre a linha de Jason 13 (onde sua Amanda morre e ele fica preso no black-site da Reality 1) e a linha de Jason 34 (onde ele salva a vida da Amanda 7 levando-a para a biblioteca de Laurel).'
  },
  {
    title: 'Memorial de Baixas: Todas as Variantes Mortas (T1 & T2 Completas)',
    speaker: 'Compilação Canônica T1:E4–E9 & T2:E1–E10',
    explanation:
      'Ao longo das duas temporadas completas da série, as seguintes variantes perderam a vida: (1) Blair Viajante (devorada pelas vespas gigantes na câmera do Mundo 19 em T1:E5); (2) Jason 3, Jason 6 (morto no beco da loja de armas em T1:E8), Jason 8 (invasor da cabana em T1:E9) e as dezenas de Jasons mortos na Convergência cujos corpos lotam o necrotério de Chicago em T2:E1; (3) O Jason Invasor do Mundo 29 (morto com um tiro por Daniela 1 em T2:E1); (4) A Amanda de Jason 13 (morta empalada pelo galho no Mundo 28); (5) Ryan 3 e sua Amanda (mortos pela Praga da Íris Negra no Mundo 26 em T2:E4); (6) O Jason Nativo do Mundo 31 (que morreu aos 16 anos, permitindo que sua mãe Ellie acolhesse Jason 24, 30 e 31 em T2:E5); (7) O Agente Federal Mitchel MacNamara da Reality 1 (drogado com Lilac Wings e jogado por Jason 13 e Daniela 1 na Chicago apocalíptica sob impacto terminal de meteoro no T2:E9 "How to Build the Box"); (8) Leighton 2 / CEO da Velocity Tech (estrangulado até a morte por Oluko na Pirâmide no T2:E10 "No Quiet Life"); e (9) Sandra, a operativa enviada por Oluko (morta durante combate corporal em gravidade zero contra Jason 1 e Blair no T2:E10 "No Quiet Life").'
  },
  {
    title: 'O Desfecho Trágico de "No Quiet Life": O Reencontro no Village Tap e o Exílio da Família',
    speaker: 'Blake Crouch & Jacquelyn Ben-Zekry — Podcast Oficial Season Finale (T2:E10)',
    explanation:
      'No encerramento da 2ª temporada, a missão combinada obtém sucesso: Amanda 2 e Ryan 1 entregam o antídoto da Praga no Mundo 26 e retornam pela Caixa; Jason 1 e Blair 2 conectam o Kill Switch na Caixa Matriz da Velocity Labs (Reality 02) com um temporizador de 10 minutos e saltam de volta antes da detonação. Todos os quatro sobreviventes (Jason 1, Blair 2, Amanda 2 e Ryan 1) se reencontram em segurança no ponto combinado — o bar Village Tap na Chicago Low-Tech — onde Amanda prepara os copos de refrigerante e uísque para celebrar o fim da superposição quântica. Contudo, a vitória é devastadora: Daniela 1 e Charlie 1 estavam em trânsito dentro da Caixa tentando retornar para Jason após a despedida no Mundo 27. Quando o pulso destrói o Corredor, a passagem é truncada e eles são ejetados no Mundo 36 — uma Chicago alternativa desconhecida com as portas da Caixa seladas como metal sólido. Enquanto os quatro aliados bebem no Village Tap sem poder mais viajar, Jason percebe que perdeu sua família para sempre no trágico gancho para a 3ª temporada.'
  },
  {
    title: 'A Queda de Leighton 2 & A Fuga Renegada de Oluko pela Pirâmide',
    speaker: 'Blake Crouch & Equipe de Roteiro — Episódio 10 da 2ª Temporada',
    explanation:
      'Ao confrontar a destruição gerada pela Pirâmide, Leighton 2 decide que a obsessão com o multiverso deve acabar e planeja abrir um bar em Kokomo com Jason 2. Contudo, seu parceiro místico Oluko (Leighton 6) enxerga o desmonte como heresia ao seu propósito cósmico: em um surto de violência, estrangula Leighton 2 até a morte. Oluko aciona a Pirâmide e escapa pelas portas do multiverso antes que Jason 1 destrua a rede, tornando-se a principal ameaça foragida para a 3ª temporada.'
  },
  {
    title: 'A Sala de Chat dos Jasons (Onde Jason 1 vira "Jason9")',
    speaker: 'Blake Crouch — Podcast Oficial T1:E8 & E9',
    explanation:
      'No Episódio 8 da 1ª temporada, Jason 1 entra em um chat que ele mesmo programou na faculdade. Quando faz login achando que seria o único, descobre que "Jason1" a "Jason8" já estavam ocupados por variantes que chegaram antes dele — obrigando nosso protagonista a usar o nick "Jason9".'
  }
];

