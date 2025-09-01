import { PrismaClient } from '@prisma/client';

// Este bloco de código previne que múltiplas instâncias do Prisma Client
// sejam criadas em ambiente de desenvolvimento.

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;