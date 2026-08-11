# Ativação do painel administrativo

O código do painel fica em `/admin`. Para ativá-lo:

1. Crie ou escolha um projeto Supabase exclusivo da noBRon.
2. Execute `001_form_submissions.sql` no SQL Editor desse projeto.
3. Em **Authentication > Providers > Email**, desative o cadastro público.
4. Crie manualmente o único usuário administrativo.
5. No usuário criado, defina `app_metadata.role` como `admin` usando uma
   operação administrativa segura (Dashboard, Admin API ou SQL controlado).
6. Copie `.env.example` para `.env.local` e preencha as cinco variáveis.
7. Reinicie a aplicação e entre em `/admin`; o primeiro acesso exigirá ativar
   um autenticador TOTP.

Nunca exponha `SUPABASE_SECRET_KEY` no navegador, no Git ou em variáveis com o
prefixo `NEXT_PUBLIC_`. A fase 1 registra apenas os nomes dos arquivos escolhidos
no formulário de protótipo; os arquivos em si não são enviados ao Supabase.
