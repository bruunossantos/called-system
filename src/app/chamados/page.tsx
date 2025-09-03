"use client";

import { useState, useEffect } from "react";
import Card from "@/components/Card";
import CalledTable from "@/components/CalledTables";
import AddCalledModal from "@/components/AddCalledModal";

type Called = {
  id: string;
  title: string;
  description: string;
  openDate: string;
  userRequest: { name: string };
  category: { name: string };
  situation: { name: string };
};

export default function ChamadosPage() {
  const [calledData, setCalledData] = useState<Called[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/called");
      const data = await res.json();
      setCalledData(data);
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSuccess = () => {
    fetchData();
  };

  const pendenteCount = calledData.filter(
    (c) => c.situation.name === "PENDENTE"
  ).length;
  const emProducaoCount = calledData.filter(
    (c) => c.situation.name === "EM PRODUÇÃO"
  ).length;
  const aguardandoCount = calledData.filter(
    (c) => c.situation.name === "AGUARDANDO RETORNO"
  ).length;
  const concluidosCount = calledData.filter(
    (c) => c.situation.name === "CONCLUÍDO"
  ).length;

  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-3xl font-bold text-font-color mb-6">Tarefas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
          <Card title="PENDENTE" value={pendenteCount} color="red" />
          <Card title="EM PRODUÇÃO" value={emProducaoCount} color="orange" />
          <Card title="AGUARDANDO" value={aguardandoCount} color="purple" />
          <Card title="CONCLUÍDOS" value={concluidosCount} color="green" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <p className="text-center text-gray-500">A carregar chamados...</p>
        ) : (
          <CalledTable
            chamados={calledData}
            onAddCalled={() => setIsModalOpen(true)}
          />
        )}
      </div>
      <AddCalledModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
