"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BsThreeDotsVertical,
  BsArrowUp,
  BsArrowDown,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { Called as CalledType } from "@/types";

export type Situation = {
  id: number;
  name: string;
};

type User = {
  id: string;
  name: string;
};

type CalledTableProps = {
  chamados: CalledType[];
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
  // --- ESTADOS ---
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  // --- ESTADOS PARA OS FILTROS---
  const [filterSituation, setFilterSituation] = useState("TODOS");
  const [filterUser, setFilterUser] = useState("TODOS");
  const [users, setUsers] = useState<User[]>([]);

  // --- ESTADO PARA A ORDENAÇÃO
  type SortKey = "userRequest" | "situation" | "openDate";
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "asc" | "desc";
  } | null>({ key: "openDate", direction: "desc" });

  // --- BUSCANDO OS DADOS PARA PREENCHER O DROPDOWN DO FILTRO
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        setUsers(await res.json());
      } catch (error) {
        console.error("Erro ao buscar utilizadores para o filtro:", error);
      }
    };
    fetchUsers();
  }, []);

  // --- LOGICA DE FILTRAGEM E ORDENAÇÃO ---
  const processedCalled = useMemo(() => {
    let filteredData = [...chamados];

    // Filtro de situação
    if (filterSituation !== "TODOS") {
      filteredData = filteredData.filter(
        (c) => c.situation.name === filterSituation
      );
    }

    //FILTRO DE UTILIZADOR
    if (filterUser !== "TODOS") {
      filteredData = filteredData.filter(
        (c) => c.userRequest.name === filterUser
      );
    }

    //APLICANDO ORDENAÇÃO
    if (sortConfig !== null) {
      filteredData.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        if (
          sortConfig.key === "userRequest" ||
          sortConfig.key === "situation"
        ) {
          aValue = a[sortConfig.key].name;
          bValue = b[sortConfig.key].name;
        } else {
          // para datas
          aValue = new Date(a[sortConfig.key]).getTime();
          bValue = new Date(b[sortConfig.key]).getTime();
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [chamados, filterSituation, filterUser, sortConfig]);

  // APLICANDO PAGINAÇÃO NO FINAL
  const totalPages = Math.ceil(processedCalled.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleCalled = processedCalled.slice(startIndex, endIndex);

  // --- FUNÇÕES DE MANIPULAÇÃO ---
  const handleSort = (key: SortKey) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Componente auxiliar para o ícone de ordenação
  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (!sortConfig || sortConfig.key !== columnKey) return null;
    if (sortConfig.direction === "asc") return <BsArrowUp className="ml-1" />;
    return <BsArrowDown className="ml-1" />;
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              {/* Seletor Mostrar */}
              <span>Mostrar</span>
              <select
                className="border rounded-md px-2 py-1"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={6}>6</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Seletor de situação */}
            <div className="flex items-center gap-2">
              <span>Filtrar por Situação</span>
              <select
                className="border rounded-md px-2 py-1"
                value={filterSituation}
                onChange={(e) => setFilterSituation(e.target.value)}
              >
                <option value="TODOS">Todos</option>
                <option value="PENDENTE">Pendente</option>
                <option value="EM PRODUÇÃO">Em Produção</option>
                <option value="AGUARDANDO RETORNO">Aguardando</option>
                <option value="CONCLUÍDO">Concluído</option>
              </select>
            </div>

            {/* Seletor de Colaborador */}
            <div className="flex items-center gap-2">
              <span>Filtrar por Colaborador</span>
              <select
                className="border rounded-md px-2 py-1 bg-white"
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
              >
                <option value="TODOS">Todos</option>
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={onAddCalled}
            className="bg-primary-color text-white px-4 py-2 rounded-lg hover:bg-primary-color-hover font-semibold text-sm transition-colors duration-300 ease-in-out"
          >
            ADICIONAR NOVO +
          </button>
        </div>

        <div className="space-y-3">
          {/* Cabeçalho da "Tabela" */}
          <div className="grid grid-cols-7 gap-4 px-3 py-2 text-[15px] text-gray-500 font-semibold bg-table-header-bg rounded-lg">
            <button
              onClick={() => handleSort("userRequest")}
              className="col-span-1 flex items-center hover:text-primary-color"
            >
              Colaborador <SortIcon columnKey="userRequest" />
            </button>
            <div className="col-span-2">Descrição</div>
            <div className="col-span-1">Motivo</div>
            <button
              onClick={() => handleSort("situation")}
              className="col-span-1 flex items-center hover:text-primary-color"
            >
              Situação <SortIcon columnKey="situation" />
            </button>
            <button
              onClick={() => handleSort("openDate")}
              className="col-span-1 flex items-center hover:text-primary-color"
            >
              Abertura <SortIcon columnKey="openDate" />
            </button>
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
              <Link
                href={`/chamados/${chamado.id}`}
                className="flex text-[15px] text-white bg-primary-color hover:bg-primary-color-hover py-1 px-3 rounded-lg transition-colors duration-200 ease-in-out"
              >
                <BsThreeDotsVertical size={20} />
                Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-shrink-0 flex items-center justify-between pt-4">
        <span className="text-sm text-font-color">
          Mostrando {visibleCalled.length} de {processedCalled.length}{" "}
          resultados
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BsChevronLeft />
          </button>
          <span className="text-sm font-semibold text-font-color">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BsChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
