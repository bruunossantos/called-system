import prisma from "@/lib/prisma";
import { Called, User } from "@/types";

// BUSCANDO TODOS OS CHAMADOS
export async function getAllCalled(): Promise<Called[]> {
  try {
    const allCalledFromDb = await prisma.called.findMany({
      include: {
        category: true,
        situation: true,
        userRequest: true,
      },
      orderBy: {
        updateDate: "desc",
      },
    });
    const formattedCalled = allCalledFromDb.map((c) => ({
      ...c,
      openDate: c.openDate.toISOString(),
      endDate: c.endDate ? c.endDate.toISOString() : null,
      startDate: c.startDate ? c.startDate.toISOString() : null,
    }));

    return formattedCalled;
  } catch (error) {
    console.error("Erro na Base de Dados: Falha ao buscar chamados.", error);
    return [];
  }
}

// BUSCANDO TODOS OS USUÁRIOS
export async function getAllUsers(): Promise<User[]> {
  try {
    const usersFromDb = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const formattedUsers = usersFromDb.map((u) => ({
      ...u,
      creationDate: u.creationDate.toISOString(), // Converte Date para string
    }));
    return formattedUsers;
  } catch (error) {
    console.error(
      "Erro na Base de Dados: Falha ao buscar utilizadores.",
      error
    );
    return [];
  }
}
