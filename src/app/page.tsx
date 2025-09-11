import Link from "next/link";
import { getAllCalled, getAllUsers } from "@/lib/data";
import { Called, User } from "@/types";
import { BsTrashFill } from "react-icons/bs";

const getSituationBadgeStyle = (situationName: string) => {
  switch (situationName) {
    case "PENDENTE":
      return "text-red-color bg-bg-red-color";
    case "EM PRODUÇÃO":
      return "text-orange-color bg-bg-orange-color";
    case "AGUARDANDO RETORNO":
      return "text-purple-color bg-bg-purple-color";
    case "CONCLUÍDO":
      return "text-green-color bg-bg-green-color";
    default:
      return "text-gray-800 bg-gray-200";
  }
};

export default async function Home() {
  const [allCalled, allUsers]: [Called[], User[]] = await Promise.all([
    getAllCalled(),
    getAllUsers(),
  ]);

  const aguardandoCount = allCalled.filter(
    (c) => c.situation.name === "AGUARDANDO RETORNO"
  ).length;
  const concluidoCount = allCalled.filter(
    (c) => c.situation.name === "CONCLUÍDO"
  ).length;
  const emProducaoCount = allCalled.filter(
    (c) => c.situation.name === "EM PRODUÇÃO"
  ).length;
  const pendenteCount = allCalled.filter(
    (c) => c.situation.name === "PENDENTE"
  ).length;

  const recentTickets = allCalled.slice(0, 6);

  const today = new Date();
  const dateString = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col h-full gap-8">
      {/* CABEÇALHO DE BOAS VINDAS */}
      <div className="flex flex-col rounded-lg p-5 gap-2">
        <h1 className="text-3xl font-bold text-font-color">
          Bem Vindo, Bruno!
        </h1>
        <p>Hoje é {dateString}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        {/* SEÇÃO GERAL FLEX */}
        <div className="flex flex-col w-full lg:w-3/4 gap-8">
          {/* COLUNA ESQUERDA 3/4*/}
          <div className="flex items-center gap-6 flex-wrap bg-white rounded-lg p-5 shadow-md">
            {/* Ações rápidas */}
            <h2 className="text-xl font-semibold text-font-color ">
              Ações rápidas:
            </h2>
            <Link
              href="/chamados"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
            >
              Ver todas as Tarefas
            </Link>
            <Link
              href="/colaboradores"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
            >
              Gerir colaboradores
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {/* CARDS DE RESUMO */}
            <div className="border-b-[5px] border-l-[5px] bg-white border-red-color p-4 rounded-xl shadow-md">
              <p className="text-sm text-red-color">Pendente</p>
              <p className="text-3xl font-bold text-font-color">
                {pendenteCount}
              </p>
            </div>
            <div className="border-b-[5px] border-l-[5px] bg-white border-orange-color p-4 rounded-xl shadow-md">
              <p className="text-sm text-orange-color">Em Produção</p>
              <p className="text-3xl font-bold text-font-color">
                {emProducaoCount}
              </p>
            </div>
            <div className="border-b-[5px] border-l-[5px] bg-white border-purple-color p-4 rounded-xl shadow-md">
              <p className="text-sm text-purple-color">Aguardando Retorno</p>
              <p className="text-3xl font-bold text-font-color">
                {aguardandoCount}
              </p>
            </div>
            <div className="border-b-[5px] border-l-[5px] bg-white border-green-color p-4 rounded-xl shadow-md">
              <p className="text-sm text-green-color">Concluído</p>
              <p className="text-3xl font-bold text-font-color">
                {concluidoCount}
              </p>
            </div>
          </div>

          <div className="flex flex-col flex-1 min-h-0 bg-white p-6 rounded-lg">
            {/* TABELA */}
            <h2 className="font-bold text-xl mb-4 text-font-color flex-shrink-0">
              Últimos Chamados Atualizados
            </h2>
            <div className="flex-shrink-0 grid grid-cols-7 gap-4 px-3 py-2 text-[15px] text-font-color font-semibold bg-table-header-bg rounded-lg">
              <div className="col-span-1">Colaborador</div>
              <div className="col-span-2">Descrição</div>
              <div className="col-span-1">Motivo</div>
              <div className="col-span-2">Situação</div>
              <div className="col-span-1">Abertura</div>
            </div>
            <div className="flex-1 overflow-y-auto mt-3 space-y-3 pr-2">
              {recentTickets.map((ticket) => (
                <Link
                  key={ticket.id}
                  href={`/chamados/${ticket.id}`}
                  className="grid grid-cols-7 gap-4 items-center border-b p-3 rounded-lg text-font-color text-sm hover:bg-table-header-bg transition-shadow"
                >
                  <div className="col-span-1 font-semibold">
                    {ticket.userRequest.name}
                  </div>
                  <div className="col-span-2 truncate">
                    {ticket.description}
                  </div>
                  <div className="col-span-1">{ticket.category.name}</div>
                  <div className="col-span-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getSituationBadgeStyle(
                        ticket.situation.name
                      )}`}
                    >
                      {ticket.situation.name}
                    </span>
                  </div>
                  <div className="col-span-1">
                    {new Date(ticket.openDate).toLocaleDateString("pt-BR")}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* COLUNA DIREITA 1/4 */}
        <div className="flex flex-col w-full lg:w-1/4 gap-8">
          <div className="flex flex-col gap-5 p-5 bg-white rounded-lg shadow-md h-full">
            {/* COLABORADORES */}
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-3">
              Colaboradores
            </h2>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {allUsers.map((user: User) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-table-header-bg p-3 rounded-lg "
                >
                  <span className="text-gray-700">{user.name}</span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Remover ${user.name}`}
                  >
                    <BsTrashFill size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
