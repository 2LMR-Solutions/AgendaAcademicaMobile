// //função para abrir o calendário com o icone do google fonts
// export function AbrirCalendario() {
//     document.getElementById('data').click();
// }

// // Associar o clique do ícone à função de abrir o calendário
// document.getElementById('calendar-icon').addEventListener('click', abrirCalendario);

export function mostrarNomeArquivo() {
    const input = document.getElementById('arquivo');
    const nomeArquivoElement = document.getElementById('nome-arquivo');
    
    if (input.files.length > 0) {
        let nomesArquivos = [];
        
        for (let i = 0; i < input.files.length; i++) {
            nomesArquivos.push(input.files[i].name);
        }

        nomeArquivoElement.textContent = nomesArquivos.join(', ');
    } else {
        nomeArquivoElement.textContent = 'Nenhum arquivo escolhido';
    }
}