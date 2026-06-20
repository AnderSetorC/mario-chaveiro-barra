# Mário Chaveiro - Barra Shopping

Site institucional do chaveiro Mário, localizado no Barra Shopping, Rio de Janeiro. Inclui páginas de serviço e blog com artigos de SEO local.

## 🚀 Tecnologias

- HTML5 semântico
- CSS3 (variáveis, Grid, Flexbox, animações)
- JavaScript vanilla (zero dependências)
- Otimizado para SEO (Schema.org, Open Graph, meta tags)
- Mobile-first responsivo

## 📁 Estrutura

```
mario-chaveiro-barra/
├── index.html                  # Página principal
├── styles.css                  # Estilos
├── script.js                   # Interações JS
├── marca.css                   # Estilos das páginas de marca (legado)
├── partials/
│   ├── common.css              # CSS compartilhado (páginas internas)
│   ├── internal.js             # JS enxuto para páginas internas
│   ├── header.html             # Snippet de header (referência)
│   └── footer.html             # Snippet de footer (referência)
├── servicos/                   # Páginas de serviço
│   ├── abertura-de-carro.html
│   ├── chave-codificada.html
│   ├── controle-remoto.html
│   ├── fechaduras.html
│   └── troca-segredo.html
├── blog/                       # Blog
│   ├── index.html              # Listagem de artigos
│   ├── perdi-chave-carro-barra/
│   ├── quanto-custa-chave-codificada/
│   ├── como-funciona-chave-codificada/
│   └── quando-trocar-segredo/
├── images/                     # Imagens
├── robots.txt                  # Instruções para crawlers
├── sitemap.xml                 # Mapa do site
├── generate-brand-pages.sh     # Script para gerar páginas de marca (legado)
└── vercel.json                 # Cabeçalhos de segurança para Vercel
```

## 🔍 SEO por tipo de página

- **Home (`/`)**: 1 H1, schema `Locksmith` (LocalBusiness) com `areaServed`, schema `FAQPage` completa, Open Graph/Twitter Card, links para todas as páginas internas.
- **Páginas de serviço (`/servicos/*.html`)**: 1 H1 com keyword + bairro, bloco SEO abaixo do H1, schema `Service` + `FAQPage` específica, breadcrumb.
- **Blog (`/blog/*`)**: 1 H1, schema `BlogPosting` (com `headline`, `author`, `publisher`, `datePublished`, `image`), schema `FAQPage` quando há FAQ, Open Graph tipo `article` com `article:published_time`, breadcrumb, posts relacionados.

Todas as imagens têm `alt` descritivo. Hierarquia padrão é 1 H1 → múltiplos H2 → H3 para sub-itens. URLs canônicas estão configuradas em todas as páginas.

## 🛠️ Deploy no Vercel

### Opção 1: Via Vercel CLI

```bash
npm i -g vercel
cd mario-chaveiro-barra
vercel
vercel --prod
```

### Opção 2: Via GitHub + Vercel Dashboard

1. Crie um repositório no GitHub
2. Faça push do código
3. Acesse [vercel.com](https://vercel.com) e conecte o repositório
4. Vercel detecta que é HTML estático e faz o deploy

## 🌐 Domínio Customizado

Para configurar o subdomínio `www.mariochaveirobarrashopping.bob.app`:

1. No Vercel Dashboard, vá em **Settings > Domains**
2. Adicione o domínio
3. Configure o DNS conforme as instruções
4. Aguarde a propagação

## 🔒 Segurança

O arquivo `vercel.json` adiciona cabeçalhos de segurança importantes:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restritivo
- `Strict-Transport-Security` (HSTS)
- `Content-Security-Policy` permitindo Google Maps, WhatsApp e Google Fonts

## 📞 Contato do Negócio

- **Telefone:** (21) 2431-9783
- **WhatsApp:** (21) 98911-9537
- **E-mail:** mariochaveirobarra@hotmail.com
- **Endereço:** Barra Shopping, Av. das Américas, 4666 - Stand no Estacionamento, nível Lagoa, Barra da Tijuca, Rio de Janeiro - RJ

## 🌐 Redes Sociais

- Facebook: https://www.facebook.com/mario.seuchaveiro.na.barra
- Instagram: https://www.instagram.com/mariochaveirobarrashopping/

## 📝 Licença

© 2026 Mário Chaveiro - Barra Shopping. Todos os direitos reservados.
