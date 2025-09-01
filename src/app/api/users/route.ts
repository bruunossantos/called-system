import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { message: 'Erro ao buscar usuários.' },
      { status: 500 }
    );
  }
}