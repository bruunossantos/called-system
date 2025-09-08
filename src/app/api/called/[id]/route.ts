import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Função para buscar um chamado
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = params.id;
  try {
    const called = await prisma.called.findUnique({
      where: { id },
      include: {
        userRequest: true,
        category: true,
        situation: true,
        commentary: {
          orderBy: {
            creationDate: "asc",
          },
        },
      },
    });

    if (!called) {
      return NextResponse.json(
        { message: "Chamado não encontrado." },
        { status: 404 }
      );
    }
    return NextResponse.json(called);
  } catch (error) {
    console.error(`Erro ao buscar chamado ${id}:`, error);
    return NextResponse.json(
      { message: "Erro ao buscar chamado." },
      { status: 500 }
    );
  }
}

// Função para atualizar um chamado
export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = params.id;
  try {
    const body = await request.json();
    const updatedCalled = await prisma.called.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updatedCalled);
  } catch (error) {
    console.error(`Erro ao atualizar chamado ${id}:`, error);
    return NextResponse.json(
      { message: "Erro ao atualizar chamado." },
      { status: 500 }
    );
  }
}
