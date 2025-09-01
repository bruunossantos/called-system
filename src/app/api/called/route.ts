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