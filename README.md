Sistema de Chamados
Este é um sistema de gestão de chamados internos, desenvolvido para modernizar e otimizar o processo de acompanhamento de tarefas que antes era realizado em uma planilha do Excel. A aplicação permite o registro, categorização e acompanhamento do status de cada chamado.

🚀 Tecnologias Utilizadas
Este projeto foi construído utilizando um stack moderno e robusto, focado em performance e produtividade:

Framework: Next.js (com App Router)

Linguagem: TypeScript

Interface: React

Estilização: Tailwind CSS

Banco de Dados: PostgreSQL

ORM: Prisma

Ícones: React Icons (Bootstrap Icons)

✨ Funcionalidades
[x] Listagem de chamados a partir do banco de dados.

[x] Visualização de status, categoria e solicitante de cada chamado.

[x] Interface responsiva com barra lateral de navegação.

[ ] Criação de novos chamados através de um formulário.

[ ] Edição de status e detalhes de um chamado existente.

[ ] Adição de comentários e histórico para cada chamado.

[ ] Dashboard com resumo de status (Atrasados, Na Fila, Concluídos).

⚙️ Configuração do Ambiente de Desenvolvimento
Siga os passos abaixo para rodar o projeto localmente.

Pré-requisitos
Node.js (versão 18.18 ou superior)

PostgreSQL instalado e rodando na sua máquina.

Git

Passos para Instalação
Clone o repositório:

git clone [https://github.com/bruunossantos/called-system.git](https://github.com/bruunossantos/called-system.git)
cd sistema-de-chamados

Instale as dependências:

npm install

Configure as variáveis de ambiente:

Crie um arquivo chamado .env na raiz do projeto.

Adicione a sua string de conexão com o banco de dados. Crie um banco de dados chamado call_system antes.

# .env
DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/call_system"

Aplique as migrações do banco de dados:
Este comando irá criar todas as tabelas no seu banco com base no schema do Prisma.

npx prisma migrate dev

Popule o banco com dados iniciais:
Este comando irá popular as tabelas Category e Situation com os valores padrão.

npx prisma db seed

Rode o servidor de desenvolvimento:

npm run dev

Abra http://localhost:3000 no seu navegador para ver o resultado.

📜 Scripts Disponíveis
No diretório do projeto, você pode rodar:

npm run dev: Inicia a aplicação em modo de desenvolvimento.

npm run build: Compila a aplicação para produção.

npm run start: Inicia um servidor de produção.

npm run lint: Executa o linter para verificar erros de código.