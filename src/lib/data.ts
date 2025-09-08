import prisma from '@/lib/prisma';

// BUSCANDO TODOS OS CHAMADOS
export async function getAllCalled() {
  try {
    const allCalled = await prisma.called.findMany({
      include: {
        category: true,
        situation: true,
        userRequest: true,
      },
      orderBy: {
        updateDate: 'desc',
      },
    });
    return allCalled;
  } catch (error) {
    console.error("Erro na Base de Dados: Falha ao buscar chamados.", error);
    return [];
  }
}