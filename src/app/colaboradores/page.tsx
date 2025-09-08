'use client';

import { useState, useEffect } from 'react';
import { BsPersonPlusFill, BsTrashFill } from 'react-icons/bs';

type User = {
  id: string;
  name: string;
  creationDate: string;
};

export default function ColaboradoresPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [newUserName, setNewUserName] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Falha ao buscar colaboradores.');
      setUsers(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUserName }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Falha ao adicionar colaborador.');
      }

      setNewUserName(''); 
      fetchData(); 
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ocorreu um erro.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Tem a certeza que deseja excluir este colaborador?')) {
      return;
    }

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Falha ao excluir colaborador.');
      }

      fetchData(); 
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ocorreu um erro.');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-bold text-font-color mb-6">Gestão de Colaboradores</h1>

      {/* ADICIONANDO NOVO COLABORADOR */}
      <form onSubmit={handleAddUser} className="bg-white p-6 rounded-lg shadow-md mb-8 flex items-center gap-4">
        <div className="flex-1">
          <label htmlFor="new-user" className="sr-only">Nome do novo colaborador</label>
          <input
            id="new-user"
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Nome do novo colaborador"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-color text-white px-4 py-2 rounded-lg hover:bg-primary-color-hover font-semibold text-sm transition-colors flex items-center gap-2"
        >
          <BsPersonPlusFill />
          Adicionar
        </button>
      </form>

      {/* LISTA DE COLABORADORES */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md overflow-y-auto">
        {isLoading ? (
          <p>A carregar...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="bg-page-bg p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold text-font-color">{user.name}</p>
                  <p className="text-xs text-gray-500">Registado em: {new Date(user.creationDate).toLocaleDateString('pt-BR')}</p>
                </div>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
                  aria-label={`Excluir ${user.name}`}
                >
                  <BsTrashFill size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}