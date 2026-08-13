# Fase 01 — App Shell + Home mobile

Esta etapa substitui apenas a linguagem estrutural inicial da experiência.

## Arquivos para SUBSTITUIR

- `BeautyLanding.tsx`
- `BeautyLanding.module.css`
- `components/DemoBadge/DemoBadge.tsx`
- `components/DemoBadge/DemoBadge.module.css`
- `components/DemoActionDialog/DemoActionDialog.tsx`
- `components/DemoActionDialog/DemoActionDialog.module.css`

## Pastas NOVAS

- `components/AppTopBar/`
- `components/BottomNavigation/`
- `sections/Home/`

## Arquivos antigos que deixam de ser usados nesta fase

Não é necessário apagar agora. Eles podem ficar no projeto para rollback:

- `components/BeautyHeader/`
- `components/BookingBar/`
- `sections/Hero/`
- `sections/SelectedWorks/`

`BeautyLanding.tsx` deixa de importá-los.

## O que NÃO foi redesenhado ainda

- Serviços
- Portfólio
- WorkDetail
- Antes/Depois
- Sobre
- Avaliações
- Localização
- FAQ
- CTA final
- transição noBRon

Essas partes continuam funcionando com o código anterior para que a nova linguagem seja aprovada uma seção por vez.

## Dependência

A nova navegação usa `lucide-react`, que já é usada no projeto noBRon.

## Validação recomendada

Abrir primeiro em 390×844 e avaliar apenas:

1. AppTopBar + selo DEMO
2. Home / Hero
3. sheet inferior arredondado
4. botão circular de agendamento
5. preview horizontal dos trabalhos
6. BottomNavigation

Não ajustar as demais seções ainda.
