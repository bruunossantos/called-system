

export default function Home() {

  const today = new Date();
  const dateString = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col h-full gap-8">
      {/* CABEÇALHO DE BOAS VINDAS */}
      <div className="flex flex-col bg-white rounded-lg p-5 gap-2 shadow-md">
        <h1 className="text-3xl font-bold text-font-color">Bem Vindo, Bruno!</h1>
        <p>Hoje é {dateString}</p>
      </div>
    </div>
  );
}
