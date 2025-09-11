// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('A iniciar o seeding...');

  // 1. LIMPA OS DADOS ANTIGOS (em ordem para não quebrar as relações)
  // Deleta todos os comentários e chamados primeiro
  await prisma.commentary.deleteMany({});
  await prisma.called.deleteMany({});
  
  // Depois deleta os utilizadores, categorias e situações
  await prisma.user.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.situation.deleteMany({});

  console.log('Dados antigos removidos.');

  // 2. INSERE OS NOVOS DADOS CORRETOS
  await prisma.category.createMany({
    data: [
      { name: 'EMAIL' },
      { name: 'MAQUINA' },
      { name: 'SERVIDOR' },
      { name: 'COTAÇÃO' },
      { name: 'PROGRAMAS' },
      { name: 'OUTROS' },
    ],
    skipDuplicates: true, // skipDuplicates ainda é útil aqui
  });
  console.log('Categorias criadas.');

  await prisma.situation.createMany({
    data: [
      { name: 'PENDENTE' },
      { name: 'EM PRODUÇÃO' },
      { name: 'AGUARDANDO RETORNO' },
      { name: 'CONCLUÍDO' },
    ],
    skipDuplicates: true,
  });
  console.log('Situações criadas.');

  const user = await prisma.user.create({
    data: {
      name: 'Bruno Santos',
    },
  });
  console.log('Utilizador de exemplo criado.');

  console.log({ user });
  console.log('Seeding finalizado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });