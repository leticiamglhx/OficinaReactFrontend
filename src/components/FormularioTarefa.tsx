import { useState } from 'react'
import type { FormEvent } from 'react'

interface FormularioTarefaProps {
  aoAdicionar: (titulo: string) => Promise<boolean>;
}

function FormularioTarefa({ aoAdicionar }: FormularioTarefaProps) {
  const [titulo, setTitulo] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const tituloLimpo = titulo.trim()
    if (!tituloLimpo || enviando) return

    setEnviando(true)
    try {
      const sucesso = await aoAdicionar(tituloLimpo)
      if (sucesso) setTitulo('')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="formulario-tarefa" onSubmit={enviarFormulario}>
      <label htmlFor="nova-tarefa">Nova tarefa</label>
      <div className="campos-formulario">
        <input
          id="nova-tarefa"
          type="text"
          placeholder="Digite uma nova tarefa"
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          disabled={enviando}
          required
        />
        <button className="botao-adicionar" type="submit" disabled={enviando || !titulo.trim()}>
          {enviando ? 'Adicionando...' : 'Adicionar'}
        </button>
      </div>
    </form>
  )
}

export default FormularioTarefa

