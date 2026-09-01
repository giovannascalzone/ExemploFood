import { useState, useEffect } from "react"
import '../css/estilo.css'
const Tarefas = () => {
    // HOOK useState
    const [tarefas, setTarefas] = useState(() => {
        // LOCALSTRAGE
        const salvarTarefa = localStorage.getItem("item-tarefa")
        return salvarTarefa ? JSON.parse(salvarTarefa) : [];
    });

    const [campo, setCampo] = useState("");

    // HOOK useEffect - realiza o efeito colateral, no exemplo ao cadastrar a tarefa aparece automaticamente na tela
    useEffect(() => {
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
    }, [tarefas])

    // Função para adicionar tarefa
    const AdicionarTarefa = (e) => {
        // Previne que a página se recarregue
        e.preventDefault();
        // valida o campo se for vazio
        if (!campo.trim()) return;

        const novaTarefa = {
            id: Date.now(),
            text: campo,
        };
        setTarefas([...tarefas, novaTarefa])
        setCampo('');
    }

    // Função para remover tarefa
    const RemoverTarefa = (id) => {
        const apagarTarefa = tarefas.filter((tarefa) => tarefa.id !== id);
        setTarefas(apagarTarefa);
    }



    return (
        <div className="todo-container"> 
            <h1>Minha Lista de Tarefas</h1>
            <form onSubmit={AdicionarTarefa}>
                <input type="text"
                    value={campo}
                    onChange={(e) => { setCampo(e.target.value) }}
                    placeholder="Digite uma tarefa"
                />
                <button type="submit">Adicionar</button>
            </form>
            <ul>
                {tarefas.map((tarefa) => (
                    <li key={tarefa.id}>
                        <span>{tarefa.text}</span>
                        <button onClick={() => RemoverTarefa(tarefa.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
            {/* compara senão tiver tarefas deixar a nenhuma tarefa salva */}
            {tarefas.length === 0 && <p>Nenhuma tarefa salva</p>}
        </div>
    )
}

export default Tarefas
