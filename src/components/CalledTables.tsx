"use client";

import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

type Called = {
  id: string;
  title: string;
  description: string;
  openDate: string;
  userRequest: { name: string };
  category: { name: string };
  situation: { name: string };
};

type CalledTableProps = {
  chamados: Called[];
  onAddCalled: () => void;
};

const situationColors: { [key: string]: string } = {
  "EM PRODUÇÃO": "text-orange-color bg-bg-orange-color",
  PENDENTE: "text-red-color bg-bg-red-color",
  "AGUARDANDO RETORNO": "text-purple-color bg-bg-purple-color",
  CONCLUÍDO: "text-green-color bg-bg-green-color",
};

export default function CalledTable({
  chamados,
  onAddCalled,
}: CalledTableProps) {
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const visibleCalled = chamados.slice(0, itemsPerPage);

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Mostrar</span>
            <select
              className="border rounded-md px-2 py-1"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option>6</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>

          <button
            onClick={onAddCalled}
            className="bg-primary-color text-white px-4 py-2 rounded-lg hover:bg-primary-color-hover font-semibold text-sm transition-colors"
          >
            ADICIONAR NOVO +
          </button>
        </div>

        <div className="space-y-3">
          {/* Cabeçalho da "Tabela" */}
          <div className="grid grid-cols-7 gap-4 px-3 py-2 text-[15px] text-gray-500 font-semibold bg-table-header-bg rounded-lg">
            <div className="col-span-1">Colaborador</div>
            <div className="col-span-2">Descrição</div>
            <div className="col-span-1">Motivo</div>
            <div className="col-span-1">Situação</div>
            <div className="col-span-1">Abertura</div>
            <div className="col-span-1 text-right">Geral</div>
          </div>
        </div>
      </div>

      {/* Corpo da "Tabela" - Mapeamento dos chamados */}
      <div className="flex-1 overflow-y-auto mt-3 space-y-3 pr-3">
        {visibleCalled.map((chamado) => (
          <div
            key={chamado.id}
            className="grid grid-cols-7 gap-4 items-center bg-white hover:bg-table-header-bg py-4 px-3 rounded-lg text-font-color text-[18px] shadow-sm"
          >
            {/* Colunas de dados */}
            <div className="col-span-1">{chamado.userRequest.name}</div>
            <div className="col-span-2 truncate">{chamado.description}</div>
            <div className="col-span-1">{chamado.category.name}</div>
            <div className="col-span-1">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  situationColors[chamado.situation.name] || "bg-gray-200"
                }`}
              >
                {chamado.situation.name}
              </span>
            </div>
            <div className="col-span-1">
              {new Date(chamado.openDate).toLocaleDateString("pt-BR")}
            </div>
            <div className="col-span-1 flex justify-end">
              <button className="text-gray-500 hover:text-gray-800">
                <BsThreeDotsVertical size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
