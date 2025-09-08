import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// FUNÇÃO PARA EXCLUIR COLABORADOR
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    // VERIFICANDO SE COLABORADOR ESTA LIGADO A ALGUM CHAMADO
    const existingCalled = await prisma.called.findFirst({
      where: { userRequestId: id },
    });

    if (existingCalled) {
      return NextResponse.json(
        {
          message:
            "Não é possível excluir o colaborador, pois ele está associado a um ou mais chamados.",
        },
        { status: 409 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Colaborador excluído com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Erro ao excluir utilizador ${id}:`, error);
    return NextResponse.json(
      { message: "Erro ao excluir utilizador." },
      { status: 500 }
    );
  }
}
