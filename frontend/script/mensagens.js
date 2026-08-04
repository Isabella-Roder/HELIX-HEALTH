function mostrarMensagem(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = `message ${tipo}`;
}

function limparMensagem(elemento) {
    elemento.textContent = "";
    elemento.className = "";
}