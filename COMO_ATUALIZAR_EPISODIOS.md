# Como Atualizar os Dados a Cada Novo Episódio

O **Dark Matter Multiverse Atlas** funciona de forma **100% estática, rápida e sem banco de dados** (servido via Nginx em Docker), com todos os dados canônicos revisados e estruturados diretamente em `src/data/multiverseData.ts`.

---

## Status Atual: Temporadas 1 & 2 Completas (Até o Season Finale T2:E10 "No Quiet Life")

Todas as 10 semanas da 2ª temporada foram oficialmente auditadas e catalogadas:
- **T2:E10 "No Quiet Life" (Season Finale)**:
  - Destruição da superposição quântica pelo Kill Switch acionado por Jason 1 na Reality 02;
  - Conclusão trágica: Daniela 1 e Charlie 1 encalhados no Mundo 36;
  - Assassinato de Leighton 2 por Oluko na Pirâmide e fuga renegada de Oluko pelo multiverso;
  - Combate em gravidade zero (Mundo 34) e morte da operativa Sandra.

---

## Como atualizar quando estrear a 3ª Temporada (`T3:E1`, etc.) ou novos episódios

Sempre que um novo episódio estrear na Apple TV+ (ou você tiver a transcrição, o resumo da Wiki ou o episódio do Podcast oficial):

1. **Basta vir aqui no chat e pedir**:
   > *"O episódio 1 da 3ª temporada saiu, faça uma varredura e atualize o atlas, o GitHub e o Docker Hub."*
   *(Ou colar a transcrição/detalhes que quiser destacar).*
2. **O que é atualizado no código (`src/data/multiverseData.ts` e `src/App.tsx`)**:
   - Novos **Mundos / Portas do Corredor** (`WORLDS`);
   - Novas **Variantes** ou mudanças de status (ex.: variantes mortas em `💀 MORTOS / BAIXAS`, paradeiro atual, novas ramificações na **Árvore de Divisões** e **Teia Quântica**);
   - Novos saltos na **Jornada da Caixa** (`JOURNEYS`);
   - Liberação do episódio no seletor anti-spoiler **"Onde Você Está?" (`T1–T3`)**.
3. **Atualização na sua VPS**:
   - Após o push da nova imagem para `lucasmks/dark-entendimento:latest`, basta rodar na VPS:
     ```bash
     docker compose pull && docker compose up -d
     ```
