import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const situations = await prisma.situation.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return NextResponse.json(situations);
  } catch (error) {
    console.error("Erro ao buscar situações:", error);
    return NextResponse.json(
      { message: 'Erro ao buscar situações.' },
      { status: 500 }
    );
  }
}