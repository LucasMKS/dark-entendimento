# Como Atualizar os Dados a Cada Novo Episódio

O **Dark Matter Multiverse Atlas** funciona de forma **100% estática, rápida e sem banco de dados** (servido via Nginx em Docker), com todos os dados canônicos revisados e estruturados diretamente em `src/data/multiverseData.ts`.

---

## Como atualizar quando sair um novo episódio (`T2:E9`, `T2:E10`, etc.)

Sempre que um novo episódio estrear na Apple TV+ (ou você tiver a transcrição, o resumo da Wiki ou o episódio do Podcast oficial):

1. **Basta vir aqui no chat e pedir**:
   > *"O episódio 9 saiu, faça uma varredura e atualize o site, o GitHub e o Docker Hub."*
   *(Ou colar a transcrição/detalhes que quiser destacar).*
2. **O que será atualizado no código (`src/data/multiverseData.ts` e `src/App.tsx`)**:
   - Novos **Mundos / Portas do Corredor** (`WORLDS`);
   - Novas **Variantes** ou mudanças de status (ex.: variantes mortas em `💀 MORTOS / BAIXAS`, paradeiro atual, novas ramificações na **Árvore de Divisões** e **Teia Quântica**);
   - Novos saltos na **Jornada da Caixa** (`JOURNEYS`);
   - Liberação do episódio no seletor **"Onde Você Está?" (`T1–T2`)**.
3. **Atualização na sua VPS**:
   - Após o push da nova imagem para `lucasmks/dark-entendimento:latest`, basta rodar na VPS:
     ```bash
     docker compose pull && docker compose up -d
     ```
