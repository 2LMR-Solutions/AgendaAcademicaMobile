export function validarSenha(senha) {
    // Expressão regular para verificar se a senha contém pelo menos uma letra maiúscula
    const temMaiuscula = /[A-Z]/.test(senha);
    return temMaiuscula;
}

export function exibirMensagemValidacao(senha) {
    const ajudaSenha = document.getElementById('passwordHelpBlock');

    if (validarSenha(senha)) {
        ajudaSenha.textContent = 'Senha válida: contém pelo menos uma letra maiúscula.';
        ajudaSenha.style.color = 'green';
    } else {
        ajudaSenha.textContent = 'Senha inválida: deve conter pelo menos uma letra maiúscula.';
        ajudaSenha.style.color = 'red';
        // alert('Senha inválida: deve conter pelo menos uma letra maiúscula.');
    }
}

document.getElementById('inputPassword5').addEventListener('input', function() {
    const senha = this.value;
    exibirMensagemValidacao(senha);
});