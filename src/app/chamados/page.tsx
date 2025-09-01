'use client';

import { useState, useEffect } from 'react';
import Card from "@/components/Card";
import CalledTable from "@/components/CalledTables";
import AddCalledModal from '@/components/AddCalledModal';

type Called = {
  id: string; title: string; openDate: string; userRequest: { name: string };
  category: { name: string }; situation: { name: string };
};

export default function ChamadosPage() {
  const [calledData, setCalledData] = useState<Called[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/called');
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

  const naFilaCount = calledData.length;
  const concluidosCount = 0;
  const atrasadosCount = 0;

  return (
    <div>
      <h1 className="text-3xl font-bold text-font-color mb-6">Chamados</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <Card title="ATRASADOS" value={atrasadosCount} color="red" />
        <Card title="NA FILA" value={naFilaCount} color="orange" />
        <Card title="CONCLUÍDOS" value={concluidosCount} color="green" />
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">A carregar chamados...</p>
      ) : (
        <CalledTable 
          chamados={calledData}
          onAddCalled={() => setIsModalOpen(true)} 
        />
      )}

      <AddCalledModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}