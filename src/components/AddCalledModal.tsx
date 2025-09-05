"use client";

import { useState, useEffect } from "react";

type Option = { id: string | number; name: string };

type AddCalledModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddCalledModal({
  isOpen,
  onClose,
  onSuccess,
}: AddCalledModalProps) {
  const [users, setUsers] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [situations, setSituations] = useState<Option[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userRequestId: "",
    categoryId: "",
    situationId: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Limpa o formulário sempre que o modal abre
      setFormData({
        title: "",
        description: "",
        userRequestId: "",
        categoryId: "",
        situationId: "",
      });
      setError("");

      const fetchData = async () => {
        try {
          const [usersRes, categoriesRes, situationsRes] = await Promise.all([
            fetch("/api/users"),
            fetch("/api/categories"),
            fetch("/api/situations"),
          ]);
          setUsers(await usersRes.json());
          setCategories(await categoriesRes.json());
          setSituations(await situationsRes.json());
        } catch {
          setError("Falha ao carregar dados do formulário.");
        }
      };
      fetchData();
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/called", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar o chamado. Verifique os dados.");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl text-font-color">
        <h2 className="text-2xl font-bold mb-6">Adicionar Novo Chamado</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="userRequestId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Colaborador
              </label>
              <select
                id="userRequestId"
                name="userRequestId"
                value={formData.userRequestId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
                required
              >
                <option value="">Selecione...</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Motivo
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
                required
              >
                <option value="">Selecione...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="situationId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Situação Inicial
            </label>
            <select
              id="situationId"
              name="situationId"
              value={formData.situationId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
              required
            >
              <option value="">Selecione...</option>
              {situations.map((sit) => (
                <option key={sit.id} value={sit.id}>
                  {sit.name}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary-color text-white rounded-md hover:bg-primary-color-hover font-semibold disabled:bg-gray-400"
            >
              {isLoading ? "A Guardar..." : "Guardar Chamado"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
