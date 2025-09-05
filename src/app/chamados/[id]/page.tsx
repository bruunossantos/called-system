"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  BsArrowLeftSquare,
  BsPlayFill,
  BsPauseFill,
  BsSendFill,
} from "react-icons/bs"; // Ícones
import {
  Called as CalledType,
  Commentary as CommentaryType,
  Situation as SituationType,
} from "@/types";

type CalledDetails = CalledType & {
  commentary: CommentaryType[];
  situation: SituationType;
};

// Função para formatar os segundos em HH:MM:SS (HORA:MINUTO:SEGUNDO)
const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 3600 / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((v) => (v < 10 ? "0" + v : v)).join(":");
};

export default function CalledDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [called, setCalled] = useState<CalledDetails | null>(null); //Guardar os detalhes do chamado vindos da API
  const [situations, setSituations] = useState<SituationType[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(""); //Guarda as mensagens de erro

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); //Guarda o tempo total em segundos

  const [newComment, setNewComment] = useState(""); //Guarda o texto do novo comentario que esta sendo escrito

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      const [calledRes, situationsRes] = await Promise.all([
        fetch(`/api/called/${id}`),
        fetch(`/api/situations`),
      ]);
      if (!calledRes.ok) throw new Error("Chamado não encontrado");

      const calledData: CalledDetails = await calledRes.json();
      const situationsData = await situationsRes.json();

      setCalled(calledData);
      setSituations(situationsData);
      setElapsedTime(calledData.timeSpent || 0);
      setIsTimerRunning(!!calledData.timeStartedAt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && called?.timeStartedAt) {
      const startTime = new Date(called.timeStartedAt).getTime();
      interval = setInterval(() => {
        const now = Date.now();
        const secondsSinceStart = Math.floor((now - startTime) / 1000);
        setElapsedTime(called.timeSpent + secondsSinceStart);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, called]);

  const handleTimerToggle = async () => {
    //Pausar
    if (isTimerRunning) {
      const secondsSinceStart = Math.floor(
        (Date.now() - new Date(called!.timeStartedAt!).getTime()) / 1000
      );
      const newTotalTime = called!.timeSpent + secondsSinceStart;

      await fetch(`/api/called/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ timeStartedAt: null, timeSpent: newTotalTime }),
      });
    } else {
      //Iniciar
      await fetch(`/api/called/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ timeStartedAt: new Date() }),
      });
    }
    fetchData();
  };

  const handleAddComment = async (description: string) => {
    await fetch("/api/commentary", {
      method: "POST",
      body: JSON.stringify({ description, calledId: id }),
    });
    setNewComment("");
    fetchData();
  };

  const handleSituationChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSituationId = Number(e.target.value);
    await handleAddComment(
      `SITUAÇÃO ALTERADA PARA: ${
        situations.find((s) => s.id === newSituationId)?.name || "DESCONHECIDO"
      }`
    );
    await fetch(`/api/called/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ situationId: newSituationId }),
    });
    fetchData();
  };

  const handleFinishCalled = async () => {
    const finishedSituation = situations.find((s) => s.name === "CONCLUÍDO");
    if (isTimerRunning) await handleTimerToggle(); //Faz o cronometro parar se estiver correndo

    await handleAddComment("CHAMADO ENCERRADO");
    await fetch(`/api/called/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        situationId: finishedSituation?.id,
        endDate: new Date(),
      }),
    });
    router.push("/chamados");
  };

  if (isLoading)
    return <p className="text-center p-10">A carregar chamado...</p>;
  if (error)
    return <p className="text-center p-10 text-red-500">Erro: {error}</p>;
  if (!called)
    return <p className="text-center p-10">Chamado não encontrado.</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full bg-white p-8 rounded-lg shadow-lg">
      {/* COLUNA DA ESQUERDA */}
      <div className="lg:w-1/2 flex flex-col gap-6 overflow-y-auto pr-4">
        <Link
          href="/chamados"
          className="flex items-center gap-2 text-primary-color font-semibold hover:underline"
        >
          <BsArrowLeftSquare />
          Voltar para o painel de tarefas
        </Link>

        <h1 className="text-4xl font-bold text-font-color">{called.title}</h1>
        <p>{called.description}</p>

        <div className="p-4 rounded-lg flex items-center gap-4">
          <label className="font-semibold">Situação</label>
          <select
            value={called.situationId}
            onChange={handleSituationChange}
            className="p-2 border rounded-md bg-[#d4ddef]"
          >
            {situations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-page-bg p-4 rounded-lg">
          <p className="font-semibold mb-2">Contagem</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-mono">{formatTime(elapsedTime)}</p>
            <button
              onClick={handleTimerToggle}
              className="bg-primary-color hover:to-primary-color-hover text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              {isTimerRunning ? (
                <>
                  <BsPauseFill /> Pausar
                </>
              ) : (
                <>
                  <BsPlayFill /> Iniciar
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-page-bg p-4 rounded-lg text-sm space-y-2">
          <p>
            <strong>Data de início:</strong>{" "}
            {new Date(called.openDate).toLocaleString("pt-BR")}
          </p>
          <p>
            <strong>Encerrada em:</strong>{" "}
            {called.endDate
              ? new Date(called.endDate).toLocaleString("pt-BR")
              : "---"}
          </p>
          <p>
            <strong>Tempo de duração:</strong> {formatTime(elapsedTime)}
          </p>
          <p>
            <strong>Aberta por:</strong> {called.userRequest.name}
          </p>
        </div>

        <button
          onClick={handleFinishCalled}
          className="w-full bg-primary-color hover:bg-primary-color-hover text-white py-3 rounded-lg font-bold"
        >
          ENCERRAR CHAMADO
        </button>
      </div>

      {/* COLUNA DA DIREITA */}
      <div className="lg:w-1/2 bg-page-bg rounded-lg p-6 flex flex-col h-full flex-shrink-0 group">
        <div className="flex-1 overflow-y-hidden group-hover:overflow-y-auto space-y-4 pr-2 transition-all">
          {called.commentary.map((comment) => (
            <div
              key={comment.id}
              className={`p-4 rounded-lg ${
                comment.description.startsWith("SITUAÇÃO ALTERADA")
                  ? "bg-orange-100"
                  : "bg-green-100"
              }`}
            >
              <p className="text-sm">{comment.description}</p>
              <p className="text-xs text-right text-gray-500 mt-2">
                {new Date(comment.creationDate).toLocaleString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Digite aqui a nova atualização..."
            className="flex-1 border p-2 rounded-lg"
          />
          <button
            onClick={() => handleAddComment(newComment)}
            className="bg-primary-color text-white p-3 rounded-lg"
          >
            <BsSendFill />
          </button>
        </div>
      </div>
    </div>
  );
}
