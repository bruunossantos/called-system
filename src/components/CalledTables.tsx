"use client";

import { BsThreeDotsVertical } from "react-icons/bs";

type Called = {
  id: string; title: string; openDate: string; userRequest: { name: string };
  category: { name: string }; situation: { name: string };
};

// Atualizamos as props para incluir a nova função
type CalledTableProps = {
  chamados: Called[];
  onAddCalled: () => void; // A função que recebemos do Pai
};

const situationColors: { [key: string]: string } = {
  FAZENDO: "text-orange-color bg-bg-orange-color",
  PENDENTE: "text-red-color bg-bg-red-color",
  CONCLUIDO: "text-green-color bg-bg-green-color",
};

export default function CalledTable({ chamados, onAddCalled }: CalledTableProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Mostrar</span>
          <select className="border rounded-md px-2 py-1">
            <option>6</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>
        
        {/* O botão está de volta, chamando a função do Pai */}
        <button 
          onClick={onAddCalled}
          className="bg-primary-color text-white px-4 py-2 rounded-lg hover:bg-primary-color-hover font-semibold text-sm transition-colors"
        >
          ADD NOVO +
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-font-color">
          <thead className="border-b text-gray-500 text-sm">
            <tr>
              <th className="p-3 font-medium">Colaborador</th>
              <th className="p-3 font-medium">Descrição</th>
              <th className="p-3 font-medium">Motivo</th>
              <th className="p-3 font-medium">Situação</th>
              <th className="p-3 font-medium">Abertura</th>
              <th className="p-3 font-medium">Geral</th>
            </tr>
          </thead>
          <tbody>
            {chamados.map((chamado) => (
              <tr key={chamado.id} className="border-b hover:bg-page-bg">
                <td className="p-3">{chamado.userRequest.name}</td>
                <td className="p-3">{chamado.title}</td>
                <td className="p-3">{chamado.category.name}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      situationColors[chamado.situation.name] || "bg-gray-200"
                    }`}
                  >
                    {chamado.situation.name}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(chamado.openDate).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-3">
                  <button className="text-gray-500 hover:text-gray-800">
                    <BsThreeDotsVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}