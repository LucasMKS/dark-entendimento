# Manual de Atualização & Arquitetura VPS (PostgreSQL + Cron Job Automático)

Este guia documenta como o **Dark Matter Multiverse Atlas** mantém os dados atualizados automaticamente na sua VPS Docker (sem precisar rodar comandos manuais no terminal) e como ele compartilha o seu banco **PostgreSQL** com segurança total.

---

## 1. Por que usar o seu PostgreSQL da VPS? (Schema Isolado)

Como o site roda em um container Docker na sua VPS e você já possui um **PostgreSQL** ativo para outros sistemas, a arquitetura foi desenhada para usar **isolamento por Schema (`dark_matter_atlas`)**:

- **Zero Conflito com Outros Sistemas**: O sistema executa automaticamente `CREATE SCHEMA IF NOT EXISTS dark_matter_atlas;` na inicialização e cria apenas duas tabelas dentro desse schema exclusivo:
  - `dark_matter_atlas.multiverse_state`: Armazena episódios sincronizados automaticamente (`episodePatches`), eventos extras nas timelines dos personagens (`variantPatches`), além de mundos e variantes adicionados pelo painel web (`customWorlds`, `customVariants`).
  - `dark_matter_atlas.sync_logs`: Histórico de auditoria das varreduras automáticas do Cron Job.
- **Imune a Rebuilds de Container**: Quando você atualizar a imagem Docker (`docker compose pull && docker compose up -d`), nenhum dado sincronizado ou cadastrado pelo site é perdido.
- **Fallback Local Automático**: Quando você estiver testando no seu PC (`npm run dev`) sem `DATABASE_URL` configurada, o sistema salva tudo automaticamente em `.cache/multiverse_db.json`.

---

## 2. Como Funciona a Atualização Automática (Sem Terminal e Sem Chave Paga de IA)

Você **não precisa** rodar comandos manuais na VPS quando sair o **Episódio 9 (`T2:E9 - How to Build the Box`, 23/10/2026)** ou o **Episódio 10 (`T2:E10 - No Quiet Life`, 30/10/2026)**:

### A. Cron Job Interno (A cada 6 horas)
1. O servidor (`server/apiHandler.mjs`) possui um **Cron Job integrado** que roda automaticamente ao iniciar o container e a cada **6 horas** (configurável via `CRON_INTERVAL_HOURS=6`).
2. Ele consulta a API pública MediaWiki da **Dark Matter Apple TV+ Wiki** (`https://dark-matter-apple-tv.fandom.com/api.php`) verificando se as páginas dos episódios `How_to_Build_the_Box` (`T2:E9`) e `No_Quiet_Life` (`T2:E10`) já receberam a seção `== Plot ==` ou `== Synopsis ==`.
3. Assim que o resumo oficial vai ao ar:
   - O extrator determinístico limpa o wikitexto e traduz automaticamente os parágrafos do inglês para **Português (PT-BR)** (sem exigir chave paga de OpenAI/Gemini).
   - O episódio é desbloqueado automaticamente no seletor **"Onde Você Está?" (`T1–T2`)**.
   - Os personagens citados no episódio (`Jason 1`, `Jason 2`, `Daniela`, `Charlie`, `Amanda`, `Ryan`, `Leighton`, `Blair`, `Laurel`, `Mitchel`) recebem o resumo do episódio automaticamente em suas linhas do tempo e salvam no PostgreSQL.

### B. Botão de 1 Clique na Interface Web (`CAP. V — PODCAST & REGRAS`)
- Se você acabou de assistir ao episódio e quer forçar a varredura naquele exato segundo sem esperar o ciclo de 6 horas do Cron Job, basta abrir a aba **`V. PODCAST & REGRAS`** no próprio navegador e clicar em:
  > **⚡ Sincronizar Agora (Sem Terminal)**

### C. Revisão Profunda de Lore / Árvore de Divisões (Opcional via Antigravity)
- Caso um episódio novo introduza uma ramificação complexa nova na **Árvore de Divisões** ou dezenas de novas variantes e você queira uma revisão editorial completa, basta me pedir aqui no chat (*"Atualize o site com o episódio 9"*). Eu farei a varredura completa e atualizarei a imagem Docker para você.

---

## 3. Como Configurar na sua VPS (`docker-compose.yml`)

No arquivo `docker-compose.yml` da sua VPS, basta passar a variável `DATABASE_URL` apontando para o seu PostgreSQL existente:

```yaml
services:
  dark-entendimento:
    image: lucasmks/dark-entendimento:latest
    container_name: dark-entendimento
    restart: unless-stopped
    ports:
      - "8085:80"
    environment:
      - PORT=80
      - DATABASE_URL=postgresql://SEU_USUARIO:SUA_SENHA@HOST_DO_POSTGRES:5432/SEU_BANCO
      - CRON_INTERVAL_HOURS=6
```
*(Dica: Se o PostgreSQL estiver rodando em outro container Docker na mesma VPS, use a rede compartilhada ou `host.docker.internal` como host).*
