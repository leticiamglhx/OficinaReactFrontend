import type { Tarefa } from '../types/Tarefa'

const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000').replace(/\/+$/, '')

// Ajuste o contrato provisório aqui quando o backend estiver disponível.
function validarTarefa(dados: unknown): Tarefa {
  if (
    typeof dados !== 'object' || dados === null ||
    !('id' in dados) || typeof dados.id !== 'number' ||
    !('titulo' in dados) || typeof dados.titulo !== 'string'
  ) {
    throw new Error('A API retornou uma tarefa em formato inesperado.')
  }
  return { id: dados.id, titulo: dados.titulo }
}

export async function buscarTarefas(): Promise<Tarefa[]> {
  const resposta = await fetch(`${API_URL}/tarefas`)
  if (!resposta.ok) throw new Error('Não foi possível buscar as tarefas.')
  const dados: unknown = await resposta.json()
  if (!Array.isArray(dados)) throw new Error('A API retornou uma lista em formato inesperado.')
  return dados.map(validarTarefa)
}

export async function adicionarTarefa(titulo: string): Promise<Tarefa> {
  const resposta = await fetch(`${API_URL}/tarefas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo }),
  })
  if (!resposta.ok) throw new Error('Não foi possível adicionar a tarefa.')
  return validarTarefa(await resposta.json())
}

export async function excluirTarefa(id: number): Promise<void> {
  const resposta = await fetch(`${API_URL}/tarefas/${id}`, { method: 'DELETE' })
  if (!resposta.ok) throw new Error('Não foi possível excluir a tarefa.')
  // Não ler JSON: o DELETE pode retornar uma resposta sem corpo (204).
}

