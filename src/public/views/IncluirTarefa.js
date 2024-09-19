//função para abrir o calendário com o icone do google fonts
export function AbrirCalendario() {
    document.getElementById('data').click();
}

// Associar o clique do ícone à função de abrir o calendário
document.getElementById('calendar-icon').addEventListener('click', abrirCalendario);

export function mostrarNomeArquivo() {
    var input = document.getElementById('arquivo');
    var nomeArquivo = input.files.length > 0 ? input.files[0].name : 'Nenhum arquivo escolhido';
    document.getElementById('nome-arquivo').textContent = nomeArquivo;
}