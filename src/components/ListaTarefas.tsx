import ItemTarefa from './ItemTarefa'
import type { Tarefa } from '../types/Tarefa'

interface ListaTarefasProps {
  tarefas: Tarefa[];
  aoExcluir: (id: number) => Promise<void>;
}

function ListaTarefas({ tarefas, aoExcluir }: ListaTarefasProps) {
  return (
    <section className="lista-tarefas" aria-label="Lista de tarefas">
      {tarefas.length === 0 ? (
        <p className="mensagem-vazia">Nenhuma tarefa cadastrada ainda.</p>
      ) : (
        <ul className="itens-tarefas">
          {tarefas.map((tarefa) => (
            <ItemTarefa key={tarefa.id} tarefa={tarefa} aoExcluir={aoExcluir} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default ListaTarefas

