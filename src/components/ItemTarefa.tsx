import { useState } from 'react'
import type { Tarefa } from '../types/Tarefa'

interface ItemTarefaProps {
  tarefa: Tarefa;
  aoExcluir: (id: number) => Promise<void>;
}

function ItemTarefa({ tarefa, aoExcluir }: ItemTarefaProps) {
  const [excluindo, setExcluindo] = useState(false)

  async function excluir() {
    if (excluindo) return
    setExcluindo(true)
    try {
      await aoExcluir(tarefa.id)
    } finally {
      setExcluindo(false)
    }
  }

  return (
    <li className="item-tarefa">
      <span className="titulo-tarefa">{tarefa.titulo}</span>
      <button
        className="botao-excluir"
        type="button"
        onClick={excluir}
        disabled={excluindo}
        aria-label={`Excluir tarefa: ${tarefa.titulo}`}
      >
        {excluindo ? 'Excluindo...' : 'Excluir'}
      </button>
    </li>
  )
}

export default ItemTarefa

