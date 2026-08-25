import { useState, useEffect } from "react"

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
    const AdicionarTarefa = () => {
        setTarefas("teste", "1234")
    }

    return (
        <>

        </>
    )
}

export default Tarefas
