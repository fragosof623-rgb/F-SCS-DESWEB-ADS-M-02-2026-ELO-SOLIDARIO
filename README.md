# F-SCS-DESWEB-ADS-M-02-2026-ELO-SOLIDARIO
Elo Solidário – projeto educativo sobre economia solidária (Desenvolvimento Web – ADS UNICID)

Site acessível com 10 páginas e o assistente de IA **EcoBot**, feito pela equipe NEXT HTML.

## Como rodar

Requisito: Node.js 20.11 ou mais novo.

```bash
npm install
copy .env.example .env    # Linux/macOS: cp .env.example .env
# abra o .env e preencha ANTHROPIC_API_KEY (sem ela o site abre, mas o EcoBot fica desativado)
npm run dev
```

Acesse http://localhost:3000.

## Estrutura

| Pasta/arquivo | O que tem |
|---|---|
| `public/` | As 10 páginas HTML, `css/`, `js/` e `img/` |
| `server.js` | Servidor Express (site + rota `POST /api/chat`) |
| `lib/ia.js` | Integração com a API do Claude |
| `docs/` | Escopo e plano de contexto do projeto |
| `.cursor/` e `CLAUDE.md` | Regras do projeto para ferramentas de IA |

## Publicação

O Railway publica automaticamente a cada `git push` no branch `main`. Cadastre a variável
`ANTHROPIC_API_KEY` no painel do Railway. Passo a passo em [`docs/plano-contexto.md`](docs/plano-contexto.md).
