# Orçamento de hospedagem e domínio — Elo Solidário

Responsável: Kaue Cândido Alberti (página `orcamento_hospedagem.html` e documentação).

Este documento traz os mesmos dados da página [`public/orcamento_hospedagem.html`](../public/orcamento_hospedagem.html).
Todos os preços foram conferidos nos sites oficiais em **09/11/2026**. Os serviços estrangeiros cobram em
dólar (US$), e o valor em reais depende do câmbio do dia. Promoções e preços podem mudar a qualquer momento.
As fontes também estão registradas em [`fontes.md`](fontes.md).

## 1. Situação atual

O código fica no GitHub e é publicado no **Railway**. O site tem um servidor Node.js (Express), que entrega as
páginas e a rota `POST /api/chat` do EcoBot. Por isso a hospedagem precisa executar aplicações Node: uma
hospedagem só de arquivos estáticos abriria o site, mas deixaria o EcoBot fora do ar.

## 2. Comparativo de hospedagem

| Serviço e plano | Preço | O que inclui | Roda o servidor Node (EcoBot)? | Fonte (consulta em 09/11/2026) |
|---|---|---|---|---|
| **Railway — Hobby** (usado hoje) | US$ 5 por mês | US$ 5 de crédito de uso por mês; até 48 vCPU e 48 GB por serviço; 2 domínios próprios. Uso acima do crédito é cobrado à parte. | Sim: servidor Node sempre ligado, publicado a partir do GitHub. | <https://railway.com/pricing> |
| Railway — Free | US$ 0 | US$ 1 de crédito de uso por mês; até 1 vCPU e 0,5 GB; nenhum domínio próprio. | Sim, com recursos bem limitados. | <https://railway.com/pricing> |
| Render — Free | US$ 0 | 0,1 CPU e 512 MB; 750 horas por mês. O serviço "dorme" após 15 minutos sem acesso e leva cerca de 1 minuto para voltar. | Sim (Node.js com Express), mas a primeira resposta pode demorar. | <https://render.com/docs/free> |
| Hostinger — VPS KVM 1 | R$ 29,99 por mês no contrato de 24 meses (R$ 719,76 no total); renova por R$ 59,99 por mês | 1 vCPU, 4 GB de RAM, 50 GB de disco NVMe, 4 TB de banda e domínio grátis por 1 ano. Servidor administrado pela própria equipe. | Sim, com instalação de Node.js pelo painel. | <https://www.hostinger.com/br/vps> |
| Vercel — Hobby | US$ 0 (Pro: US$ 20 por mês) | 100 GB de transferência e 1 milhão de execuções de funções por mês. Só para uso pessoal e não comercial. | Não como servidor contínuo: o código roda em funções sob demanda, e o servidor teria de ser adaptado. | <https://vercel.com/pricing> |
| Netlify — Free | US$ 0 (Personal: US$ 9 por mês) | 300 créditos por mês para publicações, funções e banda; CDN global. | Não como servidor contínuo: oferece funções, e o servidor teria de ser adaptado. | <https://www.netlify.com/pricing/> |
| GitHub Pages | Preço não informado na documentação consultada | Site de até 1 GB e limite flexível de 100 GB de banda por mês. Não é indicado para sites comerciais. | Não: hospeda só arquivos estáticos. O site abriria, mas o EcoBot não funcionaria. | <https://docs.github.com/pt/pages/getting-started-with-github-pages/github-pages-limits> |

Observação: os preços dos planos pagos do Render não foram obtidos na consulta e por isso não aparecem.

## 3. Domínio

| Item | Preço | Observações | Fonte (consulta em 09/11/2026) |
|---|---|---|---|
| Domínio `.com.br` no Registro.br | R$ 40,00 por ano | O registro exige CPF ou CNPJ. Sem domínio próprio, o site continua no ar no endereço gratuito do Railway. | <https://registro.br/dominio/precos/> |

## 4. Estimativa de custo anual

Cálculo direto com os preços acima (sem impostos, sem variação do câmbio e sem consumo acima do crédito incluído):

| Cenário | Cálculo | Total por ano |
|---|---|---|
| Railway Hobby, sem domínio próprio | US$ 5 × 12 meses | US$ 60 |
| Railway Hobby + domínio `.com.br` | US$ 60 + R$ 40,00 | US$ 60 + R$ 40,00 |
| Hostinger VPS KVM 1 (1º ano do contrato de 24 meses) | R$ 29,99 × 12 meses (domínio grátis no 1º ano) | R$ 359,88 |

## 5. Recomendação

**Manter o Railway no plano Hobby (US$ 5 por mês).**

- Ele executa o servidor Node o tempo todo, então o EcoBot responde na hora.
- Publica sozinho a cada envio ao GitHub, sem que a equipe precise administrar um servidor.
- O crédito de uso incluído tende a cobrir um site pequeno como o nosso. O consumo deve ser acompanhado no
  painel do Railway.
- Os planos Free do Railway e do Render servem para testes. O Render "dorme" sem acessos, e o Railway Free
  tem pouca memória e não aceita domínio próprio.
- A VPS da Hostinger também roda Node e cobra em reais, mas exige configurar e manter o servidor.
- Vercel, Netlify e GitHub Pages pediriam mudanças no projeto ou deixariam o EcoBot fora do ar.
- Se a equipe quiser um endereço próprio, o domínio `.com.br` acrescenta R$ 40,00 por ano.
