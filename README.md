# 📌 Sistema de Chamados  

Este é um sistema de gestão de chamados internos, desenvolvido para modernizar e otimizar o processo de acompanhamento de tarefas que antes era realizado em uma planilha do Excel.  
A aplicação permite o **registro, categorização e acompanhamento** do status de cada chamado.  

---

## 🚀 Tecnologias Utilizadas  

Este projeto foi construído utilizando um stack moderno e robusto, focado em performance e produtividade:  

- **Framework:** Next.js (com App Router)  
- **Linguagem:** TypeScript  
- **Interface:** React  
- **Estilização:** Tailwind CSS  
- **Banco de Dados:** PostgreSQL  
- **ORM:** Prisma  
- **Ícones:** React Icons (Bootstrap Icons)  

---

## ✨ Funcionalidades

- [x] Listagem de chamados a partir do banco de dados.  
- [x] Visualização de status, categoria e solicitante de cada chamado.  
- [x] Interface responsiva com barra lateral de navegação.  
- [ ] Criação de novos chamados através de um formulário.  
- [ ] Edição de status e detalhes de um chamado existente.  
- [ ] Adição de comentários e histórico para cada chamado.  
- [ ] Dashboard com resumo de status (Atrasados, Na Fila, Concluídos).  

---

## ⚙️ Configuração do Ambiente de Desenvolvimento  

### 🔹 Pré-requisitos  

- [Node.js](https://nodejs.org/) (versão **18.18** ou superior)  
- [PostgreSQL](https://www.postgresql.org/) instalado e rodando na sua máquina.  
- [Git](https://git-scm.com/)  

---

### 🔹 Passos para Instalação  

1. Clone o repositório:  

   ```bash
   git clone https://github.com/bruunossantos/called-system.git
   cd sistema-de-chamados

2. Instale as depencências:

   ```bash
   npm install

3. Configure as variáveis de ambiente:

   - Crie um arquivo chamado .env na raiz do projeto.
   - Adicione a sua string de conexão com o banco de dados. Crie um banco de dados chamado call_system antes.

   ```bash
   # .env
    DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/call_system"

4. Aplique as migrações do banco de dados:

   Este comando irá criar todas as tabelas no seu banco com base no schema do Prisma.

   ```bash
   npx prisma migrate dev
   
5. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev

Abra http://localhost:3000 no seu navegador para ver o resultado.