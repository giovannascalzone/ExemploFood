import { useState, useEffect } from "react"
import '../css/estilo.css'
import { Info } from "lucide-react"; 
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
        <div className="max-w-md mx-auto mt-10 bg-pink-300 rounded-2xl shadow-xl border border-gray-400 "> 
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center texto-grande">Minha Lista de Tarefas</h1>
            <form onSubmit={AdicionarTarefa} className="flex gap-2 mb-6">
                <input type="text"
                    value={campo}
                    onChange={(e) => { setCampo(e.target.value) }}
                    placeholder="Digite uma tarefa"
                    className="flex-1 px-4 py-2 border border-r-gray-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-900 focus:border-transparent text-gray-800 placeholder-gray-800"
                />
                <button type="submit" className="bg-pink-700 hover:bg-pink-500 text-white font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer">Adicionar</button>
            </form>
            <ul className="space-y-3 icon:Info">
                {tarefas.map((tarefa) => (
                    <li key={tarefa.id} className="flex items-center justify-between p-3 bg-pink-50 rounded-2xl shadow-sm hover:bg-pink-200 transition-colors  ">
                        <span className="text-black break-all mr-2">{tarefa.text}</span>
                        <button onClick={() => RemoverTarefa(tarefa.id)}
                        className="bg-red-600 hover:bg-red-500 text-white font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer"
                        >Excluir</button>
                    </li>
                ))}
            </ul>
            {/* compara senão tiver tarefas deixar a nenhuma tarefa salva */}
            {tarefas.length === 0 && (<p className="text-center text-gray-800 italic mt-4">Nenhuma tarefa salva</p>)}
        </div>
    )
}

export default Tarefas
