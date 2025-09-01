import Card from "@/components/Card";
import CalledTables from "@/components/CalledTables";

//Função para buscar os dados na API
async function getCalledData() {
  const res = await fetch("http://localhost:3000/api/called", {
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("Falha ao buscar dados da API");
    return [];
  }
  return res.json();
}

export default async function ChamadosPage() {
  const allCalled = await getCalledData();

  const naFilaCount = allCalled.length;
  const concluidosCount = 0;
  const atrasadosCount = 0;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Chamados</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <Card title="ATRASADOS" value={atrasadosCount} color="red" />
        <Card title="NA FILA" value={naFilaCount} color="orange" />
        <Card title="CONCLUÍDOS" value={concluidosCount} color="green" />
      </div>

      <CalledTables chamados={allCalled} />
    </div>
  );
}
