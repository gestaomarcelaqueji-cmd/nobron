# Beauty Presence — redesign completo mobile-first

Este pacote substitui a feature visual anterior por uma arquitetura mais próxima de aplicativo.

## Estrutura final

- AppTopBar
- BottomNavigation
- Home
- Services (Service Deck único)
- Works (galeria editorial + filtro + before/after somente quando houver imagens reais)
- Profile (profissional + informações em drawers)
- BookingSheet global
- WorkDetail fullscreen
- DemoInfoSheet
- NobronTransition

## Como aplicar

1. Faça backup da pasta atual:
   `src/features/beauty-presence`
2. Remova a pasta atual inteira.
3. Copie a pasta `beauty-presence` deste ZIP para:
   `src/features/beauty-presence`
4. Não altere a rota `/cases/presenca-local-beleza` se ela já importa:
   - `BeautyLanding`
   - `naraValeData`
5. Rode `npm run dev`.
6. Teste primeiro em 390 × 844.

## Dependências usadas

Apenas dependências já usadas no projeto:
- React
- `motion/react`
- `lucide-react`

Nenhuma biblioteca nova foi adicionada.

## Fotografias

As fotografias continuam vindo dos dados (`image`). Enquanto estiverem vazias, `MediaFrame` renderiza um placeholder editorial. O design foi estruturado para a fotografia ser protagonista quando os assets reais forem inseridos.

## Nara Vale / demo

- Nara Vale continua sendo identidade fictícia.
- Não há endereço, avaliações ou horários inventados no dataset demonstrativo.
- O before/after só aparece se existirem imagens reais preenchidas.
- CTAs de agendamento em `mode: "case"` explicam a demonstração e oferecem o CTA da noBRon; não abrem WhatsApp fictício.

## Fonte editorial

O CSS usa:
`var(--font-display, "Bodoni Moda"), Didot, Georgia, serif`

Se o projeto já expõe `--font-display`, ele será usado automaticamente. Caso contrário, cai no fallback sem quebrar a página.
