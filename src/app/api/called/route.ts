import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const allCalled = await prisma.called.findMany({
      include: {
        category: true,
        situation: true,
        userRequest: true,
      },
      orderBy: {
        openDate: 'desc',
      },
    });

    return NextResponse.json(allCalled, { status: 200 });
  } catch (error) {
    console.error("ERRO NA API AO BUSCAR CHAMADOS:", error); 
    
    return NextResponse.json(
      { message: 'Erro interno no servidor ao buscar os chamados.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, userRequestId, categoryId, situationId } = body;

    // Validação
    if (!title || !description || !userRequestId || !categoryId || !situationId) {
      return NextResponse.json({ message: 'Dados incompletos.' }, { status: 400 });
    }

    const newCalled = await prisma.called.create({
      data: {
        title,
        description,
        userRequestId,
        categoryId: Number(categoryId), // Garante que o ID seja um número
        situationId: Number(situationId), // Garante que o ID seja um número
      },
    });

    return NextResponse.json(newCalled, { status: 201 });
  } catch (error) {
    console.error("ERRO NA API AO CRIAR CHAMADO:", error);
    return NextResponse.json(
      { message: 'Erro interno no servidor ao criar o chamado.' },
      { status: 500 }
    );
  }
}