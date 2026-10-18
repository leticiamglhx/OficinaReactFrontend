import { useEffect, useState } from 'react'
import Header from './components/Header'
import FormularioTarefa from './components/FormularioTarefa'
import ListaTarefas from './components/ListaTarefas'
import type { Tarefa } from './types/Tarefa'
import * as tarefaService from './services/tarefaService'
import './App.css'

function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [falhaBusca, setFalhaBusca] = useState(false)

  useEffect(() => {
    let ativo = true

    async function carregarTarefas() {
      try {
        const tarefasEncontradas = await tarefaService.buscarTarefas()
        if (ativo) setTarefas(tarefasEncontradas)
      } catch {
        if (ativo) {
          setFalhaBusca(true)
          setErro('Não foi possível carregar as tarefas. Verifique a conexão com a API e recarregue a página.')
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    void carregarTarefas()
    // Ignora respostas após a limpeza, inclusive no StrictMode.
    return () => { ativo = false }
  }, [])

  async function adicionarTarefa(titulo: string): Promise<boolean> {
    setErro('')
    try {
      const novaTarefa = await tarefaService.adicionarTarefa(titulo)
      setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa])
      return true
    } catch {
      setErro('Não foi possível adicionar a tarefa. Tente novamente.')
      return false
    }
  }

  async function excluirTarefa(id: number): Promise<void> {
    setErro('')
    try {
      await tarefaService.excluirTarefa(id)
      setTarefas((tarefasAtuais) => tarefasAtuais.filter((tarefa) => tarefa.id !== id))
    } catch {
      setErro('Não foi possível excluir a tarefa. Tente novamente.')
    }
  }

  return (
    <main className="aplicacao">
      <Header />
      <div className="cartao-tarefas">
        {carregando && <p role="status">Carregando tarefas...</p>}
        {erro && <p className="mensagem-erro" role="alert">{erro}</p>}
        {!carregando && !falhaBusca && (
          <>
            <FormularioTarefa aoAdicionar={adicionarTarefa} />
            <ListaTarefas tarefas={tarefas} aoExcluir={excluirTarefa} />
          </>
        )}
      </div>
    </main>
  )
}

export default App

