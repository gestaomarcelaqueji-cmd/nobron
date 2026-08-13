# noBRon — /landing-page — SEO comercial + local

Arquivos alterados:

- `src/app/landing-page/page.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/PricingSection.tsx`
- `src/components/sections/SeoExplanation.tsx`
- `src/components/sections/NotEnoughSection.tsx`
- `src/data/faqs.ts`
- `src/data/site.ts`

## O que mudou

1. A intenção principal passa a ser **Landing Page por assinatura**.
2. Metadata associa a página a **Telêmaco Borba** sem criar rota geográfica duplicada.
3. O Hero deixa de limitar a oferta a “negócios locais” e passa a falar com profissionais, empreendedores e empresas.
4. Telêmaco Borba aparece em conteúdo editorial real, além dos exemplos demonstrativos.
5. O modelo recorrente é explicado no preço e no FAQ.
6. O link para `SEO e Presença Digital` foi preservado.
7. O bloco de necessidade maior reforça `site institucional` e adiciona link contextual para `/contato`.
8. Mockups já usam `div`/`strong` para títulos simulados; não foi necessário alterá-los.
9. Preço de R$ 200/mês, ausência de fidelidade, animações, layout e depoimentos foram preservados.

## Validação

Depois de copiar os arquivos, rode:

```bash
npm run build
```

Depois publique e solicite reindexação de `/landing-page` no Search Console.
