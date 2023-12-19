// seleciona todas as tarefas e colunas do HTML
const tarefas = document.querySelectorAll('.tarefa');
const colunas = document.querySelectorAll('.coluna');

// variável para armazenar a tarefa que esta sendo arrastada
let tarefaArrastada = null;

// adiciona ouvintes de eventos para cada tarefa
tarefas.forEach(tarefa => {
    tarefa.addEventListener('dragstart', iniciarArrasto);
    tarefa.addEventListener('dargend', finalizarArrasto);
})

// adiciona ouvintes de eventos para cada coluna
colunas.forEach(coluna => {
    coluna.addEventListener('dragover', permitirSoltar);
    coluna.addEventListener('drop', soltarTarefa);
})

function iniciarArrasto(event){
    // função para iniciar o arrasto da tarefa
    tarefaArrastada = this;

    // define o efeito visual do arrastar
    this.classList.add('tarefa-arrastando')
}

function finalizarArrasto(event){
    // remove o efeito visual do arrastar
    this.classList.remove('tarefa-arrastando')
}

function permitirSoltar(event){
    event.preventDefault();
}

function soltarTarefa(event){
    // função para soltar a tarefa na coluna
    event.preventDefault();

    // verifica se há uma tarefa sendo arrastada
    if(tarefaArrastada){
        this.querySelector('.tarefas').appendChild(tarefaArrastada);
        tarefaArrastada = null;
    }
}

const formAdicionarTarefa = document.getElementById('adicionar-tarefa');

formAdicionarTarefa.addEventListener('submit', adicionarTarefa);

function adicionarTarefa(event){
    event.preventDefault();

    const novaTarefa = document.getElementById('nova-tarefa').value

    if(novaTarefa){
        const novaTarefaElemento = document.createElement('li')

        novaTarefaElemento.innerHTML = novaTarefa;
        novaTarefaElemento.draggable = true;
        novaTarefaElemento.classList.add('tarefa');

        document.getElementById('tarefas-fazer').appendChild(novaTarefaElemento)
        document.getElementById('nova-tarefa').value = ''

        novaTarefaElemento.addEventListener('dragstart', iniciarArrasto);
        novaTarefaElemento.addEventListener('dragend', finalizarArrasto);
    }
}