import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { description, calledId } = body;

    if (!description || !calledId) {
      return NextResponse.json(
        { message: "Dados incompletos." },
        { status: 400 }
      );
    }

    const newCommentary = await prisma.commentary.create({
      data: {
        description,
        calledId,
      },
    });

    return NextResponse.json(newCommentary, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    return NextResponse.json(
      { message: "Erro ao criar comentário." },
      { status: 500 }
    );
  }
}
