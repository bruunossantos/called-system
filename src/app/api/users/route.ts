import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from '@prisma/client';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { message: "Erro ao buscar usuários." },
      { status: 500 }
    );
  }
}

//FUNÇÃO PARA CRIAR UM NOVO COLABORADOR
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ message: 'O nome é obrigatório.' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(), //REMOVENDO ESPAÇOS
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { message: 'Já existe um colaborador com este nome.' },
          { status: 409 }
        );
      }
    }

    console.error("Erro ao criar utilizador:", error);
    return NextResponse.json(
      { message: 'Não foi possível criar o colaborador.' },
      { status: 500 }
    );
  }
}